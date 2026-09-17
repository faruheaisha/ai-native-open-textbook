---
title: "Refactor a module safely"
sourceId: "07-coding/cs146s-cn"
sourceTitle: "动手学 CS146S 中文版"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/ShouZhengAI/CS146S_CN"
entryUrl: "https://github.com/ShouZhengAI/CS146S_CN/blob/0d65f36f6673147d6c298670da4f9b4bd7f991fa/Assignments/week4/.claude/commands/refactor-module.md"
sourceRel: "Assignments/week4/.claude/commands/refactor-module.md"
rawUrl: "/raw/07-coding/cs146s-cn/Assignments/week4/.claude/commands/refactor-module.md"
sourceSha256: "5d41d8f000578411b1ac0e2f824104fad5767d8459d3ed3be95b5f319d8a021b"
pageSha256: "5d41d8f000578411b1ac0e2f824104fad5767d8459d3ed3be95b5f319d8a021b"
contentMode: "local-full"
zh: ""
---

# Refactor a module safely

Refactor the module described by `$ARGUMENTS` (include old path, new path, and any symbol rename). Refuse to guess if either path is missing.

1. Inspect the module, all imports/re-exports, tests, documentation, and string references.
2. Establish a clean baseline with `ruff check backend` and the narrowest relevant pytest test file.
3. Move the module once, update all callers and tests, and remove the obsolete path. Do not leave compatibility shims unless requested.
4. Run `ruff check backend`, `black --check backend`, and the relevant tests; then run `pytest -q backend/tests --maxfail=1`.
5. Search again for the old import path and symbol. Report changed files, verification commands/results, and any intentional remaining textual references.

Preserve public behavior and database data. Do not use destructive Git commands. If validation fails, keep the working tree inspectable and describe how to revert only the files changed by this workflow.
