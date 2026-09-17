---
title: "3.2 结构化提示词框架：从\"随便说说\"到\"有章可循\""
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/Basic-old/03-technique/3.2-structured-frameworks/index.md"
sourceRel: "docs/Basic-old/03-technique/3.2-structured-frameworks/index.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/Basic-old/03-technique/3.2-structured-frameworks/index.md"
sourceSha256: "7354ea12d40f971f16af896720cf879d8c42a13370314632c87154c77e8b0212"
pageSha256: "7354ea12d40f971f16af896720cf879d8c42a13370314632c87154c77e8b0212"
contentMode: "local-full"
zh: ""
---

# 3.2 结构化提示词框架：从"随便说说"到"有章可循"

在 3.1 节，你学会了"上下文为王"的核心原则，知道了该告诉 AI 什么信息。但你可能还有一个困扰：

> "道理我都懂，但每次写提示词还是要从零开始想，有没有更省力的方法？"

有的。这就是**结构化框架**存在的意义。

## 经过本节学习，你将掌握

- 理解框架的价值：为什么"套公式"反而能写出更好的提示词
- 掌握 S.C.A.F.F. 框架：适合技术开发任务的完整结构
- 掌握 R.G.C. 框架：适合快速提问的精简结构
- 获得万能提示词模板：不确定用哪个框架时的保底选择
- 学会根据场景选择合适的框架

## 与第二章的关系

第二章 2.4.5 介绍了**故事化 Prompt**（身份-现状-痛点-期望），它特别适合需要表达情感和用户痛点的场景。

本节的结构化框架与故事化 Prompt 是**互补关系**，而非替代关系：

| 框架类型 | 核心特点 | 适用场景 |
|---------|---------|---------|
| 故事化 Prompt | 情感驱动，强调用户痛点 | 产品设计、需求沟通 |
| 结构化框架 | 逻辑驱动，强调技术约束 | 代码实现、技术任务 |

你可以根据任务性质灵活选择，甚至组合使用。

## 本节结构

```
3.2.1 为什么需要框架 → 理解框架的价值，消除"套公式很傻"的误解
3.2.2 S.C.A.F.F. 框架 → 完整的五要素框架，适合复杂任务
3.2.3 R.G.C. 框架 → 精简的三要素框架，适合快速提问
3.2.4 万能提示词模板 → 不确定用哪个时的保底选择
3.2.5 框架选择指南 → 什么场景用什么框架
```

准备好了吗？让我们从"为什么需要框架"开始。
