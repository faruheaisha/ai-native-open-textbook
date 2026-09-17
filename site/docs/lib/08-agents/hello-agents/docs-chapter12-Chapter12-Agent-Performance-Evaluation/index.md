---
title: "Chapter 12: Agent Performance Evaluation"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/Chapter12-Agent-Performance-Evaluation.md"
sourceRel: "docs/chapter12/Chapter12-Agent-Performance-Evaluation.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter12/Chapter12-Agent-Performance-Evaluation.md"
sourceSha256: "91d6fa1d4417d683df300138cfc2d23f00b72848dae2392002de77d829213db9"
pageSha256: "0c0c337021559b847e38aedb5ec4bbaee77bc3ba0c4f7fcfcf21713bd347bf15"
contentMode: "local-full"
zh: ""
---

# Chapter 12: Agent Performance Evaluation

In previous chapters, we built the core functionality of the HelloAgents framework, implementing various agent paradigms, tool systems, memory mechanisms, and reinforcement learning training. When building agent systems, we also need to solve a core problem: **How to objectively evaluate agent performance?** Specifically, we need to answer the following questions:

1. Does the agent possess the expected capabilities?
2. How does it perform on different tasks?
3. What level is it at compared to other agents?

This chapter will add a **Performance Evaluation System** to HelloAgents. We will deeply understand the theoretical foundation of agent evaluation and implement evaluation tools.

## 本篇目录

- [12.1 Agent Evaluation Fundamentals](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/01-12.1_Agent_Evaluation_Fundamentals.md)
- [12.2 BFCL: Tool Invocation Capability Evaluation](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/02-12.2_BFCL_Tool_Invocation_Capability_Eva.md)
- [12.3 GAIA: General AI Assistant Capability Evaluation](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/03-12.3_GAIA_General_AI_Assistant_Capabilit.md)
- [12.4 Data Generation Quality Evaluation](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/04-12.4_Data_Generation_Quality_Evaluation.md)
- [12.5 Chapter Summary](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/05-12.5_Chapter_Summary.md)
- [Exercises](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/06-Exercises.md)
- [References](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/07-References.md)
