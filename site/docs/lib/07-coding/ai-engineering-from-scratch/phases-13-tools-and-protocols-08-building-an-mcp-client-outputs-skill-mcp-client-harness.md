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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/08-building-an-mcp-client/outputs/skill-mcp-client-harness.md"
sourceRel: "phases/13-tools-and-protocols/08-building-an-mcp-client/outputs/skill-mcp-client-harness.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/08-building-an-mcp-client/outputs/skill-mcp-client-harness.md"
sourceSha256: "cc91c1bc5540577b7a27f34588aaeec0e3931c73dc88aad6ae78bf81076567c7"
pageSha256: "cc91c1bc5540577b7a27f34588aaeec0e3931c73dc88aad6ae78bf81076567c7"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a list of MCP server transports, produce a client harness that prefers MCP `2026-07-28` and isolates legacy compatibility.

Produce:

1. Peer configuration. Map a stable server name to a pinned command or endpoint, arguments, environment allowlist, authorization context, transport kind, and an explicit `allow_legacy` flag that defaults to false.
2. Modern request builder. Stamp protocol version, current client capabilities, and recommended client identity into every `params._meta` immediately before serialization.
3. stdio era probe. Send `server/discover` first. Accept a valid DiscoverResult, retry `-32022` at a mutually supported modern version, and treat `-32020` plus `-32021` as correctable modern errors.
4. Legacy compatibility probe. Treat an unrecognized error, timeout, connection close, or empty response as ambiguous. Send one deadline-bound `initialize` only when that exact peer has `allow_legacy: true`. Select legacy only after a correlated JSON-RPC success containing a configured legacy revision, object capabilities, and non-empty server identity. Otherwise fail closed.
5. Tool cache. Honor `ttlMs` and `cacheScope` in the negotiated authorization context. Treat absent legacy `resultType` as `"complete"`.
6. Namespace merge. Sort peers and tools. Prefix or reject collisions. Forbid silent overwrite.
7. Router. Map canonical tool names to peer plus local name, create a new request id, send the era-correct request, and verify the response id.
8. Recovery. On transport loss, fail in-flight work, restart or reconnect, repeat discovery and lists, re-open subscriptions, and retry only operations allowed by the safety policy.

Hard rejects:

- Sending modern requests without current `_meta`.
- Falling back to initialization after a recognized modern error.
- Sending `initialize` to a peer that is not explicitly allowlisted for legacy compatibility.
- Treating a timeout, connection close, empty response, unrecognized error, malformed result, or unsupported revision as proof of legacy behavior.
- Treating a process, connection, or `Mcp-Session-Id` as modern protocol state.
- Sharing a private cached list across authorization contexts.
- Silently overwriting a duplicate tool name.
- Accepting a modern success without `resultType`.

Refusal rules:

- Refuse to spawn a command outside a pinned allowlist.
- Refuse to route a tool when the owner is ambiguous.
- Refuse to retry a non-idempotent call automatically without an application idempotency key or user decision.

Output a complete Python harness, at least six conformance tests, and a startup report listing peer, selected era, selected version, cache scope, and canonical tool names.
