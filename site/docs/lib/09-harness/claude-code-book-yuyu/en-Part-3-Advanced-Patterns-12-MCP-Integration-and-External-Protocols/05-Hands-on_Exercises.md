---
title: "御舆：解码 Agent Harness"
sourceId: "09-harness/claude-code-book-yuyu"
sourceTitle: "御舆：解码 Agent Harness"
sourceKind: "工程手册"
licenseLabel: "仅引用"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/lintsinghua/claude-code-book"
entryUrl: "https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-3-Advanced-Patterns/12-MCP-Integration-and-External-Protocols.md"
sourceRel: "en/Part-3-Advanced-Patterns/12-MCP-Integration-and-External-Protocols.md"
rawUrl: "/raw/09-harness/claude-code-book-yuyu/en/Part-3-Advanced-Patterns/12-MCP-Integration-and-External-Protocols.md"
sourceSha256: "3caa059d12b460674776e262e784e367d573cb11ccef9d217efc0a1ba03f0395"
pageSha256: "c552f4547a3bf9a4360cd60cbc516aa7e5de629e20f5f74ce3d15d9511cabfd5"
contentMode: "local-full"
zh: ""
---

## Hands-on Exercises

### Exercise 1: Configure a stdio-type MCP Server

Create `.mcp.json` in the project root directory:

```json
{
  "mcpServers": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"],
      "env": {}
    }
  }
}
```

After starting Claude Code, verify that the tools have loaded:
- Observe MCP connection status in the startup logs
- Try using tools with the `mcp__filesystem__*` prefix

**Advanced Challenge:**
- Modify `.mcp.json` to add custom environment variables for the filesystem server (e.g., restricting to read-only mode)
- Configure permission rules in `.claude/settings.local.json` to auto-allow `mcp__filesystem__read_file` while keeping a confirmation prompt for `mcp__filesystem__write_file`
- Test disabling the filesystem server after startup and observe how the tool list changes

### Exercise 2: Understand Tool Name Resolution

Based on the `mcp__\{server\}__\{tool\}` naming convention, analyze the following scenarios:
- What is the result of parsing `mcp__github__create_issue`?
- What input is needed to construct `mcp__my_server__read_file`?
- How will the tool name `mcp__my__special__tool` containing double underscores be parsed?

**Advanced Challenge:**
- If you simultaneously configure two servers named `github` and `git_hub`, and they provide identically named tools, how can you separately control them through permission configuration?
- In SDK mode (with `CLAUDE_AGENT_SDK_MCP_NO_PREFIX` set), if an MCP tool is named `Read`, how will it interact with the built-in Read tool?

### Exercise 3: Configure Enterprise-level MCP Security Policies

Set up allowlists and denylists in the enterprise management configuration:

```json
{
  "allowedMcpServers": [
    { "serverName": "approved-server" },
    { "serverCommand": ["npx", "-y", "@modelcontextprotocol/server-filesystem"] },
    { "serverUrl": "https://mcp.company.com/*" }
  ],
  "deniedMcpServers": [
    { "serverName": "dangerous-server" }
  ]
}
```

Test whether servers with different configurations are correctly allowed or blocked.

**Advanced Challenge:**
- Design a security policy that only allows internal company MCP servers (`*.company.com`) while blocking all external public servers
- Consider how to handle the case of "the same server being configured in different scopes" — if the enterprise configuration allows a server, but the local configuration has it on the denylist, what happens?

### Exercise 4: Multi-server Integration in Practice

Configure a complex environment with multiple MCP servers, simulating a real development workflow:

```json
{
  "mcpServers": {
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxx" }
    },
    "database": {
      "type": "sse",
      "url": "https://internal-mcp.company.com/database",
      "headers": { "Authorization": "Bearer internal-token" }
    },
    "docs": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": { "BRAVE_API_KEY": "BSA_xxxx" }
    }
  }
}
```

**Analysis Tasks:**
- What tools does each server register? What are the tools' fully qualified names?
- If the GitHub server fails to connect, will other servers be affected?
- How can you configure different permission levels for each server (e.g., full access for GitHub, read-only operations for the database)?

### Exercise 5: Understand Bridge Communication Flow

Analyze the Bridge communication behavior in the following scenarios:

**Scenario A**: The user sends the message "Fix all TypeScript errors" through the Claude Code extension in VS Code
1. How does the message travel from VS Code to the Claude CLI?
2. How does Claude Code call `getDiagnostics` to get error information?
3. After fixing the code, how is it applied in the IDE through `executeCode`?

**Scenario B**: The user remotely controls a running CLI session from the claude.ai web interface
1. The web interface sends a `set_model` request to switch to the Opus model — how does the CLI handle it?
2. If the CLI is currently executing a long-running tool call, how does the `interrupt` command stop it?
3. If the user doesn't have a claude.ai subscription, at which gating layer will they be rejected?
