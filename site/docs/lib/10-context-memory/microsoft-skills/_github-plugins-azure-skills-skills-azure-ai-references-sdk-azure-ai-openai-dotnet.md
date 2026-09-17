---
title: "Azure OpenAI — .NET SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-openai-dotnet.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-openai-dotnet.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-openai-dotnet.md"
sourceSha256: "f91f7ff0e9f5668d148d2ae304da90bb23bec13a713a4256905c8bdd4ec99d17"
pageSha256: "f91f7ff0e9f5668d148d2ae304da90bb23bec13a713a4256905c8bdd4ec99d17"
contentMode: "local-full"
zh: ""
---

# Azure OpenAI — .NET SDK Quick Reference

> Condensed from **azure-ai-openai-dotnet**. Full patterns (function calling, structured outputs, RAG with Search)
> in the **azure-ai-openai-dotnet** plugin skill if installed.

## Install
```bash
dotnet add package Azure.AI.OpenAI
```

## Quick Start
```csharp
using Azure.AI.OpenAI;
using OpenAI.Chat;
var azureClient = new AzureOpenAIClient(new Uri(endpoint), credential);
ChatClient chatClient = azureClient.GetChatClient("gpt-4o-mini");
```

## Non-Obvious Patterns
- Client hierarchy: `AzureOpenAIClient.GetChatClient()` / `GetEmbeddingClient()` / `GetImageClient()` / `GetAudioClient()`
- Reasoning models (o1): use `DeveloperChatMessage` instead of `SystemChatMessage`, set `ReasoningEffortLevel`
- RAG: `#pragma warning disable AOAI001` then `options.AddDataSource(new AzureSearchChatDataSource\{...\})`
- Structured outputs: `ChatResponseFormat.CreateJsonSchemaFormat(...)`

## Best Practices
1. Use Entra ID in production — avoid API keys
2. Reuse client instances — create once, share across requests
3. Handle rate limits — implement exponential backoff for 429 errors
4. Stream for long responses — use `CompleteChatStreamingAsync`
5. Set appropriate timeouts for long completions
6. Use structured outputs for consistent response format
7. Monitor token usage via `completion.Usage` for cost management
8. Validate tool call arguments before execution
