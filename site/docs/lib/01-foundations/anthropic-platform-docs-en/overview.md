---
title: "快照信息：Anthropic 开发者平台文档（platform.claude.com，英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "_快照信息.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/_快照信息.md"
sourceSha256: "858b8aaf09806f57f6960bbfb42ddcd86d171d067a3cb8693da337b3b20b3ffc"
pageSha256: "858b8aaf09806f57f6960bbfb42ddcd86d171d067a3cb8693da337b3b20b3ffc"
contentMode: "local-full"
zh: ""
---

# 快照信息：Anthropic 开发者平台文档（platform.claude.com，英文全量）

- 站点：`https://platform.claude.com/docs`（Claude 开发者平台 / API 文档）
- 镜像域名：`docs.anthropic.com`、`docs.claude.com`（实测返回内容一致）
- 抓取日期：2026-09-10
- 抓取方式：官方机读索引 `llms.txt` → 逐页 `.md` 端点

## 机读端点探测结果

| 端点 | 结果 |
|---|---|
| `https://docs.anthropic.com/llms.txt` | **200**（67,859 B，628 条英文链接） |
| `https://platform.claude.com/llms.txt` | **200**（同上） |
| `https://docs.claude.com/llms.txt` | **200**（同上） |
| `https://docs.anthropic.com/llms-full.txt` | 200（34.7 MB，**有意未迁入**，理由见下） |
| `https://docs.anthropic.com/sitemap.xml` | 200（411,160 B） |

站点在 llms.txt 中声明：英文 628 页（内容已含在 llms.txt 内），另有德/西/法/意/日/韩/葡/俄/简中/繁中/印尼 11 种语言各 249 页。

## 文件清单

```text
en/**/*.md           628 份官方 Markdown 全文（英文）
_llms.txt            官方索引（628 条）
_sitemap-docs.anthropic.com.xml
```

## 为什么只收英文，且不迁入 llms-full.txt

- **只收英文**：11 个翻译版各 249 页，是英文子集；收录会造成 2.7 倍冗余而无新增信息。需要译文时按 URL 规则 `/docs/<lang>/...` 现场取用。
- **不迁入 34.7 MB 的 `llms-full.txt`**：该文件是同一批 628 页的单文件拼接。逐页 `.md` 在引用、检索、定位上严格优于单文件，且本快照已完整覆盖。若将来需要单文件版本，按其官方 URL 重取即可。

## 索引章节结构（官方 llms.txt 原样）

```text
Docs home
Messages            含 Agents and tools / MCP / Agent Skills / Tool use / MCP tunnels
Managed Agents
Admin
Best practices
Models & pricing
CLI, SDKs, and libraries
API reference
Claude API skill
Release notes
Other pages
```

## 覆盖领域（一级路径分布，共 628 条）

```text
api/                  387   API 端点参考
build-with-claude/     46   上下文窗口、Prompt Caching、Compaction、Context Editing、Embeddings、Effort、Citations、Batch
agents-and-tools/      42   Tool use、MCP、Agent Skills、Code execution、Computer use、Bash、Browser、Text editor
manage-claude/         40   认证、数据使用、合规、组织管理
managed-agents/        27   托管 Agent
models/                23   模型家族与定价
release-notes/         20
cli-sdks-libraries/    16
about-claude/          14
test-and-evaluate/      7   评估、护栏
resources/ 与首页等      8
```

## 对本项目的价值

**跨卷的一手事实来源**，本项目第一次拿到 Claude 平台完整官方文档：

| 卷 | 用到的部分 |
|---|---|
| 01 / 02 / 03 | `models/`、`about-claude/`、定价与计费机制 |
| 08 / 09 | `agents-and-tools/`（Tool use 全流程）、`managed-agents/` |
| 10 | `build-with-claude/` 的 context windows / compaction / context editing / prompt caching |
| 11 | `test-and-evaluate/`、`managed-agents/` |
| 12 | `manage-claude/` 的认证、数据使用与合规 |

## 边界说明（与卷 09 文档集不重叠）

- 本集 = **Claude 开发者平台（API）文档**
- `09-harness/claude-code-docs-official` = **Claude Code 产品文档**
- 二者分别回答「如何调用 Claude」与「Claude Code 怎么工作」

## 权利与复用

- 官方文档，受 Anthropic 站点条款约束，无开源许可。
- 复用级别 **INDEX / CITE**：可引用（注明 URL + 抓取日期 + 端点类型），不进入 CURATE / ADAPT。
- 产品细节（模型名、价格、限额、参数默认值）属 **Live Facts**，引用前回原站核验。
