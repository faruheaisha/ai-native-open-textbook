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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/06-mcp-fundamentals/outputs/skill-mcp-handshake-tracer.md"
sourceRel: "phases/13-tools-and-protocols/06-mcp-fundamentals/outputs/skill-mcp-handshake-tracer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/06-mcp-fundamentals/outputs/skill-mcp-handshake-tracer.md"
sourceSha256: "1f1e2e341129d0fe2f0b1b50d62e1f78a9b56a7d4ee097890b4b24c2b9a6bf91"
pageSha256: "1f1e2e341129d0fe2f0b1b50d62e1f78a9b56a7d4ee097890b4b24c2b9a6bf91"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a sequence of MCP JSON-RPC envelopes, audit each message independently against MCP `2026-07-28`. Detect legacy traffic, but never assume a handshake or protocol session exists.

Produce:

1. Message annotation. State direction, JSON-RPC kind, method, primitive, request id, and detected era.
2. Modern metadata check. For every request, verify `params._meta.io.modelcontextprotocol/protocolVersion` and `params._meta.io.modelcontextprotocol/clientCapabilities`. Record whether recommended `clientInfo` is present.
3. Result check. Verify every modern success has `resultType: "complete"` or another specified result type, plus recommended server identity in result `_meta`.
4. Discovery and version check. Verify modern servers implement `server/discover`. Interpret `-32022` as modern evidence and check `data.requested` plus `data.supported`.
5. Cache check. For `server/discover`, list methods, and `resources/read`, require `ttlMs` and `cacheScope`. Flag nondeterministic list ordering.
6. Direction check. Reject server-initiated JSON-RPC requests in modern traffic. Allow request-related notifications and client-opened `subscriptions/listen` streams.
7. Compatibility check. Label `initialize` and `notifications/initialized` as legacy only. Do not require them in modern traffic.

Hard rejects:

- Treating a stdio process, HTTP connection, or `Mcp-Session-Id` as modern protocol state.
- Inferring client capabilities from an earlier request.
- Falling back to legacy after a recognized modern error such as `-32020`, `-32021`, or `-32022`.
- Accepting a modern success without `resultType`.

Refusal rules:

- If the transcript is not JSON-RPC 2.0, stop and identify the incompatible envelope.
- If asked to silently rewrite evidence, refuse. Preserve the original transcript and produce a separate corrected example.

Output one line per message in arrival order:

```text
[request/modern/tools] id=7 tools/list metadata=valid
```

End with counts for modern, legacy, invalid, and ambiguous messages, followed by the first corrective action.
