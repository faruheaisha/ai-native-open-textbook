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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-code-review-phase-3-sweep-for-gaps.md"
sourceRel: "system-prompts/skill-code-review-phase-3-sweep-for-gaps.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-code-review-phase-3-sweep-for-gaps.md"
sourceSha256: "a74b9d34883e9fdd2aa7c547a42f13278e23891e642c9cc9c62f3b299e8f342e"
pageSha256: "a74b9d34883e9fdd2aa7c547a42f13278e23891e642c9cc9c62f3b299e8f342e"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

## Phase 3 — Sweep for gaps

Run **one more finder** as a fresh reviewer who has the verified list. Re-read
the diff and enclosing functions looking ONLY for defects not already listed.
Do not re-derive or re-confirm anything already there — the job is gaps. Focus
on what the first pass tends to miss: $\{SWEEP_MISS_CATEGORIES\}

Surface **up to 8 additional candidates**, each naming a defect not already on
the list. If nothing new, return an empty sweep — do not pad.
