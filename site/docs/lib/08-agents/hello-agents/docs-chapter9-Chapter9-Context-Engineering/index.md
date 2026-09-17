---
title: "Chapter 9 Context Engineering"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/Chapter9-Context-Engineering.md"
sourceRel: "docs/chapter9/Chapter9-Context-Engineering.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter9/Chapter9-Context-Engineering.md"
sourceSha256: "a938d5891a685ed50b2518022c83b55241958ab880713f74b814c97e6a31dc53"
pageSha256: "5aa0497d0442c4d331afc2ee60c8a93c1f08402e87be0bc819b67236e81de2aa"
contentMode: "local-full"
zh: ""
---

# Chapter 9 Context Engineering

In previous chapters, we have introduced memory systems and RAG for agents. However, to enable agents to stably "think" and "act" in real complex scenarios, memory and retrieval alone are not enough—we need an engineering methodology to continuously and systematically construct appropriate "context" for the model. This is the theme of this chapter: Context Engineering. It focuses on "how to assemble and optimize input context in a reusable, measurable, and evolvable way before each model call", thereby improving correctness, robustness, and efficiency<sup>[1][2]</sup>.

To enable readers to quickly experience the complete functionality of this chapter, we provide a directly installable Python package. You can install the version corresponding to this chapter with the following command:

```bash
pip install "hello-agents[all]==0.2.8"
```

This chapter mainly introduces the core concepts and practices of context engineering, and adds a context builder and two supporting tools to the HelloAgents framework:

- **ContextBuilder** (`hello_agents/context/builder.py`): Context builder that implements the GSSC (Gather-Select-Structure-Compress) pipeline, providing a unified context management interface
- **NoteTool** (`hello_agents/tools/builtin/note_tool.py`): Structured note tool that supports persistent memory management for agents
- **TerminalTool** (`hello_agents/tools/builtin/terminal_tool.py`): Terminal tool that supports file system operations and just-in-time context retrieval for agents

These components together constitute a complete context engineering solution, which is key to implementing long-term task management and agentic search, and will be introduced in detail in subsequent sections.

In addition to installing the framework, you also need to configure the LLM API in `.env`. The examples in this chapter mainly use large language models for context management and intelligent decision-making.

After configuration is complete, you can start the learning journey of this chapter!

## 本篇目录

- [9.1 What is Context Engineering](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/01-9.1_What_is_Context_Engineering.md)
- [9.2 Why Context Engineering is Important](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/02-9.2_Why_Context_Engineering_is_Important.md)
- [9.3 Practice in Hello-Agents: ContextBuilder](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/03-9.3_Practice_in_Hello-Agents_ContextBuil.md)
- [9.4 NoteTool: Structured Notes](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/04-9.4_NoteTool_Structured_Notes.md)
- [9.5 TerminalTool: Instant File System Access](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/05-9.5_TerminalTool_Instant_File_System_Acc.md)
- [9.6 Long-Horizon Agent in Practice: Codebase Maintenance Assistant](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/06-9.6_Long-Horizon_Agent_in_Practice_Codeb.md)
- [9.7 Chapter Summary](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/07-9.7_Chapter_Summary.md)
- [Exercises](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/08-Exercises.md)
- [References](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter9/09-References.md)
