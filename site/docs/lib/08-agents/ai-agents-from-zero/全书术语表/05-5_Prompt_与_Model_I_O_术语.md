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
pageSha256: "ed3814e818d8f4f55a9b89328bc9fa16c8ae5666208af52c769e6357307a99c0"
contentMode: "local-full"
zh: ""
---

## 5、Prompt 与 Model I/O 术语

| 术语                       | 一句话解释                   | 解决的问题 / 易混点                              | 建议先看                                                                 |
| -------------------------- | ---------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------ |
| **Prompt**                 | 给模型的输入说明             | 从一句话到复杂模板都属于 Prompt                  | [1-2](/lib/08-agents/ai-agents-from-zero/1-2-提示词工程基础)、[13](/lib/08-agents/ai-agents-from-zero/13-提示词与消息模板)               |
| **提示词工程**             | 系统设计 Prompt 的方法       | 重点不是写漂亮话，而是让任务边界和输出约束更清楚 | [1-2](/lib/08-agents/ai-agents-from-zero/1-2-提示词工程基础)                                             |
| **Zero-shot**              | 不给示例，直接让模型完成任务 | 适合简单、边界清晰的问题                         | [1-2](/lib/08-agents/ai-agents-from-zero/1-2-提示词工程基础)                                             |
| **Few-shot**               | 给少量示例再让模型做任务     | 适合格式、风格、分类标准需要被示范的任务         | [1-2](/lib/08-agents/ai-agents-from-zero/1-2-提示词工程基础)                                             |
| **System Message**         | 系统级规则消息               | 常用于定义角色、边界、风格和硬约束               | [13](/lib/08-agents/ai-agents-from-zero/13-提示词与消息模板)                                             |
| **Human Message**          | 用户消息                     | 表示当前用户输入                                 | [13](/lib/08-agents/ai-agents-from-zero/13-提示词与消息模板)                                             |
| **AI / Assistant Message** | 模型消息                     | 既可以是历史回复，也可能包含工具调用痕迹         | [11](/lib/08-agents/ai-agents-from-zero/11-Model-I-O与模型接入)、[13](/lib/08-agents/ai-agents-from-zero/13-提示词与消息模板)            |
| **PromptTemplate**         | 文本模板                     | 适合单段文本 Prompt                              | [13](/lib/08-agents/ai-agents-from-zero/13-提示词与消息模板)                                             |
| **ChatPromptTemplate**     | 聊天消息模板                 | 适合多角色、多轮消息结构                         | [13](/lib/08-agents/ai-agents-from-zero/13-提示词与消息模板)                                             |
| **MessagesPlaceholder**    | 消息占位符                   | 用来把历史消息动态插回 Prompt                    | [13](/lib/08-agents/ai-agents-from-zero/13-提示词与消息模板)、[16](/lib/08-agents/ai-agents-from-zero/16-记忆与对话历史_含Redis基础_)  |
| **Model I/O**              | 模型输入输出层               | 解决怎么喂给模型、怎么拿回结果、怎么解析结果     | [11](/lib/08-agents/ai-agents-from-zero/11-Model-I-O与模型接入)                                          |
| **AIMessage**              | LangChain 中的模型回复对象   | 不只是文本，还可能带 metadata、tool_calls 等     | [11](/lib/08-agents/ai-agents-from-zero/11-Model-I-O与模型接入)                                          |
| **invoke**                 | 一次性调用                   | 最常见执行方式                                   | [10](/lib/08-agents/ai-agents-from-zero/10-LangChain快速上手与HelloWorld)、[15](/lib/08-agents/ai-agents-from-zero/15-LCEL与链式调用)    |
| **batch**                  | 批量调用                     | 适合一组输入同时处理                             | [15](/lib/08-agents/ai-agents-from-zero/15-LCEL与链式调用)                                               |
| **stream**                 | 流式输出                     | 边生成边返回，适合实时交互和过程观测             | [10](/lib/08-agents/ai-agents-from-zero/10-LangChain快速上手与HelloWorld)、[25](/lib/08-agents/ai-agents-from-zero/25-LangGraph高级特性) |
| **Output Parser**          | 输出解析器                   | 把模型原始输出整理成程序更好处理的结构           | [14](/lib/08-agents/ai-agents-from-zero/14-输出解析器)                                                   |
| **Structured Output**      | 结构化输出                   | 让模型按指定字段或 schema 返回                   | [14](/lib/08-agents/ai-agents-from-zero/14-输出解析器)、[21](/lib/08-agents/ai-agents-from-zero/21-Agent智能体)                          |
| **TypedDict**              | 轻量结构声明                 | 更偏类型提示，不等于强运行时校验                 | [14](/lib/08-agents/ai-agents-from-zero/14-输出解析器)                                                   |
| **Pydantic**               | Python 数据校验库            | 常用于 schema 定义和运行时校验                   | [14](/lib/08-agents/ai-agents-from-zero/14-输出解析器)、[17](/lib/08-agents/ai-agents-from-zero/17-Tools工具调用)                        |
| **JSON Schema**            | JSON 结构约束规范            | 描述字段类型、必填项、枚举值等                   | [14](/lib/08-agents/ai-agents-from-zero/14-输出解析器)                                                   |
| **response_format**        | 结果结构约束入口             | LangChain 1.x 语境中常用于约束 Agent 最终输出    | [21](/lib/08-agents/ai-agents-from-zero/21-Agent智能体)                                                  |
| **ProviderStrategy**       | 使用模型提供方原生结构化输出 | 前提是底层模型或 Provider 真支持                 | [21](/lib/08-agents/ai-agents-from-zero/21-Agent智能体)                                                  |
| **ToolStrategy**           | 借助工具调用实现结构化输出   | 常用于没有原生结构化输出能力时                   | [21](/lib/08-agents/ai-agents-from-zero/21-Agent智能体)                                                  |
