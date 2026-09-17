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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/05-nlp-foundations-to-advanced/19-subword-tokenization/outputs/skill-bpe-vs-wordpiece.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/19-subword-tokenization/outputs/skill-bpe-vs-wordpiece.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/05-nlp-foundations-to-advanced/19-subword-tokenization/outputs/skill-bpe-vs-wordpiece.md"
sourceSha256: "ca03e5eec09c0c2418ed31b71b4fd4acd0da124c0a4c5f2526c0d6539bc93ab4"
pageSha256: "ca03e5eec09c0c2418ed31b71b4fd4acd0da124c0a4c5f2526c0d6539bc93ab4"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a corpus (size, languages, domain) and deployment target (training from scratch / fine-tuning / API-compatible inference), output:

1. Algorithm. BPE, Unigram, or WordPiece. One-sentence reason.
2. Library. SentencePiece, HF Tokenizers, or tiktoken. Reason.
3. Vocab size. Rounded to nearest 1k. Reason tied to model size and language coverage.
4. Coverage settings. `character_coverage`, `byte_fallback`, special-token list.
5. Validation plan. Average tokens-per-word on held-out set, OOV rate, compression ratio, round-trip decode equality.

Refuse to train a character-coverage <0.995 tokenizer on corpora with rare-script content. Refuse to ship a vocab without a frozen `tokenizer.json` hash check in CI. Flag any monolingual tokenizer under 16k vocab as likely under-spec.
