# winornot 宣传首页

直接打开 `index.html` 即可预览。也可以在本目录运行 `python3 -m http.server 8765 --bind 127.0.0.1`，再访问 `http://127.0.0.1:8765/`。页面无需安装依赖或构建。

网站默认跟随系统的浅色或深色外观。可以用页头的太阳或月亮按钮手动切换，浏览器允许保存时会记住选择。

把截图放进 `assets/`，在 `index.html` 中对应的 `.media-slot` 内插入 `<img src="assets/文件名.webp" alt="描述画面内容">`。截图会等比显示。

| 位置 | 画面 |
| --- | --- |
| `.media-score` | iPhone 横屏计分，建议同时看得到比分和发球提示 |
| `.media-history` | iPad 横屏战绩，建议显示比赛列表和一场比赛的详情 |
| `.media-players` | iPhone 竖屏球友档案，建议显示交手记录 |

下载地址开放后，在 `#availability` 的平台信息区接入正式链接，同时更新开发状态。
