---
title: "Codex — nothing to install"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/templates/tool-adapters/codex/README.md"
sourceRel: "templates/tool-adapters/codex/README.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/templates/tool-adapters/codex/README.md"
sourceSha256: "c98f54f6151454b248a85b953a05c1f1589d22663266ca103b5c6d853e289e17"
pageSha256: "c98f54f6151454b248a85b953a05c1f1589d22663266ca103b5c6d853e289e17"
contentMode: "local-full"
zh: ""
---

# Codex — nothing to install

Codex reads `AGENTS.md` natively. The instantiated `AGENTS.md` at the project
root is already everything Codex needs — no adapter file required.

Details (per OpenAI's docs): Codex builds its instruction chain from
`~/.codex/AGENTS.md` (global, personal) plus every `AGENTS.md` from the project
root down to the working directory.

Optional power-user tip: save your own reusable prompts as Markdown files in
`~/.codex/prompts/` (e.g. `~/.codex/prompts/review.md`) and run them in Codex
with `/prompts:review`.
