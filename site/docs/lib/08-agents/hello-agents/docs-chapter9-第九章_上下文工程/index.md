---
title: "第九章 上下文工程"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/第九章%20上下文工程.md"
sourceRel: "docs/chapter9/第九章 上下文工程.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter9/第九章 上下文工程.md"
sourceSha256: "af28f0a9ad463f42c884af0daa1906b005d5500366df80cc7ee8d97a928d864a"
pageSha256: "34abe6978819b432b60a21292271ed454b4c9c62af119cf1e06cf7163e5df648"
contentMode: "local-full"
zh: ""
---

# 第九章 上下文工程

在前面的章节中，我们已经为智能体引入了记忆系统与RAG。然而，要让智能体在真实复杂场景中稳定地“思考”与“行动”，仅有记忆与检索还不够——我们需要一套工程化方法，持续、系统地为模型构造恰当的“上下文”。这就是本章的主题：上下文工程（Context Engineering）。它关注的是“在每一次模型调用前，如何以可复用、可度量、可演进的方式，拼装并优化输入上下文”，从而提升正确性、鲁棒性与效率<sup>[1][2]</sup>。

为了让读者能够快速体验本章的完整功能，我们提供了可直接安装的Python包。你可以通过以下命令安装本章对应的版本：

```bash
pip install "hello-agents[all]==0.2.8"
```

本章主要介绍上下文工程的核心概念与实践，并在HelloAgents框架中新增了上下文构建器和两个配套工具：

- **ContextBuilder** (`hello_agents/context/builder.py`)：上下文构建器，实现 GSSC (Gather-Select-Structure-Compress) 流水线，提供统一的上下文管理接口
- **NoteTool** (`hello_agents/tools/builtin/note_tool.py`)：结构化笔记工具，支持智能体进行持久化记忆管理
- **TerminalTool** (`hello_agents/tools/builtin/terminal_tool.py`)：终端工具，支持智能体进行文件系统操作和即时上下文检索

这些组件共同构成了完整的上下文工程解决方案，是实现长时程任务管理和智能体式搜索的关键，将在后续章节中详细介绍。

除了安装框架外，还需要在`.env`配置LLM的API。本章示例主要使用大语言模型进行上下文管理和智能决策。

配置完成后，即可开始本章的学习之旅！

## 本篇目录

- [9.1 什么是上下文工程](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/01-9.1_什么是上下文工程.md)
- [9.2 为什么上下文工程重要](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/02-9.2_为什么上下文工程重要.md)
- [9.3 在 Hello-Agents 中的实践：ContextBuilder](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/03-9.3_在_Hello-Agents_中的实践_ContextBuilder.md)
- [9.4 NoteTool：结构化笔记](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/04-9.4_NoteTool_结构化笔记.md)
- [9.5 TerminalTool：即时文件系统访问](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/05-9.5_TerminalTool_即时文件系统访问.md)
- [9.6 长程智能体实战：代码库维护助手](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/06-9.6_长程智能体实战_代码库维护助手.md)
- [9.7 本章总结](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/07-9.7_本章总结.md)
- [习题](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/08-习题.md)
- [参考文献](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/09-参考文献.md)
