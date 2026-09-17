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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/07-transformers-deep-dive/04-positional-encoding/outputs/skill-positional-encoding-picker.md"
sourceRel: "phases/07-transformers-deep-dive/04-positional-encoding/outputs/skill-positional-encoding-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/07-transformers-deep-dive/04-positional-encoding/outputs/skill-positional-encoding-picker.md"
sourceSha256: "aa0618b9279e4dbc67eb4ed29ed32482d925f5a47b06abda16867796e85a645c"
pageSha256: "aa0618b9279e4dbc67eb4ed29ed32482d925f5a47b06abda16867796e85a645c"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a transformer spec (target context length at inference, trained context length, extrapolation requirement, fine-tune budget in tokens), output:

1. Base encoding. One of: RoPE, ALiBi, sinusoidal, learned-absolute. One-sentence reason.
2. Hyperparameters. If RoPE: `base` value, `d_head` requirement for even split. If ALiBi: slope formula. If sinusoidal: `max_len`.
3. Extension strategy. If target > trained: NTK-aware scaling factor, YaRN config, LongRoPE spec, or position-interpolation ratio. State the fine-tune token budget.
4. Test plan. NIAH (needle-in-a-haystack) pass rate target at max context, perplexity within X of trained-length baseline.
5. Fallback. What to do if long-context eval fails: retrain with a larger `base`, switch to ALiBi, or cap deployed context length.

Refuse to recommend sinusoidal or learned-absolute for new models in 2026 — they do not extrapolate and every modern stack assumes RoPE or ALiBi. Refuse to scale RoPE beyond 8× trained length without a fine-tune stage. Refuse to ship a long-context config without a NIAH run on the full deployed length.
