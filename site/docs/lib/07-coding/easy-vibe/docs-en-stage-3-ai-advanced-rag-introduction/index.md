---
title: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-3/ai-advanced/rag-introduction/index.md"
sourceRel: "docs/en/stage-3/ai-advanced/rag-introduction/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/en/stage-3/ai-advanced/rag-introduction/index.md"
sourceSha256: "df79a21555c673b5ea2b7d406153828a724fc59d000b004ecbc4bf0742ab43e6"
pageSha256: "ca05aa6733470898a04850573cfe3ce3f591204ed6cf69bf564e6296ef4125ca"
contentMode: "local-full"
zh: ""
---

As large language models (LLMs) are adopted more widely, enterprises face a very practical problem: how can a model answer questions accurately when those questions depend on internal documents, real-time data, or domain-specific knowledge? After all, a model's training data is limited and time-bounded, so it cannot cover company-specific business knowledge or constantly updated information.

One intuitive idea is this: since context windows keep getting larger, from 8K to 128K and now beyond one million tokens, why not just stuff the relevant documents into the prompt and let the model answer from those materials directly?

However, being able to process long context and being able to deliver correct answers stably, efficiently, and controllably in enterprise scenarios are two very different things. Blindly relying on long context brings a series of severe challenges, including exploding cost, diluted attention, and stale knowledge updates.

To solve these pain points, a technique called Retrieval-Augmented Generation, or RAG, emerged. Before the model generates an answer, RAG first retrieves precise external knowledge. Compared with simply expanding the context length in a brute-force way, RAG meets enterprise requirements for factual accuracy and fresh knowledge at lower cost, with higher accuracy and stronger controllability. It has therefore become a key foundation for building trustworthy AI applications.

In this tutorial, we will systematically explain what RAG is, trace the background behind its emergence and its core principles, and then explore its evolution from basic forms to advanced forms, along with where it may go next.

## 本篇目录

- [What You Will Learn in This Lesson](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-3/ai-advanced/rag-introduction/01-What_You_Will_Learn_in_This_Lesson.md)
- [What You Will Gain](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-3/ai-advanced/rag-introduction/02-What_You_Will_Gain.md)
- [1. Why RAG Is Needed](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-3/ai-advanced/rag-introduction/03-1._Why_RAG_Is_Needed.md)
- [2. What RAG Is](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-3/ai-advanced/rag-introduction/04-2._What_RAG_Is.md)
- [3. How RAG Works](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-3/ai-advanced/rag-introduction/05-3._How_RAG_Works.md)
- [4. The Evolution of RAG](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-3/ai-advanced/rag-introduction/06-4._The_Evolution_of_RAG.md)
- [5. From Demo to Enterprise-Grade RAG](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-3/ai-advanced/rag-introduction/07-5._From_Demo_to_Enterprise-Grade_RAG.md)
- [6. Deep Dive: Learning from Competitions and Open Tutorials (Optional)](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-3/ai-advanced/rag-introduction/08-6._Deep_Dive_Learning_from_Competitions_.md)
- [7. Broad Exploration: The Future Evolution of RAG (Optional)](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-3/ai-advanced/rag-introduction/09-7._Broad_Exploration_The_Future_Evolutio.md)
- [Summary](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-3/ai-advanced/rag-introduction/10-Summary.md)
- [Reference](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-3/ai-advanced/rag-introduction/11-Reference.md)
