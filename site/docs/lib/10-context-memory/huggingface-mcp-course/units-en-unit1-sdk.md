---
title: "MCP SDK"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit1/sdk.mdx"
sourceRel: "units/en/unit1/sdk.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit1/sdk.mdx"
sourceSha256: "5f63dc2ee822569ab0186135c3f10c349fdfcdef06058025c92fe37e823864d6"
pageSha256: "5f63dc2ee822569ab0186135c3f10c349fdfcdef06058025c92fe37e823864d6"
contentMode: "local-full"
zh: "on"
---

# MCP SDK

The Model Context Protocol provides official SDKs for both JavaScript, Python and other languages. This makes it easy to implement MCP clients and servers in your applications. These SDKs handle the low-level protocol details, allowing you to focus on building your application's capabilities.

<div class="tb-zh"><p>Model Context Protocol 为 JavaScript、Python 以及其他语言提供了官方 SDK。这让你在自己的应用中实现 MCP 客户端和服务端变得很容易。这些 SDK 负责处理底层协议细节，让你可以专注于构建应用自身的能力。</p></div>

## SDK Overview

Both SDKs provide similar core functionality, following the MCP protocol specification we discussed earlier. They handle:

<div class="tb-zh"><p>两个 SDK 提供相似的核心功能，遵循我们前面讨论过的 MCP 协议规范。它们负责处理：</p></div>

- Protocol-level communication
- Capability registration and discovery
- Message serialization/deserialization
- Connection management
- Error handling

<div class="tb-zh"><p>协议层通信；能力注册与发现；消息序列化与反序列化；连接管理；错误处理</p></div>

## Core Primitives Implementation

Let's explore how to implement each of the core primitives (Tools, Resources, and Prompts) using both SDKs.

<div class="tb-zh"><p>下面我们看看如何用两个 SDK 分别实现每个核心原语（Tools、Resources 和 Prompts）。</p></div>

```python
from mcp.server.fastmcp import FastMCP

# Create an MCP server
mcp = FastMCP("Weather Service")

# Tool implementation
@mcp.tool()
def get_weather(location: str) -> str:
    """Get the current weather for a specified location."""
    return f"Weather in {location}: Sunny, 72°F"

# Resource implementation
@mcp.resource("weather://{location}")
def weather_resource(location: str) -> str:
    """Provide weather data as a resource."""
    return f"Weather data for {location}: Sunny, 72°F"

# Prompt implementation
@mcp.prompt()
def weather_report(location: str) -> str:
    """Create a weather report prompt."""
    return f"""You are a weather reporter. Weather report for {location}?"""

# Run the server
if __name__ == "__main__":
    mcp.run()
```

Once you have your server implemented, you can start it by running the server script.

<div class="tb-zh"><p>服务端实现完成后，运行服务端脚本即可启动它。</p></div>

```bash
mcp dev server.py
```

```javascript
// index.mjs
import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Weather Service",
  version: "1.0.0",
});

// Tool implementation
server.tool("get_weather", { location: z.string() }, async ({ location }) => ({
  content: [
    {
      type: "text",
      text: `Weather in ${location}: Sunny, 72°F`,
    },
  ],
}));

// Resource implementation
server.resource(
  "weather",
  new ResourceTemplate("weather://{location}", { list: undefined }),
  async (uri, { location }) => ({
    contents: [
      {
        uri: uri.href,
        text: `Weather data for ${location}: Sunny, 72°F`,
      },
    ],
  })
);

// Prompt implementation
server.prompt(
  "weather_report",
  { location: z.string() },
  async ({ location }) => ({
    messages: [
      {
        role: "assistant",
        content: {
          type: "text",
          text: "You are a weather reporter.",
        },
      },
      {
        role: "user",
        content: {
          type: "text",
          text: `Weather report for ${location}?`,
        },
      },
    ],
  })
);

// Run the server
const transport = new StdioServerTransport();
await server.connect(transport);
```

Once you have your server implemented, you can start it by running the server script.

<div class="tb-zh"><p>服务端实现完成后，运行服务端脚本即可启动它。</p></div>

```bash
npx @modelcontextprotocol/inspector node ./index.mjs
```

This will initialize a development server running the file `server.py`. And log the following output:

<div class="tb-zh"><p>这会初始化一个运行 server.py 文件的开发服务器，并输出如下日志：</p></div>

```bash
Starting MCP inspector...
⚙️ Proxy server listening on port 6277
Spawned stdio transport
Connected MCP client to backing server transport
Created web app transport
Set up MCP proxy
🔍 MCP Inspector is up and running at http://127.0.0.1:6274 🚀
```

You can then open the MCP Inspector at [http://127.0.0.1:6274](http://127.0.0.1:6274) to see the server's capabilities and interact with them.

<div class="tb-zh"><p>随后你可以打开 MCP Inspector（地址 http://127.0.0.1:6274）查看服务端的能力并与它们交互。</p></div>

You'll see the server's capabilities and the ability to call them via the UI.

<div class="tb-zh"><p>你会在界面上看到服务端的能力，以及调用它们的方式。</p></div>

![MCP Inspector](https://huggingface.co/datasets/mcp-course/images/resolve/main/unit1/6.png)

## MCP SDKs

MCP is designed to be language-agnostic, and there are official SDKs available for several popular programming languages:

<div class="tb-zh"><p>MCP 被设计为与语言无关，若干主流编程语言都有官方 SDK：</p></div>

| Language   | Repository                                                                                               | Maintainer(s)       | Status           |
| ---------- | -------------------------------------------------------------------------------------------------------- | ------------------- | ---------------- |
| TypeScript | [github.com/modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) | Anthropic           | Active           |
| Python     | [github.com/modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk)         | Anthropic           | Active           |
| Java       | [github.com/modelcontextprotocol/java-sdk](https://github.com/modelcontextprotocol/java-sdk)             | Spring AI (VMware)  | Active           |
| Kotlin     | [github.com/modelcontextprotocol/kotlin-sdk](https://github.com/modelcontextprotocol/kotlin-sdk)         | JetBrains           | Active           |
| C#         | [github.com/modelcontextprotocol/csharp-sdk](https://github.com/modelcontextprotocol/csharp-sdk)         | Microsoft           | Active (Preview) |
| Swift      | [github.com/modelcontextprotocol/swift-sdk](https://github.com/modelcontextprotocol/swift-sdk)           | loopwork-ai         | Active           |
| Rust       | [github.com/modelcontextprotocol/rust-sdk](https://github.com/modelcontextprotocol/rust-sdk)             | Anthropic/Community | Active           |
| Dart       | [https://github.com/leehack/mcp_dart](https://github.com/leehack/mcp_dart)                               | Flutter Community   | Active           |

These SDKs provide language-specific abstractions that simplify working with the MCP protocol, allowing you to focus on implementing the core logic of your servers or clients rather than dealing with low-level protocol details.

<div class="tb-zh"><p>这些 SDK 提供了各语言特有的抽象，简化了 MCP 协议的使用，让你专注于实现服务端或客户端的核心逻辑，而不必处理底层协议细节。</p></div>

## Next Steps

We've only scratched the surface of what you can do with the MCP but you've already got a basic server running. In fact, you've also connected to it using the MCP Client in the browser.

<div class="tb-zh"><p>我们只是触及了 MCP 能力的表层，但你已经让一个基础服务端跑了起来，甚至已经在浏览器中用 MCP Client 连上了它。</p></div>

In the next section, we'll look at how to connect to your server from an LLM.

<div class="tb-zh"><p>下一节，我们看看如何从 LLM 连接到你的服务端。</p></div>
