---
title: "4.2 第一轮：搭建页面框架"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/Basic-old/04-practice-0-to-1/4.2-build-page/index.md"
sourceRel: "docs/Basic-old/04-practice-0-to-1/4.2-build-page/index.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/Basic-old/04-practice-0-to-1/4.2-build-page/index.md"
sourceSha256: "38177b7ced403033f74da0fe2129d34b4dd79ae75031a46eaa0f0e51c56c557b"
pageSha256: "38177b7ced403033f74da0fe2129d34b4dd79ae75031a46eaa0f0e51c56c557b"
contentMode: "local-full"
zh: ""
---

# 4.2 第一轮：搭建页面框架

> **本轮目标**：用 AI 生成待办清单的静态页面，先把"脸"做出来

## 经过本节学习，你将获得

- 一个可以在浏览器中打开的待办清单页面
- 包含标题、输入框、按钮和任务列表的完整布局
- 简洁美观的视觉设计
- 在手机和电脑上都能正常显示的响应式页面

> **[配图建议]**
> 画面内容：本轮结束后的待办清单页面预览图，展示标题、输入区、假数据列表
> Prompt: warm illustration of a simple todo list webpage preview, friendly and approachable style, soft rounded shapes, pastel colors with coral accents, minimal text, clean white background, high quality, 8k --ar 16:9

## 什么是"静态页面"？

静态页面就是只有外观、还没有功能的页面。

想象你在装修新房：

```
毛坯房 → 刷白墙、铺地板（先看整体效果）→ 装电器、接水管（让它能用）→ 入住
```

我们现在要做的，就是"刷白墙"这一步——**先把界面搭出来，看看整体效果对不对**。

这样做有三个好处：

| 好处 | 说明 |
|------|------|
| 快速看到成果 | 5-10 分钟就能看到页面，建立信心 |
| 及早发现问题 | 布局不对、风格不满意，现在改成本最低 |
| 避免返工 | 如果做了很多功能后才发现方向错了，改起来很痛苦 |

## 本轮的工作流程

```
第二章的思考成果 → 用第三章框架写 Prompt → AI 生成静态页面 → 调整样式 → 检查确认
```

我们会用到 4.1 节整理的「项目启动卡」和第三章学的 S.C.A.F.F. 框架。

## 章节导航

| 小节 | 你要做的事 | 预计时间 |
|------|-----------|---------|
| [4.2.1](/lib/07-coding/vibe-vibe/docs-Basic-old-04-practice-0-to-1-4.2-build-page-4.2.1-first-prompt) | 把项目启动卡转化为 Prompt | 5 分钟 |
| [4.2.2](/lib/07-coding/vibe-vibe/docs-Basic-old-04-practice-0-to-1-4.2-build-page-4.2.2-generate-static) | 发送给 AI，生成第一版页面 | 5 分钟 |
| [4.2.3](/lib/07-coding/vibe-vibe/docs-Basic-old-04-practice-0-to-1-4.2-build-page-4.2.3-adjust-style) | 调整颜色、布局、细节 | 8 分钟 |
| [4.2.4](/lib/07-coding/vibe-vibe/docs-Basic-old-04-practice-0-to-1-4.2-build-page-4.2.4-checkpoint) | 检查成果，确认可以进入下一轮 | 2 分钟 |
| [4.2.5](/lib/07-coding/vibe-vibe/docs-Basic-old-04-practice-0-to-1-4.2-build-page-4.2.5-prompt-log) | 回顾完整对话记录 | 2 分钟 |

**预计总时间：约 20 分钟**

::: tip 开始之前
确保你已经完成了 4.1 节的准备工作，AI IDE 已经打开并可以正常使用。
:::

→ [4.2.1 用第三章框架写第一个 Prompt](/lib/07-coding/vibe-vibe/docs-Basic-old-04-practice-0-to-1-4.2-build-page-4.2.1-first-prompt)
