---
title: "快照信息：ChatGPT 插件与 Apps SDK 文档（developers.openai.com/plugins）"
sourceId: "11-personal-agents/openai-plugins-docs"
sourceTitle: "openai-plugins-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "11-personal-agents"
sourceUrl: "https://developers.openai.com/plugins"
entryUrl: "https://developers.openai.com/plugins"
sourceRel: "_快照信息.md"
rawUrl: "/raw/11-personal-agents/openai-plugins-docs/_快照信息.md"
sourceSha256: "dba1b8d8af7bd54bf0a6298e193b69656d45653fe2fa112ae669679480d03353"
pageSha256: "dba1b8d8af7bd54bf0a6298e193b69656d45653fe2fa112ae669679480d03353"
contentMode: "local-full"
zh: ""
---

# 快照信息：ChatGPT 插件与 Apps SDK 文档（developers.openai.com/plugins）

- 站点：`https://developers.openai.com/plugins`（OpenAI 官方，ChatGPT 插件 / Apps SDK）
- 抓取日期：2026-09-10
- 抓取方式：`plugins/llms.txt`（30 条）→ 逐页 `.md` 端点

## 机读端点探测结果

| 端点 | 结果 |
|---|---|
| `https://developers.openai.com/plugins/llms.txt` | **200**（4,942 B，30 条） |

## 文件清单

```text
plugins/**/*.md       26 篇官方 Markdown 全文
_llms.txt             官方索引（30 条）
```

## 索引章节结构（官方 llms.txt 原样）

```text
App Guidelines
Build
Concepts
Deploy
Guides
Plan
Quickstart
Reference
```

## 对本项目的价值

**卷 11（个人 Agent 与持续自动化）的官方一手来源。** 此前卷 11 主要靠 OpenClaw / Hermes 等社区实现；本集补充了**平台方视角的"能力包"规范**：

- **Build**：用 MCP server 构建插件、工具的 UI 组件、认证、元数据
- **Deploy**：测试、部署、审核与提交
- **Concepts / Reference**：插件的边界与规范
- **App Guidelines**：什么样的 app 才算合格的 ChatGPT app

对卷 10 也有交叉价值：`plugins/build/app-quickstart.md` 与 MCP 工具定义是 Skills / Tools / Plugins 三层扩展机制的平台侧对照。

## 权利与复用

- 官方文档，受 OpenAI 站点条款约束，无开源许可。
- 复用级别 **INDEX / CITE**；产品与提交规则属 **Live Facts**，引用前回原站核验。
