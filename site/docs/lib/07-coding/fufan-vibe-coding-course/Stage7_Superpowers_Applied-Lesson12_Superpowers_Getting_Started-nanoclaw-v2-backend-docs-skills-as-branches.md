---
title: "Skills as Branches"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/docs/skills-as-branches.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/docs/skills-as-branches.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/docs/skills-as-branches.md"
sourceSha256: "ff5147d7efc19879e378a14889e2e7c1ddf244669dc10ac662aff8813422e58e"
pageSha256: "ff5147d7efc19879e378a14889e2e7c1ddf244669dc10ac662aff8813422e58e"
contentMode: "local-full"
zh: ""
---

# Skills as Branches

## Overview

This document covers **feature skills** — skills that add capabilities via git branch merges. This is the most complex skill type and the primary way NanoClaw is extended.

NanoClaw has four types of skills overall. See [CONTRIBUTING.md](https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/CONTRIBUTING.md) for the full taxonomy:

| Type | Location | How it works |
|------|----------|-------------|
| **Feature** (this doc) | `.claude/skills/` + `skill/*` branch | SKILL.md has instructions; code lives on a branch, applied via `git merge` |
| **Utility** | `.claude/skills/<name>/` with code files | Self-contained tools; code in skill directory, copied into place on install |
| **Operational** | `.claude/skills/` on `main` | Instruction-only workflows (setup, debug, update) |
| **Container** | `container/skills/` | Loaded inside agent containers at runtime |

---

Feature skills are distributed as git branches on the upstream repository. Applying a skill is a `git merge`. Updating core is a `git merge`. Everything is standard git.

This replaces the previous `skills-engine/` system (three-way file merging, `.nanoclaw/` state, manifest files, replay, backup/restore) with plain git operations and Claude for conflict resolution.

## How It Works

### Repository structure

The upstream repo (`qwibitai/nanoclaw`) maintains:

- `main` — core NanoClaw (no skill code)
- `skill/discord` — main + Discord integration
- `skill/telegram` — main + Telegram integration
- `skill/slack` — main + Slack integration
- `skill/gmail` — main + Gmail integration
- etc.

Each skill branch contains all the code changes for that skill: new files, modified source files, updated `package.json` dependencies, `.env.example` additions — everything. No manifest, no structured operations, no separate `add/` and `modify/` directories.

### Skill discovery and installation

Skills are split into two categories:

**Operational skills** (on `main`, always available):
- `/setup`, `/debug`, `/update-nanoclaw`, `/customize`, `/update-skills`
- These are instruction-only SKILL.md files — no code changes, just workflows
- Live in `.claude/skills/` on `main`, immediately available to every user

**Feature skills** (in marketplace, installed on demand):
- `/add-discord`, `/add-telegram`, `/add-slack`, `/add-gmail`, etc.
- Each has a SKILL.md with setup instructions and a corresponding `skill/*` branch with code
- Live in the marketplace repo (`qwibitai/nanoclaw-skills`)

Users never interact with the marketplace directly. The operational skills `/setup` and `/customize` handle plugin installation transparently:

```bash
# Claude runs this behind the scenes — users don't see it
claude plugin install nanoclaw-skills@nanoclaw-skills --scope project
```

Skills are hot-loaded after `claude plugin install` — no restart needed. This means `/setup` can install the marketplace plugin, then immediately run any feature skill, all in one session.

### Selective skill installation

`/setup` asks users what channels they want, then only offers relevant skills:

1. "Which messaging channels do you want to use?" → Discord, Telegram, Slack, WhatsApp
2. User picks Telegram → Claude installs the plugin and runs `/add-telegram`
3. After Telegram is set up: "Want to add Agent Swarm support for Telegram?" → offers `/add-telegram-swarm`
4. "Want to enable community skills?" → installs community marketplace plugins

Dependent skills (e.g., `telegram-swarm` depends on `telegram`) are only offered after their parent is installed. `/customize` follows the same pattern for post-setup additions.

### Marketplace configuration

NanoClaw's `.claude/settings.json` registers the official marketplace:

```json
{
  "extraKnownMarketplaces": {
    "nanoclaw-skills": {
      "source": {
        "source": "github",
        "repo": "qwibitai/nanoclaw-skills"
      }
    }
  }
}
```

The marketplace repo uses Claude Code's plugin structure:

```
qwibitai/nanoclaw-skills/
  .claude-plugin/
    marketplace.json              # Plugin catalog
  plugins/
    nanoclaw-skills/              # Single plugin bundling all official skills
      .claude-plugin/
        plugin.json               # Plugin manifest
      skills/
        add-discord/
          SKILL.md                # Setup instructions; step 1 is "merge the branch"
        add-telegram/
          SKILL.md
        add-slack/
          SKILL.md
        ...
```

Multiple skills are bundled in one plugin — installing `nanoclaw-skills` makes all feature skills available at once. Individual skills don't need separate installation.

Each SKILL.md tells Claude to merge the corresponding skill branch as step 1, then walks through interactive setup (env vars, bot creation, etc.).

### Applying a skill

User runs `/add-discord` (discovered via marketplace). Claude follows the SKILL.md:

1. `git fetch upstream skill/discord`
2. `git merge upstream/skill/discord`
3. Interactive setup (create bot, get token, configure env vars, etc.)

Or manually:

```bash
git fetch upstream skill/discord
git merge upstream/skill/discord
```

### Applying multiple skills

```bash
git merge upstream/skill/discord
git merge upstream/skill/telegram
```

Git handles the composition. If both skills modify the same lines, it's a real conflict and Claude resolves it.

### Updating core

```bash
git fetch upstream main
git merge upstream/main
```

Since skill branches are kept merged-forward with main (see CI section), the user's merged-in skill changes and upstream changes have proper common ancestors.

### Checking for skill updates

Users who previously merged a skill branch can check for updates. For each `upstream/skill/*` branch, check whether the branch has commits that aren't in the user's HEAD:

```bash
git fetch upstream
for branch in $(git branch -r | grep 'upstream/skill/'); do
  # Check if user has merged this skill at some point
  merge_base=$(git merge-base HEAD "$branch" 2>/dev/null) || continue
  # Check if the skill branch has new commits beyond what the user has
  if ! git merge-base --is-ancestor "$branch" HEAD 2>/dev/null; then
    echo "$branch has updates available"
  fi
done
```

This requires no state — it uses git history to determine which skills were previously merged and whether they have new commits.

This logic is available in two ways:
- Built into `/update-nanoclaw` — after merging main, optionally check for skill updates
- Standalone `/update-skills` — check and merge skill updates independently

### Conflict resolution

At any merge step, conflicts may arise. Claude resolves them — reading the conflicted files, understanding the intent of both sides, and producing the correct result. This is what makes the branch approach viable at scale: conflict resolution that previously required human judgment is now automated.

### Skill dependencies

Some skills depend on other skills. E.g., `skill/telegram-swarm` requires `skill/telegram`. Dependent skill branches are branched from their parent skill branch, not from `main`.

This means `skill/telegram-swarm` includes all of telegram's changes plus its own additions. When a user merges `skill/telegram-swarm`, they get both — no need to merge telegram separately.

Dependencies are implicit in git history — `git merge-base --is-ancestor` determines whether one skill branch is an ancestor of another. No separate dependency file is needed.

### Uninstalling a skill

```bash
# Find the merge commit
git log --merges --oneline | grep discord

# Revert it
