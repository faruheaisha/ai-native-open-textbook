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
pageSha256: "539649688511031778977e0e80753bcac009fff559d39b3df493866ea6827acc"
contentMode: "local-full"
zh: ""
---

## 8、平台实践与框架选型：Coze、Dify、RAGFlow

### Q8-1. Coze / Dify 这类平台和 LangChain / LangGraph 的关系怎么理解？

Coze / Dify 更偏应用层、低代码和可视化交付，LangChain / LangGraph 更偏代码级开发框架。它们不是谁替代谁，而是同一条 AI 应用链路上的不同层级。

如果从这一层关系来理解：

- Dify / Coze 更适合快速把 Agent、RAG、Workflow 搭起来，方便业务侧验证、协作和交付。
- LangChain 更适合把 Prompt、Model I/O、Parser、Retriever、Tools 这些组件按代码方式组合起来。
- LangGraph 更适合状态显式、循环、条件路由、人机协同、多智能体这类复杂编排。

所以平台更接近“应用搭建层”，代码框架更接近“底层编排层”。真实项目里很常见的路径是：先用平台验证业务价值，再把核心链路迁到代码框架；或者平台负责上层业务编排，底层复杂能力由自建服务承接。

**重要度：**`高频`（出现次数：1次） | **难度：**`中等`

**考察点：**平台能力和代码能力的选型判断。

**对应章节：**[3 基于Coze&Dify平台的智能体开发 §1、智能体(AI Agent)概述](/lib/08-agents/ai-agents-from-zero/3-基于Coze_Dify平台的智能体开发#_1、智能体ai-agent概述)；[9 LangChain概述与架构 §2、LangChain 定位](/lib/08-agents/ai-agents-from-zero/9-LangChain概述与架构#_2、langchain-定位)

### Q8-2. 各类 Agent 开发框架应该如何选取？

框架选型不要看热度，要看任务复杂度、团队能力和交付要求。

- 如果目标是快速原型、生态丰富、常见组件齐全，LangChain 很合适。
- 如果任务有显式状态、循环、条件路由、人机协同或多智能体，LangGraph 更合适。
- 如果是低代码、快速验证业务流程，Coze / Dify 更适合。
- 如果系统边界简单、需求非常明确，直接手写 SDK 也可能是成本最低的方案。

更成熟的回答方式，不是简单比较“哪个最好”，而是说明“什么场景下用什么更划算”。能说出替代方案和迁移路径，通常比单纯夸某个框架更有说服力。

**常见追问：**

- 你最终会用哪些指标判断这次框架选型是不是成功的？
- 如果前期先用平台，后期迁到自研框架，迁移边界应该怎么划？

**重要度：**`高频`（出现次数：1次） | **难度：**`中等`

**考察点：**框架选型和工程判断。

**对应章节：**[9 LangChain概述与架构 §2、LangChain 定位](/lib/08-agents/ai-agents-from-zero/9-LangChain概述与架构#_2、langchain-定位)；[22 LangGraph概述与快速入门 §1、LangGraph 简介](/lib/08-agents/ai-agents-from-zero/22-LangGraph概述与快速入门#_1、langgraph-简介)

### Q8-3. 什么时候工作流比 Agent 更合适？

当业务步骤固定、输出格式明确、希望强可控和易审计时，工作流通常比 Agent 更合适。

比如分类、摘要、内容审核、报告生成、表单填充、固定审批链，这类场景流程路径通常是稳定的。用工作流能更清楚地定义节点职责、失败重试、人工介入点和 SLA。Agent 更适合开放任务和动态决策，而工作流更适合企业里大量“有规则、可追责、可回放”的流程型任务。

**常见追问：**

- Workflow 中哪些节点适合交给 LLM？
- 人工审核点应该加在哪里？
- 工作流如何逐步升级成 Agentic Workflow？

**重要度：**`高频`（出现次数：1次） | **难度：**`中等`

**考察点：**流程治理意识。

**对应章节：**[3 基于Coze&Dify平台的智能体开发 §6、工作流的搭建](/lib/08-agents/ai-agents-from-zero/3-基于Coze_Dify平台的智能体开发#_6、工作流的搭建)；[21 Agent智能体 §1、Agent 简介](/lib/08-agents/ai-agents-from-zero/21-Agent智能体#_1、agent-简介)

### Q8-4. 用 Python 调用 Dify / Coze 工作流时，最值得关注哪些工程细节？

重点需要关注五类问题：鉴权、参数对齐、流式模式、超时限制、日志追踪。

先说 Dify。它的工作流 API 重点字段通常是：

- `Authorization: Bearer \{api_key\}`
- 请求体里的 `inputs`
- `response_mode`
- `user`

这里有两个非常容易踩坑的点：一是 API Key 和工作流是绑定关系，不是拿一个全局 key 到处用；二是长流程尽量用 `streaming`，因为 `blocking` 很容易被网关超时打断。真正做流式时，要能识别 SSE 流里的 `workflow_finished`，并正确拿到最终 `outputs`。

再说 Coze。它更需要盯紧：

- `workflow_id`
- `app_id`
- `parameters`

其中 `parameters` 必须和工作流里定义的输入变量严格对齐，变量名一旦对不上，代码看起来能跑，请求也可能成功，但业务结果就是不对。流式处理时，则要能区分 `PING`、`MESSAGE`、`DONE`，或者 SDK 里的 `MESSAGE / ERROR / INTERRUPT` 事件。

如果从工程角度总结，重点需要看这几件事：

- 密钥、工作流、应用的绑定关系是否搞清楚。
- 请求参数名是否和平台工作流输入严格一致。
- 是不是默认用流式，而不是把长任务都压成阻塞式。
- 平台日志、`workflow_run_id`、业务 `request_id` 是否串起来了。
- 如果流程里有外部副作用，是否做好幂等、重试和失败补偿。

这道题真正考察的，不是“会不会发 POST 请求”，而是是否真正理解过平台 API 的真实调用链。

**常见追问：**

- 流式和阻塞式返回怎么选？
- 平台日志能解决哪些排障问题？
- 平台工作流和自建后端服务怎么协作？

**重要度：**`中频`（出现次数：1次） | **难度：**`中等`

**考察点：**是否看过平台 API 的真实调用链，而不是只会点界面。

**对应章节：**[4 Python调用Dify平台工作流 §4、请求格式](/lib/08-agents/ai-agents-from-zero/4-Python调用Dify平台工作流#_4、请求格式)；[5 Python调用Coze平台工作流 §3、通过 Python 代码调用工作流](/lib/08-agents/ai-agents-from-zero/5-Python调用Coze平台工作流#_3-通过-python-代码调用工作流)

### Q8-5. 开源 RAG 平台比如 RAGFlow，应该如何选型？和 Dify 或自研链路怎么比较？

这道题不要答成“谁更强”，而要答成“当前知识库场景更需要什么”。

如果重点是文档导入、解析、切块、检索和 RAG 编排体验，那么像 RAGFlow 这类平台会比较有吸引力；如果重点是多类 Agent、工作流、插件生态和业务 API 编排，Dify / Coze 这类平台的边界会更宽；如果核心链路涉及深度定制、复杂状态治理、合规审计和内部系统耦合，自研代码链路通常更稳。

真正做选型时，优先看四类因素：文档导入与解析质量、权限和多租户能力、是否方便对接业务系统、二次开发空间。很多项目不是卡在“能不能做 RAG”，而是卡在“解析质量稳不稳、权限做不做得住、后续能不能接进企业系统”。

**重要度：**`中频`（出现次数：1次） | **难度：**`中等`

**考察点：**RAG 平台选型判断，以及平台能力与自研能力的边界意识。
