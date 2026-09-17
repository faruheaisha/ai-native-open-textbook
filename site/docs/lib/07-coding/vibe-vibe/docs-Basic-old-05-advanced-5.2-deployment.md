---
title: "5.2 见世面：把网页发到互联网上"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/Basic-old/05-advanced/5.2-deployment/index.md"
sourceRel: "docs/Basic-old/05-advanced/5.2-deployment/index.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/Basic-old/05-advanced/5.2-deployment/index.md"
sourceSha256: "3c2f6f5584d72fb9754b1398590009ef3a54e15c03fd72c331a3c815e596c5a6"
pageSha256: "3c2f6f5584d72fb9754b1398590009ef3a54e15c03fd72c331a3c815e596c5a6"
contentMode: "local-full"
zh: ""
---

# 5.2 见世面：把网页发到互联网上

还记得你在第四章做的待办清单吗？它现在只能在你自己的电脑上运行。本节将带你把它发布到互联网上，让全世界都能访问。

## 经过本节学习，你将掌握

- 理解"部署"的含义，消除对上线的恐惧
- 根据自己的情况选择合适的部署平台
- 完成从本地项目到线上网站的完整流程
- 获得一个可以分享给任何人的真实网址

## 现在 vs 上线后

| 对比项 | 现在（本地） | 上线后 |
|-------|------------|-------|
| 访问方式 | 只能在你电脑上打开 | 任何设备都能访问 |
| 网址 | localhost:3000 | your-todo.zeabur.app |
| 分享 | 要把电脑递给别人看 | 发个链接就行 |
| 手机使用 | 无法使用 | 随时随地使用 |
| 关机后 | 别人无法访问 | 24小时在线 |

## 章节导航

| 小节 | 主题 | 预计时间 |
|------|------|---------|
| [5.2.1](/lib/07-coding/vibe-vibe/docs-Basic-old-05-advanced-5.2-deployment-5.2.1-why-deploy) | 为什么要部署上线 | 3分钟 |
| [5.2.2](/lib/07-coding/vibe-vibe/docs-Basic-old-05-advanced-5.2-deployment-5.2.2-platform-guide) | 部署平台选择指南 | 5分钟 |
| [5.2.3](/lib/07-coding/vibe-vibe/docs-Basic-old-05-advanced-5.2-deployment-5.2.3-zeabur) | Zeabur 部署实战（大陆首选） | 10分钟 |
| [5.2.4](/lib/07-coding/vibe-vibe/docs-Basic-old-05-advanced-5.2-deployment-5.2.4-vercel) | Vercel 部署实战 | 8分钟 |
| [5.2.5](/lib/07-coding/vibe-vibe/docs-Basic-old-05-advanced-5.2-deployment-5.2.5-after-deploy) | 部署后的实用操作 | 5分钟 |
| [5.2.6](/lib/07-coding/vibe-vibe/docs-Basic-old-05-advanced-5.2-deployment-5.2.6-china-solution) | 大陆访问解决方案 | 5分钟 |
| [5.2.7](/lib/07-coding/vibe-vibe/docs-Basic-old-05-advanced-5.2-deployment-5.2.7-other-platforms) | 其他部署选择 | 3分钟 |
| [5.2.8](/lib/07-coding/vibe-vibe/docs-Basic-old-05-advanced-5.2-deployment-5.2.8-faq) | 部署常见问题 | 3分钟 |
| [5.2.9](/lib/07-coding/vibe-vibe/docs-Basic-old-05-advanced-5.2-deployment-5.2.9-checklist) | 本节检查清单 | 2分钟 |

**预计总时间：约 40-45 分钟**

::: tip 提示
如果你在中国大陆，建议优先阅读 5.2.2 和 5.2.3，使用 Zeabur 部署。如果你在海外或有自定义域名，可以选择 Vercel。
:::

→ [5.2.1 为什么要部署上线](/lib/07-coding/vibe-vibe/docs-Basic-old-05-advanced-5.2-deployment-5.2.1-why-deploy)
