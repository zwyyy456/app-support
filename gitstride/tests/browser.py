"""Optional browser checks. pip install playwright; playwright install chromium.
Run a static preview on port 4321 first. For constrained offline render testing,
set GITSTRIDE_OFFLINE_RENDER=1. That mode injects built HTML/CSS/JS into a blank
page instead of exercising browser URL navigation; HTTP routes are checked separately.
"""
import asyncio, json, os, urllib.request
from pathlib import Path
from playwright.async_api import async_playwright

PROJECT = Path(__file__).resolve().parents[1]
DIST = PROJECT / 'dist'
OUT = PROJECT / 'test-results'
BASE = os.environ.get('BASE_URL', 'http://127.0.0.1:4321')
OFFLINE = os.environ.get('GITSTRIDE_OFFLINE_RENDER') == '1'
CSS = (DIST / 'styles/site.css').read_text()
JS = (DIST / 'scripts/site.js').read_text()
ROUTES = ['/', '/automation', '/docs', '/docs/getting-started', '/docs/workspace', '/docs/automation', '/docs/self-hosting', '/download', '/support', '/privacy', '/licenses']
ROUTES += ['/zh-cn' + (p if p != '/' else '') for p in ROUTES.copy()]

async def load(page, path):
    if not OFFLINE:
        await page.goto(BASE + path)
        return
    file = DIST / path.strip('/') / 'index.html'
    html = file.read_text().replace('<link rel="stylesheet" href="/styles/site.css" />', '<style>' + CSS + '</style>').replace('<script src="/scripts/site.js" defer></script>', '')
    html = html.replace('<head>', '<head><base href="https://gitstride.example' + path + '">')
    await page.set_content(html, wait_until='domcontentloaded')
    await page.add_script_tag(content=JS)

async def main():
    OUT.mkdir(exist_ok=True)
    errors, overflow, checks = [], [], []
    for path in ROUTES:
        with urllib.request.urlopen(BASE + path) as response:
            assert response.status == 200, path
    checks.append('All 22 localized HTTP routes returned 200')
    async with async_playwright() as pw:
        executable = os.environ.get('CHROMIUM_EXECUTABLE')
        browser = await pw.chromium.launch(headless=True, **({'executable_path': executable} if executable else {}))
        page = await browser.new_page(viewport={'width': 1440, 'height': 1000})
        page.on('pageerror', lambda error: errors.append(str(error)))
        for width in [360, 390, 768, 1440]:
            await page.set_viewport_size({'width': width, 'height': 1000})
            for path in ROUTES:
                await load(page, path)
                dimensions = await page.evaluate('({w: innerWidth, actual: document.documentElement.scrollWidth})')
                if dimensions['actual'] > width + 1: overflow.append([path, width, dimensions['actual']])
        assert not overflow, overflow
        checks.append('No document horizontal overflow: 22 pages × 4 viewport widths')
        await page.set_viewport_size({'width': 1440, 'height': 1000})
        for locale, prefix in [('en', ''), ('zh-cn', '/zh-cn')]:
            await load(page, prefix or '/')
            await page.locator('[data-view="table"]').click()
            assert await page.locator('[data-table]').is_visible()
            await page.locator('[data-my-work]').click()
            assert await page.locator('[data-table] [data-issue]:visible').count() == 4
            await page.locator('[data-my-work]').click()
            await page.locator('[data-workspace] input[type="search"]').fill('#51')
            assert await page.locator('[data-table] [data-issue]:visible').count() == 1
            await page.locator('[data-table] [data-issue="51"]').click()
            assert await page.locator('dialog').is_visible()
            await page.keyboard.press('Escape')
            assert not await page.locator('dialog').is_visible()
            await page.locator('[data-workspace] input[type="search"]').fill('does-not-exist')
            assert await page.locator('.demo-empty').is_visible()
            await page.locator('[data-workspace] input[type="search"]').fill('')
            await page.locator('[data-view="board"]').click()
            checks.append(f'{locale}: Board/Table, assignment filter, search, empty state, dialog and Escape')
            await load(page, prefix + '/automation')
            assert await page.locator('[data-result-label]').inner_text() == 'In Progress'
            await page.locator('[data-stage="ready"]').click()
            assert await page.locator('[data-result-label]').inner_text() == 'In review'
            await page.locator('[data-policy]').select_option('progress')
            assert await page.locator('[data-result-label]').inner_text() == 'In Progress'
            await page.locator('[data-stage="merged"]').click()
            assert await page.locator('[data-result-label]').inner_text() == 'Done'
            await page.locator('[data-stage="draft"]').click()
            assert await page.locator('[data-result-label]').inner_text() == 'In Progress'
            checks.append(f'{locale}: Draft, Ready, Merged and both review policies')
            await load(page, prefix + '/support')
            await page.locator('[data-faq-search]').fill('OAuth')
            assert await page.locator('.faq-item:visible').count() > 0
            await page.locator('[data-faq-search]').fill('no-such-question-123')
            assert await page.locator('[data-faq-empty]').is_visible()
            await load(page, prefix + '/download')
            assert await page.locator('.download-main').is_disabled()
        await page.set_viewport_size({'width': 390, 'height': 844})
        await load(page, '/zh-cn')
        assert not await page.locator('#primary-nav').is_visible()
        await page.locator('[data-menu-toggle]').click()
        assert await page.locator('#primary-nav').is_visible()
        await page.keyboard.press('Escape')
        assert not await page.locator('#primary-nav').is_visible()
        checks.append('Mobile navigation opens and closes with Escape')
        await load(page, '/zh-cn/docs/workspace')
        assert await page.locator('[data-language-link]').get_attribute('href') == '/docs/workspace'
        checks.append('Language switch points to equivalent page')
        await load(page, '/docs/getting-started')
        await page.locator('[data-copy]').click()
        assert await page.locator('[data-copy]').inner_text() in ['Copied', 'Select & copy']
        checks.append('Copy code success or explicit manual-copy fallback')
        # Full native navigation tests run only in a normal browser environment.
        if not OFFLINE:
            await page.goto(BASE + '/zh-cn/docs/workspace#quick-create')
            await page.locator('[data-language-link]').click()
            await page.wait_for_url('**/docs/workspace#quick-create')
            checks.append('Native language navigation retains section hash')
        await browser.close()
    assert not errors, errors
    report = {'mode': 'offline DOM injection + HTTP route checks' if OFFLINE else 'native browser navigation', 'passed': checks, 'page_errors': errors, 'overflow': overflow, 'limitations': ['Astro build and Vercel deployment are not exercised by this script.']}
    (OUT / 'browser-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2))
    print(json.dumps(report, ensure_ascii=False, indent=2))

asyncio.run(main())
