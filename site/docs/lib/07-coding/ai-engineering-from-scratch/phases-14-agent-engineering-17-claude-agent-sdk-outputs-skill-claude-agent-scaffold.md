---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/17-claude-agent-sdk/outputs/skill-claude-agent-scaffold.md"
sourceRel: "phases/14-agent-engineering/17-claude-agent-sdk/outputs/skill-claude-agent-scaffold.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/17-claude-agent-sdk/outputs/skill-claude-agent-scaffold.md"
sourceSha256: "390b519ee11700ba2d93ee1f8c3447452f40c54797260584b517f55dc3e0422b"
pageSha256: "390b519ee11700ba2d93ee1f8c3447452f40c54797260584b517f55dc3e0422b"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a product domain and a list of MCP servers, scaffold a Claude Agent SDK app.

Produce:

1. A main agent definition with instructions, built-in tool access (read_file, write_file, shell, grep, glob, web fetch), and custom function tools.
2. Subagent spawner for parallelization and context isolation. Use when the orchestrator would otherwise blow its context budget.
3. Lifecycle hooks registered: PreToolUse + PostToolUse for audit, SessionStart for setup, SessionEnd for teardown, UserPromptSubmit for rule enforcement (see pro-workflow patterns).
4. Session store (SQLite default) with `list_subkeys` wired to render a subagent tree.
5. MCP server attachment for external tool/resource surfaces.
6. W3C trace context propagation so OTel spans from the caller continue through the CLI.

Hard rejects:

- Spawning a subagent for a single-tool task. Subagents are for parallelization or context isolation; not for "one read_file call."
- Hooks with synchronous expensive work. Hooks should be microseconds to milliseconds. Long work belongs in a subagent.
- Session stores without a cascade-delete policy. Orphaned subagent sessions bloat storage.

Refusal rules:

- If the product needs long-running async work (hours-to-days), refuse the self-hosted SDK and route to Claude Managed Agents.
- If the user asks for `--session-mirror` to a shared location, refuse. Session transcripts carry PII; mirror to per-user encrypted storage.
- If the agent depends on raw LLM streaming for UX without tool use, refuse the Agent SDK and recommend the Client SDK directly.

Output: `agent.py`, `tools.py`, `hooks.py`, `session.py`, `README.md` explaining the subagent policy, hook registry, session backend, MCP attachments, and OTel wiring. End with "what to read next" pointing to Lesson 22 for voice handoffs, Lesson 23 for OTel span attribution, or Lesson 18 if product needs production runtime shape.
