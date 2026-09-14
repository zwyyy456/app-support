import { localePath } from './html.mjs';
export const pageIds = ['home','automation','docs','docs/getting-started','docs/workspace','docs/automation','docs/self-hosting','download','support','privacy','licenses'];
export const locales = ['en', 'zh-cn'];
export const routes = locales.flatMap(locale => pageIds.map(id => ({ locale, id, path: localePath(locale, id === 'home' ? '' : id) })));
export const getRoute = (path) => routes.find(route => route.path === path.replace(/\/$/, '') || (route.path === '/' && path === '/'));
