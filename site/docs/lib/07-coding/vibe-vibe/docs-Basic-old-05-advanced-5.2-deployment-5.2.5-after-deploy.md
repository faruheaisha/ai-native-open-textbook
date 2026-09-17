---
title: "5.2.5 部署后的实用操作"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/Basic-old/05-advanced/5.2-deployment/5.2.5-after-deploy.md"
sourceRel: "docs/Basic-old/05-advanced/5.2-deployment/5.2.5-after-deploy.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/Basic-old/05-advanced/5.2-deployment/5.2.5-after-deploy.md"
sourceSha256: "fd2ca513127574b39d7f02b750ae6bf77d6acda8f8b996b4466754a1846f064c"
pageSha256: "fd2ca513127574b39d7f02b750ae6bf77d6acda8f8b996b4466754a1846f064c"
contentMode: "local-full"
zh: ""
---

# 5.2.5 部署后的实用操作

部署成功只是开始。你会持续改进你的项目，需要知道如何更新线上版本、如何查看部署状态、以及出问题时如何回滚。

## 如何更新网站

这是最常用的操作。当你在本地修改了代码，想让线上版本也更新，你需要做的是：

```
本地修改代码 → git add → git commit → git push → 自动部署
```

具体步骤：

1. 在本地修改你的代码（比如改了一个按钮的颜色）
2. 使用 GitHub Desktop 提交更改
3. 点击"Push origin"推送到 GitHub
4. 等待 1-2 分钟
5. 刷新你的网站，看到更新

**你不需要**重新登录部署平台，也不需要点击任何部署按钮。Zeabur 和 Vercel 都会自动检测你的代码更新，并自动重新部署。

这就是"持续部署"（Continuous Deployment）的魔力。

## 如何查看部署历史

每次代码更新后的部署都会留下记录。你可以在部署平台的控制台中查看：

### 在 Zeabur 中

1. 登录 Zeabur 控制台
2. 点击你的项目
3. 点击你的服务
4. 找到"部署记录"或"Deployments"选项卡

你可以看到：
- 每次部署的时间
- 部署是成功还是失败
- 每次部署对应的 Git 提交

### 在 Vercel 中

1. 登录 Vercel Dashboard
2. 点击你的项目
3. 点击"Deployments"选项卡

每次 Git Push 都会产生一条部署记录，甚至每个分支都有独立的预览链接。

## 如何回滚到之前的版本

如果你更新后发现网站出了问题，可以快速回滚到之前正常的版本。

### 在 Zeabur 中

1. 找到部署历史
2. 找到之前正常的部署记录
3. 点击"重新部署"或"Redeploy"

### 在 Vercel 中

1. 在 Deployments 页面找到之前的部署
2. 点击右侧的三个点菜单
3. 选择"Promote to Production"

回滚是即时的，通常几秒钟就能生效。

## 如何查看部署日志

当部署失败时，日志是排查问题的关键。

在部署记录中，点击具体的某次部署，可以看到：
- 构建日志：项目是如何被构建的
- 运行日志：项目运行时的输出

如果看到红色的错误信息，可以复制给 AI 帮你分析。

## 自定义域名（进阶预告）

现在你使用的是平台提供的免费域名：
- Zeabur：`your-project.zeabur.app`
- Vercel：`your-project.vercel.app`

如果你想要自己的域名（如 `my-todo.com`），需要：
1. 购买域名（阿里云、腾讯云、Cloudflare 等）
2. 在部署平台中绑定域名
3. 配置 DNS 记录

这些操作稍微复杂一些，属于进阶版的内容。对于学习和个人使用来说，免费域名完全够用。

::: tip 进阶版预告
在进阶版中，你将学习如何购买和配置自定义域名，以及如何使用 Cloudflare 加速你的网站。
:::

→ [5.2.6 大陆访问解决方案](/lib/07-coding/vibe-vibe/docs-Basic-old-05-advanced-5.2-deployment-5.2.6-china-solution)
