---
title: "Setting up the Project"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit3_1/setting-up-the-project.mdx"
sourceRel: "units/en/unit3_1/setting-up-the-project.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit3_1/setting-up-the-project.mdx"
sourceSha256: "08ef87cae6eeb054acc3827a019a1e2e23699b796ba08469450f1bdd935b655c"
pageSha256: "08ef87cae6eeb054acc3827a019a1e2e23699b796ba08469450f1bdd935b655c"
contentMode: "local-full"
zh: "on"
---

# Setting up the Project

In this section, we'll set up the development environment for our Pull Request Agent. 

<div class="tb-zh"><p>本节我们为 Pull Request Agent 搭建开发环境。</p></div>

> [!TIP]
> We'll use modern Python tooling with `uv` for dependency management and create the necessary configuration files. If you're not familiar with `uv`, you can learn more about it [here](https://docs.astral.sh/uv/).

<div class="tb-zh"><p>我们会使用现代 Python 工具链，用 uv 管理依赖并创建必要的配置文件。如果你还不熟悉 uv，可以在它的文档中进一步了解。</p></div>

## Project Structure

Let's start by creating the project directory and understanding the file structure:

<div class="tb-zh"><p>我们先创建项目目录，并理解文件结构：</p></div>

```bash
git clone https://huggingface.co/spaces/mcp-course/tag-this-repo
```

Our final project structure will look like this:

<div class="tb-zh"><p>项目最终的结构大致如下：</p></div>

```
hf-pr-agent/
├── mcp_server.py              # Core MCP server with tagging tools
├── app.py                     # FastAPI webhook listener and agent
├── requirements.txt           # Python dependencies
├── pyproject.toml             # Project configuration
├── env.example                # Environment variables template
├── cleanup.py                 # Development utility
```

## Dependencies and Configuration

Let's walk through the dependencies and configuration for our project. 

<div class="tb-zh"><p>我们过一遍项目的依赖与配置。</p></div>

### 1. Python Project Configuration

We will use `uv` to create the `pyproject.toml` file to define our project:

<div class="tb-zh"><p>我们用 uv 生成 pyproject.toml 文件来定义项目：</p></div>

> [!TIP]
> If you don't have `uv` installed, you can follow the instructions [here](https://docs.astral.sh/uv/getting-started/installation/).

<div class="tb-zh"><p>如果还没有安装 uv，可以按其文档中的说明进行安装。</p></div>

```toml
[project]
name = "mcp-course-unit3-example"
version = "0.1.0"
description = "FastAPI and Gradio app for Hugging Face Hub discussion webhooks"
readme = "README.md"
requires-python = ">=3.11"
dependencies = [
    "fastapi>=0.104.0",
    "uvicorn[standard]>=0.24.0",
    "gradio>=4.0.0",
    "huggingface-hub[mcp]>=0.32.0",
    "pydantic>=2.0.0",
    "python-multipart>=0.0.6",
    "requests>=2.31.0",
    "python-dotenv>=1.0.0",
    "fastmcp>=2.0.0",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["src"]
```

For compatibility with various deployment platforms, the same is repeated in `requirements.txt`

<div class="tb-zh"><p>为了兼容各种部署平台，同样的内容也在 requirements.txt 中重复一份。</p></div>

To create a virtual environment, run:

<div class="tb-zh"><p>创建虚拟环境，运行：</p></div>

```bash
uv venv
source .venv/bin/activate # or .venv/Scripts/activate on Windows
```

To install the dependencies, run:

<div class="tb-zh"><p>安装依赖，运行：</p></div>

```bash
uv sync
```

### 2. Environment Configuration

Create `env.example` to document required environment variables:

<div class="tb-zh"><p>创建 env.example，用来记录需要的环境变量：</p></div>

```bash
# Hugging Face API Token (required)
# Get from: https://huggingface.co/settings/tokens
HF_TOKEN=hf_your_token_here

# Webhook Secret (required for production)
# Use a strong, random string
WEBHOOK_SECRET=your-webhook-secret-here

# Model for the agent (optional)
HF_MODEL=owner/model

# Provider for MCP agent (optional)
HF_PROVIDER=huggingface
```

You will need to get your Hugging Face API token from [here](https://huggingface.co/settings/tokens).

<div class="tb-zh"><p>你需要在这里获取 Hugging Face API 令牌（https://huggingface.co/settings/tokens）。</p></div>

You will also need to generate a webhook secret. You can do this by running the following command:

<div class="tb-zh"><p>你还需要生成一个 webhook 密钥，可以用下面的命令完成：</p></div>

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

You will then need to add the webhook secret to your `.env` file based on the `env.example` file.

<div class="tb-zh"><p>然后照着 env.example，把 webhook 密钥写进你的 .env 文件。</p></div>

## Next Steps

With our project structure and environment set up, we're ready to:

<div class="tb-zh"><p>项目结构和环境就绪后，我们就可以开始：</p></div>

1. **Create the MCP Server** - Implement the core tagging functionality
2. **Build the Webhook Listener** - Handle incoming discussion events
3. **Integrate the Agent** - Connect MCP tools with webhook processing
4. **Test and Deploy** - Validate functionality and deploy to Spaces

<div class="tb-zh"><p>1. 创建 MCP 服务端——实现核心的打标签功能；2. 构建 webhook 监听器——处理传入的讨论事件；3. 整合智能体——把 MCP 工具与 webhook 处理连起来；4. 测试与部署——验证功能并部署到 Spaces。</p></div>

In the next section, we'll dive into creating our MCP server that will handle all the Hugging Face Hub interactions.

<div class="tb-zh"><p>下一节我们会深入创建处理所有 Hugging Face Hub 交互的 MCP 服务端。</p></div>

> [!TIP]
> Keep your `.env` file secure and never commit it to version control. The `.env` file should be added to your `.gitignore` file to prevent accidental exposure of secrets.

<div class="tb-zh"><p>妥善保管 .env 文件，切勿提交到版本控制。应把 .env 加入 .gitignore，避免密钥被意外泄露。</p></div>
