---
title: "About"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/update-nanoclaw/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/update-nanoclaw/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/update-nanoclaw/SKILL.md"
sourceSha256: "a1d178b0c4b3879e35b78eea2f9a291fe75c8d567ec8008340da608532bffcca"
pageSha256: "a1d178b0c4b3879e35b78eea2f9a291fe75c8d567ec8008340da608532bffcca"
contentMode: "local-full"
zh: ""
---

# About

Your NanoClaw fork drifts from upstream as you customize it. This skill pulls upstream changes into your install without losing your modifications.

Run `/update-nanoclaw` in Claude Code.

## How it works

**Preflight**: checks for clean working tree (`git status --porcelain`). If `upstream` remote is missing, asks you for the URL (defaults to `https://github.com/qwibitai/nanoclaw.git`) and adds it. Detects the upstream branch name (`main` or `master`).

**Backup**: creates a timestamped backup branch and tag (`backup/pre-update-<hash>-<timestamp>`, `pre-update-<hash>-<timestamp>`) before touching anything. Safe to run multiple times.

**Preview**: runs `git log` and `git diff` against the merge base to show upstream changes since your last sync. Groups changed files into categories:
- **Skills** (`.claude/skills/`): unlikely to conflict unless you edited an upstream skill
- **Host source** (`src/`): may conflict if you modified the same files
- **Container** (`container/`): triggers container rebuild
- **Build/config** (`package.json`, `pnpm-lock.yaml`, `tsconfig*.json`): lockfile changes trigger dep install

**Update paths** (you pick one):
- `merge` (default): `git merge upstream/<branch>`. Resolves all conflicts in one pass.
- `cherry-pick`: `git cherry-pick <hashes>`. Pull in only the commits you want.
- `rebase`: `git rebase upstream/<branch>`. Linear history, but conflicts resolve per-commit.
- `abort`: just view the changelog, change nothing.

**Conflict preview**: before merging, runs a dry-run (`git merge --no-commit --no-ff`) to show which files would conflict. You can still abort at this point.

**Conflict resolution**: opens only conflicted files, resolves the conflict markers, keeps your local customizations intact.

**Validation**: runs `pnpm run build` and `pnpm test`. If container files changed, also runs the container typecheck and `./container/build.sh`.

**Breaking changes check**: after validation, reads CHANGELOG.md for any `[BREAKING]` entries introduced by the update. If found, shows each breaking change and offers to run the recommended skill to migrate.

## Rollback

The backup tag is printed at the end of each run:
```
git reset --hard pre-update-<hash>-<timestamp>
```

Backup branch `backup/pre-update-<hash>-<timestamp>` also exists.

## Token usage

Only opens files with actual conflicts. Uses `git log`, `git diff`, and `git status` for everything else. Does not scan or refactor unrelated code.

---

# Goal
Help a user with a customized NanoClaw install safely incorporate upstream changes without a fresh reinstall and without blowing tokens.

# Operating principles
- Never proceed with a dirty working tree.
- Always create a rollback point (backup branch + tag) before touching anything.
- Prefer git-native operations (fetch, merge, cherry-pick). Do not manually rewrite files except conflict markers.
- Default to MERGE (one-pass conflict resolution). Offer REBASE as an explicit option.
- Keep token usage low: rely on `git status`, `git log`, `git diff`, and open only conflicted files.

# Step 0: Preflight (stop early if unsafe)
Run:
- `git status --porcelain`
If output is non-empty:
- Tell the user to commit or stash first, then stop.

Confirm remotes:
- `git remote -v`
If `upstream` is missing:
- Ask the user for the upstream repo URL (default: `https://github.com/qwibitai/nanoclaw.git`).
