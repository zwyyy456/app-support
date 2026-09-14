/** Zero-dependency build using EXACTLY the same page renderers as Astro.
 * Useful for offline review / testing, not a claim that the Astro build ran.
 */
import { mkdir, rm, cp, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { routes } from '../src/lib/routes.mjs';
import { renderDocument, robotsTxt, sitemapXml } from '../src/lib/render.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)), out=join(root,'dist');
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});
await cp(join(root,'public'),out,{recursive:true});
for(const route of routes) {
  const directory=join(out,route.path.slice(1));
  await mkdir(directory,{recursive:true});
  await writeFile(join(directory,'index.html'),renderDocument(route));
}
await writeFile(join(out,'404.html'),renderDocument({locale:'en',id:'404',path:'/404'}));
await writeFile(join(out,'robots.txt'),robotsTxt());
await writeFile(join(out,'sitemap.xml'),sitemapXml());
console.log(`Static renderer: built ${routes.length} localized pages + 404 into ${out}`);
