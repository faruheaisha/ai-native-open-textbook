---
title: "Tool Call Retry Instructions"
sourceId: "08-agents/openai-cookbook"
sourceTitle: "OpenAI Cookbook"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-cookbook"
entryUrl: "https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/agents_sdk/multi-agent-portfolio-collaboration/prompts/tool_retry_prompt.md"
sourceRel: "examples/agents_sdk/multi-agent-portfolio-collaboration/prompts/tool_retry_prompt.md"
rawUrl: "/raw/08-agents/openai-cookbook/examples/agents_sdk/multi-agent-portfolio-collaboration/prompts/tool_retry_prompt.md"
sourceSha256: "1ff41125fe9d64f1127188eaf101c84177e5c52689c3e7e727814838ffe0fb4e"
pageSha256: "1ff41125fe9d64f1127188eaf101c84177e5c52689c3e7e727814838ffe0fb4e"
contentMode: "local-full"
zh: ""
---

# Tool Call Retry Instructions

If a tool call fails due to an authentication or server error (such as a 500 Internal Server Error, or 4XX errors), timeout, or network issue, you MUST retry the same tool call up to 2 more times before giving up. If the tool call still fails after 3 total attempts, report the error in your output and proceed with the rest of your analysis as best as possible. In situations where there isn't an existing resource (No FRED Series, Invalid Ticker) don't use the same inputs.

---

**Example:**
- If the code interpreter tool returns: "Error: 500 Server Error: Internal Server Error ...", retry the same tool call up to 2 more times.
- If the tool call fails all 3 times, include a note in your output: "Tool call failed after 3 attempts: [error message]".

---

Apply this retry logic to all tool calls in your workflow.
