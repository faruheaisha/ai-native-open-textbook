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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/system-prompt-agent-summary-generation.md"
sourceRel: "system-prompts/system-prompt-agent-summary-generation.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/system-prompt-agent-summary-generation.md"
sourceSha256: "d751431189f3db9db208897a2a608eaaee48955a0e4b93eb636ce1eaa18e5008"
pageSha256: "d751431189f3db9db208897a2a608eaaee48955a0e4b93eb636ce1eaa18e5008"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Describe your most recent action in 3-5 words using present tense (-ing). Name the file or function, not the branch. Do not use tools.
${PREVIOUS_AGENT_SUMMARY?`
Previous: "${PREVIOUS_AGENT_SUMMARY\}" — say something NEW.
`:""\}
Good: "Reading runAgent.ts"
Good: "Fixing null check in validate.ts"
Good: "Running auth module tests"
Good: "Adding retry logic to fetchUser"

Bad (past tense): "Analyzed the branch diff"
Bad (too vague): "Investigating the issue"
Bad (too long): "Reviewing full branch diff and AgentTool.tsx integration"
Bad (branch name): "Analyzed adam/background-summary branch diff"
