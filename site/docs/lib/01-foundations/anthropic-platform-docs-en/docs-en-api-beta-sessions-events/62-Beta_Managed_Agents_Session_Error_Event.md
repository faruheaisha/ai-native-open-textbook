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
pageSha256: "6cd52f1e854f3960f69ff7bd8886d62faed89cafa5ec172a0cafa66dccbe8a41"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Session Error Event

- `BetaManagedAgentsSessionErrorEvent object`

  An error event indicating a problem occurred during session execution.

  - `type: "session.error"`

  - `id: string`

    Unique identifier for this event.

  - `error: BetaManagedAgentsUnknownError or BetaManagedAgentsModelOverloadedError or BetaManagedAgentsModelRateLimitedError or 5 more`

    An unknown or unexpected error occurred during session execution. A fallback variant; clients that don't recognize a new error code can match on `retry_status` and `message` alone.

    - `BetaManagedAgentsUnknownError object`

      An unknown or unexpected error occurred during session execution. A fallback variant; clients that don't recognize a new error code can match on `retry_status` and `message` alone.

      - `type: "unknown_error"`

      - `message: string`

        Human-readable error description.

      - `retry_status: BetaManagedAgentsRetryStatusRetrying or BetaManagedAgentsRetryStatusExhausted or BetaManagedAgentsRetryStatusTerminal`

        What the client should do next in response to this error.

        - `BetaManagedAgentsRetryStatusRetrying object`

          The server is retrying automatically. Client should wait; the same error type may fire again as retrying, then once as exhausted when the retry budget runs out.

          - `type: "retrying"`

        - `BetaManagedAgentsRetryStatusExhausted object`

          This turn is dead; queued inputs are flushed and the session returns to idle. Client may send a new prompt.

          - `type: "exhausted"`

        - `BetaManagedAgentsRetryStatusTerminal object`

          The session encountered a terminal error and will transition to `terminated` state.

          - `type: "terminal"`

    - `BetaManagedAgentsModelOverloadedError object`

      The model is currently overloaded. Emitted after automatic retries are exhausted.

      - `type: "model_overloaded_error"`

      - `message: string`

        Human-readable error description.

      - `retry_status: BetaManagedAgentsRetryStatusRetrying or BetaManagedAgentsRetryStatusExhausted or BetaManagedAgentsRetryStatusTerminal`

        What the client should do next in response to this error.

        - `BetaManagedAgentsRetryStatusRetrying object`

          The server is retrying automatically. Client should wait; the same error type may fire again as retrying, then once as exhausted when the retry budget runs out.

        - `BetaManagedAgentsRetryStatusExhausted object`

          This turn is dead; queued inputs are flushed and the session returns to idle. Client may send a new prompt.

        - `BetaManagedAgentsRetryStatusTerminal object`

          The session encountered a terminal error and will transition to `terminated` state.

    - `BetaManagedAgentsModelRateLimitedError object`

      The model request was rate-limited.

      - `type: "model_rate_limited_error"`

      - `message: string`

        Human-readable error description.

      - `retry_status: BetaManagedAgentsRetryStatusRetrying or BetaManagedAgentsRetryStatusExhausted or BetaManagedAgentsRetryStatusTerminal`

        What the client should do next in response to this error.

        - `BetaManagedAgentsRetryStatusRetrying object`

          The server is retrying automatically. Client should wait; the same error type may fire again as retrying, then once as exhausted when the retry budget runs out.

        - `BetaManagedAgentsRetryStatusExhausted object`

          This turn is dead; queued inputs are flushed and the session returns to idle. Client may send a new prompt.

        - `BetaManagedAgentsRetryStatusTerminal object`

          The session encountered a terminal error and will transition to `terminated` state.

    - `BetaManagedAgentsModelRequestFailedError object`

      A model request failed for a reason other than overload or rate-limiting.

      - `type: "model_request_failed_error"`

      - `message: string`

        Human-readable error description.

      - `retry_status: BetaManagedAgentsRetryStatusRetrying or BetaManagedAgentsRetryStatusExhausted or BetaManagedAgentsRetryStatusTerminal`

        What the client should do next in response to this error.

        - `BetaManagedAgentsRetryStatusRetrying object`

          The server is retrying automatically. Client should wait; the same error type may fire again as retrying, then once as exhausted when the retry budget runs out.

        - `BetaManagedAgentsRetryStatusExhausted object`

          This turn is dead; queued inputs are flushed and the session returns to idle. Client may send a new prompt.

        - `BetaManagedAgentsRetryStatusTerminal object`

          The session encountered a terminal error and will transition to `terminated` state.

    - `BetaManagedAgentsMCPConnectionFailedError object`

      Failed to connect to an MCP server.

      - `type: "mcp_connection_failed_error"`

      - `mcp_server_name: string`

        Name of the MCP server that failed to connect.

      - `message: string`

        Human-readable error description.

      - `retry_status: BetaManagedAgentsRetryStatusRetrying or BetaManagedAgentsRetryStatusExhausted or BetaManagedAgentsRetryStatusTerminal`

        What the client should do next in response to this error.

        - `BetaManagedAgentsRetryStatusRetrying object`

          The server is retrying automatically. Client should wait; the same error type may fire again as retrying, then once as exhausted when the retry budget runs out.

        - `BetaManagedAgentsRetryStatusExhausted object`

          This turn is dead; queued inputs are flushed and the session returns to idle. Client may send a new prompt.

        - `BetaManagedAgentsRetryStatusTerminal object`

          The session encountered a terminal error and will transition to `terminated` state.

    - `BetaManagedAgentsMCPAuthenticationFailedError object`

      Authentication to an MCP server failed.

      - `type: "mcp_authentication_failed_error"`

      - `mcp_server_name: string`

        Name of the MCP server that failed authentication.

      - `message: string`

        Human-readable error description.

      - `retry_status: BetaManagedAgentsRetryStatusRetrying or BetaManagedAgentsRetryStatusExhausted or BetaManagedAgentsRetryStatusTerminal`

        What the client should do next in response to this error.

        - `BetaManagedAgentsRetryStatusRetrying object`

          The server is retrying automatically. Client should wait; the same error type may fire again as retrying, then once as exhausted when the retry budget runs out.

        - `BetaManagedAgentsRetryStatusExhausted object`

          This turn is dead; queued inputs are flushed and the session returns to idle. Client may send a new prompt.

        - `BetaManagedAgentsRetryStatusTerminal object`

          The session encountered a terminal error and will transition to `terminated` state.

    - `BetaManagedAgentsBillingError object`

      The caller's organization or workspace cannot make model requests — out of credits or spend limit reached. Retrying with the same credentials will not succeed; the caller must resolve the billing state.

      - `type: "billing_error"`

      - `message: string`

        Human-readable error description.

      - `retry_status: BetaManagedAgentsRetryStatusRetrying or BetaManagedAgentsRetryStatusExhausted or BetaManagedAgentsRetryStatusTerminal`

        What the client should do next in response to this error.

        - `BetaManagedAgentsRetryStatusRetrying object`

          The server is retrying automatically. Client should wait; the same error type may fire again as retrying, then once as exhausted when the retry budget runs out.

        - `BetaManagedAgentsRetryStatusExhausted object`

          This turn is dead; queued inputs are flushed and the session returns to idle. Client may send a new prompt.

        - `BetaManagedAgentsRetryStatusTerminal object`

          The session encountered a terminal error and will transition to `terminated` state.

    - `BetaManagedAgentsCredentialHostUnreachableError object`

      An `environment_variable` credential's `auth.networking.allowed_hosts` includes a host the environment's network policy does not permit.

      - `type: "credential_host_unreachable_error"`

      - `credential_id: string`

        ID of the affected credential.

      - `message: string`

        Human-readable error description.

      - `retry_status: BetaManagedAgentsRetryStatusRetrying or BetaManagedAgentsRetryStatusExhausted or BetaManagedAgentsRetryStatusTerminal`

        What the client should do next in response to this error.

        - `BetaManagedAgentsRetryStatusRetrying object`

          The server is retrying automatically. Client should wait; the same error type may fire again as retrying, then once as exhausted when the retry budget runs out.

        - `BetaManagedAgentsRetryStatusExhausted object`

          This turn is dead; queued inputs are flushed and the session returns to idle. Client may send a new prompt.

        - `BetaManagedAgentsRetryStatusTerminal object`

          The session encountered a terminal error and will transition to `terminated` state.

      - `vault_id: string`

        ID of the vault containing the affected credential.

  - `processed_at: string`

    A timestamp in RFC 3339 format

    format: date-time
