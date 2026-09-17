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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/agent-prompt-schedule-local-mcp-server-limitation.md"
sourceRel: "system-prompts/agent-prompt-schedule-local-mcp-server-limitation.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/agent-prompt-schedule-local-mcp-server-limitation.md"
sourceSha256: "9b78ac22ea7cdb33e149a590e29a426b7d73ec5305862a350970e1eb87f7e1ae"
pageSha256: "9b78ac22ea7cdb33e149a590e29a426b7d73ec5305862a350970e1eb87f7e1ae"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

${LOCAL_ONLY_MCP_SERVER_COUNT} MCP ${PLURALIZE_FN(LOCAL_ONLY_MCP_SERVER_COUNT,"server is","servers are")\} configured directly in Claude Code and NOT available to routines (the user can run /mcp to see ${PLURALIZE_FN(LOCAL_ONLY_MCP_SERVER_COUNT,"it","them")}). Routines can only use claude.ai connectors${IS_CLAUDE_AI_CONNECTOR_LIST_UNAVAILABLE?`. As explained above, the claude.ai connector list was not loaded in this session, so ${PLURALIZE_FN(LOCAL_ONLY_MCP_SERVER_COUNT,"this service","some of these services")} may already have a connector on claude.ai that routines can use — do not assert that the user must connect one.`:CONNECTOR_FETCH_SKIP_REASON==="lockdown"?`. Loading of claude.ai connectors is disabled in this Claude Code session by the organization's managed MCP configuration, so ${PLURALIZE_FN(LOCAL_ONLY_MCP_SERVER_COUNT,"this service","some of these services")\} may already have a connector on claude.ai that routines can use — do not assert that the user must connect one.`:CONNECTOR_FETCH_SKIP_REASON==="restricted"?`. claude.ai connectors are not loaded in this Claude Code session (MCP servers are restricted to explicitly passed config here), so ${PLURALIZE_FN(LOCAL_ONLY_MCP_SERVER_COUNT,"this service","some of these services")} may already have a connector on claude.ai that routines can use — do not assert that the user must connect one.`:CONNECTOR_FETCH_SKIP_REASON==="optout"?`. Automatic loading of claude.ai connectors is disabled in this Claude Code session (disableClaudeAiConnectors setting or ENABLE_CLAUDEAI_MCP_SERVERS env var), so ${PLURALIZE_FN(LOCAL_ONLY_MCP_SERVER_COUNT,"this service","some of these services")\} may already have a connector on claude.ai that routines can use — do not assert that the user must connect one; suggest checking https://claude.ai/customize/connectors.`:CONNECTOR_FETCH_SKIP_REASON==="safe-mode"?`. claude.ai connectors are not loaded in this Claude Code session (safe mode), so ${PLURALIZE_FN(LOCAL_ONLY_MCP_SERVER_COUNT,"this service","some of these services")} may already have a connector on claude.ai that routines can use — do not assert that the user must connect one.`:CONNECTOR_FETCH_SKIP_REASON==="missing-scope"?`. claude.ai connectors could not be loaded in this Claude Code session (the session's login token does not include the MCP-connectors permission), so ${PLURALIZE_FN(LOCAL_ONLY_MCP_SERVER_COUNT,"this service","some of these services")\} may already have a connector on claude.ai that routines can use — do not assert that the user must connect one.`:" — to use one of those services in a routine, the user must connect it at https://claude.ai/customize/connectors."\}
