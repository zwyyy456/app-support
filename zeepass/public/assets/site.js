const lock = document.querySelector('[data-lock]');
if (lock) {
  const zh = document.documentElement.lang === 'zh-CN';
  const workspace = document.querySelector('.workspace');
  const panel = document.querySelector('.locked-panel');
  const unlock = document.querySelector('[data-unlock]');
  const status = document.querySelector('[data-demo-status]');
  const records = [
    { name: 'Northstar', mark: 'N', user: 'alex@example.com', url: 'https://northstar.example' },
    { name: 'Paperplane', mark: 'P', user: 'hello@example.com', url: 'https://paperplane.example' },
    { name: 'Terminal', mark: '>_', user: 'dev@example.com', url: 'https://terminal.example' },
  ];
  lock.addEventListener('click', () => {
    workspace.hidden = true;
    panel.hidden = false;
    lock.hidden = true;
    status.textContent = zh ? '演示密码库已锁定' : 'Demo vault locked';
    unlock.focus({ preventScroll: true });
  });
  unlock.addEventListener('click', () => {
    workspace.hidden = false;
    panel.hidden = true;
    lock.hidden = false;
    status.textContent = zh ? '演示密码库已解锁' : 'Demo vault unlocked';
    lock.focus({ preventScroll: true });
  });
  document.querySelectorAll('[data-entry]').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.entry);
    const record = records[index];
    document.querySelectorAll('[data-entry]').forEach(entry => {
      entry.classList.toggle('selected', entry === button);
      entry.setAttribute('aria-pressed', String(entry === button));
    });
    document.querySelector('[data-record-title]').textContent = record.name;
    document.querySelector('[data-record-user]').textContent = record.user;
    document.querySelector('[data-record-url]').textContent = record.url;
    const mark = document.querySelector('[data-record-icon]');
    mark.textContent = record.mark;
    mark.className = `entry-icon large type-${index}`;
    status.textContent = (zh ? '已选择示例条目：' : 'Selected example: ') + record.name;
  }));
}
