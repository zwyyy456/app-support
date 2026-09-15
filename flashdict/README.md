# 闪卡词典宣传网站

无第三方依赖的静态网站，源码即发布文件，位于本目录 `app-support/flashdict/`。视觉参考 [Linear 官网](https://linear.app/) 的深色表面、精细边框、大字号排版和产品界面叙事，保留闪卡词典自己的图标与文案。

## 本地运行

在本目录执行：

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

打开 <http://127.0.0.1:4173/>。也可以直接打开 `index.html`，所有资源均为相对路径，无需构建、安装依赖或网络字体。

## 文件

- `index.html`：中文产品文案、页面结构、可替换的界面示意。
- `styles.css`：桌面、平板、手机布局以及减少动态效果支持。
- `site.js`：产品标签切换、键盘操作、义项制卡与复习评分示例、共享移动导航、截图与下载配置读取。
- `site-config.js`：截图路径与下载链接。
- `assets/app-icon.png`：复用项目现有图标。
- `assets/site.css`：支持、隐私与许可页面的阅读排版，共用首页导航与品牌样式。

## 页面演示

- 产品概览标签支持左右方向键及 Home / End。
- 义项制卡示例中，点击任意义项旁的 `+`，只将该义项的释义与例句显示在示例闪卡上。
- 复习示例遵循“回忆 → 显示答案 → 评分”，完成后可重新体验。
- 所有交互均为页面内演示，不连接 App，不保存学习数据。

## 验证

项目没有构建或 lint 依赖。修改后运行 `node --check site.js`，并在本地预览检查桌面、手机下的页面布局、义项选择、复习评分、键盘标签切换、移动导航、FAQ 和站内链接。

## 更换截图

将截图存入 `assets/`，在 `site-config.js` 中填写对应路径。图片成功加载后自动替换 HTML 示意，失败时显示图片暂时无法加载的提示。无需改变页面结构。

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
  lookup: "assets/lookup-mac.webp",
  review: "assets/review-mac.webp",
  library: "assets/library-mac.webp",
  mobile: "assets/review-iphone.webp",
}
```

## 下载入口

在 `site-config.js` 的 `downloads.mac` 和 `downloads.ios` 填入正式 HTTPS 下载地址或 App Store 地址。未配置的入口没有链接，明确显示“暂未开放”；配置后自动启用。支持两个入口使用同一条通用 App Store 链接。

## 产品内容依据

网站以 zdict 仓库当前功能与合同为依据；下面的代码路径均相对于 zdict 仓库根目录。产品核心表达为：**查词 → 义项或整词制卡 → FSRS 复习 → 多设备积累**。

- 本地 MDX、多词典查询、查词历史及词典管理：`docs/overview.md`、`architecture.md`。
- 义项快照卡、词典闪卡与先回忆再评分流程：`ui-layout.md`、`docs/contracts/flashcard-contracts.md`。
- FSRS 调度：`FlashDict/Core/Study/FSRSScheduler.swift`。
- 闪卡与复习进度的 iCloud 同步及资源边界：`architecture.md`、`ui-layout.md`。
- Apple、DeepL、OpenAI 兼容翻译：`FlashDict/Features/Translation/`。系统翻译需要 iOS 18 / macOS 15 或更新系统；远程服务需用户配置、启用和联网。
- 闪卡导入导出采用 FlashDict JSON，不宣传 Anki APKG 兼容。

网站没有写入未确认的价格、销量、评价、性能数字或浏览器扩展商店上线承诺。免费层与会员条款由 `docs/contracts/membership-entitlement.md` 定义，页面未扩展为价格方案页。

## 发布

沿用 app-support 现有 Vercel 配置：Root Directory 为 `flashdict`，Framework Preset 为 `Other`，Install / Build Command 留空，Output Directory 为 `.`。`vercel.json` 保留 `cleanUrls`，已有 `/privacy`、`/support`、`/licenses` 路由继续使用原页面。所有页面共用 `styles.css` 和 `site.js` 中的导航逻辑，支持与法律页面另加载 `assets/site.css` 提供阅读排版。首页的 `.html` 链接可直接用于本地预览，Vercel 会按 `cleanUrls` 跳转到无扩展名地址。

网站不包含后端、统计追踪或表单提交，不依赖特定托管平台。

发布前请配置正式下载地址、替换演示截图并核实最终宣传文案。
