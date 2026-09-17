---
title: "快照信息：Codex 官方文档（learn.chatgpt.com/docs）"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "_快照信息.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/_快照信息.md"
sourceSha256: "dea6af1e665a90683cdb67035d66d19c2fe2f93db34e2fbd71d3a78a20cabc8b"
pageSha256: "dea6af1e665a90683cdb67035d66d19c2fe2f93db34e2fbd71d3a78a20cabc8b"
contentMode: "local-full"
zh: ""
---

# 快照信息：Codex 官方文档（learn.chatgpt.com/docs）

- 站点：`https://learn.chatgpt.com/docs`（OpenAI 官方 Codex 文档；`developers.openai.com/codex/*` 为同一套索引的入口路径）
- 抓取日期：2026-09-10
- 抓取方式：官方机读索引 `llms.txt`（160 条）→ 逐页 `.md` 端点

## 机读端点探测结果

| 端点 | 结果 |
|---|---|
| `https://developers.openai.com/llms.txt` | **200**（5,850 B，站点总索引，含 11 个文档集入口） |
| `https://developers.openai.com/codex/llms.txt` | **200**（26,065 B，160 条） |
| `https://learn.chatgpt.com/llms.txt` | **200**（内容与上条相同） |
| `https://learn.chatgpt.com/llms-full.txt` | **200**（1,813,145 B） |
| `https://openai.com/index/harness-engineering/` | **403**（主站对本机持续不可达） |
| `https://platform.openai.com/docs/overview` | **403** |
| `https://help.openai.com/en/` | **403** |

> **关键发现**：`developers.openai.com` 及其子域 `learn.chatgpt.com` 是一套**全站 Markdown 化的文档站**——每个页面 URL 追加 `.md` 即得纯 Markdown。这绕过了 `openai.com` 与 `platform.openai.com` 的主站级 403，是本项目第一次拿到 OpenAI 官方技术文档原文。

## 文件清单

```text
docs/**/*.md          149 份官方 Markdown 全文
_llms.txt             官方索引（160 条）
_llms-full.txt        官方单文件全量导出（1.8 MB）
```

索引级 404 共 6 条（`docs.md`、`resources.md`、`videos.md`、`guides/best-practices.md`、`guides/build-ai-native-engineering-team.md`、`use-cases/llms.txt`）：这些是导航页，站点不提供 `.md` 端点，**非快照缺失**。

3 个带 `?surface=` 查询参数的页面按 surface 分别落盘为 `developer-commands.surface-cli.md`、`developer-commands.surface-ide.md`、`developer-settings.surface-ide.md`。

## 索引章节结构（官方 llms.txt 原样，78 节）

```text
Administration / Agent Approvals Security / Agent Configuration / Amazon Bedrock / App / App Server
Appshots / Artifacts Viewer / Auth / Automations / Browser / Build Plugins / Build Skills
Chrome Extension / Cli / Cli Customization / Cloud / Code Review / Codex Sdk / Community
Computer Use / Config File / Configuration / Custom Prompts / Customization / Cyber Safety
Developers / Enterprise / Environments / Extend / Feature Maturity / Features / Github Action
Glossary / Guides / Hooks / Ide / Image Generation / Image Inputs / Import / Integrated Terminal
Linux / Long Running Work / Mcp Server / Models / Non Interactive Mode / Notifications
Open Source / Overview / Permission Modes / Permissions / Personalize / Pets / Plugins / Pricing
Projects / Prompting / Quickstart / Reference / Remote / Remote Connections / Resources
Sandboxing / Security / Security Administration / Sites / Skills And Plugins / Third Party
Use Chatgpt / Videos / Visualizations / Web / Web Search / Webmcp / Whats New / Windows
```

## 对本项目的价值

**卷 09 Canonical Set 中 Codex 的首选一手文档。** 卷 09 采用 3+1 Canonical Set（Claude Code / Codex / Pi / Qoder），此前 Codex 侧只能引用 `codex-orange-book`、`codex-cli-best-practice` 等社区材料。本快照把这些升级为厂商自述：

| 章节 | 卷内用途 |
|---|---|
| `sandboxing` / `permissions` / `permission-modes` / `agent-approvals-security` | 权限管线（与 Claude Code 权限管线对照） |
| `hooks` | 钩子事件对照（与 Anthropic 10 事件、千问办公 6 事件并列） |
| `build-skills` / `skills-and-plugins` / `plugins` | 技能与插件体系 |
| `mcp-server` / `extend` | MCP 集成 |
| `config-file` / `customization` / `custom-prompts` | 配置与指令层级 |
| `long-running-work` / `automations` / `goals` | 长期任务（卷 10） |
| `app-server` / `codex-sdk` | 「作为平台的 harness」（与 OpenAI 官方博客互证） |
| `non-interactive-mode` / `github-action` | headless 与 CI 场景 |
| `cloud` / `remote` / `ide` / `cli` / `app` / `web` | 产品形态谱系（卷 01） |

## 权利与复用

- 官方文档，受 OpenAI 站点条款约束，无开源许可。
- 复用级别 **INDEX / CITE**：可引用（注明 URL + 抓取日期），不进入 CURATE / ADAPT。
- 产品细节（标志位、默认值、模型名）属 **Live Facts**，引用前回原站核验。
