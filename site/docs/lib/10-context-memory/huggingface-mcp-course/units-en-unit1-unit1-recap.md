---
title: "Unit1 recap"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit1/unit1-recap.mdx"
sourceRel: "units/en/unit1/unit1-recap.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit1/unit1-recap.mdx"
sourceSha256: "e16d174ac7755ddb0c728f11b3b96f0e0c011db3037339eef4651b2006916ad7"
pageSha256: "e16d174ac7755ddb0c728f11b3b96f0e0c011db3037339eef4651b2006916ad7"
contentMode: "local-full"
zh: "on"
---

# Unit1 recap

## Model Context Protocol (MCP)

The MCP is a standardized protocol designed to connect AI models with external tools, data sources, and environments. It addresses the limitations of existing AI systems by enabling interoperability and access to real-time information.

<div class="tb-zh"><p>MCP 是一种标准化协议，用于把 AI 模型与外部工具、数据源和运行环境连接起来。它通过实现互操作性、提供实时信息访问，解决了现有 AI 系统的局限。</p></div>

## Key Concepts

### Client-Server Architecture
MCP follows a client-server model where clients manage communication between users and servers. This architecture promotes modularity, allowing for easy addition of new servers without requiring changes to existing hosts.

### Components

#### Host
The user-facing AI application that serves as the interface for end-users.

##### Client
A component within the host application responsible for managing communication with a specific MCP server. Clients maintain 1:1 connections with servers and handle protocol-level details.

#### Server
An external program or service that provides access to tools, data sources, or services via the MCP protocol. Servers act as lightweight wrappers around existing functionalities.

### Capabilities

#### Tools
Executable functions that can perform actions (e.g., sending messages, querying APIs). Tools are typically model-controlled and require user approval due to their ability to perform actions with side effects.

#### Resources
Read-only data sources for context retrieval without significant computation. Resources are application-controlled and designed for data retrieval similar to GET endpoints in REST APIs.

#### Prompts
Pre-defined templates or workflows that guide interactions between users, AI models, and available capabilities. Prompts are user-controlled and set the context for interactions.

#### Sampling
Server-initiated requests for LLM processing, enabling server-driven agentic behaviors and potentially recursive or multi-step interactions. Sampling operations typically require user approval.

### Communication Protocol
The MCP protocol uses JSON-RPC 2.0 as the message format for communication between clients and servers. Two primary transport mechanisms are supported: stdio (for local communication) and HTTP+SSE (for remote communication). Messages include requests, responses, and notifications.

### Discovery Process
MCP allows clients to dynamically discover available tools, resources, and prompts through list methods (e.g., `tools/list`). This dynamic discovery mechanism enables clients to adapt to the specific capabilities each server offers without requiring hardcoded knowledge of server functionality.

### MCP SDKs
Official SDKs are available in various programming languages for implementing MCP clients and servers. These SDKs handle protocol-level communication, capability registration, and error handling, simplifying the development process.

### Gradio Integration
Gradio allows easy creation of web interfaces that expose capabilities to the MCP protocol, making it accessible for both humans and AI models. This integration provides a human-friendly interface alongside AI-accessible tools with minimal code.

### Hugging Face MCP enhancements
- Hosted MCP Server now integrates with more clients (VS Code, Cursor, Zed, Claude Desktop).
- Curated built-in tools for searching models, datasets, Spaces, and papers.
- One-click configuration snippets from `https://huggingface.co/settings/mcp`.
- Add MCP-compatible Gradio Spaces via settings and use them directly from your assistant.
