import { site } from '../src/site.config.mjs';
import { media } from '../src/content/media.mjs';
import { access } from 'node:fs/promises';
import { join } from 'node:path';
const problems=[];
if(!site.release.url) problems.push('Set site.release.url to the real HTTPS installer URL.');
if(!site.indexable) problems.push('Build with VERCEL_ENV=production, set SITE_INDEXABLE=true, or remove an explicit SITE_INDEXABLE=false.');
for(const key of ['workspace','menubar','issue']) {
  for(const locale of ['en','zh-cn']) {
    const item=media[key][locale];
    if(!item) problems.push(`Replace the ${key}/${locale} product illustration with a real screenshot.`);
    else {
      if(!item.alt) problems.push(`${key}/${locale} needs localized alt text.`);
      try { await access(join('public',item.src)); } catch { problems.push(`${key}/${locale} file missing: ${item.src}`); }
    }
  }
}
if(!site.privacyReviewed) problems.push('Review the privacy text, then set site.privacyReviewed=true.');
if(problems.length){console.error('Not publication-ready:\n'+problems.map(x=>' - '+x).join('\n'));process.exitCode=1;}
else console.log('Configured release and required assets are present. Manually test installer and authorization before publishing.');
