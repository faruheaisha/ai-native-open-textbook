---
title: "Migration Review"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/certifications/claude/lessons/19-claude-code-memory-rules-skills-and-ci/outputs/migration-review-skill/SKILL.md"
sourceRel: "certifications/claude/lessons/19-claude-code-memory-rules-skills-and-ci/outputs/migration-review-skill/SKILL.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/certifications/claude/lessons/19-claude-code-memory-rules-skills-and-ci/outputs/migration-review-skill/SKILL.md"
sourceSha256: "5e5e0cb4bcd5f7a0fa8fb1cecf09d899b93364c56dbe66daba2f6913d649c4f2"
pageSha256: "5e5e0cb4bcd5f7a0fa8fb1cecf09d899b93364c56dbe66daba2f6913d649c4f2"
contentMode: "local-full"
zh: ""
---

# Migration Review

Review only the migration files named in `$ARGUMENTS` and the code needed to
verify their compatibility. This Skill does not authorize applying a migration.

1. Run `python3 ${CLAUDE_SKILL_DIR\}/scripts/check_scope.py $ARGUMENTS`.
2. Stop if the checker rejects any path outside `migrations/`.
3. Read [references/review-checklist.md](/lib/07-coding/ai-engineering-from-scratch/certifications-claude-lessons-19-claude-code-memory-rules-skills-and-ci-outputs-migration-review-skill-references-review-checklist).
4. Inspect each accepted file and its schema assumptions.
5. Report forward behavior, rollback limits, lock risk, data-volume risk,
   verification evidence, and unresolved blockers.

Return these headings: `Scope`, `Evidence`, `Risks`, `Rollback`, `Blockers`, and
`Decision`. Use `Decision: blocked` whenever required evidence is missing.

The bundled checker is [scripts/check_scope.py](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/certifications/claude/lessons/19-claude-code-memory-rules-skills-and-ci/outputs/migration-review-skill/scripts/check_scope.py). The
`allowed-tools` entry pre-approves only that command for the invocation turn; it
does not remove other tools or replace project permission rules.
