const themeKey = 'winornot-theme';
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const root = document.documentElement;
let preferredTheme;

try {
  const savedTheme = localStorage.getItem(themeKey);
  if (savedTheme === 'light' || savedTheme === 'dark') preferredTheme = savedTheme;
} catch {
  // The page can also be opened from disk, where storage access may be restricted.
}

function currentTheme() {
  return preferredTheme ?? (systemTheme.matches ? 'dark' : 'light');
}

root.dataset.theme = currentTheme();

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.theme-toggle');
  const icon = toggle.querySelector('span');
  const browserColor = document.querySelector('meta[name="theme-color"]');

  function updateTheme() {
    root.dataset.theme = currentTheme();
    const isDark = root.dataset.theme === 'dark';
    const label = isDark ? '切换到浅色模式' : '切换到深色模式';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    icon.textContent = isDark ? '☀︎' : '☾';
    browserColor.content = getComputedStyle(root).getPropertyValue('--background').trim();
  }

  toggle.addEventListener('click', () => {
    preferredTheme = currentTheme() === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(themeKey, preferredTheme);
    } catch {
      // Keep the chosen theme for this page when storage is unavailable.
    }
    updateTheme();
  });

  systemTheme.addEventListener('change', () => {
    if (!preferredTheme) updateTheme();
  });

  updateTheme();
  toggle.hidden = false;
});
