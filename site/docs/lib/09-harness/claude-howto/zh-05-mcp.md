---
title: "MCP（Model Context Protocol）"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/05-mcp/README.md"
sourceRel: "zh/05-mcp/README.md"
rawUrl: "/raw/09-harness/claude-howto/zh/05-mcp/README.md"
sourceSha256: "61f9c75f4fcddb0deaad2f9e1144db2ad46c79864035e75b3dd18909fed7598d"
pageSha256: "61f9c75f4fcddb0deaad2f9e1144db2ad46c79864035e75b3dd18909fed7598d"
contentMode: "local-full"
zh: ""
---

# MCP（Model Context Protocol）

## 概览

MCP 是 Claude Code 访问外部工具、服务和 API 的标准协议。你可以把 GitHub、数据库、文件系统、聊天系统等都接到 Claude 里。

## MCP 架构

MCP 通常由三部分构成：

1. Claude Code
2. MCP server
3. 外部工具或数据源

Claude 会通过 MCP 协议向 server 发起工具调用，并把结果带回当前会话。

## MCP 生态

- GitHub 集成
- 数据库集成
- 文件系统集成
- 组织内部工具
- 第三方服务

## 安装方式

### HTTP 传输（推荐）

```bash
# Basic HTTP connection

# HTTP with authentication header
```

### Stdio 传输（本地）

```bash
# Local Node.js server

# With environment variables
```

### SSE 传输（已弃用）

旧版本中可能仍能见到 SSE 方式，但新配置一般优先考虑 HTTP 或 stdio。

### WebSocket 传输

适用于需要实时双向通信的场景。

### Windows 说明

在 Windows 上配置本地 server 时，要注意 shell、环境变量和路径写法。

### OAuth 2.0 认证

对于支持 OAuth 的 MCP server，Claude 可以通过交互式流程或预配置凭据完成认证。

## MCP 设置流程

1. 确认你要接入的服务
2. 选择 transport
3. 配置环境变量或认证
4. 在 Claude Code 中添加 server
5. 验证工具是否可用

## MCP 工具搜索

Claude 会根据当前上下文自动查找可用工具。

## 动态工具更新

当 MCP server 增加或移除工具时，Claude 可以在运行时感知变化。

## MCP 提示补充（Elicitation）

有些 MCP server 会在需要用户补充信息时触发 elicitation，Claude 再把问题转给用户。

## 工具描述与指令上限

每个 MCP 工具都应该有清晰的描述，帮助 Claude 选择正确的工具。

## 把 MCP Prompts 暴露成 Slash Commands

```text
