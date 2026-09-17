---
title: "Wiki Changelog"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/deep-wiki/skills/wiki-changelog/SKILL.md"
sourceRel: ".github/plugins/deep-wiki/skills/wiki-changelog/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/deep-wiki/skills/wiki-changelog/SKILL.md"
sourceSha256: "c2c5da0e585855d44f831859a163ef1fa931df56ec3fb9d6d86ff6929f0a4e9a"
pageSha256: "c2c5da0e585855d44f831859a163ef1fa931df56ec3fb9d6d86ff6929f0a4e9a"
contentMode: "local-full"
zh: ""
---

# Wiki Changelog

Generate structured changelogs from git history.

## Source Repository Resolution (MUST DO FIRST)

Before generating any changelog, you MUST determine the source repository context:

1. **Check for git remote**: Run `git remote get-url origin` to detect if a remote exists
2. **Ask the user**: _"Is this a local-only repository, or do you have a source repository URL (e.g., GitHub, Azure DevOps)?"_
   - Remote URL provided → store as `REPO_URL`, use **linked citations** for commit hashes and file references
   - Local-only → use plain commit hashes and file references
3. **Do NOT proceed** until source repo context is resolved

## When to Activate

- User asks "what changed recently", "generate a changelog", "summarize commits"
- User wants to understand recent development activity

## Procedure

1. Examine git log (commits, dates, authors, messages)
2. Group by time period: daily (last 7 days), weekly (older)
3. Classify each commit: Features (🆕), Fixes (🐛), Refactoring (🔄), Docs (📝), Config (🔧), Dependencies (📦), Breaking (⚠️)
4. Generate concise user-facing descriptions using project terminology

## Constraints

- Focus on user-facing changes
- Merge related commits into coherent descriptions
- Use project terminology from README
- Highlight breaking changes prominently with migration notes
- When `REPO_URL` is available, link commit hashes: `[abc1234](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/deep-wiki/skills/wiki-changelog/REPO_URL/commit/abc1234/README.md)` and changed files: `[file_path](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/deep-wiki/skills/wiki-changelog/REPO_URL/blob/BRANCH/file_path/README.md)`
