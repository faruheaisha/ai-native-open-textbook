---
title: "编写计划"
sourceId: "10-context-memory/superpowers-zh"
sourceTitle: "superpowers-zh（AI 编程超能力 · 中文增强版）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/jnMetaCode/superpowers-zh"
entryUrl: "https://github.com/jnMetaCode/superpowers-zh/blob/79ea5d262b7a1c7ce76a289390853bca51f940d4/skills/writing-plans/SKILL.md"
sourceRel: "skills/writing-plans/SKILL.md"
rawUrl: "/raw/10-context-memory/superpowers-zh/skills/writing-plans/SKILL.md"
sourceSha256: "e653b65796de650f3ce81ca34d51bc159ade192f9924ca240b7aeb2e085fd64a"
pageSha256: "e653b65796de650f3ce81ca34d51bc159ade192f9924ca240b7aeb2e085fd64a"
contentMode: "local-full"
zh: ""
---

# 编写计划

## 概述

编写全面的实现计划，假设工程师对我们的代码库零上下文，且品味存疑。记录他们需要知道的一切：每个任务要修改哪些文件、代码、测试、可能需要查阅的文档、如何测试。将整个计划拆成小步骤任务。DRY。YAGNI。TDD。频繁 commit。

假设他们是有经验的开发者，但对我们的工具链和问题领域几乎一无所知。假设他们不太擅长测试设计。

**开始时宣布：** "我正在使用 writing-plans 技能创建实现计划。"

**上下文：** 此技能应在专用 worktree 中运行（由 brainstorming 技能创建）。
