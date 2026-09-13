---
title: "Sequential Thinking MCP Server"
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

# Sequential Thinking MCP Server

## Overview

The **Sequential Thinking** server helps Claude Code **break down complex problems into manageable steps**, improving reasoning and multi-step task execution.

---

## Installation

### Step 1: Global Installation (Recommended)

Install Sequential Thinking globally for use across all projects:

```bash
claude mcp add sequential-thinking -s user -- npx -y @modelcontextprotocol/server-sequential-thinking
```

### Local Installation (Project-Specific)

For project-specific installations:

```bash
claude mcp add sequential-thinking -s local -- npx -y @modelcontextprotocol/server-sequential-thinking
```

---

## Usage

### Step 2: Using Sequential Thinking in Claude Code

Once installed, Sequential Thinking integrates automatically into Claude sessions. It activates when you request step-by-step reasoning or task breakdown.

#### Example Usage

```
"Break down the task of building a REST API into sequential steps"
```

Claude will respond with structured, step-by-step instructions, leveraging Sequential Thinking for organized problem-solving.

---

## Features

- **Complex problem decomposition**: Breaks down large tasks into manageable steps
- **Structured reasoning**: Provides logical, sequential thought processes
- **Planning assistance**: Helps organize multi-step workflows
- **Automatic integration**: Works seamlessly without manual activation

---

## Verification

Verify Sequential Thinking is connected:

```bash
claude mcp list
```

Expected output:

```
sequential-thinking: npx -y @modelcontextprotocol/server-sequential-thinking - ✓ Connected
```

---

## Best Practices

- **Use for planning**: Ideal for task breakdown and project planning
- **Complex workflows**: Best suited for multi-step reasoning tasks
- **Global installation**: Recommended for consistent availability across projects
- **No configuration needed**: Works out of the box after installation

---

## Use Cases

- Breaking down large features into implementation steps
- Planning architectural changes
- Debugging complex issues systematically
- Creating structured documentation outlines
- Organizing multi-stage deployments

---

## Troubleshooting

If Sequential Thinking fails to connect:
1. Verify Node.js is installed: `node --version`
2. Check `npx` availability: `npx --version`
3. Remove and reinstall: 
   ```bash
   claude mcp remove sequential-thinking -s user
   claude mcp add sequential-thinking -s user -- npx -y @modelcontextprotocol/server-sequential-thinking
   ```

For more help, see the [Troubleshooting Guide](/lib/09-harness/claude-code-everything/mcp-servers#troubleshooting).
