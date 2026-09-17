---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/09-mcp-transports/outputs/skill-mcp-transport-migrator.md"
sourceRel: "phases/13-tools-and-protocols/09-mcp-transports/outputs/skill-mcp-transport-migrator.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/09-mcp-transports/outputs/skill-mcp-transport-migrator.md"
sourceSha256: "da38eb049aaa296ccd1431c6be9e56ffe72ab628a1f33b1ec3282633839663ac"
pageSha256: "da38eb049aaa296ccd1431c6be9e56ffe72ab628a1f33b1ec3282633839663ac"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a session-based Streamable HTTP or HTTP+SSE server, produce a migration runbook for MCP `2026-07-28`.

Produce:

1. Endpoint map. Define one modern MCP endpoint that accepts POST. Each JSON-RPC request or notification receives a new POST.
2. Response map. Use `application/json` for one response or request-scoped `text/event-stream` for related notifications followed by the final response.
3. Removed behavior. Return `405` for modern GET and DELETE. Ignore `Mcp-Session-Id` and `Last-Event-ID`; never mint, echo, revoke, or resume them.
4. Request metadata. Require protocol version and client capabilities in every body `_meta`, with recommended client identity.
5. Header validation. Require `MCP-Protocol-Version`, `Mcp-Method`, and conditional `Mcp-Name`. Decode the Base64 sentinel and compare headers with the body. Return `-32020` on mismatch. Return `-32022` on an unsupported matching version with exact data keys `supported` and `requested`.
6. Subscription migration. Replace standalone GET, `resources/subscribe`, and `resources/unsubscribe` with POST `subscriptions/listen`. Tag the acknowledgement, every notification, and the final result with `io.modelcontextprotocol/subscriptionId` equal to the listen request id.
7. State migration. Replace connection affinity with explicit, opaque application handles bound to the authenticated principal.
8. Compatibility window. Keep older endpoints separate and clearly labeled. Modern POST errors must be inspected before any legacy fallback. Do not redirect POST with `301` or `302` because method and body preservation are unsafe.
9. Verification. Test Origin rejection, POST media negotiation, body metadata, mirrored headers, JSON response, accepted notification `202` with no body, scoped SSE subscription metadata, GET and DELETE `405`, ignored removed headers, and broken-stream retry with a new id.

Hard rejects:

- Presenting session ids, standalone GET, DELETE, or replay as modern behavior.
- Sharing per-request capabilities through process or connection memory.
- Sending server-initiated JSON-RPC requests.
- Resuming a modern SSE stream with `Last-Event-ID`.
- Falling back to legacy after a recognized modern error.
- Using a redirect to move a JSON-RPC POST during migration.

Refusal rules:

- Refuse public exposure without authentication, authorization, and exact Origin policy.
- Refuse hidden sticky routing as a replacement for explicit workflow state.
- Refuse automatic retry of a non-idempotent operation without an application idempotency control.

Output a before-and-after endpoint table, staged rollout, rollback boundary, and executable conformance checklist. End with the exact date when legacy routes will be removed.
