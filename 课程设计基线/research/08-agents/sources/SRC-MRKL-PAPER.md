---
source_id: SRC-MRKL-PAPER
title: "MRKL Systems: A modular, neuro-symbolic architecture that combines large language models, external knowledge sources and discrete reasoning"
publisher: arXiv
author: Ehud Karpas et al.
source_tier: T1
source_type: research_paper
canonical_url: https://arxiv.org/abs/2205.00445
published_at: 2022-05-01
retrieved_at: 2026-09-08
last_verified: 2026-09-08
version: arXiv record; version must be pinned before quotation
status: accepted
license: paper reuse license not yet recorded
rights_status: link-and-paraphrase; figures-and-long-excerpts-pending-license-check
language: English
---

# Source Record：MRKL Systems

## 身份核验

- 官方/原始身份依据：作者论文的 arXiv 记录。
- 版本或发布日期：初次提交 2022-05-01。
- 是否仍维护：论文作为稳定研究来源使用；具体实现和服务不视为当前教程。
- 替代/迁移关系：MRKL 是模块化系统架构研究，不等同于今天任何一个 function-calling SDK。

## 内容范围

- 解决的问题：语言模型的知识、计算和可更新性存在局限，需要把模型与外部知识源、离散推理模块组合成系统。
- 主要概念：router、expert modules、external knowledge、discrete reasoning、neuro-symbolic architecture。
- 真实案例与资产：论文中的 Jurassic-X 实现和示例。
- 不覆盖的内容：现代工具调用协议、持久 Agent runtime、HITL、生产权限与完整评测体系。

## 权利与复用

- 正文许可：待记录论文具体许可；当前只链接、有限短引和转述。
- 代码许可：本记录不对任何实现仓库授予复用结论。
- 图片/GIF/视频许可：不直接镜像论文图，优先制作教材自绘系统图。
- Attribution 要求：作者、论文名、版本与链接。
- 允许操作：Link / Paraphrase；Quote / Adapt figures / Mirror 待核权。

## 教材价值

- 映射卷册：08、10、13。
- 映射 Concepts：Model vs System、Router、Tool/Module、External Knowledge、Verification。
- 映射 Tasks：计算、知识检索、组合式问答。
- 结构复用 S1：低。
- 知识复用 S2：高。
- 案例/资产复用 S3：中，需以现代接口重做。
- 建议处理：CURATE + ADAPT。

## 质量与风险

- Authority：原始论文。
- Freshness：系统思想稳定；具体模型、产品和实现已具历史性。
- Educational Value：高，能证明“语言模型能力”与“任务系统能力”不是同一层。
- Reproducibility：中低；原始产品实现不是本课程的默认复现目标。
- 已知错误/过时项：不能把论文架构写成现代 Agent 的必要结构，也不能把论文结果外推为所有工具增强系统的普遍收益。
- 厂商 Claim 与独立证据的区别：论文包含具体系统说明与实验，教材只吸收经其范围支持的模块化观点。

## 提取的 Claims

1. 论文把语言模型置于由外部知识源和离散推理模块共同组成的系统架构中，而非假设单一模型承担全部能力。位置：[Abstract](https://arxiv.org/abs/2205.00445)。
2. MRKL 的教学价值是解释模块化与路由，不是为现代 Agent 给出唯一组件清单。

