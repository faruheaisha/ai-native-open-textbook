---
source_id: SRC-DOUBAOWORK-BLUEBOOK
title: 豆包工作蓝皮书（DoubaoWork Guide）
publisher: AlephAITech（社区项目）
author: DoubaoWork Guide Contributors（社区，按仓库 LICENSE 署名）
source_tier: T3
source_type: case_collection
canonical_url: https://doubaowork.homes/
repo_url: https://github.com/AlephAITech/DoubaoWorkGuide
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: commit ad7338e8fc889ec082cdfb3fa41fb659520c7174（2026-09-06）
status: accepted
license: MIT
rights_status: text=mit; media=unverified
language: zh-CN
---

# Source Record：豆包工作蓝皮书（DoubaoWork Guide）

## 身份核验

- 官方/原始身份依据：站点 `doubaowork.homes`；公开仓库 `AlephAITech/DoubaoWorkGuide`（2026-09-10 经 GitHub API 核验存在，默认分支 `main`，MIT）。站点由仓库 `site/` 目录构建，内容数据为 `site/content/site-index.json` 与 `site/content/site-content.json`。
- 版本或发布日期：commit `ad7338e8fc889ec082cdfb3fa41fb659520c7174`（2026-09-06，“Merge site quality improvements into main”）；内容数据生成时间 2026-08-31（`site-index.json` 的 `fetchedAt`）。
- 是否仍维护：是。仓库 2026-09-06 仍有提交，站点与仓库同源构建。
- 替代/迁移关系：与豆包官方帮助文档互补；不可替代官方事实来源。
- 上一轮误记更正：2026-09-10 首轮快照曾记为“无公开仓库、许可未声明”；同日复核 GitHub API 与仓库 `LICENSE` 后确认仓库存在且为 MIT，本记录为更正后的结论。

## 本地快照

- 本地路径：`upstream/04-work/doubaowork-bluebook/`
- 版本锚点：commit `ad7338e`；本地 `site-content.json`（Git blob `266ec0abf697930764f8518b1e91c9d81560a1ea`）与 `site-index.json`（blob `0244a0920a5a141f6c5ea3dde9c9353b1810e6e1`）与仓库同路径文件逐字节一致
- 迁入日期：2026-09-10；迁入方式：HTTP 抓取站点数据层 → 与仓库同 commit 文件比对校验
- 迁入范围：58 个节点（49 篇正文 + 9 个分组节点，约 467KB）；另存 `LICENSE`、`README.md`、`ASSET-PROVENANCE.md`；媒体未下载
- 台账：`upstream/04-work/上游资源台账.md`

## 内容范围

- 解决的问题：把豆包工作从安装到多 Agent 工作小队，组织成一套“可照做”的任务教程。
- 主要概念：任务、项目、连接器、Skill、API 服务、定时任务、工作伙伴/工作小队（多 Agent）、知识库与 GEO。
- 课程结构（据 `site-index.json` 实读）：总览 1 篇；使用篇 11 章（安装登录、界面与任务、第一个任务、连接器、Skill、工作伙伴/小队、手机操控、API、定时任务、多 Agent、指令模板）；入门篇 6 篇；场景篇 31 个任务（个人提效 8、自媒体 8、知识管理 7、电商 1、金融 7）；其余为分组节点。
- 真实案例与资产：每篇为带步骤与验收结果的真实任务，例如“一份材料接着做 Word/Excel/PPT”“每天早上自动收到资讯简报”“从热点到公众号成稿”“把飞书知识库变成可复用 Skill”“从一张 K 线图完成投研评审会”。
- 不覆盖的内容：没有对照其他产品；没有公开的复现脚本或数据采集合集；产品界面细节随版本漂移。

## 权利与复用

- 正文许可：MIT（仓库 `LICENSE` 实读：Copyright (c) 2026 DoubaoWork Guide Contributors）。
- 代码许可：MIT（同仓库）。
- 图片/GIF/视频许可：**未知，逐项核权**。`site/assets/ASSET-PROVENANCE.md` 记录站点品牌与作者素材来源：豆包品牌标志版权归字节跳动，仅作内容展示与开发参考；作者名片无外部来源记录；`site/media/` 正文媒体只有本地文件路径，没有原始远程 URL 与授权状态。
- Attribution 要求：保留版权与许可声明。内容数据层没有逐篇作者字段；作者信息以站点页脚名片（`site/assets/authors/` 五张）与正文表述为主，引用具体案例时需逐篇核对署名。
- Share-alike / Noncommercial：无（MIT）。
- 允许操作：Link / Quote / Adapt / Fork（正文与站点代码）；媒体在逐项核权前只可 Index。

## 教材价值

- 映射卷册：04（主）；10（Skill / 连接器 / 定时任务案例）；11（个人长期自动化）。
- 映射 Concepts：Task、Connector、Skill、Scheduled Task、Multi-Agent Squad、Knowledge Base。
- 映射 Tasks：Document、Analysis、Research、Creation、Automation、Knowledge。
- 结构复用 S1：高——“场景 → 任务清单 → 步骤 → 结果”贴近卷 04 任务链，可作为任务图谱补全与结构对标。
- 知识复用 S2：中——MIT 允许改写，但仍须逐篇取证后再进入正文，避免把单一产品教程当作稳定知识。
- 案例/资产复用 S3：中——任务结构可复现为自有案例；媒体不得直接挪用。
- 建议处理：CURATE + ADAPT（正文）；INDEX（媒体）。

## 质量与风险

- Authority：社区项目，属案例级证据；产品能力陈述是豆包生态视角，不能作为独立事实。
- Freshness：产品能力与界面变化快；正文只保留任务结构与验收方法，界面细节进入 Live Facts。
- Educational Value：高——任务覆盖面广（含电商与金融两个卷 04 少见的场景），且每篇以验收结果收束。
- Reproducibility：中——任务步骤完整可照做，但依赖产品环境，无脚本与数据。
- Maintenance：仓库仍在维护（2026-09-06 提交）；站点与仓库同源。
- 已知错误/过时项：未逐篇核验。
- 厂商 Claim 与独立证据的区别：须把“豆包工作宣称能做到 X”与“本项目复现了 X”分开记录。

## 提取的 Claims

1. 仓库自述规模：49 篇指南与案例、31 个真实任务、五类场景。位置：`README.md`（commit `ad7338e`）。
2. 内容层实际规模：58 个节点（49 篇正文 + 9 个分组节点）。位置：`site-index.json`（`nodeCount=58`）。
3. 内容覆盖连接器、Skill、API、定时任务与多 Agent 工作小队。位置：使用篇目录结构。
4. 站点与仓库同源且许可为 MIT。位置：仓库 `LICENSE` 与 `site/` 目录结构；本地两份 JSON 的 Git blob 与仓库一致。
5. 品牌标志版权归字节跳动、仅作展示与开发参考；正文媒体缺少逐项来源 URL。位置：`site/assets/ASSET-PROVENANCE.md`。
