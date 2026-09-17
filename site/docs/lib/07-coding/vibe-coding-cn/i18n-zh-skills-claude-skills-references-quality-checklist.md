---
title: "Quality Checklist (Production Gate)"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-skills/references/quality-checklist.md"
sourceRel: "i18n/zh/skills/claude-skills/references/quality-checklist.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/claude-skills/references/quality-checklist.md"
sourceSha256: "6ec7f8f31da9dd33ae7ac998cf7f28a380e74f52e69ddd106152ada0bbf38794"
pageSha256: "6ec7f8f31da9dd33ae7ac998cf7f28a380e74f52e69ddd106152ada0bbf38794"
contentMode: "local-full"
zh: ""
---

# Quality Checklist (Production Gate)

Use this checklist to decide whether a Skill is shippable. It is intentionally biased toward reliability and maintainability over "more content".

## Scoring

Score each item:
- 2 = fully satisfied
- 1 = partially satisfied / needs work
- 0 = missing

Suggested ship threshold:
- Total score >= 24 (out of 32)
- No "critical" item below 2

## A. Activation Reliability (Critical)

1. Frontmatter `name` matches `^[a-z][a-z0-9-]*$` and matches directory name (2)
2. Frontmatter `description` is decidable ("what + when") with concrete keywords (2)
3. `## When to Use This Skill` lists concrete tasks/inputs/goals (2)
4. `## Not For / Boundaries` exists and meaningfully prevents misfires (2)

## B. Usability (Critical)

5. `## Quick Reference` is short and directly usable (no doc dumps) (2)
6. Quick Reference patterns are formatted for copy/paste (2)
7. `## Examples` contains >= 3 reproducible examples (2)
8. Examples include acceptance criteria / expected output (2)

## C. Evidence & Correctness

9. `## Maintenance` lists sources (docs/repos/specs) and last-updated date (2)
10. Uncertain external details include a verification path (2)
11. Terminology is consistent (one concept, one name) (2)
12. No contradictions between Quick Reference and Examples (2)

## D. Structure & Maintainability

13. Long-form content lives in `references/` with `references/index.md` navigation (2)
14. Reference files are split by topic (not one giant file) (2)
15. The skill reads like an operator manual (task -> steps -> acceptance) (2)
16. Optional: scripts/assets are minimal and clearly scoped (2)

## Common Reasons to Fail the Gate

- Vague activation ("helps with X") with no boundaries
- Quick Reference contains pasted documentation instead of patterns
- Examples are not reproducible (no inputs, no steps, no expected output)
- No sources and no update date (cannot be trusted or maintained)
