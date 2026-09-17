---
title: "Chapter 8 Memory and Retrieval"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/Chapter8-Memory-and-Retrieval.md"
sourceRel: "docs/chapter8/Chapter8-Memory-and-Retrieval.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter8/Chapter8-Memory-and-Retrieval.md"
sourceSha256: "33b062e56895ab0d9e523d94ac73e6243e6123e429d06eede3cc21944a485db0"
pageSha256: "acf44d66cbf262fe85455301ef97894e6dbbfb4b629551a98f86ca19fc13ad4f"
contentMode: "local-full"
zh: ""
---

# Chapter 8 Memory and Retrieval

In previous chapters, we built the basic architecture of the HelloAgents framework, implementing various agent paradigms and tool systems. However, our framework still lacks a critical capability: **memory**. If an agent cannot remember previous interactions or learn from historical experiences, its performance will be greatly limited in continuous conversations or complex tasks.

This chapter will add two core capabilities to HelloAgents based on the framework built in Chapter 7: **Memory System** and **Retrieval-Augmented Generation (RAG)**. We will adopt a "framework extension + knowledge popularization" approach, deeply understanding the theoretical foundations of Memory and RAG during the construction process, and ultimately implementing an agent system with complete memory and knowledge retrieval capabilities.

## 本篇目录

- [8.1 From Cognitive Science to Agent Memory](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/01-8.1_From_Cognitive_Science_to_Agent_Memo.md)
- [8.2 Memory System: Giving Agents Memory](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/02-8.2_Memory_System_Giving_Agents_Memory.md)
- [8.3 RAG System: Knowledge Retrieval Enhancement](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/03-8.3_RAG_System_Knowledge_Retrieval_Enhan.md)
- [8.4 Building an Intelligent Document Q&A Assistant](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/04-8.4_Building_an_Intelligent_Document_Q_A.md)
- [8.5 Chapter Summary and Outlook](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/05-8.5_Chapter_Summary_and_Outlook.md)
- [Exercises](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/06-Exercises.md)
- [References](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/07-References.md)
