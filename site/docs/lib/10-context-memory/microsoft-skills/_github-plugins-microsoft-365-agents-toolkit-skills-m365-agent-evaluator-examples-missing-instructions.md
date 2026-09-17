---
title: "Example: missing or weak instructions"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/examples/missing-instructions.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/examples/missing-instructions.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/examples/missing-instructions.md"
sourceSha256: "8617159c45e30c8361091e8dca5c18060d58418b95c986ebfc905ab6729f4fcf"
pageSha256: "8617159c45e30c8361091e8dca5c18060d58418b95c986ebfc905ab6729f4fcf"
contentMode: "local-full"
zh: ""
---

# Example: missing or weak instructions

User intent: "My agent gives vague answers in evals."

## Symptoms

- `relevance` passes but `coherence` fails.
- `groundedness` fails because the agent invents missing facts.
- `similarity` fails because the answer omits required structure or decisions.
- Follow-up turns fail after a successful first turn.

## Diagnosis

Check whether the agent instructions specify:

1. supported scenarios and boundaries,
2. source-grounding expectations,
3. citation expectations,
4. response format,
5. behavior when data is missing,
6. follow-up context handling.

## Suggested instruction additions

```text
Use only available workplace sources when answering source-backed questions. If the sources do not contain enough evidence, say what is missing instead of guessing.
```

```text
For project-status answers, use this structure: Summary, Evidence, Risks, Next actions. Keep the answer concise and include citations when available.
```

```text
For follow-up questions, preserve the project, customer, and time window from the prior turn unless the user changes them.
```

## Matching eval update

Add or keep regression prompts that test the new instruction:

```json
{
  "prompt": "Summarize the latest status for the project and include citations.",
  "expected_response": "The agent summarizes only source-backed status, cites available sources, and states when evidence is missing.",
  "evaluators": {
    "Groundedness": {
      "threshold": 4
    },
    "Citations": {
      "threshold": 1
    }
  },
  "evaluators_mode": "extend"
}
```
