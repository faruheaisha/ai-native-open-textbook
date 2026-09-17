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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-artifact-mcp-connector-guidance.md"
sourceRel: "system-prompts/data-artifact-mcp-connector-guidance.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-artifact-mcp-connector-guidance.md"
sourceSha256: "7f30a0886799423785330f74eb20b0877f4d36d98c259c1ddc6b8c81580ba8ef"
pageSha256: "7f30a0886799423785330f74eb20b0877f4d36d98c259c1ddc6b8c81580ba8ef"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

${CONNECTOR_SERVER_NAMING_GUIDANCE}${HOSTED_CONNECTOR_RESOLUTION_GUIDANCE\}${BUILT_IN_META_CONNECTOR_GUIDANCE}${HOST_MCP_SERVER_GUIDANCE\} The manifest's `tools` array takes the connector's upstream tool names (as returned by ${CONNECTOR_TOOL_DISCOVERY_SOURCE}), which can differ from the normalized `<toolName>` segment when an upstream name contains `.` or spaces. Every `servers[]` entry needs a non-empty `tools` array naming the tools the page calls — an empty or omitted `tools` list is refused and never means "all tools"; to publish without connector access, leave `mcp` out of `capabilities` (pass `capabilities: {}` to clear a stored declaration) rather than declaring an empty `servers` list.${HERMETIC_CONNECTOR_FALLBACK_GUIDANCE\}
