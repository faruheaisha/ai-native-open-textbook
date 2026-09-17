---
title: "GEMINI.md — Antigravity / Gemini Legacy Configuration for [App Name]"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/templates/GEMINI.md"
sourceRel: "templates/GEMINI.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/templates/GEMINI.md"
sourceSha256: "de27a662570458da8a80d10e1a3dcaf7204b5016c40444f9f573ab738177fcdc"
pageSha256: "de27a662570458da8a80d10e1a3dcaf7204b5016c40444f9f573ab738177fcdc"
contentMode: "local-full"
zh: ""
---

# GEMINI.md — Antigravity / Gemini Legacy Configuration for [App Name]

Last generated: [YYYY-MM-DD]

## Source of Truth

Read `AGENTS.md` first, then use `agent_docs/` for details. Use this file for Antigravity/Gemini-compatible agents only after verifying current Google tooling support.

## Operating Rules

- Propose a plan before editing.
- Keep changes scoped to the current phase.
- Use the exact verification commands in `agent_docs/testing.md`.
- Use `/memory show`, `/memory refresh`, `/tools`, `/chat save <tag>`, and `/compress` when useful.
- Keep tool approvals conservative.
- Do not enable broad always-allow modes unless the user explicitly accepts the risk.
- Do not auto-approve MCP, shell/write/network, production, billing, or destructive tools.
- For AI product work, verify structured outputs, provider retention/training settings, evals, telemetry, cost ceilings, and approval gates.

## Commands

- Setup: `[from Tech Design]`
- Dev: `[from Tech Design]`
- Test: `[from Tech Design]`
- Lint/format/typecheck/build: `[from Tech Design]`
