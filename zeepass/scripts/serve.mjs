import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../dist/',import.meta.url));
const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
createServer(async(req,res)=>{
  let path;
  try { path=decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400).end(); return; }
  let target=resolve(root,'.'+path);
  if(target!==root.replace(/\/$/,'')&&!target.startsWith(root.replace(/\/$/,'')+sep)){res.writeHead(403).end();return;}
  if(!extname(target))target=resolve(target,'index.html');
  try { const body=await readFile(target); res.writeHead(200,{'Content-Type':mime[extname(target)]||'application/octet-stream'});res.end(body); }
  catch {res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(root+'404.html'));}
}).listen(port,'127.0.0.1',()=>console.log(`ZeePass preview: http://127.0.0.1:${port}`));
