---
title: "快照信息：Claude Code 官方文档（code.claude.com/docs）"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "_快照信息.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/_快照信息.md"
sourceSha256: "4c56945a93bae0253f9459613ea7372abf70f61c4663370032ea1af8c9548c06"
pageSha256: "4c56945a93bae0253f9459613ea7372abf70f61c4663370032ea1af8c9548c06"
contentMode: "local-full"
zh: ""
---

# 快照信息：Claude Code 官方文档（code.claude.com/docs）

- 站点：`https://code.claude.com/docs`（Anthropic 官方，Claude Code 产品文档）
- 抓取日期：2026-09-10
- 抓取方式：站点官方机读索引 `llms.txt` → 逐页 `.md` 端点（官方 Markdown 孪生地址）

## 机读端点探测结果

| 端点 | 结果 |
|---|---|
| `https://code.claude.com/docs/llms.txt` | **200**（45,508 B，202 条链接） |
| `https://code.claude.com/docs/llms-full.txt` | **200**（8,949,324 B，单文件全量导出） |
| `https://code.claude.com/docs/sitemap.xml` | 200（261,038 B） |
| `https://docs.claude.com/en/docs/claude-code/llms.txt` | 404（该路径不存在） |

## 文件清单

```text
en/**/*.md            202 份官方 Markdown 全文（英文）
_llms.txt             官方索引（202 条）
_llms-full.txt        官方单文件全量导出（8.9 MB）
```

## 索引章节结构（官方 llms.txt 原样）

```text
Getting started           Getting started / Core concepts / Use Claude Code / Platforms and integrations
Build with Claude Code    Agents and parallel work / MCP / Skills / Plugins / Artifacts / Automation / Guides / Troubleshooting
Administration            Setup and access / Deployment / Gateways / Usage and costs / Plugin distribution / Security and data / Adoption
Configuration             Settings / Permissions and sandboxing / Environments / Model and responses / Interface
Reference                 Reference / Glossary
Agent SDK                 Build agents / Core concepts / Input and output / Extend with tools / Customize behavior / Control and observability / Deployment
```

## 对本项目的价值

这是**卷 09（Harness Engineering）Canonical Set 中 Claude Code 的首选一手文档**。此前卷 09 关于 Claude Code 的机制描述只能靠第三方拆解（`claude-code-book-yuyu`、`how-claude-code-works`、`claude-code-everything` 等社区逆向分析）。本快照把权限管线、沙箱、钩子、技能、子 Agent、MCP、Agent SDK 全部升级为**厂商自述**。

与其他 Anthropic 文档集的分工：本集是 **Claude Code 产品文档**；`01-foundations/anthropic-platform-docs-en` 是 **Claude 开发者平台（API）文档**。两者不重叠。

## 权利与复用

- 官方文档，受 Anthropic 站点条款约束，无开源许可。
- 本快照仅用于**内部研究、结构对标、事实核对与短文摘引**（注明来源 + 抓取日期）。
- 不镜像图片与交互组件；不整体转载。
- 产品细节（标志位、默认值、版本）属 **Live Facts**，引用前回原站核验。
- 复用级别 **INDEX / CITE**，不进入 CURATE / ADAPT。
