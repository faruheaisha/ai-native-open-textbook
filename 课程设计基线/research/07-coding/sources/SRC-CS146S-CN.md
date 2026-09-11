---
source_id: SRC-CS146S-CN
title: 动手学 CS146S 中文版（Stanford CS146S: The Modern Software Developer）
publisher: 社区翻译项目（ShouZhengAI）
author: 原课程：Stanford CS146S 教学团队；中文版：社区维护者
source_tier: T2
source_type: course_translation_with_assignments
canonical_url: https://github.com/ShouZhengAI/CS146S_CN
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: main @ 0d65f36f6673147d6c298670da4f9b4bd7f991fa（2026-09-01）
status: accepted
license: MIT（仓库声明）；原课程内容版权归 Stanford 课程方
rights_status: repo-mit-but-upstream-course-content-copyright-retained-by-original
language: zh-CN（原课程为英文）
---

# Source Record：动手学 CS146S 中文版

## 身份核验

- 官方/原始身份依据：仓库 README 自述“非官方项目、Fall 2025 已归档、Fall 2026 跟踪中、内容来源与版权归属原课程方”；对应斯坦福 CS146S《The Modern Software Developer》。
- 版本或发布日期：`main @ 0d65f36f`（2026-09-01）。
- 是否仍维护：是，README 称长期维护并跟踪 Fall 2026。
- 替代/迁移关系：中文翻译与作业整理；原课程有官方站点与视频，事实核验以原课程为准。

## 本地快照

- 本地路径：`upstream/07-coding/cs146s-cn/`
- Pinned commit：`0d65f36f6673147d6c298670da4f9b4bd7f991fa`
- 迁入范围：仓库全部文本与代码文件（188 个；含 `Assignments/week1–week8`、`Resource/`、`LICENSE`、`README.md`）
- 校验：Git blob 逐文件比对 186 项一致，2 项（`Assignments/README.md`、`Assignments/pyproject.toml`）重跑补取后再次校验通过
- 媒体未镜像：`Resource/imgs/` 的图片与视频封面未抓取

## 内容范围

- 解决的问题：把“AI 原生软件开发”从概念带到可做作业的程度——如何为 Agent 提供上下文与能力、把需求转成可执行规格、设计人机共同规划/构建/评估/迭代的工作流。
- 主要概念（README 自述）：MCP、Agent Skills、spec-driven development、loop engineering、software factory。
- 结构：`Assignments/week1–week8` 每周一个作业（含 `assignment.md`、示例代码与数据），`Resource/` 存放课程资源。
- 作业样例（快照内实读）：week1 覆盖 chain-of-thought、k-shot prompting、self-consistency、reflexion、tool calling、RAG 的对比实现；week2 含前后端与测试；week3 含 server 与依赖；week4 起含 `.claude/`、`backend`、`frontend`、`docs`。
- 不覆盖的内容：不含官方讲义全文与视频；不是完整课程替代品。

## 权利与复用

- 正文许可：仓库 `LICENSE` 为 MIT，但 README 明确“内容来源与版权归属原课程方”。因此**课程文本与作业说明的原始版权不因本仓库 MIT 声明而转移**。
- 代码许可：按仓库 MIT 处理。
- 图片/GIF/视频许可：未镜像，需单独核验。
- Attribution 要求：同时标注原课程（Stanford CS146S）与中文翻译项目。
- 允许操作：Link / Quote；Adapt 与 Fork 需区分“翻译仓库自有内容”与“原课程内容”两类权利。
- 处理建议：教材写作时以本仓库作为**结构与作业设计参照**，涉及课程原文表述时回到原课程来源引用。

## 教材价值

- 映射卷册：07（主）；08（Agent 工作流）；09（loop engineering、Harness）；10（上下文工程、Skills）。
- 映射 Concepts：Task Specification、Context、Agent Loop、Skill、MCP、Verification、Software Factory。
- 映射 Tasks：Code、Verification、Automation。
- 结构复用 S1：高——8 周作业梯度（提示技术 → 应用搭建 → 前后端 → Agent 协作）可直接对照卷 07 的练习设计。
- 知识复用 S2：中高——术语与工业实践（spec-driven、loop engineering）可作为概念登记来源，但需回原课程确认定义。
- 案例/资产复用 S3：中——代码示例可作练习参考，须核验依赖与可运行性。
- 建议处理：CURATE（作业梯度与练习结构）+ INDEX（原课程文本表述）。

## 质量与风险

- Authority：非官方翻译，但内容来源为高校课程；翻译质量与更新及时性由社区保证。
- Freshness：跟踪 Fall 2026；工具版本变化快。
- Educational Value：高——作业可动手、有代码、有数据。
- Reproducibility：中——部分作业依赖外部 API 与密钥；依赖版本未锁定。
- Maintenance：活跃（2026-09 有推送）。
- 已知错误/过时项：未实测全部作业；README 含赞助商内容，与课程内容需分开看待。
- 厂商 Claim 与独立证据的区别：课程中涉及的产品实践属于教学示例，不作为产品能力背书。

## 提取的 Claims

1. 课程主题为 AI 原生软件开发，覆盖 MCP、Agent Skills、spec-driven development、loop engineering、software factory。位置：`README.md` 课程简介。
2. 仓库为“非官方项目”，内容版权归原课程方。位置：`README.md` 顶部声明。
3. 仓库含 8 周作业目录与资源目录。位置：仓库目录结构（`Assignments/week1–week8`、`Resource/`）。
4. 仓库许可为 MIT。位置：`LICENSE`。