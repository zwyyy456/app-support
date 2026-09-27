# Zendo 产品网站

纯 HTML、CSS 和少量原生 JavaScript。由现有 Vercel 项目部署，无需安装依赖或构建；`vercel.json` 启用 clean URLs。下载地址统一使用 `https://apps.apple.com/app/id6781929524`。

## 页面与语言

中文为 `/`、`/support`、`/privacy`；英文为 `/en`、`/en/support`、`/en/privacy`。导航中的语言链接切换到同一页面的另一种语言，不自动按浏览器语言跳转。两种语言共享 CSS、截图和图片预览脚本，页面带有 canonical 与 hreflang。英文价值分类沿用 App 的 Invest / Maintain / Recover / Drain。

## 产品图片

中英文网站统一使用用户提供的英文模式 Mac 原图，事项名称保留原样。图片可点击放大，窄屏可横向浏览；没有改写截图中的文字或记录。

| 网站资源 | 原始文件（`~/Pictures/zendo/`） | 用途 |
| --- | --- | --- |
| `assets/today-mac.png` | `SCR-20260926-meda.png` | 今日记录主视觉 |
| `assets/statistics-mac.png` | `SCR-20260926-mely.png` | 价值结构、趋势与周期对比 |
| `assets/quick-log-mac.png` | `SCR-20260926-mefd.png` | 独立快速记录窗口 |

当前图片已覆盖首页核心场景。iPhone 图片仍为中文界面，尚未接入；如需增加移动端产品展示，可补充英文模式截图。图标来自 Zendo 应用的 SVG 源图，蓝色容器沿用应用图标背景色。

产品文案依据 Zendo 的 `docs/product-design.md`、`docs/architecture.md` 和 App Store 描述。未来的目标和回顾功能未作为当前能力宣传。

## 本地预览

在本目录运行 `python3 -m http.server 8765`，访问 `http://localhost:8765/`。Python 默认服务器不解析 Vercel clean URLs，文档页面需打开 `/support.html`、`/privacy.html`；英文为 `/en/`、`/en/support.html`、`/en/privacy.html`。正式 clean URLs 由 Vercel 处理。

## 修改后检查

运行 `node --check assets/site.js`。在桌面与手机宽度检查两种语言的首页、支持页和隐私页，确认截图加载、横向浏览、放大、关闭和 Escape 操作正常。确认语言切换保持对应页面，下载按钮指向同一 App Store 地址。
