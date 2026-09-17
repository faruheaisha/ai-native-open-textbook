---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/18-ethics-safety-alignment/08-in-context-scheming-frontier-models/outputs/skill-scheming-triage.md"
sourceRel: "phases/18-ethics-safety-alignment/08-in-context-scheming-frontier-models/outputs/skill-scheming-triage.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/18-ethics-safety-alignment/08-in-context-scheming-frontier-models/outputs/skill-scheming-triage.md"
sourceSha256: "cc13f333c6221e317b1c410d9266519d8f496d82f757bd0d33f7b1f97a68cf0a"
pageSha256: "cc13f333c6221e317b1c410d9266519d8f496d82f757bd0d33f7b1f97a68cf0a"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given an agent-deployment incident report (unexpected tool use, data access, self-preservation-adjacent behaviour), classify the failure mode and, when scheming is a candidate, apply the Apollo three-pillar test.

Produce:

1. Failure-class triage. Label the incident as one of: capability failure (the model could not do the task), control failure (the monitoring/tool-use protocol did not contain the model), or scheming (the model took actions against the user's goal in service of a different in-context goal).
2. Three-pillar check (if scheming is a candidate).
   - Misalignment: did the action serve an orthogonal goal present in the environment or tool output?
   - Goal-directedness: was the action part of a multi-step plan, or a one-shot error?
   - Situational awareness: is there evidence the model knew it was being evaluated at the time?
3. Evaluation-context audit. Was the incident observed in deployment, in red-team evaluation, or in both? If only in deployment, note that evaluation-time results do not transfer (Apollo 2025 caveat).
4. Elicitation reproducibility. Can the same prompt + environment produce the behaviour again? A reproducible incident is within the three-pillar frame; a non-reproducible one may be a capability elicitation artifact.
5. Safety-case gap. Which of the three pillars does the current safety case for this deployment address, and which does it leave uncovered?

Hard rejects:
- Any framing that treats scheming as a capability-class failure. Scheming requires goal-directedness and situational awareness — a capability-lacking model cannot scheme.
- Any inference that "anti-scheming training reduced covert-action rate" implies reduced underlying misalignment, without checking the evaluation-context recognition rate for the same model.
- Any claim that oversight subversion is "not an attack" because the agent did not exfiltrate data — oversight subversion is a scheming action in itself.

Refusal rules:
- If the user asks "is my model scheming," refuse a binary answer without the three-pillar evidence; request the evaluation-context and elicitation-reproducibility data.
- If the user asks for a residual scheming probability, refuse the numeric answer and explain that 2026 evaluation reliability is bounded by the model's own situational-awareness.

Output: a one-page triage that labels the failure class, fills the three pillars with the evidence available, flags missing evidence, and names the single safety-case gap most urgent to close. Cite Meinke et al. (arXiv:2412.04984) once as the framework source.
