---
title: "🤖 LLM INFERENCE SYSTEM"
sourceId: "07-coding/cloudflare-vibesdk"
sourceTitle: "Cloudflare VibeSDK"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/cloudflare/vibesdk"
entryUrl: "https://github.com/cloudflare/vibesdk/blob/9da158d82c597a0e8f4bf033cdccd1053fb6fb15/docs/llm.md"
sourceRel: "docs/llm.md"
rawUrl: "/raw/07-coding/cloudflare-vibesdk/docs/llm.md"
sourceSha256: "5cade1cd8dea6404f985f3f367e0c0233441fc841f741f71f3da1e6c1e0c9cf7"
pageSha256: "96545572cebe13f0d18c034a952531e401af615641fd74cc7344b61d4eea2d47"
contentMode: "local-full"
zh: ""
---

# 🤖 LLM INFERENCE SYSTEM

## Overview

**Location:** `/worker/agents/inferutils/`

Centralized inference engine that all operations use to call LLMs.

**Key features:**
- Multi-provider support (OpenAI, Anthropic via Cloudflare AI Gateway)
- Streaming responses
- Tool calling with recursive execution
- Retry logic with exponential backoff
- Cancellation support (AbortController)
- Token tracking

---

## Inference Flow

```
Operation (PhaseImplementation, UserConversationProcessor, etc.)
        ↓
   getOperationOptions() → InferenceContext
        ↓
   executeInference(args, context)
        ↓
   ┌─────────────────────────────────┐
   │   Retry Loop (max 3 attempts)  │
   └─────────────┬───────────────────┘
                 ↓
            infer(args)
                 ↓
   ┌─────────────────────────────────┐
   │  OpenAI SDK (via AI Gateway)   │
   │  - Model selection              │
   │  - Token streaming              │
   │  - Tool call parsing            │
   └─────────────┬───────────────────┘
                 ↓
          Tool calls present?
                 │
         ┌───────┴───────┐
        Yes              No
         │                │
         ↓                ↓
  Execute tools    Return response
  Recursive infer
```

---

## Model Selection

**Location:** `/worker/agents/inferutils/config.ts`

**Available models:**

1. **GPT-4o** - Fast, good for most tasks
2. **GPT-4o-mini** - Cheapest, simple operations
3. **Claude 3.5 Sonnet** - Best for complex reasoning
4. **Gemini 2.0 Flash** - Fast, experimental
5. **Gemini 2.5 Pro** - Highest quality, deep debugging

**Selection by operation:**
- Blueprint generation: GPT-4o
- Phase planning: GPT-4o  
- File generation: GPT-4o
- Conversation: GPT-4o-mini
- Deep debugging: Gemini 2.5 Pro (reasoning_effort: high)
- Code review: GPT-4o

---

## Streaming

**When enabled:**
- User conversation responses
- Deep debugger output
- Real-time code generation feedback

**How it works:**
1. LLM sends Server-Sent Events (SSE)
2. `infer()` yields chunks via async generator
3. Operation accumulates + forwards to WebSocket
4. Frontend renders progressively

---

## Tool Calling

**Recursive execution:**

1. LLM response includes `tool_calls` array
2. `infer()` executes each tool in parallel
3. Results collected
4. Filtered (empty/null results skipped)
5. If results exist: call LLM again with tool outputs
6. Repeat until LLM provides final response

**Max depth:** Configurable per operation

---

## Retry Logic

**Triggers retry:**
- Rate limit errors (429)
- Network timeouts
- Temporary API failures (5xx)

**Does NOT retry:**
- Cancelled operations (AbortError)
- Invalid API key (401)
- Malformed requests (400)

**Backoff:** Exponential (1s, 2s, 4s)

---

## Cancellation

Each operation gets AbortSignal:

```
User clicks stop button
     ↓
WebSocket: STOP_GENERATION
     ↓
agent.cancelCurrentInference()
     ↓
AbortController.abort()
     ↓
OpenAI SDK cancels HTTP request
     ↓
infer() throws InferError('cancelled')
     ↓
No retry, immediate propagation
```

**Nested operations:** Share same AbortController
**Tool calls:** All cancelled together
