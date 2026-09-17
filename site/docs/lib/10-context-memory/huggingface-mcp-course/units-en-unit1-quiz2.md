---
title: "Quiz 2: MCP SDK"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit1/quiz2.mdx"
sourceRel: "units/en/unit1/quiz2.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit1/quiz2.mdx"
sourceSha256: "cafb3f3cea2915dddebd22c38c6919f5ea8ddd5f71faf83d271217d54566f43c"
pageSha256: "cafb3f3cea2915dddebd22c38c6919f5ea8ddd5f71faf83d271217d54566f43c"
contentMode: "local-full"
zh: "on"
---

# Quiz 2: MCP SDK

Test your knowledge of the MCP SDKs and their functionalities.

<div class="tb-zh"><p>检测你对 MCP SDK 及其功能的掌握程度。</p></div>

### Q1: What is the main purpose of the MCP SDKs?

**选项**

- A. To define the MCP protocol specification
- B. To make it easier to implement MCP clients and servers
- C. To provide a visual interface for MCP interactions
- D. To replace the need for programming languages

<div class="tb-zh"><p>A. 定义 MCP 协议规范；B. 让实现 MCP 客户端与服务端更容易；C. 为 MCP 交互提供可视化界面；D. 取代对编程语言的需求</p></div>

**答案解析**

- **A** — The SDKs implement the protocol, they don't define it. The specification is separate.
- **B（正确答案）** — Correct! SDKs abstract away low-level protocol details.
- **C** — While some tools might offer this (like MCP Inspector), it's not the primary purpose of the SDKs themselves.
- **D** — SDKs are libraries used within programming languages.

<div class="tb-zh"><p>A — SDK 实现协议，但并不定义协议，规范是独立存在的；B（正确答案）— 正确！SDK 把底层协议细节抽象掉了；C — 有些工具（如 MCP Inspector）确实提供该能力，但这不是 SDK 本身的主要目的；D — SDK 是在编程语言中使用的库。</p></div>

### Q2: Which of the following functionalities do the MCP SDKs typically handle?

**选项**

- A. Optimizing MCP Servers
- B. Defining new AI algorithms
- C. Message serialization/deserialization
- D. Hosting Large Language Models

<div class="tb-zh"><p>A. 优化 MCP 服务端；B. 定义新的 AI 算法；C. 消息序列化与反序列化；D. 托管大语言模型</p></div>

**答案解析**

- **A** — This is outside the scope of MCP SDKs, which focus on protocol implementation.
- **B** — This is outside the scope of MCP SDKs, which focus on protocol implementation.
- **C（正确答案）** — Correct! This is a core function for handling JSON-RPC messages.
- **D** — MCP enables connection to LLMs, but the SDKs themselves don't host them.

<div class="tb-zh"><p>A — 这不在 MCP SDK 的范围内，它聚焦于协议实现；B — 这不在 MCP SDK 的范围内，它聚焦于协议实现；C（正确答案）— 正确！这是处理 JSON-RPC 消息的核心功能；D — MCP 让模型能够连接 LLM，但 SDK 本身并不托管它们。</p></div>

### Q3: According to the provided text, which company maintains the official Python SDK for MCP?

**选项**

- A. Google
- B. Anthropic
- C. Microsoft
- D. JetBrains

<div class="tb-zh"><p>A. Google；B. Anthropic；C. Microsoft；D. JetBrains</p></div>

**答案解析**

- **A** — The text lists Anthropic as the maintainer.
- **B（正确答案）** — Correct! The course material indicates Anthropic maintains the Python SDK.
- **C** — Microsoft maintains the C# SDK according to the text.
- **D** — JetBrains maintains the Kotlin SDK according to the text.

<div class="tb-zh"><p>A — 文中列出的维护者是 Anthropic；B（正确答案）— 正确！课程材料指出 Python SDK 由 Anthropic 维护；C — 按文中所述，C# SDK 由 Microsoft 维护；D — 按文中所述，Kotlin SDK 由 JetBrains 维护。</p></div>

### Q4: What command is used to start a development MCP server using a Python file named `server.py`?

**选项**

- A. python server.py run
- B. mcp start server.py
- C. mcp dev server.py
- D. serve mcp server.py

<div class="tb-zh"><p>A. python server.py run；B. mcp start server.py；C. mcp dev server.py；D. serve mcp server.py</p></div>

**答案解析**

- **A** — While you run Python scripts with `python`, MCP has a specific CLI command.
- **B** — The command is `mcp dev`, not `mcp start`.
- **C（正确答案）** — Correct! This command initializes the development server.
- **D** — This is not the standard MCP CLI command shown in the course material.

<div class="tb-zh"><p>A — 虽然可以用 python 运行 Python 脚本，但 MCP 有专门的 CLI 命令；B — 命令是 mcp dev，不是 mcp start；C（正确答案）— 正确！这条命令会初始化开发服务器；D — 这不是课程材料中展示的标准 MCP CLI 命令。</p></div>

### Q5: What is the role of JSON-RPC 2.0 in MCP?

**选项**

- A. As a primary transport mechanism for remote communication
- B. As the message format for all communication between Clients and Servers
- C. As a tool for debugging AI models
- D. As a method for defining AI capabilities like Tools and Resources

<div class="tb-zh"><p>A. 作为远程通信的主要传输机制；B. 作为客户端与服务端之间所有通信的消息格式；C. 作为调试 AI 模型的工具；D. 作为定义 Tools、Resources 等 AI 能力的方法</p></div>

**答案解析**

- **A** — HTTP+SSE or Streamable HTTP are transport mechanisms; JSON-RPC is the message format.
- **B（正确答案）** — Correct! MCP uses JSON-RPC 2.0 for structuring messages.
- **C** — While its human-readable nature helps in debugging communications, it's not a debugging tool for AI models themselves.
- **D** — Capabilities are defined by their own schemas; JSON-RPC is used to invoke them and exchange data.

<div class="tb-zh"><p>A — HTTP+SSE 或 Streamable HTTP 才是传输机制，JSON-RPC 是消息格式；B（正确答案）— 正确！MCP 使用 JSON-RPC 2.0 来组织消息；C — 它易读的特性确实有助于调试通信，但它不是调试 AI 模型本身的工具；D — 能力由各自的模式定义，JSON-RPC 用于调用它们并交换数据。</p></div>

Congrats on finishing this Quiz 🥳! If you need to review any elements, take the time to revisit the chapter to reinforce your knowledge.

<div class="tb-zh"><p>恭喜你完成这份自测 🥳！如果需要回顾某些内容，不妨花点时间重读该章，巩固所学。</p></div>
