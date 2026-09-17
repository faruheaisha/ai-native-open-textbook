---
title: "/database-migration"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.claude/commands/database-migration.md"
sourceRel: ".claude/commands/database-migration.md"
rawUrl: "/raw/09-harness/ecc/.claude/commands/database-migration.md"
sourceSha256: "b1a8496fd1dfd729ff8e9ff9dbfb15bec00f737876ea6dff5589e27b3f347af8"
pageSha256: "b1a8496fd1dfd729ff8e9ff9dbfb15bec00f737876ea6dff5589e27b3f347af8"
contentMode: "local-full"
zh: ""
---

# /database-migration

Use this workflow when working on **database-migration** in `everything-claude-code`.

## Goal

Database schema changes with migration files

## Common Files

- `**/schema.*`
- `migrations/*`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create migration file
- Update schema definitions
- Generate/update types

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.
