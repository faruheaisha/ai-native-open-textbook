---
title: "Codex CLI Patterns"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cli-creator/references/agent-cli-patterns.md"
sourceRel: "skills/.curated/cli-creator/references/agent-cli-patterns.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cli-creator/references/agent-cli-patterns.md"
sourceSha256: "ac11612b780a80a97b15a5ffca23b21a182f854003911cce2363dd69b6126272"
pageSha256: "ac11612b780a80a97b15a5ffca23b21a182f854003911cce2363dd69b6126272"
contentMode: "local-full"
zh: ""
---

# Codex CLI Patterns

Use this reference when designing the command surface for a new CLI Codex should run.

## Mental model

The CLI is Codex's command layer. It should turn a service, app, API, log source, or database into shell commands Codex can run repeatedly from any repo.

Good CLIs for Codex expose composable primitives. Avoid a single command that tries to "do the whole investigation" when smaller discover, read, resolve, download, inspect, draft, and upload commands would compose better.

## Help is interface

Write `--help` for a future Codex thread that only has the binary and a vague task. Each command should have a short description and flags with literal names from the product or API.

Good top-level help should answer:

- What containers can I discover?
- What exact objects can I read?
- What stable IDs can I resolve?
- What files can I download or upload?
- Which write actions exist?
- What is the raw escape hatch?

## Prefer this command shape

Use product nouns, then verbs:

```bash
tool-name --json doctor
tool-name --json accounts list
tool-name --json projects list
tool-name --json channels resolve --name codex
tool-name --json messages search "exact phrase"
