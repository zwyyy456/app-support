# Website validation

Date: 2026-11-08.

## Completed

- `npm ci` succeeded with the committed lockfile; dependency versions were not changed.
- `npm run build` succeeded using Astro 7.3.2: 22 bilingual content pages plus the 404 page, robots.txt and sitemap.xml.
- `npm test`: all 8 checks passed, covering route and locale parity, metadata, unique IDs, internal links and fragments, referenced page assets, release links, and product boundaries.
- `SITE_INDEXABLE=true npm run check:release` passed. This checks the production indexing configuration; it does not change local or deployed environment variables.
- `git diff --check` passed.
- GitHub Releases returned the v1.0.5 ZIP asset used by the download button.
- English and Chinese social cards were generated at 1200 × 630 and visually inspected.
- Local browser spot checks: the English homepage demo expands; Table selection updates its state; searching `#51` shows the matching example. The Chinese homepage was inspected at 390 px with no document overflow; the desktop Chinese download page shows version 1.0.5.

## Remaining checks and limitations

- `tests/browser.py` was updated to open the optional demo before operating it. The full browser test suite was not run; the spot checks above are not a substitute for its full route/viewport coverage.
- Existing Mac screenshots still show an earlier interface. Updated maintainer-provided Mac captures are needed. No application was launched or captured for this website task.
- The reported long-screenshot stitching artifact has not been reproduced. No speculative sticky-header or feature-layout fix was applied.
- `npm ci` reported 8 dependency advisories (1 low, 1 moderate, 6 high). Dependency remediation was not part of this content update and has not been applied.
- No deployment, commit, push, App Store publication, installer execution, or live GitHub account operation was performed. Mobile App Store availability is not claimed.
- No Safari/Firefox/hardware-device coverage or accessibility audit was performed.

## Reproduce

```sh
npm ci
npm run build
npm test
SITE_INDEXABLE=true npm run check:release
node scripts/serve.mjs
```

The optional browser suite uses real navigation by default. Run `python tests/browser.py` only when browser-test execution is requested and Playwright is installed. `GITSTRIDE_OFFLINE_RENDER=1` is explicitly limited to DOM injection, not normal browser navigation.
