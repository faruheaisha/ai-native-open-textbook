---
title: "Harness Engineering 指南（nexu.io）"
sourceId: "09-harness/harness-engineering-guide-nexu"
sourceTitle: "Harness Engineering 指南（nexu.io）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/nexu-io/harness-engineering-guide"
entryUrl: "https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/README.md"
zh: ""
---

# Harness Engineering 指南（nexu.io）

<em>The practical guide to building AI agent harnesses — with real code examples you can copy and run.</em>

  
  

  🌐 <b><a href="https://harness-guide.com">harness-guide.com</a></b> | <a href="https://harness-guide.com/zh/">中文站</a>

  <b>English</b> | <a href="https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/README.zh-CN.md">中文</a>

---

A **harness** is the runtime wrapper that turns a bare language model into an **agent** — an autonomous system that can perceive its environment, make decisions, and take actions over multiple steps. The harness handles everything the model can't do on its own: executing tools, managing memory, assembling context, and enforcing safety boundaries.

This guide covers harness engineering from first principles to production patterns, with real code in every article.

---

## Getting Started

| Topic | Description |
|-------|-------------|
| [What is a Harness?](https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/guide/what-is-harness.md) | The concept in 3 minutes. How it turns a model into an agent. Harness vs. framework vs. runtime. |
| [Your First Harness](https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/guide/your-first-harness.md) | Build a working harness in 50 lines of Python. Complete code you can copy and run. |
| [Harness vs. Framework](/lib/09-harness/harness-engineering-guide-nexu/guide-harness-vs-framework) | When to use a raw harness vs. LangChain/CrewAI. Decision tree + side-by-side code comparison. |

## Core Concepts

| Topic | Description |
|-------|-------------|
| [Agentic Loop](/lib/09-harness/harness-engineering-guide-nexu/guide-agentic-loop) | The think → act → observe cycle. Turn budgets, parallel tool calls, loop detection, streaming. |
| [Tool System](https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/guide/tool-system.md) | Tool registry, static vs. dynamic loading, MCP protocol, description quality patterns. |
| [Memory & Context](/lib/09-harness/harness-engineering-guide-nexu/guide-memory-and-context) | Context assembly, session management, two-tier memory (daily logs + long-term). AGENTS.md and MEMORY.md patterns. |
| [Guardrails](/lib/09-harness/harness-engineering-guide-nexu/guide-guardrails) | Permission models, trust boundaries, sandboxing, prompt injection defense. |

## Practice

| Topic | Description |
|-------|-------------|
| [Context Engineering](/lib/09-harness/harness-engineering-guide-nexu/guide-context-engineering) | Priority-based assembly, three lines of defense for compression, token budgeting. |
| [Sandbox](/lib/09-harness/harness-engineering-guide-nexu/guide-sandbox) | Docker and Firecracker setups, network isolation, filesystem restrictions. |
| [Skill System](https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/guide/skill-system.md) | Skill packaging, on-demand loading, SKILL.md format, thin harness + thick skills. |
| [Sub-Agent](https://github.com/nexu-io/harness-engineering-guide/blob/86fec9bea430cecb29ff10afaae36b96496a8f8e/guide/sub-agent.md) | Leader-Worker pattern, file-based communication, session isolation, parallel execution. |
| [Error Handling](/lib/09-harness/harness-engineering-guide-nexu/guide-error-handling) | Error classification, retry strategies, graceful degradation, checkpoint/resume. |
| [Multi-Agent Orchestration](/lib/09-harness/harness-engineering-guide-nexu/guide-multi-agent-orchestration) | Orchestration patterns (pipeline, fan-out, supervisor), context isolation, real-world examples (Multica, Paseo, OpenClaw). |
| [Scheduling & Automation](/lib/09-harness/harness-engineering-guide-nexu/guide-scheduling-and-automation) | Cron, heartbeats, event triggers. Session targeting, delivery, LangSmith vs harness-native comparison. |
| [Long-Running Harness Design](/lib/09-harness/harness-engineering-guide-nexu/guide-long-running-harness) | Context anxiety, self-evaluation bias, context reset vs compaction, GAN-inspired generator-evaluator architecture. |
| [Managed Agents Architecture](/lib/09-harness/harness-engineering-guide-nexu/guide-managed-agents-architecture) | Brain/hands/session decoupling, pets vs cattle, credential isolation, TTFT improvements. |
| [Eval Infrastructure Noise](/lib/09-harness/harness-engineering-guide-nexu/guide-eval-infrastructure) | Resource config swings benchmark scores by 6pp. Floor+ceiling enforcement strategy. |
| [Classifier-Based Permissions](/lib/09-harness/harness-engineering-guide-nexu/guide-classifier-permissions) | Replace approval fatigue with model-based classifiers. Two-layer defense, four threat models, reasoning-blind design. |
| [Eval Awareness](/lib/09-harness/harness-engineering-guide-nexu/guide-eval-awareness) | When agents recognize they're being tested. Novel contamination, multi-agent amplification, harness defenses. |
| [Agent Teams](/lib/09-harness/harness-engineering-guide-nexu/guide-agent-teams) | 16 parallel Claudes built a 100K-line C compiler. Ralph-loop, git-based coordination, GCC-as-oracle bisection. |
| [Initializer + Coding Agent Pattern](/lib/09-harness/harness-engineering-guide-nexu/guide-initializer-coding-pattern) | Two-phase harness for long-running agents. Feature list JSON, startup ritual, clean state commit. |

## Reference

| Topic | Description |
|-------|-------------|
| [Implementation Comparison](/lib/09-harness/harness-engineering-guide-nexu/guide-comparison) | Side-by-side comparison of OpenClaw, Claude Code, Codex, Cline, Aider, Cursor. |
| [Glossary](/lib/09-harness/harness-engineering-guide-nexu/guide-glossary) | Key terms defined. |

## Showcase

| Topic | Description |
|-------|-------------|
| [Shipping Our Windows Client](/lib/09-harness/harness-engineering-guide-nexu/guide-nexu-windows-packaging) | Build time 15min→4min, install time 10min→2min. How we rebuilt the Electron packaging pipeline. |
| [Ghost Account Hunting](/lib/09-harness/harness-engineering-guide-nexu/guide-ghost-account-hunting) | 1000+ ghost accounts drained our platform in 15 days. The full post-mortem. |

---

## How to Contribute

1. Go to [**Issues → New Issue**](https://github.com/nexu-io/harness-engineering-guide/issues/new/choose)
2. Choose **"📬 Submit a Resource"**
3. Fill in the title, URL, and why it's relevant

---

## Community

- 💬 **GitHub Discussions** — [Join the conversation](https://github.com/nexu-io/harness-engineering-guide/discussions)
- 🐦 **Twitter** — [@nexudotio](https://x.com/nexudotio)
- 💬 **飞书群** — [加入 Harness Engineering 话题群](https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=717g465a-0bc8-4242-9281-12b23953491a)

---

## About

Maintained by [Nexu](https://github.com/nexu-io) — the open-source Claude Co-worker & Managed Agent platform.
