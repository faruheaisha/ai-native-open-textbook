---
title: "第八章 记忆与检索"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/第八章%20记忆与检索.md"
sourceRel: "docs/chapter8/第八章 记忆与检索.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter8/第八章 记忆与检索.md"
sourceSha256: "dee4c7bb2173dd3c4132bd4aa04cc3dd4e07895a45b54a28d2c8c60d97356ea0"
pageSha256: "0bcdecda3fbb4ef805dabf175e5490d0b113429cd1705ccc542061e26c11e9f6"
contentMode: "local-full"
zh: ""
---

# 第八章 记忆与检索

在前面的章节中，我们构建了HelloAgents框架的基础架构，实现了多种智能体范式和工具系统。不过，我们的框架还缺少一个关键能力：<strong>记忆</strong>。如果智能体无法记住之前的交互内容，也无法从历史经验中学习，那么在连续对话或复杂任务中，其表现将受到极大限制。

本章将在第七章构建的框架基础上，为HelloAgents增加两个核心能力：<strong>记忆系统（Memory System）</strong>和<strong>检索增强生成（Retrieval-Augmented Generation, RAG）</strong>。我们将采用"框架扩展 + 知识科普"的方式，在构建过程中深入理解Memory和RAG的理论基础，最终实现一个具有完整记忆和知识检索能力的智能体系统。

## 本篇目录

- [8.1 从认知科学到智能体记忆](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/01-8.1_从认知科学到智能体记忆.md)
- [8.2 记忆系统：让智能体拥有记忆](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/02-8.2_记忆系统_让智能体拥有记忆.md)
- [8.3 RAG系统：知识检索增强](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/03-8.3_RAG系统_知识检索增强.md)
- [8.4 构建智能文档问答助手](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/04-8.4_构建智能文档问答助手.md)
- [8.5 本章总结与展望](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/05-8.5_本章总结与展望.md)
- [习题](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/06-习题.md)
- [参考文献](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/07-参考文献.md)
