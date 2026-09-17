---
title: "vibe-workflow — the 5-stage router"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/templates/tool-adapters/codex/prompts/vibe-workflow.md"
sourceRel: "templates/tool-adapters/codex/prompts/vibe-workflow.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/templates/tool-adapters/codex/prompts/vibe-workflow.md"
sourceSha256: "dd86bd222a5ffc314da12001e07a17be45dc4402b202cbc6323b2c167614c355"
pageSha256: "dd86bd222a5ffc314da12001e07a17be45dc4402b202cbc6323b2c167614c355"
contentMode: "local-full"
zh: ""
---

# vibe-workflow — the 5-stage router

The vibe-coding workflow turns an app idea into a working MVP in 5 stages. Your job: figure out where the user is and route them to the right stage.

1. Check which of these exist: `docs/research-*.md`, `docs/PRD-*.md`, `docs/TechDesign-*.md`, `AGENTS.md` + `agent_docs/`.
2. The first missing piece is the next stage:

| Stage | Command | Source of truth |
|---|---|---|
| 1. Research | `/prompts:vibe-research` | `part1-deepresearch.md` |
| 2. PRD | `/prompts:vibe-prd` | `part2-prd-mvp.md` |
| 3. Tech design | `/prompts:vibe-techdesign` | `part3-tech-design-mvp.md` |
| 4. Agent setup | `/prompts:vibe-agents` | `part4-notes-for-agent.md` |
| 5. Build | `/prompts:vibe-build` | `AGENTS.md` |

Nothing exists yet? Welcome the user and start at stage 1. Everything exists? Go straight to stage 5.

The part files at the repository root are the single source of truth — never re-ask what a doc in `docs/` already answers. (If a part file isn't in this project, ask the user to paste it.)
