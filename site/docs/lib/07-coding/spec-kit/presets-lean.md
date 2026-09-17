---
title: "Lean Workflow"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/presets/lean/README.md"
sourceRel: "presets/lean/README.md"
rawUrl: "/raw/07-coding/spec-kit/presets/lean/README.md"
sourceSha256: "7f7291892edc0fadcc18a027c7bc06ff6767ce08f21039876cd7f455be200536"
pageSha256: "7f7291892edc0fadcc18a027c7bc06ff6767ce08f21039876cd7f455be200536"
contentMode: "local-full"
zh: ""
---

# Lean Workflow

A minimal preset that strips the Spec Kit workflow down to its essentials — just the prompt, just the artifact.

## When to Use

Use Lean when you want the structured specify → plan → tasks → implement pipeline without the ceremony of the full templates. Each command produces a single focused Markdown file with no boilerplate sections to fill in.

## Commands Included

| Command | Output | Description |
|---------|--------|-------------|
| `speckit.specify` | `spec.md` | Create a specification from a feature description |
| `speckit.plan` | `plan.md` | Create an implementation plan from the spec |
| `speckit.tasks` | `tasks.md` | Create dependency-ordered tasks from spec and plan |
| `speckit.implement` | *(code)* | Execute all tasks in order, marking progress |
| `speckit.constitution` | `constitution.md` | Create or update the project constitution |

## What It Replaces

Lean overrides the five core workflow commands with self-contained prompts that produce each artifact directly — no separate template files involved. The result is a shorter, more direct workflow.

## Installation

```bash
# Lean is a bundled preset — no download needed
specify preset add lean
```

## Development

```bash
# Test from local directory
specify preset add --dev ./presets/lean

# Verify commands resolve
specify preset resolve speckit.specify

# Remove when done
specify preset remove lean
```
