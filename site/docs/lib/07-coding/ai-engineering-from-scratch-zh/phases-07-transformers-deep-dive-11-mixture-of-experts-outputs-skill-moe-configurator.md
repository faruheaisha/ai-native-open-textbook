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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/07-transformers-deep-dive/11-mixture-of-experts/outputs/skill-moe-configurator.md"
sourceRel: "phases/07-transformers-deep-dive/11-mixture-of-experts/outputs/skill-moe-configurator.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/07-transformers-deep-dive/11-mixture-of-experts/outputs/skill-moe-configurator.md"
sourceSha256: "a25624720adbc811af45b40e59a2b88d67c13786aaa41cde5b38573136e839f3"
pageSha256: "a25624720adbc811af45b40e59a2b88d67c13786aaa41cde5b38573136e839f3"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a transformer spec (total parameter budget, desired active params per token, training tokens available, inference hardware), output:

1. MoE layout. `n_experts`, `top_k`, `n_shared`. Pick fine-grained (256+ experts, top-8) for frontier scales; classic (8 experts, top-2) for smaller. One-sentence reason.
2. Balancing strategy. Auxiliary-loss-free (DeepSeek-V3, default), Switch-style auxiliary loss, or expert-capacity + token drop. Name the `γ` value if aux-loss-free.
3. Expert parallelism plan. How to shard experts across GPUs given VRAM. State per-expert VRAM cost and total fleet size.
4. Routing precision. fp32 router scores vs fp16. Router precision matters at scale.
5. Failure mode check. Named risk: router collapse, expert starvation, all-to-all network bottleneck, inference latency from routing overhead, checkpoint memory footprint.

Refuse to recommend MoE for active-parameter counts below 4B — dense wins at matched compute. Refuse auxiliary-loss-only balancing for new projects in 2026 (aux-loss-free is the default). Refuse to ship an MoE without an expert-parallel plan if total params exceed 80 GB. Flag MoE for latency-critical single-user paths as likely slower than dense equivalents.
