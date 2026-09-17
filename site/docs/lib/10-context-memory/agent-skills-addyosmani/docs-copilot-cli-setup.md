---
title: "Using agent-skills with GitHub Copilot CLI"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/docs/copilot-cli-setup.md"
sourceRel: "docs/copilot-cli-setup.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/docs/copilot-cli-setup.md"
sourceSha256: "5ecb11fa4f8b1d8bfd94f9f66f6e50037e8241fca34b3cbc598aee78f96762a9"
pageSha256: "5ecb11fa4f8b1d8bfd94f9f66f6e50037e8241fca34b3cbc598aee78f96762a9"
contentMode: "local-full"
zh: ""
---

# Using agent-skills with GitHub Copilot CLI

The standalone `copilot` command-line tool installs this repository as a plugin and discovers every skill in `skills/`. For Copilot inside VS Code, see [copilot-setup.md](/lib/10-context-memory/agent-skills-addyosmani/docs-copilot-setup) instead — the setup and the invocation model are different.

## Install

**From this repository's marketplace** — register it, then install from it. `addy-agent-skills` is the marketplace name this repository declares, not a GitHub-wide registry, and the name only resolves after the `marketplace add`:

```bash
copilot plugin marketplace add addyosmani/agent-skills
copilot plugin install agent-skills@addy-agent-skills
```

**Directly from the repository**, without registering a marketplace:

```bash
copilot plugin install addyosmani/agent-skills
```

**From a local clone**, for a session-scoped development install:

```bash
git clone https://github.com/addyosmani/agent-skills.git
copilot --plugin-dir /path/to/agent-skills
```

`--plugin-dir` loads the plugin for that session only and installs nothing persistently — use it while editing skills.

## Verify

```bash
copilot plugin list   # agent-skills@addy-agent-skills
copilot skill list    # the plugin's skills, alongside the built-in ones
```

In an interactive session, `/skills list` shows the same catalog.

## What you get, and what you don't

The root `plugin.json` is the manifest Copilot CLI reads — it takes precedence over `.claude-plugin/plugin.json`, which belongs to Claude Code. That root manifest declares only a name, version and description, so component paths fall back to their defaults:

- **Skills — available.** With no explicit path, the CLI uses the conventional `skills/` directory, and the skills are discovered there.
- **Lifecycle commands — not available.** The root manifest has no `commands` field, so nothing registers `/spec`, `/plan`, `/build`, `/test`, `/review` or `/ship`. Those files live in `.claude/commands/` and are Claude Code commands.

For manifest precedence and the per-component path defaults, see the [CLI plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference) and [Creating plugins](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating).

## Usage

Name the skill you want, or describe the task and let the agent route to it:

> Use the spec-driven-development skill to write a spec for [the feature].

> Use the test-driven-development skill: write a failing test for this bug first, then fix it.

> Use the code-review-and-quality skill to review my staged changes.

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| `plugin install` can't resolve `agent-skills@addy-agent-skills` | Run `copilot plugin marketplace add addyosmani/agent-skills` first — that name only resolves once the marketplace is registered. Or install the repository directly. |
| Plugin installed but no skills | `copilot plugin list` to confirm the plugin, then `copilot skill list` (or `/skills list` in session) to see what was discovered. |
| `/spec`, `/build` and friends are not found | Expected, not a broken install: the root manifest registers no commands. Ask for the skill by name instead. |
| Skills changed locally but the CLI shows the old copy | Start a fresh session, or run with `--plugin-dir` pointing at your clone. |
