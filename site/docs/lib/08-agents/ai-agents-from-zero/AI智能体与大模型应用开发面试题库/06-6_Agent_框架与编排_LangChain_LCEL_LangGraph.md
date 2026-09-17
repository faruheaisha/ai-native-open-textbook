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
entryUrl: "https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/AI智能体与大模型应用开发面试题库.md"
sourceRel: "AI智能体与大模型应用开发面试题库.md"
rawUrl: "/raw/08-agents/ai-agents-from-zero/AI智能体与大模型应用开发面试题库.md"
sourceSha256: "a99c818fe3bb1dc4cd73e3d4f6a26e84b54c1134a18302f03a71de567191a0d7"
pageSha256: "980e5f370729e4ca72a81a467d5e3752c60a4a9e1bd54113378b0079fb99f527"
contentMode: "local-full"
zh: ""
---

## 6、Agent 框架与编排：LangChain、LCEL、LangGraph

### Q6-1. LangGraph 相比普通 Workflow 或链式调用，最大的价值是什么？

LangGraph 最大的价值是把复杂流程中的状态、节点、边和循环显式表达出来，让大模型驱动的动态流程真正可设计、可追踪、可恢复。

普通链式调用适合简单串行流程，Workflow 适合固定路径，而 LangGraph 更适合有分支、循环、人工中断、状态持久化和多 Agent 协作的任务。它不是“换一种写法”，而是把复杂控制流从隐式逻辑变成显式图结构。

所以当你发现系统开始出现“要不要继续查、什么时候结束、失败后从哪恢复、状态怎么跨轮保留”这些问题时，LangGraph 的优势就出来了。

**常见追问：**

- LangGraph 和 Agent 的关系是什么？
- 什么场景下普通 Workflow 就够了？
- 图编排的维护成本会不会更高？

**重要度：**`必刷`（出现次数：1次） | **难度：**`中等`

**考察点：**是否理解图编排的必要性。

**对应章节：**[22 LangGraph概述与快速入门 §1、LangGraph 简介](/lib/08-agents/ai-agents-from-zero/22-LangGraph概述与快速入门#_1、langgraph-简介)；[23 LangGraphAPI：图与状态 §1、Graph API 之 Graph](/lib/08-agents/ai-agents-from-zero/23-LangGraphAPI_图与状态#_1、graph-api-之-graph（图）)

### Q6-2. 在 LangGraph 里，State、Node、Edge 分别代表什么？

State 是共享状态，Node 是处理逻辑，Edge 是流转规则。

State 决定图里“大家共同操作的上下文”是什么；Node 决定每一步具体做什么，比如调用模型、查库、执行工具；Edge 决定执行完当前节点后下一步去哪里，可以是固定跳转，也可以是条件路由。

真实项目里，LangGraph 设计得好不好，往往取决于 State 是否清晰、Node 粒度是否合理、Edge 条件是否可解释。很多图写得难维护，不是因为图本身复杂，而是把太多隐式逻辑塞进了一个节点。

**重要度：**`高频`（出现次数：1次） | **难度：**`基础`

**考察点：**LangGraph 基础心智模型。

**对应章节：**[23 LangGraphAPI：图与状态 §2、Graph API 之 State](/lib/08-agents/ai-agents-from-zero/23-LangGraphAPI_图与状态#_2、graph-api-之-state（状态）)；[24 LangGraphAPI：节点、边与进阶 §2、Graph API 之 Edge](/lib/08-agents/ai-agents-from-zero/24-LangGraphAPI_节点_边与进阶#_2、graph-api-之-edge（边）)

### Q6-3. LangChain 在今天的价值是什么？为什么不是直接手写 SDK 就够了？

LangChain 的价值不在于“能不能调模型”，而在于它把模型输入输出、Prompt、Parser、Retriever、Tools、Memory、Callbacks 等常见能力统一成了一套可组合接口。

如果只是做一个最小 Demo，直接手写 SDK 当然可以。但一旦进入多模型接入、链式编排、结构化输出、可观测和长期维护阶段，统一抽象会明显降低代码分散度。它真正解决的是“应用层编排和生态整合”问题，而不是“替你发一个 HTTP 请求”。

**重要度：**`高频`（出现次数：1次） | **难度：**`中等`

**考察点：**框架选型判断，而不是盲目崇拜框架。

**对应章节：**[9 LangChain概述与架构 §2、LangChain 定位](/lib/08-agents/ai-agents-from-zero/9-LangChain概述与架构#_2、langchain-定位)；[9 LangChain概述与架构 §4、LangChain 核心模块](/lib/08-agents/ai-agents-from-zero/9-LangChain概述与架构#_4、langchain-核心模块)

### Q6-4. 如何使用 LangChain 开发一个 Agent？

一个最小可用的 LangChain Agent，通常按两条路线去讲。

- classic 路线：模型、工具、Prompt、`create_tool_calling_agent(...)`、`AgentExecutor(...)` 一层层组起来，更适合理解内部结构。
- 1.x 路线：直接用 `create_agent(...)`，背后由基于 LangGraph 的运行时去驱动循环、状态和工具调用，更接近当前官方主线。

不管走哪条路线，底层都还是同一条主线：

- 先定义 Tools，把外部能力封成清晰的能力单元。
- 再选择 LLM，并让模型知道可调用的工具 schema。
- 然后设计 Prompt，明确角色、工具使用规则、停止条件和输出边界。
- 最后让系统形成“模型决策 -> 工具执行 -> 结果回传 -> 继续或结束”的闭环。

如果是简单场景，可以直接走高层封装；如果是复杂场景，仍然要能讲清楚底层运行主线。面试里真正加分的不是背 API 名，而是能说清 Agent 为什么会调用工具、什么时候停、失败了怎么兜底。

**重要度：**`高频`（出现次数：1次） | **难度：**`中等`

**考察点：**是否理解 Agent 不是“调一个 create_agent 就结束”，而是清楚底层组成。

**对应章节：**[21 Agent智能体 §5、实操与案例](/lib/08-agents/ai-agents-from-zero/21-Agent智能体#_5、实操与案例)；[17 Tools工具调用 §5、天气助手实战](/lib/08-agents/ai-agents-from-zero/17-Tools工具调用#_5、天气助手实战：把-tool-跑成业务闭环)

### Q6-5. LCEL 的价值是什么？为什么说它不只是语法糖？

LCEL 的核心价值是把 Prompt、Model、Parser、Retriever、函数逻辑都抽象成 Runnable，然后通过统一方式组合和调用。

它不只是写法更短，而是让顺序链、分支链、并行链、函数链能够用同一种接口去拼装、调试和替换。这对真实项目很有价值，因为你后面做日志、流式、批处理、回调和局部替换时，统一接口会让系统更可维护。

**重要度：**`中频`（出现次数：1次） | **难度：**`中等`

**考察点：**是否理解链式编排的统一接口思想。

**对应章节：**[15 LCEL与链式调用 §1、Runnable 与统一调用方式](/lib/08-agents/ai-agents-from-zero/15-LCEL与链式调用#_1、runnable-与统一调用方式)；[15 LCEL与链式调用 §2、LCEL 简介](/lib/08-agents/ai-agents-from-zero/15-LCEL与链式调用#_2、lcel-简介)

### Q6-6. LangGraph 的进阶特性里，你觉得最有工程价值的是哪些？

优先关注四类能力：流式处理、持久化、时间回溯、子图。这四类也刚好是 LangGraph 高级特性的主线。

先看流式。LangGraph 的流式不只是“模型 token 一点点吐出来”，更重要的是它能把整张图执行过程流出来。实际项目里常用的 `stream_mode` 有这些：

- `values`：看每一步结束后的完整状态快照。
- `updates`：看当前这一步到底改了哪些字段。
- `messages`：看模型消息片段或 token 流。
- `custom`：在节点里主动推送业务进度，比如“正在检索知识库”。

再看持久化。LangGraph 里的 `checkpointer` 更接近线程内、会话内的短期记忆，适合按 `thread_id` 保存图状态，用于断点恢复、人机协同和多轮任务承接；如果要跨线程、跨会话保存更长期的信息，则更接近 Store 这条线。

时间回溯的工程价值主要在排障、复盘和重放。很多复杂 Agent 不是最后结果错了，而是中间某一步状态被污染了，Time Travel 能帮你从具体节点回看甚至重跑。

子图的价值则是把复杂系统拆成可复用模块。比如“检索子图”“审批子图”“报告生成子图”可以独立封装，主图只负责更高层编排。

这四类能力可以概括为一句话：流式解决可观察，持久化解决可恢复，时间回溯解决可复盘，子图解决可维护。四个一起上，LangGraph 才真正像生产基础设施，而不只是一个能跑通的 Demo 图。

**常见追问：**

- Checkpointer 和长期记忆有什么区别？
- Time-Travel 适合什么场景？
- 什么时候应该拆子图？

**重要度：**`中频`（出现次数：1次） | **难度：**`较难`

**考察点：**是否关注真实生产能力，而不是只会 HelloWorld。

**对应章节：**[25 LangGraph高级特性 §1、流式处理（Streaming）](/lib/08-agents/ai-agents-from-zero/25-LangGraph高级特性#_1、流式处理（streaming）)；[25 LangGraph高级特性 §2、状态持久化（Persistence）](/lib/08-agents/ai-agents-from-zero/25-LangGraph高级特性#_2、状态持久化（persistence）)；[25 LangGraph高级特性 §3、时间回溯（Time-Travel）](/lib/08-agents/ai-agents-from-zero/25-LangGraph高级特性#_3、时间回溯（time-travel）)；[25 LangGraph高级特性 §4、子图（Subgraphs）](/lib/08-agents/ai-agents-from-zero/25-LangGraph高级特性#_4、子图（subgraphs）)

### Q6-7. Checkpoint、HITL、Time-Travel 在面试里怎么讲得更工程化？

这三个概念适合放在一起理解，因为它们共同解决的是：**复杂 Agent 不是“能跑起来”就够了，还要能停、能看、能批、能继续。**

- Checkpoint：解决“做到一半能不能恢复”，适合长任务、断点续跑、失败重放。
- HITL：解决“高风险动作要不要人工拍板”，适合支付、删改数据、对外发送这类动作前的人工确认。
- Time-Travel：解决“出问题后怎么回看和复盘”，适合排障、调试和重跑特定阶段。

如果用一句很工程化的话来概括，就是：

> Checkpoint 负责可恢复，HITL 负责可控制，Time-Travel 负责可复盘。

这三个能力放在一起，面试官通常会感觉你理解的不是“图会不会画”，而是“系统上线以后怎么治理”。

**常见追问：**

- 哪些节点你一定会加人工审批？
- Checkpointer 和长期记忆 / Store 的边界怎么讲？
- 什么时候时间回溯只是调试利器，什么时候它已经是生产必需？

**重要度：**`中频`（出现次数：1次） | **难度：**`较难`

**考察点：**LangGraph 生产能力理解，以及对恢复、审批、复盘三类能力的归纳能力。

**对应章节：**[25 LangGraph高级特性 §2、状态持久化（Persistence）](/lib/08-agents/ai-agents-from-zero/25-LangGraph高级特性#_2、状态持久化（persistence）)；[25 LangGraph高级特性 §3、时间回溯（Time-Travel）](/lib/08-agents/ai-agents-from-zero/25-LangGraph高级特性#_3、时间回溯（time-travel）)
