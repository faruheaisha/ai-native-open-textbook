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
pageSha256: "418f6faf7b48150c66fabb3e27adfe9376c3ea0b4c68380d1a403f6c8046aa84"
contentMode: "local-full"
zh: ""
---

## 11、LangGraph 与状态化编排术语

| 术语                 | 一句话解释                     | 解决的问题 / 易混点                            | 建议先看                                                                               |
| -------------------- | ------------------------------ | ---------------------------------------------- | -------------------------------------------------------------------------------------- |
| **LangGraph**        | 面向状态化工作流的图编排框架   | 更适合复杂、可分支、可循环、可持久化流程       | [22](/lib/08-agents/ai-agents-from-zero/22-LangGraph概述与快速入门)                                                    |
| **State**            | 图里的共享状态                 | 整张图围绕它流转                               | [22](/lib/08-agents/ai-agents-from-zero/22-LangGraph概述与快速入门)、[23](/lib/08-agents/ai-agents-from-zero/23-LangGraphAPI_图与状态)                |
| **StateGraph**       | 基于状态的图定义方式           | LangGraph 最常见的建图入口之一                 | [23](/lib/08-agents/ai-agents-from-zero/23-LangGraphAPI_图与状态)                                                     |
| **Node**             | 节点                           | 图里的处理单元，常常是函数或能力块             | [24](/lib/08-agents/ai-agents-from-zero/24-LangGraphAPI_节点_边与进阶)                                               |
| **Edge**             | 边                             | 决定从一个节点流向哪里                         | [24](/lib/08-agents/ai-agents-from-zero/24-LangGraphAPI_节点_边与进阶)                                               |
| **Conditional Edge** | 条件边                         | 根据状态内容决定下一步分支                     | [24](/lib/08-agents/ai-agents-from-zero/24-LangGraphAPI_节点_边与进阶)                                               |
| **Reducer**          | 状态合并规则                   | 决定新旧状态值怎么合并，尤其影响并行分支       | [23](/lib/08-agents/ai-agents-from-zero/23-LangGraphAPI_图与状态)                                                     |
| **Pregel**           | LangGraph 底层图运行模型       | 用 Actor、Channel、Superstep 推进图执行        | [23](/lib/08-agents/ai-agents-from-zero/23-LangGraphAPI_图与状态)                                                     |
| **Superstep**        | 图执行中的一轮调度             | 一轮里先计划、再并行执行、最后合并更新         | [23](/lib/08-agents/ai-agents-from-zero/23-LangGraphAPI_图与状态)                                                     |
| **StateSnapshot**    | 状态快照                       | 保存某一时刻的 values、next、config 等执行现场 | [23](/lib/08-agents/ai-agents-from-zero/23-LangGraphAPI_图与状态)、[25](/lib/08-agents/ai-agents-from-zero/25-LangGraph高级特性)                      |
| **START / END**      | 图的入口和出口                 | 定义流程从哪里开始、在哪里结束                 | [23](/lib/08-agents/ai-agents-from-zero/23-LangGraphAPI_图与状态)                                                     |
| **Command**          | 运行时控制原语                 | 适合把执行和决定跳哪合在一起表达               | [24](/lib/08-agents/ai-agents-from-zero/24-LangGraphAPI_节点_边与进阶)                                               |
| **Send**             | 动态派发控制原语               | 适合运行时并行分发子任务                       | [24](/lib/08-agents/ai-agents-from-zero/24-LangGraphAPI_节点_边与进阶)                                               |
| **Runtime**          | 运行时上下文对象               | 常用于配置、依赖、非业务状态信息               | [24](/lib/08-agents/ai-agents-from-zero/24-LangGraphAPI_节点_边与进阶)                                               |
| **Streaming**        | 流式观察执行过程               | 适合实时展示、调试和监控                       | [25](/lib/08-agents/ai-agents-from-zero/25-LangGraph高级特性)                                                          |
| **Interrupt**        | 中断执行并等待外部处理         | 常用于人工确认、审批、关键节点暂停             | [25](/lib/08-agents/ai-agents-from-zero/25-LangGraph高级特性)、[实战深搜 5](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-5-人机协作与中断恢复) |
| **Time-Travel**      | 基于历史 checkpoint 回放或重跑 | 适合调试、复盘和纠错                           | [25](/lib/08-agents/ai-agents-from-zero/25-LangGraph高级特性)                                                          |
| **Subgraph**         | 子图                           | 用于模块化拆分复杂流程                         | [25](/lib/08-agents/ai-agents-from-zero/25-LangGraph高级特性)                                                          |
| **多智能体图**       | 用图组织多个 Agent 协作        | 重点是状态、路由、上下文传递怎么设计           | [26](/lib/08-agents/ai-agents-from-zero/26-LangGraph多智能体与A2A)                                                     |
