---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/agents.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/agents.md"
sourceSha256: "2701c99a56aa4313e4c59f6eb788100b1488b7b05d3135e992270e808de5849c"
pageSha256: "cdd7652f5948fae7e7a752b4cfa4d8b7b298c409603f0c2c71f2542b4cc07f19"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Model Config Params

- `BetaManagedAgentsModelConfigParams object`

  An object that defines additional configuration control over model use

  - `id: BetaManagedAgentsModel`

    The model that will power your agent.

    See [models](https://docs.anthropic.com/en/docs/models-overview) for additional details and options.

    - `"claude-fable-5-1" or "claude-sonnet-5" or "claude-fable-5" or 11 more`

      The model that will power your agent.

      See [models](https://docs.anthropic.com/en/docs/models-overview) for additional details and options.

      - `"claude-fable-5-1"`

        Frontier intelligence for ambitious tasks across coding, scientific discovery, and enterprise workflows

      - `"claude-sonnet-5"`

        High-performance model for coding and agents

      - `"claude-fable-5"`

        Next generation of intelligence for the hardest knowledge work and coding problems

      - `"claude-opus-5"`

        Powerful intelligence for long-running agents and coding

      - `"claude-opus-4-8"`

        Powerful intelligence for long-running agents and coding

      - `"claude-opus-4-7"`

        Powerful intelligence for long-running agents and coding

      - `"claude-opus-4-6"`

        Powerful intelligence for long-running agents and coding

      - `"claude-sonnet-4-6"`

        Best combination of speed and intelligence

      - `"claude-haiku-4-5"`

        Fastest model with near-frontier intelligence

      - `"claude-haiku-4-5-20251001"`

        Fastest model with near-frontier intelligence

      - `"claude-opus-4-5"`

        Powerful intelligence for long-running agents and coding

      - `"claude-opus-4-5-20251101"`

        Powerful intelligence for long-running agents and coding

      - `"claude-sonnet-4-5"`

        High-performance model for agents and coding

      - `"claude-sonnet-4-5-20250929"`

        High-performance model for agents and coding

    - `string`

  - `effort: optional "low" or "medium" or "high" or 2 more or BetaManagedAgentsEffortLow or BetaManagedAgentsEffortMedium or 3 more or null`

    How hard Claude works on each inference call. Accepts a bare level string (`"high"`) or `\{"type": "high"\}`. On create, omitting it resolves the per-model default; on update, omitting it leaves the stored value unchanged.

    - `BetaManagedAgentsEffortLevel = "low" or "medium" or "high" or 2 more`

      How hard Claude works on each turn. Higher levels favor reasoning depth over latency. Not all models accept every level; invalid combinations are rejected at create time.

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"xhigh"`

      - `"max"`

    - `BetaManagedAgentsEffortLow object`

      Low effort. Favors latency over reasoning depth.

      - `type: "low"`

    - `BetaManagedAgentsEffortMedium object`

      Medium effort. Balances latency and reasoning depth.

      - `type: "medium"`

    - `BetaManagedAgentsEffortHigh object`

      High effort. Favors reasoning depth.

      - `type: "high"`

    - `BetaManagedAgentsEffortXhigh object`

      Extra-high effort. Not all models accept this level.

      - `type: "xhigh"`

    - `BetaManagedAgentsEffortMax object`

      Maximum effort. Favors reasoning depth over latency.

      - `type: "max"`

  - `inference_geo: optional string or null`

    Geographic region for model inference. When unset, requests fall through to the workspace's default_inference_geo. On update, `model` is whole-object replacement — omitting inference_geo clears it.

  - `speed: optional "standard" or "fast" or null`

    Inference speed mode. `fast` provides significantly faster output token generation at premium pricing. Not all models support `fast`; invalid combinations are rejected at create time.

    - `"standard"`

    - `"fast"`
