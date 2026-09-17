---
title: "/vibe-research — Step 1: Deep research"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/templates/tool-adapters/cursor/commands/vibe-research.md"
sourceRel: "templates/tool-adapters/cursor/commands/vibe-research.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/templates/tool-adapters/cursor/commands/vibe-research.md"
sourceSha256: "61e222ac27eeecbcb56d69c0473f23fc97482993be67443a8789febfa69854e0"
pageSha256: "61e222ac27eeecbcb56d69c0473f23fc97482993be67443a8789febfa69854e0"
contentMode: "local-full"
zh: ""
---

# /vibe-research — Step 1: Deep research

Step 1 of the vibe-coding workflow: validate the app idea with deep research before anything gets built.

**Read `part1-deepresearch.md` at the repository root and follow it as the single source of truth.** (If it isn't in this project, ask the user to paste it.)

The essentials:
- Ask questions ONE at a time and wait for each answer — never dump the whole question bank at once.
- Echo back a short verification summary of your understanding before writing anything.
- Write the output to `docs/research-[AppName].md`.
- End the doc with the `## Handoff Context` block defined in part1 — Part 2 reads it to skip re-asking questions.

Done? Point the user to the next stage: `/vibe-prd`.
