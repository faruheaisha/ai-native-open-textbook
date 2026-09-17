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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/agent-prompt-code-review-unavailable-agent-inline-mode.md"
sourceRel: "system-prompts/agent-prompt-code-review-unavailable-agent-inline-mode.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/agent-prompt-code-review-unavailable-agent-inline-mode.md"
sourceSha256: "c965484854c208acf1d007be15efa2cc5902e184c265ef477d911f5a77943f8e"
pageSha256: "c965484854c208acf1d007be15efa2cc5902e184c265ef477d911f5a77943f8e"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

`${REVIEW_MODE_TAG}`

${REVIEW_LEAD_IN\}

${AGENT_UNAVAILABLE_INSTRUCTIONS}
${DIFF_GATHERING_PHASE\}## Phase 1 — Find candidates (${ANGLE_COUNT} angles, single pass)

Work through **${ANGLE_COUNT\} angles** yourself, in sequence, in this same
context — do not spawn subagents. Each surfaces candidate findings with
`file`, `line`, a one-line `summary`, and a concrete `failure_scenario`.

${FINDER_ANGLES_BLOCK}
${CLEANUP_AND_ALTITUDE_CANDIDATES_NOTE\}
## Phase 2 — Dedup and self-check (no subagent verify)

Dedup near-duplicates (same defect, same location, same reason → keep one).
Re-check each remaining candidate yourself against the diff before keeping it.
${GAP_SWEEP_PHASE}
${OUTPUT_FORMAT_FN(MAX_FINDINGS)\}$\{INLINE_REVIEW_DISCLOSURE\}
