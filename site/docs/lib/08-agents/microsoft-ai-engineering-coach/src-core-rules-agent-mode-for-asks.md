---
title: "Description"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/agent-mode-for-asks.md"
sourceRel: "src/core/rules/agent-mode-for-asks.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/agent-mode-for-asks.md"
sourceSha256: "44fa2cd06c78152d90e0fa0dce18cfcd67606701649a59899d0018338aba156a"
pageSha256: "44fa2cd06c78152d90e0fa0dce18cfcd67606701649a59899d0018338aba156a"
contentMode: "local-full"
zh: ""
---

# Description
Detects agent-mode requests with very short prompts that didn't trigger any tools, edits, or file context. These look like simple questions that would be cheaper and faster in Ask/Chat mode without the agent loop overhead.

# When Triggered
&#123;&#123;count&#125;&#125; agent-mode requests (&#123;&#123;pct&#125;&#125;) were trivially short (&#123;&#123;extra.maxMessageLength&#125;&#125; chars) with no tool calls, file edits, or code output. Routing simple questions through agent mode pays for the agent loop without using its capabilities.

# How to Improve
Use Ask/Chat mode for quick questions ("what does this error mean?", "how do I do X?"). Reserve agent mode for tasks that need to run terminal commands, edit files, or coordinate multiple steps.

# Examples
"&#123;&#123;messageText | truncate:60&#125;&#125;" (&#123;&#123;messageLength&#125;&#125; chars, agent mode)

# Detection Logic
```detect
scan: requests
match: agentMode == "agent" AND messageLength > 0 AND messageLength < thresholds.maxMessageLength AND length(toolsUsed) == 0 AND length(aiCode) == 0 AND length(referencedFiles) == 0 AND length(editedFiles) == 0 AND isCanceled == false
aggregate: ratio
check: ratio > thresholds.maxRatio AND count > thresholds.minSample
examples: "{{messageText | truncate:60}}" ({{messageLength}} chars)
```

# Tests
```test
{agentMode: "agent", messageText: "what is jwt?", messageLength: 12, toolsUsed: [], aiCode: [], referencedFiles: [], editedFiles: [], isCanceled: false} -> triggered
{agentMode: "agent", messageText: "fix bug", messageLength: 7, toolsUsed: ["edit_file"], aiCode: [], referencedFiles: [], editedFiles: [], isCanceled: false} -> clean
{agentMode: "chat", messageText: "what is jwt?", messageLength: 12, toolsUsed: [], aiCode: [], referencedFiles: [], editedFiles: [], isCanceled: false} -> clean
```
