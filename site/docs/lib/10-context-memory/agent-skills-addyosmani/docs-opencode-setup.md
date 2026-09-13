---
title: "OpenCode Setup"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/README.md"
zh: ""
---

# OpenCode Setup

This guide explains how to use Agent Skills with OpenCode. The reusable assets are the markdown skills in the `skills/` directory; the root `AGENTS.md` file in this repository is repo-scoped and should not be copied into other projects.

## Overview

OpenCode discovers skills from several locations. Agent Skills provides two optional usage styles:

- **Agent-driven workflow:** skills are selected automatically via the built-in `skill` tool and a project-local `AGENTS.md` that you write for your own repository.
- **Command-driven workflow:** manually invoke lifecycle commands with `.opencode/commands/` (optional).

## Installation

There are two ways to get the skills into your project:

1. Install with the `skills` CLI (fastest).
2. Clone this repository and copy the skill directories manually.

After either step, create your own project-local `AGENTS.md` and, if you want them, copy the `.opencode/commands/*.md` files.

### Option 1: Install with `npx skills`

The fastest path is the open [`skills` CLI](https://github.com/vercel-labs/skills):

```bash
npx skills add addyosmani/agent-skills            # install selected skills
npx skills add addyosmani/agent-skills --list     # browse before installing
```

Install a single skill:

```bash
npx skills add addyosmani/agent-skills --skill spec-driven-development
```

By default `npx skills` installs into a tool-specific directory (often `.claude/skills/` or a shared location). OpenCode will discover skills placed there because it reads `.claude/skills/<name>/SKILL.md` and the generic `.agents/skills/<name>/SKILL.md` paths.

If the skills land somewhere OpenCode does not scan, copy or symlink them into one of the discovery paths listed below, for example:

```bash
mkdir -p .opencode/skills
