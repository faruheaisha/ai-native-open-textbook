---
title: "Building MCP Clients"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit2/clients.mdx"
sourceRel: "units/en/unit2/clients.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit2/clients.mdx"
sourceSha256: "f3521c4410a2c15cf92ae31b2d99323ed447b652eabb23a155c6f5e21674b1a2"
pageSha256: "f3521c4410a2c15cf92ae31b2d99323ed447b652eabb23a155c6f5e21674b1a2"
contentMode: "local-full"
zh: "on"
---

# Building MCP Clients

In this section, we'll create clients that can interact with our MCP server using different programming languages. We'll implement both a JavaScript client using HuggingFace.js and a Python client using smolagents.

<div class="tb-zh"><p>本节我们创建能用不同编程语言与 MCP 服务端交互的客户端：一个用 HuggingFace.js 写的 JavaScript 客户端，一个用 smolagents 写的 Python 客户端。</p></div>

## Configuring MCP Clients

Effective deployment of MCP servers and clients requires proper configuration. The MCP specification is still evolving, so the configuration methods are subject to evolution. We'll focus on the current best practices for configuration.

<div class="tb-zh"><p>要有效部署 MCP 服务端和客户端，正确的配置必不可少。MCP 规范仍在演进，因此配置方式也会随之变化。我们聚焦当前的最佳实践。</p></div>

### MCP Configuration Files

MCP hosts use configuration files to manage server connections. These files define which servers are available and how to connect to them.

<div class="tb-zh"><p>MCP 宿主（host）通过配置文件管理服务端连接。这些文件定义了有哪些服务端可用，以及如何连接它们。</p></div>

The configuration files are very simple, easy to understand, and consistent across major MCP hosts.

<div class="tb-zh"><p>这些配置文件非常简单、易于理解，而且在各大 MCP 宿主之间保持一致。</p></div>

#### `mcp.json` Structure

The standard configuration file for MCP is named `mcp.json`. Here's the basic structure:

<div class="tb-zh"><p>MCP 的标准配置文件名是 mcp.json。下面是它的基本结构：</p></div>

```json
{
  "servers": [
    {
      "name": "MCP Server",
      "transport": {
        "type": "sse",
        "url": "http://localhost:7860/gradio_api/mcp/sse"
      }
    }
  ]
}
```

In this example, we have a single server configured to use SSE transport, connecting to a local Gradio server running on port 7860.

<div class="tb-zh"><p>这个例子里配置了一个使用 SSE 传输的服务端，连接本机 7860 端口上运行的 Gradio 服务。</p></div>

> [!TIP]
> We've connected to the Gradio app via SSE transport because we assume that the gradio app is running on a remote server. However, if you want to connect to a local script, `stdio` transport instead of `sse` transport is a better option.

<div class="tb-zh"><p>我们通过 SSE 传输方式连接 Gradio 应用，是因为假定该 Gradio 应用跑在远程服务器上。但如果你想连接的是本地脚本，用 stdio 传输会比 sse 更合适。</p></div>

#### Configuration for HTTP+SSE Transport

For remote servers using HTTP+SSE transport, the configuration includes the server URL:

<div class="tb-zh"><p>对于使用 HTTP+SSE 传输的远程服务端，配置中要包含服务端 URL：</p></div>

```json
{
  "servers": [
    {
      "name": "Remote MCP Server",
      "transport": {
        "type": "sse",
        "url": "https://example.com/gradio_api/mcp/sse"
      }
    }
  ]
}
```

This configuration allows your UI client to communicate with the Gradio MCP server using the MCP protocol, enabling seamless integration between your frontend and the MCP service.

<div class="tb-zh"><p>这个配置让你的 UI 客户端可以通过 MCP 协议与 Gradio MCP 服务端通信，从而使前端与 MCP 服务无缝衔接。</p></div>

## Configuring a UI MCP Client

When working with Gradio MCP servers, you can configure your UI client to connect to the server using the MCP protocol. Here's how to set it up:

<div class="tb-zh"><p>使用 Gradio MCP 服务端时，你可以配置 UI 客户端通过 MCP 协议连接服务端。设置方式如下：</p></div>

### Basic Configuration

Create a new file called `config.json` with the following configuration:

<div class="tb-zh"><p>新建一个名为 config.json 的文件，写入以下配置：</p></div>

```json
{
  "mcpServers": {
    "mcp": {
      "url": "http://localhost:7860/gradio_api/mcp/sse"
    }
  }
}
```

This configuration allows your UI client to communicate with the Gradio MCP server using the MCP protocol, enabling seamless integration between your frontend and the MCP service.

<div class="tb-zh"><p>这个配置让你的 UI 客户端可以通过 MCP 协议与 Gradio MCP 服务端通信，从而使前端与 MCP 服务无缝衔接。</p></div>

## Configuring an MCP Client within Cursor IDE

Cursor provides built-in MCP support, allowing you to connect your deployed MCP servers directly to your development environment.

<div class="tb-zh"><p>Cursor 内置了 MCP 支持，可以把已部署的 MCP 服务端直接接到你的开发环境中。</p></div>

### Configuration

Open Cursor settings (`Ctrl + Shift + J` / `Cmd + Shift + J`) → **Tools & Integrations** tab → **Add Custom MCP**:

<div class="tb-zh"><p>打开 Cursor 设置（Ctrl + Shift + J / Cmd + Shift + J）→ 工具与集成（Tools &amp; Integrations）标签页 → 添加自定义 MCP（Add Custom MCP）：</p></div>

**macOS:**

<div class="tb-zh"><p>macOS：</p></div>

```json
{
  "mcpServers": {
    "sentiment-analysis": {
      "command": "npx",
      "args": [
        "-y", 
        "mcp-remote", 
        "https://YOURUSENAME-mcp-sentiment.hf.space/gradio_api/mcp/sse", 
        "--transport", 
        "sse-only"
      ]
    }
  }
}
```

**Windows:**

<div class="tb-zh"><p>Windows：</p></div>

```json
{
  "mcpServers": {
    "sentiment-analysis": {
      "command": "cmd",
      "args": [
        "/c", 
        "npx", 
        "-y", 
        "mcp-remote", 
        "https://YOURUSENAME-mcp-sentiment.hf.space/gradio_api/mcp/sse", 
        "--transport", 
        "sse-only"
      ]
    }
  }
}
```

### Why We Use `mcp-remote`

> **Note**: As of mid-2025, Cursor supports direct remote MCP connections via HTTP+SSE and OAuth. You may not need `mcp-remote` unless working with legacy setups or encountering specific compatibility issues.

<div class="tb-zh"><p>注意：自 2025 年年中起，Cursor 已支持通过 HTTP+SSE 与 OAuth 直接连接远程 MCP。除非你在维护旧配置或遇到特定的兼容性问题，否则可能并不需要 mcp-remote。</p></div>

Earlier versions of MCP clients, including Cursor, only supported local servers via `stdio` transport and lacked support for remote servers with authentication. The `mcp-remote` tool was introduced as a workaround that:

<div class="tb-zh"><p>包括 Cursor 在内的早期 MCP 客户端只支持通过 stdio 传输的本地服务端，不支持需要鉴权的远程服务端。mcp-remote 工具正是为解决这一问题而出现的，它能够：</p></div>

- Runs locally on your machine  
- Bridges Cursor with remote MCP servers  
- Handles transport and authentication implicitly  
- Uses the familiar configuration file format

<div class="tb-zh"><p>在本机运行；在 Cursor 与远程 MCP 服务端之间架桥；隐式处理传输与认证；沿用大家熟悉的配置文件格式。</p></div>

While this is still useful in some edge cases, Cursor now supports native remote MCP integration. You can directly configure a remote server like this:

<div class="tb-zh"><p>虽然在某些边缘场景下它仍然有用，但 Cursor 现在已原生支持远程 MCP 集成。你可以直接这样配置远程服务端：</p></div>

```json
{
  "mcpServers": {
    "my-server": {
      "url": "https://your-mcp-server.hf.space/gradio_api/mcp/sse"
    }
  }
}
```

> See [Cursor’s official documentation](https://docs.cursor.com/context/mcp) for up-to-date setup instructions.

<div class="tb-zh"><p>最新的配置说明请参考 Cursor 官方文档。</p></div>

Once configured, you can ask Cursor to use your sentiment analysis tool for tasks like analyzing code comments, user feedback, or pull request descriptions.

<div class="tb-zh"><p>配置完成后，你就可以让 Cursor 使用你的情感分析工具，去分析代码注释、用户反馈或 PR 描述等。</p></div>
