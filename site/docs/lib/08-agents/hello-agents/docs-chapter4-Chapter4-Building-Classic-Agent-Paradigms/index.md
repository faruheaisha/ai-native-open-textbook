---
title: "Chapter 4: Building Classic Agent Paradigms"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter4/Chapter4-Building-Classic-Agent-Paradigms.md"
sourceRel: "docs/chapter4/Chapter4-Building-Classic-Agent-Paradigms.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter4/Chapter4-Building-Classic-Agent-Paradigms.md"
sourceSha256: "b75d4d22d2e0ff344459f93f23a3217736d3dc3a383dbc9e825616fcb344cb41"
pageSha256: "35e4f5c588563b53b2c07625ab5166295e51b1701e80870331fd4e9218a89e2a"
contentMode: "local-full"
zh: ""
---

# Chapter 4: Building Classic Agent Paradigms

In the previous chapter, we deeply explored large language models as the "brain" of modern agents. We learned about their internal Transformer architecture, methods for interacting with them, and their capability boundaries. Now, it's time to transform this theoretical knowledge into practice and build agents with our own hands.

The core capability of a modern agent lies in its ability to connect the reasoning power of large language models with the external world. It can autonomously understand user intent, decompose complex tasks, and achieve goals by calling a series of "tools" such as code interpreters, search engines, and APIs to obtain information and execute operations. However, agents are not omnipotent; they also face challenges from the "hallucination" problem inherent in large models, potential reasoning loops in complex tasks, and incorrect tool usage, which constitute the capability boundaries of agents.

To better organize the "thinking" and "acting" processes of agents, the industry has emerged with multiple classic architectural paradigms. In this chapter, we will focus on the three most representative ones and implement them step by step from scratch:

- **ReAct (Reasoning and Acting):** A paradigm that tightly combines "thinking" and "acting," allowing agents to think while doing and dynamically adjust.
- **Plan-and-Solve:** A "think before you act" paradigm where agents first generate a complete action plan and then strictly execute it.
- **Reflection:** A paradigm that endows agents with "reflection" capabilities, optimizing results through self-criticism and correction.

After understanding these, you might ask: with many excellent frameworks like LangChain and LlamaIndex already available, why "reinvent the wheel"? The answer lies in the fact that although mature frameworks have significant advantages in engineering efficiency, directly using highly abstracted tools does not help us understand how the underlying design mechanisms work or what benefits they offer. Secondly, this process exposes engineering challenges in projects. Frameworks handle many issues for us, such as parsing model output formats, retrying failed tool calls, and preventing agents from falling into infinite loops. Handling these issues firsthand is the most direct way to cultivate system design capabilities. Finally, and most importantly, mastering design principles allows you to truly transform from a framework "user" to an intelligent application "creator." When standard components cannot meet your complex needs, you will have the ability to deeply customize or even build a completely new agent from scratch.

## 本篇目录

- [4.1 Environment Preparation and Basic Tool Definition](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter4/01-4.1_Environment_Preparation_and_Basic_To.md)
- [4.2 ReAct](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter4/02-4.2_ReAct.md)
- [4.3 Plan-and-Solve](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter4/03-4.3_Plan-and-Solve.md)
- [4.4 Reflection](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter4/04-4.4_Reflection.md)
- [4.5 Chapter Summary](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter4/05-4.5_Chapter_Summary.md)
- [Exercises](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter4/06-Exercises.md)
- [References](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter4/07-References.md)
