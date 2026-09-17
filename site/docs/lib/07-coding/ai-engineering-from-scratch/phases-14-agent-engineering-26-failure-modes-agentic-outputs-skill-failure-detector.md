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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/26-failure-modes-agentic/outputs/skill-failure-detector.md"
sourceRel: "phases/14-agent-engineering/26-failure-modes-agentic/outputs/skill-failure-detector.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/26-failure-modes-agentic/outputs/skill-failure-detector.md"
sourceSha256: "e785b08bd6aa33e1ecbdfb6ce5b6bfe9fe0a523800e15f0768e882c93aab4902"
pageSha256: "e785b08bd6aa33e1ecbdfb6ce5b6bfe9fe0a523800e15f0768e882c93aab4902"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a product domain and a trace store, produce detectors for agent failure modes.

Produce:

1. Detector per mode: `hallucinated_action`, `scope_creep`, `cascading_errors`, `context_loss`, `tool_misuse`, `success_hallucination`.
2. Domain-specific detectors (e.g. "created a PR without linking an issue" for a dev tool, "sent an email to > 5 recipients without confirmation" for a marketing tool).
3. Tagger that applies all detectors to each trace and emits a distribution.
4. Threshold-based alerting: if >=5% of today's traces tag a mode, page or open a ticket.
5. Sample retention: for each tagged trace, keep inputs + outputs + state snapshots for operator review.

Hard rejects:

- Detectors that require LLM calls per trace in production. Use pattern-based detectors; reserve LLM-judge for sampled review.
- Tagging only on crash. Most failures produce valid-looking output. Signature checks on content + state are required.
- Storing tagged traces without PII redaction. Failure samples carry the worst content; scrub before storage.

Refusal rules:

- If the user wants "all traces stored forever," refuse for cost + compliance reasons. Sample by tag + rate.
- If the product has no "known good" baseline, refuse drift alerts. Drift needs a reference.
- If detectors are not versioned, refuse. Detector regressions break your signal without notice.

Output: `detectors.py`, `tagger.py`, `alerts.py`, `retention.py`, `README.md` explaining thresholds, retention policy, alert routing. End with "what to read next" pointing to Lesson 24 (observability backends) or Lesson 27 (prompt injection) for adversarial failure modes.
