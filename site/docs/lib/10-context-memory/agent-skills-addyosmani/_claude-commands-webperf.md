---
title: "Agent Skills（Addy Osmani）"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/.claude/commands/webperf.md"
sourceRel: ".claude/commands/webperf.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/.claude/commands/webperf.md"
sourceSha256: "74c0c1335f1397a5138a78eda4275e4e5deba16c4537f3a4b4971c3280d0ba27"
pageSha256: "74c0c1335f1397a5138a78eda4275e4e5deba16c4537f3a4b4971c3280d0ba27"
contentMode: "local-full"
zh: ""
---

# Agent Skills（Addy Osmani）

`/webperf` targets web applications specifically. Do not use it for utility libraries, CLIs, or server-only code with no browser-facing output.

## Determine the mode

**Deep mode** — activate when any of these is available:
- A Lighthouse JSON report file (e.g. `npx lighthouse <url> --output json --output-path ./report.json`, or `npx -p chrome-devtools-mcp chrome-devtools lighthouse_audit --output-format=json` from the Chrome DevTools MCP CLI)
- A PageSpeed Insights JSON response (includes Lighthouse + CrUX)
- A CrUX API response (requires `CRUX_API_KEY` or `GOOGLE_API_KEY`)
- A DevTools performance trace
- A live URL plus the `chrome-devtools` MCP server configured in the harness (the agent can capture metrics directly via `lighthouse_audit` and `performance_*` tools)
- The Chrome DevTools MCP CLI invoked locally (via `npx -p chrome-devtools-mcp chrome-devtools <tool>` or after `npm i -g chrome-devtools-mcp`) — the user runs commands like `chrome-devtools lighthouse_audit --output-format=json` and passes the JSON output to the agent

**Quick mode** — default when none of the above are available. The agent scans source code for structural anti-patterns and labels every finding as `potential impact`.

## Run the audit

Spawn the `web-performance-auditor` subagent. Pass it explicitly:

- The files, components, or diff under review
- Any artifact paths (Lighthouse JSON, PSI JSON, CrUX response, trace) or pasted JSON content
- The target URL or page name when known
- A note on which mode you expect (Quick or Deep), so the agent surfaces missing inputs if Deep was intended

The subagent returns a scorecard (only populated with sourced values), a ranked list of findings, positive observations, and proactive recommendations.

## Output

Return the full audit report to the user. No synthesis or merge step is needed — this is a single-persona command.
