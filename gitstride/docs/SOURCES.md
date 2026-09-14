# Content sources and scope

Reviewed for this delivery: 2026-09-13.

## Product facts

- GitStride README.zh-CN.md, default branch; fetched blob SHA `0cede5b849ba42814c5c2bcca0a52a3f5c905ae2`.
  https://github.com/zwyyy456/gitstride/blob/main/README.zh-CN.md
- Workspace reference already provided in the conversation:
  https://github.com/zwyyy456/gitstride/blob/main/docs/usage.md
- Worker operations stay in the application repository:
  https://github.com/zwyyy456/gitstride/blob/main/Automation/README.md
- Repository organization: app-support uses independent per-product directories / Vercel projects.
  https://github.com/zwyyy456/app-support/blob/main/README.md

Important preserved boundaries: desktop personal/organization Projects versus personal-only PR automation; desktop and automation authorization separation; repo scope breadth; unencrypted local snapshot; menu-bar quick-create opens a form rather than directly creating; reminders require the desktop app; all closing PRs must be merged for Done; switching service addresses does not shut down the old service.

## Design and implementation references

- Linear product website, viewed for editorial hierarchy and visual principles, not copied assets:
  https://linear.app/
- Astro static deployment on Vercel:
  https://docs.astro.build/en/guides/deploy/vercel/
- Astro localization guidance:
  https://docs.astro.build/en/guides/internationalization/
- Astro trusted markup directives:
  https://docs.astro.build/en/reference/directives-reference/
- Astro release page used to pin 7.3.2:
  https://github.com/withastro/astro/releases
- Vercel per-project root directories:
  https://vercel.com/docs/monorepos

## Editorial choices, not established product claims

The workspace, menu bar popover, and issue detail images are user-provided screenshots captured in the real GitStride app, with separate English and Chinese interfaces. The bilingual headline, layout, automation example, provisional mark, and optional HTML/CSS placeholders are created for the website. Those illustrations are not screenshots, customer endorsements, or measured productivity outcomes. Installer links, prices, App Store availability, and release version numbers are not assumed.

The website’s docs are a curated starting point, not a new source of product truth. Reconcile them with the app repository when behavior changes. The privacy page is explicitly a publication draft until the maintainer sets `privacyReviewed` after review.
