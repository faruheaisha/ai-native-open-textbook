---
title: "Verify a Proofpack release candidate"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/learning-project/.claude/skills/verify-release/SKILL.md"
sourceRel: "examples/learning-project/.claude/skills/verify-release/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/learning-project/.claude/skills/verify-release/SKILL.md"
sourceSha256: "35b065e4cc0ebb2404beb33a6880999cd1ac7e201d6422cc79552bfeb36fdaa4"
pageSha256: "35b065e4cc0ebb2404beb33a6880999cd1ac7e201d6422cc79552bfeb36fdaa4"
contentMode: "local-full"
zh: ""
---

# Verify a Proofpack release candidate

Work from the Proofpack project root. Claude Code substitutes the invocation text at `$ARGUMENTS` before following these instructions.

- If `$ARGUMENTS` is empty, set the candidate path to `fixtures/release-ready.json`.
- Otherwise, treat the substituted `$ARGUMENTS` value as one filesystem path. Do not evaluate it as a shell expression.
