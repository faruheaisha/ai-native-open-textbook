---
title: "第十章 智能体通信协议"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/第十章%20智能体通信协议.md"
sourceRel: "docs/chapter10/第十章 智能体通信协议.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter10/第十章 智能体通信协议.md"
sourceSha256: "7c0906e848c011981a544f166fd909692a4b88f959bb2bfc33186db2cc2c4b5d"
pageSha256: "c11cca33c200a21cdee80d2c56223b33f99ab17706e5592901d787366e3c7686"
contentMode: "local-full"
zh: ""
---

# 第十章 智能体通信协议

在前面的章节中，我们构建了功能完备的单体智能体，它们具备推理、工具调用和记忆能力。然而，当我们尝试构建更复杂的 AI 系统时，自然会有疑问：<strong>如何让智能体与外部世界高效交互？如何让多个智能体相互协作？</strong>

这正是智能体通信协议要解决的核心问题。本章将为 HelloAgents 框架引入三种通信协议：<strong>MCP（Model Context Protocol）</strong>用于智能体与工具的标准化通信，<strong>A2A（Agent-to-Agent Protocol）</strong>用于智能体间的点对点协作，<strong>ANP（Agent Network Protocol）</strong>用于构建大规模智能体网络。这三种协议共同构成了智能体通信的基础设施层。

通过本章的学习，您将掌握智能体通信协议的设计理念和实践技能，理解三种主流协议的设计差异，学会如何选择合适的协议来解决实际问题。

## 本篇目录

- [10.1 智能体通信协议基础](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/01-10.1_智能体通信协议基础.md)
- [10.2 MCP 协议实战](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/02-10.2_MCP_协议实战.md)
- [10.3 A2A 协议实战](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/03-10.3_A2A_协议实战.md)
- [10.4 ANP 协议实战](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/04-10.4_ANP_协议实战.md)
- [10.5 构建自定义 MCP 服务器](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/05-10.5_构建自定义_MCP_服务器.md)
- [10.6 本章总结](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/06-10.6_本章总结.md)
- [习题](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/07-习题.md)
- [参考文献](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/08-参考文献.md)
