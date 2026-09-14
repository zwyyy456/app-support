import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { esc,localePath } from '../src/lib/html.mjs';
import { routes,pageIds } from '../src/lib/routes.mjs';
import { renderDocument,pageMeta,robotsTxt,sitemapXml } from '../src/lib/render.mjs';
import { getDocs } from '../src/content/docs.mjs';
import { ui } from '../src/content/ui.mjs';
import { site } from '../src/site.config.mjs';
const pages=new Map(routes.map(r=>[r.path,renderDocument(r)]));
const decode=s=>s.replaceAll('&amp;','&');

test('22 distinct bilingual routes',()=>{
  assert.equal(routes.length,22);
  assert.equal(new Set(routes.map(r=>r.path)).size,22);
  for(const id of pageIds) assert.equal(routes.filter(r=>r.id===id).length,2);
});
test('HTML escaping and locale roots',()=>{
  assert.equal(esc('<a title="x">&\''),'&lt;a title=&quot;x&quot;&gt;&amp;&#39;');
  assert.equal(localePath('en',''),'/');
  assert.equal(localePath('zh-cn',''),'/zh-cn');
  assert.equal(localePath('zh-cn','/docs/workspace/'),'/zh-cn/docs/workspace');
});
test('Localized UI and documentation have matching keys and section IDs',()=>{
  assert.deepEqual(Object.keys(ui.en).sort(),Object.keys(ui['zh-cn']).sort());
  const en=getDocs('en'),zh=getDocs('zh-cn');
  assert.deepEqual(Object.keys(en),Object.keys(zh));
  for(const key of Object.keys(en)) assert.deepEqual(en[key].sections.map(s=>s.id),zh[key].sections.map(s=>s.id));
});
test('Every page has one main, one h1, correct language and localized metadata',()=>{
  for(const route of routes){
    const html=pages.get(route.path), meta=pageMeta(route);
    assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,route.path);
    assert.equal((html.match(/<main(?:\s|>)/g)||[]).length,1,route.path);
    assert.ok(html.includes(`lang="${route.locale==='en'?'en':'zh-CN'}"`),route.path);
    assert.ok(html.includes(esc(meta.title)),route.path);
    assert.ok(meta.description.length>15,route.path);
    assert.ok(!html.includes('undefined')&&!html.includes('[object Object]'),route.path);
    assert.equal((html.match(/hreflang="x-default"/g)||[]).length,1,route.path);
    const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(x=>x[1]);
    assert.equal(new Set(ids).size,ids.length,'Duplicate ID: '+route.path);
  }
});
test('All internal links and fragments resolve; no empty placeholder hrefs',()=>{
  for(const [path,html] of pages){
    for(const match of html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)){
      const href=decode(match[1]);
      assert.ok(href&&href!=='#','Empty link on '+path);
      if(/^(https?:|mailto:)/.test(href))continue;
      const url=new URL(href,'https://test.example'+path),target=pages.get(url.pathname);
      assert.ok(target,`Unresolved route ${href} on ${path}`);
      if(url.hash)assert.ok(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`Missing fragment ${href} on ${path}`);
    }
    for(const match of html.matchAll(/(?:src|href)="(\/(?:styles|scripts|images)\/[^"#]+)"/g)){
      assert.ok(existsSync(join('public',match[1])),'Missing public asset: '+match[1]);
    }
  }
});
test('Language switch keeps the document topic',()=>{
  for(const route of routes){
    const html=pages.get(route.path),other=route.locale==='en'?'zh-cn':'en';
    const expected=localePath(other,route.id==='home'?'':route.id);
    assert.ok(html.includes(`href="${expected}" data-language-link`),route.path);
  }
});
test('Draft releases cannot claim a successful download',()=>{
  if(!site.release.url){
    const html=pages.get('/download');
    assert.ok(html.includes('Download link not configured'));
    assert.ok(/<button[^>]*\bdisabled\b/.test(html));
  }
  if(!site.indexable)assert.ok(robotsTxt().includes('Disallow: /'));
  assert.equal((sitemapXml().match(/<url>/g)||[]).length,22);
});
test('Current behavioral boundaries remain in both locales',()=>{
  assert.ok(pages.get('/docs/workspace').includes('Return alone does not create'));
  assert.ok(pages.get('/zh-cn/docs/workspace').includes('只按回车并不会直接创建'));
  assert.ok(pages.get('/privacy').includes('not encrypted'));
  assert.ok(pages.get('/zh-cn/privacy').includes('未经加密'));
  assert.ok(pages.get('/docs/self-hosting').includes('does not enable automation'));
});
