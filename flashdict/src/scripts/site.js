import { site as config } from '../site.config.mjs';

(() => {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const note = document.querySelector('#screenshot-note');

  function selectTab(tab, focus = false) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    note.textContent = panel.dataset.hasScreenshot === 'true' ? 'App 实际截图' : '界面示意 · 非实际截图';
    if (focus) tab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(tabs[next], true); }
    });
  });

  document.querySelectorAll('[data-demo-link]').forEach(link => {
    link.addEventListener('click', () => selectTab(document.getElementById(`tab-${link.dataset.demoLink}`)));
  });

  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#nav-links');
  function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', '打开导航菜单'); nav.classList.remove('is-open'); }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  const mobileLayout = matchMedia('(max-width: 600px)');
  mobileLayout.addEventListener('change', closeMenu);

  // Support and legal pages only need the shared navigation.
  if (!tabs.length) return;

  const reveal = document.querySelector('#reveal-answer');
  const answer = document.querySelector('#review-answer');
  const ratings = document.querySelector('#review-ratings');
  const reviewFeedback = document.querySelector('#review-feedback');
  function resetReview() {
    reveal.setAttribute('aria-expanded', 'false');
    answer.hidden = true;
    ratings.hidden = true;
    document.querySelector('.review-prompt').hidden = false;
    reveal.hidden = false;
    reveal.textContent = '显示答案 ↵';
    reviewFeedback.textContent = '交互示意 · 先回忆，再显示答案并评分。';
  }
  reveal.addEventListener('click', () => {
    if (reveal.getAttribute('aria-expanded') === 'true') {
      resetReview();
      return;
    }
    reveal.setAttribute('aria-expanded', 'true');
    answer.hidden = false;
    ratings.hidden = false;
    document.querySelector('.review-prompt').hidden = true;
    reveal.hidden = true;
    ratings.querySelector('button').focus({ preventScroll: true });
    reviewFeedback.textContent = '想起来多少？选择一个评分，完成这次示例复习。';
  });
  ratings.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      ratings.hidden = true;
      reveal.hidden = false;
      reveal.textContent = '再试一次 ↻';
      reveal.focus({ preventScroll: true });
      reviewFeedback.textContent = `示例评分：${button.dataset.rating}。在 App 中，FSRS 会据此安排下次复习。`;
    });
  });

  const senseOptions = [...document.querySelectorAll('.sense-option')];
  senseOptions.forEach(option => {
    option.querySelector('button').addEventListener('click', () => {
      senseOptions.forEach(item => {
        const selected = item === option;
        item.classList.toggle('is-selected', selected);
        const button = item.querySelector('button');
        button.setAttribute('aria-pressed', String(selected));
        button.querySelector('span').textContent = selected ? '✓' : '+';
      });
      document.querySelector('#generated-index').textContent = option.dataset.sense;
      document.querySelector('#generated-meaning').textContent = option.querySelector('.sense-meaning').textContent;
      document.querySelector('#generated-example-en').textContent = option.querySelector('.sense-example-en').textContent;
      document.querySelector('#generated-example-zh').textContent = option.querySelector('.sense-example-zh').textContent;
      document.querySelector('#card-empty').hidden = true;
      document.querySelector('#generated-card').hidden = false;
      document.querySelector('#sense-destination').classList.add('is-generated');
      document.querySelector('#card-state').textContent = '已生成示例';
      document.querySelector('#sense-feedback').textContent = `已生成义项 ${option.dataset.sense} 的示例闪卡。可以选择另一个义项，再试一次。`;
    });
  });

  document.querySelectorAll('[data-screenshot]').forEach(slot => {
    const key = slot.dataset.screenshot;
    const source = config.screenshots[key];
    if (!source) return;
    const img = new Image();
    img.className = 'screenshot-image';
    img.alt = { lookup: '闪卡词典 Mac 查词与义项制卡界面', review: '闪卡词典 Mac 复习界面', library: '闪卡词典 Mac 词典管理界面', mobile: '闪卡词典 iPhone 复习界面' }[key];
    img.addEventListener('load', () => {
      slot.querySelector('.mock-content').hidden = true;
      slot.dataset.hasScreenshot = 'true';
      slot.append(img);
      if (slot.getAttribute('role') === 'tabpanel' && !slot.hidden) note.textContent = 'App 实际截图';
      const caption = slot.closest('figure')?.querySelector('figcaption');
      if (caption) caption.textContent = 'iPhone · App 实际截图';
    });
    img.addEventListener('error', () => {
      const message = document.createElement('p');
      message.className = 'asset-error';
      message.textContent = '产品截图暂时无法显示，请稍后刷新页面。';
      slot.append(message);
    });
    img.src = source;
  });

  document.querySelectorAll('[data-download]').forEach(link => {
    const url = config.downloads[link.dataset.download];
    if (!url) return;
    const parsed = new URL(url, location.href);
    if (!['https:', 'http:'].includes(parsed.protocol)) return;
    link.href = parsed.href;
    link.removeAttribute('aria-disabled');
    link.removeAttribute('tabindex');
    link.querySelector('.download-status').textContent = '获取 App ↗';
  });
  const downloadNote = document.querySelector('#download-note');
  if (downloadNote && !document.querySelector('[data-download][aria-disabled="true"]')) downloadNote.hidden = true;
})();
