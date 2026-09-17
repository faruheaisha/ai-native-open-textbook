---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/vs-code.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/vs-code.md"
sourceSha256: "6c14f8a02079b0d1ee1142ff770bcda731b181565c57a600c9377c899fbc9801"
pageSha256: "75d3553570b27a56ade6ef6006261582ea7db68b7d3a6505d68e67559b1447f0"
contentMode: "local-full"
zh: ""
---

## Work with git

Claude Code integrates with git to help with version control workflows directly in VS Code. Ask Claude to commit changes, create pull requests, or work across branches. To start Claude in an isolated worktree with its own files and branch, see [Run parallel sessions with worktrees](https://code.claude.com/docs/en/worktrees).

### Create commits and pull requests

Claude can stage changes, write commit messages, and create pull requests based on your work:

```text wrap theme={null}
commit my changes with a descriptive message
create a pr for this feature
summarize the changes I've made to the auth module
```

When creating pull requests, Claude generates descriptions based on the actual code changes and can add context about testing or implementation decisions.
