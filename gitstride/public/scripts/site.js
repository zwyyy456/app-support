/* Progressive enhancement only. Navigation and content work without JavaScript. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const isZh = document.documentElement.lang.toLowerCase() === 'zh-cn';
  const text = (en, zh) => isZh ? zh : en;

  const menuButton = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('#primary-nav');
  function closeMenu() {
    navigation?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation?.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (event.target instanceof Node && !navigation?.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
  });
  navigation?.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('a')) closeMenu();
  });

  // The server emits the equivalent locale route. Preserve a shared section id.
  function updateLanguageLinks() {
    document.querySelectorAll('[data-language-link]').forEach(link => {
      const url = new URL(link.href);
      url.hash = window.location.hash;
      link.href = url.pathname + url.hash;
    });
  }
  updateLanguageLinks();
  window.addEventListener('hashchange', updateLanguageLinks);

  document.querySelectorAll('[data-workspace]').forEach(root => {
    const search = root.querySelector('input[type="search"]');
    const filter = root.querySelector('[data-my-work]');
    const board = root.querySelector('[data-board]');
    const table = root.querySelector('[data-table]');
    const resultCount = root.querySelector('[data-result-count]');
    const empty = root.querySelector('.demo-empty');
    const dialog = root.querySelector('dialog');
    let myWork = false;
    let view = 'board';
    let previousFocus = null;
    const stateLabels = { todo: 'Todo', progress: 'In Progress', review: 'In review', done: 'Done' };

    function update() {
      const query = (search?.value || '').trim().toLocaleLowerCase().replace(/^#/, '');
      let count = 0;
      root.querySelectorAll('[data-issue]').forEach(item => {
        const match = (!myWork || item.dataset.owner === 'Y') && (item.dataset.search || '').includes(query);
        item.hidden = !match;
        if (match && item.closest('[data-board]')) count++;
      });
      root.querySelectorAll('.board-column').forEach(column => {
        const visible = column.querySelectorAll('[data-issue]:not([hidden])').length;
        const label = column.querySelector('.column-count');
        if (label) label.textContent = String(visible);
      });
      board.hidden = view !== 'board';
      table.hidden = view !== 'table';
      if (resultCount) resultCount.textContent = text(`${count} sample issues`, `${count} 个示例事项`);
      if (empty) empty.hidden = count !== 0;
    }
    root.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
      view = button.dataset.view || 'board';
      root.querySelectorAll('[data-view]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      update();
    }));
    filter?.addEventListener('click', () => {
      myWork = !myWork;
      filter.setAttribute('aria-pressed', String(myWork));
      update();
    });
    search?.addEventListener('input', update);
    root.querySelectorAll('[data-issue]').forEach(button => button.addEventListener('click', () => {
      if (!dialog || typeof dialog.showModal !== 'function') return;
      const title = button.querySelector('.card-title')?.textContent || button.children[1]?.textContent || '';
      dialog.querySelector('#sample-issue-title').textContent = title;
      dialog.querySelector('[data-detail-number]').textContent = `#${button.dataset.issue}`;
      dialog.querySelector('[data-detail-state]').textContent = stateLabels[button.dataset.status] || '';
      dialog.querySelector('[data-detail-owner]').textContent = button.dataset.owner === 'Y' ? text('You (@you)', '你（@you）') : 'Alex (@alex)';
      previousFocus = button;
      dialog.showModal();
    }));
    dialog?.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog?.addEventListener('close', () => previousFocus?.focus());
    update();
  });

  // Deliberately a SINGLE-PR illustration, not a simulation of multi-PR reduction.
  document.querySelectorAll('[data-automation]').forEach(root => {
    let stage = 'draft';
    const policy = root.querySelector('[data-policy]');
    function update() {
      const readyState = policy?.value === 'review' ? 'review' : 'progress';
      const state = stage === 'merged' ? 'done' : stage === 'ready' ? readyState : 'progress';
      const labels = { progress: 'In Progress', review: 'In review', done: 'Done' };
      root.querySelector('[data-result]').dataset.result = state;
      root.querySelector('[data-result-label]').textContent = labels[state];
      root.querySelector('[data-result-dot]').className = `status-dot ${state}`;
      root.querySelector('[data-pr-state]').textContent = { draft: 'Draft', ready: 'Ready', merged: 'Merged' }[stage];
      root.querySelector('[data-stage="ready"]').dataset.mapResult = readyState;
      root.querySelector('[data-ready-target]').dataset.state = readyState;
      root.querySelector('[data-ready-result-label]').textContent = labels[readyState];
      root.querySelectorAll('[data-stage]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.stage === stage)));
    }
    root.querySelectorAll('[data-stage]').forEach(button => button.addEventListener('click', () => {
      stage = button.dataset.stage || 'draft';
      update();
    }));
    policy?.addEventListener('change', update);
  });

  const faqSearch = document.querySelector('[data-faq-search]');
  faqSearch?.addEventListener('input', () => {
    const query = faqSearch.value.trim().toLocaleLowerCase();
    let count = 0;
    document.querySelectorAll('.faq-item').forEach(item => {
      item.hidden = !item.textContent.toLocaleLowerCase().includes(query);
      if (!item.hidden) count++;
    });
    const empty = document.querySelector('[data-faq-empty]');
    if (empty) empty.hidden = count !== 0;
  });

  document.querySelectorAll('[data-copy]').forEach(button => {
    button.setAttribute('aria-live', 'polite');
    button.addEventListener('click', async () => {
      const code = button.parentElement?.querySelector('code')?.textContent || '';
      const original = text('Copy', '复制');
      try {
        if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
        await navigator.clipboard.writeText(code);
        button.textContent = text('Copied', '已复制');
      } catch {
        // Useful, honest fallback on non-secure contexts. No deprecated execCommand.
        const target = button.parentElement?.querySelector('code');
        if (target) {
          const range = document.createRange();
          range.selectNodeContents(target);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
        button.textContent = text('Select & copy', '请手动复制');
      }
      window.setTimeout(() => { button.textContent = original; }, 2200);
    });
  });
})();
