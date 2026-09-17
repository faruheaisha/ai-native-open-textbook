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
sourceRel: "docs/en/api/beta/sessions/threads.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions/threads.md"
sourceSha256: "7c49e8a644bf5fce181657fff779684ba2ebac0aff547f9d1b8b8c4d2042bd66"
pageSha256: "e6577f958bb41506e93b2292f3fe6f01196971da5e6be535069cf73a8f3dc16c"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Session Thread Usage

- `BetaManagedAgentsSessionThreadUsage object`

  Cumulative token usage for a session thread across all turns.

  - `active_seconds: optional number`

    Cumulative time in seconds this thread spent in running status. Equal to `stats.active_seconds`; surfaced here so a thread's usage carries every quantity its cost is priced on.

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

  - `list_cost: optional BetaMonetaryAmount or null`

    A monetary amount in a specific currency.

    - `amount: string`

      Amount in minor units of the currency, as an integer decimal string with no leading zeros: "2500" is $25.00 and "50" is fifty cents. A string rather than a number so no float rounding is ever applied.

    - `currency: BetaCurrency`

      Uppercase ISO-4217 currency code. `USD` is the only currency currently supported; the accepted set is closed and grows only when a new currency is priced.

  - `output_tokens: optional number`

    Total output tokens generated across all turns.

    format: int32

  - `server_tool_use: optional BetaManagedAgentsServerToolUsage or null`

    Cumulative count of server-executed tool invocations, broken down by tool.

    - `web_fetch_requests: optional number`

      Number of server-executed web fetch requests.

      format: int32

    - `web_search_requests: optional number`

      Number of server-executed web search requests.

      format: int32
