# 闪卡词典宣传网站

基于 Astro 7.3.2 的中文静态网站，与同仓库 `gitstride/` 使用相同版本。Astro 在构建时生成 HTML、CSS 和浏览器脚本，页面不需要服务器运行时。

## 本地开发

使用 Node.js 24（见 `.nvmrc`）。依赖已准备好时，在本目录执行：

```sh
npm run dev
```

打开 <http://localhost:4321>。首次独立安装或在 CI 中准备依赖时使用 `npm ci`。

```sh
npm run build
npm run preview
```

构建输出位于 `dist/`。源码中的 `.astro` 页面需要经过 Astro 构建，不能直接当作 HTML 打开。

## 文件结构

```text
src/
  pages/                 首页、支持、隐私与许可页面
  layouts/Page.astro     Canonical / 社交分享元信息、结构化数据、共享导航与页脚
  layouts/Document.astro 支持与法律页面的阅读布局
  components/            共享 Header、Footer
  scripts/site.js        标签切换、移动导航、义项制卡演示
  styles/                全站样式与文档页样式
  site.config.mjs        截图路径与下载地址
public/
  assets/                App 图标与四张真实截图
```

页面路径为 `/`、`/support`、`/privacy`、`/licenses`，与现有 Vercel 无扩展名地址一致。

## 页面演示

- 首页先说明原句的两种入口：Safari / Firefox 扩展自动提取，或从支持系统分享与 macOS 服务的其他 App 手动发送；后续流程示意解释“原句 → 当前义项 → 带原句的闪卡”。内容是概念演示，不会读取或保存访问者文本。
- 产品概览的三个标签展示 Mac 实际截图，支持左右方向键及 Home / End；窄屏可横向查看完整界面，点击截图可打开原图。
- 义项制卡示例中，点击任意义项旁的 `+`，只将该义项的释义与例句显示在示例闪卡上。
- 义项制卡交互是页面内演示，不连接 App，不保存学习数据；复习区域展示 App 实际答案和评分界面。

## 验证

修改后运行 `npm run build`，并通过 `npm run preview` 检查桌面、手机下的页面布局、截图加载与原图入口、义项选择、键盘标签切换、移动导航、FAQ 和站内链接。

## 截图

四张截图已接入，保留提供的 PNG 原图、文件路径和调试信息。

| 配置键 | 文件 | 尺寸 |
| --- | --- | --- |
| `lookup` | `public/assets/lookup-mac.png` | 3024 × 1898 |
| `review` | `public/assets/review-mac.png` | 1800 × 1304 |
| `library` | `public/assets/library-mac.png` | 3024 × 1898 |
| `mobile` | `public/assets/review-iphone.png` | 1206 × 2622 |

图片路径在 `src/site.config.mjs` 中配置，使用以 `/assets/` 开头的公开路径。更换图片后重新构建；尺寸变化时，同步更新 `src/pages/index.astro` 中对应图片的 `width` 和 `height`。

截图由 Astro 直接输出到 HTML，不需要浏览器脚本加载后再替换。Mac 截图保留自身标题栏，网站不另加模拟标题栏；三个标签使用相同展示高度并按原比例完整显示图片。窄屏下可横向查看，所有截图均可点击打开原图。

截图展示实际导入的词典，不表示 App 附赠这些词典内容。下方的义项制卡流程继续使用已标注的原创交互示意。

## 下载入口

在 `src/site.config.mjs` 的 `downloads.mac` 和 `downloads.ios` 填入正式 HTTPS 下载地址或 App Store 地址。下载状态在构建时直接写入 HTML；未配置的入口没有链接并显示“暂未开放”。支持两个入口使用同一条通用 App Store 链接。

## 产品内容依据

网站以 zdict 仓库当前功能与合同为依据；下面的代码路径均相对于 zdict 仓库根目录。产品核心表达为：**阅读原句 → 点词查释义 → 保存当前义项与原句 → FSRS-6 复习 → 多设备积累**。

- 本地 MDX、多词典查询、查词历史及词典管理：`docs/overview.md`、`architecture.md`。
- 原句查词、原句与来源保存：`FlashDict/Features/Search/ContextualLookup/`。
- 词典正文双击查词：`FlashDict/Core/Web/WebBridgeScripts.swift`。
- 目录与子目录批量扫描：`FlashDict/Core/Services/DictionaryAccess/DirectoryService.swift`。
- 单词列表批量制卡：`FlashDict/Features/DictionaryManagement/`。
- 义项快照卡、词典闪卡与先回忆再评分流程：`ui-layout.md`、`docs/contracts/flashcard-contracts.md`。
- FSRS 调度：`FlashDict/Core/Study/FSRSScheduler.swift`。
- 闪卡与复习进度的 iCloud 同步及资源边界：`architecture.md`、`ui-layout.md`。
- Apple、DeepL、OpenAI 兼容翻译：`FlashDict/Features/Translation/`。系统翻译需要 iOS 18 / macOS 15 或更新系统；远程服务需用户配置、启用和联网。
- 闪卡导入导出采用 FlashDict JSON，不宣传 Anki APKG 兼容。

网站没有写入未确认的价格、销量、评价、性能数字或浏览器扩展商店上线承诺。免费层与会员条款由 `docs/contracts/membership-entitlement.md` 定义；首页只说明稳定额度与方案类型，实际价格引导到 App Store 查看。

## Vercel 部署配置

沿用 app-support 中 FlashDict 的独立 Vercel 项目，配置如下：

| 设置 | 值 |
| --- | --- |
| Root Directory | `flashdict` |
| Framework Preset | Astro |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js | 24.x |

`vercel.json` 已声明 Astro 构建与输出目录，保留 `cleanUrls` 和无尾斜杠地址。现有 Vercel 项目如果设置了旧的静态站点覆盖值，需要同步改为上表配置。无需 Vercel adapter、后端或环境变量。

网站没有统计追踪、表单提交、网络字体或前端框架运行时。截图与下载地址由 `src/site.config.mjs` 配置；当前四张截图已提供，下载地址留空时显示不可点击的下载入口。
