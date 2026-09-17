---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/agents-and-tools/tool-use/bash-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/bash-tool.md"
sourceSha256: "d63bfc6cf76c6d6dd8a08c8fa3617a2fba9c13f554b11f823fc3892abe8b93e2"
pageSha256: "23f7cf28652905a1a3eeb09b2020d58f11fefa355e715c1e3c20b4d9aebbe43a"
contentMode: "local-full"
zh: ""
---

## Common patterns

### Development workflows

* Running tests: `pytest && coverage report`
* Building projects: `npm install && npm run build`
* Git operations: `git status && git add . && git commit -m "message"`

For guidance on using git as a checkpoint-and-recovery mechanism in long-running agent workflows, see [state management best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#state-management-best-practices).

### File operations

* Processing data: `wc -l *.csv && ls -lh *.csv`
* Searching files: `find . -name "*.py" | xargs grep "pattern"`
* Creating backups: `tar -czf backup.tar.gz ./data`

### System tasks

* Checking resources: `df -h && free -m`
* Process management: `ps aux | grep python`
* Environment setup: `export PATH=$PATH:/new/path && echo $PATH`
