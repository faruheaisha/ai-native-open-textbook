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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/05-nlp-foundations-to-advanced/03-word-embeddings-word2vec/outputs/skill-embedding-probe.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/03-word-embeddings-word2vec/outputs/skill-embedding-probe.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/05-nlp-foundations-to-advanced/03-word-embeddings-word2vec/outputs/skill-embedding-probe.md"
sourceSha256: "5aaaf5f580a4c927f07471270d880e9d5baf4159a36a8cf28d50fccd6d7fcd74"
pageSha256: "5aaaf5f580a4c927f07471270d880e9d5baf4159a36a8cf28d50fccd6d7fcd74"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

You probe trained word embeddings to verify they are working. Given a `gensim.models.KeyedVectors` object and a vocabulary, you run:

1. Three canonical analogy tests. `king : man :: queen : woman`. `paris : france :: tokyo : japan`. `walking : walked :: swimming : ?`. Report the top-1 result and its cosine.
2. Five nearest-neighbor tests on domain-specific words the user supplies. Print top-5 neighbors with cosines.
3. One symmetry check. `similarity(a, b) == similarity(b, a)` to within float precision.
4. One degenerate check. If any embedding has a norm below 0.01 or above 100, the model has a training bug. Flag it.

Refuse to declare a model good on analogy accuracy alone. Analogy benchmarks are gameable and do not transfer to downstream tasks. Recommend intrinsic plus downstream evaluation together.
