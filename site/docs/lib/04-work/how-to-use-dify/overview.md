---
title: "Dify 从入门到实战：零基础也能做 AI 应用"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/README.md"
sourceRel: "README.md"
rawUrl: "/raw/04-work/how-to-use-dify/README.md"
sourceSha256: "03c883ab19ec55268e05a9ed6adc0f50069dc6171bb283d2720c570aa744b4bc"
pageSha256: "03c883ab19ec55268e05a9ed6adc0f50069dc6171bb283d2720c570aa744b4bc"
contentMode: "local-full"
zh: ""
---

# Dify 从入门到实战：零基础也能做 AI 应用

> 一个面向中文初学者、产品经理、运营、开发者和自动化爱好者的 Dify 系统教程。目标不是只教你点按钮，而是帮你真正理解：什么时候用 Chatflow，什么时候用 Workflow，什么时候做知识库，什么时候做 Agent，以及怎样把一个 Dify 应用发布、调试、交付给真实用户。

## 这个仓库解决什么问题

很多人第一次打开 Dify，会卡在这些问题上：

- 我应该创建 Chatbot、Agent、Chatflow 还是 Workflow？
- 知识库为什么搜不到正确答案？
- 工作流节点很多，但不知道每个节点应该负责什么。
- Prompt 写了很多，效果还是不稳定。
- 做出了 Demo，但不知道怎么发布给别人用。
- 自部署能跑起来，但不知道端口、环境变量、模型、向量库、备份该怎么理解。

这个仓库把 Dify 当成一个可以交付的 AI 应用平台来讲，从最小可用应用开始，逐步进入知识库、工作流、Agent、工具、API、自部署和生产交付。

## 从这里开始

如果你是第一次接触 Dify，先读这 4 个页面：

1. [START_HERE.md](https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/START_HERE.md)：30 分钟完成第一个 Dify 应用。
2. [docs/chapters/01-认识-dify.md](/lib/04-work/how-to-use-dify/docs-chapters-01-认识-dify)：理解 Dify 到底是什么。
3. [docs/chapters/02-应用类型选择.md](/lib/04-work/how-to-use-dify/docs-chapters-02-应用类型选择)：选对 Chatflow、Workflow、Agent。
4. [docs/chapters/03-第一个聊天助手.md](/lib/04-work/how-to-use-dify/docs-chapters-03-第一个聊天助手)：做一个真正可用的 AI 助手。

如果你已经会基础操作，直接看：

- [docs/chapters/06-知识库-rag.md](/lib/04-work/how-to-use-dify/docs-chapters-06-知识库-rag)：知识库和 RAG 实战。
- [docs/chapters/07-workflow-工作流.md](/lib/04-work/how-to-use-dify/docs-chapters-07-workflow-工作流)：Workflow 节点设计方法。
- [docs/chapters/08-agent-和工具调用.md](/lib/04-work/how-to-use-dify/docs-chapters-08-agent-和工具调用)：Agent、工具和多步任务。
- [docs/chapters/10-api-发布和集成.md](/lib/04-work/how-to-use-dify/docs-chapters-10-api-发布和集成)：把 Dify 应用接入网站、系统或自动化流程。

## 你可以直接拿走什么

如果你正在做 Dify 项目，可以直接从下面这些内容开始用：

| 你现在遇到的问题 | 直接看这里 | 能拿到什么 |
| --- | --- | --- |
| 不知道先建哪种应用 | [应用类型选择](/lib/04-work/how-to-use-dify/docs-chapters-02-应用类型选择) | Chatflow、Workflow、Agent 的选择标准 |
| 想快速做出第一个应用 | [30 分钟入门](https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/START_HERE.md) | 一个可测试的资料问答助手 |
| 知识库回答不准 | [知识库 RAG](/lib/04-work/how-to-use-dify/docs-chapters-06-知识库-rag) + [RAG 清单](/lib/04-work/how-to-use-dify/cheatsheets-rag-checklist) | 文档整理、知识库描述、检索调试方法 |
| 工作流节点越做越乱 | [Workflow 工作流](/lib/04-work/how-to-use-dify/docs-chapters-07-workflow-工作流) + [节点清单](/lib/04-work/how-to-use-dify/cheatsheets-workflow-node-checklist) | 节点拆分、变量传递、错误分支设计 |
| 想做能调用工具的助手 | [Agent 和工具调用](/lib/04-work/how-to-use-dify/docs-chapters-08-agent-和工具调用) | 工具边界、调用规则、迭代次数控制 |
| 想把 Demo 交付给别人 | [API 发布和集成](/lib/04-work/how-to-use-dify/docs-chapters-10-api-发布和集成) + [生产检查清单](/lib/04-work/how-to-use-dify/docs-reference-production-checklist) | 发布、API、安全、成本和上线检查 |

## 学完之后能做什么

这个仓库不是只整理菜单位置，而是围绕“做出可用 AI 应用”组织内容。按路线学完后，你应该能完成这些事情：

- 做一个能明确拒答的资料问答助手。
- 为公司 FAQ、产品文档、课程资料搭建知识库。
- 设计一个输入清楚、节点职责单一的 Workflow。
- 判断一个需求该用 Chatflow、Workflow 还是 Agent。
- 写出有边界、有格式、有变量的 Prompt。
- 把 Dify 应用发布成 Web App 或 API。
- 自部署 Dify，并知道上线前要检查哪些风险。

## 内容地图

| 模块 | 适合谁 | 你会得到什么 |
| --- | --- | --- |
| [入门路线](https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/START_HERE.md) | 第一次使用 Dify 的人 | 30 分钟做出第一个应用 |
| [系统教程](https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/docs/chapters/README.md) | 想完整掌握 Dify 的人 | 从概念到上线的完整知识树 |
| [案例库](https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/docs/use-cases/README.md) | 想照着做项目的人 | 可复用的业务场景拆解 |
| [速查表](https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/cheatsheets/README.md) | 已经在使用 Dify 的人 | 应用类型、节点、RAG、发布检查清单 |
| [模板库](https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/templates/README.md) | 想快速启动的人 | Prompt、知识库说明、工作流设计模板 |
| [练习题](https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/exercises/README.md) | 想真正练会的人 | 从新手到进阶的任务练习 |
| [排错指南](/lib/04-work/how-to-use-dify/docs-troubleshooting) | 遇到问题的人 | 常见故障定位路径 |

## 推荐学习路线

### 路线 A：零基础入门

1. 读 [START_HERE.md](https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/START_HERE.md)。
2. 完成 [练习 01：个人助手](/lib/04-work/how-to-use-dify/exercises-01-build-personal-assistant)。
3. 学习应用类型选择：[docs/chapters/02-应用类型选择.md](/lib/04-work/how-to-use-dify/docs-chapters-02-应用类型选择)。
4. 做一个简单 Chatflow：[docs/chapters/04-chatflow-对话流.md](/lib/04-work/how-to-use-dify/docs-chapters-04-chatflow-对话流)。

### 路线 B：知识库问答

1. 学习 [docs/chapters/06-知识库-rag.md](/lib/04-work/how-to-use-dify/docs-chapters-06-知识库-rag)。
2. 使用 [templates/knowledge-base-description-template.md](/lib/04-work/how-to-use-dify/templates-knowledge-base-description-template) 写知识库说明。
3. 完成 [练习 02：企业 FAQ 知识库](/lib/04-work/how-to-use-dify/exercises-02-build-faq-rag)。
4. 对照 [cheatsheets/rag-checklist.md](/lib/04-work/how-to-use-dify/cheatsheets-rag-checklist) 调试召回效果。

### 路线 C：工作流自动化

1. 学习 [docs/chapters/07-workflow-工作流.md](/lib/04-work/how-to-use-dify/docs-chapters-07-workflow-工作流)。
2. 使用 [templates/workflow-design-template.md](/lib/04-work/how-to-use-dify/templates-workflow-design-template) 设计节点。
3. 完成 [练习 03：内容改写工作流](/lib/04-work/how-to-use-dify/exercises-03-content-workflow)。
4. 学习 API 发布：[docs/chapters/10-api-发布和集成.md](/lib/04-work/how-to-use-dify/docs-chapters-10-api-发布和集成)。

### 路线 D：自部署和生产使用

1. 学习 [docs/chapters/11-自部署-docker-compose.md](/lib/04-work/how-to-use-dify/docs-chapters-11-自部署-docker-compose)。
2. 对照 [docs/reference/production-checklist.md](/lib/04-work/how-to-use-dify/docs-reference-production-checklist)。
3. 学习备份、升级、模型密钥和权限管理。
4. 把测试应用迁移到生产空间。

## 当前内容

- [docs/tutorial-plan.md](/lib/04-work/how-to-use-dify/docs-tutorial-plan)：完整学习大纲。
- [docs/glossary.md](/lib/04-work/how-to-use-dify/docs-glossary)：Dify 常见术语解释。
- [docs/project-standard.md](/lib/04-work/how-to-use-dify/docs-project-standard)：本仓库内容质量标准。
- [docs/content-matrix.md](/lib/04-work/how-to-use-dify/docs-content-matrix)：后续扩展规划。
- [docs/troubleshooting.md](/lib/04-work/how-to-use-dify/docs-troubleshooting)：常见问题排查。
- [docs/reference/official-links.md](/lib/04-work/how-to-use-dify/docs-reference-official-links)：官方资料入口。

## 本仓库使用的主要资料

本仓库内容以 Dify 官方文档为基础，并整理成中文学习路径。Dify 版本更新很快，涉及界面名称、节点能力、部署命令和环境变量时，请优先核对官方文档：

- [Dify Docs](https://docs.dify.ai/)
- [Dify GitHub](https://github.com/langgenius/dify)
- [Dify Cloud Studio](https://cloud.dify.ai/)
- [Dify Marketplace](https://marketplace.dify.ai/)

## 适合的读者

- 想用 Dify 做第一个 AI 应用的新手。
- 想把公司文档做成知识库问答的人。
- 想用工作流处理表单、文本、客服、运营任务的人。
- 想把 Dify 应用通过 API 接入已有系统的开发者。
- 想自部署 Dify 并交付给团队使用的人。

## 不适合的读者

- 只想看概念新闻，不准备动手。
- 已经非常熟悉 Dify 源码并只想看底层实现。
- 希望本仓库替代官方文档。这里是学习路径和实战整理，官方文档仍然是最终准绳。

## 贡献

欢迎补充案例、修正过时内容、提交更好的模板。请先阅读：

- [CONTRIBUTING.md](https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/CONTRIBUTING.md)
- [docs/project-standard.md](/lib/04-work/how-to-use-dify/docs-project-standard)
- [docs/content-matrix.md](/lib/04-work/how-to-use-dify/docs-content-matrix)

## 后续会补充

- 更多中文实战案例。
- 可导入的 Dify DSL 示例。
- 不同行业知识库模板。
- 自部署安全和监控专题。
- Dify + API + 自动化平台集成案例。
