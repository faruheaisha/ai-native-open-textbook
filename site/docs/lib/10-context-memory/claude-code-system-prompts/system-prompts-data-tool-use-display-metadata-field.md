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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-tool-use-display-metadata-field.md"
sourceRel: "system-prompts/data-tool-use-display-metadata-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-tool-use-display-metadata-field.md"
sourceSha256: "47682a8c9211015d105fea943ba44ff084d69b98af23c8c4e5f3f5ca5ff45691"
pageSha256: "47682a8c9211015d105fea943ba44ff084d69b98af23c8c4e5f3f5ca5ff45691"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

@internal Display metadata for this message's tool_use blocks, keyed by block id. display_name is the MCP server's `tool.annotations.title` when provided, otherwise a readable transform of the wire name; server_display_name is the MCP server's own display name; icon_url is the MCP server's directory icon URL (claude.ai connectors only). Omitted for blocks whose display label equals the wire name (built-in tools). Wrapper-level sibling — never inside `message.content` — so it is not replayed to the model.
