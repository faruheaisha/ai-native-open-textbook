---
title: "Task Creation from Specs"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/notion-spec-to-implementation/reference/task-creation.md"
sourceRel: "skills/.curated/notion-spec-to-implementation/reference/task-creation.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/notion-spec-to-implementation/reference/task-creation.md"
sourceSha256: "60a2eb24530097b7c4011582bb3954576655a30c0c95e9a8a12ff6a19aee3a26"
pageSha256: "60a2eb24530097b7c4011582bb3954576655a30c0c95e9a8a12ff6a19aee3a26"
contentMode: "local-full"
zh: ""
---

# Task Creation from Specs

## Finding the Task Database

Before creating tasks, locate the task database:

```
1. Search for task database:
   Notion:notion-search
   query: "Tasks" or "Task Management" or "[Project] Tasks"
   
2. Fetch database schema:
   Notion:notion-fetch
   id: "database-id-from-search"
   
3. Identify data source:
