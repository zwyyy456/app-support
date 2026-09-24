# GitStride website

English · [简体中文](README.zh-CN.md)

A bilingual, static product website for GitStride, organized for `app-support/gitstride/` and a separate Vercel project. English uses the root URL; Simplified Chinese uses `/zh-cn`.

## Run with Astro

Use Node.js 24 (see `.nvmrc`). From this directory:

```sh
npm install
npm run dev
```

Open `http://localhost:4321` or `http://localhost:4321/zh-cn`.

```sh
npm test
npm run build
npm run preview
```

Astro is pinned to `7.3.2`. The delivery environment could not resolve the npm registry, so the Astro installation/build was **not run successfully** and there is no invented lockfile. On a connected machine, run `npm install`, review and commit the generated `package-lock.json`, then use `npm ci` for reproducible installs. See [validation notes](docs/VALIDATION.md).

## Offline preview, without installing dependencies

The same page renderers also have a zero-dependency Node build:

```sh
node scripts/build-static.mjs
node scripts/serve.mjs
```

This produces a complete `dist/` and serves it at port 4321. It is not a second implementation or an Astro compiler substitute: both paths use the exact same author-controlled page renderers, but the Astro integration still needs a connected-machine build check.

## Pages

Every route below has an equivalent `/zh-cn` route:

- `/` — product overview
- `/automation` — automation explanation and interactive illustration
- `/docs` — documentation index
- `/docs/getting-started`, `/docs/workspace`, `/docs/automation`, `/docs/self-hosting`
- `/download`, `/support`, `/privacy`, `/licenses`

There are 22 localized pages plus a 404 page. Top-level navigation uses separate pages. On-page demonstrations and document contents use section anchors. The header language switch keeps the current topic and shared section hash. URLs, metadata, canonical tags, language alternates, sitemap and robots directives are generated from one route map.

## Vercel / app-support

Put this directory at `app-support/gitstride/`, alongside `flashdict/` and `zendo/`. Do not change the other products or the parent repository’s configuration.

| Setting | Value |
|---|---|
| Root Directory | `gitstride` |
| Framework Preset | Astro |
| Install Command | `npm install` initially; `npm ci` once a lockfile is committed |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js | 24.x |

`vercel.json` is included. No Vercel adapter, server functions, GitHub OAuth keys or database are required for this static website. The Cloudflare automation service remains a completely separate deployment.

A zero-dependency deployment option is provided in `docs/vercel.static.json`: copy it over the project-level `vercel.json` to use the tested Node renderer instead of Astro. It does not modify the content or design.

## Release and site configuration

Edit `src/site.config.mjs`:

- The canonical URL is `https://gitstride.hyperseek.tech`; override it with `SITE_URL` only for another domain.
- The download button links to the GitHub Release ZIP for GitStride 1.0.1. Update `release.url` and `release.version` together for future releases. Optional date/file-size labels are displayed only when configured.
- Optionally set `appStoreUrl`, `supportEmail`, and localized social images.
- Review the privacy text when product behavior changes; `privacyReviewed` reflects the current Release build.
- Production builds are indexable by default. Preview builds remain noindex with robots Disallow. Set `SITE_INDEXABLE=false` to disable indexing explicitly.

If the release URL is removed, the download page explicitly labels it as unconfigured. No dead `#` links, fake successful downloads, store badges, customer logos or testimonials are included.

## Replace product visuals

Edit `src/content/media.mjs`. Place real files in `public/images/`:

```js
workspace: {
  en: {
    src: '/images/workspace-en.webp',
    alt: 'GitStride showing a personal Project in Board view',
    width: 2400,
    height: 1480,
  },
  'zh-cn': null,
}
```

The workspace, menu bar popover, and issue detail already use six original Retina PNG screenshots, one set per language. Automation keeps its interactive illustration; no recording is configured. A configured screenshot automatically replaces its HTML illustration, including the sample workspace controls. Keep `null` to retain the labeled placeholder. See [asset checklist](docs/ASSETS.md) for menu bar, issue detail and automation recordings. The current mark is provisional; replace it with your actual brand assets when ready.

## Source organization

```text
src/
  site.config.mjs          Public domain, release links and review switches
  content/                 UI strings, bilingual guides and media slots
  components/              Shared shell and page/preview renderers
  lib/                     HTML escaping, routes, SEO and document rendering
  layouts/Page.astro       Astro document wrapper
  pages/                   Static route adapter, 404, robots and sitemap
public/
  styles/site.css          Design tokens, components, responsive layouts
  scripts/site.js          Progressive-enhancement interactions
  images/                  Six localized app screenshots and provisional favicon
scripts/                   Offline build, preview, publication checks
tests/                     Node tests; optional Playwright browser checks
docs/                      Deployment, assets, sources, validation
```

No frontend framework runtime, web fonts, tracking scripts or remote image dependencies are loaded. The `.mjs` renderers return author-controlled HTML; plain data is escaped by `esc()`. Do not insert user-provided Markdown/HTML into these templates without a proper sanitizer.

## Checks and publication

```sh
npm test
npm run check:release
```

`check:release` checks the configured screenshots, installer URL, privacy review, and indexing settings. The screenshots are supplied; the remaining publication settings must still be configured. Its checks do not replace a manual check of the installer or app authentication.

Optional browser checks: install Python Playwright, run the local preview, then `python tests/browser.py`. The default test mode uses real browser navigation; an explicitly labeled offline mode is included for restricted render environments.

See [SOURCES.md](docs/SOURCES.md) for content provenance. Do not silently create a second long-form product manual: reconcile behavioral changes against the GitStride repository. This delivery does not edit the app README, push commits, or deploy a live website.
