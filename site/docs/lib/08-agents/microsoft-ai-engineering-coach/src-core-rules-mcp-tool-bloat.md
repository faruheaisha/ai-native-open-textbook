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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/mcp-tool-bloat.md"
sourceRel: "src/core/rules/mcp-tool-bloat.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/mcp-tool-bloat.md"
sourceSha256: "ab0f460352194fbc1247420e84a5dfc97aae9fa799ab72cadb9aac4718ca96fc"
pageSha256: "ab0f460352194fbc1247420e84a5dfc97aae9fa799ab72cadb9aac4718ca96fc"
contentMode: "local-full"
zh: ""
---

# Description
Detects sessions with an unusually large number of distinct tools invoked — a proxy for oversized tool catalogs that inflate every request's system prompt. Each registered tool adds tokens regardless of whether it's used.

# When Triggered
&#123;&#123;count&#125;&#125; session(s) used more than &#123;&#123;thresholds.maxToolsPerSession&#125;&#125; distinct tools. Large tool sets add silent overhead to every prompt.

# How to Improve
Trim the active toolset: disable rarely-used MCP servers, scope tool sets per workspace, and use tool groups so only relevant tools are loaded for the task at hand. Aim for under 40 active tools per session.

# Examples
&#123;&#123;flatUnique(reqs, "toolsUsed")&#125;&#125; tools in one session

# Detection Logic
```detect
scan: sessions
match: flatUnique(reqs, "toolsUsed") > thresholds.maxToolsPerSession
aggregate: count
check: count >= thresholds.minSessions
examples: {{flatUnique(reqs, "toolsUsed")}} tools
```
