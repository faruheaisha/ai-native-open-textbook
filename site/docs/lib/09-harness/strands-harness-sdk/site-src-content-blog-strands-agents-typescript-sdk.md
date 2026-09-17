---
title: "Strands Harness SDK"
sourceId: "09-harness/strands-harness-sdk"
sourceTitle: "Strands Harness SDK"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/strands-agents/harness-sdk"
entryUrl: "https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/site/src/content/blog/strands-agents-typescript-sdk.mdx"
sourceRel: "site/src/content/blog/strands-agents-typescript-sdk.mdx"
rawUrl: "/raw/09-harness/strands-harness-sdk/site/src/content/blog/strands-agents-typescript-sdk.mdx"
sourceSha256: "f4fe24e08c8b4d6af13311e9a840792d0c52151b21d97ce621451c3710d3d6bb"
pageSha256: "f4fe24e08c8b4d6af13311e9a840792d0c52151b21d97ce621451c3710d3d6bb"
contentMode: "local-full"
zh: ""
---

# Strands Harness SDK

We're excited to announce the release candidate of the [Strands Agents TypeScript SDK](https://github.com/strands-agents/sdk-typescript). The SDK brings the model-driven approach to building AI agents to the TypeScript and JavaScript ecosystem. If you've been following Strands Agents, you know the Python SDK has been powering production agents across AWS and the broader community since May 2025. Now, TypeScript developers get the same simple, powerful primitives with full type safety, custom tools, and the ability to run agents in both Node.js and the browser.

Getting started takes just a few lines of code:

```bash
npm install @strands-agents/sdk
```

```typescript
import { Agent } from '@strands-agents/sdk'

--8<-- "../blog/strands-agents-typescript-sdk.ts:hello_world"
```

That's it. An agent with a model, a prompt, and a conversation. The model drives the reasoning and orchestration, while you shape its behavior to fit your use case.

## What's in the box

The TypeScript SDK ships with the core features you need to build agents that range from quick prototypes to production systems. Here's a quick tour. For the full details, head over to the [TypeScript quickstart guide](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/docs/user-guide/quickstart/typescript/README.md).

### Model providers

The SDK supports multiple model providers out of the box. Amazon Bedrock is the default, with first-class support for OpenAI, Anthropic, Google Gemini, and Vercel AI SDK providers:

```typescript
import { Agent } from '@strands-agents/sdk'
import { OpenAIModel } from '@strands-agents/sdk/models/openai'

--8<-- "../blog/strands-agents-typescript-sdk.ts:model_provider"
```

### Tools

Define a tool with a Zod schema and a callback. The SDK handles the rest:

```typescript
import { tool } from '@strands-agents/sdk'
import { z } from 'zod'

--8<-- "../blog/strands-agents-typescript-sdk.ts:tool_definition"
```

### Streaming

Stream responses as they're generated for responsive UIs and real-time feedback:

```typescript
import { Agent } from '@strands-agents/sdk'

--8<-- "../blog/strands-agents-typescript-sdk.ts:streaming"
```

### MCP integration

Connect to any [Model Context Protocol](https://modelcontextprotocol.io/) server and use its tools directly:

```typescript
import { Agent, McpClient } from '@strands-agents/sdk'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

--8<-- "../blog/strands-agents-typescript-sdk.ts:mcp"
```

### Multi-agent orchestration

Coordinate multiple agents using Graph (deterministic DAG execution) or Swarm (dynamic, model-driven handoffs) patterns:

```typescript
import { Agent } from '@strands-agents/sdk'
import { Graph } from '@strands-agents/sdk/multiagent'

--8<-- "../blog/strands-agents-typescript-sdk.ts:multi_agent"
```

### And more

The SDK also includes structured output with Zod schema validation, conversation management (sliding window, summarization), lifecycle hooks, session persistence (including S3 storage), OpenTelemetry-based observability, Agent-to-Agent (A2A) protocol support, and vended tools like notebook, file editor, HTTP request, and bash. Check the [docs](https://strandsagents.com) for the full rundown.

## Agents in the browser

What makes the TypeScript SDK unique is that it runs natively in the browser. No server required. This opens up a whole category of interactive, client-side agent experiences.

To show what's possible, we built a [browser agent example](https://github.com/strands-agents/sdk-typescript/tree/main/strands-ts/examples/browser-agent) where an AI agent manipulates a live canvas element through natural language. You chat with the agent, and it uses a custom `update_canvas` tool to change HTML, CSS, or run JavaScript in an iframe, all streaming in real time.

![Browser agent demo](/mirror/bb/bb1d15546875fa19cfec6dffcc87756acdaad624.webp)

Clone the repo and try it out:

```bash
git clone https://github.com/strands-agents/sdk-typescript.git
cd sdk-typescript/strands-ts/examples/browser-agent
npm install && npm run dev
```

## Get started

The TypeScript SDK is available now on npm:

```bash
npm install @strands-agents/sdk
```

Here's where to go next:

- [Getting started](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/docs/user-guide/quickstart/typescript/README.md) to build your first agent
- [GitHub](https://github.com/strands-agents/sdk-typescript) for source code and examples

We're building this in the open and contributions are welcome. Whether it's a bug fix, a new feature, or a cool example, we'd love to see what you build. Join us [on GitHub](https://github.com/strands-agents/sdk-typescript) and let us know what you think.
