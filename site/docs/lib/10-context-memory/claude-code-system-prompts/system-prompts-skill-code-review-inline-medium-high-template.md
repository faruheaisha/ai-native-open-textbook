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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-code-review-inline-medium-high-template.md"
sourceRel: "system-prompts/skill-code-review-inline-medium-high-template.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-code-review-inline-medium-high-template.md"
sourceSha256: "7f1b1e4844d6dc41afc18b317080c1b0b1f10c2043d18028b00466e8c5a98c58"
pageSha256: "7f1b1e4844d6dc41afc18b317080c1b0b1f10c2043d18028b00466e8c5a98c58"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

`${REVIEW_EFFORT_SUMMARY}`

${REVIEW_EFFORT_INTRO\}

${REVIEW_ANGLE_SHARED_INTRO}
## Phase 1 — Find candidates (3 correctness angles + 3 cleanup angles + 1 altitude angle + 1 conventions angle, up to 6 each)

Run **8 independent finder angles** in sequence yourself, in THIS context — do NOT spawn subagents for them. Each
surfaces **up to 6 candidate findings** with `file`, `line`, a one-line
`summary`, and a concrete `failure_scenario`.

${REVIEW_CORRECTNESS_ANGLES\}
${REVIEW_REUSE_ANGLE}
${REVIEW_SIMPLIFICATION_ANGLE\}
${REVIEW_EFFICIENCY_ANGLE}
${REVIEW_ALTITUDE_ANGLE\}
${REVIEW_CONVENTIONS_ANGLE}
${REVIEW_CANDIDATE_PRECEDENCE_NOTE\}
Pass every candidate with a nameable failure scenario through — finders that
silently drop half-believed candidates are the dominant cause of misses.

## Phase 2 — Dedup only (no verify)

Pool all candidates. Dedup near-duplicates only (same defect, same location, same reason → keep one). Do NOT run verifiers; do NOT re-judge. Sort by severity.

$\{FORMAT_REVIEW_OUTPUT_WITH_MINIMUM_FINDINGS_FN(REVIEW_OUTPUT_FORMATTER_FN)(MAX_FINDINGS)\}
