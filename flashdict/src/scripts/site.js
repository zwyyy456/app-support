import { site as config } from '../site.config.mjs';

(() => {
  const tabs = [...document.querySelectorAll('[role="tab"]')];

  function selectTab(tab, focus = false) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
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
