---
title: "MCP vs CLI: Decision Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/mcp-vs-cli.md"
sourceRel: "guide/ecosystem/mcp-vs-cli.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/mcp-vs-cli.md"
sourceSha256: "3bc3e0e8bdf8792b2bc2a7b6534d59ce80710fd852812614b0bfc54842ac535e"
pageSha256: "3bc3e0e8bdf8792b2bc2a7b6534d59ce80710fd852812614b0bfc54842ac535e"
contentMode: "local-full"
zh: ""
---

# MCP vs CLI: Decision Guide

**Last updated**: May 2026

> Interactive version with guidance table and practitioner quotes: [cc.bruniaux.com/ecosystem/mcp-vs-cli/](https://cc.bruniaux.com/ecosystem/mcp-vs-cli/)

The debate emerged from a rapid succession of interface paradigms: browser-based AI (2022-23), then AI in the IDE with MCP connecting agents to external services (2024-25), then full CLI agents that execute commands and write files without an intermediary layer (2025-26). That progression explains why the question exists at all.

This page compares two integration patterns for giving Claude Code access to external tools and services: MCP servers and CLI tools. Neither is universally better. The right choice depends on your context, and most real workflows end up using both.

---

## What each approach does

**MCP servers** inject tool schemas into Claude's context at session start. Claude sees a structured list of available tools with parameters, types, and descriptions. It then calls those tools natively, receiving structured responses.

**CLI tools** are shell commands that Claude invokes via Bash. Claude drives them the same way a developer would: constructing command strings, parsing text output. No schema injection at startup. The shell is the interface.

---

## Tradeoffs

### MCP strengths

| Advantage | Detail |
|-----------|--------|
| **Structured interface** | Tool schemas guide Claude precisely, fewer hallucinated flags or arguments |
| **Complex auth** | OAuth, token refresh, secrets rotation handled by the server, not the prompt |
| **Structured output** | JSON responses are directly parseable by Claude and downstream agents |
| **Observability** | Remote MCP servers can log every call, essential for enterprise usage tracking and ROI attribution |
| **Distribution at scale** | Update the server once, all connected clients get the change. No per-machine package management. |
| **Non-technical users** | Users who never touch a terminal can access tools transparently via MCP connectors |
| **Weaker models** | A structured schema compensates when the model is less capable of parsing CLI help text |

### CLI strengths

| Advantage | Detail |
|-----------|--------|
| **Zero context overhead** | No schema injected at startup. Since v2.1.7 lazy loading closes most of the gap, but CLI is still the absolute minimum. |
| **Deterministic actions** | Explicit commands with predictable output are easier to audit and test |
| **Human + AI use** | The same CLI wrapper works for a developer running it manually and for Claude |
| **Frontier models** | Claude Opus/Sonnet (current generation) can drive complex CLIs (aws-cli, glab, gh) without a structured schema |
| **Speed** | No connection setup, no MCP handshake, direct subprocess execution |
| **Simplicity** | Easier to debug, log, and reason about than a remote server call chain |
| **Skills encapsulation** | A CLI wrapped in a skill is transparent to the user and keeps the tool logic version-controlled |

### MCP weaknesses

| Weakness | Detail |
|----------|--------|
| **Schema token cost** | Since v2.1.7, lazy loading (MCP Tool Search) means unused tools inject only their name, not their full schema. Cost is still non-zero: tool names load at startup, full schemas load on first use. The pre-v2.1.7 worst case (~55K tokens for a 5-server setup) now averages ~8.7K (an 85% reduction), but not zero. |
| **Connection overhead** | Session startup takes longer with many MCP servers connected |
| **Debugging difficulty** | Failures inside an MCP server are harder to trace than a failed shell command |
| **Maintenance complexity** | Running, updating, and securing remote MCP servers adds infrastructure |
| **Overkill for simple APIs** | A GitLab MCP that surfaces 20% of glab's functionality is worse than glab itself |

### CLI weaknesses

| Weakness | Detail |
|----------|--------|
| **No observability** | Shell commands on a local machine are invisible to ops/management tooling |
| **Distribution problem** | Keeping CLIs updated across a team requires package management discipline (brew, scoop, etc.) |
| **Weaker models struggle** | A less capable model may hallucinate flags or misread help text; schemas help |
| **No multi-agent structure** | CLI output requires parsing; structured MCP responses are more reliable across agent-to-agent handoffs |
| **Non-tech user barrier** | A non-technical user cannot be expected to have a configured CLI environment |

---

## The API wrapper pattern

Most production MCP servers for SaaS tools sit on top of existing REST or GraphQL APIs. The server translates tool calls into HTTP requests against those APIs, processes responses, and returns structured output to the agent. It does not add backend capabilities that the underlying API lacks.

Official documentation from four major providers confirms this directly:

- **Notion**: "converted MCP tool calls into HTTP API calls to Notion's public API" (Notion engineering blog)
- **Sentry**: "middleware to the upstream Sentry API, optimized for coding assistants like Cursor and Claude Code" (sentry-mcp README)
- **Slack**: "a wrapper around an external API, like Slack" (Slack developer docs)
- **GitHub**: "integrates with GitHub, allowing LLMs to interact with repositories via the GitHub API" (github-mcp-server README)

The practical consequence: a CLI script calling the same REST or GraphQL API has the same capabilities. MCP and CLI reach the same backend, with the same credentials, triggering the same operations. The difference is the interface layer, not what the backend can do.

What MCP adds that a CLI cannot replicate:

- **OAuth token management**: server-held auth with browser redirect flows (Slack, Google Drive, Figma, hosted Notion). A CLI can hold an API key in an env var, but not a refresh token or a PKCE exchange, which require server-side state.
- **LLM-tuned schemas**: curated tool selection, not the full API surface, with parameter types and descriptions calibrated for agent reasoning.
- **Centralized hosting**: one deployment serves many clients; CLIs require per-machine installation and per-user credential configuration.
- **Usage attribution**: remote MCP servers associate each tool call with a user and session, feeding observability dashboards. Local CLI calls on developer machines are invisible.

This sharpens the decision criterion. If a service authenticates via API key or environment token, a CLI calling the same API is functionally equivalent to an MCP server. The question becomes whether you need OAuth, centralized observability, or cross-client standardization. If none of those apply, the CLI avoids the schema overhead and reaches the same backend.

---

## The four decision dimensions

Before asking "MCP or CLI?", answer these four questions. They rank from most to least constraining.

### 1. Who is the end user?

This is the dominant variable. Everything else is secondary.

- **Non-technical user** (using a chat interface, no terminal) → **MCP or skill-encapsulated CLI**. You cannot expose a raw CLI to a non-dev user. Connectors must be MCP-based or wrapped invisibly in a skill that handles the CLI internally.
- **Technical user / developer** → continue to question 2.

### 2. Which model is driving the tool?

- **Frontier model** (Claude Opus/Sonnet, current generation) → strong enough to drive complex CLIs directly. A structured MCP schema adds overhead without proportional benefit.
- **Smaller or local model** (Qwen, Mistral, lighter deployments) → structured MCP schemas compensate for weaker CLI parsing ability. MCP is more reliable here.

### 3. Does your organization need observability?

- **Yes** (enterprise, C-level reporting, compliance, ROI attribution on AI spend) → **MCP Remote server**. Local CLI calls are invisible. A remote MCP server can log every tool invocation, associate it with a user, and feed dashboards. You cannot replicate this with CLIs on local machines.
- **No** (individual dev, local workflow) → observability is not a constraint. CLI is fine.

### 4. How often does the tool schema change?

- **Stable API** (mature tool, versioned interface) → MCP investment pays off over time.
- **Rapidly changing** or **thin wrapper** → CLI is cheaper to maintain. A hand-rolled glab wrapper that exposes only the 5 commands you actually use is more durable than a GitLab MCP that duplicates the full API surface.

---

## Guidance by situation

Quick reference, not rules, but directional defaults.

| Situation | Lean toward | Rationale |
|-----------|-------------|-----------|
| Non-technical user, chat interface | **MCP / Skill** | CLI is inaccessible; connectors must be invisible |
| Frontier model (Claude, current generation), developer workflow | **CLI** | Model handles it natively; schemas are overhead |
| Smaller/local model | **MCP** | Schema guides the model reliably |
| Enterprise, observability required | **MCP Remote** | Only way to log, attribute, and report on usage |
| Team distribution (10+ devs) | **MCP** | Central update vs per-machine CLI maintenance |
| Individual dev, local machine | **CLI or skill** | Simpler, faster, no infrastructure |
| Deterministic actions (git, CI, deploy) | **CLI** | Explicit commands, predictable output, auditable |
| Complex auth (OAuth, token refresh) | **MCP** | Server handles auth; CLI would require credential plumbing |
| Tight context budget / many tools loaded | **CLI** | Still the minimum-overhead option. Lazy loading (v2.1.7+) reduces MCP cost significantly, but CLI has zero schema cost by design. |
| Agent-to-agent structured output | **MCP** | JSON responses are more reliable than parsed CLI text |
| Debugging / prototyping a new integration | **CLI** | Easier to inspect, faster to iterate |
| Browser automation (non-frontier model) | **MCP** | Playwright MCP structures interaction reliably |
| Browser automation (frontier model, Claude Code) | **CLI + skill** | playwright-cli + skill reported faster and more efficient in practice |
| GitLab / GitHub access | **CLI** (glab, gh) | Official CLIs are richer than most MCP wrappers |
| Documentation lookup (Context7) | **MCP** | No CLI equivalent; structured doc retrieval has no shell analog |

---

## Per-server recommendation

The table below applies the four decision dimensions to the 18 most commonly discussed MCP servers. "Verdict" is the default for a developer using a frontier model on a local machine. Your context (non-technical users, enterprise observability, or a smaller model) may shift any row toward MCP.

| MCP Server | Verdict | CLI Alternative | Reason |
|------------|---------|-----------------|--------|
| GitHub MCP | **Use CLI** | `gh` | `gh` covers the full API surface; model knows it from training; official GitHub MCP was archived |
| GitLab MCP | **Use CLI** | `glab` | Official CLI is richer than the MCP wrapper; practitioner consensus confirms |
| Git MCP (Anthropic) | **Use CLI** | `git` | Git is the CLI the model knows best; MCP schema adds cost without structural benefit on frontier models |
| Filesystem MCP | **Use CLI** | `cat`, `ls`, `find` | Shell commands are universal; no benefit from schema overhead |
| Docker MCP | **Use CLI** | `docker` | Docker CLI is universally known; no widely adopted MCP adds comparable value |
| AWS MCP | **Use CLI** | `aws-cli` | aws-cli v2 covers the full surface; model drives it natively from training knowledge |
| Terraform MCP | **Use CLI** | `terraform` | Deterministic plan/apply workflow; CLI output is structured and auditable |
| Semgrep MCP | **Use CLI** | `semgrep` | Mature CLI, well-documented; MCP adds value mainly in CI/CD observability contexts |
| Playwright MCP | **Depends** | `playwright-cli` + skill | Frontier model: CLI + skill is faster. Smaller model: MCP structures browser interaction reliably |
| Kubernetes MCP | **Depends** | `kubectl` | Auth complexity and multi-cluster setups favor MCP; simple operations favor kubectl |
| Vercel MCP | **Depends** | `vercel` CLI | CLI for deploy, env, and domains; MCP for dashboard integration and team workflow comments |
| Sentry MCP | **Use MCP** | `sentry-cli` (CI/CD scoped) | `sentry-cli` handles releases, source map uploads, and CI/CD ops, but has no equivalent for interactive issue querying. MCP provides structured error triage for coding agents. |
| Slack MCP | **Use MCP** | none | OAuth required; no practical CLI for workspace access from an agent |
| Notion MCP | **Use MCP** | none | OAuth required; API-key access is limited to integrations, not user-scoped workspace access |
| Google Drive MCP | **Use MCP** | none | OAuth 2.1 with refresh token rotation; cannot be replicated by a skill or CLI |
| Figma MCP | **Use MCP** | none | OAuth required; design file access has no CLI equivalent |
| Linear MCP | **Use MCP** | none | MCP handles GraphQL complexity; structured project management without raw API calls |
| Context7 MCP | **Use MCP** | none | No CLI equivalent for curated, version-specific doc retrieval |

The pattern: if the service has a mature CLI the model knows from training, use the CLI. If the service requires OAuth or has no CLI, use MCP. "Depends" means the decision hinges on model capability or specific workflow needs.

> Take the interactive quiz (6 questions, under 1 minute): [cc.bruniaux.com/mcp-or-cli/](https://cc.bruniaux.com/mcp-or-cli/)

---

## The hybrid is the default

Most production workflows don't choose one. They use both, with each covering the layer it handles best.

**A practical example** (from practitioners):

- **Inner layer** (local dev iteration, git, file ops, shell scripts) → CLI, fast, deterministic, no overhead
- **Outer layer** (CI/CD, shared infrastructure, cross-team services) → MCP Remote, observable, centralized, scalable
- **Skill layer** (user-facing actions, CLI tools encapsulated for non-tech users) → CLIs wrapped in skills, transparent to the end user

The mistake is applying one answer to both layers. A solo developer building a Claude Code workflow for themselves should mostly use CLIs. A team deploying an AI assistant to non-technical colleagues should mostly use MCP.

---

## Token cost of MCP schemas: what the numbers look like

Since v2.1.7 (January 2026), Claude Code uses **MCP Tool Search** (lazy loading) by default. This changes the token math significantly, but does not eliminate schema cost entirely.
