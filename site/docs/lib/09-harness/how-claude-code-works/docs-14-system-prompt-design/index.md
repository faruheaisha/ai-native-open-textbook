---
title: "第 13 章：系统提示词速查手册"
sourceId: "09-harness/how-claude-code-works"
sourceTitle: "How Claude Code Works"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works"
entryUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/14-system-prompt-design.md"
sourceRel: "docs/14-system-prompt-design.md"
rawUrl: "/raw/09-harness/how-claude-code-works/docs/14-system-prompt-design.md"
sourceSha256: "afa12f34c8aae90d6eb6abfc00fad4caf464cd17b20e1511946c8a365f94ea4a"
pageSha256: "39b268a97a2402161c6293a281917e191c105115db2af65f1cb01ebdbc2c6dd7"
contentMode: "local-full"
zh: ""
---

# 第 13 章：系统提示词速查手册

> 本章是 Claude Code 所有系统提示词的速查参考。每个提示词提供英文原文，点击"中文翻译"可展开查看翻译。
>
> 关键源码入口：`src/constants/prompts.ts`（~915 行）

## 本篇目录

- [概览](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/01-概览.md)
- [13.1 主系统提示词（Static Sections）](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/02-13.1_主系统提示词_Static_Sections.md)
- [13.2 动态 Sections（Dynamic Sections）](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/03-13.2_动态_Sections_Dynamic_Sections.md)
- [13.3 内置 Agent 提示词](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/04-13.3_内置_Agent_提示词.md)
- [13.4 Coordinator 模式提示词](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/05-13.4_Coordinator_模式提示词.md)
- [13.5 全部 Tool 提示词](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/06-13.5_全部_Tool_提示词.md)
- [13.6 提示词构建流程](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/07-13.6_提示词构建流程.md)
