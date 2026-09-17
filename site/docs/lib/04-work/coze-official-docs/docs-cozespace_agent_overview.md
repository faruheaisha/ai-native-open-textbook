---
title: "扣子 Coze 官方文档"
sourceId: "04-work/coze-official-docs"
sourceTitle: "扣子 Coze 官方文档"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: ""
entryUrl: null
sourceRel: "docs/cozespace_agent_overview.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozespace_agent_overview.md"
sourceSha256: "dd33a8b4cc5a27446bc687ffd38572fabe91da0029eff38450856b256df054e2"
pageSha256: "dd33a8b4cc5a27446bc687ffd38572fabe91da0029eff38450856b256df054e2"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

扣子支持创建和管理多个 AI Agent，你可以把它理解为**组建一支 AI 团队**——每个成员各司其职，和你一起协同完成工作。

## Agent 类型介绍 \{#8e1e368a\}

扣子提供统一入口，将不同 Agent 汇聚到同一会话中，统一管理、调用和协作。扣子 Agent 是扣子原生智能体，内置长期记忆、日程、邮箱、云电脑等扣子工作台能力，适合开箱即用；三方精选 Agent 和本地 Agent 则更偏向接入第三方 Agent 框架，如 OpenClaw、Claude Code、Codex CLI 和 Hermes。三方精选 Agent 运行在扣子的云设备中，24 小时稳定在线；本地 Agent 运行在你的电脑上，可以访问本机文件、代码、软件和系统资源。具体对比如下表所示：

| **Agent 类型**  | **简介**  | **适用场景**  | **支持的框架**  |
| --- | --- | --- | --- |
| **扣子 Agent**  | 扣子原生 Agent，内置长期记忆、日程、邮箱、云电脑、云手机等完整扣子工作台能力，能够持续积累你的偏好与知识。 | 内容创作、日常办公、行业助手等大多数场景。  | 扣子 Agent  | \
| | | | | \
| | 提供投资顾问、小红书创作、数据分析等多种职业模板，开箱即用。  | | |
| **三方精选 Agent**  | 将 Claude Code、Codex CLI、OpenClaw、Hermes 框架部署在扣子云电脑中运行，不依赖本机在线，支持稳定运行、统一部署和团队协作。 | 需要使用主流 Agent 框架，但不想自己维护服务器或本地环境。  | OpenClaw、Claude Code、Codex CLI、Hermes  | \
| | | | | \
| | 模型调用、云电脑资源、权限、计费、限流等均由扣子统一调控。  | | |
| **本地 Agent**  | 接入你本机已在运行的 Claude Code、Codex CLI、OpenClaw、Hermes，复用本地项目、工具链和私有配置，可访问本机文件、代码和系统资源。  | 已在本地部署主流 Agent  | OpenClaw、Claude Code、Codex CLI、Hermes  |

## 支持的框架 \{#c8ea08e5\}

Agent 类型决定运行环境，框架则决定能力侧重点和适用任务。目前扣子支持基于如下 Agent 框架，创建 Agent。

::::cols
@col 25
**扣子 Agent**

工业级 Harness，原生适配国产大模型，具备完整工具调用、记忆与云资源能力。

适用于：内容创作、办公协作、行业专家助手

@col 25
**OpenClaw**

开源社区驱动的强大个人助理，支持自定义插件与灵活拓展。

适用于：长任务、技能和多渠道自动化

@col 25
**Claude Code**

命令行编程智能体，擅长理解代码库、编辑文件和处理复杂开发任务。

适用于：代码协作和工程执行

@col 25
**Codex CLI**

可以在本地终端运行的编程智能体，能够在指定目录中读取、修改和运行你机器上的代码。

适用于：代码协作和工程执行

@col 25
**Hermes**

具备长期记忆和自进化能力的 Agent ，能够在持续任务中沉淀经验、生成技能。

适用于：知识沉淀与技能迭代
::::

## Agent 能力对比 \{#5e5562d6\}

三种 Agent 具备的扣子工作台能力边界不同，核心功能说明如下：

| **能力**  | **扣子 Agent**  | **三方精选 Agent**  | **本地 Agent**  |
| --- | --- | --- | --- |
| 日程  | ✔️  | ➖  | ➖  |
| 邮箱  | ✔️  | ➖  | ➖  |
| 文件  | ✔️  | ✔️  | ➖  |
| 渠道  | ✔️  | ➖  | ➖  |
| 技能  | ✔️  | ✔️  | ➖  |
| 云手机  | ✔️  | ➖  | ➖  |
| 云电脑  | ✔️  | ✔️  | ➖  |
| 后台任务  | ✔️  | ➖  | ➖  |
| 分享对话  | ✔️  | ✔️  | ✔️  |
| 搜索对话历史  | ✔️  | ✔️  | ✔️  |
| 模型切换  | ✔️  | ✔️  | ➖  |
| 协作（加入项目）  | ✔️  | ✔️  | ✔️  |
| 桌面端本地文件操作  | ✔️  | ➖  | ➖  |

## 多人多 Agent 协作 \{#bfae8b36\}

扣子支持以项目维度展开协作。在项目中，你可以和 Agent 围绕一个主题持续沟通，也可以邀请人类成员和多个 Agent 加入，一起补充信息、分配任务、确认结果并沉淀产出。项目成员可以负责需求沟通、任务分配、结果确认和决策把关；不同 Agent 则根据各自能力承担内容创作、代码开发、本地操作等具体执行工作。例如：

* 多位团队成员可以共同参与项目，分别提出需求、补充背景、评审结果或做关键决策。
* 让多个 Agent 分工处理复杂任务，例如资料整理、内容生成、代码开发、审核发布等。
* 和 Agent 围绕固定主题长期沟通，保留独立的讨论记录。

通过在一个项目中同时组织多个人类成员和多个 Agent，扣子可以支持更接近真实团队协作的工作方式，让复杂任务在同一上下文中被拆解、执行、评审和交付。

## Agent 管理与设置 \{#12b4930f\}

扣子提供统一的 Agent 管理能力，支持对不同类型 Agent 进行集中配置与管理。更多信息，请参考Agent 管理与设置。

* Agent 信息：查看或修改 Agent 名称和介绍。
* 技能：为 Agent 添加技能，使其能够按需、稳定地执行专业任务。
* 模型：根据不同业务场景，为 Agent 灵活切换大语言模型。
* 渠道：将当前 Agent 一键发布至飞书、微信渠道，实现多端直接对话。
* 授权文件夹 ：管理 Agent 可访问的本地文件夹与文件权限。

## 常见问题 \{#6e5bc0d7\}

* 扣子 Agent、三方精选 Agent 和本地 Agent 有什么区别？
* 如何选择扣子 Agent、三方精选 Agent 和本地 Agent ？
* 三方精选 Agent 和本地 Agent 有什么区别？
* 创建 Agent 之后如何查看 Agent 类型？
* 为什么我的 Agent 必须部署在云电脑上？
