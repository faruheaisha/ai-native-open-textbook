---
title: "Quiz 2: Pull Request Agent Integration"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/README.md"
zh: "on"
---

# Quiz 2: Pull Request Agent Integration

Test your knowledge of the complete Pull Request Agent system including MCP client integration and webhook handling.

<div class="tb-zh"><p>检测你对完整的 Pull Request Agent 系统的理解，包括 MCP 客户端集成与 webhook 处理。</p></div>

### Q1: What is the primary purpose of the webhook listener in the Pull Request Agent architecture?

**选项**

- A. To provide a user interface for managing pull requests
- B. To receive and process Hugging Face Hub discussion comment events in real-time
- C. To store pull request data permanently in a database
- D. To authenticate users with the Hugging Face Hub

<div class="tb-zh"><p>A. 为管理 PR 提供用户界面；B. 实时接收并处理 Hugging Face Hub 的讨论区评论事件；C. 把 PR 数据永久存入数据库；D. 对用户做 Hugging Face Hub 身份认证</p></div>

**答案解析**

- **A** — The webhook listener handles GitHub events, not user interfaces.
- **B（正确答案）** — Correct! The webhook listener responds to Hub discussion events to trigger agent actions.
- **C** — While it may process PR data, its primary role is event handling, not storage.
- **D** — Webhook listeners handle events, not user authentication.

<div class="tb-zh"><p>A — webhook 监听器处理的是 GitHub 事件，不是用户界面；B（正确答案）— 正确！webhook 监听器响应 Hub 的讨论事件来触发智能体动作；C — 它确实会处理 PR 数据，但主要职责是事件处理而非存储；D — webhook 监听器处理事件，不做用户认证。</p></div>

### Q2: In the Agent-based MCP client implementation, how does the client connect to the MCP server?

**选项**

- A. Through direct function calls in the same process
- B. Using stdio connection type to communicate with the MCP server as a subprocess
- C. By writing files to a shared directory
- D. Through HTTP REST API calls

<div class="tb-zh"><p>A. 在同一进程内直接调用函数；B. 用 stdio 连接类型，把 MCP 服务端作为子进程来通信；C. 通过向共享目录写文件；D. 通过 HTTP REST API 调用</p></div>

**答案解析**

- **A** — The Agent uses subprocess communication, not direct function calls.
- **B（正确答案）** — Correct! The Agent starts the MCP server with 'python mcp_server.py' and communicates via stdin/stdout.
- **C** — MCP uses real-time communication, not file-based communication.
- **D** — The stdio connection type doesn't use HTTP - it uses standard input/output streams.

<div class="tb-zh"><p>A — 智能体使用的是子进程通信，不是直接函数调用；B（正确答案）— 正确！智能体以 python mcp_server.py 启动 MCP 服务端，并通过标准输入输出通信；C — MCP 使用实时通信，不基于文件；D — stdio 连接类型不走 HTTP，它用的是标准输入输出流。</p></div>

### Q3: Why does the webhook handler use FastAPI's `background_tasks.add_task()` instead of processing requests synchronously?

**选项**

- A. To reduce server memory usage
- B. To comply with Hugging Face Hub requirements
- C. To return responses quickly (within 10 seconds) while allowing complex tag processing in the background
- D. To enable multiple webhook requests to be processed in parallel

<div class="tb-zh"><p>A. 降低服务端内存占用；B. 满足 Hugging Face Hub 的要求；C. 快速返回响应（10 秒内），同时允许在后台处理耗时的标签操作；D. 让多个 webhook 请求可以并行处理</p></div>

**答案解析**

- **A** — Background tasks don't necessarily reduce memory usage.
- **B** — While Hub expects timely responses, this isn't a specific Hub requirement.
- **C（正确答案）** — Correct! Webhook endpoints must respond quickly or be considered failed by the sending platform.
- **D** — While this enables parallelism, the primary reason is response time requirements.

<div class="tb-zh"><p>A — 后台任务不一定能降低内存占用；B — Hub 确实期望及时响应，但这并不是 Hub 的某项专门要求；C（正确答案）— 正确！webhook 端点必须迅速响应，否则会被发送方判定为失败；D — 这的确带来了并行能力，但主要原因是响应时间要求。</p></div>

### Q4: What is the purpose of validating the `X-Webhook-Secret` header in the webhook handler?

**选项**

- A. To identify which repository sent the webhook
- B. To prevent unauthorized requests and ensure the webhook is legitimate from Hugging Face
- C. To decode the webhook payload data
- D. To determine which MCP tools to use

<div class="tb-zh"><p>A. 识别是哪个仓库发来的 webhook；B. 拦截未授权请求，确认 webhook 确实来自 Hugging Face；C. 解码 webhook 的负载数据；D. 决定该调用哪些 MCP 工具</p></div>

**答案解析**

- **A** — Repository information comes from the webhook payload, not the secret header.
- **B（正确答案）** — Correct! The shared secret acts as authentication between Hugging Face and your application.
- **C** — The secret is for authentication, not for decoding payload data.
- **D** — Tool selection is based on the webhook content, not the secret header.

<div class="tb-zh"><p>A — 仓库信息来自 webhook 负载，而不是密钥请求头；B（正确答案）— 正确！共享密钥充当 Hugging Face 与你的应用之间的身份验证；C — 密钥用于认证，不用于解码负载；D — 调用哪些工具取决于 webhook 内容，而不是密钥请求头。</p></div>

### Q5: In the Agent implementation, what happens when `await agent_instance.load_tools()` is called?

**选项**

- A. It downloads tools from the Hugging Face Hub
- B. It discovers and makes available the MCP tools from the connected server (get_current_tags and add_new_tag)
- C. It starts the FastAPI webhook server
- D. It authenticates with the Hugging Face API

<div class="tb-zh"><p>A. 它从 Hugging Face Hub 下载工具；B. 它发现所连接服务端提供的 MCP 工具（get_current_tags 与 add_new_tag），并使其可用；C. 它启动 FastAPI webhook 服务；D. 它与 Hugging Face API 做身份认证</p></div>

**答案解析**

- **A** — The tools are local MCP server tools, not downloaded from the Hub.
- **B（正确答案）** — Correct! This discovers what tools the MCP server provides and makes them available to the agent's reasoning engine.
- **C** — load_tools() is specific to MCP tool discovery, not starting web servers.
- **D** — Authentication happens during agent creation, not during tool loading.

<div class="tb-zh"><p>A — 这些工具是本地 MCP 服务端的工具，并非从 Hub 下载；B（正确答案）— 正确！这一步会探明 MCP 服务端提供了哪些工具，并把它们交给智能体的推理引擎使用；C — load_tools() 专用于发现 MCP 工具，不负责启动 Web 服务；D — 认证发生在创建智能体时，而不是加载工具时。</p></div>

### Q6: How does the Agent intelligently use MCP tools when processing a natural language instruction?

**选项**

- A. It randomly calls available tools until one works
- B. It always calls get_current_tags first, then add_new_tag second
- C. It reasons about the instruction and determines which tools to call and in what sequence
- D. It requires explicit function calls to be specified in the instruction

<div class="tb-zh"><p>A. 随机调用可用工具，直到有一个能用；B. 固定先调用 get_current_tags，再调用 add_new_tag；C. 它对指令进行推理，判断该调用哪些工具、以什么顺序调用；D. 它要求指令中显式写出函数调用</p></div>

**答案解析**

- **A** — The Agent uses reasoning to determine which tools to call and in what order.
- **B** — While this might be a common pattern, the Agent reasons about which tools to use based on the instruction.
- **C（正确答案）** — Correct! The Agent can understand complex instructions and create tool execution plans automatically.
- **D** — The Agent can work with natural language instructions without explicit function specifications.

<div class="tb-zh"><p>A — 智能体通过推理来决定调用哪些工具、以何种顺序调用；B — 这也许是一种常见模式，但智能体是根据指令推理出该用哪些工具的；C（正确答案）— 正确！智能体能理解复杂指令，并自动生成工具执行计划；D — 智能体可以直接处理自然语言指令，无需显式指定函数。</p></div>

### Q7: What filtering logic determines whether a webhook event should trigger tag processing?

**选项**

- A. All webhook events are processed regardless of type
- B. Only events where action='create' and scope='discussion.comment'
- C. Only events from verified repository owners
- D. Only events that contain the word 'tag' in the comment

<div class="tb-zh"><p>A. 无论类型如何，所有 webhook 事件都会被处理；B. 只处理 action='create' 且 scope='discussion.comment' 的事件；C. 只处理来自已验证仓库所有者的事件；D. 只处理评论中出现「tag」一词的事件</p></div>

**答案解析**

- **A** — The handler filters events to only process relevant ones.
- **B（正确答案）** — Correct! This ensures we only process new discussion comments, ignoring other Hub events.
- **C** — The filtering is based on event type, not user verification status.
- **D** — Event filtering happens before content analysis - we filter by event type first.

<div class="tb-zh"><p>A — 处理函数会对事件做过滤，只处理相关事件；B（正确答案）— 正确！这样我们只处理新的讨论区评论，忽略 Hub 的其他事件；C — 过滤依据是事件类型，而不是用户验证状态；D — 事件过滤发生在内容分析之前，我们首先按事件类型筛选。</p></div>

Congrats on finishing this Quiz 🥳! If you need to review any elements, take the time to revisit the chapter to reinforce your knowledge.

<div class="tb-zh"><p>恭喜你完成这份自测 🥳！如果需要回顾某些内容，不妨花点时间重读该章，巩固所学。</p></div>
