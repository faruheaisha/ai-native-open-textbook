---
title: "Webhook Listener"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/README.md"
zh: "on"
---

# Webhook Listener

The webhook listener is the entry point for our Pull Request Agent. It receives real-time events from the Hugging Face Hub when discussions are created or updated, triggering our MCP-powered tagging workflow. In this section, we'll implement a webhook handler using FastAPI.

<div class="tb-zh"><p>webhook 监听器是 Pull Request Agent 的入口。当讨论被创建或更新时，它会实时接收来自 Hugging Face Hub 的事件，触发我们这套由 MCP 驱动的打标签工作流。本节我们用 FastAPI 实现一个 webhook 处理器。</p></div>

## Understanding Webhook Integration

Following the [Hugging Face Webhooks Guide](https://raw.githubusercontent.com/huggingface/hub-docs/refs/heads/main/docs/hub/webhooks-guide-discussion-bot.md), our webhook listener validates incoming requests and processes discussion events in real-time.

<div class="tb-zh"><p>按照 Hugging Face Webhooks 指南（https://raw.githubusercontent.com/huggingface/hub-docs/refs/heads/main/docs/hub/webhooks-guide-discussion-bot.md），我们的 webhook 监听器会校验传入请求，并实时处理讨论事件。</p></div>

![Webhook Creation](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/001-discussion-bot/webhook-creation.png)

### Webhook Event Flow

Understanding the webhook flow is crucial for building a reliable listener:

<div class="tb-zh"><p>理解 webhook 流程是构建可靠监听器的关键：</p></div>

1. **User Action**: Someone creates a comment in a model repository discussion
2. **Hub Event**: Hugging Face generates a webhook event
3. **Webhook Delivery**: Hub sends POST request to our endpoint
4. **Authentication**: We validate the webhook secret
5. **Processing**: Extract tags from the comment content
6. **Action**: Use MCP tools to create pull requests for new tags

<div class="tb-zh"><p>1. 用户动作：有人在模型仓库的讨论区发表评论；2. Hub 事件：Hugging Face 生成一个 webhook 事件；3. 投递 webhook：Hub 向我们的端点发送 POST 请求；4. 身份验证：我们校验 webhook 密钥；5. 处理：从评论内容中提取标签；6. 执行动作：用 MCP 工具为新增标签创建 PR。</p></div>

> [!TIP]
> Webhooks are push notifications - the Hugging Face Hub actively sends events to your application rather than you polling for changes. This enables real-time responses to discussions and comments.

<div class="tb-zh"><p>webhook 是推送式通知——由 Hugging Face Hub 主动把事件发到你的应用，而不是你去轮询变化。这样才能对讨论与评论做出实时响应。</p></div>

## FastAPI Webhook Application

Let's build our webhook listener step by step, starting with the foundation and building up to the complete processing logic.

<div class="tb-zh"><p>我们一步步构建 webhook 监听器，从基础开始，逐步搭建出完整的处理逻辑。</p></div>

### 1. Application Setup

First, let's set up the basic FastAPI application with all necessary imports and configuration:

<div class="tb-zh"><p>首先搭建基础的 FastAPI 应用，写全所需的导入和配置：</p></div>

```python
import os
import json
from datetime import datetime
from typing import List, Dict, Any, Optional

from fastapi import FastAPI, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
```

These imports give us everything we need to build a robust webhook handler. `FastAPI` provides the web framework, `BackgroundTasks` enables async processing, and the typing imports help with data validation.

<div class="tb-zh"><p>这些导入提供了构建稳健 webhook 处理器所需的一切。FastAPI 提供 Web 框架，BackgroundTasks 支持异步处理，类型相关的导入则帮助做数据校验。</p></div>

Now let's configure our application:

<div class="tb-zh"><p>现在配置我们的应用：</p></div>

```python
# Configuration
WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET")
HF_TOKEN = os.getenv("HF_TOKEN")

# Simple storage for processed operations
tag_operations_store: List[Dict[str, Any]] = []

app = FastAPI(title="HF Tagging Bot")
app.add_middleware(CORSMiddleware, allow_origins=["*"])
```

This configuration sets up:
- **Webhook secret**: For validating incoming webhooks
- **HF token**: For authenticating with the Hub API
- **Operations store**: In-memory storage for monitoring processed operations
- **CORS middleware**: Allows cross-origin requests for the web interface

<div class="tb-zh"><p>这段配置建立了：webhook 密钥——用于校验传入的 webhook；HF 令牌——用于向 Hub API 鉴权；操作记录存储——用内存保存已处理操作以便监控；CORS 中间件——允许 Web 界面发起跨域请求。</p></div>

> [!TIP]
> The `tag_operations_store` list keeps track of recent webhook processing operations. This is useful for debugging and monitoring, but in production you might want to use a database or limit the size of this list.

<div class="tb-zh"><p>tag_operations_store 列表记录最近处理过的 webhook 操作，便于调试与监控。但在生产环境中，你可能会改用数据库，或限制这个列表的长度。</p></div>

### 2. Webhook Data Models

Based on the [Hugging Face webhook documentation](https://raw.githubusercontent.com/huggingface/hub-docs/refs/heads/main/docs/hub/webhooks-guide-discussion-bot.md), we need to understand the webhook data structure:

<div class="tb-zh"><p>根据 Hugging Face webhook 文档（https://raw.githubusercontent.com/huggingface/hub-docs/refs/heads/main/docs/hub/webhooks-guide-discussion-bot.md），我们需要理解 webhook 的数据结构：</p></div>

```python
class WebhookEvent(BaseModel):
    event: Dict[str, str]          # Contains action and scope information
    comment: Dict[str, Any]        # Comment content and metadata
    discussion: Dict[str, Any]     # Discussion information
    repo: Dict[str, str]           # Repository details
```

This Pydantic model helps us understand the webhook structure.

<div class="tb-zh"><p>这个 Pydantic 模型帮助我们理解 webhook 的结构。</p></div>

The key fields we care about are:
- `event.action`: Usually "create" for new comments
- `event.scope`: Usually "discussion.comment" for comment events
- `comment.content`: The actual comment text
- `repo.name`: The repository where the comment was made

<div class="tb-zh"><p>我们关心的关键字段有：event.action——新评论通常是 create；event.scope——评论事件通常是 discussion.comment；comment.content——评论的实际文本；repo.name——发表评论所在的仓库。</p></div>

### 3. Core Webhook Handler

Now for the main webhook handler - this is where the important part happens. Let's break it down into digestible pieces:

<div class="tb-zh"><p>接下来是主体的 webhook 处理器——关键都发生在这里。我们把它拆成好消化的小块：</p></div>

```python
@app.post("/webhook")
async def webhook_handler(request: Request, background_tasks: BackgroundTasks):
    """
    Handle incoming webhooks from Hugging Face Hub
    Following the pattern from: https://raw.githubusercontent.com/huggingface/hub-docs/refs/heads/main/docs/hub/webhooks-guide-discussion-bot.md
    """
    print("🔔 Webhook received!")
    
    # Step 1: Validate webhook secret (security)
    webhook_secret = request.headers.get("X-Webhook-Secret")
    if webhook_secret != WEBHOOK_SECRET:
        print("❌ Invalid webhook secret")
        return {"error": "incorrect secret"}, 400
```

The first step is security validation. We check the `X-Webhook-Secret` header against our configured secret to ensure the webhook is legitimate.

<div class="tb-zh"><p>第一步是安全校验。我们用配置好的密钥比对 X-Webhook-Secret 请求头，确保这个 webhook 是合法的。</p></div>

> [!TIP]
> Always validate webhook secrets! Without this check, anyone could send fake webhook requests to your application. The secret acts as a shared password between Hugging Face and your application.

<div class="tb-zh"><p>务必校验 webhook 密钥！没有这道检查，任何人都能给我们的应用发送伪造的 webhook 请求。密钥相当于 Hugging Face 与你的应用之间的共享口令。</p></div>

Next, let's parse and validate the webhook data:

<div class="tb-zh"><p>接着解析并校验 webhook 数据：</p></div>

```python
    # Step 2: Parse webhook data
    try:
        webhook_data = await request.json()
        print(f"📥 Webhook data: {json.dumps(webhook_data, indent=2)}")
    except Exception as e:
        print(f"❌ Error parsing webhook data: {str(e)}")
        return {"error": "invalid JSON"}, 400
    
    # Step 3: Validate event structure
    event = webhook_data.get("event", {})
    if not event:
        print("❌ No event data in webhook")
        return {"error": "missing event data"}, 400
```

This parsing step handles potential JSON errors gracefully and validates that we have the expected event structure.

<div class="tb-zh"><p>这一步解析会优雅地处理可能的 JSON 错误，并校验事件结构是否符合预期。</p></div>

Now for the event filtering logic:

<div class="tb-zh"><p>然后是事件过滤逻辑：</p></div>

```python
    # Step 4: Check if this is a discussion comment creation
    # Following the webhook guide pattern:
    if (
        event.get("action") == "create" and 
        event.get("scope") == "discussion.comment"
    ):
        print("✅ Valid discussion comment creation event")
        
        # Process in background to return quickly to Hub
        background_tasks.add_task(process_webhook_comment, webhook_data)
        
        return {
            "status": "accepted",
            "message": "Comment processing started",
            "timestamp": datetime.now().isoformat()
        }
    else:
        print(f"ℹ️ Ignoring event: action={event.get('action')}, scope={event.get('scope')}")
        return {
            "status": "ignored",
            "reason": "Not a discussion comment creation"
        }
```

This filtering ensures we only process the events we care about - new discussion comments. We ignore other events like repository creation, model uploads, etc.

<div class="tb-zh"><p>这里的过滤保证我们只处理关心的事件——新的讨论评论。仓库创建、模型上传等其他事件都会被忽略。</p></div>

We use FastAPI's `background_tasks.add_task()` to process the webhook asynchronously. This allows us to return a response quickly (within seconds) while the actual tag processing happens in the background.

<div class="tb-zh"><p>我们用 FastAPI 的 background_tasks.add_task() 异步处理 webhook。这样就能很快（数秒内）返回响应，而真正的打标签处理在后台进行。</p></div>

> [!TIP]
> Webhook endpoints should respond within 10 seconds, or the sending platform may consider them failed. Using background tasks ensures fast responses while allowing complex processing to happen asynchronously.

<div class="tb-zh"><p>webhook 端点需要在 10 秒内响应，否则发送方平台可能判定为失败。使用后台任务可以保证快速响应，同时让复杂处理异步进行。</p></div>

### 4. Comment Processing Logic

Now let's implement the core comment processing function that does the actual tag extraction and MCP tool usage:

<div class="tb-zh"><p>现在实现核心的评论处理函数，它负责实际的标签提取和 MCP 工具调用：</p></div>

```python
async def process_webhook_comment(webhook_data: Dict[str, Any]):
    """
    Process webhook comment to detect and add tags
    Integrates with our MCP client for Hub interactions
    """
    print("🏷️ Starting process_webhook_comment...")
    
    try:
        # Extract comment and repository information
        comment_content = webhook_data["comment"]["content"]
        discussion_title = webhook_data["discussion"]["title"]
        repo_name = webhook_data["repo"]["name"]
        discussion_num = webhook_data["discussion"]["num"]
        comment_author = webhook_data["comment"]["author"].get("id", "unknown")
        
        print(f"📝 Comment from {comment_author}: {comment_content}")
        print(f"📰 Discussion: {discussion_title}")
        print(f"📦 Repository: {repo_name}")
```

This initial section extracts all the relevant information from the webhook data. We get both the comment content and discussion title since tags might be mentioned in either place.

<div class="tb-zh"><p>开头这一段从 webhook 数据中取出所有相关信息。我们同时拿到评论内容和讨论标题，因为标签可能出现在任意一处。</p></div>

Next, we extract and process the tags:

<div class="tb-zh"><p>接着提取并处理标签：</p></div>

```python
        # Extract potential tags from comment and title
        comment_tags = extract_tags_from_text(comment_content)
        title_tags = extract_tags_from_text(discussion_title)
        all_tags = list(set(comment_tags + title_tags))
        
        print(f"🔍 Found tags: {all_tags}")
        
        # Store operation for monitoring
        operation = {
            "timestamp": datetime.now().isoformat(),
            "repo_name": repo_name,
            "discussion_num": discussion_num,
            "comment_author": comment_author,
            "extracted_tags": all_tags,
            "comment_preview": comment_content[:100] + "..." if len(comment_content) > 100 else comment_content,
            "status": "processing"
        }
        tag_operations_store.append(operation)
```

We combine tags from both sources and create an operation record for monitoring. This record tracks the progress of each webhook processing operation.

<div class="tb-zh"><p>我们把两个来源的标签合并，并创建一条操作记录用于监控。这条记录会跟踪每次 webhook 处理的进度。</p></div>

> [!TIP]
> Storing operation records is crucial for debugging and monitoring. When something goes wrong, you can look at recent operations to understand what happened and why.

<div class="tb-zh"><p>保存操作记录对调试与监控至关重要。一旦出问题，你可以查看最近的操作，弄清发生了什么、为什么发生。</p></div>

Now for the MCP agent integration:

<div class="tb-zh"><p>接下来是与 MCP 智能体的集成：</p></div>

```python
        if not all_tags:
            operation["status"] = "no_tags"
            operation["message"] = "No recognizable tags found"
            print("❌ No tags found to process")
            return
        
        # Get MCP agent for tag processing
        agent = await get_agent()
        if not agent:
            operation["status"] = "error"
            operation["message"] = "Agent not configured (missing HF_TOKEN)"
            print("❌ No agent available")
            return
        
        # Process each extracted tag
        operation["results"] = []
        for tag in all_tags:
            try:
                print(f"🤖 Processing tag '{tag}' for repo '{repo_name}'")
                
                # Create prompt for agent to handle tag processing
                prompt = f"""
                Analyze the repository '{repo_name}' and determine if the tag '{tag}' should be added.
                
                First, check the current tags using get_current_tags.
                If '{tag}' is not already present and it's a valid tag, add it using add_new_tag.
                
                Repository: {repo_name}
                Tag to process: {tag}
                
                Provide a clear summary of what was done.
                """
                
                response = await agent.run(prompt)
                print(f"🤖 Agent response for '{tag}': {response}")
                
                # Parse response and store result
                tag_result = {
                    "tag": tag,
                    "response": response,
                    "timestamp": datetime.now().isoformat()
                }
                operation["results"].append(tag_result)
                
            except Exception as e:
                error_msg = f"❌ Error processing tag '{tag}': {str(e)}"
                print(error_msg)
                operation["results"].append({
                    "tag": tag,
                    "error": str(e),
                    "timestamp": datetime.now().isoformat()
                })
        
        operation["status"] = "completed"
        print(f"✅ Completed processing {len(all_tags)} tags")
```

This section handles the core business logic:
1. **Validation**: Ensure we have tags to process and an available agent
2. **Processing**: For each tag, create a natural language prompt for the agent
3. **Recording**: Store all results for monitoring and debugging
4. **Error handling**: Gracefully handle errors for individual tags

<div class="tb-zh"><p>这一段处理核心业务逻辑：1. 校验——确认有待处理的标签且智能体可用；2. 处理——为每个标签给智能体写一条自然语言提示词；3. 记录——把所有结果存下来，便于监控和调试；4. 错误处理——优雅地处理单个标签的失败。</p></div>

The agent prompt is carefully crafted to instruct the AI on exactly what steps to take: check current tags first, then add the new tag if appropriate.

<div class="tb-zh"><p>给智能体的提示词经过精心撰写，明确指示了 AI 该按什么步骤做：先检查当前标签，然后视情况添加新标签。</p></div>

### 5. Health and Monitoring Endpoints

Besides the webhook handler, we need endpoints for monitoring and debugging. Let's add these essential endpoints:

<div class="tb-zh"><p>除了 webhook 处理器，我们还需要用于监控和调试的端点。我们来加上这些必备端点：</p></div>

```python
@app.get("/")
async def root():
    """Root endpoint with basic information"""
    return {
        "name": "HF Tagging Bot",
        "status": "running",
        "description": "Webhook listener for automatic model tagging",
        "endpoints": {
            "webhook": "/webhook",
            "health": "/health",
            "operations": "/operations"
        }
    }
```

The root endpoint provides basic information about your service and its available endpoints.

<div class="tb-zh"><p>根端点提供关于你的服务及其可用端点的基本信息。</p></div>

```python
@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    agent = await get_agent()
    
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "components": {
            "webhook_secret": "configured" if WEBHOOK_SECRET else "missing",
            "hf_token": "configured" if HF_TOKEN else "missing",
            "mcp_agent": "ready" if agent else "not_ready"
        }
    }
```

The health check endpoint validates that all your components are properly configured. This is essential for production monitoring.

<div class="tb-zh"><p>健康检查端点用于确认所有组件都已正确配置。这对生产环境监控必不可少。</p></div>

```python
@app.get("/operations")
async def get_operations():
    """Get recent tag operations for monitoring"""
    # Return last 50 operations
    recent_ops = tag_operations_store[-50:] if tag_operations_store else []
    return {
        "total_operations": len(tag_operations_store),
        "recent_operations": recent_ops
    }
```

The operations endpoint lets you see recent webhook processing activity, which is invaluable for debugging and monitoring.

<div class="tb-zh"><p>操作端点让你查看最近的 webhook 处理活动，对调试和监控极有价值。</p></div>

> [!TIP]
> Health and monitoring endpoints are crucial for production deployments. They help you quickly identify configuration issues and monitor your application's activity without digging through logs.

<div class="tb-zh"><p>健康检查与监控端点在部署到生产时至关重要。它们能帮你快速定位配置问题，并在不翻日志的情况下监控应用的活动情况。</p></div>

## Webhook Configuration on Hugging Face Hub

Now that we have our webhook listener ready, let's configure it on the Hugging Face Hub. This is where we connect our application to real repository events.

<div class="tb-zh"><p>webhook 监听器准备好了，接下来在 Hugging Face Hub 上配置它。这一步把我们的应用接到真实的仓库事件上。</p></div>

### 1. Create Webhook in Settings

Following the [webhook setup guide](https://huggingface.co/docs/hub/webhooks-guide-discussion-bot):

<div class="tb-zh"><p>按照 webhook 配置指南（https://huggingface.co/docs/hub/webhooks-guide-discussion-bot）：</p></div>

![Webhook Settings](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/001-discussion-bot/webhook-creation.png)

Navigate to your [Hugging Face Settings](https://huggingface.co/settings/webhooks) and configure:

<div class="tb-zh"><p>进入你的 Hugging Face 设置（https://huggingface.co/settings/webhooks）并配置：</p></div>

1. **Target Repositories**: Specify which repositories to monitor
2. **Webhook URL**: Your deployed application endpoint (e.g., `https://your-space.hf.space/webhook`)
3. **Secret**: Use the same secret from your `WEBHOOK_SECRET` environment variable
4. **Events**: Subscribe to "Community (PR & discussions)" events

<div class="tb-zh"><p>1. 目标仓库：指定要监控哪些仓库；2. Webhook 地址：你已部署应用的端点（例如 https://your-space.hf.space/webhook）；3. 密钥：使用与 WEBHOOK_SECRET 环境变量相同的密钥；4. 事件：订阅「Community (PR &amp; discussions)」事件。</p></div>

> [!TIP]
> Start with one or two test repositories before configuring webhooks for many repositories. This lets you validate your application works correctly before scaling up.

<div class="tb-zh"><p>在给大量仓库配置 webhook 之前，先拿一两个测试仓库试水。这样你能先确认应用工作正常，再扩大范围。</p></div>

### 2. Space URL Configuration

For Hugging Face Spaces deployment, you'll need to get your direct URL:

<div class="tb-zh"><p>如果部署到 Hugging Face Spaces，你需要拿到它的直连 URL：</p></div>

![Direct URL](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/001-discussion-bot/direct-url.png)

The process is:
1. Click "Embed this Space" in your Space settings
2. Copy the "Direct URL" 
3. Append `/webhook` to create your webhook endpoint
4. Update your webhook configuration with this URL

<div class="tb-zh"><p>流程是：1. 在你的 Space 设置里点击“Embed this Space”；2. 复制“Direct URL”；3. 在后面追加 /webhook 组成你的 webhook 端点；4. 用这个 URL 更新你的 webhook 配置。</p></div>

For example, if your Space URL is `https://username-space-name.hf.space`, your webhook endpoint would be `https://username-space-name.hf.space/webhook`.

<div class="tb-zh"><p>例如，如果你的 Space URL 是 https://username-space-name.hf.space，那么 webhook 端点就是 https://username-space-name.hf.space/webhook。</p></div>

![Space URL](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/001-discussion-bot/direct-url.png)

## Testing the Webhook Listener

Testing is crucial before deploying to production. Let's walk through different testing approaches:

<div class="tb-zh"><p>部署到生产之前，测试至关重要。我们来看几种不同的测试方式：</p></div>

### 1. Local Testing

You can test your webhook handler locally using a simple script:

<div class="tb-zh"><p>你可以用一个简单脚本在本地测试 webhook 处理器：</p></div>

```python
# test_webhook_local.py
import requests
import json

# Test data matching webhook format
test_webhook_data = {
    "event": {
        "action": "create",
        "scope": "discussion.comment"
    },
    "comment": {
        "content": "This model needs tags: pytorch, transformers",
        "author": {"id": "test-user"}
    },
    "discussion": {
        "title": "Missing tags",
        "num": 1
    },
    "repo": {
        "name": "test-user/test-model"
    }
}

# Send test webhook
response = requests.post(
    "http://localhost:8000/webhook",
    json=test_webhook_data,
    headers={"X-Webhook-Secret": "your-test-secret"}
)

print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")
```

This script simulates a real webhook request, allowing you to test your handler without waiting for real events.

<div class="tb-zh"><p>这个脚本模拟真实的 webhook 请求，让你不必等真实事件就能测试处理器。</p></div>

### 2. Simulation Endpoint for Development

You can also add a simulation endpoint to your FastAPI application for easier testing:

<div class="tb-zh"><p>你也可以在 FastAPI 应用里加一个模拟端点，让测试更方便：</p></div>

```python
@app.post("/simulate_webhook")
async def simulate_webhook(
    repo_name: str, 
    discussion_title: str, 
    comment_content: str
) -> str:
    """Simulate webhook for testing purposes"""
    
    # Create mock webhook data
    mock_webhook_data = {
        "event": {
            "action": "create",
            "scope": "discussion.comment"
        },
        "comment": {
            "content": comment_content,
            "author": {"id": "test-user"}
        },
        "discussion": {
            "title": discussion_title,
            "num": 999
        },
        "repo": {
            "name": repo_name
        }
    }
    
    # Process the simulated webhook
    await process_webhook_comment(mock_webhook_data)
    
    return f"Simulated webhook processed for {repo_name}"
```

This endpoint makes it easy to test different scenarios through your application's interface.

<div class="tb-zh"><p>这个端点让你可以通过应用的接口轻松测试各种场景。</p></div>

> [!TIP]
> Simulation endpoints are incredibly useful during development. They let you test different tag combinations and edge cases without creating actual repository discussions.

<div class="tb-zh"><p>模拟端点在开发阶段极其有用。它让你无需真的去创建仓库讨论，就能测试各种标签组合与边界情况。</p></div>

## Expected Webhook Result

When everything is working correctly, you should see results like the discussion bot example:

<div class="tb-zh"><p>一切正常工作时，你会看到类似 discussion bot 示例的结果：</p></div>

![Discussion Result](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/001-discussion-bot/discussion-result.png)

This screenshot shows a successful webhook processing where the bot creates a pull request in response to a discussion comment.

<div class="tb-zh"><p>这张截图展示了一次成功的 webhook 处理：机器人在收到讨论评论后创建了一个 pull request。</p></div>

## Next Steps

With our webhook listener implemented, we now have:

<div class="tb-zh"><p>webhook 监听器实现完成后，我们现在拥有：</p></div>

1. **Secure webhook validation** following Hugging Face best practices
2. **Real-time event processing** with background task handling
3. **MCP integration** for intelligent tag management
4. **Monitoring and debugging** capabilities

<div class="tb-zh"><p>1. 遵循 Hugging Face 最佳实践的安全 webhook 校验；2. 借助后台任务处理实时事件；3. MCP 集成，实现智能的标签管理；4. 监控与调试能力。</p></div>

In the next section, we'll integrate everything into a complete Pull Request Agent that demonstrates the full workflow from webhook to PR creation.

<div class="tb-zh"><p>下一节我们会把所有内容整合成一个完整的 Pull Request Agent，演示从 webhook 到创建 PR 的全流程。</p></div>

> [!TIP]
> Always return webhook responses quickly (within 10 seconds) to avoid timeouts. Use background tasks for longer processing operations like MCP tool execution and pull request creation.

<div class="tb-zh"><p>务必快速返回 webhook 响应（10 秒内）以避免超时。对于 MCP 工具执行、创建 PR 这类耗时操作，请使用后台任务。</p></div>
