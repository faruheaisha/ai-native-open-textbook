---
title: "openai-codex-docs-official"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/app-server.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/app-server.md"
sourceSha256: "a72a5c88ab05ab9737ec28b432708f2776f696be48eae09ee39c02dd2f9480e0"
pageSha256: "1e7de5ac635235972cdc5be9d5bf6965d5b86640924afd913a0f092e60361f02"
contentMode: "local-full"
zh: ""
---

## Auth endpoints

The JSON-RPC auth/account surface exposes request/response methods plus server-initiated notifications (no `id`). Use these to determine auth state, start or cancel logins, logout, inspect ChatGPT rate limits, and notify workspace owners about depleted credits or usage limits.

### Authentication modes

Codex supports these authentication modes. `account/updated.authMode` shows the active mode and includes the current ChatGPT `planType` when available. `account/read` also reports account and plan details.

- **API key (`apikey`)** - the caller supplies an OpenAI API key with `type: "apiKey"`, and Codex stores it for API requests.
- **ChatGPT managed (`chatgpt`)** - Codex owns the ChatGPT OAuth flow, persists tokens, and refreshes them automatically. Start with `type: "chatgpt"` for the browser flow or `type: "chatgptDeviceCode"` for the device-code flow.
- **ChatGPT external tokens (`chatgptAuthTokens`)** - experimental and intended for host apps that already own the user's ChatGPT auth lifecycle. The host app supplies an `accessToken`, `chatgptAccountId`, and optional `chatgptPlanType` directly, and must refresh the token when asked.
- **Amazon Bedrock** - `account/read` reports Bedrock accounts as `type: "amazonBedrock"` and indicates whether credentials come from a Codex-managed Bedrock API key (`credentialSource: "codexManaged"`) or the external AWS credential chain (`credentialSource: "awsManaged"`). `account/updated.authMode` uses `bedrockApiKey` for Codex-managed Bedrock API keys.

### API overview

- `account/read` - fetch current account info; optionally refresh tokens.
- `account/login/start` - begin login (`apiKey`, `chatgpt`, `chatgptDeviceCode`, or experimental `chatgptAuthTokens`).
- `account/login/completed` (notify) - emitted when a login attempt finishes (success or error).
- `account/login/cancel` - cancel a pending managed ChatGPT login by `loginId`.
- `account/logout` - sign out; triggers `account/updated`.
- `account/updated` (notify) - emitted whenever auth mode changes (`authMode`: `apikey`, `chatgpt`, `chatgptAuthTokens`, `agentIdentity`, `personalAccessToken`, `bedrockApiKey`, or `null`) and includes `planType` when available.
- `account/chatgptAuthTokens/refresh` (server request) - request fresh externally managed ChatGPT tokens after an authorization error.
- `account/rateLimits/read` - fetch ChatGPT rate limits.
- `account/rateLimits/updated` (notify) - emitted whenever a user's ChatGPT rate limits change.
- `account/sendAddCreditsNudgeEmail` - ask ChatGPT to email a workspace owner about depleted credits or a reached usage limit.
- `account/rateLimitResetCredit/consume` - consume one earned rate-limit reset using a caller-provided `idempotencyKey` value.
- `account/usage/read` - fetch ChatGPT account token-activity summaries and daily buckets.
- `account/workspaceMessages/read` - fetch active workspace messages, including notification headlines when available.
- `mcpServer/oauthLogin/completed` (notify) - emitted after a `mcpServer/oauth/login` flow finishes; payload includes `\{ name, threadId, success, error? \}`. `threadId` can be `null` for app-scoped or plugin OAuth flows.
- `mcpServer/startupStatus/updated` (notify) - emitted when a configured MCP server's startup status changes; payload includes `\{ threadId, name, status, error, failureReason \}`. `threadId` is `null` for app-scoped startup. On failed startup, `failureReason: "reauthenticationRequired"` means stored OAuth credentials expired and couldn't be refreshed, so the client should offer to reconnect the server.

### 1) Check auth state

Request:

```json
{ "method": "account/read", "id": 1, "params": { "refreshToken": false } }
```

Response examples:

```json
{ "id": 1, "result": { "account": null, "requiresOpenaiAuth": false } }
```

```json
{ "id": 1, "result": { "account": null, "requiresOpenaiAuth": true } }
```

```json
{
  "id": 1,
  "result": { "account": { "type": "apiKey" }, "requiresOpenaiAuth": true }
}
```

```json
{
  "id": 1,
  "result": {
    "account": {
      "type": "amazonBedrock",
      "credentialSource": "codexManaged"
    },
    "requiresOpenaiAuth": false
  }
}
```

```json
{
  "id": 1,
  "result": {
    "account": {
      "type": "amazonBedrock",
      "credentialSource": "awsManaged"
    },
    "requiresOpenaiAuth": false
  }
}
```

```json
{
  "id": 1,
  "result": {
    "account": {
      "type": "chatgpt",
      "email": "user@example.com",
      "planType": "pro"
    },
    "requiresOpenaiAuth": true
  }
}
```

Field notes:

- `refreshToken` (boolean): set `true` to force a token refresh in managed ChatGPT mode. In external token mode (`chatgptAuthTokens`), app-server ignores this flag.
- `email` is `null` when the ChatGPT account doesn't have an email address.
- `requiresOpenaiAuth` reflects the active provider; when `false`, Codex can run without OpenAI credentials.
- Amazon Bedrock reports `credentialSource: "codexManaged"` when it uses a
  Bedrock API key managed by Codex. It reports `credentialSource: "awsManaged"`
  for the external AWS credential path. This identifies the selected credential
  source; it doesn't validate that the AWS credential chain can resolve
  credentials.

### 2) Log in with an API key

1. Send:

```json
   {
     "method": "account/login/start",
     "id": 2,
     "params": { "type": "apiKey", "apiKey": "sk-..." }
   }
```

2. Expect:

```json
   { "id": 2, "result": { "type": "apiKey" } }
```

3. Notifications:

```json
   {
     "method": "account/login/completed",
     "params": { "loginId": null, "success": true, "error": null }
   }
```

```json
   {
     "method": "account/updated",
     "params": { "authMode": "apikey", "planType": null }
   }
```

### 3) Log in with ChatGPT (browser flow)

1. Start:

```json
   {
     "method": "account/login/start",
     "id": 3,
     "params": {
       "type": "chatgpt",
       "useHostedLoginSuccessPage": true,
       "appBrand": "chatgpt"
     }
   }
```

   By default, a successful browser callback redirects to a local success page.
   Set `useHostedLoginSuccessPage: true` to use the hosted success page when
   organization setup isn't required. With hosted success enabled, `appBrand`
   can be `"codex"` or `"chatgpt"`; omitted or `null` values default to
   `"codex"`.

```json
   {
     "id": 3,
     "result": {
       "type": "chatgpt",
       "loginId": "<uuid>",
       "authUrl": "https://chatgpt.com/...&redirect_uri=http%3A%2F%2Flocalhost%3A<port>%2Fauth%2Fcallback"
     }
   }
```

2. Open `authUrl` in a browser; the app-server hosts the local callback.
3. Wait for notifications:

```json
   {
     "method": "account/login/completed",
     "params": { "loginId": "<uuid>", "success": true, "error": null }
   }
```

```json
   {
     "method": "account/updated",
     "params": { "authMode": "chatgpt", "planType": "plus" }
   }
```

### 3b) Log in with ChatGPT (device-code flow)

Use this flow when your client owns the sign-in ceremony or when a browser callback is brittle.

1. Start:

```json
   {
     "method": "account/login/start",
     "id": 4,
     "params": { "type": "chatgptDeviceCode" }
   }
```

```json
   {
     "id": 4,
     "result": {
       "type": "chatgptDeviceCode",
       "loginId": "<uuid>",
       "verificationUrl": "https://auth.openai.com/codex/device",
       "userCode": "ABCD-1234"
     }
   }
```

2. Show `verificationUrl` and `userCode` to the user; the frontend owns the UX.
3. Wait for notifications:

```json
   {
     "method": "account/login/completed",
     "params": { "loginId": "<uuid>", "success": true, "error": null }
   }
```

```json
   {
     "method": "account/updated",
     "params": { "authMode": "chatgpt", "planType": "plus" }
   }
```

### 3c) Log in with externally managed ChatGPT tokens (`chatgptAuthTokens`)

Use this experimental mode only when a host application owns the user's ChatGPT auth lifecycle and supplies tokens directly. Clients must set `capabilities.experimentalApi = true` during `initialize` before using this login type.

1. Send:

```json
   {
     "method": "account/login/start",
     "id": 7,
     "params": {
       "type": "chatgptAuthTokens",
       "accessToken": "<jwt>",
       "chatgptAccountId": "org-123",
       "chatgptPlanType": "business"
     }
   }
```

2. Expect:

```json
   { "id": 7, "result": { "type": "chatgptAuthTokens" } }
```

3. Notifications:

```json
   {
     "method": "account/login/completed",
     "params": { "loginId": null, "success": true, "error": null }
   }
```

```json
   {
     "method": "account/updated",
     "params": { "authMode": "chatgptAuthTokens", "planType": "business" }
   }
```

When the server receives a `401 Unauthorized`, it may request refreshed tokens from the host app:

```json
{
  "method": "account/chatgptAuthTokens/refresh",
  "id": 8,
  "params": { "reason": "unauthorized", "previousAccountId": "org-123" }
}
{ "id": 8, "result": { "accessToken": "<jwt>", "chatgptAccountId": "org-123", "chatgptPlanType": "business" } }
```

The server retries the original request after a successful refresh response. Requests time out after about 10 seconds.

### 4) Cancel a ChatGPT login

```json
{ "method": "account/login/cancel", "id": 4, "params": { "loginId": "<uuid>" } }
{ "method": "account/login/completed", "params": { "loginId": "<uuid>", "success": false, "error": "..." } }
```

### 5) Logout

```json
{ "method": "account/logout", "id": 5 }
{ "id": 5, "result": {} }
{ "method": "account/updated", "params": { "authMode": null, "planType": null } }
```

### 6) Rate limits (ChatGPT)

```json
{ "method": "account/rateLimits/read", "id": 6 }
{ "id": 6, "result": {
  "rateLimits": {
    "limitId": "codex",
    "limitName": null,
    "primary": { "usedPercent": 25, "windowDurationMins": 15, "resetsAt": 1730947200 },
    "secondary": null,
    "rateLimitReachedType": null
  },
  "rateLimitsByLimitId": {
    "codex": {
      "limitId": "codex",
      "limitName": null,
      "primary": { "usedPercent": 25, "windowDurationMins": 15, "resetsAt": 1730947200 },
      "secondary": null,
      "rateLimitReachedType": null
    },
    "codex_other": {
      "limitId": "codex_other",
      "limitName": "codex_other",
      "primary": { "usedPercent": 42, "windowDurationMins": 60, "resetsAt": 1730950800 },
      "secondary": null,
      "rateLimitReachedType": null
    }
  },
  "rateLimitResetCredits": {
    "availableCount": 2,
    "credits": [{
      "id": "RateLimitResetCredit_1",
      "resetType": "codexRateLimits",
      "status": "available",
      "grantedAt": 1781654400,
      "expiresAt": 1784246400,
      "title": "Rate-limit reset",
      "description": "Reset an eligible Codex rate-limit window."
    }]
  }
} }
{ "method": "account/rateLimits/updated", "params": {
  "rateLimits": {
    "limitId": "codex",
    "primary": { "usedPercent": 31, "windowDurationMins": 15, "resetsAt": 1730948100 }
  }
} }
```

Field notes:

- `rateLimits` is the backward-compatible single-bucket view.
- `rateLimitsByLimitId` (when present) is the multi-bucket view keyed by metered `limit_id` (for example `codex`).
- `limitId` is the metered bucket identifier.
- `limitName` is an optional user-facing label for the bucket.
- `usedPercent` is current usage within the quota window.
- `windowDurationMins` is the quota window length.
- `resetsAt` is a Unix timestamp (seconds) for the next reset.
- `planType` is included when the server returns the ChatGPT plan associated with a bucket.
- `credits` is included when the server returns remaining workspace credit details.
- `rateLimitReachedType` identifies the server-classified limit state when one has been reached.
- `rateLimitResetCredits` contains the available earned-reset count when the service provides it; otherwise it's `null`.
- `rateLimitResetCredits.credits` is `null` when only the count is known. An empty array means the service fetched details and returned no available credits. The service can cap the detail rows, so `availableCount` is authoritative.
- Each detail row includes an opaque `id`, `resetType`, `status`, `grantedAt`, `expiresAt` (which can be `null`), `title` (which can be `null`), and `description` (which can be `null`).
- Fetch `account/rateLimits/read` after consuming a reset.

### 7) Token usage (ChatGPT)

Use `account/usage/read` to fetch ChatGPT token-activity summary fields and
optional daily buckets.

```json
{ "method": "account/usage/read", "id": 7 }
{ "id": 7, "result": {
  "summary": {
    "lifetimeTokens": 1234567,
    "peakDailyTokens": 45678,
    "longestRunningTurnSec": 540,
    "currentStreakDays": 8,
    "longestStreakDays": 14
  },
  "dailyUsageBuckets": [
    { "startDate": "2026-06-18", "tokens": 12345 }
  ]
} }
```

Field notes:

- `summary` values may be `null` when the service hasn't returned that metric.
- `dailyUsageBuckets` may be `null`; when present, each bucket includes `startDate` and `tokens`.
- The endpoint requires authentication backed by Codex services. ChatGPT,
  external ChatGPT tokens, agent identity, and personal access token auth work;
  API-key-only and Bedrock auth don't.

### 8) Earned rate-limit resets (ChatGPT)

Use `account/rateLimitResetCredit/consume` to consume one earned reset.

```json
{ "method": "account/rateLimitResetCredit/consume", "id": 8, "params": { "idempotencyKey": "8ae96ff3-3425-4f4c-8772-b6fd61502868", "creditId": "RateLimitResetCredit_1" } }
{ "id": 8, "result": { "outcome": "reset" } }
```

Field notes:

- `idempotencyKey` must be non-empty. Use a UUID for each logical redemption attempt and reuse the same value when retrying that attempt.
- `creditId` is optional. When provided, it must be a non-empty opaque ID from `account/rateLimits/read`. When omitted, the service selects the next available credit.
- `reset` means a credit was consumed.
- `alreadyRedeemed` means the same redemption completed previously. Treat it as an idempotent success and refresh account limits.
- `nothingToReset` means there is no eligible rate-limit window to reset.
- `noCredit` means the account has no earned reset credits available.
- Fetch `account/rateLimits/read` after consuming a reset instead of inferring updated windows from this response.

### 9) Notify a workspace owner about a limit

Use `account/sendAddCreditsNudgeEmail` to ask ChatGPT to email a workspace owner when credits are depleted or a usage limit has been reached.

```json
{ "method": "account/sendAddCreditsNudgeEmail", "id": 9, "params": { "creditType": "credits" } }
{ "id": 9, "result": { "status": "sent" } }
```

Use `creditType: "credits"` when workspace credits are depleted, or `creditType: "usage_limit"` when the workspace usage limit has been reached. If the owner was already notified recently, the response status is `cooldown_active`.

### 10) Workspace messages (ChatGPT)

Use `account/workspaceMessages/read` to fetch active messages for the current
workspace, including notification headlines when available.

```json
{ "method": "account/workspaceMessages/read", "id": 10 }
{ "id": 10, "result": { "featureEnabled": true, "messages": [
  { "messageId": "msg_123", "messageType": "headline", "messageBody": "Workspace maintenance starts at 5pm.", "createdAt": 1781395200, "archivedAt": null }
] } }
```
