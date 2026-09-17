---
title: "Unified Memory"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.agents/skills/unified-memory/SKILL.md"
sourceRel: ".agents/skills/unified-memory/SKILL.md"
rawUrl: "/raw/09-harness/ecc/.agents/skills/unified-memory/SKILL.md"
sourceSha256: "86b4923b1a418e58cf2d6921b8e933dfab6d5969fc82c9b95c76920aee58e6e3"
pageSha256: "86b4923b1a418e58cf2d6921b8e933dfab6d5969fc82c9b95c76920aee58e6e3"
contentMode: "local-full"
zh: ""
---

# Unified Memory

Use the ECC Memory Vault as the common context layer between harnesses. The
vault stores portable `ecc.memory.v1` Markdown documents rather than
harness-specific transcripts or inboxes.

## Runtime Prerequisite

This skill is guidance, not the Memory Vault executable. Skill-only, minimal,
manual, and Claude plugin installs do not create the required commands on
`PATH`. Install the `ecc-universal` npm runtime separately before using the CLI
or MCP examples:

```bash
npm install -g ecc-universal
ecc memory --help
command -v ecc-memory-mcp
```

A repository checkout may instead run the CLI as
`node scripts/ecc.js memory ...`, but MCP configurations that name
`ecc-memory-mcp` still require that binary on `PATH`.

## When To Use

- Save durable context that another agent or later session will need.
- Hand work from Claude to Codex, Hermes to Claude, or any other harness pair.
- Resume a task and search for prior decisions, facts, lessons, or handoffs.
- Diagnose malformed memories, broken links, duplicate IDs, or skipped
  symbolic links.

Do not use the vault as a task tracker, secret store, policy engine, or
substitute for governed project documentation.

## Vault Scopes

| Scope | Location | Use |
|---|---|---|
| `project` | `<repo>/.ecc/memory/project/` | Repo-local context protected by a fail-closed `.gitignore` |
| `team` | `<repo>/.ecc/memory/team/` | Context intended for human review and version-controlled sharing |
| `user` | `~/.ecc/memory/` | Operator context that follows the user across repositories |

All participating harnesses must use the same repository working directory or
the same `ECC_MEMORY_PROJECT_ROOT` and `ECC_MEMORY_USER_ROOT` overrides.
Normal search recall covers active `project` and `team` memories. A direct ID
read may inspect a non-active entry. Request `user`
explicitly with `--scope user`; it is never included implicitly. Project-scope
initialization and writes fail closed if the vault's protective `.gitignore`
exists with unexpected content.

## Workflow

### 1. Recall before writing

Search for an existing memory before creating another copy:

```bash
ecc memory search "authentication migration" --target-harness codex
