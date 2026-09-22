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

  const lightbox = document.querySelector('#screenshot-lightbox');
  const lightboxImage = document.querySelector('#screenshot-lightbox-image');
  const lightboxTitle = document.querySelector('#screenshot-lightbox-title');
  const lightboxClose = document.querySelector('.lightbox-close');
  let lightboxTrigger;

  document.querySelectorAll('.screenshot-preview').forEach(button => {
    button.addEventListener('click', () => {
      lightboxTrigger = button;
      lightboxImage.src = button.dataset.lightboxSrc;
      lightboxImage.alt = button.dataset.lightboxAlt;
      lightboxTitle.textContent = button.dataset.lightboxTitle;
      lightbox.showModal();
    });
  });

  lightboxClose.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    const bounds = lightbox.getBoundingClientRect();
    const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    if (!inside) lightbox.close();
  });
  lightbox.addEventListener('close', () => lightboxTrigger?.focus());

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

})();
