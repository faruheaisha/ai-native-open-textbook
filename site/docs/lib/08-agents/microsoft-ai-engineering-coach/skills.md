---
title: "Skills"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/skills/README.md"
sourceRel: "skills/README.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/skills/README.md"
sourceSha256: "4de7197480085a4e6a6d0fe2ab4b11f3fb01969cb28e5ad3f08a56343940928e"
pageSha256: "4de7197480085a4e6a6d0fe2ab4b11f3fb01969cb28e5ad3f08a56343940928e"
contentMode: "local-full"
zh: ""
---

# Skills

Reusable instruction files for recurring tasks in this repo. Each skill is a single markdown
file with YAML front matter that names it and describes when an AI agent should invoke it.

## Available skills

| Skill | When to use |
|---|---|
| [update-docs](/lib/08-agents/microsoft-ai-engineering-coach/skills-update-docs) | Update or add a page under `docs/content/` |
| [package-extension](/lib/08-agents/microsoft-ai-engineering-coach/skills-package-extension) | Build the `.vsix` via `npm run package` |

## Layout

Skills live here as the canonical source. Symlinks in harness-specific directories make them
auto-discoverable by popular AI coding harnesses without duplicating content:

| Harness | Path | Notes |
|---|---|---|
| Claude Code | [`.claude/skills/`](https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/.claude/skills/README.md) | Symlinks to files in this directory |
| GitHub Copilot / awesome-copilot | [`.github/instructions/`](https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/.github/instructions/README.md) | Symlinks to files in this directory |

When you add a skill, create the symlinks too:

```bash
ln -s ../../skills/<skill>.md .claude/skills/<skill>.md
ln -s ../../skills/<skill>.md .github/instructions/<skill>.md
```

## Authoring

Front matter:

```yaml
---
name: kebab-case-id
description: One-line summary an agent reads to decide whether the skill applies.
when_to_use: Concrete trigger phrases or situations.
---
```

Body sections we use consistently:

- A short overview of what the skill produces or changes.
- Prerequisites, then the **Steps** as commands the agent can run.
- Troubleshooting for common failure modes.
- An **Anti-patterns** section describing what *not* to do — these prevent regressions when
  agents pattern-match from training data instead of from this repo.

Keep skills repo-specific. Generic agentic-engineering tips belong in
[`AGENTS.md`](https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/AGENTS.md), not here.
