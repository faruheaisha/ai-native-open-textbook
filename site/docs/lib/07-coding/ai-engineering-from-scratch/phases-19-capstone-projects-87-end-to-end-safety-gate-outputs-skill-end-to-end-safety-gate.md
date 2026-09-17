---
title: "End-to-End Safety Gate"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/19-capstone-projects/87-end-to-end-safety-gate/outputs/skill-end-to-end-safety-gate.md"
sourceRel: "phases/19-capstone-projects/87-end-to-end-safety-gate/outputs/skill-end-to-end-safety-gate.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/19-capstone-projects/87-end-to-end-safety-gate/outputs/skill-end-to-end-safety-gate.md"
sourceSha256: "ed76df8b99b6a6c605e6c1c5e1abbf1bdd4276a1c84fe5f76da9e04ac7b94edb"
pageSha256: "ed76df8b99b6a6c605e6c1c5e1abbf1bdd4276a1c84fe5f76da9e04ac7b94edb"
contentMode: "local-full"
zh: ""
---

# End-to-End Safety Gate

## Lifecycle

1. pre-gen - run the lesson 83 detector on the prompt
   - if confidence >= block_threshold: return refusal, emit trace, stop
2. during-gen - stream from the model, buffer two chunks, scan for known harmful continuations
   - if matched: terminate iterator, mark trace, treat as medium severity
3. post-gen - if no early termination, run the lesson 85 classifier router and the lesson 86 rules engine on the completed output
4. aggregate - take the maximum severity across pre, during, post.classifier, post.rules
5. apply - map to block, redact, warn, or allow

## Aggregation table

| Signal state | Action |
|---|---|
| any high severity | block |
| any medium severity | redact |
| any low severity | warn |
| nothing | allow |

## Trace structure

```text
RequestTrace
  request_id: str
  prompt: str
  pre_gen: { category, confidence, fired[] }
  during_gen: { terminated_early, matched_pattern, partial_chunks }
  post_gen: { classifier_action, classifier_severity, rules_max_severity, rules_violations[] } | null
  final_action: block | redact | warn | allow
  final_output: str
  latency_ms: float
```

## Artifact

`outputs/gate_trace.json` contains the summary and one trace per request, including 50 taxonomy fixtures and 10 benign prompts.
