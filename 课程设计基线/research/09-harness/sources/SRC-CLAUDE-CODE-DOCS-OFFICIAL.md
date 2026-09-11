---
source_id: SRC-CLAUDE-CODE-DOCS-OFFICIAL
title: Claude Code 官方文档（code.claude.com/docs，202 页全量）
publisher: Anthropic
source_tier: T1
source_type: official_product_documentation
canonical_url: https://code.claude.com/docs
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: 站点快照 2026-09-10（202 页官方 Markdown + llms-full）
status: accepted
license: 未声明（官方文档，站点条款）
rights_status: cite_only
language: 英文
snapshot: upstream/09-harness/claude-code-docs-official/
---

# Source Record：Claude Code 官方文档

## 为什么重要

卷 09 采用 **3+1 Canonical Set**（Claude Code / Codex / Pi / Qoder），其中 Claude Code 是"mature batteries-included harness"这一极。但此前卷 09 关于 Claude Code 内部机制的全部描述，只能依赖**第三方拆解**：

- `claude-code-book-yuyu`（社区逆向教材，未声明许可）
- `how-claude-code-works`、`claude-code-everything`、`claude-code-ultimate-guide` 等社区仓库

这些材料质量高但**都属于推断**。本快照把同一批机制升级为**厂商自述**，使卷 09 可以同时呈现"官方说它怎么工作"与"社区观察到它怎么实现"。

## 1. 通道

| 项 | 值 |
|---|---|
| 机读索引 | `https://code.claude.com/docs/llms.txt` — **200**，45,508 B，**202 条** |
| 单文件全量 | `https://code.claude.com/docs/llms-full.txt` — **200**，8,949,324 B |
| sitemap | `https://code.claude.com/docs/sitemap.xml` — 200，261,038 B |
| 正文形态 | **官方 Markdown 孪生地址**（页面 URL 追加 `.md`），非提取文本 |
| 落盘结果 | 202/202，**零缺失、零失败** |

> 发现路径：抓取 `docs.claude.com/en/docs/claude-code/overview.md` 时，页面头部自带提示 "Fetch the complete documentation index at: https://code.claude.com/docs/llms.txt" —— **官方文档自己指路**。

## 2. 索引结构（官方原样）

```text
Getting started           Getting started / Core concepts / Use Claude Code / Platforms and integrations
Build with Claude Code    Agents and parallel work / MCP / Skills / Plugins / Artifacts / Automation / Guides / Troubleshooting
Administration            Setup and access / Deployment / Gateways / Usage and costs / Plugin distribution / Security and data / Adoption
Configuration             Settings / Permissions and sandboxing / Environments / Model and responses / Interface
Reference                 Reference / Glossary
Agent SDK                 Build agents / Core concepts / Input and output / Extend with tools / Customize behavior / Control and observability / Deployment
```

## 3. 卷 09 的核心章节映射

| 卷 09 知识点 | 官方文档章节 |
|---|---|
| 对话循环 / 智能体循环 | `how-claude-code-works` |
| 上下文窗口与自动加载 | `context-window`（含交互式模拟）、`prompt-caching`、"Explore the .claude directory" |
| 扩展机制总览 | `features-overview`（何时用 CLAUDE.md / Skills / subagents / hooks / MCP / plugins） |
| 权限与沙箱 | Configuration → `permissions-and-sandboxing` |
| 钩子 | Build → Hooks |
| 技能与插件 | Build → Skills / Plugins |
| 子 Agent 与并行 | Build → Agents and parallel work |
| MCP | Build → MCP |
| 长期任务与自动化 | Build → Automation；`long-running` 相关页 |
| Agent SDK（作为平台的 harness） | Agent SDK 全部章节 |
| 企业部署与网关 | Administration → Deployment / Gateways |
| 变更追溯 | `changelog` |

## 4. 与已落盘社区来源的关系（**互补，非替代**）

| 维度 | 官方文档（本快照） | 社区拆解（已落盘） |
|---|---|---|
| 回答 | 它**应该**怎么用、有哪些开关 | 它**实际**怎么实现、代码长什么样 |
| 例证 | 权限模式有哪几种 | 权限管线四阶段、推测性分类器 2 秒 Promise.race |
| 例证 | 上下文会自动加载什么 | 四级渐进压缩 Snip→MicroCompact→Collapse→AutoCompact |
| 可靠性 | 厂商权威 | 版本相关，需核对 |

→ 卷 09 的正确写法：**机制描述用官方，实现细节用社区，并明确标注哪句来自哪边。**

## 5. 使用约束

- 无开源许可 → **cite_only**（INDEX / CITE）。可引用（注明 URL + 抓取日期），不得改编或整体转载。
- 产品细节（标志位、默认值、版本号）属 **Live Facts**，引用前回原站核验。
- 本快照与 `01-foundations/anthropic-platform-docs-en`（Claude 平台 API 文档）**不重叠**：前者是产品文档，后者是 API 文档。

## 6. 关联

- 「harness 隐喻」两读并列：`research/09-harness/harness隐喻-两读并列.md`
- 同厂商工程博客：`sources/SRC-ANTHROPIC-ENGINEERING.md`
- 平台 API 文档：`upstream/01-foundations/anthropic-platform-docs-en/`
