---
title: "Chapter 14: Automated Deep Research Agent"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/Chapter14-Automated-Deep-Research-Agent.md"
sourceRel: "docs/chapter14/Chapter14-Automated-Deep-Research-Agent.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter14/Chapter14-Automated-Deep-Research-Agent.md"
sourceSha256: "69c66a8daee49bc3f6055be8ecb7cc9df07ae8e7ad146179085d62bb19d7d4f9"
pageSha256: "de7e3896a2e025fea5629543310ffa584eb780e2a65be007b61ae06332409a57"
contentMode: "local-full"
zh: ""
---

# Chapter 14: Automated Deep Research Agent

In Chapter 13's travel assistant project, we experienced how to apply HelloAgents to a multi-agent product. In this chapter, we continue forward, focusing on **knowledge-intensive applications**: **building an agent assistant that can automatically execute deep research tasks.**

Compared to travel planning, the difficulty of deep research lies in the continuous divergence of information, rapid updates of facts, and users' high requirements for citation sources. To deliver trustworthy research reports, we need to equip agents with three core capabilities:

**(1) Problem Analysis**: Decompose users' open topics into retrievable query statements.

**(2) Multi-Round Information Collection**: Continuously mine materials by combining different search APIs and deduplicate and integrate them.

**(3) Reflection and Summarization**: Identify knowledge gaps based on stage results, decide whether to continue retrieval, and generate structured summaries.

## 本篇目录

- [14.1 Project Overview and Architecture Design](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/01-14.1_Project_Overview_and_Architecture_D.md)
- [14.2 TODO-Driven Research Paradigm](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/02-14.2_TODO-Driven_Research_Paradigm.md)
- [14.3 Agent System Design](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/03-14.3_Agent_System_Design.md)
- [14.4 Tool System Integration](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/04-14.4_Tool_System_Integration.md)
- [14.5 Service Layer Implementation](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/05-14.5_Service_Layer_Implementation.md)
- [References](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/06-References.md)
- [14.6 Front-End Interaction Design](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/07-14.6_Front-End_Interaction_Design.md)
- [14.7 Chapter Summary](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/08-14.7_Chapter_Summary.md)
