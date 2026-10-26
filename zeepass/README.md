# ZeePass website

ZeePass 的中英文宣传首页、隐私政策与帮助页面。采用产品自身的蓝色和官方图标；首页交互为虚构数据的概念演示，明确标注为非 App 截图。

## 开发与构建

需要 Node.js 22 或更新版本。不依赖第三方运行库，无需安装依赖。

```sh
npm run dev
# http://127.0.0.1:4173
```

源码修改后重新运行 `npm run build`，再刷新浏览器。开发服务不包含热更新。

```sh
npm run build
npm run preview
```

构建产物位于 `dist/`，可部署到支持静态目录页面的服务器。`PORT=4174 npm run preview` 可更换端口。

## 页面

| 中文 | English | 用途 |
| --- | --- | --- |
| `/` | `/en/` | 宣传首页及交互演示 |
| `/privacy` | `/en/privacy` | 隐私政策及 Google 用户数据处理说明 |
| `/support` | `/en/support` | 常见问题与邮件支持 |

另有 `404.html`、`robots.txt`、`sitemap.xml`，每页设置 canonical、语言替代链接和 Open Graph 信息。

## 内容维护

- `src/config.mjs`：正式域名、支持邮箱、发布日期和下载地址。当前 `downloadUrl: null`，网站显示“即将发布”；填入验证过的 App Store / TestFlight 链接后，首页与下载问答使用该地址。
- `src/content.mjs`：中英文首页与帮助文案。
- `src/privacy.mjs`：双语隐私政策。按实际发行版的数据处理行为维护，不能将网站发布等同于 Google 审核通过。
- `src/render.mjs`：共享页面结构、导航、页脚与产品演示。
- `public/assets/site.css`：响应式样式、键盘焦点与减少动态效果偏好。
- `public/assets/site.js`：仅用于虚构演示中的条目切换和锁定，不保存或请求用户数据。

## 素材与事实来源

品牌图标来自 ZeePass 当前 macOS 构建的官方 `zeepass.icns`，转换为 PNG，不重新绘制。源品牌资源在 App 工程的 `zeepass/zeepass.icon/`。其他图示由 HTML/CSS 和简单内联 SVG 构成，没有外部字体、图片服务、分析脚本或广告。

产品内容根据 ZeePass 工程的 `docs/product-design.md`、`docs/cloud-sync-setup.md` 和 `architecture.md` 编写，包括本地优先、KDBX 导入导出、同步边界与第三方登录数据。App 尚未公开发布，没有放置商店徽章、虚构用户评价、审计背书或下载链接。

## 部署到现有 Vercel 仓库

在 Vercel 导入 `app-support` 仓库，为 ZeePass 建立独立项目：

- Root Directory：`zeepass`
- Framework：Other
- Install Command：留空
- Build Command：`npm run build`
- Output Directory：`dist`
- Domain：`zeepass.hyperseek.tech`

目录中的 `vercel.json` 已配置对应构建与安全响应头。不需要环境变量，也不要将 OAuth App secret 或访问令牌放入网站。

部署后确认 `/`、`/privacy`、`/support` 及英文页面均返回正常页面，再用于 Google / Dropbox 品牌资料。域名所有权、DNS、HTTPS 和 Google 品牌验证属于控制台配置，本次仅交付源码，没有部署、推送或提交审核。

## 已完成检查

- Node 静态构建成功。
- 在 Codex 内置浏览器检查六个页面的 1440 / 390 / 320 像素布局，无横向溢出。
- 目视检查桌面中文首页、手机中英文首页、隐私页、支持页。
- 验证条目切换、锁定后隐藏条目、解锁、页面导航和 FAQ。
- 站内资源与锚点静态检查；浏览器未记录 JavaScript 错误。

未验证公网部署、Google 审核结果或真实 App 的登录同步；网页演示不能替代 App 验证。
