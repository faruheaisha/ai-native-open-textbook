---
title: "Adapters Conventions"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/use-cases/ai-coding-wisc-framework/.claude/rules-example/adapters.md"
sourceRel: "use-cases/ai-coding-wisc-framework/.claude/rules-example/adapters.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/use-cases/ai-coding-wisc-framework/.claude/rules-example/adapters.md"
sourceSha256: "95d5b81d58115265fb434b8e20f3f1982a26ad69900e37c58e9da7b791014595"
pageSha256: "95d5b81d58115265fb434b8e20f3f1982a26ad69900e37c58e9da7b791014595"
contentMode: "local-full"
zh: ""
---

# Adapters Conventions

## Key Patterns

- **Auth is inside adapters** — every adapter checks authorization before calling `onMessage()`. Silent rejection (no error response), log with masked user ID: `userId.slice(0, 4) + '***'`.
- **Whitelist parsing in constructor** — parse env var (`SLACK_ALLOWED_USER_IDS`, `TELEGRAM_ALLOWED_USER_IDS`, `GITHUB_ALLOWED_USERS`) using a co-located `parseAllowedUserIds()` / `parseAllowedUsers()` function. Empty list = open access.
- **Lazy logger pattern** — ALL adapter files use a module-level `cachedLog` + `getLog()` getter so test mocks intercept `createLogger` before the logger is instantiated. Never initialize logger at module scope.
- **`onMessage()` is fire-and-forget** — handlers call `void this.messageHandler(event)`. Errors are handled by the caller (orchestrator/lock manager), not the adapter.
- **Message splitting** — use shared `splitIntoParagraphChunks(message, maxLength)` from `../../utils/message-splitting`. Two-pass: paragraph breaks first, then line breaks. Limits: Slack 12000, Telegram 4096, GitHub 65000.
- **`ensureThread()` is often a no-op** — Slack returns the same ID (already encoded as `channel:ts`), Telegram has no threads, GitHub issues are inherently threaded.

## Conversation ID Formats

| Platform | Format | Example |
|----------|--------|---------|
| Slack | `channel:thread_ts` | `C123ABC:1234567890.123456` |
| Telegram | numeric chat ID as string | `"1234567890"` |
| GitHub | `owner/repo#number` | `"acme/api#42"` |
| Web | user-provided string | `"my-chat"` |
| Discord | channel ID string | `"987654321098765432"` |

## Architecture

- All chat adapters implement `IPlatformAdapter` from `@archon/core`
- GitHub adapter is webhook-based (no polling); Slack/Telegram/Discord use polling
- GitHub adapter holds its own `ConversationLockManager` (injected in constructor)
- Slack conversation ID encodes both channel and thread: `sendMessage()` splits on `:` to extract `thread_ts`
- GitHub adapter adds `` marker to prevent self-triggering loops
- GitHub only responds to `issue_comment.created` events — NOT `issues.opened` / `pull_request.opened` (descriptions contain documentation, not commands; see #96)

## Anti-patterns

- Never put auth logic outside the adapter (no auth middleware in server routes)
- Never throw from `onMessage` handlers; errors surface to the caller
- Never call `sendMessage()` with a raw token or credential string in the message
- Never use the generic `exec` — always use `execFileAsync` for subprocess calls
- Never add a new adapter method to `IPlatformAdapter` unless ALL adapters need it; use optional methods (`sendStructuredEvent?`) for platform-specific capabilities
