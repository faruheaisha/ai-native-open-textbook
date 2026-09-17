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
pageSha256: "3ae4e0628a3a32ccd2aefcd065d1795bbf52b109d2326ca124ae6b210f10e623"
contentMode: "local-full"
zh: ""
---

## 7、LangChain 与 LCEL 术语

| 术语                 | 一句话解释                    | 解决的问题 / 易混点                             | 建议先看                                                                   |
| -------------------- | ----------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------- |
| **LangChain**        | 面向 LLM 应用开发的组件框架   | 偏模型、Prompt、Parser、Tool、Agent 等组件封装  | [9](/lib/08-agents/ai-agents-from-zero/9-LangChain概述与架构)、[10](/lib/08-agents/ai-agents-from-zero/10-LangChain快速上手与HelloWorld)   |
| **Runnable**         | 可执行组件统一抽象            | Prompt、Model、Parser、Tool 都能抽象成 Runnable | [15](/lib/08-agents/ai-agents-from-zero/15-LCEL与链式调用)                                                 |
| **LCEL**             | LangChain Expression Language | 用声明式写法把多个 Runnable 串起来              | [15](/lib/08-agents/ai-agents-from-zero/15-LCEL与链式调用)                                                 |
| **RunnableSequence** | 顺序链                        | 前一步输出喂给下一步                            | [15](/lib/08-agents/ai-agents-from-zero/15-LCEL与链式调用)                                                 |
| **RunnableParallel** | 并行链                        | 同时执行多个分支，再汇总结果                    | [15](/lib/08-agents/ai-agents-from-zero/15-LCEL与链式调用)                                                 |
| **RunnableBranch**   | 条件分支链                    | 根据条件路由到不同处理路径                      | [15](/lib/08-agents/ai-agents-from-zero/15-LCEL与链式调用)                                                 |
| **RunnableLambda**   | 自定义逻辑节点                | 适合插入字段处理、业务映射、轻量逻辑            | [15](/lib/08-agents/ai-agents-from-zero/15-LCEL与链式调用)                                                 |
| **Chain**            | 由多个步骤构成的处理链        | 在 LCEL 时代更多会用 Runnable 体系理解          | [9](/lib/08-agents/ai-agents-from-zero/9-LangChain概述与架构)、[15](/lib/08-agents/ai-agents-from-zero/15-LCEL与链式调用)                  |
| **Provider**         | 模型提供方或集成方            | 比如 OpenAI、DeepSeek、阿里百炼、Ollama         | [10](/lib/08-agents/ai-agents-from-zero/10-LangChain快速上手与HelloWorld)、[11](/lib/08-agents/ai-agents-from-zero/11-Model-I-O与模型接入) |
| **Callback / 回调**  | 执行过程中的事件钩子          | 可用于日志、监控、流式输出和调试                | [9](/lib/08-agents/ai-agents-from-zero/9-LangChain概述与架构)、[25](/lib/08-agents/ai-agents-from-zero/25-LangGraph高级特性)               |
