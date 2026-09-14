# 图片与录屏替换清单 / Asset checklist

先提供无敏感内容的 PNG 原图，不必自行加背景、透视、标题或阴影。真实 App UI 优先于示意图；网页里的控件排列只是占位，不应据此改变 App。

| 槽位 | 需要的素材 | 建议 |
|---|---|---|
| `workspace` | 主窗口看板 | 约 8–12 个合理分布的事项，保留完整 App 窗口；窗口宽度约 1200–1500 逻辑像素，提供 Retina 原图 |
| `menubar` | 菜单栏弹窗 | 保留顶部菜单栏和弹窗周围少量桌面，去除私人菜单项与通知 |
| `issue` | Issue 详情 | 正文、负责人、标签或里程碑、父子关系，不必堆满所有字段 |
| 备用 | 表格与我的工作 | 之后可扩展到文档或产品页；当前无需上传即可浏览源码 |
| `automationVideo` | 同一 Issue 的 PR 流转 | 先 Draft，再 Ready，再合并；说明是真实录屏，剪掉等待时应标注，不暗示保证瞬时生效 |
| 品牌 | 正式 App 图标 / Logo | 取代当前临时分支标记与 favicon |
| 社交分享 | 英中各一张 1200×630 图 | `site.socialImage` 中配置，不建议用 SVG 作为社交卡片主图 |

## 当前配置

主窗口、菜单栏弹窗和 Issue 详情已接入中英文真实截图，原始 Retina PNG 位于 `public/images/`：

| 槽位 | 中文 | 英文 | 像素尺寸 |
|---|---|---|---|
| `workspace` | `workspace-zh-cn.png` | `workspace-en.png` | 3024 × 1898 |
| `menubar` | `menubar-zh-cn.png` | `menubar-en.png` | 800 × 972 |
| `issue` | `issue-zh-cn.png` | `issue-en.png` | 3024 × 1898 |

截图按原比例展示。菜单栏图像是弹窗本身，不包含桌面菜单栏，网页展示宽度不超过 400 CSS 像素。

工作区截图整体替换原有交互示意，因此不再提供示例看板／表格切换、搜索和事项点击。`automationVideo` 保持 `null`，首页和自动化页继续使用现有交互示意，暂不制作录屏。

## 语言

中文和英文分别配置。不要在真实截图上伪造另一语言的按钮。另一语言暂缺时保留其对应占位，或明确说明实际截图使用的界面语言。

## 示例

```js
// src/content/media.mjs
menubar: {
  en: {
    src: '/images/menubar-en.webp',
    alt: 'The GitStride menu bar popover showing In Progress issues',
    width: 1500,
    height: 1100,
  },
  'zh-cn': null,
},
automationVideo: {
  en: {
    src: '/images/automation-en.mp4',
    type: 'video/mp4',
    poster: '/images/automation-poster-en.webp',
    caption: 'Recorded in GitStride. Waiting periods have been shortened.',
  },
  'zh-cn': null,
},
```

视频使用浏览器原生播放控件，不自动播放。建议无旁白；有语音时需扩展组件加入对应字幕轨道。发布资源放入 `public/images/`，不要把授权页面、设备验证码、令牌、私有仓库和 Issue 内容放进去。

## Why there are no arbitrary stock photos

The product interface is the visual proof. Workspace, menu bar, and issue detail visuals use real localized GitStride screenshots; the automation flow uses a labeled HTML/CSS illustration. No unrelated photography, invented testimonials, screenshots of Linear, remote assets, or font files are included.
