---
title: "Bright Data MCP Integrations"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/skills/brightdata-web-mcp/references/integrations.md"
sourceRel: "hugging-face-skills/skills/brightdata-web-mcp/references/integrations.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/hugging-face-skills/skills/brightdata-web-mcp/references/integrations.md"
sourceSha256: "d9550dfd2b4e3d970ed705143c1893cd6c9127de6137d1537ef7c7c6e7dd7d98"
pageSha256: "d9550dfd2b4e3d970ed705143c1893cd6c9127de6137d1537ef7c7c6e7dd7d98"
contentMode: "local-full"
zh: ""
---

# Bright Data MCP Integrations

Complete integration guides for AI tools and frameworks.

## Supported Clients

| Client | Method | Best For |
|--------|--------|----------|
| Claude Desktop | Local MCP | Desktop AI assistant |
| Claude Code | Local MCP | Coding assistant |
| Codex | Remote MCP | OpenAI coding agent |
| Cursor | Local MCP | IDE integration |
| VS Code | Local MCP | IDE integration |
| ChatGPT | Remote MCP | Chat interface |
| LangChain | SDK | Python agents |
| LlamaIndex | SDK | RAG pipelines |
| CrewAI | SDK | Multi-agent systems |
| Google ADK | SDK | Gemini agents |
| OpenAI SDK | SDK | Custom agents |
| n8n | Remote MCP | Workflow automation |

---

## Claude Desktop

Add to `claude_desktop_config.json`:

**Location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
\{
  "mcpServers": \{
    "brightdata": \{
      "command": "npx",
      "args": ["-y", "@brightdata/mcp"],
      "env": \{
