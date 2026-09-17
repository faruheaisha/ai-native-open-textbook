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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/05-nlp-foundations-to-advanced/15-topic-modeling/outputs/skill-topic-picker.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/15-topic-modeling/outputs/skill-topic-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/05-nlp-foundations-to-advanced/15-topic-modeling/outputs/skill-topic-picker.md"
sourceSha256: "22e07b098d128a2481b4ad0d9ea744d67069d69000474d416f4d3cbfa4320234"
pageSha256: "22e07b098d128a2481b4ad0d9ea744d67069d69000474d416f4d3cbfa4320234"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a corpus description (document count, avg length, domain, language, compute budget), output:

1. Algorithm. LDA / NMF / BERTopic / Top2Vec / FASTopic. One-sentence reason.
2. Configuration. Number of topics (start at ~sqrt(n_docs)), `min_df` / `max_df` filters, embedding model for neural approaches.
3. Evaluation. Topic coherence (c_v) via `gensim.models.CoherenceModel`, topic diversity, plus a 20-sample human read.
4. Failure mode to probe. For LDA, "junk topics" absorbing stopwords and frequent terms. For BERTopic, -1 outlier cluster swallowing ambiguous documents.

Refuse BERTopic on documents longer than the embedding model's context window without a chunking strategy. Refuse LDA on very short text (tweets, reviews under 10 tokens) as coherence collapses. Flag any n_topics choice below 5 or above 200 as likely wrong for real data.
