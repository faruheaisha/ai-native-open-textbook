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
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-3/ai-advanced/rag-introduction/index.md"
sourceRel: "docs/zh-tw/stage-3/ai-advanced/rag-introduction/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-tw/stage-3/ai-advanced/rag-introduction/index.md"
sourceSha256: "e6ca06cb90ae67976b6aab1ad7426bbdc915b9f53a3ee78e55c259e106537180"
pageSha256: "5f967b3ac70fe36b9c4bc1c007ea08d37259f5efb0de74b90c4cab4ff123c766"
contentMode: "local-full"
zh: ""
---

隨著大型語言模型（LLM）被廣泛採用，企業面臨一個非常實際的問題：當模型的問題依賴於內部文件、即時資料或特定領域知識時，如何讓模型準確地回答這些問題？畢竟，模型的訓練資料是有限的、有時間邊界的，不可能涵蓋企業特定的業務知識或持續更新的資訊。

一個直覺的想法是：既然上下文視窗（context window）越來越大，從 8K 到 128K，現在甚至超過一百萬 token，為什麼不直接把相關文件塞進提示詞裡，讓模型從這些素材中直接回答？

然而，能夠處理長上下文，和能夠在企業場景中穩定、高效、可控地提供正確答案，是完全不同的兩回事。盲目依賴長上下文會帶來一系列嚴峻的挑戰，包括成本爆炸、注意力稀釋和知識更新不及時。

為了解決這些痛點，一種稱為檢索增強生成（Retrieval-Augmented Generation，簡稱 RAG）的技術應運而生。在模型生成答案之前，RAG 先檢索精確的外部知識。與單純以暴力方式擴展上下文長度相比，RAG 以更低的成本、更高的準確性和更強的可控性滿足了企業對事實準確性和知識新鮮度的要求。因此，它已成為建構可信 AI 應用的關鍵基礎。

在本教學中，我們將系統性地講解 RAG 是什麼，追溯其出現的背景和核心原理，然後探討它從基礎形式到進階形式的演進，以及未來可能的發展方向。

## 本篇目录

- [本課你將學到什麼](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-3/ai-advanced/rag-introduction/01-本課你將學到什麼.md)
- [本課你將獲得什麼](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-3/ai-advanced/rag-introduction/02-本課你將獲得什麼.md)
- [1. 為什麼需要 RAG](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-3/ai-advanced/rag-introduction/03-1._為什麼需要_RAG.md)
- [2. RAG 是什麼](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-3/ai-advanced/rag-introduction/04-2._RAG_是什麼.md)
- [3. RAG 的運作原理](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-3/ai-advanced/rag-introduction/05-3._RAG_的運作原理.md)
- [4. RAG 的演進](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-3/ai-advanced/rag-introduction/06-4._RAG_的演進.md)
- [5. 從 Demo 到企業級 RAG](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-3/ai-advanced/rag-introduction/07-5._從_Demo_到企業級_RAG.md)
- [6. 深入探索：從競賽和開放教學中學習（選修）](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-3/ai-advanced/rag-introduction/08-6._深入探索_從競賽和開放教學中學習_選修.md)
- [7. 廣泛探索：RAG 的未來演進（選修）](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-3/ai-advanced/rag-introduction/09-7._廣泛探索_RAG_的未來演進_選修.md)
- [總結](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-3/ai-advanced/rag-introduction/10-總結.md)
- [參考資料](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-3/ai-advanced/rag-introduction/11-參考資料.md)
