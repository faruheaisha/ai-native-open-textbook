---
title: "MCP Client"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit3_1/mcp-client.mdx"
sourceRel: "units/en/unit3_1/mcp-client.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit3_1/mcp-client.mdx"
sourceSha256: "2b6d75e3ccf10082d43dfcc67547b12c5ec26b1eb4fc3b7686cb61d9e230288a"
pageSha256: "2b6d75e3ccf10082d43dfcc67547b12c5ec26b1eb4fc3b7686cb61d9e230288a"
contentMode: "local-full"
zh: "on"
---

# MCP Client

Now that we have our MCP server with tagging tools, we need to create a client that can interact with these tools. The MCP client serves as the bridge between our webhook handler and the MCP server, enabling our agent to use the Hub tagging functionality.

<div class="tb-zh"><p>现在我们有了带打标签工具的 MCP 服务端，还需要创建一个能与这些工具交互的客户端。MCP 客户端充当 webhook 处理器与 MCP 服务端之间的桥梁，让我们的智能体能够使用 Hub 的打标签功能。</p></div>

For the sake of this project, we'll build both an API and a Gradio app. The API will be used to test the MCP server and the webhook listener, and the Gradio app will be used to test the MCP client with simulated webhook events.

<div class="tb-zh"><p>就本项目而言，我们会同时构建一个 API 和一个 Gradio 应用。API 用于测试 MCP 服务端和 webhook 监听器，Gradio 应用则用模拟的 webhook 事件来测试 MCP 客户端。</p></div>

> [!TIP]
> For educational purposes, we will build the MCP Server and MCP Client in the same repo. In a real-world application, you would likely have a separate repo for the MCP Server and MCP Client. In fact, you might only build one of these components.

<div class="tb-zh"><p>出于教学考虑，我们把 MCP 服务端与 MCP 客户端放在同一个仓库里。真实项目中，你通常会把它们分到不同仓库，甚至只构建其中一部分。</p></div>

## Understanding the MCP Client Architecture

In our application, the MCP client is integrated into the main FastAPI application (`app.py`). It creates and manages connections to our MCP server, providing a seamless interface for tool execution.

<div class="tb-zh"><p>在我们的应用中，MCP 客户端集成在主体的 FastAPI 应用（app.py）里。它创建并管理与 MCP 服务端的连接，为工具执行提供无缝接口。</p></div>

![MCP Client Integration](https://huggingface.co/datasets/mcp-course/images/resolve/main/unit3/app.png)

## Agent-Based MCP Client

We use the `huggingface_hub` Agent class that has built-in MCP support. This provides both language model capabilities and MCP tool integration in a single component.

<div class="tb-zh"><p>我们使用 huggingface_hub 中内置 MCP 支持的 Agent 类。它在同一个组件里同时提供语言模型能力和 MCP 工具集成。</p></div>

### 1. Agent Configuration

Let's start by setting up the agent configuration and understanding each component:

<div class="tb-zh"><p>我们先配置智能体，并理解其中的每个组件：</p></div>

```python
from huggingface_hub.inference._mcp.agent import Agent
from typing import Optional, Literal

# Configuration
HF_TOKEN = os.getenv("HF_TOKEN")
HF_MODEL = os.getenv("HF_MODEL", "microsoft/DialoGPT-medium")
DEFAULT_PROVIDER: Literal["hf-inference"] = "hf-inference"

# Global agent instance
agent_instance: Optional[Agent] = None
```

We start with the necessary imports and configuration. The global `agent_instance` variable ensures we create the agent only once and reuse it across multiple requests. This is important for performance since agent initialization can be expensive.

<div class="tb-zh"><p>我们从必要的导入和配置开始。全局的 agent_instance 变量保证智能体只创建一次，并在多个请求之间复用。这一点对性能很重要，因为智能体初始化开销可能很大。</p></div>

Now let's implement the function that creates and manages our agent:

<div class="tb-zh"><p>现在实现创建和管理智能体的函数：</p></div>

```python
async def get_agent():
    """Get or create Agent instance"""
    print("🤖 get_agent() called...")
    global agent_instance
    if agent_instance is None and HF_TOKEN:
        print("🔧 Creating new Agent instance...")
        print(f"🔑 HF_TOKEN present: {bool(HF_TOKEN)}")
        print(f"🤖 Model: {HF_MODEL}")
        print(f"🔗 Provider: {DEFAULT_PROVIDER}")
```

The function starts by checking if we already have an agent instance. This singleton pattern prevents unnecessary recreations and ensures consistent state.

<div class="tb-zh"><p>函数先检查是否已有智能体实例。这种单例模式避免了不必要的重复创建，并保证状态一致。</p></div>

Let's continue with the agent creation:

<div class="tb-zh"><p>继续看智能体的创建：</p></div>

```python
        try:
            agent_instance = Agent(
                model=HF_MODEL,
                provider=DEFAULT_PROVIDER,
                api_key=HF_TOKEN,
                servers=[
                    {
                        "type": "stdio",
                        "command": "python",
                        "args": ["mcp_server.py"],
                        "cwd": ".",
                        "env": {"HF_TOKEN": HF_TOKEN} if HF_TOKEN else {},
                    }
                ],
            )
            print("✅ Agent instance created successfully")
            print("🔧 Loading tools...")
            await agent_instance.load_tools()
            print("✅ Tools loaded successfully")
        except Exception as e:
            print(f"❌ Error creating/loading agent: {str(e)}")
            agent_instance = None
```

This is where the important part happens! Let's break down the Agent configuration:

<div class="tb-zh"><p>关键部分就在这里！我们来拆解 Agent 的配置：</p></div>

**Agent Parameters:**
- `model`: The language model that will reason about tool usage
- `provider`: How to access the model (Hugging Face Inference Providers)
- `api_key`: Hugging Face API key

<div class="tb-zh"><p>Agent 参数：model——用于推理如何使用工具的语言模型；provider——如何访问模型（Hugging Face Inference Providers）；api_key——Hugging Face API 密钥。</p></div>

**MCP Server Connection:**
- `type: "stdio"`: Connect to the MCP server via standard input/output
- `command: "python"`: Run our MCP server as a Python subprocess
- `args: ["mcp_server.py"]`: The script file to execute
- `env`: Pass the HF_TOKEN to the server process

<div class="tb-zh"><p>MCP 服务端连接：type 为 stdio——通过标准输入输出连接 MCP 服务端；command 为 python——把我们的 MCP 服务端作为 Python 子进程运行；args 为 mcp_server.py——要执行的脚本文件；env——把 HF_TOKEN 传给服务端进程。</p></div>

> [!TIP]
> The `stdio` connection type means the agent starts your MCP server as a subprocess and communicates with it through standard input/output. This is perfect for development and single-machine deployments.

<div class="tb-zh"><p>stdio 连接类型意味着智能体会把你的 MCP 服务端作为子进程启动，并通过标准输入输出来通信。这种方式非常适合开发阶段与单机部署。</p></div>

The `load_tools()` call is crucial - it discovers what tools are available from the MCP server and makes them accessible to the agent's reasoning engine.

<div class="tb-zh"><p>load_tools() 的调用至关重要——它会发现 MCP 服务端上有哪些可用工具，并把它们提供给智能体的推理引擎。</p></div>

This completes our agent management function with proper error handling and logging.

<div class="tb-zh"><p>至此，我们的智能体管理函数就完整了，并带有恰当的错误处理和日志。</p></div>

## Tool Discovery and Usage

Once the agent is created and tools are loaded, it can automatically discover and use the MCP tools. This is where the real power of the Agent approach shines.

<div class="tb-zh"><p>智能体创建完成、工具加载完毕之后，它就能自动发现并使用这些 MCP 工具。Agent 这一路线的真正威力正在于此。</p></div>

### Available Tools

The agent discovers our MCP tools automatically:
- `get_current_tags(repo_id: str)` - Retrieve existing repository tags
- `add_new_tag(repo_id: str, new_tag: str)` - Add new tag via pull request

<div class="tb-zh"><p>智能体会自动发现我们的 MCP 工具：get_current_tags(repo_id: str)——读取仓库现有标签；add_new_tag(repo_id: str, new_tag: str)——通过 pull request 添加新标签。</p></div>

The agent doesn't just call these tools blindly - it reasons about when and how to use them based on the prompt you give it.

<div class="tb-zh"><p>智能体并不是盲目调用这些工具——它会根据你给出的提示词，推理该在何时、以何种方式使用它们。</p></div>

### Tool Execution Example

Here's how the agent intelligently uses tools:

<div class="tb-zh"><p>下面是智能体智能使用工具的方式：</p></div>

```python
# Example of how the agent would use tools
async def example_tool_usage():
    agent = await get_agent()
    
    if agent:
        # The agent can reason about which tools to use
        response = await agent.run(
            "Check the current tags for microsoft/DialoGPT-medium and add the tag 'conversational-ai' if it's not already present"
        )
        print(response)
```

Notice how we give the agent a natural language instruction, and it figures out:
1. First call `get_current_tags` to see what tags exist
2. Check if `conversational-ai` is already there
3. If not, call `add_new_tag` to add it
4. Provide a summary of what it did

<div class="tb-zh"><p>注意我们给智能体的是一句自然语言指令，而它能自己判断出：1. 先调用 get_current_tags 看有哪些标签；2. 检查 conversational-ai 是否已经在里面；3. 如果没有，就调用 add_new_tag 把它加上；4. 给出它做了什么事的摘要。</p></div>

This is much more intelligent than calling tools directly!

<div class="tb-zh"><p>这比直接调用工具要智能得多！</p></div>

## Integration with Webhook Processing

Now let's see how the MCP client integrates into our webhook processing pipeline. This is where everything comes together.

<div class="tb-zh"><p>现在我们来看 MCP 客户端如何集成进 webhook 处理流水线。所有环节在这里汇聚。</p></div>

### 1. Tag Extraction and Processing

Here's the main function that processes webhook events and uses our MCP agent:

<div class="tb-zh"><p>下面是处理 webhook 事件并使用 MCP 智能体的主函数：</p></div>

```python
async def process_webhook_comment(webhook_data: Dict[str, Any]):
    """Process webhook to detect and add tags"""
    print("🏷️ Starting process_webhook_comment...")

    try:
        comment_content = webhook_data["comment"]["content"]
        discussion_title = webhook_data["discussion"]["title"]
        repo_name = webhook_data["repo"]["name"]
        
        # Extract potential tags from the comment and discussion title
        comment_tags = extract_tags_from_text(comment_content)
        title_tags = extract_tags_from_text(discussion_title)
        all_tags = list(set(comment_tags + title_tags))

        print(f"🔍 All unique tags: {all_tags}")

        if not all_tags:
            return ["No recognizable tags found in the discussion."]
```

This first part extracts and combines tags from both the comment content and discussion title. We use a set to deduplicate any tags that appear in both places.

<div class="tb-zh"><p>第一部分从评论内容和讨论标题中分别提取标签并把它们合并。我们用集合来对两处都出现的标签去重。</p></div>

> [!TIP]
> Processing both the comment and discussion title increases our chances of catching relevant tags. Users might mention tags in the title like "Missing pytorch tag" or in comments like "This needs #transformers".

<div class="tb-zh"><p>同时处理评论正文与讨论标题，能提高我们捕捉到相关标签的概率。用户可能把标签写在标题里（如「Missing pytorch tag」），也可能写在评论里（如「This needs #transformers」）。</p></div>

Next, we get our agent and process each tag:

<div class="tb-zh"><p>接着取得智能体，并逐个处理标签：</p></div>

```python
        # Get agent instance
        agent = await get_agent()
        if not agent:
            return ["Error: Agent not configured (missing HF_TOKEN)"]

        # Process each tag
        result_messages = []
        for tag in all_tags:
            try:
                # Use agent to process the tag
                prompt = f"""
                For the repository '{repo_name}', check if the tag '{tag}' already exists.
                If it doesn't exist, add it via a pull request.
                
                Repository: {repo_name}
                Tag to check/add: {tag}
                """
                
                print(f"🤖 Processing tag '{tag}' for repo '{repo_name}'")
                response = await agent.run(prompt)
                
                # Parse agent response for success/failure
                if "success" in response.lower():
                    result_messages.append(f"✅ Tag '{tag}' processed successfully")
                else:
                    result_messages.append(f"⚠️ Issue with tag '{tag}': {response}")
                    
            except Exception as e:
                error_msg = f"❌ Error processing tag '{tag}': {str(e)}"
                print(error_msg)
                result_messages.append(error_msg)

        return result_messages
```

The key insight here is that we give the agent a clear, structured prompt for each tag. The agent then:
1. Understands it needs to check the current tags first
2. Compares with the new tag we want to add
3. Creates a pull request if needed
4. Returns a summary of its actions

<div class="tb-zh"><p>这里的关键洞察是：我们为每个标签给智能体一句清晰、结构化的提示词。于是智能体会：1. 明白需要先检查当前标签；2. 与想添加的新标签做比较；3. 如有需要则创建 pull request；4. 返回它做了什么的摘要。</p></div>

This approach handles the complexity of tool orchestration automatically.

<div class="tb-zh"><p>这种做法自动处理了工具编排的复杂性。</p></div>

### 2. Tag Extraction Logic

Let's examine the tag extraction logic that feeds into our MCP processing:

<div class="tb-zh"><p>我们来看为 MCP 处理提供输入的标签提取逻辑：</p></div>

```python
import re
from typing import List

# Recognized ML/AI tags for validation
RECOGNIZED_TAGS = {
    "pytorch", "tensorflow", "jax", "transformers", "diffusers",
    "text-generation", "text-classification", "question-answering",
    "text-to-image", "image-classification", "object-detection",
    "fill-mask", "token-classification", "translation", "summarization",
    "feature-extraction", "sentence-similarity", "zero-shot-classification",
    "image-to-text", "automatic-speech-recognition", "audio-classification",
    "voice-activity-detection", "depth-estimation", "image-segmentation",
    "video-classification", "reinforcement-learning", "tabular-classification",
    "tabular-regression", "time-series-forecasting", "graph-ml", "robotics",
    "computer-vision", "nlp", "cv", "multimodal",
}
```

This curated list of recognized tags helps us focus on relevant ML/AI tags and avoid adding inappropriate tags to repositories.

<div class="tb-zh"><p>这份经过整理的已识别标签清单，帮助我们聚焦在相关的 ML/AI 标签上，避免给仓库加上不合适的标签。</p></div>

Now the extraction function itself:

<div class="tb-zh"><p>接下来是提取函数本身：</p></div>

```python
def extract_tags_from_text(text: str) -> List[str]:
    """Extract potential tags from discussion text"""
    text_lower = text.lower()
    explicit_tags = []

    # Pattern 1: "tag: something" or "tags: something"
    tag_pattern = r"tags?:\s*([a-zA-Z0-9-_,\s]+)"
    matches = re.findall(tag_pattern, text_lower)
    for match in matches:
        tags = [tag.strip() for tag in match.split(",")]
        explicit_tags.extend(tags)

    # Pattern 2: "#hashtag" style
    hashtag_pattern = r"#([a-zA-Z0-9-_]+)"
    hashtag_matches = re.findall(hashtag_pattern, text_lower)
    explicit_tags.extend(hashtag_matches)

    # Pattern 3: Look for recognized tags mentioned in natural text
    mentioned_tags = []
    for tag in RECOGNIZED_TAGS:
        if tag in text_lower:
            mentioned_tags.append(tag)

    # Combine and deduplicate
    all_tags = list(set(explicit_tags + mentioned_tags))

    # Filter to only include recognized tags or explicitly mentioned ones
    valid_tags = []
    for tag in all_tags:
        if tag in RECOGNIZED_TAGS or tag in explicit_tags:
            valid_tags.append(tag)

    return valid_tags
```

This function uses multiple strategies to extract tags:

<div class="tb-zh"><p>这个函数用多种策略来提取标签：</p></div>

1. **Explicit patterns**: "tags: pytorch, transformers" or "tag: nlp"
2. **Hashtags**: "#pytorch #nlp"
3. **Natural mentions**: "This transformers model does text-generation"

<div class="tb-zh"><p>1. 显式写法：如「tags: pytorch, transformers」或「tag: nlp」；2. 话题标签：如「#pytorch #nlp」；3. 自然提及：如「This transformers model does text-generation」。</p></div>

The validation step ensures we only suggest appropriate tags, preventing spam or irrelevant tags from being added.

<div class="tb-zh"><p>校验环节保证我们只建议合适的标签，防止把垃圾或无关标签加进仓库。</p></div>

## Performance Considerations

When building production MCP clients, performance is critical for maintaining responsive webhook processing. Let's look at some of the considerations we've made.

<div class="tb-zh"><p>构建生产级 MCP 客户端时，性能对保持 webhook 处理的响应速度至关重要。我们来看看已经做的一些考量。</p></div>

### 1. Agent Singleton Pattern

The agent is created once and reused to avoid:
- Repeated MCP server startup overhead
- Tool loading delays
- Connection establishment costs

<div class="tb-zh"><p>智能体只创建一次并复用，以避免：反复启动 MCP 服务端的开销；加载工具的延迟；建立连接的成本。</p></div>

This pattern is essential for webhook handlers that need to respond quickly.

<div class="tb-zh"><p>对需要快速响应的 webhook 处理器来说，这种模式必不可少。</p></div>

### 2. Async Processing

All MCP operations are async to:
- Handle multiple webhook requests concurrently
- Avoid blocking the main FastAPI thread
- Provide responsive webhook responses

<div class="tb-zh"><p>所有 MCP 操作都是异步的，以便：并发处理多个 webhook 请求；避免阻塞 FastAPI 主线程；提供响应迅速的 webhook 回复。</p></div>

The async nature allows your webhook handler to accept new requests while processing tags in the background.

<div class="tb-zh"><p>异步特性让你的 webhook 处理器在后台处理标签的同时，仍能接受新请求。</p></div>

### 3. Background Task Processing

FastAPI has a built in `BackgroundTasks` class that can be used to run tasks in the background. This is useful for running long running tasks without blocking the main thread.

<div class="tb-zh"><p>FastAPI 内置了 BackgroundTasks 类，可用于在后台运行任务。这对运行耗时任务而不阻塞主线程很有用。</p></div>

```python
from fastapi import BackgroundTasks

@app.post("/webhook")
async def webhook_handler(request: Request, background_tasks: BackgroundTasks):
    """Handle webhook and process in background"""
    
    # Validate webhook quickly
    if request.headers.get("X-Webhook-Secret") != WEBHOOK_SECRET:
        return {"error": "Invalid secret"}
    
    webhook_data = await request.json()
    
    # Process in background to return quickly
    background_tasks.add_task(process_webhook_comment, webhook_data)
    
    return {"status": "accepted"}
```

This pattern ensures webhook responses are fast (under 1 second) while allowing complex tag processing to happen in the background.

<div class="tb-zh"><p>这种模式保证 webhook 响应很快（1 秒以内），同时让复杂的标签处理在后台完成。</p></div>

> [!TIP]
> Webhook endpoints should respond within 10 seconds or the platform may consider them timed out. Using background tasks ensures you can always respond quickly while handling complex processing asynchronously.

<div class="tb-zh"><p>webhook 端点需要在 10 秒内响应，否则平台可能判定为超时。使用后台任务可以保证始终快速响应，同时把复杂处理放到异步执行。</p></div>

## Next Steps

With our MCP client implemented, we can now:

<div class="tb-zh"><p>MCP 客户端实现完成后，我们现在可以：</p></div>

1. **Implement the Webhook Listener** - Create the FastAPI endpoint that receives Hub events
2. **Integrate Everything** - Connect webhooks, client, and server into a complete system
3. **Add Testing Interface** - Create a Gradio interface for development and monitoring
4. **Deploy and Test** - Validate the complete system in production

<div class="tb-zh"><p>1. 实现 webhook 监听器——创建接收 Hub 事件的 FastAPI 端点；2. 整合各部分——把 webhook、客户端与服务端连成完整系统；3. 添加测试界面——做一个用于开发与监控的 Gradio 界面；4. 部署与测试——在生产环境中验证整套系统。</p></div>

In the next section, we'll implement the webhook listener that will trigger our MCP-powered tagging agent.

<div class="tb-zh"><p>下一节我们会实现触发这套 MCP 驱动打标签智能体的 webhook 监听器。</p></div>

> [!TIP]
> The Agent class from `huggingface_hub` provides both MCP tool integration and language model reasoning, making it perfect for building intelligent automation workflows like our PR agent.

<div class="tb-zh"><p>huggingface_hub 提供的 Agent 类同时具备 MCP 工具集成与语言模型推理能力，非常适合构建像我们这个 PR 智能体这样的智能自动化流程。</p></div>
