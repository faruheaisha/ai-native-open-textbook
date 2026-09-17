---
title: "Claude Code: Agent Memory Frontmatter"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/reports/claude-agent-memory.md"
sourceRel: "reports/claude-agent-memory.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/reports/claude-agent-memory.md"
sourceSha256: "6641a2d528bba681eeb1e7b885e49e1c3ebe4ef585a3809de4969814c2ac4570"
pageSha256: "6641a2d528bba681eeb1e7b885e49e1c3ebe4ef585a3809de4969814c2ac4570"
contentMode: "local-full"
zh: ""
---

# Claude Code: Agent Memory Frontmatter

Persistent memory for subagents — enabling agents to learn, remember, and build knowledge across sessions.

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Overview

Introduced in **Claude Code v2.1.33** (February 2026), the `memory` frontmatter field gives each subagent its own persistent markdown-based knowledge store. Before this, every agent invocation started from scratch.

```yaml
---
name: code-reviewer
description: Reviews code for quality and best practices
tools: Read, Write, Edit, Bash
model: sonnet
memory: user
---

You are a code reviewer. As you review code, update your agent memory with
patterns, conventions, and recurring issues you discover.
```

---

## Memory Scopes

| Scope | Storage Location | Version Controlled | Shared | Best For |
|-------|-----------------|-------------------|--------|----------|
