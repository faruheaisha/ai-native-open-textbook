---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-mcp-server-manifests-field.md"
sourceRel: "system-prompts/data-sdk-mcp-server-manifests-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-mcp-server-manifests-field.md"
sourceSha256: "f13350e04f4cc3b40b05822e2ccd9e3917ef345b1c8bf683f37918ccc011e6e6"
pageSha256: "f13350e04f4cc3b40b05822e2ccd9e3917ef345b1c8bf683f37918ccc011e6e6"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Optional, keyed by sdk server name (each key should also appear in sdkMcpServers; other keys are ignored). Unlike sdkMcpServerConfigs — host-declared settings the CLI keeps for the server's lifetime, same shape inline on mcp_set_servers — this is a one-shot cache of the servers' own handshake output: sent on initialize only, consumed by the connect that follows it, never retained. MCP handshake results the host already obtained from its in-process servers by delivering initialize + notifications/initialized (+ tools/list) to them itself before writing this request. For each such server the CLI answers its own MCP client's initialize and first tools/list from these results and skips the notifications/initialized round trip, so registering N in-process servers costs no mcp_message control round trips before the first turn; tools/call and everything after the handshake still flow as mcp_message exactly as before. The host MUST keep answering mcp_message for every server as if this field were absent: a CLI that predates the field ignores it and performs the full per-server handshake over the control channel, and a newer CLI does the same for any server whose entry is missing or malformed, whose initializeResult.protocolVersion differs from the MCP protocol version the CLI's client requests, or that the CLI had already connected. Entries apply only to the connect that follows this initialize; they are never retained for later reconnects. Absent (older hosts, the Python SDK, browser clients): unchanged behaviour.
