/** Escape untrusted/plain strings before inserting them into HTML. */
export const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const pick = (locale, en, zh) => locale === 'zh-cn' ? zh : en;
export const localePath = (locale, path = '') => {
  const normalized = String(path).replace(/^\/+|\/+$/g, '');
  return `${locale === 'zh-cn' ? '/zh-cn' : ''}${normalized ? '/' + normalized : ''}` || '/';
};
export const ext = (url, text, cls = '') => `<a class="${esc(cls)}" href="${esc(url)}" rel="noopener noreferrer">${text}</a>`;
export const codeBlock = (code, locale) => `<div class="code-block"><pre><code>${esc(code)}</code></pre><button class="copy-button" type="button" data-copy aria-label="${pick(locale, 'Copy code', '复制代码')}">${pick(locale, 'Copy', '复制')}</button></div>`;
