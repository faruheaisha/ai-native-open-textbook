---
title: "Agent Skills（Addy Osmani）"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/.claude/commands/plan.md"
sourceRel: ".claude/commands/plan.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/.claude/commands/plan.md"
sourceSha256: "91d961b2a7011209bc6771c176932e72e11b99d0c524e3f63c9f2e2a94fbc993"
pageSha256: "91d961b2a7011209bc6771c176932e72e11b99d0c524e3f63c9f2e2a94fbc993"
contentMode: "local-full"
zh: ""
---

# Agent Skills（Addy Osmani）

Invoke the agent-skills:planning-and-task-breakdown skill.

Read the existing spec (SPEC.md or equivalent) and the relevant codebase sections. Then:

1. Enter plan mode — read only, no code changes
2. Identify the dependency graph between components
3. Slice work vertically (one complete path per task, not horizontal layers)
4. Write tasks with acceptance criteria and verification steps
5. Add checkpoints between phases
6. Present the plan for human review

Save the plan to tasks/plan.md and task list to tasks/todo.md.

If tasks/plan.md or tasks/todo.md already exists with unchecked tasks for different work, stop and ask before writing — never silently overwrite an incomplete plan.
