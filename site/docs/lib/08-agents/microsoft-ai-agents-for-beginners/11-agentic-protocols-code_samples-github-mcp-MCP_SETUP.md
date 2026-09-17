---
title: "MCP Server Integration Guide"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/11-agentic-protocols/code_samples/github-mcp/MCP_SETUP.md"
sourceRel: "11-agentic-protocols/code_samples/github-mcp/MCP_SETUP.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/11-agentic-protocols/code_samples/github-mcp/MCP_SETUP.md"
sourceSha256: "a0586e5a33ff378ebc972217296ef5912d114d4ac2d520e67299323a23ef4a89"
pageSha256: "a0586e5a33ff378ebc972217296ef5912d114d4ac2d520e67299323a23ef4a89"
contentMode: "local-full"
zh: ""
---

# MCP Server Integration Guide

## Prerequisites
- Node.js installed (version 14 or higher)
- npm package manager
- Python environment with required dependencies

## Setup Steps

1. **Install MCP Server Package**
   ```bash
   npm install -g @modelcontextprotocol/server-github
   ```

2. **Start MCP Server**
   ```bash
   npx @modelcontextprotocol/server-github
   ```
   The server should start and display a connection URL.

3. **Verify Connection**
   - Look for the plug icon (🔌) in your Chainlit interface
   - A number (1) should appear next to the plug icon indicating successful connection
   - The console should show: "GitHub plugin setup completed successfully" (along with additional status lines)

## Troubleshooting

### Common Issues

1. **Port Conflict**
   ```bash
   Error: listen EADDRINUSE: address already in use
   ```
   Solution: Change the port using:
   ```bash
   npx @modelcontextprotocol/server-github --port 3001
   ```

2. **Authentication Issues**
   - Ensure GitHub credentials are properly configured
   - Check .env file contains required tokens
   - Verify GitHub API access

3. **Connection Failed**
   - Confirm server is running on expected port
   - Check firewall settings
   - Verify Python environment has required packages

## Connection Verification

Your MCP server is properly connected when:
1. Console shows "GitHub plugin setup completed successfully"
2. Connection logs show "✓ MCP Connection Status: Active"
3. GitHub commands work in chat interface

## Environment Variables

Required in your .env file:
```
GITHUB_TOKEN=your_github_token
MCP_SERVER_PORT=3000  # Optional, default is 3000
```

## Testing Connection

Send this test message in chat:
```
Show me the repositories for username: [GitHub Username]
```
A successful response will show repository information.
