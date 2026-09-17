---
title: "Project agent instructions"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/.agents/skills/vibe-agents/SKILL.md"
sourceRel: ".agents/skills/vibe-agents/SKILL.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/.agents/skills/vibe-agents/SKILL.md"
sourceSha256: "a9755159c258bed00da95a477f83b7b006327f63685b4f4611eec9af95074262"
pageSha256: "a9755159c258bed00da95a477f83b7b006327f63685b4f4611eec9af95074262"
contentMode: "local-full"
zh: ""
---

# Project agent instructions

Use agreed requirements, technical decisions, and the existing repository to
write only stable, non-obvious guidance. For a targeted AGENTS.md edit, update
the affected instructions directly; do not require an installer, new PRD, or
full interview. Keep progress in the project's memory/handoff file rather than
the always-loaded rules.

For initial Vibe Workflow setup, use the configured manifest paths. If the
vibeworkflow CLI is available, inspect `npx vibeworkflow --dry-run --json` and
initialize within the user's authorization. Preserve existing files; replacement
flags are for intentional replacements whose affected files have been reviewed.
The CLI installs files directly, not into a new templates/ directory.

Fill relevant placeholders from known decisions. Keep task-specific procedures
in skills or references and load them only when relevant. Distinguish local
implementation from external sends, production changes, and new access. Do not
enable broad tool permissions just to make setup convenient.

Use `npx vibeworkflow doctor` for CLI-generated setup when available; it checks
configuration, not a working build or user journey. In a chat without filesystem
access, use the repository's docs/context-pack.md and supplied product decisions
to produce separated files to save. State absent template/context limitations
instead of inventing them. Continue into implementation only when that is part
of the user's request.
