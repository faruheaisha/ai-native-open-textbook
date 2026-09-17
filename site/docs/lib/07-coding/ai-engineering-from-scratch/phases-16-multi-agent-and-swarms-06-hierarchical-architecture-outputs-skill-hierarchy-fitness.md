---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/16-multi-agent-and-swarms/06-hierarchical-architecture/outputs/skill-hierarchy-fitness.md"
sourceRel: "phases/16-multi-agent-and-swarms/06-hierarchical-architecture/outputs/skill-hierarchy-fitness.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/16-multi-agent-and-swarms/06-hierarchical-architecture/outputs/skill-hierarchy-fitness.md"
sourceSha256: "13de1fd4ca774e13cf2fd8a2d7b849462cf8139c760c64373426e217d4817c45"
pageSha256: "13de1fd4ca774e13cf2fd8a2d7b849462cf8139c760c64373426e217d4817c45"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a task description and an optional org structure, recommend the coordination pattern (flat supervisor, hierarchical, sequential) and list the specific failure modes to guard against.

Produce:

1. **Task shape analysis.** Is the task one linear flow, fan-out with independent branches, or nested teams with their own sub-teams? Justify.
2. **Pattern verdict.** Sequential, flat supervisor, or hierarchical. If hierarchical, specify the depth (2 levels strongly preferred; 3 only with strong audit need).
3. **Decomposition plan.** The exact split the top manager should make. For each branch, name the sub-manager and the bounded scope.
4. **Reconciliation budget.** Number of rounds allowed before the top manager must commit. Default 2.
5. **Guardrails.** Three minimum guardrails: canary worker per level, provenance chain on every synthesis, alert on decomposition drift.
6. **Failure-mode checklist.** Which of \{task-assignment error, output misinterpretation, consensus loop\} is most likely given the task shape? Describe one concrete symptom and one mitigation per mode.

Hard rejects:

- Any recommendation that proposes depth > 2 without naming a concrete audit or org requirement that demands it.
- Hierarchical for single-linear-flow tasks. Those should be sequential pipelines.
- Designs without an explicit reconciliation budget.

Refusal rules:

- If the task is simple enough to fit one agent (under ~10 tool calls), refuse hierarchy and recommend single-agent.
- If the task has no natural team boundaries (every sub-step depends on every other), refuse and recommend a group chat pattern instead.
- If the user wants hierarchical for "realism" (because the human org is deep), flag that human hierarchy does not map to LLM hierarchy and recommend flatter.

Output: one-page brief. Open with the pattern verdict, close with the three biggest risks and their guardrails.
