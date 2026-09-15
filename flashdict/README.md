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
  layouts/Page.astro     页面元信息、共享导航与页脚
  layouts/Document.astro 支持与法律页面的阅读布局
  components/            共享 Header、Footer
  scripts/site.js        标签切换、移动导航、制卡与复习演示
  styles/                全站样式与文档页样式
  site.config.mjs        截图路径与下载地址
public/
  assets/                App 图标与待补充的真实截图
```

页面路径为 `/`、`/support`、`/privacy`、`/licenses`，与现有 Vercel 无扩展名地址一致。

## 页面演示

- 产品概览标签支持左右方向键及 Home / End。
- 义项制卡示例中，点击任意义项旁的 `+`，只将该义项的释义与例句显示在示例闪卡上。
- 复习示例遵循“回忆 → 显示答案 → 评分”，完成后可重新体验。
- 所有交互均为页面内演示，不连接 App，不保存学习数据。

## 验证

修改后运行 `npm run build`，并通过 `npm run preview` 检查桌面、手机下的页面布局、义项选择、复习评分、键盘标签切换、移动导航、FAQ 和站内链接。

## 更换截图

将截图存入 `public/assets/`，在 `src/site.config.mjs` 中填写以 `/assets/` 开头的公开路径，然后重新构建。图片成功加载后自动替换 HTML 示意，失败时显示图片暂时无法加载的提示。无需改变页面结构。

| 配置键 | 建议截图内容 | 建议尺寸 |
| --- | --- | --- |
| `lookup` | Mac 查词，包含导航、查询列表、释义和义项 `+` | 2240 × 930 或相近横向比例 |
| `review` | Mac 独立复习窗口，显示答案及评分入口 | 2240 × 930 或相近横向比例 |
| `library` | Mac 词典管理，展示已导入词典与启用状态 | 2240 × 930 或相近横向比例 |
| `mobile` | iPhone 复习页或闪卡详情 | 1170 × 2532 或实际设备尺寸 |

桌面图片区已经带有展示用标题栏，建议裁去截图的系统标题栏，避免重复。图片按原比例显示，不强制拉伸；三张桌面截图使用一致比例，可减少切换时的高度变化。手机图片保持原比例，外层自动加圆角和边框。

建议使用深色主题、无个人信息且允许公开展示的内容。词条、例句均为网站原创演示，不来自真实用户数据，也不表示附赠指定商业词典。图片推荐 WebP 或 PNG。当前所有演示均标有“示意”，并非真实 App 截图。

```js
screenshots: {
  lookup: "/assets/lookup-mac.webp",
  review: "/assets/review-mac.webp",
  library: "/assets/library-mac.webp",
  mobile: "/assets/review-iphone.webp",
}
```

## 下载入口

在 `src/site.config.mjs` 的 `downloads.mac` 和 `downloads.ios` 填入正式 HTTPS 下载地址或 App Store 地址。未配置的入口没有链接，明确显示“暂未开放”；配置后自动启用。支持两个入口使用同一条通用 App Store 链接。

## 产品内容依据

网站以 zdict 仓库当前功能与合同为依据；下面的代码路径均相对于 zdict 仓库根目录。产品核心表达为：**查词 → 义项或整词制卡 → FSRS 复习 → 多设备积累**。

- 本地 MDX、多词典查询、查词历史及词典管理：`docs/overview.md`、`architecture.md`。
- 义项快照卡、词典闪卡与先回忆再评分流程：`ui-layout.md`、`docs/contracts/flashcard-contracts.md`。
- FSRS 调度：`FlashDict/Core/Study/FSRSScheduler.swift`。
- 闪卡与复习进度的 iCloud 同步及资源边界：`architecture.md`、`ui-layout.md`。
- Apple、DeepL、OpenAI 兼容翻译：`FlashDict/Features/Translation/`。系统翻译需要 iOS 18 / macOS 15 或更新系统；远程服务需用户配置、启用和联网。
- 闪卡导入导出采用 FlashDict JSON，不宣传 Anki APKG 兼容。

网站没有写入未确认的价格、销量、评价、性能数字或浏览器扩展商店上线承诺。免费层与会员条款由 `docs/contracts/membership-entitlement.md` 定义，页面未扩展为价格方案页。

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

网站没有统计追踪、表单提交、网络字体或前端框架运行时。正式截图与下载地址仍由 `src/site.config.mjs` 配置；未提供时继续显示已标注的演示与不可点击的下载入口。
