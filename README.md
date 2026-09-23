# app-support

Hyperseek 应用的静态产品、隐私政策、支持和第三方许可页面。

## 目录与网址

| 目录 | Vercel Project | 正式域名 |
| --- | --- | --- |
| `flashdict/` | `app-support-flashdict` | `flashdict.hyperseek.tech` |
| `zendo/` | `app-support-zendo` | `zendo.hyperseek.tech` |

同一个 GitHub 仓库需要在 Vercel 中导入两次，每个目录对应一个独立的
Vercel Project。页面为纯 HTML/CSS，不需要 Node.js 或构建步骤。

正式页面：

- <https://flashdict.hyperseek.tech/privacy>
- <https://flashdict.hyperseek.tech/support>
- <https://flashdict.hyperseek.tech/licenses>
- <https://zendo.hyperseek.tech/privacy>
- <https://zendo.hyperseek.tech/support>

## 1. 推送到 GitHub

先在 GitHub 创建空仓库 `app-support`，不要让 GitHub 自动添加 README、
`.gitignore` 或 License。然后在本地执行：

```bash
cd /Users/zwyyy/code/app-support
git remote add origin git@github.com:zwyyy456/app-support.git
git push -u origin main
```

如果已经设置过 `origin`，只需要执行：

```bash
git push -u origin main
```

## 2. 部署 FlashDict

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)。
2. 点击 **Add New → Project**。
3. 在 **Import Git Repository** 中选择 `app-support`。
4. Project Name 填写 `app-support-flashdict`。
5. 点击 **Root Directory** 旁的 **Edit**，选择 `flashdict`。
6. 使用以下构建设置：

   | 设置 | 值 |
   | --- | --- |
   | Framework Preset | `Other` |
   | Build Command | 留空 |
   | Output Directory | `.` |
   | Install Command | 留空 |

7. 点击 **Deploy**。
8. 部署完成后，先打开 Vercel 提供的 `*.vercel.app` 地址，确认首页、
   `/privacy`、`/support` 和 `/licenses` 均可访问。

## 3. 绑定 FlashDict 域名

1. 打开 `app-support-flashdict` 的 **Settings → Domains**。
2. 添加 `flashdict.hyperseek.tech`。
3. 在 `hyperseek.tech` 当前使用的 DNS 服务商中添加 Vercel 页面显示的
   CNAME 记录。
4. DNS 记录的目标值以 Vercel Domain 页面当时显示的值为准，不要手写固定值。
5. 等待 Vercel 将域名状态标记为有效并自动签发 HTTPS 证书。

## 4. 部署 Zendo

再次从同一个 GitHub 仓库创建一个 Vercel Project：

1. 点击 **Add New → Project**，再次选择 `app-support`。
2. Project Name 填写 `app-support-zendo`。
3. Root Directory 选择 `zendo`。
4. Framework Preset 选择 `Other`。
5. Build Command 和 Install Command 留空，Output Directory 填写 `.`。
6. 点击 **Deploy**。
7. 在 **Settings → Domains** 添加 `zendo.hyperseek.tech`。
8. 按 Vercel 页面提示，在 DNS 服务商中添加对应 CNAME 记录。

## 5. 上线验收

两个域名生效后检查：

```bash
curl -I https://flashdict.hyperseek.tech/privacy
curl -I https://flashdict.hyperseek.tech/support
curl -I https://flashdict.hyperseek.tech/licenses
curl -I https://zendo.hyperseek.tech/privacy
curl -I https://zendo.hyperseek.tech/support
```

预期返回 `200`。还应在浏览器中检查：

- 页面在手机和桌面宽度下均可正常阅读。
- 页面没有显示 `.html` 扩展名。
- 隐私政策、支持邮箱和站内链接正确。
- HTTPS 证书有效。

在 App Store Connect 提交审核前，必须保证隐私政策和支持 URL 已经可以公开访问。

## 后续发布

两个 Vercel Project 都连接 `main` 分支后，后续只需提交并推送：

```bash
git add .
git commit -m "docs: update support pages"
git push
```

Vercel 会为两个 Project 分别创建部署。由于这是不带 JavaScript workspace
配置的纯静态仓库，一次仓库提交可能触发两个 Project 都重新部署。

每个产品目录中的 `vercel.json` 启用了 `cleanUrls`，所以
`privacy.html` 会以 `/privacy` 形式访问。

## 旧域名迁移

如果下列旧地址已经对外使用，不要立即删除：

- `privacy.flashdict.hyperseek.tech`
- `support.flashdict.hyperseek.tech`
- `license.flashdict.hyperseek.tech`

建议先在原 Vercel Project 或域名设置中添加永久跳转，分别指向：

- `https://flashdict.hyperseek.tech/privacy`
- `https://flashdict.hyperseek.tech/support`
- `https://flashdict.hyperseek.tech/licenses`

确认 App Store、应用内链接和搜索引擎都已切换后，再考虑移除旧域名。

## Vercel 官方文档

- [Using Monorepos](https://vercel.com/docs/monorepos)
- [Deploying Git Repositories](https://vercel.com/docs/git)
- [Static sites without a build step](https://vercel.com/docs/builds#skipping-the-build-step)
- [Adding a custom domain](https://vercel.com/kb/guide/how-do-i-add-a-custom-domain-to-my-vercel-project)
