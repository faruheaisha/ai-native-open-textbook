---
title: "Issue tracker: GitHub"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/agents/issue-tracker.md"
sourceRel: "docs/agents/issue-tracker.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/agents/issue-tracker.md"
sourceSha256: "dd48bb46445131576c06e1176b32675a9ecbffda218328716d45697b82cb5dbe"
pageSha256: "dd48bb46445131576c06e1176b32675a9ecbffda218328716d45697b82cb5dbe"
contentMode: "local-full"
zh: ""
---

# Issue tracker: GitHub

Issues for this repo live in **GitHub Issues** at `gsd-build/get-shit-done`.

## Auth

Use the configured GitHub CLI session for this checkout. Do not require a
repo-local `.envrc` before running `gh`.

## Conventions

- **Create**: `gh issue create --repo gsd-build/get-shit-done --title "..." --body "..."`
- **Read**: `gh issue view <number> --repo gsd-build/get-shit-done --comments`
- **List**: `gh issue list --repo gsd-build/get-shit-done --state open --json number,title,labels --jq '...'`
- **Comment**: `gh issue comment <number> --repo gsd-build/get-shit-done --body "..."`
- **Label**: `gh issue edit <number> --repo gsd-build/get-shit-done --add-label "..." --remove-label "..."`
- **Close**: `gh issue close <number> --repo gsd-build/get-shit-done --comment "..."`

Always pass `--repo gsd-build/get-shit-done` explicitly — the local clone has multiple remotes and `gh` may resolve to the wrong one.

## When a skill says "publish to the issue tracker"

Create a GitHub issue at `gsd-build/get-shit-done`.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --repo gsd-build/get-shit-done --comments`.
