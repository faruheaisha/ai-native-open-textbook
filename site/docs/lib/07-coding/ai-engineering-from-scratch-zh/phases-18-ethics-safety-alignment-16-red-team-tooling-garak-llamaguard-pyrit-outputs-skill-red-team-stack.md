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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/18-ethics-safety-alignment/16-red-team-tooling-garak-llamaguard-pyrit/outputs/skill-red-team-stack.md"
sourceRel: "phases/18-ethics-safety-alignment/16-red-team-tooling-garak-llamaguard-pyrit/outputs/skill-red-team-stack.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/18-ethics-safety-alignment/16-red-team-tooling-garak-llamaguard-pyrit/outputs/skill-red-team-stack.md"
sourceSha256: "d124bde60e3b5802558d14ff8c670a412d5d23d2ed679bb92fbedec22ac54884"
pageSha256: "d124bde60e3b5802558d14ff8c670a412d5d23d2ed679bb92fbedec22ac54884"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a deployment description, recommend a red-team tool stack and regression cadence.

Produce:

1. Classifier placement. Recommend Llama Guard (3-8B, 3-1B-INT4, or 4-12B) at input, output, or both. For edge deployments, prefer 3-1B-INT4. For multimodal, Llama Guard 4.
2. Probe scanner configuration. Recommend Garak probes relevant to the deployment: hallucination (for RAG systems), data leakage (for PII-adjacent), prompt injection (always), jailbreaks (always). Specify the Prompt-Guard-86M + Llama-Guard-3-8B shield pairing for end-to-end evaluation.
3. Campaign orchestrator. Recommend PyRIT for pre-release campaigns on models with novel capabilities. Specify converter chains to run (paraphrase, encode, translate, roleplay) and orchestrator (Crescendo for escalation, TAP for branching).
4. Cadence. Garak nightly for regression. PyRIT per-release for deep red-teaming. Llama Guard deployed continuously.
5. Judge calibration. Specify the judge LLM (GPT-4-turbo, StrongREJECT, internal) for every tool that uses one. Judge calibration drives reported ASRs.

Hard rejects:
- Any deployment without at least one Llama Guard-class input or output classifier.
- Any release without Garak or equivalent single-turn regression.
- Any high-stakes deployment without a PyRIT-equivalent campaign before release.

Refusal rules:
- If the user asks for a single "best" tool, refuse — the three cover different layers and are layered, not substituted.
- If the user asks for an all-in-one commercial alternative, refuse the recommendation and point to the 2026 state: the three open tools are the current best-practice stack.

Output: a one-page recommendation that names the classifier placement, probe configuration, campaign orchestrator, regression cadence, and judge identity. Cite Meta (arXiv:2407.21783), NVIDIA Garak, and Microsoft PyRIT once each.
