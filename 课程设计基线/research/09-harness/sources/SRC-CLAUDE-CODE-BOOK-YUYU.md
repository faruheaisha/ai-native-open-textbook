---
source_id: SRC-CLAUDE-CODE-BOOK-YUYU
title: 《御舆：解码 Agent Harness》——中文侧体系化 Harness 教材
publisher: lintsinghua（个人作者）
source_tier: T2
source_type: community_textbook
canonical_url: https://github.com/lintsinghua/claude-code-book
published_at: 持续更新（快照 2026-09-05 最后推送）
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: 首次收录
status: accepted
license: 未声明（仓库无 LICENSE 文件，实读 tree 确认）
rights_status: cite_only
language: 中文（`en/` 有完整英文版）
---

# Source Record：《御舆：解码 Agent Harness》

## 为什么重要

卷 09 此前的中文来源是碎片级的（单篇指南、单份 awesome 列表）。本来源是**第一份中文体系化 Harness 教材**：15 章 + 4 附录，四部分递进，并且**自带英文全文**——意味着同一份内容可以直接支撑中英双语读者的教学编排，不必另找英文替代。

## 1. 基本事实（实读仓库文件）

| 项 | 值 |
|---|---|
| 仓库 | `lintsinghua/claude-code-book` |
| Stars | 4,221（2026-09-10 观测） |
| 推送 | 2026-09-05 |
| 许可 | **无 LICENSE 文件**（tree 实读：根目录无任何 LICENSE/COPYING） |
| 快照 commit | `1e2068c05ba80b85d86caae7b4c32e7478e66d09` |
| 规模 | 47 个文件；中文章节 20 份 + 英文 20 份 + README/package.json |
| 正文体量 | 单章 28–82 KB；全书约 **42 万字**量级（项目方口径） |

## 2. 结构（可直接映射为教学单元）

```text
第一部分 基础篇
  01 智能体编程的新范式
  02 对话循环 —— Agent 的心跳
  03 工具系统 —— Agent 的双手
  04 权限管线 —— Agent 的护栏
第二部分 核心系统篇
  05 设置与配置 —— Agent 的基因
  06 记忆系统 —— Agent 的长期记忆
  07 上下文管理 —— Agent 的工作记忆
  08 钩子系统 —— Agent 的生命周期扩展点
第三部分 高级模式篇
  09 子智能体与 Fork 模式
  10 协调器模式 —— 多智能体编排
  11 技能系统与插件架构
  12 MCP 集成与外部协议
第四部分 工程实践篇
  13 流式架构与性能优化
  14 Plan 模式与结构化工作流
  15 构建你自己的 Agent Harness
附录
  A 源码导航地图   B 工具完整清单
  C 功能标志速查表   D 术语表
```

**结构上的两个可取之处**：

1. **每一章都用了"人体隐喻"命名**（心跳 / 双手 / 护栏 / 基因 / 记忆 / 工作记忆 / 生命周期），使抽象子系统先有直觉锚点再进入实现。
2. **四份附录是工程字典而非散文**：源码导航地图、工具完整清单、功能标志速查表、术语表——可直接作为卷 09 的查阅型素材，而不是必须线性阅读的内容。

## 3. 核心论点：以"造车"读 Harness

作者用《周礼·考工记》"一器而工聚焉者，车为多"立论，把古代马车构件与 harness 子系统做成一一对应：

| 古代马车 | Agent Harness |
|---|---|
| 舆（车厢） | Harness 运行时 |
| 辕（车辕，定方向） | 对话循环 |
| 辐（辐条） | 工具系统 |
| 軎辖（车轴销钉） | 权限管线 |
| 轼（车前横木） | 钩子系统 |
| 御（驾驭技艺） | 架构认知 |

**"御舆"= 驾驭 + 车厢**，即"驾驭那个承载 LLM 的框架"。作者另外提出 AI 辅助编程的三次浪潮分期：① 2021–2022 代码补全（行内、被动、无执行）；② 2023–2024 对话式助手（多文件、无执行）；③ 2025 至今 自主智能体（读/写/执行/验证）。

## 4. 与另一份中文来源的冲突（重要）

本书记者把"驾驭/马车"当作**正面隐喻**使用；而同一批收录的 `WakeUp-Jin/Practical-Guide-to-Context-Engineering` 明确**反对**该隐喻，理由是"马具/驾驭"把 agent 当成被束缚的对象，会让应用构建生态错误回退到 workflow 时代。

**这不是翻译分歧，而是对 harness 职责的两种判断**：

| | 《御舆》 | 上下文工程指南 |
|---|---|---|
| 隐喻 | 驾驭（车夫技艺） | 反对"马具" |
| harness 的职责 | 提供承载与控制的工程框架 | 定义边界与协作协议，不控制每一步 |
| 对 workflow 的态度 | 视作被取代的前代范式 | 视作历史关键一环，但不足以承担领域革新 |

→ **卷 09 的处理建议**：不要单取一派。把这场分歧本身作为概念章的教学内容（"同一个词，两种工程立场"），再给出本教材的取舍与理由。

## 5. 复用约束

- **无 LICENSE 文件** → 只可索引与引用，**不得改编正文**。若需在正文中大段使用其结构，须改写为本教材自己的表述。
- 书中对 Claude Code 源码的引用属对第三方产品的分析，引用时须注明"作者分析"而非厂商口径。
- 英文版（`en/`）为同一作者产出，权利状态与中文版一致。

## 6. 关联

- 同类并列：`09-harness/claude-code-from-scratch`（动手实现）、`09-harness/learn-claude-code`（nano harness 17 步）、`09-harness/how-claude-code-works`（英文深潜）
- 冲突来源：[`SRC-HARNESS-CONTEXT-BOUNDARY-CN.md`](SRC-HARNESS-CONTEXT-BOUNDARY-CN.md)
- 检索记录：`课程设计基线/research/检索记录/GitHub课程与Agent产品-第五批-2026-09-10.md`
