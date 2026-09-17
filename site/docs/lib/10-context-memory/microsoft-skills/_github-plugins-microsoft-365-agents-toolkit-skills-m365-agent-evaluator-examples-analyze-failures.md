---
title: "Example: analyze existing failures"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/examples/analyze-failures.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/examples/analyze-failures.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/examples/analyze-failures.md"
sourceSha256: "01eb1ab5286a15bee9b0f03efd5596035d5fb9d6726f489e67ab11ef67eb79e8"
pageSha256: "01eb1ab5286a15bee9b0f03efd5596035d5fb9d6726f489e67ab11ef67eb79e8"
contentMode: "local-full"
zh: ""
---

# Example: analyze existing failures

User intent: "Here is my eval output. What should I fix?"

## Inputs

Expected files:

```text
.evals\latest.json
evals\evals.json
```

Do not paste raw prompts, responses, retrieved data, or logs into chat if they may contain sensitive content.

## Process

1. Load `references\result-analysis.md` and `references\remediation-patterns.md`.
2. Inspect `metadata` for CLI version, agent ID/name, and evaluated time.
3. Inspect each item under `items`.
4. For each item, read sparse `scores` keys such as `relevance`, `coherence`, `groundedness`, `similarity`, `citations`, `exactMatch`, and `partialMatch`.
5. Treat missing score keys as "not configured", not failed.
6. Summarize the smallest targeted changes.

## Example finding

```text
Primary issue: Citation behavior is inconsistent.
Evidence: The citation evaluator failed on prompts that ask for workplace-source summaries, while relevance and coherence passed.
Recommended change: Add an instruction requiring citations for source-backed summaries and verify the agent path can surface citations.
Expected effect: `citations` should meet the minimum count threshold without changing the response content.
```

## Common false positives

- Expected response is too specific for a legitimately variable answer.
- `ExactMatch` is used for natural language text.
- A prompt assumes source data that is not available to the deployed agent.
- The run failed during auth, schema validation, or evaluator-model setup.
