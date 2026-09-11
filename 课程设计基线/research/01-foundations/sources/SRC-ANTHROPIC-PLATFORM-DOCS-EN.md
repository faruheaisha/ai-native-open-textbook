---
source_id: SRC-ANTHROPIC-PLATFORM-DOCS-EN
title: Anthropic 开发者平台文档（Claude API，英文全量 628 页）
publisher: Anthropic
source_tier: T1
source_type: official_platform_documentation
canonical_url: https://platform.claude.com/docs
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: 站点快照 2026-09-10（英文 628 页官方 Markdown）
status: accepted
license: 未声明（官方文档，站点条款）
rights_status: cite_only
language: 英文（站点另有 11 种语言各 249 页，未收录）
snapshot: upstream/01-foundations/anthropic-platform-docs-en/
---

# Source Record：Anthropic 开发者平台文档（Claude API）

## 为什么重要

本项目此前对 Claude 平台的一手事实（模型能力边界、上下文管理机制、工具调用全流程、托管 Agent、评估与护栏）没有统一的官方来源——卷 01/02/03/08/10/11/12 各自依赖零散转载或第三方总结。

本快照一次性补齐：**英文 628 页官方文档全量**，且全部是**官方 Markdown 端点**（非 HTML 提取），可直接引用与定位。

## 1. 通道

| 端点 | 结果 |
|---|---|
| `https://docs.anthropic.com/llms.txt` | **200**（67,859 B，628 条英文链接） |
| `https://platform.claude.com/llms.txt` | **200**（同上） |
| `https://docs.claude.com/llms.txt` | **200**（同上） |
| `https://docs.anthropic.com/sitemap.xml` | 200（411,160 B） |
| 落盘结果 | 628/628，**零缺失、零失败** |

三个域名互为镜像，内容一致；快照以 `platform.claude.com` 为基址（官方 llms.txt 中给出的规范地址）。

## 2. 站点自述的语言策略（官方 llms.txt 原文）

```text
English (en) - 628 pages - /docs - Content included below
German / Spanish / French / Italian / Japanese / Korean / Portuguese
Russian / Chinese Simplified / Chinese Traditional / Indonesian
                - 249 pages each - "Visit website for content"
```

→ 英文页数是翻译版的 2.5 倍，说明英文才是完整内容；翻译版是子集。**本项目据此只收英文。**

## 3. 覆盖分布（628 条）

| 一级路径 | 条数 | 内容 |
|---|---|---|
| `api/` | 387 | 端点参考（Messages、Batches、Files、Models、Admin 等） |
| `build-with-claude/` | 46 | **上下文窗口、Prompt Caching、Compaction、Context Editing、Effort、Embeddings、Citations、Batch、Vision** |
| `agents-and-tools/` | 42 | **Tool use 全流程、MCP、Agent Skills、MCP tunnels、Code execution、Computer use、Bash、Browser、Text editor** |
| `manage-claude/` | 40 | 认证、数据使用、合规、组织管理 |
| `managed-agents/` | 27 | 托管 Agent |
| `models/` | 23 | 模型家族与迁移指南 |
| `release-notes/` | 20 | 变更记录 |
| `cli-sdks-libraries/` | 16 | 官方 SDK 与 CLI |
| `about-claude/` | 14 | 平台总览 |
| `test-and-evaluate/` | 7 | **评估与护栏** |

## 4. 分卷映射

| 卷 | 用到的部分 | 说明 |
|---|---|---|
| 01 | `about-claude/`、`models/`、`cli-sdks-libraries/` | 产品与模型谱系 |
| 02 | `models/`、`build-with-claude/context-windows`、`effort` | 能力边界与推理成本 |
| 03 | `models/`（定价）、`manage-claude/`（组织与额度） | 访问与计费机制 |
| 08 | `agents-and-tools/tool-use/*` | 工具调用全流程（定义 → 调用 → 处理 → 管理上下文） |
| 09 | `agents-and-tools/`、`managed-agents/` | 与 Codex / Claude Code 文档并列的机制对照 |
| 10 | `build-with-claude/` 的 **context windows / compaction / context editing / prompt caching** | 卷 10 的核心一手来源 |
| 11 | `managed-agents/`、`test-and-evaluate/` | 托管 Agent 与评估 |
| 12 | `manage-claude/`（认证、数据使用、合规） | 权限与治理 |
| 13 | `cli-sdks-libraries/` | SDK 与本地调用 |

## 5. 使用约束

- **cite_only**（INDEX / CITE）：可引用（注明 URL + 抓取日期 + 端点类型），不进入 CURATE / ADAPT。
- 模型名、价格、限额、参数默认值属 **Live Facts**，引用前回原站核验。
- 34.7 MB 的官方 `llms-full.txt` **有意未迁入**：它是同一批 628 页的单文件拼接，逐页 `.md` 在引用与检索上严格优于单文件，且已完整覆盖。
- 与 `09-harness/claude-code-docs-official`（Claude Code 产品文档）**不重叠**。

## 6. 关联

- Claude Code 产品文档：`research/09-harness/sources/SRC-CLAUDE-CODE-DOCS-OFFICIAL.md`
- Anthropic 工程博客：`research/09-harness/sources/SRC-ANTHROPIC-ENGINEERING.md`
- 卷 10 调研：`research/10-context-memory/`
