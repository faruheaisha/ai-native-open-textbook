---
title: "Building the Gradio MCP Server"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit2/gradio-server.mdx"
sourceRel: "units/en/unit2/gradio-server.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit2/gradio-server.mdx"
sourceSha256: "ec3a4bcce9ca94c8356464eeaa0751aa8edf5fa021326ec73a6f29dfa3514db1"
pageSha256: "ec3a4bcce9ca94c8356464eeaa0751aa8edf5fa021326ec73a6f29dfa3514db1"
contentMode: "local-full"
zh: "on"
---

# Building the Gradio MCP Server

In this section, we'll create our sentiment analysis MCP server using Gradio. This server will expose a sentiment analysis tool that can be used by both human users through a web interface and AI models through the MCP protocol.

<div class="tb-zh"><p>本节我们用 Gradio 创建情感分析 MCP 服务端。这个服务端会暴露一个情感分析工具，人类用户可以通过网页界面使用它，AI 模型则可以通过 MCP 协议使用它。</p></div>

## Introduction to Gradio MCP Integration

Gradio provides a straightforward way to create MCP servers by automatically converting your Python functions into MCP tools. When you set `mcp_server=True` in `launch()`, Gradio:

<div class="tb-zh"><p>Gradio 把 Python 函数自动转换成 MCP 工具，因此创建 MCP 服务端非常直接。当你在 launch() 中设置 mcp_server=True 时，Gradio 会：</p></div>

1. Automatically converts your functions into MCP Tools
2. Maps input components to tool argument schemas
3. Determines response formats from output components
4. Sets up JSON-RPC over HTTP+SSE for client-server communication
5. Creates both a web interface and an MCP server endpoint

<div class="tb-zh"><p>1. 自动把你的函数转换为 MCP Tools；2. 把输入组件映射为工具的参数结构；3. 依据输出组件决定响应格式；4. 为客户端—服务端通信搭好基于 HTTP+SSE 的 JSON-RPC；5. 同时生成网页界面与 MCP 服务端端点。</p></div>

## Setting Up the Project

First, let's create a new directory for our project and set up the required dependencies:

<div class="tb-zh"><p>首先，为我们的项目新建一个目录并安装所需依赖：</p></div>

```bash
mkdir mcp-sentiment
cd mcp-sentiment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install "gradio[mcp]" textblob
```

## Creating the Server

> Hugging face spaces needs an app.py file to build the space. So the name of the python file has to be app.py 

<div class="tb-zh"><p>Hugging Face Spaces 需要一个 app.py 文件来构建 Space，因此这个 Python 文件必须命名为 app.py。</p></div>

Create a new file called `app.py` with the following code:

<div class="tb-zh"><p>新建一个名为 app.py 的文件，写入以下代码：</p></div>

```python
import json
import gradio as gr
from textblob import TextBlob

def sentiment_analysis(text: str) -> str:
    """
    Analyze the sentiment of the given text.

    Args:
        text (str): The text to analyze

    Returns:
        str: A JSON string containing polarity, subjectivity, and assessment
    """
    blob = TextBlob(text)
    sentiment = blob.sentiment
    
    result = {
        "polarity": round(sentiment.polarity, 2),  # -1 (negative) to 1 (positive)
        "subjectivity": round(sentiment.subjectivity, 2),  # 0 (objective) to 1 (subjective)
        "assessment": "positive" if sentiment.polarity > 0 else "negative" if sentiment.polarity < 0 else "neutral"
    }

    return json.dumps(result)

# Create the Gradio interface
demo = gr.Interface(
    fn=sentiment_analysis,
    inputs=gr.Textbox(placeholder="Enter text to analyze..."),
    outputs=gr.Textbox(),  # Changed from gr.JSON() to gr.Textbox()
    title="Text Sentiment Analysis",
    description="Analyze the sentiment of text using TextBlob"
)

# Launch the interface and MCP server
if __name__ == "__main__":
    demo.launch(mcp_server=True)
```

## Understanding the Code

Let's break down the key components:

<div class="tb-zh"><p>下面拆解其中的关键部分：</p></div>

1. **Function Definition**:
   - The `sentiment_analysis` function takes a text input and returns the string representation of a JSON dictionary
   - It uses TextBlob to analyze the sentiment
   - The docstring is crucial as it helps Gradio generate the MCP tool schema
   - Type hints (`str` and `dict`) help define the input/output schema

<div class="tb-zh"><p>1. 函数定义：sentiment_analysis 函数接收一段文本，返回 JSON 字典的字符串形式；它用 TextBlob 做情感分析；文档字符串非常关键，它帮助 Gradio 生成 MCP 工具结构；类型标注（str 与 dict）有助于界定输入/输出结构。</p></div>

2. **Gradio Interface**:
   - `gr.Interface` creates both the web UI and MCP server
   - The function is exposed as an MCP tool automatically
   - Input and output components define the tool's schema
   - The JSON output component ensures proper serialization

<div class="tb-zh"><p>2. Gradio 界面：gr.Interface 同时创建网页界面与 MCP 服务端；该函数被自动暴露为 MCP 工具；输入与输出组件决定了工具的结构；JSON 输出组件保证序列化正确。</p></div>

3. **MCP Server**:
   - Setting `mcp_server=True` enables the MCP server
   - The server will be available at `http://localhost:7860/gradio_api/mcp/sse`
   - You can also enable it using the environment variable:

<div class="tb-zh"><p>3. MCP 服务端：设置 mcp_server=True 即可启用 MCP 服务端；服务端将位于 http://localhost:7860/gradio_api/mcp/sse；你也可以用环境变量来启用。</p></div>

     ```bash
     export GRADIO_MCP_SERVER=True
     ```

## Running the Server

Start the server by running:

<div class="tb-zh"><p>运行以下命令启动服务端：</p></div>

```bash
python app.py
```

You should see output indicating that both the web interface and MCP server are running. The web interface will be available at `http://localhost:7860`, and the MCP server at `http://localhost:7860/gradio_api/mcp/sse`.

<div class="tb-zh"><p>你会看到日志表明网页界面和 MCP 服务端都已启动。网页界面位于 http://localhost:7860，MCP 服务端位于 http://localhost:7860/gradio_api/mcp/sse。</p></div>

## Testing the Server

You can test the server in two ways:

<div class="tb-zh"><p>有两种方式可以测试这个服务端：</p></div>

1. **Web Interface**:
   - Open `http://localhost:7860` in your browser
   - Enter some text and click "Submit"
   - You should see the sentiment analysis results

<div class="tb-zh"><p>1. 网页界面：在浏览器中打开 http://localhost:7860；输入一些文字并点击「Submit」；你应当能看到情感分析结果。</p></div>

2. **MCP Schema**:
   - Visit `http://localhost:7860/gradio_api/mcp/schema`
   - This shows the MCP tool schema that clients will use
   - You can also find this in the "View API" link in the footer of your Gradio app

<div class="tb-zh"><p>2. MCP 结构：访问 http://localhost:7860/gradio_api/mcp/schema；这里展示客户端将要使用的 MCP 工具结构；你也可以在 Gradio 应用页脚的「View API」链接中找到它。</p></div>

## Troubleshooting Tips

1. **Type Hints and Docstrings**:
   - Always provide type hints for your function parameters and return values
   - Include a docstring with an "Args:" block for each parameter
   - This helps Gradio generate accurate MCP tool schemas

<div class="tb-zh"><p>1. 类型标注与文档字符串：务必为函数参数与返回值提供类型标注；为每个参数在文档字符串里写明「Args:」段落；这能帮助 Gradio 生成准确的 MCP 工具结构。</p></div>

2. **String Inputs**:
   - When in doubt, accept input arguments as `str`
   - Convert them to the desired type inside the function
   - This provides better compatibility with MCP clients

<div class="tb-zh"><p>2. 字符串输入：拿不准时，先把输入参数声明为 str；再在函数内部转换成目标类型；这样与 MCP 客户端的兼容性更好。</p></div>

3. **SSE Support**:
   - Some MCP clients don't support SSE-based MCP Servers
   - In those cases, use `mcp-remote`:

<div class="tb-zh"><p>3. SSE 支持：部分 MCP 客户端不支持基于 SSE 的 MCP 服务端；遇到这种情况，请使用 mcp-remote。</p></div>

     ```json
     \{
       "mcpServers": \{
         "gradio": \{
           "command": "npx",
           "args": [
             "mcp-remote",
             "http://localhost:7860/gradio_api/mcp/sse"
           ]
         \}
       \}
     \}
     ```

4. **Connection Issues**:
   - If you encounter connection problems, try restarting both the client and server
   - Check that the server is running and accessible
   - Verify that the MCP schema is available at the expected URL

<div class="tb-zh"><p>4. 连接问题：如果遇到连接问题，试着同时重启客户端与服务端；确认服务端正在运行且可访问；确认 MCP 结构能在预期的地址访问到。</p></div>

## Deploying to Hugging Face Spaces

To make your server available to others, you can deploy it to Hugging Face Spaces:

<div class="tb-zh"><p>若要让别人也能访问你的服务端，可以把它部署到 Hugging Face Spaces：</p></div>

1. Create a new Space on Hugging Face:
   - Go to [huggingface.co/spaces](https://huggingface.co/spaces)
   - Click "New Space"
   - Name your space (e.g., "mcp-sentiment")
   - Choose "Gradio" as the SDK
   - Click "Create Space"

<div class="tb-zh"><p>1. 在 Hugging Face 上创建一个新的 Space：进入 huggingface.co/spaces；点击「New Space」；给 Space 起名（例如「mcp-sentiment」）；SDK 选择「Gradio」；点击「Create Space」。</p></div>

2. Create a `requirements.txt` file:

<div class="tb-zh"><p>2. 创建 requirements.txt 文件：</p></div>

```txt
gradio[mcp]
textblob
```

3. Push your code to the Space:

<div class="tb-zh"><p>3. 把代码推送到该 Space：</p></div>

```bash
git init
git add app.py requirements.txt
git commit -m "Initial commit"
git remote add origin https://huggingface.co/spaces/YOUR_USERNAME/mcp-sentiment
git push -u origin main
```

Your MCP server will now be available at:

<div class="tb-zh"><p>你的 MCP 服务端现在可以通过以下地址访问：</p></div>

```
https://YOUR_USERNAME-mcp-sentiment.hf.space/gradio_api/mcp/sse
```

## Next Steps

Now that we have our MCP server running, we'll create clients to interact with it. In the next sections, we'll:

<div class="tb-zh"><p>现在 MCP 服务端已经跑起来了，接下来我们创建客户端与它交互。在后续小节中，我们将：</p></div>

1. Create a HuggingFace.js-based client inspired by Tiny Agents
2. Implement a SmolAgents-based Python client
3. Test both clients with our deployed server

<div class="tb-zh"><p>1. 参考 Tiny Agents 写一个基于 HuggingFace.js 的客户端；2. 用 SmolAgents 实现一个 Python 客户端；3. 用已部署的服务端测试这两个客户端。</p></div>

Let's move on to building our first client!

<div class="tb-zh"><p>我们继续构建第一个客户端！</p></div>
