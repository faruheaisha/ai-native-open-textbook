---
title: "第十二章 智能体性能评估"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/第十二章%20智能体性能评估.md"
sourceRel: "docs/chapter12/第十二章 智能体性能评估.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter12/第十二章 智能体性能评估.md"
sourceSha256: "55d374bb038c5dca2a64d93db7772718765ec08974c40b5ef0944fede40dbdf4"
pageSha256: "59193c27cc28b641238e0a506fddc451d4d19482182bcf65331793bbdc7187d2"
contentMode: "local-full"
zh: ""
---

# 第十二章 智能体性能评估

在前面的章节中，我们构建了 HelloAgents 框架的核心功能，实现了多种智能体范式、工具系统、记忆机制和强化学习训练等。在构建智能体系统时，我们还需要解决一个核心问题：<strong>如何客观地评估智能体的性能？</strong> 具体来说，我们需要回答以下问题：

1. 智能体是否具备预期的能力？
2. 在不同任务上的表现如何？
3. 与其他智能体相比处于什么水平？

本章将为 HelloAgents 增加<strong>性能评估系统（Evaluation System）</strong>。我们将深入理解智能体评估的理论基础，并实现评估的工具。

## 本篇目录

- [12.1 智能体评估基础](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/01-12.1_智能体评估基础.md)
- [12.2 BFCL：工具调用能力评估](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/02-12.2_BFCL_工具调用能力评估.md)
- [12.3 GAIA：通用 AI 助手能力评估](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/03-12.3_GAIA_通用_AI_助手能力评估.md)
- [12.4 数据生成质量评估](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/04-12.4_数据生成质量评估.md)
- [12.5 本章小结](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/05-12.5_本章小结.md)
- [习题](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/06-习题.md)
- [参考文献](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/07-参考文献.md)
