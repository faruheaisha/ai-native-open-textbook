---
title: "Using agent-skills with Codex"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/docs/codex-setup.md"
sourceRel: "docs/codex-setup.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/docs/codex-setup.md"
sourceSha256: "ca30bfcc17ae3b2253573cd21c5f0768ae7eb99e7972b2935aa8c2ba68d65147"
pageSha256: "ca30bfcc17ae3b2253573cd21c5f0768ae7eb99e7972b2935aa8c2ba68d65147"
contentMode: "local-full"
zh: ""
---

# Using agent-skills with Codex

This repository is also a [Codex plugin](https://developers.openai.com/codex/plugins/build). The same root-level `skills/` directory used by Claude Code is consumed by Codex, so no files are copied or duplicated.

## Install

```bash
codex plugin marketplace add addyosmani/agent-skills
codex plugin add agent-skills@agent-skills
```

> Requires Codex CLI v0.122 or later. On older releases the command was `codex marketplace add`. See the [Codex CLI docs](https://developers.openai.com/codex/cli).

The first command registers this repository as the `agent-skills` marketplace. The second command installs and enables the `agent-skills` plugin from that marketplace. Start a new Codex session after installation so the skills are discovered.

Local clones work too:

```bash
codex plugin marketplace add /path/to/your/clone
codex plugin add agent-skills@agent-skills
```

## Usage

After install, invoke a skill in Codex chat with `@` (e.g. `@spec-driven-development`) or just describe the task and let Codex pick the right skill. All 25 skills under `skills/` are available.

## How it works

- `.codex-plugin/plugin.json` — Codex plugin manifest at the repo root. Points `skills` at `./skills/` and provides the metadata required by Codex.
- `.agents/plugins/marketplace.json` — marketplace entry declaring the repo root (`./`) as the plugin source.
- `skills/<name>/SKILL.md` — unchanged. Codex and Claude Code share the same `name` + `description` frontmatter format, so one file serves both platforms.

Slash commands in `.claude/commands/`, personas in `agents/`, and the lifecycle hook under `hooks/` stay Claude Code-specific. On Codex, invoke the underlying skill directly instead of the slash command (e.g. `@spec-driven-development` instead of `/spec`).
