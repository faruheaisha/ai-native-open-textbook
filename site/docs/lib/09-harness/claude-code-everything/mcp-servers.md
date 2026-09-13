---
title: "MCP Servers Documentation"
sourceId: "09-harness/claude-code-everything"
sourceTitle: "Claude Code Everything You Need to Know"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know"
entryUrl: "https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know/blob/d9e93740193aeae2cd661c7ddf6f0c8f8989860b/README.md"
zh: ""
---

# MCP Servers Documentation

## Overview

This directory contains comprehensive documentation for the four core Model Context Protocol (MCP) servers that enhance Claude Code's capabilities.

---

## Available Servers

| Server | Purpose | Key Features | Documentation |
|--------|---------|--------------|---------------|
| **Serena** | Semantic code intelligence | • Wide language support via LSP<br>• Symbol-level navigation<br>• Project indexing<br>• Context-aware editing | [serena.md](/lib/09-harness/claude-code-everything/mcp-servers-serena) |
| **Sequential Thinking** | Advanced reasoning | • Problem decomposition<br>• Multi-step planning<br>• Structured analysis<br>• Decision support | [sequential-thinking.md](/lib/09-harness/claude-code-everything/mcp-servers-sequential-thinking) |
| **Memory** | Persistent context | • Cross-session memory<br>• Project preferences<br>• Historical context<br>• Knowledge retention | [memory.md](/lib/09-harness/claude-code-everything/mcp-servers-memory) |
| **Playwright** | Browser automation | • Web scraping<br>• Automated testing<br>• Screenshot capture<br>• Device emulation | [playwright.md](/lib/09-harness/claude-code-everything/mcp-servers-playwright) |

> **Tip:** Keep only 3–6 MCP servers active at a time — every connected server adds tools to Claude's context.

---

## Server Comparison

### By Use Case

#### Code Development
- **Serena**: Deep codebase understanding and navigation
- **Sequential Thinking**: Planning complex implementations
- **Memory**: Remember project patterns and preferences

#### Web Automation
- **Playwright**: Browser control and testing
- **Memory**: Store authentication and workflow preferences

#### Research & Analysis
- **Serena**: Analyze code structure and dependencies
- **Sequential Thinking**: Break down complex problems
- **Playwright**: Gather web data

---

## Server Synergies

### Powerful Combinations

**1. Serena + Sequential Thinking**
```
Use case: Complex refactoring projects
- Sequential Thinking breaks down the approach
- Serena navigates and modifies code intelligently
```

**2. Memory + All Servers**
```
Use case: Enhanced context awareness
- Memory stores project conventions
- Other servers leverage this knowledge
```

**3. Playwright + Memory**
```
Use case: Automated testing workflows
- Playwright executes browser automation
- Memory remembers test patterns and credentials
```

**4. All Four Together**
```
Use case: Full-stack development
- Serena for backend code intelligence
- Playwright for frontend testing
- Sequential Thinking for planning
- Memory for project knowledge
```

---

## Getting Started

### Prerequisites

Before installing MCP servers, ensure the following tools are installed:

| Tool | Required By | Installation |
|------|-------------|--------------|
| **Node.js & npx** | Sequential Thinking, Memory, Playwright | [nodejs.org](https://nodejs.org/) |
| **uv & uvx** | Serena | [Install uv](https://docs.astral.sh/uv/getting-started/installation/) |
| **Claude Code CLI** | All servers | [Claude Code Docs](https://code.claude.com/docs) |

#### Verify Prerequisites

Run the following commands to check installations:

```bash
node --version
npx --version
uv --version
uvx --version
claude --version
```

> **Note:** All commands should return version numbers. If any command fails, install the missing prerequisite.

---

## MCP registry & ecosystem

### Official MCP Registry

The **[MCP Registry](https://registry.modelcontextprotocol.io/)** is the official directory for discovering MCP servers. It is currently **in preview**.

**How it works:**
- Servers are published under reverse-DNS namespaces (e.g., `io.github.username/server-name`)
- Namespace ownership is verified via GitHub, DNS, or HTTP
- The registry serves as the source of truth for downstream aggregators and marketplaces

**Discovering New Servers:**
1. Visit https://registry.modelcontextprotocol.io/
2. Search for the server you need
3. Copy installation command for Claude Code CLI
4. Install with `claude mcp add`

**Popular Server Categories:**
- **Code Intelligence**: Serena, GitHub, GitLab integrations
- **Databases**: PostgreSQL, SQLite, MongoDB servers
- **Browser Automation**: Playwright, Puppeteer
- **AI & ML**: Sequential Thinking, Memory, various AI tool integrations
- **APIs & Services**: REST clients, GraphQL, authentication servers

**Ecosystem scale** (as of December 2025): 97M+ monthly SDK downloads and roughly 10,000 active servers ([source](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/)).

### Current MCP protocol features

The current ratified spec revision is **2025-11-25**, which added:
- **OIDC discovery** for authorization
- **Icons** for servers and their tools
- **URL elicitation** for gathering user input
- **Sampling tool calls**
- **OAuth Client ID Metadata Documents**
- **Experimental tasks**

**MCP Apps** — interactive HTML UIs rendered in sandboxed iframes — became the first official MCP extension on January 26, 2026 ([announcement](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)).

**Coming up:** a release candidate for the next spec revision — the largest since MCP launched — finalizes on **July 28, 2026**. It introduces a stateless core and official extensions ([release candidate](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)).

### Agentic AI Foundation

Since December 9, 2025, MCP has been governed by the **Agentic AI Foundation (AAIF)**, a directed fund under the Linux Foundation. Its founding projects are MCP, Block's goose, and OpenAI's AGENTS.md, with platinum members including AWS, Google, Microsoft, and Cloudflare. This ensures:
- Open governance and community-driven development
- Vendor-neutral standardization
- Long-term sustainability

---

### Installation

MCP servers can be installed in two scopes:
- **Global (`-s user`)**: Available across all projects (recommended for everyday use)
- **Local (`-s local`)**: Project-specific installations (useful for testing)

#### Global Installation (Recommended)

Install servers globally to use them across all your projects:

```bash
# Serena - Semantic code intelligence
claude mcp add serena -s user -- uvx --from git+https://github.com/oraios/serena serena start-mcp-server

# Sequential Thinking - Step-by-step reasoning
claude mcp add sequential-thinking -s user -- npx -y @modelcontextprotocol/server-sequential-thinking

# Memory - Persistent context across sessions
claude mcp add memory -s user -- npx -y @modelcontextprotocol/server-memory

# Playwright - Browser automation
claude mcp add playwright -s user -- npx -y @playwright/mcp@latest
```

#### Local Installation (Project-Specific)

Install servers for a specific project only:

```bash
# Serena
claude mcp add serena -s local -- uvx --from git+https://github.com/oraios/serena serena start-mcp-server

# Sequential Thinking
claude mcp add sequential-thinking -s local -- npx -y @modelcontextprotocol/server-sequential-thinking

# Memory
claude mcp add memory -s local -- npx -y @modelcontextprotocol/server-memory

# Playwright
claude mcp add playwright -s local -- npx -y @playwright/mcp@latest
```

#### Verify Installation

After installing MCP servers, verify they are connected:

```bash
claude mcp list
```

**Expected output:**

```
Checking MCP server health...
sequential-thinking: ✓ Connected
serena: ✓ Connected
memory: ✓ Connected
playwright: ✓ Connected
```

> **Tip:** If a server shows as disconnected, try removing and reinstalling it, or see the [Troubleshooting section](#troubleshooting).

### Server-Specific Documentation

- **[Serena](/lib/09-harness/claude-code-everything/mcp-servers-serena)** - For code-heavy projects
- **[Sequential Thinking](/lib/09-harness/claude-code-everything/mcp-servers-sequential-thinking)** - For complex problem-solving
- **[Memory](/lib/09-harness/claude-code-everything/mcp-servers-memory)** - For persistent project knowledge
- **[Playwright](/lib/09-harness/claude-code-everything/mcp-servers-playwright)** - For web automation needs

---

## Installation Scopes

### Global (`-s user`)
- Available across all projects
- Recommended for everyday use
- Single installation, universal access

### Local (`-s local`)
- Project-specific configuration
- Useful for testing
- Isolated from other projects

---

## Troubleshooting

Having issues with MCP server installation or connection? This section covers common problems and their solutions.

### General Troubleshooting

#### Server Shows "Failed to connect"

**Step 1: Verify Prerequisites**

```bash
node --version
npx --version
uv --version
uvx --version
```

All commands should return version numbers. Install any missing prerequisites.

**Step 2: Remove and Reinstall Server**

```bash
