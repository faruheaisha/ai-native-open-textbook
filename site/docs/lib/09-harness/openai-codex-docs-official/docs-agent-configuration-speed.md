---
title: "Speed"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/agent-configuration/speed.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/agent-configuration/speed.md"
sourceSha256: "a5bb428b3ad9b5e7981e6c7f71fd452df159ae41eb2243ff644a80b0a4ad152c"
pageSha256: "a5bb428b3ad9b5e7981e6c7f71fd452df159ae41eb2243ff644a80b0a4ad152c"
contentMode: "local-full"
zh: ""
---

# Speed

> For the complete documentation index, see [llms.txt](https://learn.chatgpt.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

**ChatGPT Work and Codex share usage.** Both use the same
  pricing, credits, and usage limits. See [Codex pricing](https://learn.chatgpt.com/docs/pricing) for
  details.

## Fast mode

Codex offers the ability to increase the speed of the model for increased
credit consumption.

For GPT-5.6, GPT-5.5, and GPT-5.4, Fast mode increases model speed by 1.5x.
GPT-5.6 and GPT-5.5 consume credits at 2.5x the Standard rate; GPT-5.4 consumes
credits at 2x the Standard rate.

GPT-6 Astra Fast mode consumes credits at 2.5x the Standard rate where
available. See [Models](https://learn.chatgpt.com/docs/models) for model availability and
[Pricing](https://learn.chatgpt.com/docs/pricing#token-rates) for token rates.

Use `/fast on`, `/fast off`, or `/fast status` in the CLI to change or inspect
the current setting. You can also persist the default with `service_tier =
"fast"` plus `[features].fast_mode = true` in `config.toml`. Fast mode is
available in the ChatGPT desktop app, Codex CLI, and IDE extension when you
sign in with ChatGPT. Fast mode is a ChatGPT credit feature. With an API key,
Codex uses API token pricing instead, and ChatGPT credit multipliers don't
apply. API Priority processing has its own billing rate; for GPT-5.6, it costs
2x the Standard API token rate.

&lt;VideoPlayer
 
  class="[&_video]:mx-auto [&_video]:max-h-[400px] [&_video]:max-w-full [&_video]:w-auto"
/>

## Codex-Spark

GPT-5.3-Codex-Spark is a separate fast, less-capable Codex model optimized for
near-instant, real-time coding iteration. Unlike fast mode, which speeds up a
supported model at a higher credit rate, Codex-Spark is its own model choice
and has its own usage limits.

During research preview Codex-Spark is only available for ChatGPT Pro subscribers.
