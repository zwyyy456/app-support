/** Local static preview server. No install required; never use as a production server. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../dist',import.meta.url));
const index=process.argv.indexOf('--port');
const port=Number(index>=0?process.argv[index+1]:process.env.PORT||4321);
if(!Number.isInteger(port)||port<1||port>65535) throw new Error('Invalid port');
try { await stat(root); } catch { console.error('Run npm run build:static first.'); process.exit(1); }
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.json':'application/json','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.mp4':'video/mp4','.webm':'video/webm'};
createServer(async(req,res)=>{
  if(!['GET','HEAD'].includes(req.method||'')){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end();}
  try {
    const pathname=decodeURIComponent(new URL(req.url||'/','http://localhost').pathname);
    let file=resolve(root,'.'+pathname);
    if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);return res.end();}
    let status=200;
    try { if((await stat(file)).isDirectory()) file=resolve(file,'index.html'); await stat(file); }
    catch { file=resolve(root,'404.html');status=404; }
    const data=await readFile(file);
    res.writeHead(status,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(req.method==='HEAD'?undefined:data);
  } catch { res.writeHead(400);res.end('Bad request'); }
}).listen(port,'127.0.0.1',()=>console.log(`Preview: http://localhost:${port}\nChinese: http://localhost:${port}/zh-cn`));
