---
source_id: SRC-QWENWORK-BLUEBOOK
title: 千问办公绿皮书（qwenwork.homes / vaughan0855/qwenwork-bluebook）
publisher: 个人开发者项目（GitHub：vaughan0855）
author: 未在站点或仓库中署名
source_tier: T3
source_type: practitioner_case_site_with_evidence
canonical_url: https://qwenwork.homes/ ; https://github.com/vaughan0855/qwenwork-bluebook
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: 仓库 main @ 2026-09-03（无 commit 锚点；站点为 GitHub Pages，根目录含 `CNAME`）
status: index_only
license: 未声明（仓库根目录无 LICENSE，GitHub license API 404）
rights_status: no-license; screenshots-and-evidence-images-rights-unknown
language: zh-CN
---

# Source Record：千问办公实战绿皮书（qwenwork.homes）

## 身份核验

- 官方/原始身份依据：站点 `qwenwork.homes` 的 `about.html` 提供 GitHub 贡献入口，指向 `github.com/vaughan0855/qwenwork-bluebook`；仓库根目录含 `CNAME`（指向 qwenwork.homes）、`index.html`、`style.css`、`case-*.html`、`phase-*.html`、`evidence/`。
- 版本或发布日期：仓库最近推送 2026-09-03；页面内容自述有第 1–3 期更新节奏。
- 是否仍维护：2026-09 仍在更新（仓库体积 52 MB，主要为 `evidence/` 截图）。
- 替代/迁移关系：站点 `toc.html` 明确划分“官方文档负责会随产品更新的安装、功能与操作路径；本站负责保留真实任务、原始资料、对话证据、交付物与人工验收”，与官方帮助中心和 `learn.qwenwork.host` 是互补关系。

## 内容范围（站点实读）

- 定位：以“交付证据”为标准的个人工作 AI 提效手册，强调“任务优先、证据优先、人工负责最后判断”。
- 站点结构：
  - 案例 01「小明的交付升级记」：叙事式案例，序章 + 6 章（先让资料池开口 → 澄清交付物 → 27 份资料变资料地图 → 从数字到证据型结论 → 让挑剔总监先质疑 → 人工审定与待确认版）
  - 案例 02–07：宇树招股书数据提取与交叉验证、短视频分镜脚本 PPT、月度经营数据仪表盘、竞品监控与钉钉推送、产品需求到 PRD、NDA 保密协议快速审查
  - `tasks.html` 任务速查（按工作找结果）、`methodology.html` 方法论（接住混乱 → 澄清任务 → 设计流程 → 调动 AI → 人工验收 → 沉淀复用）、`toc.html` 完整目录（Phase 1–3 与官方文档对照）、`contribute.html` 贡献说明
  - `evidence/`：25+ 张编号截图与证据文件，用于支撑案例过程可复现
- 案例证据标准（站点自述）：有真实语境、有可复现过程（原始资料 / Prompt / 截图 / 中间产出）、有交付边界（AI 做了什么、人工必须确认什么）。
- 不覆盖的内容：不是产品功能说明书；不保证与最新版产品一致；案例数据多来自具体企业语境，不可直接复用。

## 权利与复用

- 正文许可：**未声明**。仓库无 LICENSE 文件，GitHub 许可识别为 404。
- 代码许可：未声明（站点为静态 HTML/CSS/JS）。
- 图片/GIF/视频许可：`evidence/` 内截图与站点媒体权利未知，且可能包含第三方文档与个人数据。
- Attribution 要求：即使引用也须明确署名作者与站点；当前无法确认署名主体。
- Share-alike / Noncommercial：未知。
- 允许操作：**Link / Quote（短）**；不做 Adapt / Mirror，不进入发布物正文，直到获得作者授权。
- 处理结论：按 `INDEX` 处理；只作为研究线索与案例结构参照，并进入“联系作者确认授权”清单。

## 教材价值

- 映射卷册：04（主）；09（钉钉推送与自动化）；12（NDA 审查等敏感任务的安全边界）。
- 映射 Concepts：Task Specification、Evidence、Artifact、Verification、Human-in-the-loop、Automation。
- 映射 Tasks：Research、Analysis、Document、Automation、Creation。
- 结构复用 S1：高——“人为判断 / AI 执行”的分工原则与六步方法论（接住混乱 → 澄清任务 → 设计流程 → 调动 AI → 人工验收 → 沉淀复用）是卷 04 方法论章节的优质对照。
- 知识复用 S2：中高——案例的证据标准（真实语境 / 可复现过程 / 交付边界）可直接作为课程案例的验收标准模板。
- 案例/资产复用 S3：低（当前）——许可未声明，不能直接改编；可复现同类任务后用自己的证据重写。
- 建议处理：INDEX → 若取得授权，评估 CURATE（案例结构）。

## 质量与风险

- Authority：个人开发者项目，非官方；但方法论证与证据意识高于一般社区文章，且明确区分“官方文档 vs 本站案例”。
- Freshness：产品操作部分高漂移；方法论部分相对稳定。
- Educational Value：高——7 个案例覆盖研究、数据、设计、运营、产品、法务等不同工种，且给出人工验收边界。
- Reproducibility：中——案例基于具体企业资料，公开部分不足以完整复现。
- Maintenance：活跃（2026-09）。
- 已知错误/过时项：未逐案例复现；站点为静态页，部分交互与目录依赖 `main.js`。
- 厂商 Claim 与独立证据的区别：站点自身声明不做产品能力背书，案例效果为作者自述；引用时须标注为“个人实践”。

## 提取的 Claims

1. 站点主张“把判断留给人，把执行交给 AI”，并给出六步个人工作提效方法。位置：`methodology.html`。
2. 站点案例最低证据标准为：真实语境、可复现过程、交付边界。位置：`about.html`。
3. 站点收录 7 个案例，其中案例 01 为 7 章叙事式完整案例，案例 02–07 为单页案例。位置：`cases.html`、`ch0–ch6.html`、`case-*.html`。
4. 站点明确把官方文档与本站案例分工：官方负责功能与操作路径，本站保留真实任务与证据。位置：`toc.html`。
5. 仓库未声明许可（根目录无 LICENSE）。位置：GitHub 仓库根目录列表与 license API。