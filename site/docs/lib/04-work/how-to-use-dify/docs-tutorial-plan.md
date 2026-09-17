---
title: "Dify 完整学习大纲"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/docs/tutorial-plan.md"
sourceRel: "docs/tutorial-plan.md"
rawUrl: "/raw/04-work/how-to-use-dify/docs/tutorial-plan.md"
sourceSha256: "adfa79d71896142839da811ba25bc0600320c7331adc3ce1a5d9ba0d1f246056"
pageSha256: "adfa79d71896142839da811ba25bc0600320c7331adc3ce1a5d9ba0d1f246056"
contentMode: "local-full"
zh: ""
---

# Dify 完整学习大纲

## 第一阶段：建立正确心智

目标：知道 Dify 是什么，知道什么时候用它。

你需要掌握：

- Dify 是 AI 应用构建平台，不只是聊天机器人页面。
- Dify 应用可以通过 Web、API、MCP Server 等方式发布。
- Workflow 和 Chatflow 是更推荐理解的主线能力。
- Chatbot、Agent、Text Generator 更像简化入口或特定模式。

交付物：

- 一个最小聊天助手。
- 一张应用类型选择表。

## 第二阶段：做出稳定回答

目标：让模型不要乱答、不要跑题、不要输出不可用内容。

你需要掌握：

- Prompt 的角色、任务、约束、格式。
- 变量的输入类型和使用边界。
- Debug Preview 的测试方法。
- 多模型对比的价值。

交付物：

- 一个带变量的问答助手。
- 一组测试问题。

## 第三阶段：接入知识库

目标：让回答基于你的资料，而不是模型记忆。

你需要掌握：

- RAG 的基本流程：切分、向量化、召回、重排、生成。
- 知识库描述的作用。
- Top K、Score Threshold、Rerank 的基本判断。
- 文档质量对问答效果的影响。

交付物：

- 一个企业 FAQ 知识库。
- 一个 RAG 调试记录表。

## 第四阶段：掌握工作流

目标：把复杂任务拆成稳定节点。

你需要掌握：

- Start、LLM、Knowledge Retrieval、IF/ELSE、Code、HTTP、Answer 等节点。
- 单节点职责。
- 变量传递。
- 错误分支。
- 可观测的中间结果。

交付物：

- 一个内容生成工作流。
- 一个带分支的审核流程。

## 第五阶段：使用 Agent 和工具

目标：让 AI 在明确边界内调用工具完成任务。

你需要掌握：

- Agent 与 Workflow 的区别。
- 工具描述如何影响调用。
- 最大迭代次数、延迟和成本。
- OpenAPI 工具、插件工具、Workflow as Tool、MCP 工具的区别。

交付物：

- 一个可查外部数据的助手。
- 一个复用 Workflow as Tool 的 Agent。

## 第六阶段：发布和集成

目标：让应用进入真实业务。

你需要掌握：

- Web App 发布。
- API 调用。
- 鉴权和密钥管理。
- 用户输入限制。
- 日志和调试。

交付物：

- 一个可被网页或自动化脚本调用的 Dify 应用。

## 第七阶段：自部署和生产化

目标：让 Dify 可以在团队或公司内部稳定运行。

你需要掌握：

- Docker Compose 部署。
- 模型供应商配置。
- 文件上传限制。
- 数据备份。
- 升级策略。
- 权限和空间管理。

交付物：

- 一个自部署实例。
- 一份上线前检查清单。
