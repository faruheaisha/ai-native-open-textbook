---
title: "MCP Selenium server in JavaScript"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/README.md"
zh: ""
---

# MCP Selenium server in JavaScript

This folder contains a JavaScript implementation of a basic [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server. This server provides a set of tools for an AI agent to control a web browser using [Selenium](http://selenium.dev/).  This MCP server exposes the following tools:

- `open_browser`: Launches a new browser instance (e.g., Chrome, Firefox).
- `navigate_url`: Navigates the open browser to a specified URL.
- `get_browser_text`: Retrieves the visible text content of the current page.
- `close_browser`: Closes the current browser instance.

## Prerequisites

- [Node.js](https://nodejs.org/)
- A local browser (e.g., [Chrome](https://www.google.com/chrome/), [Firefox](https://www.firefox.com/), or [Edge](https://www.microsoft.com/edge/))

1.  Install dependencies:
```bash
npm install
```

2. Run the server:
```bash
npm start
```

3. Alternatively, you can debug the MCP server using the MCP Inspector:
```bash
npx @modelcontextprotocol/inspector node mcp-selenium-server.js
```

## Output

The server communicates via standard input/output (stdio) and is intended to be used as an MCP server by an AI client.

If you use the MCP inspector for debugging, once connected, it will display the available tools. You can now use its user interface to execute these tools.

![MCP Inspector UI interface](https://gh-proxy.com/https://raw.githubusercontent.com/bonigarcia/context-engineering/46719154489e410b509db4fb69ab1c29fb3362a0/docs/img/mcp-inspector-ui.png)
