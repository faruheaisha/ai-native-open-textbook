---
title: "Yù Yú: Decoding Agent Harness"
sourceId: "09-harness/claude-code-book-yuyu"
sourceTitle: "御舆：解码 Agent Harness"
sourceKind: "工程手册"
licenseLabel: "仅引用"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/lintsinghua/claude-code-book"
entryUrl: "https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/README.md"
sourceRel: "en/README.md"
rawUrl: "/raw/09-harness/claude-code-book-yuyu/en/README.md"
sourceSha256: "2bd6aa53b394d88ced6615cf4662a7ab09c040e42fcc7ec56f5320bd1c421c1f"
pageSha256: "2bd6aa53b394d88ced6615cf4662a7ab09c040e42fcc7ec56f5320bd1c421c1f"
contentMode: "local-full"
zh: ""
---

# Yù Yú: Decoding Agent Harness

A Deep Architectural Analysis of Claude Code

[中文](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/README.md) · **English**

<table align="center">
<tr><td><img src="https://gh-proxy.com/https://raw.githubusercontent.com/lintsinghua/claude-code-book/1e2068c05ba80b85d86caae7b4c32e7478e66d09/cover.png" width="420" alt="御舆：解码 Agent Harness — Claude Code 架构深度剖析，LinTsinghua" /></td></tr>
</table>

Explore how an agent runtime connects the conversation loop, tools, permissions, memory, and orchestration. Fifteen chapters and four appendices connect implementation details to design trade-offs and a hands-on harness project.

> *“Of all artifacts that bring many crafts together, the chariot calls upon the most.”* — *Kǎo Gōng Jì* (Book of Crafts)
>
> Two thousand years ago, building a chariot was already an exercise in systems engineering. The **yú** (舆, carriage body) carries the rider; shafts, spokes, and axle fittings each serve their purpose. Only together can the vehicle move.
>
> Building an AI Agent calls for similar coordination: the conversation loop advances the task, tools perform actions, and permissions set boundaries. The runtime framework that supports and organizes these capabilities—**Agent Harness**—plays the role of the **yú**.
>
> Chariot builders brought many crafts into one working whole. Agent builders, too, must understand how the parts work together. **Yù Yú** (御舆, “driving the chariot”) evokes both control and an understanding of the machinery that makes it possible.
>
> This is the idea behind the title **Yù Yú**, also known as **Yú Shū** (舆书, “The Chariot Book”).

## Start reading

- **First visit:** [Foreword](/lib/09-harness/claude-code-book-yuyu/en-00-Foreword), then chapters 01 → 02 → 04 → 15.
- **Build an agent:** read Parts 1 and 4; use Parts 2 and 3 when adding memory and extensions.
- **Look up a concept:** use the four appendices below.
- **Website:** [Online reading](https://lintsinghua.github.io/). Repository chapters remain directly readable on GitHub.

## Reading notes

Readers should distinguish observed implementation, architectural interpretation, and teaching examples. Feature flags and tool availability depend on build and runtime configuration; counts and timing examples are not promises about current releases.

Claude Code belongs to Anthropic. This independent book is not an official Anthropic publication. The book’s license does not extend to third-party code.

## Contents

### Part 1. Foundations — Building Mental Models

> Understand the paradigm shift in Agent programming and establish a holistic cognitive framework.

| # | Chapter | Core Content |
|:-:|---------|-------------|
| 01 | [The New Paradigm of Agent Programming](/lib/09-harness/claude-code-book-yuyu/en-Part-1-Foundations-01-The-New-Paradigm-of-Agent-Programming) | Copilot → Claude Code evolution; five design principles; Bun + React/Ink + Zod v4 stack |
| 02 | [The Dialog Loop — Agent's Heartbeat](/lib/09-harness/claude-code-book-yuyu/en-Part-1-Foundations-02-The-Dialog-Loop-Heartbeat-of-an-Agent) | `while(true)` async generator loop; five yield events; ten termination reasons; `QueryDeps` DI |
| 03 | [The Tool System — Agent's Hands](/lib/09-harness/claude-code-book-yuyu/en-Part-1-Foundations-03-The-Tool-System-Agent-Hands) | `Tool<I,O,P>` five-element protocol; fail-safe `buildTool` factory; 45+ tools × 12 categories; concurrent partitioning |
| 04 | [The Permission Pipeline — Agent's Guardrails](/lib/09-harness/claude-code-book-yuyu/en-Part-1-Foundations-04-The-Permission-Pipeline-Agent-Guardrails) | Four-stage pipeline; five permission modes; Bash rule matching; speculative classifier 2s Promise.race |

### Part 2. Core Systems — Deep Into Subsystems

> Dissect the four core subsystems — configuration, memory, context, and hooks.

| # | Chapter | Core Content |
|:-:|---------|-------------|
| 05 | [Settings & Configuration — Agent's DNA](/lib/09-harness/claude-code-book-yuyu/en-Part-2-Core-Systems-05-Settings-and-Configuration-Agent-DNA) | Six-layer config priority chain; merge rules; security boundary & supply chain defense; dual-layer feature gating |
| 06 | [The Memory System — Agent's Long-Term Memory](/lib/09-harness/claude-code-book-yuyu/en-Part-2-Core-Systems-06-The-Memory-System-Agent-Long-Term-Memory) | Four closed memory types; "only save non-derivable info"; MEMORY.md index; Fork memory mechanism |
| 07 | [Context Management — Agent's Working Memory](/lib/09-harness/claude-code-book-yuyu/en-Part-2-Core-Systems-07-Context-Management-Agent-Working-Memory) | Effective window formula; four-level compression (Snip→MicroCompact→Collapse→AutoCompact); circuit breaker |
| 08 | [The Hook System — Agent's Lifecycle Extension Points](/lib/09-harness/claude-code-book-yuyu/en-Part-2-Core-Systems-08-The-Hook-System-Agent-Lifecycle-Extension-Points) | Five hook types; 26 lifecycle events; JSON response protocol; six-layer priority; three-layer security |

### Part 3. Advanced Patterns — Composition & Extension

> Explore how Agents compose, orchestrate, and extend — from sub-agents to MCP protocol bridging.

| # | Chapter | Core Content |
|:-:|---------|-------------|
| 09 | [Sub-Agents and the Fork Pattern](/lib/09-harness/claude-code-book-yuyu/en-Part-3-Advanced-Patterns-09-Sub-Agents-and-the-Fork-Pattern) | Three Agent sources; agent roles and availability gates; byte-level Fork context inheritance; recursive Fork protection |
| 10 | [The Coordinator Pattern — Multi-Agent Orchestration](/lib/09-harness/claude-code-book-yuyu/en-Part-3-Advanced-Patterns-10-The-Coordinator-Pattern-Multi-Agent-Orchestration) | Coordinator-Worker dual gating; "orchestrate-only" constraint; four addressing modes; four-stage workflow |
| 11 | [The Skill System & Plugin Architecture](/lib/09-harness/claude-code-book-yuyu/en-Part-3-Advanced-Patterns-11-The-Skill-System-and-Plugin-Architecture) | 11 core skills; SKILL.md frontmatter; three-level parameter substitution; layered loading; plugin cache |
| 12 | [MCP Integration & External Protocols](/lib/09-harness/claude-code-book-yuyu/en-Part-3-Advanced-Patterns-12-MCP-Integration-and-External-Protocols/index) | 8 connection configuration variants; five-state connection management; three-part tool naming; Bridge bidirectional comms |

### Part 4. Engineering Practice — From Principles to Construction

> Performance optimization details and a practical roadmap for building a complete Harness from scratch.

| # | Chapter | Core Content |
|:-:|---------|-------------|
| 13 | [Streaming Architecture & Performance Optimization](/lib/09-harness/claude-code-book-yuyu/en-Part-4-Engineering-Practice-13-Streaming-Architecture-and-Performance-Optimization) | QueryEngine lifecycle; concurrency control; parallel prefetching and startup estimates; lazy loading |
| 14 | [Plan Mode & Structured Workflows](/lib/09-harness/claude-code-book-yuyu/en-Part-4-Engineering-Practice-14-Plan-Mode-and-Structured-Workflows) | "Think before you act" philosophy; plan file three-layer recovery; local scheduling & remote triggers |
| 15 | [Building Your Own Agent Harness](/lib/09-harness/claude-code-book-yuyu/en-Part-4-Engineering-Practice-15-Building-Your-Own-Agent-Harness/index) | Six-step implementation roadmap; circular dependency solutions; four-layer observability; security threat model |

### Appendix — Reference Quick-Lookup

| | Content |
|:-:|---------|
| [A](/lib/09-harness/claude-code-book-yuyu/en-Appendices-A-Architecture-Navigation-Map) | **Architecture Navigation Map** — 16 core modules, dependency tree, 6 data flow paths, 10 design patterns |
| [B](/lib/09-harness/claude-code-book-yuyu/en-Appendices-B-Complete-Tool-Inventory) | **Complete Tool Inventory** — 50+ tools × 12 categories, readOnly/destructive/concurrencySafe attributes |
| [C](/lib/09-harness/claude-code-book-yuyu/en-Appendices-C-Feature-Flag-Reference) | **Feature Flag Reference** — 89 flags × 13 categories, compile-time/runtime types, dependency graphs |
| [D](/lib/09-harness/claude-code-book-yuyu/en-Appendices-D-Glossary) | **Glossary** — 100 bilingual term definitions with cross-references and chapter locations |
