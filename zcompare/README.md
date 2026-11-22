# zcompare 产品网站

站点使用 Astro 生成静态页面。中文为 `/`、`/support`、`/privacy`，英文为 `/en`、`/en/support`、`/en/privacy`。语言链接切换到对应页面，两种语言共用首页布局、样式和真实 App 截图。

## 本地预览

使用 Node.js 24（见 `.nvmrc`）。首次预览安装依赖，随后启动开发服务器：

```sh
npm ci
npm run dev
```

打开终端显示的本地地址，默认是 `http://localhost:4321/`。首页默认深色，可用页头按钮切换，也可在页面地址后加 `?theme=light`。三个比较示例支持鼠标点击和方向键切换，截图可查看原图。

检查生产构建时运行：

```sh
npm run build
npm run preview
```

## 内容与部署

首页中英文文案在 `src/home-copy.ts`，截图在 `public/assets/`。两种配色共用浅色 App 截图。首屏截取完整窗口上部，文件格式卡片使用同一窗口的 `-detail.webp` 局部图。点击图片打开完整窗口。更新素材时使用演示数据，避免露出私有路径，并按实测尺寸更新首页中的图片宽高。

Vercel 项目使用 `zcompare` 作为 Root Directory，通过 `vercel.json` 构建并输出到 `dist/`。正式域名确定后，可在构建环境设置 `SITE_URL` 为站点根地址，生成绝对 canonical 和 hreflang 链接。
