---
title: "Chapter 10: Agent Communication Protocols"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/Chapter10-Agent-Communication-Protocols.md"
sourceRel: "docs/chapter10/Chapter10-Agent-Communication-Protocols.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter10/Chapter10-Agent-Communication-Protocols.md"
sourceSha256: "906d156d7d993b2e79d7015a1a6fc304b7a9307ae202c3745a68111976f1a315"
pageSha256: "9c3fce4bf4e7598f7833b7bdc683932bbe1ecb5a4966aabd141e2f0adfaff3cc"
contentMode: "local-full"
zh: ""
---

# Chapter 10: Agent Communication Protocols

In previous chapters, we built fully functional standalone agents with reasoning, tool invocation, and memory capabilities. However, when attempting to build more complex AI systems, natural questions arise: **How can agents efficiently interact with the external world? How can multiple agents collaborate with each other?**

This is precisely the core problem that agent communication protocols aim to solve. This chapter will introduce three communication protocols to the HelloAgents framework: **MCP (Model Context Protocol)** for standardized communication between agents and tools, **A2A (Agent-to-Agent Protocol)** for peer-to-peer collaboration between agents, and **ANP (Agent Network Protocol)** for building large-scale agent networks. These three protocols together form the infrastructure layer for agent communication.

Through this chapter's learning, you will master the design philosophy and practical skills of agent communication protocols, understand the design differences between three mainstream protocols, and learn how to choose appropriate protocols to solve practical problems.

## 本篇目录

- [10.1 Agent Communication Protocol Fundamentals](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/01-10.1_Agent_Communication_Protocol_Fundam.md)
- [10.2 MCP Protocol in Practice](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/02-10.2_MCP_Protocol_in_Practice.md)
- [10.3 A2A Protocol in Practice](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/03-10.3_A2A_Protocol_in_Practice.md)
- [10.4 ANP Protocol in Practice](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/04-10.4_ANP_Protocol_in_Practice.md)
- [10.5 Building Custom MCP Servers](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/05-10.5_Building_Custom_MCP_Servers.md)
- [10.6 Chapter Summary](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/06-10.6_Chapter_Summary.md)
- [Exercises](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/07-Exercises.md)
- [References](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/08-References.md)
