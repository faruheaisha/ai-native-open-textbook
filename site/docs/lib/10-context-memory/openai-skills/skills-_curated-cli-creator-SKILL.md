---
title: "CLI Creator"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cli-creator/SKILL.md"
sourceRel: "skills/.curated/cli-creator/SKILL.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cli-creator/SKILL.md"
sourceSha256: "24058eabf0aafce6def3fb937ac93cbe3fa341c653c658dc589edb77f73d6152"
pageSha256: "24058eabf0aafce6def3fb937ac93cbe3fa341c653c658dc589edb77f73d6152"
contentMode: "local-full"
zh: ""
---

# CLI Creator

Create a real CLI that future Codex threads can run by command name from any working directory.

This skill is for durable tools, not one-off scripts. If a short script in the current repo solves the task, write the script there instead.

## Start

Name the target tool, its source, and the first real jobs it should do:

- Source: API docs, OpenAPI JSON, SDK docs, curl examples, browser app, existing internal script, article, or working shell history.
- Jobs: literal reads/writes such as `list drafts`, `download failed job logs`, `search messages`, `upload media`, `read queue schedule`.
- Install name: a short binary name such as `ci-logs`, `slack-cli`, `sentry-cli`, or `buildkite-logs`.
