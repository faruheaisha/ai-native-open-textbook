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
sourceRel: "docs/en/api/beta.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta.md"
sourceSha256: "900c0db6b0db3e91072554e88a119f3e5f95c420b9ca3216dcf298fa3f8e0f5b"
pageSha256: "10f50934084bc82a04ecd639cd9c3fe1babe1eae61189805bfaba8fe1b07a6b9"
contentMode: "local-full"
zh: ""
---

## Domain types

### Anthropic Beta

- `AnthropicBeta = string or "message-batches-2024-09-24" or "prompt-caching-2024-07-31" or "computer-use-2024-10-22" or 42 more`

  - `string`

  - `"message-batches-2024-09-24" or "prompt-caching-2024-07-31" or "computer-use-2024-10-22" or 42 more`

    - `"message-batches-2024-09-24"`

    - `"prompt-caching-2024-07-31"`

    - `"computer-use-2024-10-22"`

    - `"computer-use-2025-01-24"`

    - `"pdfs-2024-09-25"`

    - `"token-counting-2024-11-01"`

    - `"token-efficient-tools-2025-02-19"`

    - `"output-128k-2025-02-19"`

    - `"files-api-2025-04-14"`

    - `"mcp-client-2025-04-04"`

    - `"mcp-client-2025-11-20"`

    - `"dev-full-thinking-2025-05-14"`

    - `"interleaved-thinking-2025-05-14"`

    - `"code-execution-2025-05-22"`

    - `"extended-cache-ttl-2025-04-11"`

    - `"context-1m-2025-08-07"`

    - `"context-management-2025-06-27"`

    - `"model-context-window-exceeded-2025-08-26"`

    - `"skills-2025-10-02"`

    - `"fast-mode-2026-02-01"`

    - `"output-300k-2026-03-24"`

    - `"user-profiles-2026-03-24"`

    - `"user-profiles-2026-08-18"`

    - `"user-profiles-2026-09-04"`

    - `"advisor-tool-2026-03-01"`

    - `"managed-agents-2026-04-01"`

    - `"cache-diagnosis-2026-04-07"`

    - `"dreaming-2026-04-21"`

    - `"thinking-token-count-2026-05-13"`

    - `"server-side-fallback-2026-06-01"`

    - `"server-side-fallback-2026-07-01"`

    - `"fallback-credit-2026-06-01"`

    - `"fallback-credit-2026-07-01"`

    - `"agent-memory-2026-07-22"`

    - `"mid-conversation-tool-changes-2026-07-01"`

    - `"compact-2026-01-12"`

    - `"computer-use-2025-11-24"`

    - `"mcp-tunnels-2026-06-22"`

    - `"structured-outputs-2025-11-13"`

    - `"task-budgets-2026-03-13"`

    - `"thinking-display-updates-2026-08-18"`

    - `"ce-user-management-2026-07-13"`

    - `"mid-conversation-output-config-2026-07-01"`

    - `"thinking-binding-controls-2026-08-01"`

    - `"mid-conversation-system-clear-at-2026-08-21"`

### Beta API Error

- `BetaAPIError object`

  - `type: "api_error"`

    default: api_error

  - `message: string`

    default: Internal server error

### Beta Authentication Error

- `BetaAuthenticationError object`

  - `type: "authentication_error"`

    default: authentication_error

  - `message: string`

    default: Authentication error

### Beta Billing Error

- `BetaBillingError object`

  - `type: "billing_error"`

    default: billing_error

  - `message: string`

    default: Billing error

### Beta Currency

- `BetaCurrency = "USD"`

### Beta Error

- `BetaError = BetaInvalidRequestError or BetaAuthenticationError or BetaBillingError or 6 more`

  - `BetaInvalidRequestError object`

    - `type: "invalid_request_error"`

      default: invalid_request_error

    - `message: string`

      default: Invalid request

  - `BetaAuthenticationError object`

    - `type: "authentication_error"`

      default: authentication_error

    - `message: string`

      default: Authentication error

  - `BetaBillingError object`

    - `type: "billing_error"`

      default: billing_error

    - `message: string`

      default: Billing error

  - `BetaPermissionError object`

    - `type: "permission_error"`

      default: permission_error

    - `message: string`

      default: Permission denied

  - `BetaNotFoundError object`

    - `type: "not_found_error"`

      default: not_found_error

    - `message: string`

      default: Not found

  - `BetaRateLimitError object`

    - `type: "rate_limit_error"`

      default: rate_limit_error

    - `message: string`

      default: Rate limited

  - `BetaGatewayTimeoutError object`

    - `type: "timeout_error"`

      default: timeout_error

    - `message: string`

      default: Request timeout

  - `BetaAPIError object`

    - `type: "api_error"`

      default: api_error

    - `message: string`

      default: Internal server error

  - `BetaOverloadedError object`

    - `type: "overloaded_error"`

      default: overloaded_error

    - `message: string`

      default: Overloaded

### Beta Error Response

- `BetaErrorResponse object`

  - `type: "error"`

    default: error

  - `error: BetaError`

    - `BetaInvalidRequestError object`

      - `type: "invalid_request_error"`

        default: invalid_request_error

      - `message: string`

        default: Invalid request

    - `BetaAuthenticationError object`

      - `type: "authentication_error"`

        default: authentication_error

      - `message: string`

        default: Authentication error

    - `BetaBillingError object`

      - `type: "billing_error"`

        default: billing_error

      - `message: string`

        default: Billing error

    - `BetaPermissionError object`

      - `type: "permission_error"`

        default: permission_error

      - `message: string`

        default: Permission denied

    - `BetaNotFoundError object`

      - `type: "not_found_error"`

        default: not_found_error

      - `message: string`

        default: Not found

    - `BetaRateLimitError object`

      - `type: "rate_limit_error"`

        default: rate_limit_error

      - `message: string`

        default: Rate limited

    - `BetaGatewayTimeoutError object`

      - `type: "timeout_error"`

        default: timeout_error

      - `message: string`

        default: Request timeout

    - `BetaAPIError object`

      - `type: "api_error"`

        default: api_error

      - `message: string`

        default: Internal server error

    - `BetaOverloadedError object`

      - `type: "overloaded_error"`

        default: overloaded_error

      - `message: string`

        default: Overloaded

  - `request_id: string or null`

### Beta Gateway Timeout Error

- `BetaGatewayTimeoutError object`

  - `type: "timeout_error"`

    default: timeout_error

  - `message: string`

    default: Request timeout

### Beta Invalid Request Error

- `BetaInvalidRequestError object`

  - `type: "invalid_request_error"`

    default: invalid_request_error

  - `message: string`

    default: Invalid request

### Beta Monetary Amount

- `BetaMonetaryAmount object`

  A monetary amount in a specific currency.

  - `amount: string`

    Amount in minor units of the currency, as an integer decimal string with no leading zeros: "2500" is $25.00 and "50" is fifty cents. A string rather than a number so no float rounding is ever applied.

  - `currency: BetaCurrency`

    Uppercase ISO-4217 currency code. `USD` is the only currency currently supported; the accepted set is closed and grows only when a new currency is priced.

### Beta Not Found Error

- `BetaNotFoundError object`

  - `type: "not_found_error"`

    default: not_found_error

  - `message: string`

    default: Not found

### Beta Overloaded Error

- `BetaOverloadedError object`

  - `type: "overloaded_error"`

    default: overloaded_error

  - `message: string`

    default: Overloaded

### Beta Permission Error

- `BetaPermissionError object`

  - `type: "permission_error"`

    default: permission_error

  - `message: string`

    default: Permission denied

### Beta Rate Limit Error

- `BetaRateLimitError object`

  - `type: "rate_limit_error"`

    default: rate_limit_error

  - `message: string`

    default: Rate limited
