---
title: "Claude API - Go"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-claude-api-reference-go.md"
sourceRel: "system-prompts/data-claude-api-reference-go.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-claude-api-reference-go.md"
sourceSha256: "c1483fc8ff614c1fe203c6ac5be9e4cbcb898ee2e167ea1e7a66395913db5cd7"
pageSha256: "c1483fc8ff614c1fe203c6ac5be9e4cbcb898ee2e167ea1e7a66395913db5cd7"
contentMode: "local-full"
zh: ""
---

# Claude API - Go

> **Note:** The Go SDK supports the Claude API and beta tool use with `BetaToolRunner`. Agent SDK is not yet available for Go.

## Installation

```bash
go get github.com/anthropics/anthropic-sdk-go
```

## Client Initialization

```go
import (
    "github.com/anthropics/anthropic-sdk-go"
    "github.com/anthropics/anthropic-sdk-go/option"
)

// Default (uses ANTHROPIC_API_KEY env var)
client := anthropic.NewClient()

// Explicit API key
client := anthropic.NewClient(
    option.WithAPIKey("your-api-key"),
)
```

---

## Model IDs

`anthropic.Model` is an alias for `string`, so pass the model as its plain id: <code v-pre>Model: "{{OPUS_ID}}"</code>. Default to &#123;&#123;OPUS_NAME&#125;&#125; unless the user specifies otherwise; if they ask for Fable or the most powerful model, use <code v-pre>"{{FABLE_ID}}"</code>; if they ask for a cheaper tier, use the current generation - <code v-pre>"{{SONNET_ID}}"</code> or <code v-pre>"{{HAIKU_ID}}"</code> (see `shared/models.md` for the full resolution table).

The SDK also ships typed `anthropic.ModelClaude*` constants, but they lag model launches - a given SDK release may have constants only for previous-generation models. Do not pick a model because it has a typed constant; the string id works for every model on every SDK version. Check the SDK release notes before assuming a typed constant exists for a current model.

---

## Basic Message Request

```go
response, err := client.Messages.New(context.Background(), anthropic.MessageNewParams{
    Model:     "{{OPUS_ID}}",
    MaxTokens: 16000,
    Messages: []anthropic.MessageParam{
        anthropic.NewUserMessage(anthropic.NewTextBlock("What is the capital of France?")),
    },
})
if err != nil {
    log.Fatal(err)
}
for _, block := range response.Content {
    switch variant := block.AsAny().(type) {
    case anthropic.TextBlock:
        fmt.Println(variant.Text)
    }
}
```

---

## Thinking

Enable Claude's internal reasoning by setting `Thinking` in `MessageNewParams`. The response will contain `ThinkingBlock` content before the final `TextBlock`.

**Adaptive thinking is the recommended mode for Claude 4.6+ models.** Claude decides dynamically when and how much to think. Combine with the `effort` parameter for cost-quality control.

Derived from `anthropic-sdk-go/message.go` (`ThinkingConfigParamUnion`, `ThinkingConfigAdaptiveParam`).

```go
// There is no ThinkingConfigParamOfAdaptive helper - construct the union
// struct-literal directly and take the address of the variant.
// display opt-in: default is omitted (empty thinking text) on Fable 5/5.1, Mythos 5/5.1, {{OPUS_NAME}}, Opus 4.8/4.7, and {{SONNET_NAME}}
adaptive := anthropic.ThinkingConfigAdaptiveParam{Display: anthropic.ThinkingConfigAdaptiveDisplaySummarized}
params := anthropic.MessageNewParams{
    Model:     "{{OPUS_ID}}",
    MaxTokens: 16000,
    Thinking:  anthropic.ThinkingConfigParamUnion{OfAdaptive: &adaptive},
    Messages: []anthropic.MessageParam{
        anthropic.NewUserMessage(anthropic.NewTextBlock("How many r's in strawberry?")),
    },
}

resp, err := client.Messages.New(context.Background(), params)
if err != nil {
    log.Fatal(err)
}

// ThinkingBlock(s) precede TextBlock in content
for _, block := range resp.Content {
    switch b := block.AsAny().(type) {
    case anthropic.ThinkingBlock:
        fmt.Println("[thinking]", b.Thinking)
    case anthropic.TextBlock:
        fmt.Println(b.Text)
    }
}
```

> **Fable 5, &#123;&#123;OPUS_NAME&#125;&#125;, Opus 4.8, Opus 4.7, Opus 4.6, and Sonnet 4.6:** Use adaptive thinking (above). `ThinkingConfigParamOfEnabled(budgetTokens)` is removed on Fable 5, &#123;&#123;OPUS_NAME&#125;&#125;, Opus 4.8, and 4.7 (400 if sent); deprecated on Opus 4.6 and Sonnet 4.6.
> **&#123;&#123;OPUS_NAME&#125;&#125;:** thinking is on by default - leaving `Thinking` unset runs adaptive (the adaptive union is equivalent), unlike Opus 4.8/4.7 where leaving it unset meant no thinking.
> **Older models:** Use `anthropic.ThinkingConfigParamOfEnabled(N)` (budget must be < `MaxTokens`, min 1024).

To disable: <code v-pre>anthropic.ThinkingConfigParamUnion\{OfDisabled: &anthropic.ThinkingConfigDisabledParam\{}}</code>. On &#123;&#123;OPUS_NAME&#125;&#125; that is accepted only at effort `high` or lower - pairing it with `xhigh`/`max` returns a 400.

---

## Prompt Caching

`System` is `[]TextBlockParam`; set `CacheControl` on the last block to cache tools + system together. For placement patterns and the silent-invalidator audit checklist, see `shared/prompt-caching.md`.

```go
System: []anthropic.TextBlockParam{{
    Text:         longSystemPrompt,
    CacheControl: anthropic.NewCacheControlEphemeralParam(), // default 5m TTL
}},
```

For 1-hour TTL: `anthropic.CacheControlEphemeralParam\{TTL: anthropic.CacheControlEphemeralTTLTTL1h\}`. There's also a top-level `CacheControl` on `MessageNewParams` that auto-places on the last cacheable block.

Verify hits via `resp.Usage.CacheCreationInputTokens` / `resp.Usage.CacheReadInputTokens`.

---

## Stop Details

When `StopReason` is `anthropic.StopReasonRefusal`, the response includes structured `StopDetails`:

```go
if resp.StopReason == anthropic.StopReasonRefusal {
    fmt.Println("Category:", resp.StopDetails.Category)     // e.g. "cyber", "bio", "reasoning_extraction", "frontier_llm", or "" - see docs for the full set
    fmt.Println("Explanation:", resp.StopDetails.Explanation)
}
```

**Refusal fallbacks (&#123;&#123;FABLE_NAME&#125;&#125;) - opt in by default.** Fallbacks are opt-in: without them a refused request simply stops. In <code v-pre>{{FABLE_ID}}</code> code, include <code v-pre>Fallbacks: []anthropic.BetaFallbackParam{{Model: "{{PREV_OPUS_ID}}"}}</code> plus the `anthropic.AnthropicBetaServerSideFallback2026_06_01` beta on `client.Beta.Messages.New` by default - a policy decline is re-served by the fallback model inside the same call. Not available on Amazon Bedrock, Vertex AI, or Microsoft Foundry - register the client-side middleware there: `option.WithMiddleware(betafallback.BetaRefusalFallbackMiddleware(...))` from `lib/betafallback`, with per-conversation state via `betafallback.WithBetaFallbackState(&betafallback.BetaFallbackState\{\})`. Full semantics (billing, sticky routing, streaming) and a runnable example: `shared/model-migration.md` -> Migrating to &#123;&#123;FABLE_NAME&#125;&#125; -> `refusal` stop reason, and the Go SDK repo's `examples/` (WebFetch via `shared/live-sources.md`).

---

## PDF / Document Input

`NewDocumentBlock` generic helper accepts any source type. `MediaType`/`Type` are auto-set.

```go
b64 := base64.StdEncoding.EncodeToString(pdfBytes)

msg := anthropic.NewUserMessage(
    anthropic.NewDocumentBlock(anthropic.Base64PDFSourceParam{Data: b64}),
    anthropic.NewTextBlock("Summarize this document"),
)
```

Other sources: `URLPDFSourceParam\{URL: "https://..."\}`, `PlainTextSourceParam\{Data: "..."\}`.

---

## Context Editing / Compaction (Beta)

Use `Beta.Messages.New` with `ContextManagement` on `BetaMessageNewParams`. There is no `NewBetaAssistantMessage` - use `.ToParam()` for the round-trip.

```go
params := anthropic.BetaMessageNewParams{
    Model:     "{{OPUS_ID}}",
    MaxTokens: 16000,
    Betas:     []anthropic.AnthropicBeta{"compact-2026-01-12"},
    ContextManagement: anthropic.BetaContextManagementConfigParam{
        Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
            {OfCompact20260112: &anthropic.BetaCompact20260112EditParam{}},
        },
    },
    Messages: []anthropic.BetaMessageParam{ /* ... */ },
}

resp, err := client.Beta.Messages.New(ctx, params)
if err != nil {
    log.Fatal(err)
}

// Round-trip: append response to history via .ToParam()
params.Messages = append(params.Messages, resp.ToParam())

// Read compaction blocks from the response
for _, block := range resp.Content {
    if c, ok := block.AsAny().(anthropic.BetaCompactionBlock); ok {
        fmt.Println("compaction summary:", c.Content)
    }
}
```

Other edit types: `BetaClearToolUses20250919EditParam`, `BetaClearThinking20251015EditParam` - these need `Betas: []anthropic.AnthropicBeta\{"context-management-2025-06-27"\}`, not `compact-2026-01-12`.
