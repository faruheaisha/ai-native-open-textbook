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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-mcp-server-errors-field.md"
sourceRel: "system-prompts/data-sdk-mcp-server-errors-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-mcp-server-errors-field.md"
sourceSha256: "31a157dc754e7b543c588e6cbc90e8453a72a73cbacb64eb16fb0e9b6f6ede9b"
pageSha256: "31a157dc754e7b543c588e6cbc90e8453a72a73cbacb64eb16fb0e9b6f6ede9b"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

@internal MCP server config entries from --mcp-config that failed validation and were skipped (e.g. a `url` entry with no `type`). Affected servers are absent from `mcp_servers[]`. `type` is a stable category from an open set — currently unknown_type, url_missing_type, invalid_config, reserved_name, or (Remote Control child only) bridge_carrier_foreign_entry, bridge_carrier_not_http, bridge_carrier_url_mismatch, bridge_carrier_no_ingress_origin, bridge_carrier_no_session_id; treat values you do not recognize as a generic skip. The key is omitted when there are no errors; CI can fail on `(mcp_server_errors?.length ?? 0) > 0`. On connections that persist frames server-side (the local bridge-worker lane) this key is always omitted — the skipped-entry detail stays in the local log, so an omitted key there does NOT assert every entry validated.
