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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/README.md"
sourceRel: "docs/README.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/README.md"
sourceSha256: "6cc7c61288639f68bbd72ab8ad7d3c33e0acec03bb2595882b173c8fa96a0eeb"
pageSha256: "6cc7c61288639f68bbd72ab8ad7d3c33e0acec03bb2595882b173c8fa96a0eeb"
contentMode: "local-full"
zh: ""
---

# GSD Documentation

Comprehensive documentation for the Get Shit Done (GSD) framework — a meta-prompting, context engineering, and spec-driven development system for AI coding agents.

Language versions: [English](/lib/10-context-memory/get-shit-done/docs) · [Português (pt-BR)](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/pt-BR/README.md) · [日本語](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/ja-JP/README.md) · [简体中文](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/zh-CN/README.md)

## Documentation Index

| Document | Audience | Description |
|----------|----------|-------------|
| [Architecture](/lib/10-context-memory/get-shit-done/docs-ARCHITECTURE) | Contributors, advanced users | System architecture, agent model, data flow, and internal design |
| [Installer Migrations](/lib/10-context-memory/get-shit-done/docs-installer-migrations) | Contributors | Architecture for safe install-time migrations, cleanup, preservation, dry-run planning, and rollback |
| [Feature Reference](/lib/10-context-memory/get-shit-done/docs-FEATURES/index) | All users | Feature narratives and requirements for released features (see [CHANGELOG](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/CHANGELOG.md) for latest additions) |
| [v1.42.3 Release Notes](/lib/10-context-memory/get-shit-done/docs-RELEASE-v1.42.3) | All users | Hotfix release notes for 1.42.3 — Codex CLI 0.130.0 install routability and 11 other fixes |
| [v1.42.1 Release Notes](/lib/10-context-memory/get-shit-done/docs-RELEASE-v1.42.1) | All users | Stable release notes for the 1.42.1 release |
| [Command Reference](/lib/10-context-memory/get-shit-done/docs-COMMANDS) | All users | Stable commands with syntax, flags, options, and examples |
| [Configuration Reference](/lib/10-context-memory/get-shit-done/docs-CONFIGURATION/index) | All users | Full config schema, workflow toggles, model profiles, git branching |
| [Custom PR Body Sections](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/ship-pr-body-sections.md) | All users | How to append project-specific PRD sections to `/gsd-ship` PR bodies |
| [CLI Tools Reference](/lib/10-context-memory/get-shit-done/docs-CLI-TOOLS) | Contributors, agent authors | `gsd-tools.cjs` programmatic API for workflows and agents |
| [JSON Error Mode](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/json-errors.md) | Contributors, agent authors | Machine-readable `gsd-tools --json-errors` failure envelopes |
| [Agent Reference](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/AGENTS.md) | Contributors, advanced users | Role cards for primary agents — roles, tools, spawn patterns (the `agents/` filesystem is authoritative) |
| [User Guide](/lib/10-context-memory/get-shit-done/docs-USER-GUIDE/index) | All users | Workflow walkthroughs, troubleshooting, and recovery |
| [Issue-Driven Orchestration](/lib/10-context-memory/get-shit-done/docs-issue-driven-orchestration) | All users | Recipe for driving GSD from a tracker issue (GitHub / Linear / Jira) using existing primitives — no new commands or daemon |
| [Context Monitor](/lib/10-context-memory/get-shit-done/docs-context-monitor) | All users | Context window monitoring hook architecture |
| [Discuss Mode](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/workflow-discuss-mode.md) | All users | Assumptions vs interview mode for discuss-phase |
| [Canary Stream](/lib/10-context-memory/get-shit-done/docs-CANARY) | Contributors, early adopters | `dev` → `@canary` dist-tag policy, when to install, rollback path |

## Quick Links

- **What's new:** see [v1.42.3 Release Notes](/lib/10-context-memory/get-shit-done/docs-RELEASE-v1.42.3) (latest hotfix), [v1.42.1 Release Notes](/lib/10-context-memory/get-shit-done/docs-RELEASE-v1.42.1), [CHANGELOG](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/CHANGELOG.md), and upstream [README](/lib/10-context-memory/get-shit-done/overview) for release highlights
- **Canary preview:** [`docs/CANARY.md`](/lib/10-context-memory/get-shit-done/docs-CANARY) — opt into the early-preview stream from `dev`. Active cut: [`v1.50.0-canary.1`](/lib/10-context-memory/get-shit-done/docs-RELEASE-v1.50.0-canary.1)
- **Getting started:** [README](/lib/10-context-memory/get-shit-done/overview) → install → `/gsd-new-project`
- **Full workflow walkthrough:** [User Guide](/lib/10-context-memory/get-shit-done/docs-USER-GUIDE/index)
- **All commands at a glance:** [Command Reference](/lib/10-context-memory/get-shit-done/docs-COMMANDS)
- **Configuring GSD:** [Configuration Reference](/lib/10-context-memory/get-shit-done/docs-CONFIGURATION/index)
- **Customizing ship PR bodies:** [Custom PR Body Sections](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/ship-pr-body-sections.md)
- **How the system works internally:** [Architecture](/lib/10-context-memory/get-shit-done/docs-ARCHITECTURE)
- **Contributing or extending:** [CLI Tools Reference](/lib/10-context-memory/get-shit-done/docs-CLI-TOOLS) + [Agent Reference](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/AGENTS.md)
