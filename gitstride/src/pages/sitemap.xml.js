import { sitemapXml } from '../lib/render.mjs';
export const prerender = true;
export function GET() { return new Response(sitemapXml(), {headers: {'Content-Type':'application/xml; charset=utf-8'}}); }
