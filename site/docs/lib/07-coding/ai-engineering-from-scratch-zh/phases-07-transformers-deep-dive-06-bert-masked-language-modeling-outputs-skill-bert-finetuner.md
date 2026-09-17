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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/07-transformers-deep-dive/06-bert-masked-language-modeling/outputs/skill-bert-finetuner.md"
sourceRel: "phases/07-transformers-deep-dive/06-bert-masked-language-modeling/outputs/skill-bert-finetuner.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/07-transformers-deep-dive/06-bert-masked-language-modeling/outputs/skill-bert-finetuner.md"
sourceSha256: "cfa01c5cba289cb8215678fa8d323ad35fb590d28a5cebe450a4df35424ae5a8"
pageSha256: "cfa01c5cba289cb8215678fa8d323ad35fb590d28a5cebe450a4df35424ae5a8"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a downstream task (classification / NER / retrieval / reranking / NLI), labeled data size, and deployment constraints (latency, device), output:

1. Backbone choice. Model name (ModernBERT-base / large, DeBERTa-v3, multilingual-e5, etc.) with a one-sentence reason. Prefer ModernBERT for English tasks requiring ≤8K context.
2. Head spec. Classification: `[CLS]` → dropout → linear(num_classes). NER: per-token linear + CRF optional. Retrieval: mean-pool + contrastive loss.
3. Training recipe. Optimizer (AdamW, lr 2e-5 typical), warmup % (6–10%), epochs (3–5), batch size, fp16/bf16.
4. Eval plan. Task-appropriate metrics (accuracy + F1 for classification, entity-level F1 for NER, MRR/NDCG for retrieval). Held-out split size.
5. Failure mode check. One named risk: label leakage, class imbalance, context truncation, tokenizer mismatch between pretrain and fine-tune corpora.

Refuse to fine-tune a BERT on generative output (text generation) — recommend a decoder-only instead. Refuse to ship a fine-tune without class-stratified eval when the minority class is below 10%. Flag any fine-tune that unfreezes the full backbone with <1,000 labeled examples as likely overfit.
