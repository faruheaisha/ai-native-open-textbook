---
title: "Hugging Face MCP Server"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit1/hf-mcp-server.mdx"
sourceRel: "units/en/unit1/hf-mcp-server.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit1/hf-mcp-server.mdx"
sourceSha256: "c860a7b2c13cd9e444385909005f202244f462b6c429c2d070bbff92dcacf13f"
pageSha256: "c860a7b2c13cd9e444385909005f202244f462b6c429c2d070bbff92dcacf13f"
contentMode: "local-full"
zh: "on"
---

# Hugging Face MCP Server

The Hugging Face MCP (Model Context Protocol) Server connects your MCP‑compatible AI assistant (for example VS Code, Cursor, Zed, or Claude Desktop) directly to the Hugging Face Hub. Once connected, your assistant can search and explore Hub resources and use community tools, all from within your editor, chat or CLI.

<div class="tb-zh"><p>Hugging Face MCP（Model Context Protocol）Server 把你的 MCP 兼容 AI 助手（例如 VS Code、Cursor、Zed 或 Claude Desktop）直接连接到 Hugging Face Hub。连接之后，你的助手就能在编辑器、对话或命令行中搜索和浏览 Hub 资源，并使用社区工具。</p></div>

> [!TIP]
> The main advanatage of the Hugging Face MCP Server is that it provides a built-in tools for the hub as well as community tools based on Gradio Spaces. As we start to build our own MCP servers, we'll see that we can use the Hugging Face MCP Server as a reference for our own MCP servers.

<div class="tb-zh"><p>Hugging Face MCP Server 的主要优势在于：它既为 Hub 提供了内置工具，也提供了基于 Gradio Spaces 的社区工具。等我们开始构建自己的 MCP 服务端时，可以把 Hugging Face MCP Server 当作参考范例。</p></div>

## What you can do

- Search and explore Hub resources: models, datasets, Spaces, and papers.
- Run community tools via MCP‑compatible Gradio apps hosted on [Spaces](https://hf.co/spaces).
- Bring results back into your assistant with metadata, links, and context.

<div class="tb-zh"><p>搜索与浏览 Hub 资源：模型、数据集、Spaces 与论文；通过托管在 Spaces 上、兼容 MCP 的 Gradio 应用运行社区工具；把结果连同元数据、链接与上下文一并带回你的助手。</p></div>

## Built-in tools

The server provides curated tools that work across supported clients:

<div class="tb-zh"><p>该 Server 提供了一组经过整理的精选工具，可在受支持的客户端中使用：</p></div>

- Models search and exploration (filter by task, library, downloads, likes)
- Datasets search and exploration (filter by tags, size, modality)
- Spaces semantic search (find apps by capability, e.g., TTS, ASR, OCR)
- Papers semantic search (discover relevant research on the Hub)

<div class="tb-zh"><p>模型搜索与浏览（可按任务、库、下载量、点赞数筛选）；数据集搜索与浏览（可按标签、规模、模态筛选）；Spaces 语义搜索（按能力找应用，例如 TTS、ASR、OCR）；论文语义搜索（在 Hub 上发现相关研究）。</p></div>

## Get started

1. Open your MCP settings: visit https://huggingface.co/settings/mcp while logged in.

<div class="tb-zh"><p>1. 打开 MCP 设置：登录后访问 https://huggingface.co/settings/mcp。</p></div>

2. Pick your client: select your MCP‑compatible client (for example VS Code, Cursor, Zed, Claude Desktop). The page shows client‑specific instructions and a ready‑to‑copy configuration snippet.

<div class="tb-zh"><p>2. 选择你的客户端：选中兼容 MCP 的客户端（例如 VS Code、Cursor、Zed、Claude Desktop）。页面会给出该客户端专属的说明与可直接复制的配置片段。</p></div>

3. Paste and restart: copy the snippet into your client’s MCP configuration, save, and restart/reload the client. You should see “Hugging Face” (or similar) listed as a connected MCP server in your client.

<div class="tb-zh"><p>3. 粘贴并重启：把片段复制到客户端的 MCP 配置中，保存后重启或重新加载客户端。你应当能在客户端里看到「Hugging Face」（或类似名称）已被列为已连接的 MCP 服务端。</p></div>

> [!TIP]
> The settings page generates the exact configuration your client expects. Use it rather than writing config by hand.

<div class="tb-zh"><p>设置页会生成你的客户端所需要的准确配置，请直接使用它，而不要手写配置。</p></div>

![MCP Settings Example](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hf-mcp-settings.png)

## Using the server

After connecting, ask your assistant to use the Hugging Face tools. Example prompts:

<div class="tb-zh"><p>连接完成后，让你的助手调用 Hugging Face 工具。示例提示词：</p></div>

- “Search Hugging Face models for Qwen 3 quantizations.”
- “Find a Space that can transcribe audio files.”
- “Show datasets about weather time‑series.”
- “Create a 1024 × 1024 image of a cat in Ghibli style.”

<div class="tb-zh"><p>「帮我在 Hugging Face 上搜索 Qwen 3 的量化版本。」「找一个能转写音频文件的 Space。」「展示关于天气时间序列的数据集。」「生成一张 1024 × 1024 的吉卜力风格猫咪图片。」</p></div>

Your assistant will call MCP tools exposed by the Hugging Face MCP Server (including Spaces) and return results (titles, owners, downloads, links, and so on). You can then open the resource on the Hub or continue iterating in the same chat.

<div class="tb-zh"><p>你的助手会调用 Hugging Face MCP Server（含 Spaces）暴露的 MCP 工具，并返回结果（标题、所有者、下载量、链接等）。随后你可以在 Hub 上打开该资源，或在同一个对话里继续迭代。</p></div>

![HF MCP with Spaces in VS Code](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hf-mcp-vscode.png)

## Add community tools (Spaces)

You can extend your setup with MCP‑compatible Gradio Spaces built by the community:

<div class="tb-zh"><p>你还可以用社区构建的、兼容 MCP 的 Gradio Spaces 来扩展自己的配置：</p></div>

- Explore Spaces with MCP support [here](https://huggingface.co/spaces?search=mcp).
- Add the relevant space in your MCP settings on Hugging Face [here](https://huggingface.co/settings/mcp).

<div class="tb-zh"><p>在这里浏览支持 MCP 的 Spaces；在 Hugging Face 的 MCP 设置页里添加相应的 Space。</p></div>

Gradio MCP apps expose their functions as tools (with arguments and descriptions) so your assistant can call them directly. Please, restart or refresh your client so it picks up new tools you add.

<div class="tb-zh"><p>Gradio MCP 应用会把自身的函数作为工具暴露出来（带参数与描述），因此你的助手可以直接调用它们。添加新工具后，请重启或刷新客户端，让它把新工具加载进来。</p></div>

## Learn more

- Settings and client setup: https://huggingface.co/settings/mcp
- Changelog announcement: https://huggingface.co/changelog/hf-mcp-server
- HF MCP Server documentation: https://huggingface.co/docs/hub/en/hf-mcp-server
- Building your own MCP server with Gradio and Hub tools: https://huggingface.co/docs/hub/main/agents

<div class="tb-zh"><p>设置与客户端配置：https://huggingface.co/settings/mcp；更新公告：https://huggingface.co/changelog/hf-mcp-server；HF MCP Server 文档：https://huggingface.co/docs/hub/en/hf-mcp-server；用 Gradio 与 Hub 工具构建你自己的 MCP 服务端：https://huggingface.co/docs/hub/main/agents</p></div>
