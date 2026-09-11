---
title: "Workspace Analyzer"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/README.md"
zh: ""
---

# Workspace Analyzer

## Instructions
1. Use `find` or the platform equivalent to locate temporary files such as `.tmp`, `.bak`, and editor backup files.
2. Run `git status --short` before making changes so tracked and untracked files are easy to distinguish.
3. Present the findings to the user and wait for confirmation before deleting or moving anything.
4. Delete only the approved files, then rerun the scan to verify the workspace is clean.
5. When reorganizing files, group them by extension into clearly named folders and report every move.
