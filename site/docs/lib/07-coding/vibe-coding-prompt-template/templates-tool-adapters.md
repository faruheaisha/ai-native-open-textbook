---
title: "Tool Adapters — thin pointers, not prompt dumps"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/templates/tool-adapters/README.md"
sourceRel: "templates/tool-adapters/README.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/templates/tool-adapters/README.md"
sourceSha256: "e8b028a3c9e9708b374e337e43c450cbb969e6ba36738af3af1a3377f75e1c31"
pageSha256: "e8b028a3c9e9708b374e337e43c450cbb969e6ba36738af3af1a3377f75e1c31"
contentMode: "local-full"
zh: ""
---

# Tool Adapters — thin pointers, not prompt dumps

**AGENTS.md is the universal contract.** The instantiated `AGENTS.md` at the
project root is the source of truth; Codex reads it natively, and most modern
agents (Claude Code, Cursor, Antigravity) do too. This folder holds the tiny
per-tool adapter files that point each tool at it. Every adapter is a pointer —
never a copy of AGENTS.md content.

## Where each file goes

| File in this folder | Copy to (in the user's project) | Tool |
|---|---|---|
| `CLAUDE.md` | `CLAUDE.md` (project root) | Claude Code |
| `cursor/rules/vibe.mdc` | `.cursor/rules/vibe.mdc` | Cursor |
| `antigravity/rules/vibe.md` | `.agent/rules/vibe.md` | Google Antigravity |
| `codex/README.md` | — nothing to copy — | Codex (reads `AGENTS.md` natively) |
| `cursor/commands/vibe-workflow.md` | `.cursor/commands/vibe-workflow.md` | Cursor |
| `cursor/commands/vibe-research.md` | `.cursor/commands/vibe-research.md` | Cursor |
| `cursor/commands/vibe-prd.md` | `.cursor/commands/vibe-prd.md` | Cursor |
| `cursor/commands/vibe-techdesign.md` | `.cursor/commands/vibe-techdesign.md` | Cursor |
| `cursor/commands/vibe-agents.md` | `.cursor/commands/vibe-agents.md` | Cursor |
| `cursor/commands/vibe-build.md` | `.cursor/commands/vibe-build.md` | Cursor |
| `antigravity/workflows/vibe-workflow.md` | `.agent/workflows/vibe-workflow.md` | Google Antigravity |
| `antigravity/workflows/vibe-research.md` | `.agent/workflows/vibe-research.md` | Google Antigravity |
| `antigravity/workflows/vibe-prd.md` | `.agent/workflows/vibe-prd.md` | Google Antigravity |
| `antigravity/workflows/vibe-techdesign.md` | `.agent/workflows/vibe-techdesign.md` | Google Antigravity |
| `antigravity/workflows/vibe-agents.md` | `.agent/workflows/vibe-agents.md` | Google Antigravity |
| `antigravity/workflows/vibe-build.md` | `.agent/workflows/vibe-build.md` | Google Antigravity |
| `codex/prompts/vibe-workflow.md` | `~/.codex/prompts/vibe-workflow.md` (user-level) | Codex |
| `codex/prompts/vibe-research.md` | `~/.codex/prompts/vibe-research.md` (user-level) | Codex |
| `codex/prompts/vibe-prd.md` | `~/.codex/prompts/vibe-prd.md` (user-level) | Codex |
| `codex/prompts/vibe-techdesign.md` | `~/.codex/prompts/vibe-techdesign.md` (user-level) | Codex |
| `codex/prompts/vibe-agents.md` | `~/.codex/prompts/vibe-agents.md` (user-level) | Codex |
| `codex/prompts/vibe-build.md` | `~/.codex/prompts/vibe-build.md` (user-level) | Codex |

The 18 `vibe-*` files above are optional slash-command shortcuts — one per
workflow stage (research → build), mirroring the Claude Code skills in
`.claude/skills/`. Each is a thin wrapper that defers to the root `part*.md`
files as the single source of truth. Invoke with `/vibe-research` etc. in
Cursor and Antigravity, or `/prompts:vibe-research` in Codex (restart Codex
after copying so it picks the prompts up; Codex prompts are user-level only,
so they work in every project but can't live inside one).

## Notes

- **Cursor:** the `.mdc` frontmatter (`description`, `alwaysApply: true`) makes
  the rule load in every chat. Legacy `.cursorrules` still works but is
  deprecated — delete it if one exists.
- **Antigravity:** current versions read `AGENTS.md` natively; the
  `.agent/rules/` file is an always-on workspace rule that reinforces it.
  Global (all-project) rules live in `~/.gemini/GEMINI.md`.
- **Codex:** see `codex/README.md`. Optional: personal reusable prompts in
  `~/.codex/prompts/`.
- **Any other tool** (Gemini CLI, Copilot, Windsurf, Lovable…): open its
  custom-instructions feature and paste: "Read AGENTS.md — it is the source of
  truth for this project. Details in `agent_docs/`."
