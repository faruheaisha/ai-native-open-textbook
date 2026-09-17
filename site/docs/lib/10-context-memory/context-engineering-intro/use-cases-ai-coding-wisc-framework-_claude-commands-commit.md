---
title: "Commit Changes"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/use-cases/ai-coding-wisc-framework/.claude/commands/commit.md"
sourceRel: "use-cases/ai-coding-wisc-framework/.claude/commands/commit.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/use-cases/ai-coding-wisc-framework/.claude/commands/commit.md"
sourceSha256: "f98227f52ed9ae9b1b2210be88c9544e4b8744b42b2aa583e4ce7b1434f82a83"
pageSha256: "f98227f52ed9ae9b1b2210be88c9544e4b8744b42b2aa583e4ce7b1434f82a83"
contentMode: "local-full"
zh: ""
---

# Commit Changes

## Process

### 1. Review Changes

```bash
git status
git diff HEAD
git diff --stat HEAD
```

Check for new untracked files:
```bash
git ls-files --others --exclude-standard
```

### 2. Stage Files

Add the untracked and changed files relevant to the current work.

**Do NOT stage:**
- `.env` or credential files
- Large binary files
- Files unrelated to the current task

### 3. Create Commit

Write an atomic commit message with a conventional commit tag:

- `feat:` — New capability or feature
- `fix:` — Bug fix
- `refactor:` — Code restructure without behavior change
- `docs:` — Documentation only
- `test:` — Test additions or fixes
- `chore:` — Build, CI, tooling changes
- `perf:` — Performance improvement

**For monorepo changes spanning multiple packages**, note the primary package in the scope:
```
feat(workflows): add DAG condition evaluator
fix(web): resolve SSE reconnection on navigation
refactor(isolation): simplify worktree resolution order
```

**Commit message format:**
```
tag(scope): concise description of what changed

[Optional body explaining WHY this change was made,
not just what changed. Include context that isn't
obvious from the diff.]

[Optional: Fixes #123, Closes #456]
```

### 4. Capture AI Context Changes

If any AI context assets were modified in this commit, add a `Context:` section to the commit body:

```
feat(orchestrator): add retry logic for session recovery

Added exponential backoff when SDK subprocess crashes mid-session.
Previously a single crash would fail the entire workflow.

Context:
- Updated .claude/rules/orchestrator.md with retry conventions
- Added .claude/commands/debug-session.md for session state inspection
- Surfaced issue: mock.module() in retry tests needs isolated batch

Fixes #482
```

**What counts as AI context changes:**
- `.claude/rules/` — on-demand conventions added, updated, or removed
- `.claude/commands/` — slash commands created or modified
- `.claude/docs/` — reference docs added or updated
- `CLAUDE.md` — global rules changes
- `.archon/workflows/` or `.archon/commands/` — workflow or command definitions

**Why this matters:** Your git log is long-term memory. Future agents and sessions use `git log` to understand project history. If context changes aren't captured in commits, the AI layer's evolution becomes invisible — you lose the ability to trace WHY a rule exists or WHEN a command was added.
