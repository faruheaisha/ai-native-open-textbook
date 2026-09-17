---
title: "御舆：解码 Agent Harness"
sourceId: "09-harness/claude-code-book-yuyu"
sourceTitle: "御舆：解码 Agent Harness"
sourceKind: "工程手册"
licenseLabel: "仅引用"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/lintsinghua/claude-code-book"
entryUrl: "https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-3-Advanced-Patterns/12-MCP-Integration-and-External-Protocols.md"
sourceRel: "en/Part-3-Advanced-Patterns/12-MCP-Integration-and-External-Protocols.md"
rawUrl: "/raw/09-harness/claude-code-book-yuyu/en/Part-3-Advanced-Patterns/12-MCP-Integration-and-External-Protocols.md"
sourceSha256: "3caa059d12b460674776e262e784e367d573cb11ccef9d217efc0a1ba03f0395"
pageSha256: "0d45e71e9387d1d83f5ce362d0f8ee3d3dff750894a882de53d2a7694b83e052"
contentMode: "local-full"
zh: ""
---

## Key Takeaways

1. **MCP's Design Mission**: MCP is the "USB-C port" of the AI world, solving the fragmentation problem in tool integration through a standardized protocol. Its three core design principles — Protocol as Contract, Transport Agnostic, and Security by Design — permeate Claude Code's entire MCP implementation.

2. **Eight connection configuration variants**: These configurations combine local process pipes, HTTP-based connections, WebSocket adapters, SDK calls, and proxy integration. Choose a configuration supported by both endpoints; distinguish transport latency from server execution cost.

3. **Security Value of Three-part Naming**: The `mcp__\{server\}__\{tool\}` naming convention not only solves tool name conflicts but, more importantly, provides independent namespaces during permission checks, preventing permission confusion between MCP tools and built-in tools. The prefix skip in SDK mode is an advanced feature that allows MCP tools to override built-in tools.

4. **Defense-in-Depth Security Architecture**: The four-layer permission model — enterprise policy (denylist > allowlist), IDE tool allowlist, user permission configuration, runtime confirmation — ensures that even if one layer's check is bypassed, other layers still provide protection. This is the complete embodiment of the "default distrust" security principle.

5. **Practical Wisdom of Signature-based Deduplication**: Through `stdio:JSON.stringify([cmd,...args])` and `url:originalUrl` signature mechanisms, the system ensures deduplication is based on "actual effect" rather than "surface configuration." The deduplication priority (manual > plugin > connector) guarantees that the user's explicit configuration always takes precedence.

6. **Complexity Management in Bridge Bidirectional Communication**: The 30+ module Bridge system abstracts v1/v2 transport differences through the unified `ReplBridgeTransport` interface, processes inbound messages through triple filtering (permission response > control request > user message), and achieves efficient deduplication through the `BoundedUUIDSet` ring buffer.

7. **SSE Sequence Number Continuation Is a Key Innovation**: The v2 transport carries the high-water sequence number mark during switching, avoiding full session history replay by the server. This seemingly minor improvement solves the "message storm" problem caused by transport switching in long-running sessions.

8. **Four-layer Permission Gating Ensures Remote Control Security**: The four-layer check of subscription type > profile completeness > organization info > feature flag, combined with OAuth Token auto-refresh, minimizes impact on user experience while maintaining security.

9. **IDE Integration's Perception Capabilities**: Through `sse-ide`/`ws-ide` protocols and the `executeCode`/`getDiagnostics` allowlisted tools, Claude Code gains real-time perception of the IDE environment — evolving from passively receiving user input to actively obtaining diagnostic information and executing operations in the IDE context.

10. **Collaboration with Other Systems**: MCP tools fully integrate into Claude Code's internal systems — going through tool system (Chapter 3) registration and scheduling, permission pipeline (Chapter 4) four-stage checks, and hook system (Chapter 8) lifecycle interception. MCP is not an isolated subsystem but a natural extension of Claude Code's tool ecosystem.

---

> **Next Chapter Preview:** Chapter 13 will dive into Claude Code's streaming architecture and performance optimization, exploring how to handle large data streams while maintaining real-time responsiveness — where streaming output from MCP tools is an important optimization scenario.
