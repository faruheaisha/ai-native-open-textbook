---
title: "Workflow 节点设计速查表"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/README.md"
zh: ""
---

# Workflow 节点设计速查表

## 节点设计原则

- 一个节点只做一件事。
- 节点输入要明确。
- 节点输出要可被下游稳定使用。
- 重要节点要能单独测试。
- 可能失败的节点要设计错误路径。

## 常见节点职责

| 节点 | 适合做什么 | 不适合做什么 |
| --- | --- | --- |
| Start | 收集用户输入 | 处理复杂逻辑 |
| LLM | 理解、生成、分类、抽取 | 直接访问外部系统 |
| Knowledge Retrieval | 从知识库找资料 | 替代 Prompt 约束 |
| IF/ELSE | 判断分支 | 承载复杂业务规则 |
| Code | 格式转换、轻量计算 | 长时间任务、复杂服务 |
| HTTP Request | 调用外部 API | 存放密钥和复杂重试 |
| Answer | 汇总最终输出 | 再做复杂推理 |

## 工作流上线前检查

- 每个输入变量都有名称、说明和示例。
- 每个 LLM 节点都有稳定输出格式。
- 下游节点没有依赖模糊文本。
- 至少测试正常路径、空输入、错误输入、外部服务失败。
- 用户能看懂失败提示。
