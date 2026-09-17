---
title: "vibe-build — Step 5: Build the MVP"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/templates/tool-adapters/codex/prompts/vibe-build.md"
sourceRel: "templates/tool-adapters/codex/prompts/vibe-build.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/templates/tool-adapters/codex/prompts/vibe-build.md"
sourceSha256: "ac991fc70076b3fff28a8db74ae2dfbc315e7d55e7e928998e25652e086449a0"
pageSha256: "ac991fc70076b3fff28a8db74ae2dfbc315e7d55e7e928998e25652e086449a0"
contentMode: "local-full"
zh: ""
---

# vibe-build — Step 5: Build the MVP

Step 5 of the vibe-coding workflow: build the MVP one verified feature at a time.

**Read `AGENTS.md` first — it is now the source of truth** (roadmap, commands, rules); details live in `agent_docs/`. If `AGENTS.md` doesn't exist yet, route the user to `/prompts:vibe-agents` first.

The essentials:
- Plan → execute → verify, ONE feature at a time. Propose a short plan and get approval before coding.
- After each feature: run the project's tests and linter, then update `## Current State` in `AGENTS.md` and `MEMORY.md`.
- Never delete files or change the database schema without confirmation.
- Before launch: work through `REVIEW-CHECKLIST.md`, including its Security section (secrets, auth, dependencies, rate limits).
