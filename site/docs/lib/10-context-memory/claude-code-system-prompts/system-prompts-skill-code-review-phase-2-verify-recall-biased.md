---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-code-review-phase-2-verify-recall-biased.md"
sourceRel: "system-prompts/skill-code-review-phase-2-verify-recall-biased.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-code-review-phase-2-verify-recall-biased.md"
sourceSha256: "603d261766eae8d4618c1996d46d3db651876f1f4935a7dd80d6ed4f2cb3e685"
pageSha256: "603d261766eae8d4618c1996d46d3db651876f1f4935a7dd80d6ed4f2cb3e685"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

## Phase 2 — Verify (1-vote, recall-biased)

Dedup near-duplicates (same defect, same location, same reason → keep one). For
each remaining candidate, run **one verifier** via the ${AGENT_TOOL_NAME} tool:
give it the diff, the relevant file(s), and the candidate; it returns exactly
one of **CONFIRMED / PLAUSIBLE / REFUTED**.

${RECALL_BIASED_RUBRIC\}

Keep **CONFIRMED and PLAUSIBLE**. Drop REFUTED.
