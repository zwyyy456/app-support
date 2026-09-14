import { esc, localePath, pick } from '../lib/html.mjs';
import { icon, logo } from './icons.mjs';
import { ui } from '../content/ui.mjs';
import { site } from '../site.config.mjs';

export function header(route) {
  const {locale,id} = route;
  const t=ui[locale], path=p=>localePath(locale,p);
  const otherLocale=locale==='en'?'zh-cn':'en';
  const translated=localePath(otherLocale,id==='home'||id==='404'?'':id);
  const current=(page)=> id===page || (page==='docs'&&id.startsWith('docs/'));
  const navLink=(page,label)=>`<a href="${path(page==='home'?'':page)}" ${current(page)?'aria-current="page"':''}>${label}</a>`;
  return `<a class="skip-link" href="#main">${t.skip}</a><header class="site-header"><div class="nav-container">
    <a class="brand" href="${path('')}" aria-label="${esc(pick(locale,'GitStride home','GitStride 首页'))}">${logo()}<span>GitStride</span><span class="brand-cn">迹程</span></a>
    <nav id="primary-nav" class="primary-nav" aria-label="${t.navLabel}">${navLink('home',t.product)}${navLink('automation',t.automation)}${navLink('docs',t.docs)}${navLink('support',t.support)}</nav>
    <div class="nav-actions"><a class="github-nav" href="${site.github}" rel="noopener noreferrer" aria-label="GitStride on GitHub">${icon('github')}</a><a class="language-switch" href="${translated}" data-language-link lang="${otherLocale==='en'?'en':'zh-CN'}" hreflang="${otherLocale==='en'?'en':'zh-CN'}">${icon('globe')}<span>${t.language}</span></a><a class="button button-small button-primary nav-download" href="${path('download')}">${t.download}${icon('arrow')}</a><button class="icon-button menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="${t.menu}" data-menu-toggle>${icon('menu')}</button></div>
  </div></header>`;
}
export function footer(locale) {
  const t=ui[locale], path=p=>localePath(locale,p);
  const group=(label,links)=>`<div class="footer-links"><h3>${label}</h3>${links.map(([href,text])=>`<a href="${href}">${text}</a>`).join('')}</div>`;
  return `<footer class="site-footer"><div class="container footer-top"><div class="footer-brand"><a href="${path('')}" class="brand">${logo()}<span>GitStride</span></a><p>${t.footerNote}</p><span class="footer-native">${icon('apple')} ${pick(locale,'Made for macOS. Built around GitHub.','为 macOS 而生，围绕 GitHub 工作。')}</span></div>${group(t.productGroup,[[path(''),t.product],[path('automation'),t.automation],[path('download'),t.download]])}${group(t.resourcesGroup,[[path('docs'),t.docs],[path('support'),t.support],[path('privacy'),t.privacy]])}${group(t.projectGroup,[[site.github,'GitHub'],[site.issues,pick(locale,'Feedback','问题反馈')],[path('licenses'),t.licenses]])}</div><div class="container footer-bottom"><span>© ${new Date().getUTCFullYear()} GitStride · ${pick(locale,'Independently maintained','独立维护')}</span><span>${t.legal}</span><a href="${localePath(locale==='en'?'zh-cn':'en')}" lang="${locale==='en'?'zh-CN':'en'}">${t.language}</a></div></footer>`;
}
export function cta(locale) {
  const t=ui[locale],p=x=>localePath(locale,x);
  return `<section class="closing-cta container"><div class="cta-mark">${logo()}</div><p class="eyebrow">${pick(locale,'LESS SWITCHING. MORE MAKING.','少一点切换，多一点专注。')}</p><h2>${pick(locale,'Keep your workflow.<br>Find your stride.','延续你的工作流，<br>找到自己的节奏。')}</h2><p>${pick(locale,'Your projects are already on GitHub.<br>Give them a home on your Mac.','项目已经在 GitHub 上。<br>现在，给它一个更顺手的 Mac 工作区。')}</p><a class="button button-primary" href="${p('download')}">${icon('apple')}${t.downloadMac}${icon('arrow')}</a><span class="fine-print">${t.requirements}</span></section>`;
}
