const themeToggle = document.querySelector('.theme-toggle');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const nextThemeLabel = theme === 'light' ? '深色' : '浅色';
  themeToggle.textContent = nextThemeLabel;
  themeToggle.setAttribute('aria-label', `切换到${nextThemeLabel}模式`);
}

const previewTheme = new URLSearchParams(location.search).get('theme');
setTheme(previewTheme === 'light' ? 'light' : 'dark');
themeToggle.hidden = false;
themeToggle.addEventListener('click', () => {
  setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
});

const picker = document.querySelector('.mode-picker');
const tabs = Array.from(picker.querySelectorAll('a'));
const panels = tabs.map((tab) => document.querySelector(tab.hash));

function selectTab(index) {
  tabs.forEach((tab, position) => {
    const selected = index === position;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    panels[position].hidden = !selected;
  });
}

picker.setAttribute('role', 'tablist');
tabs.forEach((tab, index) => {
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-controls', panels[index].id);
  panels[index].setAttribute('role', 'tabpanel');
  panels[index].tabIndex = 0;

  tab.addEventListener('click', (event) => {
    event.preventDefault();
    selectTab(index);
  });

  tab.addEventListener('keydown', (event) => {
    let next;
    switch (event.key) {
      case 'ArrowLeft':
        next = (index + tabs.length - 1) % tabs.length;
        break;
      case 'ArrowRight':
        next = (index + 1) % tabs.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectTab(next);
    tabs[next].focus();
  });
});

function selectFromLocation() {
  const index = tabs.findIndex((tab) => tab.hash === location.hash);
  if (index >= 0) selectTab(index);
}

selectTab(0);
selectFromLocation();
window.addEventListener('hashchange', selectFromLocation);
