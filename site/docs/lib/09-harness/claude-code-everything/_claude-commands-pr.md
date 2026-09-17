---
title: "Create Pull Request Command"
sourceId: "09-harness/claude-code-everything"
sourceTitle: "Claude Code Everything You Need to Know"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know"
entryUrl: "https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know/blob/d9e93740193aeae2cd661c7ddf6f0c8f8989860b/.claude/commands/pr.md"
sourceRel: ".claude/commands/pr.md"
rawUrl: "/raw/09-harness/claude-code-everything/.claude/commands/pr.md"
sourceSha256: "f27c9357b19f070dea21a251ed08135131f88ea2c027fe8608866d7788f1e18e"
pageSha256: "f27c9357b19f070dea21a251ed08135131f88ea2c027fe8608866d7788f1e18e"
contentMode: "local-full"
zh: ""
---

# Create Pull Request Command

Create a new branch, commit changes, and submit a pull request.

## Behavior
- Creates a new branch based on current changes
- Formats modified files using Biome
- Analyzes changes and automatically splits into logical commits when appropriate
- Each commit focuses on a single logical change or feature
- Creates descriptive commit messages for each logical unit
- Pushes branch to remote
- Creates pull request with proper summary and test plan

## Guidelines for Automatic Commit Splitting
- Split commits by feature, component, or concern
- Keep related file changes together in the same commit
- Separate refactoring from feature additions
- Ensure each commit can be understood independently
- Multiple unrelated changes should be split into separate commits
