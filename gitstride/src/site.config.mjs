import { existsSync } from 'node:fs';
// Node 22+ built-in .env support; real environment values take precedence.
if (existsSync('.env') && typeof process.loadEnvFile === 'function') process.loadEnvFile('.env');

/** Public site configuration. Never place an OAuth secret or access token here. */
export const site = {
  name: 'GitStride',
  url: process.env.SITE_URL || 'https://gitstride.hyperseek.tech',
  indexable: process.env.SITE_INDEXABLE === 'true' || (process.env.SITE_INDEXABLE !== 'false' && process.env.VERCEL_ENV === 'production'),
  privacyReviewed: true,
  github: 'https://github.com/zwyyy456/gitstride',
  issues: 'https://github.com/zwyyy456/gitstride/issues',
  releases: 'https://github.com/zwyyy456/gitstride/releases',
  sourceGuide: 'https://github.com/zwyyy456/gitstride/blob/main/README.md',
  sourceGuideZh: 'https://github.com/zwyyy456/gitstride/blob/main/README.zh-CN.md',
  workerGuide: 'https://github.com/zwyyy456/gitstride/blob/main/Automation/README.md',
  license: 'https://github.com/zwyyy456/gitstride/blob/main/LICENSE',
  origin: 'https://github.com/yogesharc/GitBoard',
  release: {
    url: 'https://github.com/zwyyy456/GitStride/releases/download/v1.0.0/GitStride-1.0.zip',
    version: '1.0',
    date: '',
    fileSize: '',
  },
  appStoreUrl: '',
  supportEmail: 'zwyyy456@foxmail.com',
  minMacOS: '14',
  // Add real 1200×630 social cards to public/images and set these paths.
  socialImage: { en: '', 'zh-cn': '' },
};

// Fail clearly instead of emitting broken canonical links or unsafe URLs.
const origin = new URL(site.url);
if (!['http:', 'https:'].includes(origin.protocol) || origin.pathname !== '/' || origin.search || origin.hash) {
  throw new Error('SITE_URL must be an http(s) origin without a subpath, query or hash.');
}
site.url = origin.origin;
for (const url of [site.release.url, site.appStoreUrl]) {
  if (url && new URL(url).protocol !== 'https:') throw new Error('Release links must use HTTPS.');
}
