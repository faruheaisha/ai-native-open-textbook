---
title: "MCP Clients"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit1/mcp-clients.mdx"
sourceRel: "units/en/unit1/mcp-clients.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit1/mcp-clients.mdx"
sourceSha256: "bb55454d0a334136949c3ee9aef5db913f43673140b8cb106e220b2d2bf85afe"
pageSha256: "bb55454d0a334136949c3ee9aef5db913f43673140b8cb106e220b2d2bf85afe"
contentMode: "local-full"
zh: "on"
---

# MCP Clients

Now that we have a basic understanding of the Model Context Protocol, we can explore the essential role of MCP Clients in the Model Context Protocol ecosystem.

<div class="tb-zh"><p>现在我们对 Model Context Protocol 有了基本了解，可以来探讨 MCP Client 在这一生态中的关键作用了。</p></div>

 In this part of Unit 1, we'll explore the essential role of MCP Clients in the Model Context Protocol ecosystem.

<div class="tb-zh"><p>在第一单元的这一部分，我们会探讨 MCP Client 在 Model Context Protocol 生态中的关键作用。</p></div>

In this section, you will:

<div class="tb-zh"><p>在本节中，你将：</p></div>

* Understand what MCP Clients are and their role in the MCP architecture
* Learn about the key responsibilities of MCP Clients
* Explore the major MCP Client implementations
* Discover how to connect to the Hugging Face MCP Server and built-in tools
* See practical examples of MCP Client usage

<div class="tb-zh"><p>理解什么是 MCP Client，以及它在 MCP 架构中的角色；了解 MCP Client 的主要职责；认识主流的 MCP Client 实现；学会连接 Hugging Face MCP Server 及其内置工具；看几个 MCP Client 的实际用法示例。</p></div>

> [!TIP]
> In this page we're going to show examples of how to set up MCP Clients in a few different ways using the JSON notation. For now, we will use *examples* like `path/to/server.py` to represent the path to the MCP Server. In the next unit, we'll implement this with real MCP Servers.  
>
> For now, focus on understanding the MCP Client notation. We'll implement the MCP Servers in the next unit.

<div class="tb-zh"><p>本页我们会用 JSON 记法演示几种搭建 MCP Client 的方式。这里先用 path/to/server.py 这样的示例来代表 MCP Server 的路径；下一个单元我们会用真实的 MCP Server 来实现。现在请先专注于理解 MCP Client 的配置写法。</p></div>

## Understanding MCP Clients

MCP Clients are crucial components that act as the bridge between AI applications (Hosts) and external capabilities provided by MCP Servers. Think of the Host as your main application (like an AI assistant or IDE) and the Client as a specialized module within that Host responsible for handling MCP communications.

<div class="tb-zh"><p>MCP Client 是关键组件，充当 AI 应用（Host）与 MCP Server 提供的外部能力之间的桥梁。可以把 Host 想成你的主应用（比如 AI 助手或 IDE），而 Client 是这个 Host 内部负责处理 MCP 通信的专门模块。</p></div>

## User Interface Client

Let's start by exploring the user interface clients that are available for the MCP.

<div class="tb-zh"><p>我们先来看看有哪些可用的 MCP 用户界面客户端。</p></div>

### Chat Interface Clients

- Claude Desktop (Anthropic)

<div class="tb-zh"><p>Claude Desktop（Anthropic）</p></div>

### Interactive Development Clients

- VS Code extensions with MCP (e.g., Continue)
- Cursor IDE (built-in MCP client)
- Zed editor

<div class="tb-zh"><p>带 MCP 的 VS Code 扩展（例如 Continue）；Cursor IDE（内置 MCP 客户端）；Zed 编辑器</p></div>

These clients support connecting to multiple MCP servers and real-time tool invocation.

<div class="tb-zh"><p>这些客户端支持连接多个 MCP 服务端，并支持实时调用工具。</p></div>

## Quick connect to Hugging Face MCP Server

Hugging Face provides a hosted MCP server with built-in tools for exploring models, datasets, Spaces, and papers.

<div class="tb-zh"><p>Hugging Face 提供了一个托管的 MCP 服务端，内置用于探索模型、数据集、Spaces 和论文的工具。</p></div>

1. Visit https://huggingface.co/settings/mcp while logged in.
2. Select your MCP-compatible client (e.g., VS Code, Cursor, Zed, Claude Desktop).
3. Copy the generated configuration snippet into your client's MCP config.
4. Restart or reload your client. You should see “Hugging Face” connected.

<div class="tb-zh"><p>1. 登录后访问 https://huggingface.co/settings/mcp。2. 选择兼容 MCP 的客户端（例如 VS Code、Cursor、Zed、Claude Desktop）。3. 把生成的配置片段复制到客户端的 MCP 配置中。4. 重启或重新加载客户端，你应当能看到「Hugging Face」已连接。</p></div>

Tip: Prefer the generated snippet over hand-written config; it’s tailored per client.

<div class="tb-zh"><p>提示：优先使用自动生成的配置片段，而不是手写配置；它是针对每个客户端定制的。</p></div>

## Configuring MCP Clients

Now that we've covered the core of the MCP protocol, let's look at how to configure your MCP servers and clients.

<div class="tb-zh"><p>我们已经讲完 MCP 协议的核心，接下来看看如何配置 MCP 服务端和客户端。</p></div>

Effective deployment of MCP servers and clients requires proper configuration. 

<div class="tb-zh"><p>要有效部署 MCP 服务端和客户端，正确的配置必不可少。</p></div>

> [!TIP]
> The MCP specification is still evolving, so the configuration methods are subject to evolution. We'll focus on the current best practices for configuration.

<div class="tb-zh"><p>MCP 规范仍在演进，配置方式也会随之变化。我们这里聚焦当前的最佳实践。</p></div>

### MCP Configuration Files

MCP hosts use configuration files to manage server connections. These files define which servers are available and how to connect to them.

<div class="tb-zh"><p>MCP 宿主通过配置文件管理服务端连接。这些文件定义了有哪些服务端可用，以及如何连接它们。</p></div>

Fortunately, the configuration files are very simple, easy to understand, and consistent across major MCP hosts.

<div class="tb-zh"><p>幸运的是，这些配置文件非常简单、易于理解，而且在各大 MCP 宿主之间保持一致。</p></div>

#### `mcp.json` Structure

The standard configuration file for MCP is named `mcp.json`. Here's the basic structure:

<div class="tb-zh"><p>MCP 的标准配置文件名是 mcp.json。下面是它的基本结构：</p></div>

This is the basic structure of the `mcp.json` can be passed to applications like Claude Desktop, Cursor, or VS Code.

<div class="tb-zh"><p>这就是 mcp.json 的基本结构，可以把它传给 Claude Desktop、Cursor 或 VS Code 这类应用。</p></div>

```json
{
  "servers": [
    {
      "name": "Server Name",
      "transport": {
        "type": "stdio|sse",
        // Transport-specific configuration
      }
    }
  ]
}
```

In this example, we have a single server with a name and a transport type. The transport type is either `stdio` or `sse`.

<div class="tb-zh"><p>这个例子里有一个服务端，包含名称和传输类型。传输类型要么是 stdio，要么是 sse。</p></div>

#### Configuration for stdio Transport

For local servers using stdio transport, the configuration includes the command and arguments to launch the server process:

<div class="tb-zh"><p>对于使用 stdio 传输的本地服务端，配置中要包含启动服务端进程的命令和参数：</p></div>

```json
{
  "servers": [
    {
      "name": "File Explorer",
      "transport": {
        "type": "stdio",
        "command": "python",
        "args": ["/path/to/file_explorer_server.py"] // This is an example, we'll use a real server in the next unit
      }
    }
  ]
}
```

Here, we have a server called "File Explorer" that is a local script.

<div class="tb-zh"><p>这里有一个名为 “File Explorer” 的服务端，它是一个本地脚本。</p></div>

#### Configuration for HTTP+SSE Transport

For remote servers using HTTP+SSE transport, the configuration includes the server URL:

<div class="tb-zh"><p>对于使用 HTTP+SSE 传输的远程服务端，配置中要包含服务端 URL：</p></div>

```json
{
  "servers": [
    {
      "name": "Remote API Server",
      "transport": {
        "type": "sse",
        "url": "https://example.com/mcp-server"
      }
    }
  ]
}
```

#### Environment Variables in Configuration

Environment variables can be passed to server processes using the `env` field. Here's how to access them in your server code:

<div class="tb-zh"><p>可以用 env 字段把环境变量传给服务端进程。下面说明如何在服务端代码中读取它们：</p></div>

In Python, we use the `os` module to access environment variables:

<div class="tb-zh"><p>在 Python 中，我们用 os 模块读取环境变量：</p></div>

```python
import os

# Access environment variables
github_token = os.environ.get("GITHUB_TOKEN")
if not github_token:
    raise ValueError("GITHUB_TOKEN environment variable is required")

# Use the token in your server code
def make_github_request():
    headers = {"Authorization": f"Bearer {github_token}"}
    # ... rest of your code
```

In JavaScript, we use the `process.env` object to access environment variables:

<div class="tb-zh"><p>在 JavaScript 中，我们用 process.env 对象读取环境变量：</p></div>

```javascript
// Access environment variables
const githubToken = process.env.GITHUB_TOKEN;
if (!githubToken) {
    throw new Error("GITHUB_TOKEN environment variable is required");
}

// Use the token in your server code
function makeGithubRequest() {
    const headers = { "Authorization": `Bearer ${githubToken}` };
    // ... rest of your code
}
```

The corresponding configuration in `mcp.json` would look like this:

<div class="tb-zh"><p>对应的 mcp.json 配置大致如下：</p></div>

```json
{
  "servers": [
    {
      "name": "GitHub API",
      "transport": {
        "type": "stdio",
        "command": "python",
        "args": ["/path/to/github_server.py"], // This is an example, we'll use a real server in the next unit
        "env": {
          "GITHUB_TOKEN": "your_github_token"
        }
      }
    }
  ]
}
```

### Configuration Examples

Let's look at some real-world configuration scenarios:

<div class="tb-zh"><p>我们来看几个真实场景下的配置：</p></div>

#### Scenario 1: Local Server Configuration

In this scenario, we have a local server that is a Python script which could be a file explorer or a code editor.

<div class="tb-zh"><p>在这个场景里，本地服务端是一个 Python 脚本，可能是文件浏览器或代码编辑器。</p></div>

```json
{
  "servers": [
    {
      "name": "File Explorer",
      "transport": {
        "type": "stdio",
        "command": "python",
        "args": ["/path/to/file_explorer_server.py"] // This is an example, we'll use a real server in the next unit
      }
    }
  ]
}
```

#### Scenario 2: Remote Server Configuration

In this scenario, we have a remote server that is a weather API.

<div class="tb-zh"><p>在这个场景里，远程服务端是一个天气 API。</p></div>

```json
{
  "servers": [
    {
      "name": "Weather API",
      "transport": {
        "type": "sse",
        "url": "https://example.com/mcp-server" // This is an example, we'll use a real server in the next unit
      }
    }
  ]
}
```

Proper configuration is essential for successfully deploying MCP integrations. By understanding these aspects, you can create robust and reliable connections between AI applications and external capabilities.

<div class="tb-zh"><p>正确的配置是成功部署 MCP 集成的前提。理解这些要点之后，你就能在 AI 应用与外部能力之间建立起稳健、可靠的连接。</p></div>

In the next section, we'll explore the ecosystem of MCP servers available on Hugging Face Hub and how to publish your own servers there. 

<div class="tb-zh"><p>下一节我们会介绍 Hugging Face Hub 上可用的 MCP 服务端生态，以及如何在那里发布你自己的服务端。</p></div>

## Tiny Agents Clients

Now, let's explore how to use MCP Clients within code.

<div class="tb-zh"><p>现在来看看如何在代码中使用 MCP Client。</p></div>

You can also use tiny agents as MCP Clients to connect directly to MCP servers from your code. Tiny agents provide a simple way to create AI agents that can use tools from MCP servers.

<div class="tb-zh"><p>你也可以把 tiny agents 当作 MCP Client，直接在代码中连接 MCP 服务端。tiny agents 提供了一种简单方式来创建能使用 MCP 服务端工具的 AI 智能体。</p></div>

Tiny Agent can run MCP servers with a command line environment. To do this, we will need to install `npm` and run the server with `npx`. **We'll need these for both Python and JavaScript.**

<div class="tb-zh"><p>Tiny Agent 可以在命令行环境中运行 MCP 服务端。为此我们需要安装 npm，并用 npx 运行服务端。Python 和 JavaScript 两种情况都需要它们。</p></div>

Let's install `npx` with `npm`. If you don't have `npm` installed, check out the [npm documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

<div class="tb-zh"><p>我们用 npm 安装 npx。如果你还没装 npm，请查看 npm 文档（https://docs.npmjs.com/downloading-and-installing-node-js-and-npm）。</p></div>

### Setup

First, we will need to install `npx` if you don't have it installed. You can do this with the following command:

<div class="tb-zh"><p>首先，如果你还没装 npx，需要先安装它。可以用下面的命令完成：</p></div>

```bash
# install npx
npm install -g npx
```

Then, we will need to install the huggingface_hub package with the MCP support. This will allow us to run MCP servers and clients.

<div class="tb-zh"><p>接着，需要安装带 MCP 支持的 huggingface_hub 包。这样我们就能运行 MCP 服务端和客户端。</p></div>

```bash
pip install "huggingface_hub[mcp]>=0.32.0"
```

Then, we will need to log in to the Hugging Face Hub to access the MCP servers. You can do this using the Hugging Face CLI. You will need a [login token](https://huggingface.co/docs/huggingface_hub/v0.32.3/en/quick-start#authentication) to do this.

<div class="tb-zh"><p>然后需要登录 Hugging Face Hub 才能访问 MCP 服务端。可以用 Hugging Face CLI 完成登录，这需要一个登录令牌（https://huggingface.co/docs/huggingface_hub/v0.32.3/en/quick-start#authentication）。</p></div>

```bash
# Login using the new CLI
hf auth login
```

> **Note**
> The `huggingface-cli` command has been deprecated and replaced by `hf`.
> If you encounter a "command not found" error, make sure you have an up-to-date version of `huggingface_hub`.

<div class="tb-zh"><p>注意：huggingface-cli 命令已被弃用，取而代之的是 hf。如果遇到「command not found」错误，请确认你的 huggingface_hub 版本足够新。</p></div>

### Configure Access Token Permissions

After creating your Hugging Face access token and logging in, you need to ensure your token has the proper permissions to work with inference providers.

<div class="tb-zh"><p>创建 Hugging Face 访问令牌并登录之后，要确认你的令牌具备使用 inference provider 的相应权限。</p></div>

> [!WARNING]
> **Important:** If you skip this step, you may encounter authentication errors when running tiny agents with hosted models.

<div class="tb-zh"><p>重要：如果跳过这一步，在用托管模型运行 tiny agents 时可能会遇到认证错误。</p></div>

1. Go to your [Hugging Face Access Tokens page](https://huggingface.co/settings/tokens)
2. Find your MCP token and click the three dots (⋮) next to it
3. Select **"Edit permissions"**
4. Under the **Inference** section, check the box for:
   - **"Make calls to Inference Providers"**
5. Save your changes

<div class="tb-zh"><p>1. 打开你的 Hugging Face 访问令牌页面；2. 找到你的 MCP 令牌，点击右侧的三个点（⋮）；3. 选择「Edit permissions」；4. 在 Inference 一栏中勾选：「Make calls to Inference Providers」；5. 保存修改。</p></div>

This permission is required because tiny agents need to make API calls to hosted models like `Qwen/Qwen2.5-72B-Instruct` through providers like Novita.

<div class="tb-zh"><p>之所以需要这项权限，是因为 tiny agents 需要通过 Novita 这类提供方，对 Qwen/Qwen2.5-72B-Instruct 这类托管模型发起 API 调用。</p></div>

### Connecting to MCP Servers

Now, let's create an agent configuration file `agent.json`.

<div class="tb-zh"><p>现在我们创建一个智能体配置文件 agent.json。</p></div>

```json
{
    "name": "playwright-agent",
    "description": "Agent with Playwright MCP server",
    "model": "Qwen/Qwen2.5-72B-Instruct",
    "provider": "novita",
    "servers": [
        {
            "type": "stdio",
            "command": "npx",
            "args": ["@playwright/mcp@latest"]
        }
    ]
}
```

In this configuration, we are using the `@playwright/mcp` MCP server. This is an MCP server that can control a browser with Playwright.

<div class="tb-zh"><p>在这个配置里，我们使用 @playwright/mcp 这个 MCP 服务端。它能用 Playwright 控制浏览器。</p></div>

Now you can run the agent:

<div class="tb-zh"><p>现在就可以运行这个智能体了：</p></div>

```bash
tiny-agents run agent.json
```

First, install the tiny agents package with [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

<div class="tb-zh"><p>首先，用 npm 安装 tiny agents 包（https://docs.npmjs.com/downloading-and-installing-node-js-and-npm）。</p></div>

```bash
npm install @huggingface/tiny-agents
```

### Connecting to MCP Servers

Make an agent project directory and create an `agent.json` file.

<div class="tb-zh"><p>创建一个智能体项目目录，并新建 agent.json 文件。</p></div>

```bash
mkdir my-agent
touch my-agent/agent.json
```

Create an agent configuration file at `my-agent/agent.json`:

<div class="tb-zh"><p>在 my-agent/agent.json 处创建智能体配置文件：</p></div>

```json
{
    "model": "Qwen/Qwen2.5-72B-Instruct",
    "provider": "novita",
    "servers": [
        {
            "type": "stdio",
            "command": "npx",
            "args": ["@playwright/mcp@latest"]
        }
    ]
}
```

Now you can run the agent:

<div class="tb-zh"><p>现在就可以运行这个智能体了：</p></div>

```bash
npx @huggingface/tiny-agents run ./my-agent
```

In the video below, we run the agent and ask it to open a new tab in the browser.

<div class="tb-zh"><p>下面的视频里，我们运行这个智能体，让它打开浏览器中的一个新标签页。</p></div>

The following example shows a web-browsing agent configured to use the [Qwen/Qwen2.5-72B-Instruct](https://huggingface.co/Qwen/Qwen2.5-72B-Instruct) model via Novita inference provider, and it comes equipped with a playwright MCP server, which lets it use a web browser! The agent config is loaded specifying [its path in the `tiny-agents/tiny-agents`](https://huggingface.co/datasets/tiny-agents/tiny-agents/tree/main/celinah/web-browser) Hugging Face dataset.

<div class="tb-zh"><p>下面这个例子展示了一个网页浏览智能体：它通过 Novita 推理提供方使用 Qwen/Qwen2.5-72B-Instruct 模型，并配备了一个 playwright MCP 服务端，从而能够使用网页浏览器。加载配置时指明了它在 Hugging Face 数据集 tiny-agents/tiny-agents 中的路径（https://huggingface.co/datasets/tiny-agents/tiny-agents/tree/main/celinah/web-browser）。</p></div>

<video controls autoplay loop>
  <source src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/python-tiny-agents/web_browser_agent.mp4" type="video/mp4">
</video>

When you run the agent, you'll see it load, listing the tools it has discovered from its connected MCP servers. Then, it's ready for your prompts!

<div class="tb-zh"><p>运行这个智能体时，你会看到它加载并列出从所连接的 MCP 服务端发现的工具。之后它就可以接受你的提示词了。</p></div>

Prompt used in this demo:

<div class="tb-zh"><p>这个演示中使用的提示词：</p></div>

> do a Web Search for HF inference providers on Brave Search and open the first result and then give me the list of the inference providers supported on Hugging Face 

<div class="tb-zh"><p>让 Brave Search 搜索 Hugging Face 的推理提供方，打开第一条结果，然后告诉我 Hugging Face 支持哪些推理提供方。</p></div>

## Next Steps

Now that you understand MCP Clients, you're ready to:
* Explore specific MCP Server implementations
* Learn about creating custom MCP Clients
* Dive into advanced MCP integration patterns

<div class="tb-zh"><p>理解了 MCP Client 之后，你就可以进一步：探索具体的 MCP Server 实现；了解如何创建自定义 MCP Client；深入进阶的 MCP 集成模式。</p></div>

Let's continue our journey into the world of Model Context Protocol!

<div class="tb-zh"><p>让我们继续走进 Model Context Protocol 的世界！</p></div>
