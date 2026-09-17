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
sourceRel: "docs/en/api/beta/sessions/events.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions/events.md"
sourceSha256: "f0e0c20f4abb8b0c003df5a7b79ed32e56eaa3f30efeb7e3c91931c3e4e1cb51"
pageSha256: "32d5d34531d310d5ccfa0882fe3d71b564a6e64009d53249a24c4e43a24f217c"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Session Usage Snapshot

- `BetaManagedAgentsSessionUsageSnapshot object`

  Point-in-time snapshot of a session's cumulative usage.

  - `active_seconds: optional number`

    Cumulative time in seconds during which the session had at least one thread in running status. Overlapping activity from concurrent threads is counted once. This is the duration the session's runtime cost is priced on.

    format: double

  - `cache_creation: optional BetaManagedAgentsCacheCreationUsage`

    Prompt-cache creation token usage broken down by cache lifetime.

    - `ephemeral_1h_input_tokens: optional number`

      Tokens used to create 1-hour ephemeral cache entries.

      format: int32

    - `ephemeral_5m_input_tokens: optional number`

      Tokens used to create 5-minute ephemeral cache entries.

      format: int32

  - `cache_read_input_tokens: optional number`

    Total tokens read from prompt cache.

    format: int32

  - `input_tokens: optional number`

    Total input tokens consumed across all turns.

    format: int32

  - `list_cost: optional BetaMonetaryAmount`

    A monetary amount in a specific currency.

    - `amount: string`

      Amount in minor units of the currency, as an integer decimal string with no leading zeros: "2500" is $25.00 and "50" is fifty cents. A string rather than a number so no float rounding is ever applied.

    - `currency: BetaCurrency`

      Uppercase ISO-4217 currency code. `USD` is the only currency currently supported; the accepted set is closed and grows only when a new currency is priced.

  - `output_tokens: optional number`

    Total output tokens generated across all turns.

    format: int32

  - `server_tool_use: optional BetaManagedAgentsServerToolUsage`

    Cumulative count of server-executed tool invocations, broken down by tool.

    - `web_fetch_requests: optional number`

      Number of server-executed web fetch requests.

      format: int32

    - `web_search_requests: optional number`

      Number of server-executed web search requests.

      format: int32
