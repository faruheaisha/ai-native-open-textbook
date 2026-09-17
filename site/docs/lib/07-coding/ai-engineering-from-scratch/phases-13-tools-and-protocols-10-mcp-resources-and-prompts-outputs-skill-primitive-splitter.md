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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/10-mcp-resources-and-prompts/outputs/skill-primitive-splitter.md"
sourceRel: "phases/13-tools-and-protocols/10-mcp-resources-and-prompts/outputs/skill-primitive-splitter.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/10-mcp-resources-and-prompts/outputs/skill-primitive-splitter.md"
sourceSha256: "81a9b677f4d9193a47b20bef213460fc11f9e07918cce362d056c8399cdb70de"
pageSha256: "81a9b677f4d9193a47b20bef213460fc11f9e07918cce362d056c8399cdb70de"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Review a proposed MCP server from the consumer's point of view.

Produce:

1. A `server/discover` result advertising revision `2026-07-28` and the exact resource and prompt capabilities.
2. A table with `name`, `chooser`, `primitive`, and `reason`.
3. Stable resource URI schemes and any bounded resource templates.
4. Prompt names, descriptions, and required or optional arguments.
5. A deterministic ordering rule for every list method.
6. A cache policy with `ttlMs` and `cacheScope` for each cacheable result.
7. A `subscriptions/listen` filter for resources or list changes that need updates.
8. One invalid-resource example that returns JSON-RPC `-32602`, plus an unsupported-revision example that returns `-32022` with `supported` and `requested`.

Use these decision rules:

- A model-selected operation is a tool.
- Host-readable URI-addressed content is a resource.
- A user-selected message workflow is a prompt.
- An update stream is client-opened through `subscriptions/listen`.
- The listen request ID becomes `io.modelcontextprotocol/subscriptionId`.
- The acknowledgment must precede all events on that subscription.
- A notification never bypasses authorization for a later read.
- `server/discover` is mandatory even when a client chooses to call another method first.

Reject a design when:

- A list varies because of connection history.
- A private result is placed in a public cache.
- A resource URI is accepted without parsing, authorization, and boundary checks.
- The design uses `resources/subscribe` or treats a subscription as a protocol session.
- A prompt is allowed to override trusted host instructions.

Return a one-page contract review. End with the highest-risk primitive, cache, or subscription mistake and the smallest correction.
