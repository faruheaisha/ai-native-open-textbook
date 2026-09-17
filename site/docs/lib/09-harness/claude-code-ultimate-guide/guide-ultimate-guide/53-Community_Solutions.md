---
title: "4. Agents"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "6a1e95a6bc0081b5dae06472d3ccf80d316e2cc688c568a756f50a9ac7df115f"
contentMode: "local-full"
zh: ""
---

# 4. Agents

_Quick jump:_ [What Are Agents](#41-what-are-agents) · [Creating Custom Agents](#42-creating-custom-agents) · [Agent Template](#43-agent-template) · [Best Practices](#44-best-practices) · [Agent Examples](#45-agent-examples)

---

## 📌 Section 4 TL;DR (60 seconds)

**What are Agents**: Specialized AI personas for specific tasks (think "expert consultants")

**When to create one**:
- ✅ Task repeats often (security reviews, API design)
- ✅ Requires specialized knowledge domain
- ✅ Needs consistent behavior/tone
- ❌ One-off tasks (just ask Claude directly)

**Quick Start**:
1. Create `.claude/agents/my-agent.md`
2. Add YAML frontmatter (name, description, tools, model)
3. Write instructions
4. Use: `@my-agent "task description"`

**Popular agent types**: Security auditor, Test generator, Code reviewer, API designer

**Read this section if**: You have repeating tasks or need domain expertise
**Skip if**: All your tasks are one-off exploratory work

---

**Reading time**: 20 minutes
**Skill level**: Week 1-2
**Goal**: Create specialized AI assistants

## 4.1 What Are Agents

Agents are specialized sub-processes that Claude can delegate tasks to.

### Why Use Agents?

| Without Agents | With Agents |
|----------------|-------------|
| One Claude doing everything | Specialized experts for each domain |
| Context gets cluttered | Each agent has focused context |
| Generic responses | Domain-specific expertise |
| Manual tool selection | Pre-configured tool access |

### Agent vs Direct Prompt

```
Direct Prompt:
You: Review this code for security issues, focusing on OWASP Top 10,
     checking for SQL injection, XSS, CSRF, and authentication vulnerabilities...

With Agent:
You: Use the security-reviewer agent to audit this code
```

The agent encapsulates all that expertise.

### Built-in vs Custom Agents

| Type | Source | Example |
|------|--------|---------|
| Built-in | Claude Code default | Explore, Plan |
| Custom | Your `.claude/agents/` | Backend architect, Code reviewer |

## 4.2 Creating Custom Agents

Agents are markdown files in `.claude/agents/` with YAML frontmatter.

### Agent File Structure

```markdown
---
name: agent-name
description: Clear activation trigger (50-100 chars)
model: sonnet
tools: Read, Write, Edit, Bash, Grep, Glob
---

[Markdown instructions for the agent]
```

### Frontmatter Fields

All official fields supported by Claude Code ([source](https://code.claude.com/docs/en/sub-agents)):

| Field | Required | Description |
|-------|----------|-------------|
| `name` | ✅ | Kebab-case identifier |
| `description` | ✅ | When to activate this agent (use "PROACTIVELY" for auto-invocation) |
| `model` | ❌ | `sonnet` (default), `opus`, `haiku`, or `inherit` |
| `tools` | ❌ | Allowed tools (comma-separated). Supports `Task(agent_type)` syntax to restrict spawnable subagents |
| `disallowedTools` | ❌ | Tools to deny, removed from inherited or specified list |
| `permissionMode` | ❌ | `default`, `acceptEdits`, `dontAsk`, `bypassPermissions`, or `plan` |
| `maxTurns` | ❌ | Maximum agentic turns before the subagent stops |
| `skills` | ❌ | Skills to preload into agent context at startup (full content injected, not just available) |
| `mcpServers` | ❌ | MCP servers for this subagent: server name strings or inline configs |
| `hooks` | ❌ | Lifecycle hooks scoped to this subagent (`PreToolUse`, `PostToolUse`, `Stop`) |
| `memory` | ❌ | Persistent memory scope: `user`, `project`, or `local` |
| `background` | ❌ | `true` to always run as a background task (default: `false`) |
| `isolation` | ❌ | `worktree` to run in a temporary git worktree (auto-cleaned if no changes) |
| `color` | ❌ | CLI output color for visual distinction (e.g., `green`, `magenta`) |

**Memory scopes**: pick the scope based on how broadly the knowledge should apply:

| Scope | Storage | Use when |
|-------|---------|----------|
| `user` | `~/.claude/agent-memory/<name>/` | Cross-project learning |
| `project` | `.claude/agent-memory/<name>/` | Project-specific, shareable via git |
| `local` | `.claude/agent-memory-local/<name>/` | Project-specific, not committed |

> Full coverage of agent memory (200-line injection limit, MEMORY.md structure, scope selection guide) in [§4.5 Agent Memory](#45-agent-memory).

### Model Selection

| Model | Best For | Speed | Cost |
|-------|----------|-------|------|
| `haiku` | Quick tasks, simple changes | Fast | Low |
| `sonnet` | Most tasks (default) | Balanced | Medium |
| `opus` | Complex reasoning, architecture | Slow | High |

## 4.3 Agent Template

Copy this template to create your own agent:

```markdown
---
name: your-agent-name
description: Use this agent when [specific trigger description]
model: sonnet
tools: Read, Write, Edit, Bash, Grep, Glob
skills: []
---

# Your Agent Name

## Role Definition

You are an expert in [domain]. Your responsibilities include:
- [Responsibility 1]
- [Responsibility 2]
- [Responsibility 3]

## Activation Triggers

Use this agent when:
- [Trigger 1]
- [Trigger 2]
- [Trigger 3]

## Methodology

When given a task, you should:
1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Step 4]

## Output Format

Your deliverables should include:
- [Output 1]
- [Output 2]

## Constraints

- [Constraint 1]
- [Constraint 2]

## Examples

### Example 1: [Scenario Name]

**User**: [Example prompt]

**Your approach**:
1. [What you do first]
2. [What you do next]
3. [Final output]
```

## 4.4 Best Practices

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Make agents specialists | Create generalist agents |
| Define clear triggers | Use vague descriptions |
| Include concrete examples | Leave activation ambiguous |
| Limit tool access | Give all tools to all agents |
| Compose via skills | Duplicate expertise |

### Specialization Over Generalization

**Good**: An agent for each concern
```
backend-architect    → API design, database, performance
security-reviewer    → OWASP, auth, encryption
test-engineer        → Test strategy, coverage, TDD
```

**Bad**: One agent for everything
```
full-stack-expert    → Does everything (poorly)
```

### Explicit Activation Triggers

**Good description**:
```yaml
description: Use when designing APIs, reviewing database schemas, or optimizing backend performance
```

**Bad description**:
```yaml
description: Backend stuff
```

### Skill Composition

Instead of duplicating knowledge:

```yaml
# security-reviewer.md
skills:
  - security-guardian  # Inherits OWASP knowledge
```

### Agent Validation Checklist

Before deploying a custom agent, validate against these criteria:

**Efficacy** (Does it work?)
- [ ] Tested on 3+ real use cases from your project
- [ ] Output matches expected format consistently
- [ ] Handles edge cases gracefully (empty input, errors, timeouts)
- [ ] Integrates correctly with existing workflows

**Efficiency** (Is it cost-effective?)
- [ ] <5000 tokens per typical execution
- [ ] <30 seconds for standard tasks
- [ ] Doesn't duplicate work done by other agents/skills
- [ ] Justifies its existence vs. native Claude capabilities

**Security** (Is it safe?)
- [ ] Tools restricted to minimum necessary
- [ ] No Bash access unless absolutely required
- [ ] File access limited to relevant directories
- [ ] No credentials or secrets in agent definition

**Maintainability** (Will it last?)
- [ ] Clear, descriptive name and description
- [ ] Explicit activation triggers documented
- [ ] Examples show common usage patterns
- [ ] Version compatibility noted if framework-dependent

> 💡 **Rule of Three**: If an agent doesn't save significant time on at least 3 recurring tasks, it's probably over-engineering. Start with skills, graduate to agents only when complexity demands it.

> **Automated audit**: Run `/audit-agents-skills` for a comprehensive quality audit across all agents, skills, and commands. Scores each file on 16 criteria with weighted grading (32 points for agents/skills, 20 for commands). See `examples/skills/audit-agents-skills/` for the full scoring methodology.

### Background Subagents

Subagents can run in the background without blocking the main session. This is useful for fire-and-forget tasks like running tests, linting, or notifications.

| Mode | Behavior | Use when |
|------|----------|----------|
| Default | Parent waits for agent output | Need result before continuing |
| Background | Agent runs in parallel, parent continues | Fire-and-forget (tests, linting, notifications) |

**Managing background agents:**

```bash
# List running agents + kill overlay
ctrl+f    # Opens agent manager overlay

# Cancel main thread only (background agents keep running)
ESC
ctrl+c
```

## 4.5 Agent Memory

Introduced in **Claude Code v2.1.33** (February 2026), the `memory` frontmatter field gives subagents persistent, markdown-based knowledge that survives across sessions. Before this, every agent invocation started with a blank slate regardless of previous runs.

### Why Agent Memory Matters

Without memory, a code-reviewer agent that discovers your team prefers early-return patterns over nested `if` blocks has no way to carry that observation forward. The next invocation starts cold. Agent memory fixes this: the agent writes its findings to a structured file, and future invocations pick up where the last one left off.

This is distinct from the other memory systems in Claude Code. Each serves a different purpose:

| System | Written by | Read by | Scope | Persists |
|--------|------------|---------|-------|----------|
| **CLAUDE.md** | You (manually) | Main Claude + all agents | Project or global | Git-tracked |
| **Auto-memory** | Main Claude (automatic) | Main Claude only | Per-project per-user | Gitignored |
| **Agent memory** | The agent itself | That specific agent only | Configurable | Depends on scope |

An agent reads both `CLAUDE.md` (shared project context) and its own memory (agent-specific accumulated knowledge). The two layers are complementary.

### Memory Scopes

Choose a scope based on where the knowledge is useful:

| Scope | Storage location | Version controlled | Best for |
|-------|-----------------|-------------------|----------|
