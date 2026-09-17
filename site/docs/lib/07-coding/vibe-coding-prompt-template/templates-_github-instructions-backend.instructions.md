---
title: "Backend Instructions"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/templates/.github/instructions/backend.instructions.md"
sourceRel: "templates/.github/instructions/backend.instructions.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/templates/.github/instructions/backend.instructions.md"
sourceSha256: "43f02706a8df909ad335dc2ff375e3f6c9da6f58c67bd02a5425e2e4a7509044"
pageSha256: "43f02706a8df909ad335dc2ff375e3f6c9da6f58c67bd02a5425e2e4a7509044"
contentMode: "local-full"
zh: ""
---

# Backend Instructions

Read `AGENTS.md`, `agent_docs/tech_stack.md`, and `agent_docs/code_patterns.md`.

- Keep business logic out of transport handlers unless the approved stack uses that pattern.
- Validate all external input at boundaries.
- Do not modify migrations, auth, billing, infrastructure, or production data paths without approval.
- Keep secrets server-side and out of logs, traces, model-visible content, and client payloads.
- For AI/tool routes, classify actions as read-only, write, destructive, external network, credential-bearing, or production.
