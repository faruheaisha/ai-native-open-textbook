---
source_id: SRC-DATAWHALE-HELLO-AGENTS
title: Hello-Agents：从零开始的智能体原理与实践教程
publisher: Datawhale
author: Hello-Agents contributors
source_tier: T2
source_type: open_course_and_book
canonical_url: https://github.com/datawhalechina/hello-agents
published_at: null
retrieved_at: 2026-09-08
last_verified: 2026-09-08
version: v1.0.3
status: accepted
license: CC BY-NC-SA 4.0
rights_status: noncommercial-sharealike; code-and-third-party-assets-need-item-check
language: Chinese; English introduction available
---

# Source Record：Datawhale Hello-Agents

## 身份核验

- 官方/原始身份依据：Datawhale 官方 GitHub 组织仓库与在线书。
- 版本或发布日期：本次核验最新可见 Release 为 v1.0.3，2026-07-17。
- 是否仍维护：是；Release、讨论区与主分支均有近期活动。
- 替代/迁移关系：无已确认替代关系。

## 本地快照

- 本地路径：`upstream/08-agents/hello-agents/`
- Pinned commit：`4f7682ceafe573d07cd8a7d0b89908500e83227d`（2026-09-04，main）
- 迁入日期：2026-09-10；迁入方式：blobless 克隆 + 非锥形稀疏检出
- 已迁入：`docs/`（前言 + 16 章正文 + 目录索引）、`code/`（chapter1–chapter16）
- 未迁入：`docs/images/`、`Additional-Chapter/`、`Extra-Chapter/`、`Co-creation-projects/`
- 台账：`upstream/08-agents/上游课程台账.md`

## 内容范围

- 解决的问题：从 Agent 与 LLM 基础，到范式、低代码平台、框架、自建框架、Memory/RAG、Context Engineering、Protocols、Evaluation、训练和综合案例。
- 主要概念：传统 Agent、LLM Agent、ReAct、Plan-and-Solve、Reflection、Memory、Context、MCP/A2A/ANP、Evaluation、Agentic RL。
- 教学结构：基础 → 构建 → 高级知识 → 综合案例 → 毕业与未来。
- 真实案例与资产：章节代码、低代码平台、框架案例、课后题、在线书和社区答疑。
- 不覆盖的内容：虽强调从零开始，但完整实践仍需要 Python/API 基础；不适合作为普通用户的唯一入门路径。

## 权利与复用

- 正文许可：CC BY-NC-SA 4.0。
- 代码许可：不能仅凭教材总许可假定所有依赖和片段相同；逐目录/第三方来源核验。
- 图片/GIF/视频许可：逐项核验 attribution 与第三方权利。
- Attribution 要求：署名、注明来源与改编；衍生内容遵守相同方式共享。
- Share-alike / Noncommercial：是，NC + SA 是公开教材商业化与混合许可设计的关键约束。
- 允许操作：Link / Quote / noncommercial Adapt / Fork under CC terms；商业发布与混合授权需单独评估。

## 教材价值

- 映射卷册：08、10、14，部分案例映射 04/05/06/07。
- 映射 Concepts：Agent 定义与类型、Agent Loop、Patterns、Frameworks、Memory、Context、Protocols、Evaluation。
- 映射 Tasks：从概念判定到自己实现框架和综合系统。
- 结构复用 S1：高——中文系统教程完整。
- 知识复用 S2：高，但须满足 NC-SA 并保留 source-specific taxonomy。
- 案例/资产复用 S3：中高，需逐一复现与核权。
- 建议处理：CURATE + ADAPT；若课程许可证不兼容则以 INDEX/Link 为主。

## 质量与风险

- Authority：中文开源学习社区维护，课程组织成熟；不是国际标准机构。
- Freshness：本次核验版本较新。
- Educational Value：高，中文语境、理论到工程链条完整。
- Reproducibility：中高，代码公开；模型/API/平台仍会漂移。
- Maintenance：活跃。
- 已知错误/过时项：产品例子和框架章节可能随版本快速过时；社区讨论答案不等同于课程官方结论。
- 厂商 Claim 与独立证据的区别：课程中对具体产品的描述需要回到产品官方来源或独立实验；Datawhale 的“两类 Agent 路线”等属于该课程组织视角。

## 提取的 Claims

1. 第一章用 `Environment → Sensors/Perception → Decision → Actuators/Action` 建立传统 Agent 闭环，并讨论 LLM 驱动范式。位置：[第一章 初识智能体](https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter1/%E7%AC%AC%E4%B8%80%E7%AB%A0%20%E5%88%9D%E8%AF%86%E6%99%BA%E8%83%BD%E4%BD%93.md)。
2. 全书从基础延伸到范式、低代码、框架、Memory/RAG、Context、协议、Evaluation、训练与综合案例。位置：[English Introduction](https://github.com/datawhalechina/hello-agents/blob/main/docs/README_EN.md)。
3. v1.0.3 于 2026-07-17 发布。位置：[Releases](https://github.com/datawhalechina/hello-agents/releases/tag/V1.0.3)。
4. 教材使用 CC BY-NC-SA 4.0。位置：[Repository README](https://github.com/datawhalechina/hello-agents#license)。
