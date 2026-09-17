---
title: "Cursor Rules And Background Agents"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/docs/tools/cursor-cloud-agents.md"
sourceRel: "docs/tools/cursor-cloud-agents.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/docs/tools/cursor-cloud-agents.md"
sourceSha256: "d8eb18e9fa7cff8bb09a93ab0ed319ca0f621a39b9221dda4c2a393e05d65daa"
pageSha256: "d8eb18e9fa7cff8bb09a93ab0ed319ca0f621a39b9221dda4c2a393e05d65daa"
contentMode: "local-full"
zh: ""
---

# Cursor Rules And Background Agents

Last verified: 2026-05

Use this when: a generated project will use Cursor rules, Bugbot, background agents, or shared environments.

## Quick Answer

Keep Cursor rules small. Put product details in `AGENTS.md` and `agent_docs/`, then use `.cursor/rules/` to point Cursor at the right files.

## Checklist

- [ ] `.cursor/rules/00-project.mdc` says to read `AGENTS.md` first.
- [ ] Scoped rules exist only when needed, such as frontend, backend, or tests.
- [ ] `.cursor/BUGBOT.md` tells Bugbot to focus on bugs, missing tests, secrets, and AI/tool permission risks.
- [ ] `.cursor/environment.json.example` uses idempotent setup commands.
- [ ] Background agents work on isolated branches.
- [ ] Diffs, logs, and tests are reviewed before merge.

## Example Rule

```mdc
---
alwaysApply: true
---

Read AGENTS.md first. Use agent_docs/ for implementation details.
Propose a plan before multi-file edits. Run the checks in agent_docs/testing.md.
```

## Links

- [Cursor Rules](https://docs.cursor.com/en/context)
- [Cursor Memories](https://docs.cursor.com/en/context/memories)
- [Cursor Background Agents](https://docs.cursor.com/en/background-agents)
- [Cursor Bugbot](https://docs.cursor.com/bugbot)
