---
title: "Context"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/migrate-nanoclaw/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/migrate-nanoclaw/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/migrate-nanoclaw/SKILL.md"
sourceSha256: "b212c06bd4174bab16806206c2d61391f9c82ebc59c546058e2cf298f1f5277b"
pageSha256: "b212c06bd4174bab16806206c2d61391f9c82ebc59c546058e2cf298f1f5277b"
contentMode: "local-full"
zh: ""
---

# Context

NanoClaw users fork the repo and customize it — changing config values, editing source files, modifying personas, adding skills. When upstream ships updates or refactors, `git merge` produces painful conflicts because the same core files were changed on both sides.

This skill extracts the user's customizations into a migration guide — capturing both the intent (what they want) and the implementation details (how they did it, with code snippets, API calls, and specific configurations). On upgrade, it checks out clean upstream in a worktree, then reapplies customizations using the guide. No merge conflicts because there's nothing to merge.

The migration guide is markdown, not structured data. It needs to capture the full range of what a user might customize, with enough implementation detail that a fresh Claude session can reapply it without having seen the original code. Standard changes (config values, simple logic) can be described briefly. Non-standard changes (specific APIs, custom integrations, unusual patterns) need code snippets and precise instructions.

Two phases: **Extract** (build the migration guide) and **Upgrade** (use it). If a guide already exists, offer to skip to Upgrade.

# Principles

- Never proceed with a dirty working tree.
- Always create a rollback point (backup branch + tag) before touching anything.
- The migration guide is the source of truth, not diffs.
- Use a worktree to validate before affecting the live install.
- Data directories (`groups/`, `store/`, `data/`, `.env`) are never touched — only code.
- Be helpful: offer to do things (stash, commit, stop services) rather than telling the user to do them.
- **Use sub-agents for exploration.** Spawn haiku sub-agents to explore the codebase, trace skill merges, diff files, and identify customizations. This keeps the main context focused on the user conversation and decision-making.
- **Always use absolute paths in worktrees.** The Bash tool resets the working directory between calls. Never use relative `cd .upgrade-worktree` — always use the full absolute path: `cd /absolute/path/.upgrade-worktree && <command>`. Store the worktree absolute path in a variable at creation time and reference it throughout.
- **Balance exploration and asking.** Don't bombard the user with questions when you can figure things out from the code. Don't burn endless tokens exploring when the user could clarify in one sentence. Use sub-agents to explore first, then ask the user targeted questions about things that are ambiguous or where intent isn't clear from the code alone.
- **Scale effort to complexity.** Not every migration needs the full process. Assess the scope early and take the lightest path that fits.

---

# Phase 1: Extract

## 1.0 Preflight

Run `git status --porcelain`. If non-empty, offer to stash or commit for them (AskUserQuestion: "Stash changes" / "Commit changes" / "I'll handle it"). If they want to commit, stage and commit with a descriptive message. If they want to stash, run `git stash push -m "pre-migration stash"`.

Check remotes with `git remote -v`. If `upstream` is missing, ask for the URL (default: `https://github.com/qwibitai/nanoclaw.git`), add it, then `git fetch upstream --prune`.

Detect upstream branch: check `git branch -r | grep upstream/` for `main` or `master`. Store as UPSTREAM_BRANCH.

## 1.1 Assess scope and determine path

Quickly assess the scale of divergence, check for an existing guide, and determine the right approach — all before asking the user anything.

```bash
BASE=$(git merge-base HEAD upstream/$UPSTREAM_BRANCH)
# Divergence stats
git rev-list --count $BASE..upstream/$UPSTREAM_BRANCH  # upstream commits
git rev-list --count $BASE..HEAD                       # user commits
git diff --name-only $BASE..HEAD | wc -l               # user changed files
git diff --stat $BASE..HEAD | tail -1                   # insertions/deletions
git diff --name-only $BASE..upstream/$UPSTREAM_BRANCH | wc -l  # upstream changed files
```

Check for existing guide: `.nanoclaw-migrations/guide.md` or `.nanoclaw-migrations/index.md`.

**Determine the tier based on the total diff from base:**

### Tier 1: Lightweight — suggest `/update-nanoclaw` instead

Conditions (any of):
- Very few upstream changes (< ~5 commits) AND few user changes (< ~3 changed files)
- User recently updated/migrated (merge-base is close to upstream HEAD)

Tell the user the scope is small and suggest `/update-nanoclaw` might be simpler. Let them choose.

### Tier 2: Standard

Conditions:
- Moderate total diff (3-15 changed files, no large number of new files)
- Manageable scope that fits in a single guide file

### Tier 3: Complex

Conditions (any of):
- Many new files added (indicates many skills applied) — discount files that come purely from skill merges when assessing complexity; a fork with 3 skills and no other changes is simpler than it looks by file count alone
- Deep source changes to core files (`src/index.ts`, `src/container-runner.ts`, etc.) beyond what skills introduced
- Lots of insertions/deletions in user-authored code (not skill-merged code)
- Many skills applied (3+) AND the user confirms or sub-agents find customizations on top of them

Use the full process: multiple sub-agents in parallel, directory-based guide, migration plan.

**Now combine the scope assessment with initial user input in one interaction.** Present the scope summary (how many commits, files, which tier) and ask (AskUserQuestion):

For Tier 1:
- **Use /update-nanoclaw** — simpler merge-based approach
- **Proceed with full migration** — continue

For Tier 2/3 (with or without existing guide):
- If guide exists and is current: **Skip to upgrade** / **Update guide** (add new changes) / **Re-extract from scratch**
- If guide exists but is stale: **Update guide** (recommended) / **Re-extract from scratch** / **Skip to upgrade anyway**
- If no guide: **Yes, let me describe my customizations first** / **Just figure it out** / **A bit of both**

This single interaction replaces what were previously separate steps for scope assessment, user input, and existing guide check.

## 1.2 Update existing guide (if applicable)

If the user chose to update an existing guide rather than re-extract:

1. Read the existing guide
2. Find commits made since the guide was generated (compare guide's recorded base hash against current HEAD)
3. Spawn a haiku sub-agent to analyze only the new changes:
