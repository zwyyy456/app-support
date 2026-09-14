import { robotsTxt } from '../lib/render.mjs';
export const prerender = true;
export function GET() { return new Response(robotsTxt(), {headers: {'Content-Type':'text/plain; charset=utf-8'}}); }
