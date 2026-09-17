---
title: "Task Creation Template"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/notion-spec-to-implementation/reference/task-creation-template.md"
sourceRel: "skills/.curated/notion-spec-to-implementation/reference/task-creation-template.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/notion-spec-to-implementation/reference/task-creation-template.md"
sourceSha256: "010a9a3b1d95633220bb93ffcab5f2f49e897c5d4e4231940d691719bec1be34"
pageSha256: "010a9a3b1d95633220bb93ffcab5f2f49e897c5d4e4231940d691719bec1be34"
contentMode: "local-full"
zh: ""
---

# Task Creation Template

When creating tasks from spec.

```markdown
# [Task Name]

## Context
Part of implementation for <mention-page url="...">Feature Spec</mention-page>

Implementation plan: <mention-page url="...">Implementation Plan</mention-page>

## Description
[What needs to be done]

## Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]

## Technical Details
[Technical approach or notes]

## Dependencies
- Blocked by: [Task] or None
- Blocks: [Task] or None

## Resources
- [Link to design]
- [Link to related code]

## Progress
[To be updated during implementation]
```
