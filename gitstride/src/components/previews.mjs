import { esc, pick } from '../lib/html.mjs';
import { icon, logo } from './icons.mjs';
import { media } from '../content/media.mjs';
import { ui } from '../content/ui.mjs';

const traffic = '<span class="traffic-lights" aria-hidden="true"><i></i><i></i><i></i></span>';
const tasks = [
  {id:42, en:'Make room for focused work', zh:'给专注的工作留一点空间', status:'progress', tag:'Experience', tagZh:'体验', owner:'A'},
  {id:51, en:'Write the getting started guide', zh:'编写快速开始指南', status:'todo', tag:'Docs', tagZh:'文档', owner:'Y'},
  {id:47, en:'Plan the next iteration', zh:'规划下一次迭代', status:'todo', tag:'Planning', tagZh:'规划', owner:'A'},
  {id:38, en:'Polish the issue detail view', zh:'完善 Issue 详情体验', status:'progress', tag:'Design', tagZh:'设计', owner:'Y'},
  {id:36, en:'Connect PRs to project progress', zh:'让 PR 与项目进度关联', status:'review', tag:'Automation', tagZh:'自动化', owner:'Y'},
  {id:33, en:'Refine menu bar search', zh:'优化菜单栏搜索', status:'review', tag:'Experience', tagZh:'体验', owner:'A'},
  {id:29, en:'Welcome your first project', zh:'连接你的第一个项目', status:'done', tag:'Onboarding', tagZh:'引导', owner:'Y'},
  {id:24, en:'Remember your preferred view', zh:'记住你偏好的视图', status:'done', tag:'Workspace', tagZh:'工作区', owner:'A'},
];
const statuses = [ ['todo','Todo'],['progress','In Progress'],['review','In review'],['done','Done'] ];
const avatar = (owner) => `<span class="avatar avatar-${owner.toLowerCase()}" title="${owner === 'Y' ? 'You / @you' : 'Alex / @alex'}">${owner}</span>`;
function card(task, locale, row = false) {
  const title = pick(locale, task.en, task.zh);
  return `<button type="button" class="issue-card ${row ? 'issue-row' : ''} ${task.id === 42 ? 'is-featured' : ''}" data-issue="${task.id}" data-status="${task.status}" data-owner="${task.owner}" data-search="${esc(`${title} ${task.id} @${task.owner === 'Y' ? 'you' : 'alex'}`.toLowerCase())}" aria-label="${esc(title)} — ${pick(locale,'open sample issue','打开示例事项')}">
    <span class="card-top"><span class="mono">orbit <span>#${task.id}</span></span>${icon(task.status === 'done' ? 'check' : 'issue')}</span>
    <span class="card-title">${esc(title)}</span>
    <span class="card-bottom"><span class="tag tag-${task.status}"><i></i>${pick(locale, task.tag, task.tagZh)}</span>${avatar(task.owner)}</span>
  </button>`;
}
export function mediaFrame(slot, locale, fallback, cls = '') {
  const image = media[slot]?.[locale];
  const alt = image?.alt || '';
  const caption = image ? pick(locale, 'GitStride on macOS', 'GitStride macOS 应用') : ui[locale].placeholder;
  return `<figure class="media-frame ${cls}" data-media-slot="${slot}">${image
    ? `<img src="${esc(image.src)}" alt="${esc(alt)}" width="${Number(image.width) || 2400}" height="${Number(image.height) || 1480}" ${slot === 'workspace' ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" />`
    : fallback}<figcaption><span class="caption-dot"></span>${caption}</figcaption></figure>`;
}
export function workspace(locale) {
  const t = (en,zh) => pick(locale,en,zh);
  const app = `<div class="workspace-preview" data-workspace>
    <div class="app-titlebar">${traffic}<span class="app-title">${logo('mini')} GitStride</span><span class="mono demo-marker">${t('DEMO WORKSPACE','示例工作区')}</span></div>
    <div class="app-body">
      <aside class="app-sidebar" aria-label="${t('Illustrative sidebar','示意侧栏')}">
        <div class="workspace-name"><span class="workspace-avatar">o</span> Orbit <span class="muted">${icon('down')}</span></div>
        <div class="sidebar-item">${icon('person')} ${t('My Work','我的工作')} <span>4</span></div>
        <div class="sidebar-heading">${t('FOLLOWED PROJECTS','关注的项目')}</div>
        <div class="sidebar-item selected">${icon('folder')} ${t('Product development','产品开发')}</div>
        <div class="sidebar-item dim">${icon('folder')} ${t('Website','官网')}</div>
        <div class="sidebar-heading">${t('SAVED VIEWS','本地工作视图')}</div>
        <div class="sidebar-item">${icon('issue')} ${t('Bugs to fix','待处理缺陷')}</div>
        <div class="sidebar-item">${icon('board')} ${t('This iteration','本次迭代')}</div>
        <div class="sidebar-bottom">${avatar('Y')} ${t('Your workspace','你的工作区')}<span class="mono">LOCAL</span></div>
      </aside>
      <section class="app-content" aria-label="${t('Interactive project illustration','项目交互示意')}">
        <div class="project-heading"><span>${icon('folder')} ${t('Product development','产品开发')}</span><span class="project-owner">orbit / ${t('Personal project','个人项目')}</span></div>
        <div class="app-toolbar">
          <div class="segmented" role="group" aria-label="${t('Demo layout','演示布局')}"><button type="button" data-view="board" aria-pressed="true">${icon('board')}${t('Board','看板')}</button><button type="button" data-view="table" aria-pressed="false">${icon('table')}${t('Table','表格')}</button></div>
          <button type="button" class="filter-button" data-my-work aria-pressed="false">${icon('person')}${t('Assigned to me','只看我的')}</button>
          <label class="demo-search">${icon('search')}<input type="search" placeholder="${t('Search issues…','搜索事项…')}" aria-label="${t('Search sample issues','搜索示例事项')}" /></label>
        </div>
        <div class="board-scroll" tabindex="0" role="region" aria-label="${t('Sample board; scroll horizontally on smaller screens','示例看板；小屏幕可横向滚动')}">
          <div class="demo-board" data-board>${statuses.map(([key,label]) => `<div class="board-column"><div class="column-heading"><i class="status-dot ${key}"></i><span>${label}</span><span class="column-count">2</span><span class="column-plus" aria-hidden="true">+</span></div>${tasks.filter(x=>x.status===key).map(x=>card(x,locale)).join('')}</div>`).join('')}</div>
          <div class="demo-table" data-table hidden><div class="table-heading"><span>Issue</span><span>${t('Title','标题')}</span><span>Status</span></div>${tasks.map(task => `<button type="button" class="table-item" data-issue="${task.id}" data-owner="${task.owner}" data-status="${task.status}" data-search="${esc(`${pick(locale,task.en,task.zh)} ${task.id} @${task.owner === 'Y' ? 'you' : 'alex'}`.toLowerCase())}"><span class="mono">#${task.id}</span><span>${esc(pick(locale,task.en,task.zh))}</span><span class="table-state"><i class="status-dot ${task.status}"></i>${statuses.find(s=>s[0]===task.status)[1]}</span></button>`).join('')}</div>
        </div>
        <p class="demo-empty" hidden>${t('No matching issues. Try another search.','没有匹配的事项，请尝试其他搜索内容。')}</p>
      </section>
    </div>
    <div class="app-statusbar"><span data-result-count aria-live="polite">${t('8 sample issues','8 个示例事项')}</span><span>${t('Try switching views or opening an issue','试试切换视图，或打开一个事项')} ${icon('arrow')}</span></div>
    <dialog class="issue-dialog" aria-labelledby="sample-issue-title"><form method="dialog"><button class="icon-button dialog-close" aria-label="${ui[locale].close}">${icon('close')}</button></form><p class="eyebrow">${t('SAMPLE ISSUE','示例事项')} <span data-detail-number></span></p><h2 id="sample-issue-title"></h2><p>${t('This is an illustrative preview of an issue detail view. The website does not access or modify your GitHub data.','这是 Issue 详情的交互示意。官网不会访问或修改你的 GitHub 数据。')}</p><div class="detail-properties"><span>Status</span><strong data-detail-state></strong><span>${t('Assignee','负责人')}</span><strong data-detail-owner></strong></div><p class="fine-print">${ui[locale].demoOnly}</p></dialog>
  </div>`;
  return mediaFrame('workspace',locale,app,'workspace-frame');
}
export function menubar(locale) {
  const t = (en,zh)=>pick(locale,en,zh);
  return mediaFrame('menubar',locale,`<div class="menubar-scene"><div class="desktop-bar"><span>${icon('apple')} <strong>Finder</strong> <span>${t('File','文件')}</span> <span>${t('Edit','编辑')}</span></span><span>${logo('tiny')} ${icon('search')} 09:41</span></div><div class="desktop-ghost"><span class="mono">orbit / README.md</span><div></div><div></div><div></div><p class="mono">&gt; focus on what matters.</p></div><div class="menubar-popover"><div class="popover-heading">${logo('mini')} <strong>GitStride</strong>${icon('settings')}</div><div class="popover-project">${t('Product development','产品开发')}${icon('down')}</div><div class="popover-search">${icon('search')}${t('Search issues or type > to create','搜索事项，或输入 > 快速创建')}</div><div class="popover-tabs"><span>Todo <small>2</small></span><span class="active">In Progress <small>2</small></span><span>Done <small>2</small></span></div><div class="popover-issue"><i class="status-dot progress"></i><span>${t('Make room for focused work','给专注的工作留一点空间')}<small>orbit #42</small></span>${avatar('A')}</div><div class="popover-issue"><i class="status-dot progress"></i><span>${t('Polish the issue detail view','完善 Issue 详情体验')}<small>orbit #38</small></span>${avatar('Y')}</div><div class="popover-footer">${icon('board')}${t('Open project workspace','打开项目工作区')}${icon('arrow')}</div></div></div>`,'menubar-frame');
}
export function issuePreview(locale) {
  const t = (en,zh)=>pick(locale,en,zh);
  return mediaFrame('issue',locale,`<div class="issue-scene"><div class="mini-window-header">${traffic}<span>orbit #38</span></div><div class="issue-scene-content"><span class="mini-breadcrumb">${icon('folder')} ${t('Product development','产品开发')} <span>/</span> #38</span><h3>${t('Polish the issue detail view','完善 Issue 详情体验')}</h3><div class="issue-body-lines"><p>${t('Make the next step clear, without losing context.','让下一步更清晰，不丢失当前的工作上下文。')}</p><span>${icon('check')}${t('Keep issue metadata close at hand','随时查看事项的关键信息')}</span><span>${icon('check')}${t('Connect related pieces of work','关联相关的工作事项')}</span></div><div class="mock-properties"><div><span>Status</span><strong><i class="status-dot progress"></i>In Progress</strong></div><div><span>${t('Assignee','负责人')}</span><strong>${avatar('Y')}You</strong></div><div><span>${t('Milestone','里程碑')}</span><strong>${icon('folder')}${t('Next release','下一次发布')}</strong></div></div><div class="subissue"><span>${icon('issue')}${t('Refine labels and assignees','整理标签与负责人')}</span><span class="mono">#39</span></div></div></div>`,'issue-frame');
}
export function automationDemo(locale, compact = false) {
  const t=(en,zh)=>pick(locale,en,zh);
  const video = media.automationVideo[locale];
  if(video) return `<figure class="automation-video"><video controls playsinline preload="metadata" ${video.poster ? `poster="${esc(video.poster)}"` : ''}><source src="${esc(video.src)}" type="${esc(video.type || 'video/mp4')}"/>${esc(t('Your browser cannot play this video.','你的浏览器无法播放此视频。'))}</video><figcaption>${esc(video.caption || t('GitStride workflow recording','GitStride 工作流录屏'))}</figcaption></figure>`;
  return `<div class="automation-demo ${compact ? 'compact' : ''}" data-automation>
    <div class="flow-demo-heading"><span class="eyebrow">${t('FROM PULL REQUEST TO PROJECT','从 PULL REQUEST 到 PROJECT')}</span><span class="demo-pill">${t('Interactive illustration','交互示意')}</span></div>
    <div class="flow-stages" role="group" aria-label="${t('Sample pull request state','示例 PR 状态')}"><button type="button" data-stage="draft" aria-pressed="true">${icon('pull')}<span>Draft</span><small>01</small></button><span class="flow-stage-line" aria-hidden="true"></span><button type="button" data-stage="ready" aria-pressed="false">${icon('pull')}<span>Ready</span><small>02</small></button><span class="flow-stage-line" aria-hidden="true"></span><button type="button" data-stage="merged" aria-pressed="false">${icon('merge')}<span>Merged</span><small>03</small></button></div>
    <div class="flow-transfer"><div class="pull-card"><span class="mini-label">PULL REQUEST <span class="mono">#58</span></span><h3>${t('Make room for focused work','给专注的工作留一点空间')}</h3><span class="code-token">Closes #42</span><span class="pull-state" data-pr-state>Draft</span></div><div class="connector" aria-hidden="true"><span></span>${logo()}<span></span></div><div class="project-result" data-result="progress"><span class="mini-label">PROJECT ITEM <span class="mono">#42</span></span><h3>${t('Make room for focused work','给专注的工作留一点空间')}</h3><span class="result-status" aria-live="polite"><i class="status-dot progress" data-result-dot></i><strong data-result-label>In Progress</strong></span><span class="result-note">${t('Issue status in a personal Project','Issue 在个人 Project 中的状态')}</span></div></div>
    <div class="review-policy"><label for="review-policy-${compact ? 'home' : 'page'}">${t('When a PR is ready for review','当 PR 进入待评审状态')}</label><select id="review-policy-${compact ? 'home' : 'page'}" data-policy><option value="review">${t('Move to In review','移至 In review')}</option><option value="progress">${t('Keep in In Progress','保持在 In Progress')}</option></select></div>
    <p class="flow-note">${t('One issue, one closing PR. The real service waits at least 3 seconds before processing, plus queue and network time.','此处演示一个 Issue 对应一个关闭关联 PR。真实服务会等待至少 3 秒再处理，另有队列和网络耗时。')}</p>
  </div>`;
}
