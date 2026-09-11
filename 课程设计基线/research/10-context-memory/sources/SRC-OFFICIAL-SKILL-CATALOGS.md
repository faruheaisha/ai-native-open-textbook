---
source_id: SRC-OFFICIAL-SKILL-CATALOGS
title: 厂商官方 Skill 目录：openai/skills 与 microsoft/skills
publisher: OpenAI / Microsoft
source_tier: T1
source_type: vendor_official_repository
canonical_url: https://github.com/openai/skills
published_at: 持续更新（快照 2026-09-10）
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: 首次收录
status: accepted
license: openai/skills 为"逐技能自带 LICENSE.txt"（抽样 Apache-2.0）；microsoft/skills 为 MIT
rights_status: mixed_see_notes
language: 英文
---

# Source Record：厂商官方 Skill 目录

## 为什么重要

卷 10 的「Agent Skills」单元此前依赖第三方综述（VoltAgent / heilcheng 的 awesome 列表）与个人技能库（addyosmani、obra/superpowers、mattpocock）。本批首次拿到**两家厂商自己维护的官方技能目录**，把"Skill 载体已标准化"从社区观察升级为厂商行为证据。

## 1. openai/skills（Codex Skills Catalog）

| 项 | 值 |
|---|---|
| Stars | 26,845（2026-09-10 观测） |
| 定位（仓库 description） | "Skills Catalog for Codex" |
| 规模 | 783 文件；531 md（≈2.9 MB）+ 42 py |
| 目录结构 | `skills/.curated/<name>/`（39 个）+ `skills/.system/<name>/`（5 个） |
| 许可 | **无仓库级 LICENSE**；README 明确"The license of an individual skill can be found directly inside the skill's directory inside the `LICENSE.txt` file"；抽样 `.system/skill-creator/LICENSE.txt` 为 Apache-2.0 |

**`.system` 五项**：`imagegen`、`openai-docs`、`plugin-creator`、`skill-creator`、`skill-installer`。

**`.curated` 39 项**（按领域归类）：

- 云与部署：`cloudflare-deploy`、`netlify-deploy`、`render-deploy`、`vercel-deploy`
- 代码与仓库：`gh-address-comments`、`gh-fix-ci`、`migrate-to-codex`、`chatgpt-apps`、`aspnet-core`、`winui-app`
- 设计：`figma`、`figma-use`、`figma-generate-design`、`figma-generate-library`、`figma-create-design-system-rules`、`figma-create-new-file`、`figma-code-connect-components`、`figma-implement-design`、`screenshot`
- 文档与知识：`notion-*`（4 个）、`pdf`、`jupyter-notebook`、`speech`、`transcribe`
- 安全：`security-best-practices`、`security-ownership-map`、`security-threat-model`
- 测试与浏览器：`playwright`、`playwright-interactive`
- 其他：`linear`、`sentry`、`hatch-pet`、`define-goal`、`cli-creator`、`yeet`

**教学价值**：这是一份"Agent 能做什么"的官方能力清单——把 Codex 的技能边界用**可执行文件**而不是文档说明的方式固定了下来。

## 2. microsoft/skills（Skills / MCP / Custom Agents 目录）

| 项 | 值 |
|---|---|
| Stars | 3,006（2026-09-10 观测） |
| 定位（description） | "Skills, MCP servers, Custom Agents, Agents.md for SDKs to ground Coding Agents" |
| 规模 | 2,169 文件；1,537 md（≈10.1 MB） |
| 许可 | MIT（README 与 LICENSE 均实读） |
| 结构 | `.github/plugins/{azure-skills, azure-kusto-graph-skills, azure-sdk-*, deep-wiki, microsoft-365-agents-toolkit, microsoft-foundry, ...}`；另有 `docs/`、`docs-site/`、`hooks/`、`tests/` |
| **多宿主打包** | 仓库同时含 `.claude-plugin/`、`.claude/`、`.opencode/` 目录 → 同一套技能可被多家 Coding Agent 宿主消费 |

**教学价值**：`microsoft/skills` 展示了企业级技能目录的三个特征——**多宿主兼容**（Claude/OpenCode 等目录并存）、**按 SDK 分层**（azure-sdk-*）、**与 MCP servers / Custom Agents / AGENTS.md 配套**。

## 关键结论（新增趋势）

1. **厂商各自维护官方 Skill 目录**：Codex（openai/skills，26,845★）与 Copilot/微软系（microsoft/skills，3,006★）对位，加上 Anthropic 的 `anthropics/skills`（本批未加，属本轮排除范围），形成三足。
2. **许可形态的分裂**：openai/skills 选择"逐技能独立许可 + 无仓库级 LICENSE"，microsoft/skills 选择"仓库级 MIT"。对下游而言，**前者必须逐目录核许可**（与本项目"逐文件判断"纪律一致）。
3. **`.system` 与 `.curated` 的分层**：Codex 把"Skill 自身的创建/安装/文档"能力也做成 Skill（skill-creator / skill-installer / plugin-creator / openai-docs），即**自举式技能体系**；这是卷 10 "技能生态自生长"的一手证据。

## 安全与治理提示（面向卷 12）

- 引入第三方 Skill ≈ 引入可执行依赖：Skill 目录内可含脚本、工具调用与外部服务凭证要求；
- `microsoft/skills` 的 `hooks/`、`tests/` 目录提示了企业侧需要"技能的可测试性"；
- 本批两条来源均属官方仓库，但**技能内部仍可能引用第三方（如 figma、notion、vercel）**，实际使用仍需按其各自条款评估。

## 提取的 Claims

1. `openai/skills` 仓库无顶层 LICENSE，README 声明许可位于每个技能目录的 `LICENSE.txt`。来源：README 实读。
2. `openai/skills` 含 44 个技能目录（39 curated + 5 system），system 五项为 imagegen / openai-docs / plugin-creator / skill-creator / skill-installer。来源：git tree 实读。
3. `microsoft/skills` 以 MIT 发布，含 2,169 个文件（1,537 md），结构含 azure-* 插件、hooks、tests 与 `.claude` / `.opencode` 多宿主目录。来源：LICENSE、README 与 git tree 实读。
