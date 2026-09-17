---
title: "Building Tiny Agents with MCP and the Hugging Face Hub"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit2/tiny-agents.mdx"
sourceRel: "units/en/unit2/tiny-agents.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit2/tiny-agents.mdx"
sourceSha256: "2df6d863d74248f3c37f3d5d608795a9930c44186d276aae74e1dcb32dfcefe1"
pageSha256: "2df6d863d74248f3c37f3d5d608795a9930c44186d276aae74e1dcb32dfcefe1"
contentMode: "local-full"
zh: "on"
---

# Building Tiny Agents with MCP and the Hugging Face Hub

Now that we've built MCP servers in Gradio and learned about creating MCP clients, let's complete our end-to-end application by building an agent that can seamlessly interact with our sentiment analysis tool. This section builds on the project [Tiny Agents](https://huggingface.co/blog/tiny-agents), which demonstrates a super simple way of deploying MCP clients that can connect to services like our Gradio sentiment analysis server.

<div class="tb-zh"><p>我们已经在 Gradio 中构建了 MCP 服务端，也了解了如何创建 MCP 客户端，现在来完成端到端应用的最后一步：构建一个能与我们的情感分析工具顺畅交互的智能体。本节基于 Tiny Agents 项目（https://huggingface.co/blog/tiny-agents），它展示了一种极简的 MCP 客户端部署方式，可以连接像我们的 Gradio 情感分析服务端这样的服务。</p></div>

In this final exercise of Unit 2, we will walk you through how to implement both TypeScript (JS) and Python MCP clients that can communicate with any MCP server, including the Gradio-based sentiment analysis server we built in the previous sections. This completes our end-to-end MCP application flow: from building a Gradio MCP server exposing a sentiment analysis tool, to creating a flexible agent that can use this tool alongside other capabilities.

<div class="tb-zh"><p>在第二单元的最后一个练习里，我们会带你实现 TypeScript（JS）和 Python 两种 MCP 客户端，它们能与任何 MCP 服务端通信，包括前面构建的基于 Gradio 的情感分析服务端。这样就补全了完整的端到端 MCP 应用链路：从构建暴露情感分析工具的 Gradio MCP 服务端，到创建一个能把这个工具与其他能力一起使用的灵活智能体。</p></div>

![meme](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/tiny-agents/thumbnail.jpg)
<figcaption>Image credit https://x.com/adamdotdev</figcaption>

## Installation

Let's install the necessary packages to build our Tiny Agents.

<div class="tb-zh"><p>我们先安装构建 Tiny Agents 所需的包。</p></div>

> [!TIP]
> Some MCP Clients, notably Claude Desktop, do not yet support SSE-based MCP Servers. In those cases, you can use a tool such as [mcp-remote](https://github.com/geelen/mcp-remote). First install Node.js. Then, add the following to your own MCP Client config:

<div class="tb-zh"><p>部分 MCP 客户端（尤其是 Claude Desktop）目前还不支持基于 SSE 的 MCP 服务端。遇到这种情况，可以借助 mcp-remote 这类工具。先安装 Node.js，然后把下面的内容加到你自己的 MCP 客户端配置里。</p></div>

Tiny Agent can run MCP servers with a command line environment. To do this, we will need to install `npm` and run the server with `npx`. **We'll need these for both Python and JavaScript.**

<div class="tb-zh"><p>Tiny Agent 可以在命令行环境中运行 MCP 服务端。为此需要安装 npm，并用 npx 运行服务端。Python 和 JavaScript 两种情况都需要它们。</p></div>

Let's install `npx` with `npm`. If you don't have `npm` installed, check out the [npm documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

<div class="tb-zh"><p>我们用 npm 安装 npx。如果你还没装 npm，请查看 npm 文档（https://docs.npmjs.com/downloading-and-installing-node-js-and-npm）。</p></div>

```bash
# install npx
npm install -g npx
```

Then, we need to install the `mcp-remote` package.

<div class="tb-zh"><p>接着需要安装 mcp-remote 包。</p></div>

```bash
npm i mcp-remote
```

For JavaScript, we need to install the `tiny-agents` package.

<div class="tb-zh"><p>JavaScript 侧需要安装 tiny-agents 包。</p></div>

```bash
npm install @huggingface/tiny-agents
```

For Python, you need to install the latest version of `huggingface_hub` with the `mcp` extra to get all the necessary components.

<div class="tb-zh"><p>Python 侧需要安装带 mcp 扩展的最新版 huggingface_hub，以获得全部所需组件。</p></div>

```bash
pip install "huggingface_hub[mcp]>=0.32.0"
```

## Tiny Agents MCP Client in the Command Line

Let's repeat the example from [Unit 1](https://huggingface.co/learn/mcp-course/unit1/mcp-clients#tiny-agents-clients) to create a basic Tiny Agent. Tiny Agents can create MCP clients from the command line based on JSON configuration files.

<div class="tb-zh"><p>我们重复第一单元中的例子（https://huggingface.co/learn/mcp-course/unit1/mcp-clients#tiny-agents-clients）来创建一个基础 Tiny Agent。Tiny Agents 可以根据 JSON 配置文件，在命令行中创建 MCP 客户端。</p></div>

Let's setup a project with a basic Tiny Agent.

<div class="tb-zh"><p>我们先搭一个包含基础 Tiny Agent 的项目。</p></div>

```bash
mkdir my-agent
touch my-agent/agent.json
cd my-agent
```

The JSON file will look like this:

<div class="tb-zh"><p>这个 JSON 文件大致如下：</p></div>

```json
{
	"model": "Qwen/Qwen2.5-72B-Instruct",
    "provider": "novita",
	"servers": [
		{
			"type": "stdio",
			"command": "npx",
			"args": [
				"mcp-remote",
				"http://localhost:7860/gradio_api/mcp/sse"
			]
		}
	]
}
```

We can then run the agent with the following command:

<div class="tb-zh"><p>然后就可以用下面的命令运行这个智能体：</p></div>

```bash
npx @huggingface/tiny-agents run agent.json
```

Let's setup a project with a basic Tiny Agent.

<div class="tb-zh"><p>我们先搭一个包含基础 Tiny Agent 的项目。</p></div>

```bash
mkdir my-agent
touch my-agent/agent.json
cd my-agent
```

The JSON file will look like this:

<div class="tb-zh"><p>这个 JSON 文件大致如下：</p></div>

```json
{
	"model": "Qwen/Qwen2.5-72B-Instruct",
    "provider": "novita",
	"servers": [
		{
			"type": "stdio",
			"command": "npx",
			"args": [
				"mcp-remote", 
				"http://localhost:7860/gradio_api/mcp/sse"
			]
		}
	]
}
```

We can then run the agent with the following command:

<div class="tb-zh"><p>然后就可以用下面的命令运行这个智能体：</p></div>

```bash
tiny-agents run agent.json
```

Here we have a basic Tiny Agent that can connect to our Gradio MCP server. It includes a model, provider, and a server configuration.

<div class="tb-zh"><p>这里我们得到了一个能连接 Gradio MCP 服务端的基础 Tiny Agent，它包含模型、提供方和服务端配置。</p></div>

| Field | Description |
|-------|-------------|
| `model` | The open source model to use for the agent |
| `provider` | The inference provider to use for the agent |
| `servers` | The servers to use for the agent. We'll use the `mcp-remote` server for our Gradio MCP server. |

> [!TIP]
> We could also use an open source model running locally with Tiny Agents. If we start a local inference server with 
>
> ```json
> \{
> 	"model": "Qwen/Qwen3-32B",
> 	"endpointUrl": "http://localhost:1234/v1",
> 	"servers": [
> 		\{
> 			"type": "stdio",
> 			"command": "npx",
> 			"args": [
> 				"mcp-remote",
> 				"http://localhost:1234/v1/mcp/sse"
> 			]
> 		\}
> 	]
> \}
> ```
>
>
> Here we have a Tiny Agent that can connect to a local model. It includes a model, endpoint URL (`http://localhost:1234/v1`), and a server configuration. The endpoint should be an OpenAI-compatible endpoint.

<div class="tb-zh"><p>我们也可以让 Tiny Agents 搭配本地运行的开源模型。只要启动一个本地推理服务，就能用下面这份配置让智能体连上本地模型：其中包含模型名、端点地址（http://localhost:1234/v1）以及服务端配置，端点需要兼容 OpenAI 接口。</p></div>

## Custom Tiny Agents MCP Client

Now that we understand both Tiny Agents and Gradio MCP servers, let's see how they work together! The beauty of MCP is that it provides a standardized way for agents to interact with any MCP-compatible server, including our Gradio-based sentiment analysis server from earlier sections.

<div class="tb-zh"><p>既然已经理解了 Tiny Agents 和 Gradio MCP 服务端，我们来看看它们如何配合。MCP 的美妙之处在于，它为智能体提供了与任何兼容 MCP 的服务端交互的标准化方式，包括前面几节中我们基于 Gradio 的情感分析服务端。</p></div>

### Using the Gradio Server with Tiny Agents

To connect our Tiny Agent to the Gradio sentiment analysis server we built earlier in this unit, we just need to add it to our list of servers. Here's how we can modify our agent configuration:

<div class="tb-zh"><p>要把 Tiny Agent 连接到本单元前面构建的 Gradio 情感分析服务端，只需把它加进我们的服务端列表。下面是修改智能体配置的方式：</p></div>

```ts
const agent = new Agent({
    provider: process.env.PROVIDER ?? "novita",
    model: process.env.MODEL_ID ?? "Qwen/Qwen2.5-72B-Instruct",
    apiKey: process.env.HF_TOKEN,
    servers: [
        // ... existing servers ...
        {
            command: "npx",
            args: [
                "mcp-remote",
                "http://localhost:7860/gradio_api/mcp/sse"  // Your Gradio MCP server
            ]
        }
    ],
});
```

```python
import os

from huggingface_hub import Agent

agent = Agent(
    model="Qwen/Qwen2.5-72B-Instruct",
    provider="novita",
    servers=[
        {
            "command": "npx",
            "args": [
                "mcp-remote",
                "http://localhost:7860/gradio_api/mcp/sse"  # Your Gradio MCP server
            ]
        }
    ],
)
```

Now our agent can use the sentiment analysis tool alongside other tools! For example, it could:
1. Read text from a file using the filesystem server
2. Analyze its sentiment using our Gradio server
3. Write the results back to a file

<div class="tb-zh"><p>现在我们的智能体就能把情感分析工具与其他工具一起使用了！比如它可以：1. 用文件系统服务端从文件读取文本；2. 用我们的 Gradio 服务端分析其情感；3. 把结果写回文件。</p></div>

### Deployment Considerations

When deploying your Gradio MCP server to Hugging Face Spaces, you'll need to update the server URL in your agent configuration to point to your deployed space:

<div class="tb-zh"><p>把你的 Gradio MCP 服务端部署到 Hugging Face Spaces 时，需要在智能体配置里把服务端 URL 更新为指向你部署好的 Space：</p></div>

```json
{
    command: "npx",
    args: [
        "mcp-remote",
        "https://YOUR_USERNAME-mcp-sentiment.hf.space/gradio_api/mcp/sse"
    ]
}
```

This allows your agent to use the sentiment analysis tool from anywhere, not just locally!

<div class="tb-zh"><p>这样你的智能体就能在任何地方使用这个情感分析工具，而不限于本地。</p></div>

## Conclusion: Our Complete End-to-End MCP Application

In this unit, we've gone from understanding MCP basics to building a complete end-to-end application:

<div class="tb-zh"><p>在本单元中，我们从理解 MCP 基础走到了构建一个完整的端到端应用：</p></div>

1. We created a Gradio MCP server that exposes a sentiment analysis tool
2. We learned how to connect to this server using MCP clients
3. We built a tiny agent in TypeScript and Python that can interact with our tool

<div class="tb-zh"><p>1. 我们做了一个 Gradio MCP 服务端，对外暴露情感分析工具；2. 学习了如何用 MCP 客户端连接这个服务端；3. 用 TypeScript 和 Python 各写了一个能与该工具交互的 tiny agent。</p></div>

This demonstrates the power of the Model Context Protocol - we can create specialized tools using frameworks we're familiar with (like Gradio), expose them through a standardized interface (MCP), and then have agents seamlessly use these tools alongside other capabilities.

<div class="tb-zh"><p>这展示了 Model Context Protocol 的威力：我们可以用熟悉的框架（比如 Gradio）创建专门工具，通过标准化接口（MCP）把它们暴露出来，再让智能体把这些工具与其他能力无缝地结合使用。</p></div>

The complete flow we've built allows an agent to:
- Connect to multiple tool providers
- Dynamically discover available tools
- Use our custom sentiment analysis tool
- Combine it with other capabilities like file system access and web browsing

<div class="tb-zh"><p>我们构建的完整链路让智能体能够：连接多个工具提供方；动态发现可用工具；使用我们自定义的情感分析工具；把它与文件系统访问、网页浏览等其他能力结合起来。</p></div>

This modular approach is what makes MCP so powerful for building flexible AI applications.

<div class="tb-zh"><p>正是这种模块化的方式，让 MCP 在构建灵活 AI 应用时如此强大。</p></div>

## Next Steps

- Check out the Tiny Agents blog posts in [Python](https://huggingface.co/blog/python-tiny-agents) and [TypeScript](https://huggingface.co/blog/tiny-agents)
- Review the [Tiny Agents documentation](https://huggingface.co/docs/huggingface.js/main/en/tiny-agents/README)
- Build something with Tiny Agents!

<div class="tb-zh"><p>可以读一读 Tiny Agents 的博客文章：Python 版与 TypeScript 版；查阅 Tiny Agents 文档；动手用 Tiny Agents 做点东西！</p></div>
