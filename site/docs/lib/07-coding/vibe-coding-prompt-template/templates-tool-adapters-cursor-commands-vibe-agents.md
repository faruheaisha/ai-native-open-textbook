---
title: "/vibe-agents — Step 4: Agent-file setup"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/templates/tool-adapters/cursor/commands/vibe-agents.md"
sourceRel: "templates/tool-adapters/cursor/commands/vibe-agents.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/templates/tool-adapters/cursor/commands/vibe-agents.md"
sourceSha256: "276043859857122973a1124dc7e6a5efa2f6bb8786e3d3ebec24701c542a2550"
pageSha256: "276043859857122973a1124dc7e6a5efa2f6bb8786e3d3ebec24701c542a2550"
contentMode: "local-full"
zh: ""
---

# /vibe-agents — Step 4: Agent-file setup

Step 4 of the vibe-coding workflow: generate `AGENTS.md` + tool configs so the AI builder stays on track.

**Read `part4-notes-for-agent.md` at the repository root and follow it as the single source of truth.** (If it isn't in this project, ask the user to paste it.)

The essentials:
- Requires `docs/PRD-*.md` and `docs/TechDesign-*.md` — if either is missing, route the user back a stage.
- Instantiate the files in `templates/` (`AGENTS.md`, `MEMORY.md`, `REVIEW-CHECKLIST.md`, `agent_docs/`) — fill every `[REPLACE:]` / `[CHOOSE:]` placeholder from the PRD and Tech Design; never rewrite the templates.
- Add the thin tool adapter from `templates/tool-adapters/` for the user's tool.

Done? Point the user to the final stage: `/vibe-build`.
