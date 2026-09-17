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
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/ai-advanced/rag-introduction/index.md"
sourceRel: "docs/zh-cn/stage-3/ai-advanced/rag-introduction/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-cn/stage-3/ai-advanced/rag-introduction/index.md"
sourceSha256: "3374495fc161f1a4377a1de2c3de259bafde71bce7ca5c464aa98975b8f0f97f"
pageSha256: "ae35c6205c2cd404dc67310d2743e5e23b30dd564feafcd96d1440760d9bf4bc"
contentMode: "local-full"
zh: ""
---

随着大型语言模型（LLM）的广泛应用，企业面临一个现实问题：如何让模型准确回答基于内部文档、实时数据或专业知识的问题？毕竟，模型的训练数据有限且存在时效性，无法覆盖企业特有的业务知识和不断更新的信息。

一个直观的解决思路是：既然模型的上下文窗口正不断扩大，从8K、128K到如今突破百万token，那何不直接将相关文档塞进提示词，让模型基于这些材料生成答案？

然而，能够处理长上下文与能在企业级场景中稳定、高效、可控地交付正确答案是截然不同的两件事。盲目依赖长上下文会带来成本飙升、注意力分散、知识更新滞后等一系列严峻挑战。

正是为了解决这些痛点，一种名为检索增强生成（RAG）的技术应运而生。RAG让大模型在生成答案前先精准检索外部知识，相比简单粗暴地扩展上下文长度，它以更低成本、更高准确性和更强可控性，满足企业级应用对事实准确与知识鲜活的严苛要求，成为构建可信AI应用的关键基石。

在本篇教程中，我们将系统介绍什么是RAG，追溯其诞生的背景与核心原理，并深入探讨其从基础到进阶的演化路径，以及未来的发展方向。

## 本篇目录

- [本节课你将学到](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/ai-advanced/rag-introduction/01-本节课你将学到.md)
- [本节课你将收获](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/ai-advanced/rag-introduction/02-本节课你将收获.md)
- [1. 为什么需要 RAG](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/ai-advanced/rag-introduction/03-1._为什么需要_RAG.md)
- [2. 什么是 RAG](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/ai-advanced/rag-introduction/04-2._什么是_RAG.md)
- [3. RAG 如何工作](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/ai-advanced/rag-introduction/05-3._RAG_如何工作.md)
- [4. RAG 技术演进史](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/ai-advanced/rag-introduction/06-4._RAG_技术演进史.md)
- [5. 从 Demo 到企业级的 RAG 系统](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/ai-advanced/rag-introduction/07-5._从_Demo_到企业级的_RAG_系统.md)
- [6. 深度研究：从比赛与开源教程中学习（Optional）](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/ai-advanced/rag-introduction/08-6._深度研究_从比赛与开源教程中学习_Optional.md)
- [7. 广度探索：RAG 的未来演化（Optional）](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/ai-advanced/rag-introduction/09-7._广度探索_RAG_的未来演化_Optional.md)
- [总结](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/ai-advanced/rag-introduction/10-总结.md)
- [Reference](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/ai-advanced/rag-introduction/11-Reference.md)
