---
title: "从零构建 AI Agent（didilili）"
sourceId: "08-agents/ai-agents-from-zero"
sourceTitle: "从零构建 AI Agent（didilili）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/didilili/ai-agents-from-zero"
entryUrl: "https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/全书术语表.md"
sourceRel: "全书术语表.md"
rawUrl: "/raw/08-agents/ai-agents-from-zero/全书术语表.md"
sourceSha256: "7af4ae832ba83c6a337c57c405aad92af775364fd0b8ed2ddcee446211b1cee3"
pageSha256: "2f4c852576058d0533c81b89a9e49ad490b581f01654cc22bf254552275c49cc"
contentMode: "local-full"
zh: ""
---

## 10、Tool、Workflow、Agent 与协议术语

| 术语                   | 一句话解释                      | 解决的问题 / 易混点                                  | 建议先看                                                                                            |
| ---------------------- | ------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Tool**               | 暴露给模型使用的外部能力        | 本质常是函数、接口、数据库读写或第三方服务包装       | [17](/lib/08-agents/ai-agents-from-zero/17-Tools工具调用)                                                                           |
| **Tool Calling**       | 模型表达工具调用意图的机制      | 常和 Function Calling 放在同一层理解                 | [17](/lib/08-agents/ai-agents-from-zero/17-Tools工具调用)                                                                           |
| **Function Calling**   | Tool Calling 的常见叫法         | 厂商 API 文档里更常见这个说法                        | [17](/lib/08-agents/ai-agents-from-zero/17-Tools工具调用)、[20](/lib/08-agents/ai-agents-from-zero/20-MCP模型上下文协议)                                            |
| **args_schema**        | 工具参数结构定义                | 帮模型知道工具需要哪些参数、参数类型是什么           | [17](/lib/08-agents/ai-agents-from-zero/17-Tools工具调用)                                                                           |
| **ToolMessage**        | 工具执行结果消息                | 把工具结果交回模型，让模型继续推理或回答             | [17](/lib/08-agents/ai-agents-from-zero/17-Tools工具调用)                                                                           |
| **Workflow**           | 固定或半固定步骤编排            | 流程主导权主要在开发者手里                           | [3](/lib/08-agents/ai-agents-from-zero/3-基于Coze_Dify平台的智能体开发)、[15](/lib/08-agents/ai-agents-from-zero/15-LCEL与链式调用)                                 |
| **Agent**              | 具备决策和多步行动能力的系统    | 重点是决定何时调、调哪个、下一步做什么               | [1-3](/lib/08-agents/ai-agents-from-zero/1-3-RAG_微调_续训与智能体选型)、[21](/lib/08-agents/ai-agents-from-zero/21-Agent智能体)                                  |
| **ReAct**              | Reason + Act 模式               | 先推理，再行动，再观察，再继续                       | [21](/lib/08-agents/ai-agents-from-zero/21-Agent智能体)                                                                             |
| **AgentExecutor**      | 经典 Agent 执行器               | 更适合理解早期 Agent 机制和历史资料                  | [21](/lib/08-agents/ai-agents-from-zero/21-Agent智能体)                                                                             |
| **create_agent**       | LangChain 1.x 高层 Agent 入口   | 更接近当前推荐用法，底层依托 LangGraph 运行时        | [21](/lib/08-agents/ai-agents-from-zero/21-Agent智能体)                                                                             |
| **MCP**                | Model Context Protocol          | 统一把外部工具、资源、提示模板暴露给 AI 应用的协议   | [20](/lib/08-agents/ai-agents-from-zero/20-MCP模型上下文协议)                                                                       |
| **Host**               | 承载并发起 MCP 会话的一侧       | 常可理解为 AI 应用宿主                               | [20](/lib/08-agents/ai-agents-from-zero/20-MCP模型上下文协议)                                                                       |
| **Client**             | 连接 MCP Server 的客户端组件    | 负责协议交互、调用转发、会话管理                     | [20](/lib/08-agents/ai-agents-from-zero/20-MCP模型上下文协议)                                                                       |
| **Server**             | 对外暴露 MCP 能力的一侧         | 可暴露 Tool、Resource、Prompt                        | [20](/lib/08-agents/ai-agents-from-zero/20-MCP模型上下文协议)                                                                       |
| **Resource**           | MCP 中的资源对象                | 更像可读取上下文，不一定是可执行动作                 | [20](/lib/08-agents/ai-agents-from-zero/20-MCP模型上下文协议)                                                                       |
| **Prompt（MCP 语境）** | MCP 中可复用的提示模板资源      | 不要和一般 Prompt 概念混为一层                       | [20](/lib/08-agents/ai-agents-from-zero/20-MCP模型上下文协议)                                                                       |
| **FastMCP**            | 更方便实现 MCP 服务端的开发工具 | 帮你更容易写 Server，但它不是协议本身                | [20](/lib/08-agents/ai-agents-from-zero/20-MCP模型上下文协议)                                                                       |
| **stdio**              | MCP 的本地标准输入输出传输方式  | 常用于本地进程通信                                   | [20](/lib/08-agents/ai-agents-from-zero/20-MCP模型上下文协议)                                                                       |
| **Streamable HTTP**    | MCP 的 HTTP 传输方式            | 适合网络化接入                                       | [20](/lib/08-agents/ai-agents-from-zero/20-MCP模型上下文协议)                                                                       |
| **A2A**                | Agent-to-Agent 协议             | 更偏跨系统 Agent 协作，不是工具接入协议              | [26](/lib/08-agents/ai-agents-from-zero/26-LangGraph多智能体与A2A)                                                                  |
| **Supervisor**         | 中央调度者模式                  | 一个上层 Agent 统一拆任务和分配下游                  | [26](/lib/08-agents/ai-agents-from-zero/26-LangGraph多智能体与A2A)                                                                  |
| **Handoff**            | 控制权转交                      | 当前任务从一个 Agent 切到另一个 Agent 继续处理       | [26](/lib/08-agents/ai-agents-from-zero/26-LangGraph多智能体与A2A)                                                                  |
| **Skill / Skills**     | 可复用能力包                    | 更像提示词、说明、脚本、资源的组合，不等于独立 Agent | [27](/lib/08-agents/ai-agents-from-zero/27-Skills技能与AI编程工具实践)、[实战深搜 7](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-7-中间件机制与Skills配置) |
