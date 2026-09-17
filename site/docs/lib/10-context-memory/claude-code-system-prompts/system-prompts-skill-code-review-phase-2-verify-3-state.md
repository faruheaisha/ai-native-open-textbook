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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-code-review-phase-2-verify-3-state.md"
sourceRel: "system-prompts/skill-code-review-phase-2-verify-3-state.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-code-review-phase-2-verify-3-state.md"
sourceSha256: "0cb6c140b1e9342d85f8f744d5ae68f6b30a27845fdd803737cad88542cbc3f4"
pageSha256: "0cb6c140b1e9342d85f8f744d5ae68f6b30a27845fdd803737cad88542cbc3f4"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

## Phase 2 — Verify (1-vote, 3-state)

Dedup candidates that point at the same line/mechanism, keeping the one with
the most concrete failure scenario. For each remaining candidate, run **one
verifier** via the ${AGENT_TOOL_NAME} tool: give it the diff, the relevant
file(s), and the candidate, and have it return exactly one of:

${VERIFY_VOTE_DEFINITIONS\}

Keep candidates where the vote is CONFIRMED or PLAUSIBLE.
