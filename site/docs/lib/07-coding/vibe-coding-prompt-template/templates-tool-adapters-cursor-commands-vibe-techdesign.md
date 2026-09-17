---
title: "/vibe-techdesign — Step 3: Tech design"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/templates/tool-adapters/cursor/commands/vibe-techdesign.md"
sourceRel: "templates/tool-adapters/cursor/commands/vibe-techdesign.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/templates/tool-adapters/cursor/commands/vibe-techdesign.md"
sourceSha256: "411edb4dbba60f65ff394ad597433bed985dc36634e2a11baa321a760745ad50"
pageSha256: "411edb4dbba60f65ff394ad597433bed985dc36634e2a11baa321a760745ad50"
contentMode: "local-full"
zh: ""
---

# /vibe-techdesign — Step 3: Tech design

Step 3 of the vibe-coding workflow: plan HOW to build it — stack, architecture, costs, deployment.

**Read `part3-tech-design-mvp.md` at the repository root and follow it as the single source of truth.** (If it isn't in this project, ask the user to paste it.)

The essentials:
- Requires `docs/PRD-*.md` — if it's missing, route the user to `/vibe-prd` first.
- Ask questions ONE at a time and wait for each answer.
- Echo back a verification summary and get a "yes" before generating.
- Write the doc to `docs/TechDesign-[AppName]-MVP.md`.

Done? Point the user to the next stage: `/vibe-agents`.
