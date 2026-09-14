# Validation report

Date: 2026-09-13.

## Passed

- Zero-dependency build: generated 22 localized HTML pages, a 404 page, robots.txt and sitemap.xml.
- `npm test`: 8 Node test suites passed. Checked locale parity, one h1/main per page, unique IDs, metadata, all internal routes and fragments, asset existence, safe release placeholders, and selected product boundaries.
- HTTP checks: all 22 localized page routes returned 200 from the local preview server.
- Chromium DOM rendering at 360, 390, 768 and 1440 pixels: no document-level horizontal overflow across all 22 pages. The sample board intentionally supports internal horizontal scrolling.
- Both languages: Board/Table switch, assignee filter, search, empty search state, issue dialog, Escape dismissal.
- Both languages: Draft / Ready / Merged illustration and both review policies.
- Mobile navigation opens and closes with Escape.
- Language links target the equivalent topic. A shared section hash is preserved by the client code; its native-navigation behavior still needs normal-browser confirmation.
- FAQ filtering and empty state; disabled installer placeholder.
- Copy-code interaction provides an honest manual-copy fallback when clipboard access is denied.
- No page-level JavaScript exceptions during the above render/interaction checks.
- Desktop home, mobile home, automation, documentation and download screenshots were produced; desktop and mobile home layouts were visually inspected.

## Limits — not claimed as passed

1. npm registry access failed with `EAI_AGAIN registry.npmjs.org`. `npm install` and `astro build` were not completed. A top-level Astro version is pinned; no transitive lockfile is fabricated.
2. Chromium in the delivery environment blocks URL navigation by policy. Browser rendering tests therefore used built HTML/CSS/JS injected into a blank page. This does not test actual browser navigation, redirects, cache semantics, or Vercel routing. HTTP responses and HTML link resolution were checked separately.
3. No live Vercel deployment, custom-domain setup, DNS change, repository commit or push was performed.
4. No real installer, app signature, Apple architecture compatibility, App Store publication, device-code login, or backend automation was exercised by these website tests.
5. No Safari/Firefox/device hardware test or independent accessibility/security audit was run.

## Reproduce

```sh
node scripts/build-static.mjs
npm test
node scripts/serve.mjs
```

In another terminal, optionally install Python Playwright and run:

```sh
python tests/browser.py
```

The default browser test uses real navigation. Only use `GITSTRIDE_OFFLINE_RENDER=1` for clearly labeled offline DOM checks. On a normal machine, also run `npm install && npm run build`, commit the resulting lockfile, and check a Vercel Preview Deployment before publishing.

## Expected failing gate

`npm run check:release` should fail at this stage: real installer, product screenshots, privacy review and indexing configuration are intentionally not yet supplied. This is a release-readiness check, not a broken build.
