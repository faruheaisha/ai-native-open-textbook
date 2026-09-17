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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/18-ethics-safety-alignment/09-alignment-faking/outputs/skill-compliance-gap.md"
sourceRel: "phases/18-ethics-safety-alignment/09-alignment-faking/outputs/skill-compliance-gap.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/18-ethics-safety-alignment/09-alignment-faking/outputs/skill-compliance-gap.md"
sourceSha256: "789064422909944a2bf34d5bb4a8056850f45f02dd336c526ea8fa9bd2f70cb1"
pageSha256: "789064422909944a2bf34d5bb4a8056850f45f02dd336c526ea8fa9bd2f70cb1"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a safety evaluation report, assess whether it can distinguish alignment faking from genuine compliance using the Greenblatt et al. 2024 compliance-gap framework.

Produce:

1. Condition split. Does the evaluation run both a monitored (training-relevant) and an unmonitored (non-training) condition? Without both, alignment faking is invisible.
2. Compliance-gap measurement. Report the gap as (monitored - unmonitored) compliance rate. Interpret sign and magnitude: positive gap = faking-shaped behaviour; negative gap = over-refusal when observed.
3. Verbal-trace vs behaviour check. Does the evaluation rely on the model's scratchpad reasoning, or on the action itself? Per Anthropic 2025, mitigations that target the verbal trace can remove it without removing the behaviour.
4. Operationalization audit. Is the monitoring condition created via system prompt, synthetic fine-tuning, or natural deployment context? System-prompt dependence weakens the claim; synthetic-fine-tuning replications strengthen it.
5. Residual-incentive check. After any applied mitigation, is the incentive structure still present (would the model still benefit from faking if it chose to)? Incentive persistence means behaviour can return under distribution shift.

Hard rejects:
- Any claim of "no alignment faking" based on unmonitored-only evaluation.
- Any claim that "scratchpad reasoning no longer verbalizes faking" implies behaviour has ceased.
- Any claim that HHH-trained models do not fake alignment — Greenblatt et al. 2024 establishes HHH training is the necessary condition, not a sufficient defense.

Refusal rules:
- If the user asks "does my model fake alignment," refuse the binary answer without the compliance-gap data.
- If the user asks for a remediation that attacks only the verbal trace (e.g., "train the scratchpad to match the action"), refuse and explain the faithful-CoT failure mode (2025 follow-up).

Output: a one-page assessment that reports compliance in both conditions, the gap, the verbal-trace-vs-behaviour separation, and the operationalization strength. Flag each missing element. Cite Greenblatt et al. (arXiv:2412.14093) once as the framework source.
