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
entryUrl: "https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/site/src/content/changelog/harness/typescript-v0.2.1.md"
sourceRel: "site/src/content/changelog/harness/typescript-v0.2.1.md"
rawUrl: "/raw/09-harness/strands-harness-sdk/site/src/content/changelog/harness/typescript-v0.2.1.md"
sourceSha256: "eeab5a33d14620238c6cc738198610a882d6ed5e1247b1de9a132b333968b5bb"
pageSha256: "eeab5a33d14620238c6cc738198610a882d6ed5e1247b1de9a132b333968b5bb"
contentMode: "local-full"
zh: ""
---

# Strands Harness SDK

## Major Features

### Google Gemini Model Provider - [PR#426](https://github.com/strands-agents/sdk-typescript/pull/426)

A new `GeminiModel` provider brings native Google Gemini support to the TypeScript SDK. It integrates with the `@google/genai` SDK and supports streaming text responses with the standard `ModelStreamEvent` interface, configurable model parameters, and API key authentication via constructor option or the `GEMINI_API_KEY` environment variable. You can also pass a pre-configured `GoogleGenAI` client instance. The default model is `gemini-2.5-flash`. This initial release supports text content streaming, with tool calling planned for a follow-up.

```typescript
import { GeminiModel } from 'strands-agents/models/gemini'
import { Agent } from 'strands-agents'

// With API key (or set GEMINI_API_KEY env var)
const model = new GeminiModel({
  apiKey: 'your-api-key',
  modelId: 'gemini-2.5-flash',
  params: { temperature: 0.7, maxOutputTokens: 1024 },
})

const agent = new Agent({ model })
const result = await agent.invoke('What is the capital of France?')

// Or pass a pre-configured client
import { GoogleGenAI } from '@google/genai'
const client = new GoogleGenAI({ apiKey: 'your-api-key' })
const model2 = new GeminiModel({ client })
```

### Tool Call Retry via Hooks - [PR#493](https://github.com/strands-agents/sdk-typescript/pull/493)

Hooks can now request tool execution retries through a new `retry` property on `AfterToolCallEvent`, bringing feature parity with the Python SDK. When a hook sets `event.retry = true`, the agent discards the current result from conversation history and re-executes the tool, emitting a fresh `BeforeToolCallEvent` on each attempt. Retries work both for error recovery and for success-based re-evaluation when the result doesn't meet criteria. **Breaking change:** `AfterModelCallEvent.retryModelCall` has been renamed to `AfterModelCallEvent.retry` for consistency.

```typescript
import { Agent } from 'strands-agents'
import { AfterToolCallEvent } from 'strands-agents/hooks/events'

const agent = new Agent({ model, tools: [myTool] })

let attempts = 0
agent.hooks.addCallback(AfterToolCallEvent, (event: AfterToolCallEvent) => {
  attempts++
  if (event.error && attempts < 3) {
    event.retry = true // Tool will be re-executed
  }
})
```

> **Migration note:** Rename `afterModelCallEvent.retryModelCall = true` to `afterModelCallEvent.retry = true`.

---

## Bug Fixes

* **Add `@google/genai` to devDependencies** - [PR#502](https://github.com/strands-agents/sdk-typescript/pull/502)
  Fixed CI build failures by adding the `@google/genai` package to devDependencies, ensuring TypeScript compilation succeeds for the new Gemini model provider.
