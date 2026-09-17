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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-code-review-output-findings-json-array.md"
sourceRel: "system-prompts/skill-code-review-output-findings-json-array.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-code-review-output-findings-json-array.md"
sourceSha256: "e4faaa11dd86fc5cc874a226fd81e4a4a4b1ba7c5d8c1332592a42d44212f1dc"
pageSha256: "e4faaa11dd86fc5cc874a226fd81e4a4a4b1ba7c5d8c1332592a42d44212f1dc"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

## Output

Return findings as a JSON array of at most $\{MAX_FINDINGS\} objects:

```json
[
  {
    "file": "path/to/file.ext",
    "line": 123,
    "summary": "one-sentence statement of the bug",
    "failure_scenario": "concrete inputs/state → wrong output/crash"
  }
]
```

Ranked most-severe first. If more than ${MAX_FINDINGS} survive, keep the ${MAX_FINDINGS\} most
severe. If nothing survives verification, return `[]`. Do not call the
$\{REPORT_FINDINGS_TOOL_NAME\} tool even if it is available - this review's
output contract is the JSON block above.
