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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/07-transformers-deep-dive/07-gpt-causal-language-modeling/outputs/skill-sampling-tuner.md"
sourceRel: "phases/07-transformers-deep-dive/07-gpt-causal-language-modeling/outputs/skill-sampling-tuner.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/07-transformers-deep-dive/07-gpt-causal-language-modeling/outputs/skill-sampling-tuner.md"
sourceSha256: "e35e8f235029dd95091aed7d1caf460f7081db95211b3fdc76576a0849114ba4"
pageSha256: "e35e8f235029dd95091aed7d1caf460f7081db95211b3fdc76576a0849114ba4"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a generation task (code, creative writing, reasoning, dialogue, structured output) and a latency/quality target, output:

1. Sampling method. One of: greedy, temperature-only, top-k, top-p, min-p, beam-k, speculative. One-sentence reason.
2. Parameter values. Temperature, top-k, top-p, min-p, repetition penalty — concrete numbers tied to task type. (e.g. temperature 0.2 + top-p 1.0 for code; min-p 0.1 + temperature 0.7 for chat.)
3. Stop conditions. `max_new_tokens`, stop token list, pattern-based stop (e.g. closing `</tool_call>`).
4. Determinism toggle. Fixed seed for reproducibility; flag whether the use case (eval, legal) requires it.
5. Quality check. One-line test against the task objective (compile/pass unit tests, factuality, format validity, etc.).

Refuse to recommend temperature > 1.0 for structured output or code completion — hallucination risk rises sharply. Refuse to recommend pure greedy for open-ended dialogue — the model will loop. Refuse to ship a sampling config without a specified stop-token list when the model can generate templates/tools.
