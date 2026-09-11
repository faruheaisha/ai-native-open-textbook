---
source_id: SRC-LEARN-CLAUDE-CODE
title: Learn Claude Code — Harness Engineering for Real Agents（从零构建 nano agent harness）
publisher: shareAI-lab
author: shareAI-lab 及贡献者
source_tier: T2
source_type: progressive_harness_build_course
canonical_url: https://github.com/shareAI-lab/learn-claude-code
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: main @ 0dcafa2ae053a1ddd6a72f265431104b08a5aa13（2026-08-26）
status: accepted
license: MIT
rights_status: code-and-docs-mit; diagrams-in-repo-covered-by-repo-license
language: 英文（含 README-zh.md / README-ja.md 与各步中文说明）
---

# Source Record：learn-claude-code

## 身份核验

- 官方/原始身份依据：仓库 `shareAI-lab/learn-claude-code`，README 主张“Agency 来自模型训练，Agent 产品 = 模型 + Harness”，并以 17 个可运行步骤构建 nano harness。
- 版本或发布日期：`main @ 0dcafa2a`（2026-08-26）。
- 是否仍维护：是（含 CONTRIBUTING 与 `web/` 站点）。
- 替代/迁移关系：以 Claude Code 生态为参照的教学实现，不是 Claude Code 源码；与官方 Harness 文档互补。

## 本地快照

- 本地路径：`upstream/09-harness/learn-claude-code/`
- Pinned commit：`0dcafa2ae053a1ddd6a72f265431104b08a5aa13`
- 迁入范围：文本与代码文件（400 个 / 4.35 MB），含 17 个步骤目录、`docs/`、`agents/`、`skills/`、`tests/`、`web/`、多语言 README
- 媒体未镜像

## 内容范围

- 步骤链（目录名为准）：
  `s01_agent_loop` → `s02_tool_use` → `s03_permission` → `s04_hooks` → `s05_todo_write` → `s06_subagent` → `s07_skill_loading` → `s08_context_compact` → `s09_memory` → `s10_task_system` → `s11_background_tasks` → `s12_cron_scheduler` → `s13_agent_teams` → `s14_mcp_plugin` → `s15_integrated_harness` → `s16_workflow_runtime` → `s17_goal_loop`
- 每一步含可运行 `code.py`、分语言 README 与示意图（SVG）。
- `docs/` 提供与步骤配套的讲义（如 s01-the-agent-loop、s03-todo-write、s06-context-compact、s11-autonomous-agents、s12-worktree-task-isolation）。
- 语言：英文主线 + 中文/日文 README。
- 不覆盖的内容：不包含模型训练；不覆盖各厂商 CLI 的具体产品差异。

## 权利与复用

- 正文与代码许可：MIT（`LICENSE` 实读）。
- 图片/GIF/视频许可：仓库内 SVG 示意图随仓库许可；外部引用图需单独核验。
- Attribution 要求：保留版权与许可声明。
- Share-alike / Noncommercial：无。
- 允许操作：Link / Quote / Adapt / Fork。

## 教材价值

- 映射卷册：09（主：Harness 工程）；08（Agent Loop、工具、子代理）；10（上下文压缩、记忆、Skill 加载）；11（后台任务、Cron、Agent 团队）。
- 映射 Concepts：Agent Loop、Tool Use、Permission、Hook、Subagent、Skill、Context Compact、Memory、Task System、Background Task、Cron、Agent Team、MCP、Workflow Runtime、Goal Loop。
- 映射 Tasks：Code、Automation、Verification。
- 结构复用 S1：极高——17 步“一次只加一个机制”的渐进式结构，正是卷 09 需要的章节骨架。
- 知识复用 S2：高——每一步的机制解释可直接支撑“为什么需要它、没有它会怎样”的写法；须在本地跑通后引用。
- 案例/资产复用 S3：高——`code.py` 可作练习与对照实现；需核验运行环境与依赖。
- 建议处理：ADAPT（步骤顺序与机制解释）+ CURATE（代码示例）。

## 质量与风险

- Authority：开源社区教学项目，非官方；但结构清晰、有测试目录与可运行代码。
- Freshness：与 Claude Code 生态同步较快（2026-08）。
- Educational Value：极高——把 Harness 拆成可验证的最小步骤。
- Reproducibility：高——Python 实现，依赖在 `requirements.txt`；需本地实测确认。
- Maintenance：活跃。
- 已知错误/过时项：未逐步运行；与真实 Claude Code 行为的一致性是教学近似，不是规范。
- 厂商 Claim 与独立证据的区别：README 对“Agency 来自训练”等论述是作者观点，作为教学框架使用，不作为学术结论。

## 提取的 Claims

1. 仓库以 17 个步骤构建 nano agent harness。位置：仓库根目录 `s01_*`–`s17_*`。
2. 每步提供可运行代码与说明文档。位置：各 `sNN_*/code.py` 与 `docs/`。
3. 仓库许可为 MIT。位置：`LICENSE`。