---
title: "那现在呢？我应该学习哪些主题？"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit4/additional-readings.mdx"
sourceRel: "units/zh-CN/unit4/additional-readings.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/zh-CN/unit4/additional-readings.mdx"
sourceSha256: "8e3f029b9c0af7eb518c50ca0c5fa2f2c1a58070d74785bc4679b88e7ac11f4d"
pageSha256: "8e3f029b9c0af7eb518c50ca0c5fa2f2c1a58070d74785bc4679b88e7ac11f4d"
contentMode: "local-full"
zh: ""
---

# 那现在呢？我应该学习哪些主题？

Agentic AI 是一个快速发展的领域，了解基础协议对于构建智能自主系统至关重要。

你应该熟悉的两个重要标准是：

- **模型上下文协议 (MCP)**  
- **代理对代理协议 (A2A)**

## 🔌 模型上下文协议 (MCP)

Anthropic 的 **模型上下文协议 (MCP)** 是一个开放标准，使 AI 模型能够安全无缝地**连接外部工具、数据源和应用程序**，从而使代理更加智能和自主。

可以将 MCP 想象为一个**通用适配器**，就像 USB-C 接口一样，使 AI 模型能够插入各种数字环境**而无需为每一个进行定制集成**。

MCP 正在迅速获得行业关注，开始被OpenAI 和谷歌等大公司所采用它。

📚 了解更多：
- [Anthropic 的官方公告和文档](https://www.anthropic.com/news/model-context-protocol)
- [MCP - 维基百科](https://en.wikipedia.org/wiki/Model_Context_Protocol)
- [MCP - 博客](https://huggingface.co/blog/Kseniase/mcp)

## 🤝 代理对代理 (A2A) 协议

谷歌开发了 **代理对代理 (A2A) 协议**，作为 Anthropic 的模型上下文协议 (MCP) 的补充。

虽然 MCP 连接代理与外部工具，**A2A 则连接代理之间**，为多智能体系统之间的协作铺平道路，使其能够协同工作以解决复杂问题。

📚 深入了解 A2A：  
- [谷歌的 A2A 公告](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
