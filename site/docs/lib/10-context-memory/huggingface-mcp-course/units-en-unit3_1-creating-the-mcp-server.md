---
title: "Creating the MCP Server"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit3_1/creating-the-mcp-server.mdx"
sourceRel: "units/en/unit3_1/creating-the-mcp-server.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit3_1/creating-the-mcp-server.mdx"
sourceSha256: "f79cf0a97583d4332f878fee5669bacc8737c554b6d498112de087c14f3cf63a"
pageSha256: "f79cf0a97583d4332f878fee5669bacc8737c554b6d498112de087c14f3cf63a"
contentMode: "local-full"
zh: "on"
---

# Creating the MCP Server

The MCP server is the heart of our Pull Request Agent. It provides the tools that our agent will use to interact with the Hugging Face Hub, specifically for reading and updating model repository tags. In this section, we'll build the server using FastMCP and the Hugging Face Hub Python SDK.

<div class="tb-zh"><p>MCP 服务端是 Pull Request Agent 的核心。它提供了智能体用来与 Hugging Face Hub 交互的工具，具体来说就是读取和更新模型仓库的标签。本节我们用 FastMCP 和 Hugging Face Hub Python SDK 来构建这个服务端。</p></div>

## Understanding the MCP Server Architecture

Our MCP server provides two essential tools:

<div class="tb-zh"><p>我们的 MCP 服务端提供两个必不可少的工具：</p></div>

| Tool | Description |
| --- | --- |
| `get_current_tags` | Retrieves existing tags from a model repository |
| `add_new_tag` | Adds a new tag to a repository via pull request |

These tools abstract the complexity of Hub API interactions and provide a clean interface for our agent to work with.

<div class="tb-zh"><p>这两个工具把 Hub API 交互的复杂性抽象掉，为智能体提供一套干净的接口。</p></div>

![MCP Server Tools](https://huggingface.co/datasets/mcp-course/images/resolve/main/unit3/architecture.png)

## Complete MCP Server Implementation

Let's create our `mcp_server.py` file step by step. We'll build this incrementally so you understand each component and how they work together.

<div class="tb-zh"><p>我们一步步创建 mcp_server.py 文件，循序渐进地构建，好让你理解每个组件以及它们如何协同工作。</p></div>

### 1. Imports and Configuration

First, let's set up all the necessary imports and configuration. 

<div class="tb-zh"><p>首先设置所有必需的导入和配置。</p></div>

```python
#!/usr/bin/env python3
"""
Simplified MCP Server for HuggingFace Hub Tagging Operations using FastMCP
"""

import os
import json
from fastmcp import FastMCP
from huggingface_hub import HfApi, model_info, ModelCard, ModelCardData
from huggingface_hub.utils import HfHubHTTPError
from dotenv import load_dotenv

load_dotenv()
```

The imports above give us everything we need to build our MCP server. `FastMCP` provides the server framework, while the `huggingface_hub` imports give us the tools to interact with model repositories.

<div class="tb-zh"><p>上面的导入提供了构建 MCP 服务端所需的一切。FastMCP 提供服务器框架，而 huggingface_hub 的导入则给了我们与模型仓库交互的工具。</p></div>

The `load_dotenv()` call automatically loads environment variables from a `.env` file, making it easy to manage secrets like API tokens during development.

<div class="tb-zh"><p>load_dotenv() 会自动从 .env 文件加载环境变量，让开发期间管理 API 令牌这类密钥变得很方便。</p></div>

> [!TIP]
> If you're using uv, you can create a `.env` file in the root of the project and you won't need to use `load_dotenv()` if you use `uv run` to run the server.

<div class="tb-zh"><p>如果你使用 uv，可以在项目根目录创建一个 .env 文件；只要用 uv run 启动服务端，就不必再调用 load_dotenv()。</p></div>

Next, we'll configure our server with the necessary credentials and create the FastMCP instance:

<div class="tb-zh"><p>接着用必要的凭据配置服务端，并创建 FastMCP 实例：</p></div>

```python
# Configuration
HF_TOKEN = os.getenv("HF_TOKEN")

# Initialize HF API client
hf_api = HfApi(token=HF_TOKEN) if HF_TOKEN else None

# Create the FastMCP server
mcp = FastMCP("hf-tagging-bot")
```

This configuration block does three important things:
1. Retrieves the Hugging Face token from environment variables
2. Creates an authenticated API client (only if a token is available)
3. Initializes our FastMCP server with a descriptive name

<div class="tb-zh"><p>这段配置做了三件重要的事：1. 从环境变量中取出 Hugging Face 令牌；2. 创建经过鉴权的 API 客户端（仅在拿到令牌时创建）；3. 用带有描述性的名称初始化我们的 FastMCP 服务端。</p></div>

The conditional creation of `hf_api` ensures our server can start even without a token, which is useful for testing the basic structure.

<div class="tb-zh"><p>有条件地创建 hf_api，保证即使没有令牌服务端也能启动，这在测试基本结构时很有用。</p></div>

### 2. Get Current Tags Tool

Now let's implement our first tool - `get_current_tags`. This tool retrieves the existing tags from a model repository:

<div class="tb-zh"><p>现在实现第一个工具 get_current_tags。它从模型仓库读取已有标签：</p></div>

```python
@mcp.tool()
def get_current_tags(repo_id: str) -> str:
    """Get current tags from a HuggingFace model repository"""
    print(f"🔧 get_current_tags called with repo_id: {repo_id}")

    if not hf_api:
        error_result = {"error": "HF token not configured"}
        json_str = json.dumps(error_result)
        print(f"❌ No HF API token - returning: {json_str}")
        return json_str
```

The function starts with validation - checking if we have an authenticated API client. Notice how we return JSON strings instead of Python objects. This is crucial for MCP communication.

<div class="tb-zh"><p>函数从校验开始——检查我们是否拥有通过鉴权的 API 客户端。注意我们返回的是 JSON 字符串而不是 Python 对象，这对 MCP 通信至关重要。</p></div>

> [!TIP]
> All MCP tools must return strings, not Python objects. That's why we use `json.dumps()` to convert our results to JSON strings. This ensures reliable data exchange between the MCP server and client.

<div class="tb-zh"><p>所有 MCP 工具都必须返回字符串，而不能返回 Python 对象。所以我们用 json.dumps() 把结果转成 JSON 字符串，这样才能保证 MCP 服务端与客户端之间的数据交换可靠。</p></div>

Let's continue with the main logic of the `get_current_tags` function:

<div class="tb-zh"><p>继续看 get_current_tags 函数的主要逻辑：</p></div>

```python
    try:
        print(f"📡 Fetching model info for: {repo_id}")
        info = model_info(repo_id=repo_id, token=HF_TOKEN)
        current_tags = info.tags if info.tags else []
        print(f"🏷️ Found {len(current_tags)} tags: {current_tags}")

        result = {
            "status": "success",
            "repo_id": repo_id,
            "current_tags": current_tags,
            "count": len(current_tags),
        }
        json_str = json.dumps(result)
        print(f"✅ get_current_tags returning: {json_str}")
        return json_str

    except Exception as e:
        print(f"❌ Error in get_current_tags: {str(e)}")
        error_result = {"status": "error", "repo_id": repo_id, "error": str(e)}
        json_str = json.dumps(error_result)
        print(f"❌ get_current_tags error returning: {json_str}")
        return json_str
```

This implementation follows a clear pattern:
1. **Fetch data** using the Hugging Face Hub API
2. **Process the response** to extract tag information
3. **Structure the result** in a consistent JSON format
4. **Handle errors gracefully** with detailed error messages

<div class="tb-zh"><p>这段实现遵循一个清晰的模式：1. 用 Hugging Face Hub API 取数据；2. 处理响应，提取标签信息；3. 把结果组织成一致的 JSON 结构；4. 用详细的错误信息优雅地处理异常。</p></div>

> [!TIP]
> The extensive logging might seem overkill, but it helps with debugging and monitoring when the server is running. Remember, your application will autonomously reacting to events from the Hub, so you won't be able to see the logs in real time.

<div class="tb-zh"><p>这些看起来有些过量的日志，在服务端运行起来后对调试和监控很有帮助。要记住，你的应用会自主响应来自 Hub 的事件，你没法实时盯着日志看。</p></div>

### 3. Add New Tag Tool

Now for the more complex tool - `add_new_tag`. This tool adds a new tag to a repository by creating a pull request. Let's start with the initial setup and validation:

<div class="tb-zh"><p>接下来是更复杂的工具 add_new_tag。它通过创建 pull request 给仓库添加新标签。我们先从初始化设置和校验开始：</p></div>

```python
@mcp.tool()
def add_new_tag(repo_id: str, new_tag: str) -> str:
    """Add a new tag to a HuggingFace model repository via PR"""
    print(f"🔧 add_new_tag called with repo_id: {repo_id}, new_tag: {new_tag}")

    if not hf_api:
        error_result = {"error": "HF token not configured"}
        json_str = json.dumps(error_result)
        print(f"❌ No HF API token - returning: {json_str}")
        return json_str
```

Similar to our first tool, we start with validation. Now let's fetch the current repository state to check if the tag already exists:

<div class="tb-zh"><p>和第一个工具类似，我们从校验开始。接下来获取仓库的当前状态，检查该标签是否已经存在：</p></div>

```python
    try:
        # Get current model info and tags
        print(f"📡 Fetching current model info for: {repo_id}")
        info = model_info(repo_id=repo_id, token=HF_TOKEN)
        current_tags = info.tags if info.tags else []
        print(f"🏷️ Current tags: {current_tags}")

        # Check if tag already exists
        if new_tag in current_tags:
            print(f"⚠️ Tag '{new_tag}' already exists in {current_tags}")
            result = {
                "status": "already_exists",
                "repo_id": repo_id,
                "tag": new_tag,
                "message": f"Tag '{new_tag}' already exists",
            }
            json_str = json.dumps(result)
            print(f"🏷️ add_new_tag (already exists) returning: {json_str}")
            return json_str
```

This section demonstrates an important principle: **validate before acting**. We check if the tag already exists to avoid creating unnecessary pull requests.

<div class="tb-zh"><p>这一段体现了一个重要原则：先校验，再动作。我们检查标签是否已存在，以避免创建不必要的 pull request。</p></div>

> [!TIP]
> Always check the current state before making changes. This prevents duplicate work and provides better user feedback. It's especially important when creating pull requests, as duplicate PRs can clutter the repository.

<div class="tb-zh"><p>做任何修改前都先检查当前状态。这样能避免重复劳动，也能给用户更明确的反馈。在创建 PR 时尤其重要，因为重复的 PR 会让仓库变得杂乱。</p></div>

Next, we'll prepare the updated tag list and handle the model card:

<div class="tb-zh"><p>接着准备更新后的标签列表，并处理 model card：</p></div>

```python
        # Add the new tag to existing tags
        updated_tags = current_tags + [new_tag]
        print(f"🆕 Will update tags from {current_tags} to {updated_tags}")

        # Create model card content with updated tags
        try:
            # Load existing model card
            print(f"📄 Loading existing model card...")
            card = ModelCard.load(repo_id, token=HF_TOKEN)
            if not hasattr(card, "data") or card.data is None:
                card.data = ModelCardData()
        except HfHubHTTPError:
            # Create new model card if none exists
            print(f"📄 Creating new model card (none exists)")
            card = ModelCard("")
            card.data = ModelCardData()

        # Update tags - create new ModelCardData with updated tags
        card_dict = card.data.to_dict()
        card_dict["tags"] = updated_tags
        card.data = ModelCardData(**card_dict)
```

This section handles model card management. We try to load an existing model card first, but create a new one if none exists. This ensures our tool works with any repository, even if it's empty.

<div class="tb-zh"><p>这一段处理 model card 的管理。我们会先尝试加载已有的 model card，若不存在则新建一个。这样即使仓库是空的，工具也能正常工作。</p></div>

The model card (`README.md`) contains the repository metadata, including tags. By updating the model card data and creating a pull request, we're following the standard Hugging Face workflow for metadata changes.

<div class="tb-zh"><p>model card（README.md）包含仓库的元数据，其中就有标签。通过更新 model card 数据并创建 pull request，我们遵循了 Hugging Face 修改元数据的标准流程。</p></div>

Now for the pull request creation - the main part of our tool:

<div class="tb-zh"><p>现在是创建 pull request——我们工具的主体部分：</p></div>

```python
        # Create a pull request with the updated model card
        pr_title = f"Add '{new_tag}' tag"
        pr_description = f"""
## Add tag: {new_tag}

This PR adds the `{new_tag}` tag to the model repository.

**Changes:**
- Added `{new_tag}` to model tags
- Updated from {len(current_tags)} to {len(updated_tags)} tags

**Current tags:** {", ".join(current_tags) if current_tags else "None"}
**New tags:** {", ".join(updated_tags)}

🤖 This is a pull request created by the Hugging Face Hub Tagging Bot.
"""

        print(f"🚀 Creating PR with title: {pr_title}")
```

We create a detailed pull request description that explains what's changing and why. This transparency is crucial for repository maintainers who will review the PR.

<div class="tb-zh"><p>我们写了一段详细的 pull request 说明，讲清改了什么以及为什么改。对于将要评审该 PR 的仓库维护者来说，这种透明度至关重要。</p></div>

> [!TIP]
> Clear, detailed PR descriptions are essential for automated pull requests. They help repository maintainers understand what's happening and make informed decisions about whether to merge the changes.
>
> Also, it's good practice to clearly state that the PR is created by an automated tool. This helps repository maintainers understand how to deal with the PR.

<div class="tb-zh"><p>对自动化 PR 来说，清晰、详尽的描述至关重要。它能帮助仓库维护者了解发生了什么，从而对是否合并做出有依据的判断。同时，明确说明该 PR 由自动化工具创建，也是一种好习惯，能让维护者知道该如何处理。</p></div>

Finally, we create the commit and pull request:

<div class="tb-zh"><p>最后，我们创建提交和 pull request：</p></div>

```python
        # Create commit with updated model card using CommitOperationAdd
        from huggingface_hub import CommitOperationAdd

        commit_info = hf_api.create_commit(
            repo_id=repo_id,
            operations=[
                CommitOperationAdd(
                    path_in_repo="README.md", path_or_fileobj=str(card).encode("utf-8")
                )
            ],
            commit_message=pr_title,
            commit_description=pr_description,
            token=HF_TOKEN,
            create_pr=True,
        )

        # Extract PR URL from commit info
        pr_url_attr = commit_info.pr_url
        pr_url = pr_url_attr if hasattr(commit_info, "pr_url") else str(commit_info)

        print(f"✅ PR created successfully! URL: {pr_url}")

        result = {
            "status": "success",
            "repo_id": repo_id,
            "tag": new_tag,
            "pr_url": pr_url,
            "previous_tags": current_tags,
            "new_tags": updated_tags,
            "message": f"Created PR to add tag '{new_tag}'",
        }
        json_str = json.dumps(result)
        print(f"✅ add_new_tag success returning: {json_str}")
        return json_str
```

The `create_commit` function with `create_pr=True` is the key to our automation. It creates a commit with the updated `README.md` file and automatically opens a pull request for review.

<div class="tb-zh"><p>带 create_pr=True 的 create_commit 函数是我们自动化的关键。它用更新后的 README.md 创建一个提交，并自动开启一个 pull request 等待评审。</p></div>

Don't forget the error handling for this complex operation:

<div class="tb-zh"><p>别忘了为这个复杂操作加上错误处理：</p></div>

```python
    except Exception as e:
        print(f"❌ Error in add_new_tag: {str(e)}")
        print(f"❌ Error type: {type(e)}")
        import traceback
        print(f"❌ Traceback: {traceback.format_exc()}")

        error_result = {
            "status": "error",
            "repo_id": repo_id,
            "tag": new_tag,
            "error": str(e),
        }
        json_str = json.dumps(error_result)
        print(f"❌ add_new_tag error returning: {json_str}")
        return json_str
```

The comprehensive error handling includes the full traceback, which is invaluable for debugging when things go wrong.

<div class="tb-zh"><p>这套全面的错误处理会带上完整的调用栈，出问题时对调试极有价值。</p></div>

Emojis in log messages might seem silly, but they make scanning logs much faster. 🔧 for function calls, 📡 for API requests, ✅ for success, and ❌ for errors create visual patterns that help you quickly find what you're looking for.

<div class="tb-zh"><p>日志里的 emoji 看起来也许幼稚，但它们能让扫日志快很多。🔧 表示函数调用，📡 表示 API 请求，✅ 表示成功，❌ 表示出错——这些视觉模式能帮你迅速找到想看的内容。</p></div>

> [!TIP]
> Whilst building this application, it's easy to accidentally create an infinite loop of PRs. This is because the `create_commit` function with `create_pr=True` will create a PR for every commit. If the PR is not merged, the `create_commit` function will be called again, and again, and again...
>
> We've added checks to prevent this, but it's something to be aware of.

<div class="tb-zh"><p>在构建这个应用时，很容易不小心制造出 PR 的无限循环。原因在于 create_commit 搭配 create_pr=True 会为每一次提交创建 PR；如果该 PR 没被合并，create_commit 就会被再次调用，一次又一次……我们已经加入了检查来防止这种情况，但这一点仍然值得警惕。</p></div>

## Next Steps

Now that we have our MCP server implemented with robust tagging tools, we need to:

<div class="tb-zh"><p>现在 MCP 服务端已经实现，并具备稳健的打标签工具，接下来我们需要：</p></div>

1. **Create the MCP Client** - Build the interface between our agent and MCP server
2. **Implement Webhook Handling** - Listen for Hub discussion events
3. **Integrate Agent Logic** - Connect webhooks with MCP tool calls
4. **Test the Complete System** - Validate end-to-end functionality

<div class="tb-zh"><p>1. 创建 MCP 客户端——搭建智能体与 MCP 服务端之间的接口；2. 实现 webhook 处理——监听 Hub 的讨论事件；3. 整合智能体逻辑——把 webhook 与 MCP 工具调用接起来；4. 测试整套系统——验证端到端功能。</p></div>

In the next section, we'll create the MCP client that will allow our webhook handler to interact with these tools intelligently.

<div class="tb-zh"><p>下一节我们会创建 MCP 客户端，让 webhook 处理器能够智能地与这些工具交互。</p></div>

> [!TIP]
> The MCP server runs as a separate process from your main application. This isolation provides better error handling and allows the server to be reused by multiple clients or applications.

<div class="tb-zh"><p>MCP 服务端与你的主应用是各自独立的进程，这种隔离带来了更好的错误处理，也让服务端可以被多个客户端或应用复用。</p></div>
