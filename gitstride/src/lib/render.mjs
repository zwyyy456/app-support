import { esc, localePath, pick } from './html.mjs';
import { routes } from './routes.mjs';
import { site } from '../site.config.mjs';
import { header, footer } from '../components/shell.mjs';
import { home, automationPage } from '../components/home.mjs';
import { docsPage } from '../components/docs.mjs';
import { getDocs } from '../content/docs.mjs';
import { downloadPage, supportPage, privacyPage, licensesPage, notFound } from '../components/pages.mjs';

export function pageMeta({locale,id}) {
  const t=(en,zh)=>pick(locale,en,zh);
  const meta={
    home:[t('GitHub Projects. At home on your Mac.','GitHub Projects，在 Mac 上更顺手。'),t('A native macOS workspace for GitHub Projects. Explore boards, tables, issue editing, and optional PR automation.','GitHub Projects 的原生 macOS 工作区。从菜单栏查看项目，用看板、表格和 Issue 编辑推进工作，按需开启 PR 自动化。')],
    automation:[t('Pull request automation','PR 自动化'),t('Connect closing pull requests to issue status in compatible personal GitHub Projects.','让关闭关联 PR 推进 Issue 在兼容个人 GitHub Projects 中的状态。')],
    docs:[t('Documentation','使用文档'),t('Connect GitHub, organize work, and configure optional automation.','连接 GitHub、整理工作，并配置可选的自动化服务。')],
    download:[t('Get GitStride for Mac','获取 GitStride macOS 版'),t('Download information, system requirements, and installation guidance for GitStride.','GitStride 下载信息、系统要求与安装指南。')],
    support:[t('Support','使用支持'),t('Answers to common questions and a clear path to reporting problems.','常见问题解答、连接排查与问题反馈。')],
    privacy:[t('Privacy & permissions','隐私与权限'),t('Understand desktop permissions, local data, and the optional automation service.','了解桌面权限、本地数据与可选自动化服务。')],
    licenses:[t('Source & licenses','来源与许可证'),t('GitStride’s project origins, license, and acknowledgements.','GitStride 的项目来源、许可与致谢。')],
    '404':[t('Page not found','页面不存在'),t('This page does not exist. Return to GitStride.','此页面不存在，请返回 GitStride 首页。')],
  };
  const document = id.startsWith('docs/') ? getDocs(locale)[id.slice(5)] : null;
  const [title,description]=document?[document.label,document.description]:meta[id]||meta['404'];
  return { title:`${title} — GitStride`, description };
}
export function renderBody(route) {
  const {id,locale}=route;
  let main;
  if(id==='home') main=home(locale);
  else if(id==='automation') main=automationPage(locale);
  else if(id==='docs'||id.startsWith('docs/')) main=docsPage(locale,id==='docs'?'':id.slice(5));
  else if(id==='download') main=downloadPage(locale);
  else if(id==='support') main=supportPage(locale);
  else if(id==='privacy') main=privacyPage(locale);
  else if(id==='licenses') main=licensesPage(locale);
  else main=notFound(locale);
  return header(route)+main+footer(locale);
}
export function renderHead(route) {
  const {title,description}=pageMeta(route);
  const language=route.locale==='en'?'en':'zh-CN';
  const path=route.id==='home'?'':route.id;
  const canonical=site.url+(route.path||localePath(route.locale,path));
  const image=site.socialImage[route.locale];
  const alternates=route.id==='404'?'':`<link rel="alternate" hreflang="en" href="${esc(site.url+localePath('en',path))}" />\n<link rel="alternate" hreflang="zh-CN" href="${esc(site.url+localePath('zh-cn',path))}" />\n<link rel="alternate" hreflang="x-default" href="${esc(site.url+localePath('en',path))}" />`;
  return `<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<meta name="theme-color" content="#09090b" />
<meta name="robots" content="${site.indexable && route.id!=='404'?'index, follow':'noindex, nofollow'}" />
<link rel="canonical" href="${esc(canonical)}" />
${alternates}
<meta property="og:type" content="website" />
<meta property="og:site_name" content="GitStride" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${esc(canonical)}" />
<meta property="og:locale" content="${language==='en'?'en_US':'zh_CN'}" />
<meta property="og:locale:alternate" content="${language==='en'?'zh_CN':'en_US'}" />
${image?`<meta property="og:image" content="${esc(new URL(image,site.url).href)}" />`:''}
<meta name="twitter:card" content="${image?'summary_large_image':'summary'}" />
<link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
<link rel="stylesheet" href="/styles/site.css" />
<script src="/scripts/site.js" defer></script>`;
}
export function renderDocument(route) {
  return `<!doctype html>\n<html lang="${route.locale==='en'?'en':'zh-CN'}">\n<head>\n${renderHead(route)}\n</head>\n<body>\n${renderBody(route)}\n</body>\n</html>`;
}
export const robotsTxt=()=>`User-agent: *\n${site.indexable?'Allow: /':'Disallow: /'}\n\nSitemap: ${site.url}/sitemap.xml\n`;
export const sitemapXml=()=>`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${routes.map(route=>`<url><loc>${esc(site.url+route.path)}</loc>${['en','zh-cn'].map(locale=>`<xhtml:link rel="alternate" hreflang="${locale==='en'?'en':'zh-CN'}" href="${esc(site.url+localePath(locale,route.id==='home'?'':route.id))}"/>`).join('')}</url>`).join('')}</urlset>`;
