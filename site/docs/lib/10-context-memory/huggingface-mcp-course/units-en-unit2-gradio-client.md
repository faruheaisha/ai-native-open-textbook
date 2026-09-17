---
title: "Gradio as an MCP Client"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit2/gradio-client.mdx"
sourceRel: "units/en/unit2/gradio-client.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit2/gradio-client.mdx"
sourceSha256: "b7a9a6e20db190570d081e18b016e814c100d7b57f6c41a030cbcf8a4f5ccbdb"
pageSha256: "b7a9a6e20db190570d081e18b016e814c100d7b57f6c41a030cbcf8a4f5ccbdb"
contentMode: "local-full"
zh: "on"
---

# Gradio as an MCP Client

In the previous section, we explored how to create an MCP Server using Gradio and connect to it using an MCP Client. In this section, we're going to explore how to use Gradio as an MCP Client to connect to an MCP Server.

<div class="tb-zh"><p>上一节我们探讨了如何用 Gradio 创建 MCP Server，并用 MCP Client 连接它。本节我们来看如何把 Gradio 当作 MCP Client 去连接 MCP Server。</p></div>

> [!TIP]
> Gradio is best suited to the creation of UI clients and MCP servers, but it is also possible to use it as an MCP Client and expose that as a UI.

<div class="tb-zh"><p>Gradio 最适合用来搭建界面类客户端和 MCP 服务端，不过也可以用它充当 MCP 客户端，并把该客户端以界面形式暴露出来。</p></div>

We'll connect to an MCP server similar to the one we created in the previous section but with additional features, and use it to answer questions.

<div class="tb-zh"><p>我们要连接一个与上一节类似、但功能更多的 MCP 服务端，并用它来回答问题。</p></div>

## MCP Client in Gradio

### Connect to an example MCP Server

Let's connect to an example MCP Server that is already running on Hugging Face. We'll use [this one](https://huggingface.co/spaces/abidlabs/mcp-tool-http) for this example. It's a space that contains a collection of MCP tools.

<div class="tb-zh"><p>我们先连接一个已经在 Hugging Face 上运行的示例 MCP Server。本例使用这一个（https://huggingface.co/spaces/abidlabs/mcp-tool-http），它是一个包含一组 MCP 工具的 Space。</p></div>

```python
from smolagents.mcp_client import MCPClient

with MCPClient(
    {"url": "https://abidlabs-mcp-tool-http.hf.space/gradio_api/mcp/sse", "transport": "sse",}
) as tools:
    # Tools from the remote server are available
    print("\n".join(f"{t.name}: {t.description}" for t in tools))

```

<details>
<summary>Output</summary>
<pre>
<code>
prime_factors: Compute the prime factorization of a positive integer.
generate_cheetah_image: Generate a cheetah image.
image_orientation: Returns whether image is portrait or landscape.
sepia: Apply a sepia filter to the input image.
</code>
</pre>
</details>

### Connect to the MCP Server from Gradio

Great, now that you've connected to an example MCP Server. Now, you need to use it in an example application.

<div class="tb-zh"><p>很好，你已经连上了一个示例 MCP Server。接下来需要在示例应用里使用它。</p></div>

First, we need to install the `smolagents`, Gradio and mcp-client libraries, if we haven't already:

<div class="tb-zh"><p>首先安装 smolagents、Gradio 和 mcp-client 这几个库（如果还没装）：</p></div>

```bash
pip install "smolagents[mcp]" "gradio[mcp]" mcp fastmcp
```

Now, we can import the necessary libraries and create a simple Gradio interface that uses the MCP Client to connect to the MCP Server.

<div class="tb-zh"><p>现在可以导入所需的库，并创建一个简单的 Gradio 界面，用 MCP Client 连接 MCP Server。</p></div>

```python
import gradio as gr
import os

from mcp import StdioServerParameters
from smolagents import InferenceClientModel, CodeAgent, ToolCollection, MCPClient
```

Next, we'll connect to the MCP Server and get the tools that we can use to answer questions.

<div class="tb-zh"><p>接下来我们连接 MCP Server，并取得可以用来回答问题的工具。</p></div>

```python
mcp_client = MCPClient(
    {"url": "https://abidlabs-mcp-tool-http.hf.space/gradio_api/mcp/sse", "transport": "sse",} # This is the MCP Client we created in the previous section
)
tools = mcp_client.get_tools()
```

Now that we have the tools, we can create a simple agent that uses them to answer questions. We'll just use a simple `InferenceClientModel` and the default model from `smolagents` for now.

<div class="tb-zh"><p>有了工具之后，就可以创建一个简单的智能体来用它们回答问题。这里我们先用一个简单的 InferenceClientModel，以及 smolagents 的默认模型。</p></div>

It is important to pass your api_key to the InferenceClientModel. You can access the token from your huggingface account. [check here.](https://huggingface.co/docs/hub/en/security-tokens), and set the access token with the environment variable  `HF_TOKEN`.

<div class="tb-zh"><p>把 api_key 传给 InferenceClientModel 很重要。你可以在自己的 Hugging Face 账号中获取 token（参见 https://huggingface.co/docs/hub/en/security-tokens），并通过环境变量 HF_TOKEN 设置访问令牌。</p></div>

```python
model = InferenceClientModel(token=os.getenv("HF_TOKEN"))
agent = CodeAgent(tools=[*tools], model=model)
```

Now, we can create a simple Gradio interface that uses the agent to answer questions.

<div class="tb-zh"><p>现在可以创建一个简单的 Gradio 界面，用这个智能体来回答问题。</p></div>

```python
demo = gr.ChatInterface(
    fn=lambda message, history: str(agent.run(message)),
    type="messages",
    examples=["Prime factorization of 68"],
    title="Agent with MCP Tools",
    description="This is a simple agent that uses MCP tools to answer questions."
)

demo.launch()
```

And that's it! We've created a simple Gradio interface that uses the MCP Client to connect to the MCP Server and answer questions.

<div class="tb-zh"><p>就这样！我们创建了一个简单的 Gradio 界面，用 MCP Client 连接 MCP Server 并回答问题。</p></div>

<iframe
	src="https://mcp-course-unit2-gradio-client.hf.space"
	frameborder="0"
	width="850"
	height="450"
></iframe>

## Complete Example

Here's the complete example of the usage of an MCP Client in Gradio:

<div class="tb-zh"><p>下面是 Gradio 中使用 MCP Client 的完整示例：</p></div>

```python
import gradio as gr
import os

from smolagents import InferenceClientModel, CodeAgent, MCPClient

try:
    mcp_client = MCPClient(
        {"url": "https://abidlabs-mcp-tool-http.hf.space/gradio_api/mcp/sse", "transport": "sse",}
    )
    tools = mcp_client.get_tools()

    model = InferenceClientModel(token=os.getenv("HUGGINGFACE_API_TOKEN"))
    agent = CodeAgent(tools=[*tools], model=model, additional_authorized_imports=["json", "ast", "urllib", "base64"])

    demo = gr.ChatInterface(
        fn=lambda message, history: str(agent.run(message)),
        type="messages",
        examples=["Analyze the sentiment of the following text 'This is awesome'"],
        title="Agent with MCP Tools",
        description="This is a simple agent that uses MCP tools to answer questions.",
    )

    demo.launch()
finally:
    mcp_client.disconnect()
```

You'll notice that we're closing the MCP Client in the `finally` block. This is important because the MCP Client is a long-lived object that needs to be closed when the program exits.

<div class="tb-zh"><p>你会注意到我们在 finally 块里关闭了 MCP Client。这很重要，因为 MCP Client 是长生命周期对象，需要在程序退出时关闭。</p></div>

## Deploying to Hugging Face Spaces

To make your server available to others, you can deploy it to Hugging Face Spaces, just like we did in the previous section.
To deploy your Gradio MCP client to Hugging Face Spaces:

<div class="tb-zh"><p>若要让别人也能访问，你可以像上一节那样把它部署到 Hugging Face Spaces。要把 Gradio MCP 客户端部署到 Hugging Face Spaces：</p></div>

1. Create a new Space on Hugging Face:
   - Go to huggingface.co/spaces
   - Click "Create new Space"
   - Choose "Gradio" as the SDK
   - Name your space (e.g., "mcp-client")

<div class="tb-zh"><p>1. 在 Hugging Face 上创建一个新的 Space：进入 huggingface.co/spaces；点击「Create new Space」；SDK 选择「Gradio」；给 Space 起个名字（例如「mcp-client」）。</p></div>

2. Update MCP Server URL in the code:

<div class="tb-zh"><p>2. 在代码中更新 MCP 服务端的地址：</p></div>

```python
mcp_client = MCPClient(
    {"url": "https://abidlabs-mcp-tool-http.hf.space/gradio_api/mcp/sse", "transport": "sse"}
)
```

3. Create a `requirements.txt` file:

<div class="tb-zh"><p>3. 创建 requirements.txt 文件：</p></div>

```txt
gradio[mcp]
smolagents[mcp]
```

4. Push your code to the Space:

<div class="tb-zh"><p>4. 把代码推送到该 Space：</p></div>

```bash
git init
git add app.py requirements.txt
git commit -m "Initial commit"
git remote add origin https://huggingface.co/spaces/YOUR_USERNAME/mcp-client
git push -u origin main
```

Note: While adding remote origin, Refer to [password-git-deprecation](https://huggingface.co/blog/password-git-deprecation) for adding with AccessToken.

<div class="tb-zh"><p>注意：添加 remote origin 时，添加 AccessToken 的方式请参考 password-git-deprecation（https://huggingface.co/blog/password-git-deprecation）。</p></div>

## Conclusion

In this section, we've explored how to use Gradio as an MCP Client to connect to an MCP Server. We've also seen how to deploy the MCP Client in Hugging Face Spaces.

<div class="tb-zh"><p>本节我们探讨了如何把 Gradio 当作 MCP Client 连接 MCP Server，也看到了如何在 Hugging Face Spaces 中部署这个 MCP 客户端。</p></div>
