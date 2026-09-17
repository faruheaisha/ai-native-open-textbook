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
pageSha256: "ea73dc2105dce009f1cb3c0532beb16ea07ac669ced641e82cdef312b132b24c"
contentMode: "local-full"
zh: ""
---

## 12、DeepAgents 与深度研搜项目术语

| 术语                     | 一句话解释                                  | 解决的问题 / 易混点                                       | 建议先看                                                                                                                 |
| ------------------------ | ------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **DeepAgents**           | 面向深度任务和多智能体协作的 Agent 构建能力 | 重点是主智能体、子智能体、工具、Backend、Skill 等工程组合 | [实战深搜 1](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-1-DeepAgents基础与核心概念)                                                            |
| **Main Agent**           | 主智能体                                    | 负责理解任务、规划步骤、调度助手、汇总结果                | [实战深搜 8](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-8-项目总览与工程初始化)                                                                |
| **Subagent**             | 子智能体                                    | 专门负责一类任务，比如搜索、数据库查询、RAGFlow 查询      | [实战深搜 3](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-3-子智能体进阶与异步执行)                                                              |
| **Orchestrator-Workers** | 主从式多智能体架构                          | 主智能体像负责人，子智能体像专家助手                      | [实战深搜 1](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-1-DeepAgents基础与核心概念)、[实战深搜 8](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-8-项目总览与工程初始化) |
| **Backend**              | DeepAgents 的文件、状态和存储抽象           | 不等于业务后端，也不等于数据库                            | [实战深搜 6](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-6-长期记忆与Backend存储)                                                               |
| **FilesystemBackend**    | 把 Agent 文件系统映射到本地目录的 Backend   | 常用于 Skill、文件读写和会话目录隔离                      | [实战深搜 6](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-6-长期记忆与Backend存储)、[实战深搜 7](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-7-中间件机制与Skills配置)  |
| **StateBackend**         | 保存执行状态的 Backend                      | 更偏当前任务状态和恢复                                    | [实战深搜 6](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-6-长期记忆与Backend存储)                                                               |
| **StoreBackend**         | 长期存储 Backend                            | 更偏跨会话、跨线程的长期数据                              | [实战深搜 6](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-6-长期记忆与Backend存储)                                                               |
| **CompositeBackend**     | 组合多种 Backend                            | 用于把文件、状态、长期存储分层管理                        | [实战深搜 6](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-6-长期记忆与Backend存储)                                                               |
| **Middleware**           | 执行链路中的治理层                          | 不负责业务本身，而是做限制、重试、脱敏、审批等治理        | [实战深搜 7](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-7-中间件机制与Skills配置)                                                              |
| **Model Call Limit**     | 模型调用次数限制                            | 控制成本，防止无限循环                                    | [实战深搜 7](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-7-中间件机制与Skills配置)                                                              |
| **Tool Call Limit**      | 工具调用次数限制                            | 防止工具被反复调用造成成本或风险                          | [实战深搜 7](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-7-中间件机制与Skills配置)                                                              |
| **HITL**                 | Human In The Loop，人机协作                 | 让高风险动作暂停，等待人工 approve、edit 或 reject        | [实战深搜 5](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-5-人机协作与中断恢复)                                                                  |
| **SKILL.md**             | Skill 的说明文件                            | 通常包含 name、description、执行规则和资源说明            | [27](/lib/08-agents/ai-agents-from-zero/27-Skills技能与AI编程工具实践)、[实战深搜 7](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-7-中间件机制与Skills配置)                      |
| **渐进式加载**           | 先看 Skill 元数据，再按需加载完整说明       | 避免一次把所有技能内容塞进上下文                          | [27](/lib/08-agents/ai-agents-from-zero/27-Skills技能与AI编程工具实践)、[实战深搜 7](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-7-中间件机制与Skills配置)                      |
| **Thinking Loop**        | 主智能体的思考循环                          | 规划、分发、回收结果、再判断是否继续                      | [实战深搜 8](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-8-项目总览与工程初始化)                                                                |
| **RAGFlow 助手**         | 查询企业内部知识库的子智能体                | 不等于 RAGFlow 平台本身，是对平台能力的 Agent 封装        | [实战深搜 8](/lib/08-agents/ai-agents-from-zero/实战项目-深度研搜-8-项目总览与工程初始化)                                                                |
