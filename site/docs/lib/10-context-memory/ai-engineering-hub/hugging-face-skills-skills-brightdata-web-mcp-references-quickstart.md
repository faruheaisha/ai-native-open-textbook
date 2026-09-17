---
title: "Bright Data MCP Setup Guide"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/skills/brightdata-web-mcp/references/quickstart.md"
sourceRel: "hugging-face-skills/skills/brightdata-web-mcp/references/quickstart.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/hugging-face-skills/skills/brightdata-web-mcp/references/quickstart.md"
sourceSha256: "d761ade32ba3993a86302d561838a6915688aa19d6551d67e18f776e51da9d41"
pageSha256: "d761ade32ba3993a86302d561838a6915688aa19d6551d67e18f776e51da9d41"
contentMode: "local-full"
zh: ""
---

# Bright Data MCP Setup Guide

## Prerequisites

1. [Bright Data account](https://brightdata.com/cp/start) (free tier: 5,000 requests/month)
2. API token from [user settings](https://brightdata.com/cp/setting/users)
3. For local setup: [Node.js](https://nodejs.org/) installed

---

## Remote MCP (Recommended)

No installation required. Use the hosted server URL in your MCP client.

### Endpoints

**SSE (Server-Sent Events):**
```
https://mcp.brightdata.com/sse?token=YOUR_API_TOKEN
```

**Streamable HTTP:**
```
https://mcp.brightdata.com/mcp?token=YOUR_API_TOKEN
```

### With Pro Mode (All Tools)
```
https://mcp.brightdata.com/sse?token=YOUR_API_TOKEN&pro=1
```

### With Tool Groups
```
https://mcp.brightdata.com/sse?token=YOUR_API_TOKEN&groups=ecommerce,social
```

### With Custom Tools
```
https://mcp.brightdata.com/sse?token=YOUR_API_TOKEN&tools=scrape_as_markdown,web_data_linkedin_person_profile
```

### Combined Options
```
https://mcp.brightdata.com/sse?token=YOUR_API_TOKEN&groups=ecommerce&tools=extract
```

### Remote URL Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `token` | API token (required) | `token=abc123` |
| `pro` | Enable all Pro tools | `pro=1` |
| `groups` | Tool group IDs (comma-separated) | `groups=ecommerce,social` |
| `tools` | Individual tool names (comma-separated) | `tools=scrape_as_markdown` |
| `unlocker` | Custom web unlocker zone | `unlocker=my_zone` |
| `browser` | Custom browser zone | `browser=my_browser` |

---

## Local MCP (Self-hosted)

### Quick Start

```bash
npx @brightdata/mcp
```

Or install globally:

```bash
npm install -g @brightdata/mcp
brightdata-mcp
```

### With Environment Variables

```bash
