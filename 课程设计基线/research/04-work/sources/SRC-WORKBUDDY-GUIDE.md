---
source_id: SRC-WORKBUDDY-GUIDE
title: WorkBuddy 实战蓝皮书与社区案例集（WorkBuddyGuide）
publisher: AlephAITech / WorkBuddy Guide Contributors
author: WorkBuddy Guide Contributors 与社区投稿者
source_tier: T2
source_type: community_guide_and_case_collection
canonical_url: https://workbuddy.homes/
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: main @ 814ec835e9dae4a89da368fe208425ff50e121fe（2026-09-04）
status: accepted
license: MIT
rights_status: docs-and-code-mit; case-media-and-personal-data-need-item-check
language: zh-CN（另有 README_en.md）
---

# Source Record：WorkBuddyGuide

## 身份核验

- 官方/原始身份依据：站点 `workbuddy.homes` 页面源码中的仓库链接指向 `github.com/AlephAITech/WorkBuddyGuide`；仓库公开、未归档，默认分支 `main`，版权署名 WorkBuddy Guide Contributors。
- 版本或发布日期：`main @ 814ec835`（2026-09-04）；快照日期 2026-09-10。
- 是否仍维护：是。有 CONTRIBUTING 流程、PR 审核、站点构建与 vitest 配置。
- 替代/迁移关系：与 WorkBuddy 官方文档互补，不替代；社区案例提供官方文档不覆盖的真实任务证据。

## 本地快照

- 本地路径：`upstream/04-work/workbuddy-guide/`
- Pinned commit：`814ec835e9dae4a89da368fe208425ff50e121fe`
- 迁入日期：2026-09-10；迁入方式：GitHub API 逐文件下载（git 协议在本机网络下不稳定）
- 迁入范围：`docs/**` 全部 Markdown 53 篇 + `.vitepress/sidebar.ts`、`config.mts` + 根文件，共 58 个文件
- 未迁入：图片、字体、二维码等资产
- 台账：`upstream/04-work/上游资源台账.md`

## 内容范围

- 解决的问题：把 WorkBuddy 从安装入门教到“把案例变成自己的工作系统”，并以社区投稿方式持续收集真实任务。
- 主要概念：Workspace、Task、专家/专家团、Skill、Connector、IM 助理、外部 API、自动化任务、多 Agent 工作小队、GEO。
- 课程结构：第一篇 使用手册（10 章 + 课外阅读）；第二篇 案例篇；第三篇 进阶篇；第四篇 岗位与行业落地；附录 A/B。案例集含投稿指南与 7 个社区案例。
- 真实案例与资产：7 个投稿案例（上市公司年报研究、每日 AI 资讯、2025 showreel、119 份门店 Excel 清洗与看板、vibe 简历、公众号排版发布、ima 知识库），每案含提示词原文与交付物描述。
- 不覆盖的内容：不是官方 API 参考；不保证界面与 Skill 名称跨版本稳定；不覆盖豆包/其他产品的对照。

## 权利与复用

- 正文许可：MIT（`LICENSE` 实读）。
- 代码许可：仓库代码同为 MIT。
- 图片/GIF/视频许可：快照未包含媒体；社区案例封面、截图与其中的真实数据需逐项核验。
- Attribution 要求：保留版权与许可声明；引用社区案例需保留原作者署名。
- Share-alike / Noncommercial：无 ShareAlike；无 Noncommercial。
- 允许操作：Link / Quote / Adapt / Mirror / Fork（保留声明）；案例媒体单独判断。

## 教材价值

- 映射卷册：04（主）；08（工作小队案例）；10（Skill / Connector 能力体系案例）；11（自动化与长期任务）。
- 映射 Concepts：Workspace、Task Specification、Artifact、Verification、Skill、Connector、Automation、Multi-Agent。
- 映射 Tasks：Document、Analysis、Research、Creation、Automation、Knowledge。
- 结构复用 S1：高——“场景 → 任务 → Skill → 操作 → 提示词 → 验收”正是卷 04 需要的任务闭环。
- 知识复用 S2：中——产品操作细节会漂移，吸收任务结构与验收标准。
- 案例/资产复用 S3：中高——MIT 允许改编，但需复现验证并保留署名。
- 建议处理：ADAPT（案例结构与任务链）+ INDEX（易漂移的产品操作细节）。

## 质量与风险

- Authority：社区维护，非官方；但案例有署名与审核流程。
- Freshness：产品界面与 Skill 名称变化快；引用必须带快照日期。
- Educational Value：高——真实任务、真实交付物、真实提示词。
- Reproducibility：中——依赖 WorkBuddy 产品环境；部分案例为教学用模拟数据。
- Maintenance：活跃。
- 已知错误/过时项：未逐案例复现，全部标 EVL-1 起步。
- 厂商 Claim 与独立证据的区别：站点整体为 WorkBuddy 生态视角，产品能力评价不能作为独立事实；跨产品比较需另找中立来源。

## 提取的 Claims

1. 站点提供 7 个社区投稿案例，覆盖数据分析、自媒体、知识管理、求职、视频等场景。位置：`docs/cases/submissions/`（快照内 7 个目录）。
2. 每个案例必须写清场景、Skills、操作过程、实际效果与验收标准。位置：`docs/cases/index.md`（“如何提交 Case”）。
3. 经二次验证的经典案例可在保留原作者署名前提下进入蓝皮书正文。位置：`docs/cases/index.md`（“从社区案例到蓝皮书正文”）。
4. 仓库许可为 MIT。位置：`LICENSE`（快照内实读）。