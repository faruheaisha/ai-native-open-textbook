---
title: "Hermes x ECC Setup"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/docs/HERMES-SETUP.md"
sourceRel: "docs/HERMES-SETUP.md"
rawUrl: "/raw/09-harness/ecc/docs/HERMES-SETUP.md"
sourceSha256: "21579e0d6b362a4df0270bfc47de442874f82047bcf20d73d4ece7ac0c7825b4"
pageSha256: "21579e0d6b362a4df0270bfc47de442874f82047bcf20d73d4ece7ac0c7825b4"
contentMode: "local-full"
zh: ""
---

# Hermes x ECC Setup

Hermes is the operator shell. ECC is the reusable system behind it.

This guide is the public, sanitized version of the Hermes stack used to run content, outreach, research, sales ops, finance checks, and engineering workflows from one terminal-native surface.

## What Ships Publicly

- ECC skills, agents, commands, hooks, and MCP configs from this repo
- Hermes-generated workflow skills that are stable enough to reuse
- a documented operator topology for chat, crons, workspace memory, and distribution flows
- launch collateral for sharing the stack publicly

This guide does not include private secrets, live tokens, personal data, or a raw `~/.hermes` export.

## Architecture

Use Hermes as the front door and ECC as the reusable workflow substrate.

```text
Telegram / CLI / TUI
        ↓
      Hermes
        ↓
 ECC skills + hooks + MCPs + shared Memory Vault
        ↓
 Google Drive / GitHub / browser automation / research APIs / media tools / finance tools
```

## Public Workspace Map

Use this as the minimal surface to reproduce the setup without leaking private state.

- `~/.hermes/config.yaml`
  - model routing
  - MCP server registration
  - plugin loading
- `~/.hermes/skills/ecc-imports/`
  - ECC skills copied in for Hermes-native use
- `skills/hermes-generated/`
  - operator patterns distilled from repeated Hermes sessions
- `~/.hermes/plugins/`
  - bridge plugins for hooks, reminders, and workflow-specific tool glue
- `~/.hermes/cron/jobs.json`
  - scheduled automation runs with explicit prompts and channels
- `~/.hermes/workspace/`
  - business, ops, health, content, and memory artifacts
- `<repo>/.ecc/memory/`
  - shared project and team context for Hermes, Claude, Codex, and other agents
- `~/.ecc/memory/`
  - user-scoped context that follows the operator across repositories

## Shared Memory Across Hermes, Claude, And Codex

ECC Memory Vault provides one file-first handoff layer instead of a separate
inbox or transcript store for every agent. Initialize it from the repository
that the agents share. Skill-only, minimal, manual, and Claude plugin installs
do not add the Memory Vault runtime to `PATH`; install it separately first:

```bash
npm install -g ecc-universal
ecc memory --help
command -v ecc-memory-mcp
```

Then initialize the vault:

```bash
ecc memory init --scope project --scope team
```

Normal search recall covers active `project` and `team` memories. Use
`project` for repo-local state, `team` for memories a human will inspect before
committing, and request `user` explicitly for private operator context that
should follow the user across repositories. Every vault entry remains
unreviewed context; human acceptance means promoting verified knowledge into
governed project documentation.

Hermes can call the CLI directly or use the opt-in `ecc-memory-mcp` stdio
server. Harnesses may share the same installed binary and vault storage, but
each harness must launch its own server process with its own distinct lowercase
`ECC_MEMORY_HARNESS` identity; they must not connect to one shared server
process. Every process must launch from the same repository working directory
or receive identical `ECC_MEMORY_PROJECT_ROOT` and `ECC_MEMORY_USER_ROOT`
overrides.

A Hermes-to-Codex handoff can be written without putting the body in the
process list:

```bash
printf '%s\n' 'Research is complete. Verify the cited sources and implement the parser.' |
  ecc memory handoff \
    --from hermes \
    --target codex \
    --title "Implement the research parser" \
    --tag research \
    --stdin
```

Codex can retrieve it with:

```bash
ecc memory search "research parser" --target-harness codex
