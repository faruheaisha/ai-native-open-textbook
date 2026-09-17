---
title: "4.5 Debug 实战：当 AI 代码报错时"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/Basic-old/04-practice-0-to-1/4.5-debug/index.md"
sourceRel: "docs/Basic-old/04-practice-0-to-1/4.5-debug/index.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/Basic-old/04-practice-0-to-1/4.5-debug/index.md"
sourceSha256: "51e67b1f1c330900b08c7ed6ee78885d78abe2be456259b414581f700c5db515"
pageSha256: "51e67b1f1c330900b08c7ed6ee78885d78abe2be456259b414581f700c5db515"
contentMode: "local-full"
zh: ""
---

# 4.5 Debug 实战：当 AI 代码报错时

经过本节学习，你将掌握：
- 识别待办清单开发中的四类常见错误
- 用 AI 诊断和修复代码问题的标准流程
- 处理真实报错的完整对话技巧
- 建立「报错不可怕」的 Debug 心态

## 与第三章的关系

第三章 3.6 节讲的是**原理层面**：AI 有哪些「不听话」的表现、如何识别 AI 幻觉、诊断问题的思维框架。

本节讲的是**实操层面**：围绕你正在开发的待办清单项目，展示真实的报错信息、完整的修复对话、可直接复制的 Prompt 模板。

简单说：3.6 教你「遇到问题该怎么想」，4.5 教你「遇到问题该怎么做」。

## 为什么报错是正常的

在开发待办清单的过程中，你可能已经遇到了一些报错。别担心，这完全正常。

| 误解 | 事实 |
|------|------|
| "报错说明我做错了" | 报错是代码在告诉你哪里需要调整 |
| "专业程序员不会遇到报错" | 专业程序员每天都在 debug，只是他们知道怎么解决 |
| "AI 生成的代码应该没问题" | AI 不了解你的具体环境，需要你帮它调整 |

好消息是：**AI 能帮你解决 90% 的常见问题**。你只需要学会「怎么问」。

## 章节导航

| 小节 | 主题 | 你将学到 |
|------|------|---------|
| [4.5.1](/lib/07-coding/vibe-vibe/docs-Basic-old-04-practice-0-to-1-4.5-debug-4.5.1-error-types) | 常见错误类型速查 | 四类错误的识别方法，如何阅读控制台报错 |
| [4.5.2](/lib/07-coding/vibe-vibe/docs-Basic-old-04-practice-0-to-1-4.5-debug-4.5.2-fix-with-ai) | 用 AI 帮你修 AI 的代码 | 诊断、修复、验证的完整 Prompt 模板 |
| [4.5.3](/lib/07-coding/vibe-vibe/docs-Basic-old-04-practice-0-to-1-4.5-debug-4.5.3-real-cases) | 真实案例复盘 | 6 个待办清单开发中的典型错误及解决过程 |
| [4.5.4](/lib/07-coding/vibe-vibe/docs-Basic-old-04-practice-0-to-1-4.5-debug-4.5.4-debug-mindset) | Debug 心法总结 | 建立正确的 debug 心态和习惯 |

**预计学习时间：约 25-30 分钟**

## 开始之前

确保你已经完成了 4.2-4.4 的开发，手上有一个基本可用的待办清单。如果你的代码目前能正常运行，也可以先浏览本章内容，等遇到问题时再回来查阅。

准备好了吗？让我们从认识常见的错误类型开始。

→ [4.5.1 常见错误类型速查](/lib/07-coding/vibe-vibe/docs-Basic-old-04-practice-0-to-1-4.5-debug-4.5.1-error-types)
