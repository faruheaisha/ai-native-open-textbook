---
title: "Pixeltable MCP Server"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/pixeltable-mcp/base-sdk/README.md"
sourceRel: "pixeltable-mcp/base-sdk/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/pixeltable-mcp/base-sdk/README.md"
sourceSha256: "8898b4e90f42ca6256fd4996e698fa96b0aef8ca6d55940f461b3ea18a8f6478"
pageSha256: "8898b4e90f42ca6256fd4996e698fa96b0aef8ca6d55940f461b3ea18a8f6478"
contentMode: "local-full"
zh: ""
---

# Pixeltable MCP Server

This is a simple MCP (Model-Client-Protocol) server that wraps around the Pixeltable SDK, providing a convenient API for working with Pixeltable's multimodal data infrastructure.

## Clone the repo
`gh repo clone pixeltable/mcp-server-pixeltable`

## Docker Setup

### Build the Docker image
```bash
docker build -t pixeltable-mcp-server .
```

### Run the Docker container
```bash
docker run -p 8080:8080 pixeltable-mcp-server
```

This will start the MCP server on port 8080, making it accessible at `http://localhost:8080`.

## Add the tool to Cursor
1. Go to Cursor MCP settings
2. Add MCP > Add Name > Type = 'SSE'
3. For the URL, enter: `http://localhost:8080/sse`

## Alternative: Local Installation

If you prefer to run the server locally without Docker:

```bash
pip install pixeltable mcp
```

Then run the server:
```bash
python server.py
```

Note you will need a MCP client to interact with it.
