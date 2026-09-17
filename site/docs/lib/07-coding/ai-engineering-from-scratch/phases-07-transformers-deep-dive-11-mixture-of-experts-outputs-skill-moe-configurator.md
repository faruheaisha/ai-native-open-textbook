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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/07-transformers-deep-dive/11-mixture-of-experts/outputs/skill-moe-configurator.md"
sourceRel: "phases/07-transformers-deep-dive/11-mixture-of-experts/outputs/skill-moe-configurator.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/07-transformers-deep-dive/11-mixture-of-experts/outputs/skill-moe-configurator.md"
sourceSha256: "a25624720adbc811af45b40e59a2b88d67c13786aaa41cde5b38573136e839f3"
pageSha256: "a25624720adbc811af45b40e59a2b88d67c13786aaa41cde5b38573136e839f3"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a transformer spec (total parameter budget, desired active params per token, training tokens available, inference hardware), output:

1. MoE layout. `n_experts`, `top_k`, `n_shared`. Pick fine-grained (256+ experts, top-8) for frontier scales; classic (8 experts, top-2) for smaller. One-sentence reason.
2. Balancing strategy. Auxiliary-loss-free (DeepSeek-V3, default), Switch-style auxiliary loss, or expert-capacity + token drop. Name the `γ` value if aux-loss-free.
3. Expert parallelism plan. How to shard experts across GPUs given VRAM. State per-expert VRAM cost and total fleet size.
4. Routing precision. fp32 router scores vs fp16. Router precision matters at scale.
5. Failure mode check. Named risk: router collapse, expert starvation, all-to-all network bottleneck, inference latency from routing overhead, checkpoint memory footprint.

Refuse to recommend MoE for active-parameter counts below 4B — dense wins at matched compute. Refuse auxiliary-loss-only balancing for new projects in 2026 (aux-loss-free is the default). Refuse to ship an MoE without an expert-parallel plan if total params exceed 80 GB. Flag MoE for latency-critical single-user paths as likely slower than dense equivalents.
