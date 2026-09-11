---
source_id: SRC-AI-AGENTS-FROM-ZERO
title: AI 智能体实战速成指南（ai-agents-from-zero）
publisher: 个人开源（didilili）
author: didilili
source_tier: T2
source_type: full_stack_course_and_code
canonical_url: https://github.com/didilili/ai-agents-from-zero
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: main @ ea7f28ffe0b2c2650e3936f3bb591560225702b3
status: accepted
license: MIT（`LICENSE`，Copyright (c) 2026 didilili）
rights_status: mit
language: 中文
---

# Source Record：AI 智能体实战速成指南

## 身份核验

- 原始身份依据：仓库自述“2026 持续更新中”“全面对齐 AI 智能体 / 大模型应用开发工程师培训课表与招聘 JD”。
- 版本或发布日期：`main @ ea7f28ff`；README 说明概念篇已全部更新完毕，两个实战项目分别于 5 月 3 日、5 月 17 日完成。
- 是否仍维护：是（2026-09 有推送）。
- 替代/迁移关系：无官方对应；与 Datawhale `agentic-ai`、`hello-agents` 主题重叠，需按“平台/框架/微调全链路”与“设计模式”分工。

## 本地快照

- 本地路径：`upstream/08-agents/ai-agents-from-zero/`
- Pinned commit：`ea7f28ffe0b2c2650e3936f3bb591560225702b3`
- 迁入范围：仓库全部文本与代码（306 个文本文件 = 该仓库全部文本类 blob；`missing=0`）
- 校验：Git tree 逐路径比对，无缺失（下载阶段 `ok=125 skip=181 fail=0`，断点续传后全量齐备）
- 媒体未镜像：`images/` 等媒体资源未抓取

## 内容范围

- 解决的问题：把中文开发者从“会调 API”带到“能交付企业级 Agent 应用”，覆盖平台、框架、微调、部署与面试准备。
- 快照实读结构（33 章 + 资源页 + 2 个完整实战项目）：
  - 认知与选型：1-1 大模型认知与工程概览、1-2 提示词工程基础、1-3 RAG / 微调 / 续训与智能体选型
  - 平台与部署：2 企业/个人知识库、3 Coze & Dify 智能体开发、4–6 工作流 Python 调用与 Windows 部署、7–8 企业级部署与 Docker 排障
  - LangChain 主线：9 架构、10 快速上手、11 Model I/O、12 Ollama 本地部署、13 提示词与消息模板、14 输出解析器、15 LCEL、16 记忆与对话历史（含 Redis）、17 Tools、18 向量库与 Embedding、19 RAG、20 MCP
  - LangGraph 主线：21 Agent 智能体、22 概述、23 图与状态、24 节点/边与进阶、25 高级特性、26 多智能体与 A2A、27 Skills 与 AI 编程工具实践
  - 微调主线：28–33 微调流程、数据准备、训练原理、LLaMA-Factory 实战、评估与部署、显存优化与多卡
  - 实战项目（独立源码仓库）：`shopkeeper-agent`（电商问数 = NL2SQL + LangGraph）、`deepsearch-agents`（深度研搜 = DeepAgents 多智能体）
  - 附加资源：术语表、新手常见问题、面试题库、工具导航、更新日志、教程案例链接汇总
- 不覆盖的内容：不含多模态生成；面试题库为社区整理，不是能力标准。

## 权利与复用

- 正文许可：MIT（实读 `LICENSE` 确认）。
- 代码许可：MIT；但两个实战项目的源码在**独立仓库**，需另行核验其许可。
- 图片/视频许可：未镜像，需单独核验。
- Attribution 要求：标注 didilili 与仓库链接。
- **商业化披露**：README 含赞助商板块（优云智算）与带返利参数的注册链接。使用时须与正文内容分离，不得在教材中复制该链接。

## 教材价值

- 映射卷册：08（主）；10（MCP、Memory、Skills）；03（平台生态）；13（本地部署与微调）。
- 映射 Concepts：Agent、Agent Loop、Tool Use、Memory、RAG、MCP、A2A、Multi-Agent、Skill、Fine-tuning、Deployment、LCEL。
- 映射 Tasks：Code、Research、Analysis、Automation。
- 结构复用 S1：高——"平台 → 框架 → 微调 → 部署"的四段式是全链路中文教程中最完整的一种编排，可直接对照卷 08 的章节顺序。
- 知识复用 S2：中高——第 20 章（MCP）与第 27 章（Skills）可与卷 10 衔接；但这部分版本敏感，需回原始规范核验。
- 案例/资产复用 S3：中高——两个实战项目是完整的交付样例，建议评估为 Canonical Case 候选（需核验独立仓库许可与可复现性）。
- 建议处理：CURATE（章节结构、案例候选）+ INDEX（版本敏感的操作细节）。

## 质量与风险

- Authority：个人开源项目，作者自述对标招聘 JD；无机构背书。
- Freshness：2026 年活跃更新；但 Coze / Dify / LLaMA-Factory 等外部工具版本变化快。
- Educational Value：高——中文长链路教程中罕见地覆盖到“微调 + 部署 + 排障”。
- Reproducibility：中——依赖外部平台账号与 API；部分章节依赖 Windows 环境。
- Maintenance：活跃。
- 已知错误/过时项：未实测；章节标题与目录随生态更新而变动。
- 厂商 Claim 与独立证据的区别：面试题库与“全网最系统”等自述属营销表述，不作为教材结论。

## 与相邻来源的边界

| 来源 | 分工 |
|---|---|
| 本来源 | 平台 / 框架 / 微调 / 部署的**全链路**与工程操作 |
| Datawhale `agentic-ai` | 设计模式与**工程验收**（evals、错误分析、组件级评估） |
| Datawhale `hello-agents` | **从零实现** Agent 的技术主线 |

## 提取的 Claims

1. 仓库定位为“系统教程 + 可跑源码 + 面试题库 + 企业级实战项目”，对标 AI 智能体 / 大模型应用开发工程师岗位。位置：`README.md` 首段。
2. 概念篇已全部更新完毕；两个实战项目（电商问数、深度研搜）分别于 5 月 3 日与 5 月 17 日完成。位置：`README.md` 更新说明。
3. 教程覆盖 LangChain / LangGraph / Coze / Dify / MCP / Skills / LLM / RAG / 提示词，并含企业级部署与微调。位置：`README.md` 教程亮点与仓库目录。
4. 仓库许可为 MIT，版权人 didilili。位置：`LICENSE`。
5. README 含赞助商板块与带返利参数的注册链接。位置：`README.md` 项目赞助。
