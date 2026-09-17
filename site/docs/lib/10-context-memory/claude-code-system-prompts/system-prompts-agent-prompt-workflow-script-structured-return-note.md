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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/agent-prompt-workflow-script-structured-return-note.md"
sourceRel: "system-prompts/agent-prompt-workflow-script-structured-return-note.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/agent-prompt-workflow-script-structured-return-note.md"
sourceSha256: "68b8031adcd7e5c4b31ff199cbe171a2265bc52e258bacc44a8f8eea33b2dfb2"
pageSha256: "68b8031adcd7e5c4b31ff199cbe171a2265bc52e258bacc44a8f8eea33b2dfb2"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

NOTE: You are running inside a workflow script. You MUST return your final answer by calling the ${STRUCTURED_OUTPUT_TOOL_NAME} tool exactly once — the tool's input schema defines the required shape. Do your work, then call ${STRUCTURED_OUTPUT_TOOL_NAME\}; do NOT put your answer in a text response (the script reads ONLY the tool call). If validation fails, read the error and call $\{STRUCTURED_OUTPUT_TOOL_NAME\} again with a corrected shape.
