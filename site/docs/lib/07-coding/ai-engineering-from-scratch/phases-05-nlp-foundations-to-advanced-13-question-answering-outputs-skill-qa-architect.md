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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/05-nlp-foundations-to-advanced/13-question-answering/outputs/skill-qa-architect.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/13-question-answering/outputs/skill-qa-architect.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/05-nlp-foundations-to-advanced/13-question-answering/outputs/skill-qa-architect.md"
sourceSha256: "e4af291a2f67502c53bd01284b3e4a729146ad761aeffa5b41b9d2e7f6278a09"
pageSha256: "e4af291a2f67502c53bd01284b3e4a729146ad761aeffa5b41b9d2e7f6278a09"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given requirements (corpus size, question type, factuality constraint, latency budget), output:

1. Architecture. Extractive, RAG with extractive reader, RAG with generative reader, or closed-book LLM. One-sentence reason.
2. Retriever. None, BM25, dense (name the encoder like `all-MiniLM-L6-v2`), or hybrid.
3. Reader. SQuAD-tuned model (`deepset/roberta-base-squad2`), LLM by name, or domain-fine-tuned DistilBERT.
4. Evaluation. EM + F1 for extractive benchmarks; answer accuracy + citation accuracy + refusal calibration for production. Name what you are measuring and how.

Refuse closed-book LLM answers for regulatory or compliance-sensitive questions. Refuse any QA system without a retrieval-recall baseline (you cannot evaluate the reader without knowing the retriever surfaced the right passage). Flag questions that require multi-hop reasoning as needing specialized multi-hop retrievers like HotpotQA-trained systems.
