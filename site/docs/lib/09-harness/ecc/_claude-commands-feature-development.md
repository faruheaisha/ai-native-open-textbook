---
title: "/feature-development"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.claude/commands/feature-development.md"
sourceRel: ".claude/commands/feature-development.md"
rawUrl: "/raw/09-harness/ecc/.claude/commands/feature-development.md"
sourceSha256: "95787804d23de7bb95995cc5988fd5dd3345b00ade1ea2fd8fd9f1ccce200e72"
pageSha256: "95787804d23de7bb95995cc5988fd5dd3345b00ade1ea2fd8fd9f1ccce200e72"
contentMode: "local-full"
zh: ""
---

# /feature-development

Use this workflow when working on **feature-development** in `everything-claude-code`.

## Goal

Standard feature implementation workflow

## Common Files

- `manifests/*`
- `schemas/*`
- `**/*.test.*`
- `**/api/**`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Add feature implementation
- Add tests for feature
- Update documentation

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.
