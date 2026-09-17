---
title: "Configuring Agents as MCP Clients"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/units/en/unit2/mcp-clients.mdx"
sourceRel: "units/en/unit2/mcp-clients.mdx"
rawUrl: "/raw/10-context-memory/hf-context-course/units/en/unit2/mcp-clients.mdx"
sourceSha256: "21aea9c31421eadeda6fd6ec1dabb8d55e5d31c367ab56ff9d3e1801771936b2"
pageSha256: "21aea9c31421eadeda6fd6ec1dabb8d55e5d31c367ab56ff9d3e1801771936b2"
contentMode: "local-full"
zh: ""
---

# Configuring Agents as MCP Clients

Claude Code, Codex, and OpenCode are all MCP clients. Your job is to tell each one which servers to connect to and how.

## How Code Agents Act as MCP Clients

Once an MCP server is configured, the agent connects to it, discovers which tools and resources it exposes, and treats them like built-in capabilities. The agent's MCP client handles discovery, request routing, and errors behind the scenes.

## Adding an MCP Server

Use the `claude mcp add` command. Options must come before the server name:

**Stdio (local) server:**
```bash
claude mcp add --transport stdio <name> -- <command> [args]
```

**HTTP (remote) server:**
```bash
claude mcp add --transport http <name> <url>
```

**Examples:**
```bash
# Local Python server
claude mcp add --transport stdio calculator -- python /path/to/server.py

# Remote HTTP server
claude mcp add --transport http my-api https://api.example.com/mcp

# With scope and env vars
claude mcp add --transport stdio --scope user --env API_KEY=xxx github -- npx -y @modelcontextprotocol/server-github
```

Use the `codex mcp add` command or edit `config.toml` directly:

**CLI:**
```bash
codex mcp add <name> --env VAR=VALUE -- <command> [args]
```

**config.toml** (at `~/.codex/config.toml` or `.codex/config.toml`):

```toml
# Stdio server
[mcp_servers.calculator]
command = "python"
args = ["/path/to/server.py"]

# HTTP server
[mcp_servers.my-api]
url = "https://api.example.com/mcp"

# With env vars
[mcp_servers.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]

[mcp_servers.github.env]
GITHUB_TOKEN = "ghp_xxxxx"
```

Edit `opencode.json` in your project root:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "calculator": {
      "type": "local",
      "command": ["python", "/path/to/server.py"]
    },
    "my-api": {
      "type": "remote",
      "url": "https://api.example.com/mcp"
    },
    "github": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-github"],
      "environment": {
        "GITHUB_TOKEN": "ghp_xxxxx"
      }
    }
  }
}
```

Pi uses the `pi-mcp-adapter` package rather than a built-in MCP client.

Install once:

```bash
pi install npm:pi-mcp-adapter
```

Then add servers to `.mcp.json` (project) or `~/.config/mcp/mcp.json` (shared user config):

```json
{
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["/path/to/server.py"]
    },
    "my-api": {
      "url": "https://api.example.com/mcp"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxx"
      }
    }
  }
}
```

## Managing Servers

```bash
# List all configured servers
claude mcp list

# Get details for a specific server
claude mcp get <name>

# Remove a server
claude mcp remove <name>

# Check status in-session
/mcp
```

```bash
# View active servers in-session
/mcp
```

You can also edit `~/.codex/config.toml` directly. Set `enabled = false` to temporarily disable a server without removing it:

```toml
[mcp_servers.my-api]
url = "https://api.example.com/mcp"
enabled = false
```

```bash
# List all servers and auth status
opencode mcp list

# Debug connection issues
opencode mcp debug <name>

# Authenticate with a server
opencode mcp auth <name>

# Remove stored credentials
opencode mcp logout <name>
```

Set `"enabled": false` in `opencode.json` to disable a server without removing it.

```text
/mcp
/mcp tools
/mcp reconnect
/mcp reconnect <server>
/mcp-auth <server>
```

Use `/mcp` for the interactive panel, `/mcp tools` to list discovered tools, and `/mcp reconnect` when a lazy-loaded server needs to be reconnected.

## Configuration Scopes

Claude Code supports three scopes, controlled with the `--scope` flag:

- **`local`** (default) — Current project only, private to you (stored in `~/.claude.json`)
- **`project`** — Shared with team via version control (stored in `.mcp.json` at project root)
- **`user`** — Available across all your projects (stored in `~/.claude.json`)

```bash
# Add at user scope (available everywhere)
claude mcp add --transport http --scope user my-api https://api.example.com/mcp

# Add at project scope (shared with team)
claude mcp add --transport http --scope project my-api https://api.example.com/mcp
```

Codex supports two scopes:

- **Global** — `~/.codex/config.toml` (applies to all projects)
- **Project** — `.codex/config.toml` (project-scoped, only in trusted projects)

The CLI and IDE extension share this configuration.

OpenCode supports two scopes:

- **Project** — `opencode.json` in the project root
- **Organization** — Default servers from `.well-known/opencode` endpoint, which users can opt into

Local config values override remote organization defaults.

With `pi-mcp-adapter`, config can live at four levels:

- **Shared user** — `~/.config/mcp/mcp.json`
- **Pi user override** — `~/.pi/agent/mcp.json`
- **Shared project** — `.mcp.json`
- **Pi project override** — `.pi/mcp.json`

Project files override user-global files. Prefer `.mcp.json` for repo-shared config and `.pi/mcp.json` only when you need a Pi-specific override.

## Transport Types

All three agents support two primary transports:

- **Stdio** — Local subprocess communication via stdin/stdout. Best for development servers and tools that need direct system access.
- **Streamable HTTP** — Remote connections over HTTP. The current standard for cloud-deployed servers. Works across the internet and through firewalls.

SSE (Server-Sent Events) is a legacy transport that is deprecated but still supported for backward compatibility.

## The Hugging Face MCP Ecosystem

Hugging Face provides official MCP servers for Hub integration. Configure them in any MCP-compatible agent:

```bash
claude mcp add --transport http --scope user hf-mcp "https://huggingface.co/mcp?login"
```

```toml
# In ~/.codex/config.toml
[mcp_servers.hf-mcp]
url = "https://huggingface.co/mcp?login"
```

```json
{
  "mcp": {
    "hf-mcp": {
      "type": "remote",
      "url": "https://huggingface.co/mcp?login"
    }
  }
}
```

```json
{
  "mcpServers": {
    "hf-mcp": {
      "url": "https://huggingface.co/mcp?login"
    }
  }
}
```

The HF MCP server gives agents access to searching for models and datasets, reading repository files, querying model cards, and browsing Hub content.

> [!TIP]
> Visit huggingface.co/settings/mcp to see official MCP servers and configuration examples for your agent.

## Configuring Remote MCP Servers

For servers deployed to Hugging Face Spaces or other cloud platforms, use Streamable HTTP:

```bash
claude mcp add --transport http --scope user sentiment-analyzer https://username-sentiment.hf.space/mcp

claude mcp add --transport http --scope user code-reviewer https://username-reviewer.hf.space/mcp
```

```toml
# In ~/.codex/config.toml
[mcp_servers.sentiment-analyzer]
url = "https://username-sentiment.hf.space/mcp"

[mcp_servers.code-reviewer]
url = "https://username-reviewer.hf.space/mcp"
```

```json
{
  "mcp": {
    "sentiment-analyzer": {
      "type": "remote",
      "url": "https://username-sentiment.hf.space/mcp"
    },
    "code-reviewer": {
      "type": "remote",
      "url": "https://username-reviewer.hf.space/mcp"
    }
  }
}
```

```json
{
  "mcpServers": {
    "sentiment-analyzer": {
      "url": "https://username-sentiment.hf.space/mcp"
    },
    "code-reviewer": {
      "url": "https://username-reviewer.hf.space/mcp"
    }
  }
}
```

Remote servers via Streamable HTTP don't require restarting your agent, work across the internet and firewalls, can be updated independently, and support optional authentication via headers.

## Debugging MCP Configurations

If a server isn't working, check these things:

**1. List configured servers:**

```bash
claude mcp list
