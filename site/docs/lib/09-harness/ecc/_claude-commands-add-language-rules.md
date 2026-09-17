---
title: "/add-language-rules"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.claude/commands/add-language-rules.md"
sourceRel: ".claude/commands/add-language-rules.md"
rawUrl: "/raw/09-harness/ecc/.claude/commands/add-language-rules.md"
sourceSha256: "4186cde518463bdd05c5493e29b45cff27accd2be8b198b9842895055d71a83f"
pageSha256: "4186cde518463bdd05c5493e29b45cff27accd2be8b198b9842895055d71a83f"
contentMode: "local-full"
zh: ""
---

# /add-language-rules

Use this workflow when working on **add-language-rules** in `everything-claude-code`.

## Goal

Adds a new programming language to the rules system, including coding style, hooks, patterns, security, and testing guidelines.

## Common Files

- `rules/*/coding-style.md`
- `rules/*/hooks.md`
- `rules/*/patterns.md`
- `rules/*/security.md`
- `rules/*/testing.md`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create a new directory under rules/\{language\}/
- Add coding-style.md, hooks.md, patterns.md, security.md, and testing.md files with language-specific content
- Optionally reference or link to related skills

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.
