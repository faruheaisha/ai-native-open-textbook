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
sourceRel: "docs/en/api/beta/messages/batches.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/messages/batches.md"
sourceSha256: "f8c5141712b7488424ab9999f688685bb3640d87a0547cd59a1cf5d86afa882a"
pageSha256: "26cf4e889cc768806ea52a6558fca6f69c88d0eed711379b9cf3ff885ab6a90b"
contentMode: "local-full"
zh: ""
---

### Beta Message Batch Errored Result

- `BetaMessageBatchErroredResult object`

  - `type: "errored"`

    default: errored

  - `error: BetaErrorResponse`

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
