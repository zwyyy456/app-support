# GitStride 官网源码

[English](README.md) · 简体中文

这是一个适合放入 `app-support/gitstride/` 的双语、多页面静态产品站。英文使用根路径，中文使用 `/zh-cn`。页面视觉、文案、导航和文档均已实现，不是只有首页的样板。

## 运行

建议使用 Node.js 24，项目附有 `.nvmrc`。

```sh
cd gitstride
npm install
npm run dev
```

英文：`http://localhost:4321`；中文：`http://localhost:4321/zh-cn`。

```sh
npm test
npm run build
npm run preview
```

**本次环境无法解析 npm registry，未成功安装 Astro，也未验证 `astro build`。** Astro 固定为 7.3.2，没有伪造 lockfile。在可联网的电脑上执行 `npm install`，检查并提交生成的 `package-lock.json`，后续使用 `npm ci`。详细检查范围见 `docs/VALIDATION.md`。

### 不安装依赖，先看页面

```sh
node scripts/build-static.mjs
node scripts/serve.mjs
```

这条路径仅使用 Node 内置模块，已实际运行。它与 Astro 使用**同一份页面渲染代码**，不是另一套需要同步维护的网站；但不能把它的通过当成 Astro 构建已经通过。

不要直接双击 HTML 来判断站点是否工作：静态站使用根相对路径，请通过本地服务器预览。

## 页面与语言

包含 11 类页面的完整中英文版本，共 22 页，另有 404 页面：产品首页、自动化、文档目录、快速开始、工作区指南、自动化设置、自托管、下载、支持、隐私与权限、许可证。

主导航使用独立页面。首页示意和文档目录使用页内锚点。顶部语言切换跳到同一主题的另一语言版本，并保留共有的章节锚点。不是只在首页切换标题文字。

## 放入 app-support，部署到 Vercel

```text
app-support/
├── flashdict/             保持原样
├── zendo/                 保持原样
└── gitstride/             放入本源码目录
```

创建 GitStride 专用的 Vercel 项目，选择：

| 配置 | 值 |
|---|---|
| Root Directory | `gitstride` |
| Framework Preset | Astro |
| Install Command | 初次 `npm install`；提交 lockfile 后可用 `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js | 24.x |

已提供项目级 `vercel.json`，不要覆盖其他 App 或仓库根部的配置。

官网不需要 OAuth 密钥、GitHub token、数据库或 Vercel 服务端函数。它也不会把 Cloudflare 自动化后端迁移到 Vercel。

**零依赖部署备选**：把 `docs/vercel.static.json` 复制为本项目的 `vercel.json`，即可改用已验证的 Node 静态渲染器构建，页面内容保持一致。

## 发布链接与域名在哪里改

统一编辑 `src/site.config.mjs`：

```js
release: {
  url: '',        // 填写真实 HTTPS 安装包链接
  version: '',    // 不填写则不虚构版本号
  date: '',
  fileSize: '',
},
appStoreUrl: '',  // 没有正式地址就不显示商店入口
supportEmail: '',
privacyReviewed: false,
```

`release.url` 为空时，下载页显示明确的“发布链接占位”，按钮禁用，不会假装已经下载。GitHub 源码、Issues 和 Releases 页面仍有真实入口。

域名在 `site.url` 或 `SITE_URL` 中修改。站点默认 **noindex**，以免占位内容被误当成正式发布。上线前核对隐私文案，设置 `privacyReviewed: true`，再按需设置 `SITE_INDEXABLE=true`。

`.env.example` 可复制为 `.env`；这些都是公开的构建设置，不是密钥。

## 替换图片

图片文件放进 `public/images/`，统一修改 `src/content/media.mjs`。例如：

```js
workspace: {
  en: null,
  'zh-cn': {
    src: '/images/workspace-zh-cn.webp',
    alt: 'GitStride 以看板展示个人 Project 中的事项',
    width: 2400,
    height: 1480,
  },
}
```

配置后，对应语言的真实截图自动取代示意，不需要改页面模板。`null` 继续使用清楚标注的 HTML/CSS 占位。

第一批只需准备看板、菜单栏、Issue 详情三张原图。详细要求及视频配置见 `docs/ASSETS.md`。当前分支标记是临时官网标记，不替代你的正式 App 图标。

## 修改内容

| 文件 | 内容 |
|---|---|
| `src/components/home.mjs` | 首页与自动化营销页 |
| `src/components/pages.mjs` | 下载、支持、隐私与许可证 |
| `src/content/docs.mjs` | 中英文文档正文 |
| `src/content/ui.mjs` | 通用中英文按钮与导航文案 |
| `src/components/previews.mjs` | 工作区、菜单栏等界面占位 |
| `public/styles/site.css` | 全站样式与响应式布局 |
| `public/scripts/site.js` | 视图切换、筛选、弹窗、PR 演示等 |
| `src/lib/routes.mjs` | 路由的唯一列表 |

正文渲染函数使用项目作者维护的 HTML；普通数据通过 `esc()` 转义。不要把外部用户提交的 HTML 直接送入渲染器。

## 上线前检查

```sh
npm test
npm run check:release
```

后一个命令在占位阶段故意不通过：它会提醒补充安装包、真实截图、隐私确认和索引配置。它不能代替安装包签名、App 登录和自动化的验收。

完整测试范围及限制见 `docs/VALIDATION.md`，内容来源见 `docs/SOURCES.md`。本次未修改 GitStride 仓库 README，未提交 GitHub，未执行 Vercel 部署。
