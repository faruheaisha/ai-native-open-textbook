---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "7f40846d6a7dbd9a7b4648d6b94d4285f2948fac91f27bc344a9bab17c5b640f"
contentMode: "local-full"
zh: ""
---

## Git Worktrees

Git Worktrees allow you to start Claude Code in an isolated worktree, enabling parallel work on different branches without stashing or switching.

### Starting in a Worktree

```bash
# Start Claude Code in an isolated worktree
claude --worktree
# or
claude -w
```

### Worktree Location

Worktrees are created at:
```
<repo>/.claude/worktrees/<name>
```

### Sparse Checkout for Monorepos

Use the `worktree.sparsePaths` setting to perform sparse-checkout in monorepos, reducing disk usage and clone time:

```json
{
  "worktree": {
    "sparsePaths": ["packages/my-package", "shared/"]
  }
}
```

### Base Branch Reference (`worktree.baseRef`)

**`worktree.baseRef`** (added v2.1.133) — controls whether `claude --worktree` branches from `origin/<default>` or local `HEAD`.
