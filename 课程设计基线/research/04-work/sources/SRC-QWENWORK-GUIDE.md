---
source_id: SRC-QWENWORK-GUIDE
title: 千问办公绿皮书（QwenWork Greenbook / QwenWorkGuide）
publisher: 社区项目（仓库 owner：wangxiaoshuai1998）
author: 绿皮书社区贡献者，正文自述“基于钉钉知识库导出”
source_tier: T2
source_type: community_handbook_and_case_collection
canonical_url: https://qwenwork.ink/greenbook/ ; https://github.com/wangxiaoshuai1998/QwenWorkGuide
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: main @ 002f698a68b69d3635acf6be0d6e27db69069071（2026-08-05）
status: accepted
license: MIT（仓库 LICENSE 实读；版权行写作 “Copyright (c) 2026 WorkBuddy Guide Contributors”）
rights_status: docs-mit; case-media-and-screenshots-need-item-check; product-claims-are-community-sourced
language: zh-CN（另有 README_en.md）
---

# Source Record：千问办公绿皮书（QwenWorkGuide）

## 身份核验

- 官方/原始身份依据：仓库 `github.com/wangxiaoshuai1998/QwenWorkGuide`，站点 `qwenwork.ink/greenbook/`，README 自述“项目源自开源项目 QwenWork Greenbook……正文内容基于钉钉知识库导出”。
- 版本或发布日期：`main @ 002f698a`（2026-08-05）；无正式版本号，按 commit 锚定。
- 是否仍维护：是，含 `CONTRIBUTING.md`、“帮你解决”场景问卷与社区案例投稿流程。
- 替代/迁移关系：与官方帮助中心（`help.aliyun.com/zh/qwenwork`）互补而非替代；官方给能力定义，绿皮书给任务链路与真实案例。

## 本地快照

- 本地路径：`upstream/04-work/qwenwork-guide/`
- Pinned commit：`002f698a68b69d3635acf6be0d6e27db69069071`
- 迁入日期：2026-09-10；方式：GitHub 树 API + 按 commit 逐文件下载（文本类，媒体不镜像）
- 范围：仓库全部文本文件（599 个 / 约 4.8 MB），含四部分正文、`docs/cases/`、`docs/community/`、`docs/help/`、`docs/public/skills/`（64 个教育 Skill）、`.vitepress` 配置与根文件
- 校验：Git blob 抽样比对 400 个文件全部一致（`mismatch=0`）
- 台账：`upstream/04-work/上游资源台账.md`

## 内容范围

- 解决的问题：把千问办公从“知道有这个东西”带到“能用它跑完一个真实任务”，并给出可复用的 Skill 与工作流方法论。
- 主要概念：Web 端 / 桌面端使用链路、通用设置、电脑操控、应用快照、意识、模型选择、语音输入、IM 频道（钉钉）、定时任务、Hooks、连接器、技能（Skill）、专家套件、工作台（写作 / 幻灯片 / 设计）。
- 文档结构：
  - 第一部分 使用手册 7 章：第 1 章初识；第 2 章 Web 端使用链路；第 3 章桌面端使用链路；第 4 章通用设置；第 5 章网页端核心功能；第 6 章桌面端核心功能 15 节（6.1 系统设置 … 6.15 工作台-设计）；第 7 章概念普及（AI 怎么干活）。
  - 第二部分 实战案例：Excel 表格数据处理、数据分析全流程、复杂数据分析技巧、资料整理与加工、通知/请示/公告材料、电商经营数据大屏（官方案例）、声音克隆口播、Remotion Skills 做视频。
  - 第三部分 进阶使用案例：公众号排版推送、内容创作从选题到复盘、图片设计生成与编辑、UI 到可交付前端原型、需求直接生成原型图。
  - 第四部分 认知与方法论：把真实任务变成 AI 工作流的方法论、怎么写出一个 Skill、公众号排版 Skill 详解、IP 配图 Skill 架构详解。
  - 附加：`docs/cases/submissions/` 7 个社区投稿案例（年报数字化转型、每日 AI 资讯、JZ-2025 展示片、奶茶店销售分析、vibe 简历、公众号排版发布、微信 ima 知识库）；`docs/public/skills/` 11 类 64 个教育场景 Skill。
- 不覆盖的内容：不是官方功能说明书；不承诺界面与 Skill 名称跨版本稳定；不含企业治理与合规流程。

## 权利与复用

- 正文许可：MIT（`LICENSE` 实读）。
- 代码许可：仓库代码同为 MIT。
- 图片/GIF/视频许可：未镜像；正文截图、案例封面、媒体需逐项核验后才能进入发布物。
- Attribution 要求：保留版权与许可声明；引用社区投稿案例需保留原作者署名与投稿来源。
- Share-alike / Noncommercial：无。
- 允许操作：Link / Quote / Adapt / Fork（保留声明）；媒体单独判断。
- 注意：`LICENSE` 版权署名为 “WorkBuddy Guide Contributors”，与 WorkBuddyGuide 同源模板，署名主体未改写；引用时按实际署名登记，不改写、不冒充。

## 教材价值

- 映射卷册：04（主）；08（专家套件与多智能体）；09（桌面端电脑操控 / Hooks / 定时任务）；10（Skill、连接器、应用快照）；11（IM 频道与长期任务）。
- 映射 Concepts：Task Specification、Artifact、Verification、Skill、Connector、Automation、Workspace、Agent Loop。
- 映射 Tasks：Document、Analysis、Research、Creation、Automation、Knowledge、Code（前端原型）。
- 结构复用 S1：高——“使用手册 → 实战案例 → 进阶案例 → 方法论”的分层与卷 04 的任务地图同构。
- 知识复用 S2：中高——第四部分的方法论与 Skill 写法可以提炼为通用规范；产品操作细节按易漂移内容处理。
- 案例/资产复用 S3：中高——MIT 允许改编，但需本地复现验证并保留署名；媒体另核。
- 建议处理：ADAPT（方法论与案例结构）+ INDEX（易漂移的产品界面细节）。

## 质量与风险

- Authority：社区整理，非官方；正文自称来自钉钉知识库，无法独立核实每条产品描述。
- Freshness：高漂移。产品在 2026 年仍在快速改版，引用必须带快照日期与 commit。
- Educational Value：高——章节顺序接近真实学习路径，案例含任务、提示词、操作与效果。
- Reproducibility：中——依赖千问办公产品环境；案例中的部分数据与素材不可得。
- Maintenance：活跃（2026-08 仍有推送）。
- 已知错误/过时项：仓库内存在“第一部分/第一篇”“QwenWorkGuide/ 子树”新旧路径并存的历史残留；以 `.vitepress/sidebar.ts` 为准。本轮只抽样校验，未逐篇复现。
- 厂商 Claim 与独立证据的区别：全书为千问办公生态视角，产品能力与效果描述属于生态自述；跨产品比较需另行找中立来源（见 `SRC-QWENWORK-BLUEBOOK` 与社区评测线索）。

## 提取的 Claims

1. 全书分四部分共 7 章使用手册 + 8 个实战案例 + 5 个进阶案例 + 4 篇方法论。位置：`docs/greenbook/**`（快照内目录实测）。
2. 桌面端核心功能覆盖系统设置、意识、应用快照、电脑操控、模型选择、语音输入、IM 频道、定时任务、Hooks、连接器、技能、专家套件、工作台（写作/幻灯片/设计）。位置：`docs/greenbook/第一部分…/第6章 桌面端核心功能/6.1–6.15`。
3. 仓库许可为 MIT。位置：`LICENSE`（快照内实读）。
4. 社区案例投稿流程与“帮你解决”场景征集机制存在，可作为课程案例征集流程的参考。位置：`docs/community/case-contributing.md`、`docs/help/index.md`。