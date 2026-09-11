---
title: "GSD Documentation"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/README.md"
zh: ""
---

# GSD Documentation

Comprehensive documentation for the Get Shit Done (GSD) framework — a meta-prompting, context engineering, and spec-driven development system for AI coding agents.

Language versions: [English](/lib/10-context-memory/get-shit-done/docs) · [Português (pt-BR)](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/pt-BR/README.md) · [日本語](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/ja-JP/README.md) · [简体中文](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/zh-CN/README.md)

## Documentation Index

| Document | Audience | Description |
|----------|----------|-------------|
| [Architecture](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/ARCHITECTURE.md) | Contributors, advanced users | System architecture, agent model, data flow, and internal design |
| [Installer Migrations](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/installer-migrations.md) | Contributors | Architecture for safe install-time migrations, cleanup, preservation, dry-run planning, and rollback |
| [Feature Reference](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/FEATURES.md) | All users | Feature narratives and requirements for released features (see [CHANGELOG](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/CHANGELOG.md) for latest additions) |
| [v1.42.3 Release Notes](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/RELEASE-v1.42.3.md) | All users | Hotfix release notes for 1.42.3 — Codex CLI 0.130.0 install routability and 11 other fixes |
| [v1.42.1 Release Notes](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/RELEASE-v1.42.1.md) | All users | Stable release notes for the 1.42.1 release |
| [Command Reference](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/COMMANDS.md) | All users | Stable commands with syntax, flags, options, and examples |
| [Configuration Reference](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CONFIGURATION.md) | All users | Full config schema, workflow toggles, model profiles, git branching |
| [Custom PR Body Sections](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/ship-pr-body-sections.md) | All users | How to append project-specific PRD sections to `/gsd-ship` PR bodies |
| [CLI Tools Reference](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CLI-TOOLS.md) | Contributors, agent authors | `gsd-tools.cjs` programmatic API for workflows and agents |
| [JSON Error Mode](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/json-errors.md) | Contributors, agent authors | Machine-readable `gsd-tools --json-errors` failure envelopes |
| [Agent Reference](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/AGENTS.md) | Contributors, advanced users | Role cards for primary agents — roles, tools, spawn patterns (the `agents/` filesystem is authoritative) |
| [User Guide](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/USER-GUIDE.md) | All users | Workflow walkthroughs, troubleshooting, and recovery |
| [Issue-Driven Orchestration](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/issue-driven-orchestration.md) | All users | Recipe for driving GSD from a tracker issue (GitHub / Linear / Jira) using existing primitives — no new commands or daemon |
| [Context Monitor](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/context-monitor.md) | All users | Context window monitoring hook architecture |
| [Discuss Mode](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/workflow-discuss-mode.md) | All users | Assumptions vs interview mode for discuss-phase |
| [Canary Stream](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CANARY.md) | Contributors, early adopters | `dev` → `@canary` dist-tag policy, when to install, rollback path |

## Quick Links

- **What's new:** see [v1.42.3 Release Notes](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/RELEASE-v1.42.3.md) (latest hotfix), [v1.42.1 Release Notes](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/RELEASE-v1.42.1.md), [CHANGELOG](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/CHANGELOG.md), and upstream [README](/lib/10-context-memory/get-shit-done/overview) for release highlights
- **Canary preview:** [`docs/CANARY.md`](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CANARY.md) — opt into the early-preview stream from `dev`. Active cut: [`v1.50.0-canary.1`](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/RELEASE-v1.50.0-canary.1.md)
- **Getting started:** [README](/lib/10-context-memory/get-shit-done/overview) → install → `/gsd-new-project`
- **Full workflow walkthrough:** [User Guide](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/USER-GUIDE.md)
- **All commands at a glance:** [Command Reference](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/COMMANDS.md)
- **Configuring GSD:** [Configuration Reference](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CONFIGURATION.md)
- **Customizing ship PR bodies:** [Custom PR Body Sections](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/ship-pr-body-sections.md)
- **How the system works internally:** [Architecture](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/ARCHITECTURE.md)
- **Contributing or extending:** [CLI Tools Reference](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CLI-TOOLS.md) + [Agent Reference](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/AGENTS.md)
