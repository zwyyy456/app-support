import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { render, notFound } from '../src/render.mjs';
import { site } from '../src/config.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const out = root + 'dist/';
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(root + 'public', out, { recursive: true });
const urls=[];
for (const locale of ['zh','en']) {
  for (const page of ['home','privacy','support']) {
    const route=(locale==='en'?'en/':'')+(page==='home'?'':page+'/');
    await mkdir(out+route,{recursive:true});
    await writeFile(out+route+'index.html',render(locale,page));
    urls.push(site.origin+'/'+route.replace(/\/$/,''));
  }
}
await writeFile(out+'404.html',notFound());
await writeFile(out+'robots.txt',`User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`);
await writeFile(out+'sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url=>`<url><loc>${url}</loc></url>`).join('')}</urlset>`);
console.log('Built 6 localized pages, 404, sitemap, and assets → dist/');
