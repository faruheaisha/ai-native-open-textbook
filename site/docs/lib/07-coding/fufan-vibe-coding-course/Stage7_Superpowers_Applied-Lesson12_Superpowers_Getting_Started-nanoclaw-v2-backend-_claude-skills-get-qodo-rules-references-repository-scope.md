---
title: "Repository Scope Detection"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/get-qodo-rules/references/repository-scope.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/get-qodo-rules/references/repository-scope.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/get-qodo-rules/references/repository-scope.md"
sourceSha256: "469e6c352468b8afea6af9892b5b48f2849fa553f1ab2e0c42a1ab7c845541b4"
pageSha256: "469e6c352468b8afea6af9892b5b48f2849fa553f1ab2e0c42a1ab7c845541b4"
contentMode: "local-full"
zh: ""
---

# Repository Scope Detection

## Extracting Repository Scope from Git Remote URL

Parse the `origin` remote URL to derive the scope path. Both URL formats are supported:

- SSH: `git@github.com:org/repo.git` → `/org/repo/`
- HTTPS: `https://github.com/org/repo.git` → `/org/repo/`

If no remote is found, exit silently. If the URL cannot be parsed, inform the user and exit gracefully.

## Module-Level Scope Detection

If the current working directory is inside a `modules/*` subdirectory relative to the repository root, use it as the query scope:

- `modules/rules/src/service.py` → query scope: `/org/repo/modules/rules/`
- repository root or any other path → query scope: `/org/repo/`

## Scope Hierarchy

The API returns all rules matching the query scope via prefix matching:

| Query scope | Rules returned |
|---|---|
| `/org/repo/modules/rules/` | universal + org + repo + path-level rules |
| `/org/repo/` | universal + org + repo-level rules |
