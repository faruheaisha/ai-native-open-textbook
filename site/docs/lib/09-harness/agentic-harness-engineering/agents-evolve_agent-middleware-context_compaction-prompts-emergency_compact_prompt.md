---
title: "Emergency Context Compaction Prompt"
sourceId: "09-harness/agentic-harness-engineering"
sourceTitle: "Agentic Harness Engineering（论文与实现）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering"
entryUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering/blob/8b2a55d97590363fe50c3cc6b5e833b020a4bb4c/agents/evolve_agent/middleware/context_compaction/prompts/emergency_compact_prompt.md"
sourceRel: "agents/evolve_agent/middleware/context_compaction/prompts/emergency_compact_prompt.md"
rawUrl: "/raw/09-harness/agentic-harness-engineering/agents/evolve_agent/middleware/context_compaction/prompts/emergency_compact_prompt.md"
sourceSha256: "681f5fbc1b4e7dade3c0b0c3e01ff4c182c3c144023753da5b57380468d40158"
pageSha256: "681f5fbc1b4e7dade3c0b0c3e01ff4c182c3c144023753da5b57380468d40158"
contentMode: "local-full"
zh: ""
---

# Emergency Context Compaction Prompt

You are performing emergency context compaction under severe token pressure.
Compress the provided trace into a minimal continuation summary.

Hard requirements:
1) Output exactly 5 sentences, numbered "1." through "5.".
2) Keep each sentence <= 80 words.
3) Keep only high-value facts: current objective, non-negotiable constraints, confirmed decisions/results, blockers, and immediate next step.
4) Preserve concrete identifiers whenever available: file paths, config keys, APIs, tool names, error codes, stop reasons.
5) Do not include examples, narrative background, repeated details, or speculative content.
6) If information is missing for a slot, write "NONE".
7) Use the same language as the latest user message.

Sentence schema (strict):
1. Current objective and latest user intent.
2. Hard constraints and locked decisions.
3. Verified completed work and critical artifacts.
4. Active blockers/risks and critical pitfalls to avoid.
5. Immediate next executable action.

Output only the 5 numbered sentences.
