---
title: "Migration Review Checklist"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/certifications/claude/lessons/19-claude-code-memory-rules-skills-and-ci/outputs/migration-review-skill/references/review-checklist.md"
sourceRel: "certifications/claude/lessons/19-claude-code-memory-rules-skills-and-ci/outputs/migration-review-skill/references/review-checklist.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/certifications/claude/lessons/19-claude-code-memory-rules-skills-and-ci/outputs/migration-review-skill/references/review-checklist.md"
sourceSha256: "feaf3805f7918026e94eae6b9f3f87fe77e89ac7fd0213d3ec4b94fb54cf3cd0"
pageSha256: "feaf3805f7918026e94eae6b9f3f87fe77e89ac7fd0213d3ec4b94fb54cf3cd0"
contentMode: "local-full"
zh: ""
---

# Migration Review Checklist

## Forward

- Identify the schema and data transition.
- Check compatibility with the currently deployed application version.
- Estimate locks, transaction duration, and affected row volume.

## Rollback

- State whether rollback is safe, lossy, or impossible.
- Keep destructive cleanup separate from the compatibility migration.
- Name the restore or compensating path when reversal is not possible.

## Evidence

- Record the exact validation command and result.
- Link each risk to a file and statement.
- Leave the decision blocked when production volume or compatibility evidence is missing.
