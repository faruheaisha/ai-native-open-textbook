---
title: "大模型应用开发 -上下文工程与运行空间实践指南"
sourceId: "10-context-memory/practical-guide-context-engineering"
sourceTitle: "大模型应用开发 -上下文工程与运行空间实践指南"
sourceKind: "工程手册"
licenseLabel: "仅引用"
lang: "中文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering"
entryUrl: "https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/record/README_Table.md"
sourceRel: "record/README_Table.md"
rawUrl: "/raw/10-context-memory/practical-guide-context-engineering/record/README_Table.md"
sourceSha256: "aebcca046fa35221bd46926ba6930d9a0e7ed383154856203bc370dd5fcac033"
pageSha256: "aebcca046fa35221bd46926ba6930d9a0e7ed383154856203bc370dd5fcac033"
contentMode: "local-full"
zh: ""
---

# 大模型应用开发 -上下文工程与运行空间实践指南

## 📖 内容导航
| 章节 | 关键内容 | 状态 |
| --- | --- | --- |
| [上下文组成](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/record/docs/前言.md) | 解释上下文的七个核心组成部分，以及为什么它们决定了大模型应用的效果 | 🚧 |
| <strong>第一部分：上下文工程基础技术</strong> |  |  |
| [第一章 数据持久化](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/record/docs/chapter1/第一章%20初识智能体.md) | 介绍传统数据库（MySQL、MongoDB、Redis 等）在大模型应用中的作用：状态存储、用户数据、日志记录 | 🚧 |
| [第二章 向量存储和嵌入模型](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/record/docs/chapter2/第二章%20智能体发展史.md) | 语义检索的底层原理、嵌入模型的选择与评测、主流向量数据库的特性 | 🚧 |
| [第三章 知识图谱](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/record/docs/chapter3/第三章%20大语言模型基础.md) | 知识的结构化表达、实体关系抽取、知识图谱与向量检索的互补 | 🚧 |
| [第四章 RAG技术](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/record/docs/chapter4/第四章%20智能体经典范式构建.md) | 从检索增强生成（RAG）的流程拆解到优化方法，涵盖索引构建、检索策略、融合方式 | ✅ |
| <strong>第二部分：上下文组成工程实践</strong> |  |  |
| [第五章 系统提示词模块](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/record/docs/chapter5/第五章%20基于低代码平台的智能体搭建.md) | 系统提示词的设计方法：输出规范、边界约束、多角色指令，如何平衡稳定性与灵活性 | 🚧 |
| [第六章 工具管理模块](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/record/docs/chapter6/第六章%20框架开发实践.md) | 工具（API、函数、MCP）的注册与调度，调用结果的解析与注入，常见框架中的实现方式 | ✅ |
| [第七章 用户记忆模块](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/record/docs/chapter7/第七章%20构建你的Agent框架.md) | 长期/短期记忆管理，用户画像构建，记忆存储与检索策略，隐私与安全考量 | 🚧 |
| [第八章 会话存储模块](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/record/docs/chapter8/第八章%20推理与规划.md) | 会话历史的截断、压缩与检索；如何在有限上下文窗口内保留对话连贯性 | ✅ |
| [第九章 结构化输出模块](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/record/docs/chapter9/第九章%20记忆与工具.md) | JSON/XML/CSV 等结构化输出的约束与解析，如何让 LLM 严格遵循格式要求 | ✅ |
| [第十章 相关上下文模块](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/record/docs/chapter10/第十章%20智能体通信协议.md) | 如何动态选择与任务最相关的上下文（检索、排序、过滤、融合） | 🚧 |
| [第十一章 LLM模块](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/record/docs/chapter11/第十一章%20多智能体系统.md) | 上下文工程中LLM的设计架构 | ✅ |
| <strong>第三部分：上下文管理</strong> |  |  |
| [第十二章 上下文管理](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/record/docs/chapter12/第十二章%20智能体性能评估.md) | 上下文裁剪、压缩、去重、隔离（quarantine）等策略，性能指标与评估方法 | ✅ |
| [第十三章 Token压缩策略](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/record/docs/chapter13/第十三章%20智能旅行助手.md) | 各类压缩方法对比：摘要、向量聚合、句子窗口检索，结合真实应用案例 | ✅  |
| <strong>第四部分：Agent架构设计</strong> |  |  |
| <strong>第五部分：Agent评估</strong> |  |  |
| <strong>第六部分：上下文工程实践项目</strong> |  |  |
