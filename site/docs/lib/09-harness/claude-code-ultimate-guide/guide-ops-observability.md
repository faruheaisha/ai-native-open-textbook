---
title: "Session Observability & Monitoring"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ops/observability.md"
sourceRel: "guide/ops/observability.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ops/observability.md"
sourceSha256: "006e90d4617665c6a5751340009f48a38ce8cac742795be50b1cb4d95b4fcdb4"
pageSha256: "006e90d4617665c6a5751340009f48a38ce8cac742795be50b1cb4d95b4fcdb4"
contentMode: "local-full"
zh: ""
---

# Session Observability & Monitoring

> Track Claude Code usage, estimate costs, and identify patterns across your development sessions.

For systems with explicit loops or workflow graphs, instrument the decision layer as well as the model and tools. [Loop & Graph Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-loop-graph-engineering#7-observe-and-evaluate-the-system) defines the minimum evidence for routes, state transitions, checkpoints, verdicts, and human overrides.

## Table of Contents

1. [Why Monitor Sessions](#why-monitor-sessions)
2. [Session Search & Resume](#session-search--resume)
3. [Setting Up Session Logging](#setting-up-session-logging)
4. [Analyzing Session Data](#analyzing-session-data)
5. [Cost Tracking](#cost-tracking)
6. [Activity Monitoring](#activity-monitoring)
7. [External Monitoring Tools](#external-monitoring-tools)
8. [Proxying Claude Code](#proxying-claude-code)
9. [Patterns & Best Practices](#patterns--best-practices)
10. [Limitations](#limitations)

---

## Why Monitor Sessions

Claude Code usage can accumulate quickly, especially in active development. Monitoring helps you:

- **Understand costs**: Estimate API spend before invoices arrive
- **Identify patterns**: See which tools you use most, which files get edited repeatedly
- **Optimize workflow**: Find inefficiencies (e.g., repeatedly reading the same large file)
- **Track projects**: Compare usage across different codebases
- **Team visibility**: Aggregate usage for team budgeting (when combining logs)

---

## Observability by Harness Layer

Capture evidence at the layer that made the decision. A runtime harness needs traces of model calls, tool calls, permissions, context, and recovery. A repository harness needs the setup command, changed artifact, and verification result. An orchestrator needs dispatch, handoff, retry, queue, and human-escalation events. A dashboard that reports only tokens cannot establish whether the loop or its delivery gates behaved correctly.

The [Agent Harness Map](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agent-harness-landscape/index) separates loop-owning runtimes from the broader directory of frameworks and control-plane-adjacent projects. [Agent Harness Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index) explains those layers, while [Agent Evaluation](/lib/09-harness/claude-code-ultimate-guide/guide-roles-agent-evaluation) defines the measures to score them. Apply [Security Hardening](/lib/09-harness/claude-code-ultimate-guide/guide-security-security-hardening/index) before exporting traces or granting a monitoring tool access. The [glossary](/lib/09-harness/claude-code-ultimate-guide/guide-core-glossary) keeps the terms consistent.

Use stable event names and version every harness field that can change behavior. The [OpenTelemetry generative AI attribute registry](https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/) defines attributes for agent, model, provider, operation, request, response, token, and tool data. Treat prompt text, tool arguments, tool results, file paths, and user identifiers as sensitive payloads: redact or hash them before export, and document which fields were dropped.

An optimizer needs a second trace level. Link each candidate harness version to its parent, mutation, evaluation tasks, budget, scores, and promotion decision. Without that lineage, a higher final score cannot establish which change caused it or whether the candidate consumed more search and execution budget.

### Graph-Level Observability

A graph-based workflow needs more than model and tool spans. The trace must reconstruct why work moved, waited, repeated, or stopped.

| Field | Question it answers |
|-------|---------------------|
| `graph.version`, `policy.version` | Which executable topology and control policy governed the run? |
| `node.id`, `edge.id`, `route.reason` | Which branch ran, and why was it selected? |
| `state.before`, `state.after` | What changed at the transition boundary? |
| `join.expected`, `join.received`, `join.wait_ms` | Was parallel work complete, missing, or blocked? |
| `retry.count`, `interrupt.reason`, `resume.from` | Did recovery repeat work or resume from a checkpoint? |
| `reviewer.model`, `reviewer.provider`, `evidence.refs` | How independent and evidence-backed was the verdict? |
| `human.checkpoint`, `human.wait_ms`, `verdict.overturned` | Where did judgment return to a person, and with what effect? |

The official [LangGraph Graph API](https://docs.langchain.com/oss/python/langgraph/graph-api) exposes state, nodes, edges, conditional routing, parallel super-steps, and runtime metadata. Its [persistence model](https://docs.langchain.com/oss/python/langgraph/persistence) adds checkpoints, replay, human-in-the-loop interruption, and fault recovery. Those are traceable events, not merely implementation details.

Liza illustrates the same need in a coding control plane. Its pinned [architectural issues ledger](https://github.com/liza-mas/liza/blob/a22c12381c5d884d2586a48aaaa517bca184f9cf/specs/architecture/architectural-issues.md) identifies manual checkpoint latency, cross-pair review, provider-diversity gaps, and unmeasured reviewer accuracy as open concerns. Tokens and task status alone cannot expose those failure modes. Record routing, quorum composition, review evidence, wait time, and verdict outcomes separately.

---

## Session Search & Resume

After weeks of using Claude Code, finding past conversations becomes challenging. This section covers native options and community tools.

### Native Commands

| Command | Use Case |
|---------|----------|
| `claude -c` / `claude --continue` | Resume most recent session |
| `claude -r <id>` / `claude --resume <id>` | Resume specific session by ID |
| `claude --resume` | Interactive session picker |

Sessions are stored locally at `~/.claude/projects/<project>/` as JSONL files.

### Community Tools Comparison

| Tool | Install | List Speed | Search Speed | Dependencies | Resume Command |
|------|---------|------------|--------------|--------------|----------------|
| **session-search.sh** (this repo) | Copy script | **10ms** | **400ms** | None (bash) | ✅ Displayed |
| claude-conversation-extractor | `pip install` | 230ms | 1.7s | Python | ❌ |
| claude-code-transcripts | `uvx` | N/A | N/A | Python | ❌ |
| ran CLI | `npm -g` | N/A | Fast | Node.js | ❌ (commands only) |

### Recommended: session-search.sh

Zero-dependency bash script optimized for speed with ready-to-use resume commands.

**Install:**
```bash
cp examples/scripts/session-search.sh ~/.claude/scripts/cs
chmod +x ~/.claude/scripts/cs
echo "alias cs='~/.claude/scripts/cs'" >> ~/.zshrc
source ~/.zshrc
```

**Usage:**
```bash
cs                          # List 10 most recent sessions (~15ms)
cs "authentication"         # Single keyword search (~400ms)
cs "Prisma migration"       # Multi-word AND search (both must match)
cs -n 20                    # Show 20 results
cs -p myproject "bug"       # Filter by project name
cs --since 7d               # Sessions from last 7 days
cs --since today            # Today's sessions only
cs --json "api" | jq .      # JSON output for scripting
cs --rebuild                # Force index rebuild
```

**Output:**
```
2026-01-15 08:32 │ my-project             │ Implement OAuth flow for...
  claude --resume 84287c0d-8778-4a8d-abf1-eb2807e327a8

2026-01-14 21:13 │ other-project          │ Fix database migration...
  claude --resume 1340c42e-eac5-4181-8407-cc76e1a76219
```

Copy-paste the `claude --resume` command to continue any session.

### How It Works

1. **Index mode** (no filters): Uses cached TSV index. Auto-refreshes when sessions change. ~15ms lookup.
2. **Search mode** (with keyword/filters): Full-text search with 3s timeout. Multi-word queries use AND logic.
3. **Filters**: `--project` (substring match), `--since` (supports `today`, `yesterday`, `7d`, `YYYY-MM-DD`)
4. **Output**: Human-readable by default, `--json` for scripting. Excludes agent/subagent sessions.

### Alternative: Python Tools

If you prefer richer features (HTML export, multiple formats):

```bash
# Install
pip install claude-conversation-extractor

# Interactive UI
claude-start

# Direct search
claude-search "keyword"

# Export to markdown
claude-extract --format markdown
```

See [session-search.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/session-search.sh) for the complete script.

---

### Session Resume Limitations & Cross-Folder Migration

**TL;DR**: Native `--resume` is limited to the current working directory by design. For cross-folder migration, use manual filesystem operations (recommended) or community automation tools (untested).

#### Why Resume is Directory-Scoped
