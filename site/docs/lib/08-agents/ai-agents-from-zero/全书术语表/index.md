---
title: "全书术语表"
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
pageSha256: "02d8d9d1644e90c02df5224aa7ad48fa93ff151c3e9a123925b916480d16e7f3"
contentMode: "local-full"
zh: ""
---

# 全书术语表

这份术语表不是为了堆名词，而是为了帮你把整套教程里的核心概念串起来。

读这本教程时，最容易卡住的地方通常不是“完全没见过这个词”，而是：

- 见过 Prompt、RAG、Tool、Agent，但分不清它们各自解决什么问题；
- Coze、Dify、LangChain、LangGraph、MCP、DeepAgents 都在讲“智能体”，但层次不同；
- 会跟着案例跑代码，却说不清为什么这里该用 Workflow、那里该用 Agent；
- 到项目实战时，`thread_id`、`session_dir`、Checkpoint、Backend、ContextVar 又开始混在一起。

所以这份术语表按“由浅入深”的方式组织：先建立概念地图，再按能力层查术语，最后用易混对照收束。

---

## 本篇目录

- [1、怎么使用这份术语表](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/01-1_怎么使用这份术语表.md)
- [2、全书概念地图](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/02-2_全书概念地图.md)
- [3、高频易混概念速查](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/03-3_高频易混概念速查.md)
- [4、大模型与训练基础术语](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/04-4_大模型与训练基础术语.md)
- [5、Prompt 与 Model I/O 术语](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/05-5_Prompt_与_Model_I_O_术语.md)
- [6、平台、部署与模型服务术语](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/06-6_平台_部署与模型服务术语.md)
- [7、LangChain 与 LCEL 术语](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/07-7_LangChain_与_LCEL_术语.md)
- [8、记忆、会话与持久化术语](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/08-8_记忆_会话与持久化术语.md)
- [9、向量、检索与 RAG 术语](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/09-9_向量_检索与_RAG_术语.md)
- [10、Tool、Workflow、Agent 与协议术语](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/10-10_Tool_Workflow_Agent_与协议术语.md)
- [11、LangGraph 与状态化编排术语](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/11-11_LangGraph_与状态化编排术语.md)
- [12、DeepAgents 与深度研搜项目术语](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/12-12_DeepAgents_与深度研搜项目术语.md)
- [13、电商问数项目术语](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/13-13_电商问数项目术语.md)
- [14、工程化与交付术语](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/14-14_工程化与交付术语.md)
- [15、最容易混淆的概念对照](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/15-15_最容易混淆的概念对照.md)
- [16、英文缩写速查](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/16-16_英文缩写速查.md)
