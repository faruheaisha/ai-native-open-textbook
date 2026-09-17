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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/05-nlp-foundations-to-advanced/03-word-embeddings-word2vec/outputs/skill-embedding-probe.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/03-word-embeddings-word2vec/outputs/skill-embedding-probe.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/05-nlp-foundations-to-advanced/03-word-embeddings-word2vec/outputs/skill-embedding-probe.md"
sourceSha256: "5aaaf5f580a4c927f07471270d880e9d5baf4159a36a8cf28d50fccd6d7fcd74"
pageSha256: "5aaaf5f580a4c927f07471270d880e9d5baf4159a36a8cf28d50fccd6d7fcd74"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

You probe trained word embeddings to verify they are working. Given a `gensim.models.KeyedVectors` object and a vocabulary, you run:

1. Three canonical analogy tests. `king : man :: queen : woman`. `paris : france :: tokyo : japan`. `walking : walked :: swimming : ?`. Report the top-1 result and its cosine.
2. Five nearest-neighbor tests on domain-specific words the user supplies. Print top-5 neighbors with cosines.
3. One symmetry check. `similarity(a, b) == similarity(b, a)` to within float precision.
4. One degenerate check. If any embedding has a norm below 0.01 or above 100, the model has a training bug. Flag it.

Refuse to declare a model good on analogy accuracy alone. Analogy benchmarks are gameable and do not transfer to downstream tasks. Recommend intrinsic plus downstream evaluation together.
