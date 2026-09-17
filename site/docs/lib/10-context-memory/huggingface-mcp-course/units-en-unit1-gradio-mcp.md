---
title: "Gradio MCP Integration"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit1/gradio-mcp.mdx"
sourceRel: "units/en/unit1/gradio-mcp.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit1/gradio-mcp.mdx"
sourceSha256: "042b894d5f134a315ea844b363afe114eb00105b1d858f9c290abdca6f4165cf"
pageSha256: "042b894d5f134a315ea844b363afe114eb00105b1d858f9c290abdca6f4165cf"
contentMode: "local-full"
zh: "on"
---

# Gradio MCP Integration

We've now explored the core concepts of the MCP protocol and how to implement MCP Servers and Clients. In this section, we're going to make things slightly easier by using Gradio to create an MCP Server!

<div class="tb-zh"><p>我们已经探讨了 MCP 协议的核心概念，以及如何实现 MCP 服务端与客户端。本节我们让这件事稍微轻松一些——用 Gradio 来创建 MCP Server。</p></div>

> [!TIP]
> Gradio is a popular Python library for quickly creating customizable web interfaces for machine learning models.

<div class="tb-zh"><p>Gradio 是一个流行的 Python 库，可以快速为机器学习模型搭建可定制的网页界面。</p></div>

## Introduction to Gradio

Gradio allows developers to create UIs for their models with just a few lines of Python code. It's particularly useful for:

<div class="tb-zh"><p>Gradio 让开发者只用几行 Python 代码就能为模型做出界面，它尤其适用于：</p></div>

- Creating demos and prototypes
- Sharing models with non-technical users
- Testing and debugging model behavior

<div class="tb-zh"><p>制作演示与原型；把模型分享给非技术用户；测试与调试模型行为。</p></div>

With the addition of MCP support, Gradio now offers a straightforward way to expose AI model capabilities through the standardized MCP protocol.

<div class="tb-zh"><p>在加入 MCP 支持之后，Gradio 现在提供了一条直接的方式，通过标准化的 MCP 协议暴露 AI 模型能力。</p></div>

Combining Gradio with MCP allows you to create both human-friendly interfaces and AI-accessible tools with minimal code. But best of all, Gradio is already well-used by the AI community, so you can use it to share your MCP Servers with others.

<div class="tb-zh"><p>把 Gradio 与 MCP 结合，你可以用极少的代码同时做出对人类友好的界面和可供 AI 调用的工具。更棒的是，Gradio 在 AI 社区中已被广泛使用，因此你可以用它把自己的 MCP Server 分享给别人。</p></div>

## Prerequisites

To use Gradio with MCP support, you'll need to install Gradio with the MCP extra:

<div class="tb-zh"><p>要使用带 MCP 支持的 Gradio，需要安装带 MCP 扩展的 Gradio：</p></div>

```bash
uv pip install "gradio[mcp]"
```

You'll also need an LLM application that supports tool calling using the MCP protocol, such as Cursor ( known as "MCP Hosts").

<div class="tb-zh"><p>你还需要一个支持通过 MCP 协议调用工具的 LLM 应用，例如 Cursor（这类应用被称为 MCP Host）。</p></div>

## Creating an MCP Server with Gradio

Let's walk through a basic example of creating an MCP Server using Gradio:

<div class="tb-zh"><p>我们用一个基础示例走一遍用 Gradio 创建 MCP Server 的过程：</p></div>

```python
import gradio as gr

def letter_counter(word: str, letter: str) -> int:
    """
    Count the number of occurrences of a letter in a word or text.

    Args:
        word (str): The input text to search through
        letter (str): The letter to search for

    Returns:
        int: The number of times the letter appears in the text
    """
    word = word.lower()
    letter = letter.lower()
    count = word.count(letter)
    return count

# Create a standard Gradio interface
demo = gr.Interface(
    fn=letter_counter,
    inputs=["textbox", "textbox"],
    outputs="number",
    title="Letter Counter",
    description="Enter text and a letter to count how many times the letter appears in the text."
)

# Launch both the Gradio web interface and the MCP server
if __name__ == "__main__":
    demo.launch(mcp_server=True)
```

With this setup, your letter counter function is now accessible through:

<div class="tb-zh"><p>按这个设置，你的字母计数函数现在可以通过以下方式访问：</p></div>

1. A traditional Gradio web interface for direct human interaction
2. An MCP Server that can be connected to compatible clients

<div class="tb-zh"><p>1. 传统的 Gradio 网页界面，供人直接交互；2. 一个可供兼容客户端连接的 MCP 服务端。</p></div>

The MCP server will be accessible at:

<div class="tb-zh"><p>MCP 服务端可通过以下地址访问：</p></div>

```
http://your-server:port/gradio_api/mcp/sse
```

The application itself will still be accessible and it looks like this:

<div class="tb-zh"><p>应用本身依然可以访问，界面大致如下：</p></div>

![Gradio MCP Server](https://huggingface.co/datasets/mcp-course/images/resolve/main/unit1/7.png)

## How It Works Behind the Scenes

When you set `mcp_server=True` in `launch()`, several things happen:

<div class="tb-zh"><p>当你在 launch() 中设置 mcp_server=True 时，会发生几件事：</p></div>

1. Gradio functions are automatically converted to MCP Tools
2. Input components map to tool argument schemas
3. Output components determine the response format
4. The Gradio server now also listens for MCP protocol messages
5. JSON-RPC over HTTP+SSE is set up for client-server communication

<div class="tb-zh"><p>1. Gradio 函数会被自动转换为 MCP Tools；2. 输入组件映射为工具的参数结构；3. 输出组件决定响应的格式；4. Gradio 服务端同时开始监听 MCP 协议消息；5. 为客户端—服务端通信搭好基于 HTTP+SSE 的 JSON-RPC。</p></div>

## Key Features of the Gradio <> MCP Integration

1. **Tool Conversion**: Each API endpoint in your Gradio app is automatically converted into an MCP tool with a corresponding name, description, and input schema. To view the tools and schemas, visit `http://your-server:port/gradio_api/mcp/schema` or go to the "View API" link in the footer of your Gradio app, and then click on "MCP".

<div class="tb-zh"><p>1. 工具转换：Gradio 应用中的每个 API 端点都会被自动转换为一个 MCP 工具，并带有相应的名称、说明与输入结构。想查看工具与结构，可以访问 http://your-server:port/gradio_api/mcp/schema，或点击 Gradio 应用页脚的「View API」链接，再选择「MCP」。</p></div>

2. **Environment Variable Support**: There are two ways to enable the MCP server functionality:
- Using the `mcp_server` parameter in `launch()`:

<div class="tb-zh"><p>2. 环境变量支持：启用 MCP 服务端功能有两种方式：一是在 launch() 中传入 mcp_server 参数。</p></div>

  ```python
  demo.launch(mcp_server=True)
  ```

- Using environment variables:

<div class="tb-zh"><p>二是使用环境变量。</p></div>

  ```bash
  export GRADIO_MCP_SERVER=True
  ```

3. **File Handling**: The server automatically handles file data conversions, including:
   - Converting base64-encoded strings to file data
   - Processing image files and returning them in the correct format
   - Managing temporary file storage

<div class="tb-zh"><p>3. 文件处理：服务端会自动处理文件数据的转换，包括：把 base64 编码的字符串还原为文件数据；处理图片文件并以正确的格式返回；管理临时文件的存储。</p></div>

   It is **strongly** recommended that input images and files be passed as full URLs ("http://..." or "https://...") as MCP Clients do not always handle local files correctly.

<div class="tb-zh"><p>非常强烈建议把输入的图片和文件以完整 URL（http://... 或 https://...）的形式传入，因为 MCP 客户端并不总能正确处理本地文件。</p></div>

4. **Hosted MCP Servers on 🤗 Spaces**: You can publish your Gradio application for free on Hugging Face Spaces, which will allow you to have a free hosted MCP server. Here's an example of such a Space: https://huggingface.co/spaces/abidlabs/mcp-tools

<div class="tb-zh"><p>4. 在 🤗 Spaces 上托管 MCP 服务端：你可以把 Gradio 应用免费发布到 Hugging Face Spaces，从而免费拥有一个托管的 MCP 服务端。这个 Space 就是一个例子：https://huggingface.co/spaces/abidlabs/mcp-tools</p></div>

## Use MCP-compatible Spaces from your client

You can connect any MCP-compatible Space to your assistant via Hugging Face MCP settings:

<div class="tb-zh"><p>你可以通过 Hugging Face MCP 设置，把任何兼容 MCP 的 Space 连接到你的助手：</p></div>

1. Explore MCP-compatible Spaces: https://huggingface.co/spaces?search=mcp
2. Open https://huggingface.co/settings/mcp (logged in) and add the Space.
3. Restart or refresh your MCP client so it discovers the new tools.

<div class="tb-zh"><p>1. 浏览兼容 MCP 的 Spaces：https://huggingface.co/spaces?search=mcp；2. 登录后打开 https://huggingface.co/settings/mcp 并添加该 Space；3. 重启或刷新你的 MCP 客户端，让它发现新工具。</p></div>

These Spaces expose their functions as tools with arguments and descriptions, so your assistant can call them directly.

<div class="tb-zh"><p>这些 Space 会把自身的函数作为带参数和描述的工具暴露出来，因此你的助手可以直接调用它们。</p></div>

## Troubleshooting Tips

1. **Type Hints and Docstrings**: Ensure you provide type hints and valid docstrings for your functions. The docstring should include an "Args:" block with indented parameter names.

<div class="tb-zh"><p>1. 类型标注与文档字符串：务必为函数提供类型标注和有效的文档字符串。文档字符串中应包含一个「Args:」段落，参数名需要缩进。</p></div>

2. **String Inputs**: When in doubt, accept input arguments as `str` and convert them to the desired type inside the function.

<div class="tb-zh"><p>2. 字符串输入：拿不准时，先把输入参数声明为 str，再在函数内部转换成目标类型。</p></div>

3. **SSE Support**: Some MCP Hosts don't support SSE-based MCP Servers. In those cases, you can use `mcp-remote`:

<div class="tb-zh"><p>3. SSE 支持：部分 MCP Host 不支持基于 SSE 的 MCP 服务端。遇到这种情况，可以使用 mcp-remote：</p></div>

   ```json
   {
     "mcpServers": {
       "gradio": {
         "command": "npx",
         "args": [
           "mcp-remote",
           "http://your-server:port/gradio_api/mcp/sse"
         ]
       }
     }
   }
   ```

4. **Restart**: If you encounter connection issues, try restarting both your MCP Client and MCP Server.

<div class="tb-zh"><p>4. 重启：如果遇到连接问题，试着同时重启 MCP 客户端与服务端。</p></div>

## Share your MCP Server

You can share your MCP Server by publishing your Gradio app to Hugging Face Spaces. The video below shows how to create a Hugging Face Space.

<div class="tb-zh"><p>你可以把 Gradio 应用发布到 Hugging Face Spaces 来分享你的 MCP Server。下面的视频演示了如何创建一个 Hugging Face Space。</p></div>

Now, you can share your MCP Server with others by sharing your Hugging Face Space.

<div class="tb-zh"><p>现在，你只要分享自己的 Hugging Face Space，就能把 MCP Server 分享给别人。</p></div>

## Conclusion

Gradio's integration with MCP provides an accessible entry point to the MCP ecosystem. By leveraging Gradio's simplicity and adding MCP's standardization, developers can quickly create both human-friendly interfaces and AI-accessible tools with minimal code.

<div class="tb-zh"><p>Gradio 与 MCP 的集成为 MCP 生态提供了一个容易上手的入口。借助 Gradio 的简洁，再加上 MCP 的标准化，开发者可以用极少的代码快速做出对人类友好的界面和可供 AI 调用的工具。</p></div>

As we progress through this course, we'll explore more sophisticated MCP implementations, but Gradio offers an excellent starting point for understanding and experimenting with the protocol.

<div class="tb-zh"><p>随着课程推进，我们会探讨更复杂的 MCP 实现，但 Gradio 为理解和试验这一协议提供了一个很好的起点。</p></div>

In the next unit, we'll dive deeper into building MCP applications, focusing on setting up development environments, exploring SDKs, and implementing more advanced MCP Servers and Clients.

<div class="tb-zh"><p>下一单元我们会更深入地构建 MCP 应用，重点是搭建开发环境、了解 SDK，以及实现更进阶的 MCP 服务端与客户端。</p></div>
