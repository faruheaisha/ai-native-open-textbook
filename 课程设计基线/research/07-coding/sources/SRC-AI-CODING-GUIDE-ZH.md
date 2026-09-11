---
source_id: SRC-AI-CODING-GUIDE-ZH
title: AI Coding / Agent 工作流中文实战教程（Claude Code + OpenClaw + Codex + WorkBuddy）
publisher: KimYx0207（个人开发者，自述 15+ 年游戏研发与项目管理经验）
author: 老金（KimYx0207）
source_tier: T2
source_type: multi_track_chinese_agent_hands_on_tutorial
canonical_url: https://github.com/KimYx0207/AI-Coding-Guide-Zh
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: main @ 7a7c21b8e7dc976e8ade33b79ee000a172e63daf（2026-08-12，教程 v5.0）
status: accepted
license: MIT
rights_status: docs-mit; vendor-screenshots-and-external-references-need-item-check
language: zh-CN
---

# Source Record：AI Coding / Agent 工作流中文实战教程

## 身份核验

- 官方/原始身份依据：仓库 `KimYx0207/AI-Coding-Guide-Zh`，README 自述作者背景与教程定位（“面向中小企业 AI 赋能、高校培训、开发团队 AI Coding 落地、国内办公场景”）。
- 版本或发布日期：`main @ 7a7c21b8`（2026-08-12）；README 标注教程版本 v5.0，并跟踪 Claude Code 2.1.222、OpenClaw v2026.7.1、Codex App 26.727、WorkBuddy 2026.08。
- 是否仍维护：是，含 `CHANGELOG.md`。
- 替代/迁移关系：与官方文档互补；官方文档给接口与能力，本教程给“四条工具线的循序渐进路径与团队落地”。

## 本地快照

- 本地路径：`upstream/07-coding/ai-coding-guide-zh/`
- Pinned commit：`7a7c21b8e7dc976e8ade33b79ee000a172e63daf`
- 迁入范围：全部文本文件（55 个 / 2.16 MB）：`README.md`、`CHANGELOG.md`、`LICENSE`、`docs/claude-code/`、`docs/codex/`、`docs/openclaw/`、`docs/workbuddy/`
- 媒体未镜像

## 内容范围

- 解决的问题：把 AI Coding 从“会用某个 CLI”带到“四条工具线协同 + 团队规范落地”。
- 四条主线：Claude Code（AI 编程 CLI）、OpenClaw（开源个人 AI 助手框架）、Codex（Codex App 为核心的编程 Agent 平台）、WorkBuddy（腾讯 AI 办公桌面 App，面向办公人与国内团队）。
- 规模（README 自述）：50 篇完整教程 + 1 张速查卡；80 万+ Markdown 内容量；1500+ 代码块/命令/配置示例；250+ 问答条目。
- 不覆盖的内容：官方 API 参考；不保证与最新版工具一致。

## 权利与复用

- 正文许可：MIT（仓库 `LICENSE`）。
- 代码许可：MIT。
- 图片/GIF/视频许可：未镜像；文中工具截图与第三方引用需逐项核验。
- Attribution 要求：保留版权与许可声明，引用时标注作者与教程版本。
- Share-alike / Noncommercial：无。
- 允许操作：Link / Quote / Adapt / Fork（保留声明）。

## 教材价值

- 映射卷册：07（主：Vibe Coding 到 Agentic Engineering）；04（WorkBuddy 办公线）；09（Harness 使用与配置）；11（OpenClaw 线）。
- 映射 Concepts：Harness、Skill、MCP、Automation、Task Specification、Verification。
- 映射 Tasks：Code、Automation、Document。
- 结构复用 S1：高——“按工具分线 + 每条线从入门到团队规范”的结构，可作为卷 07 多工具对照的教学骨架。
- 知识复用 S2：中——工具版本与命令细节会漂移；可复用之处在于任务分级、团队规范与落地路径。
- 案例/资产复用 S3：中——配置示例可作研究样本，需在本地复现后引用。
- 建议处理：CURATE（结构与路径）+ INDEX（版本敏感的命令细节）。

## 质量与风险

- Authority：个人作者整理，非官方；作者声明有多年工程与团队管理经验，但教程内容未经过独立评审。
- Freshness：标注了所跟踪的工具版本；工具迭代快，引用需带日期与版本。
- Educational Value：高——覆盖四类工具与团队落地，中文语境完整。
- Reproducibility：中——依赖各工具账号与环境；部分配置仅示例。
- Maintenance：活跃（v5.0，2026-08）。
- 已知错误/过时项：未逐篇复现。
- 厂商 Claim 与独立证据的区别：教程对四款工具的评价属作者经验，涉及产品能力与限制的表述需回官方文档核验。

## 提取的 Claims

1. 教程覆盖 Claude Code、OpenClaw、Codex、WorkBuddy 四条主线。位置：`README.md` 项目简介表格。
2. 教程版本 v5.0，跟踪的具体工具版本见 README 徽章。位置：`README.md`。
3. 仓库许可为 MIT。位置：`LICENSE`。