---
title: "MCP Selenium Server with Micronaut"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch04/java/mcp_server/mcp-micronaut/README.md"
sourceRel: "ch04/java/mcp_server/mcp-micronaut/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch04/java/mcp_server/mcp-micronaut/README.md"
sourceSha256: "b578a02d29509d2bf9d6d981e6ee122f538d572891d0c8d3dabae1e8c0ad5c9c"
pageSha256: "b578a02d29509d2bf9d6d981e6ee122f538d572891d0c8d3dabae1e8c0ad5c9c"
contentMode: "local-full"
zh: ""
---

# MCP Selenium Server with Micronaut

This folder contains a Micronaut implementation of a basic [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server. This server provides a set of tools for an AI agent to control a web browser using [Selenium](http://selenium.dev/).  This MCP server exposes the following tools:

- `open_browser`: Launches a new browser instance (e.g., Chrome, Firefox).
- `navigate_url`: Navigates the open browser to a specified URL.
- `get_browser_text`: Retrieves the visible text content of the current page.
- `close_browser`: Closes the current browser instance.

## Prerequisites

- [Java](https://www.oracle.com/java/technologies/downloads/) 21+
- [Maven](https://maven.apache.org/) 3.9+
- A local browser (e.g., [Chrome](https://www.google.com/chrome/), [Firefox](https://www.firefox.com/))
- [Node.js](https://nodejs.org/) (only for debugging with the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector))

## Building and running

1. Build the project:

Maven:
```bash
mvn clean package
```

Gradle:
```bash
gradle clean build
```

2. Run the server:

Maven build:
```bash
java -jar target/mcp-micronaut-1.0.0.jar
```

Gradle build:
```bash
java -jar build/libs/mcp-micronaut-all.jar
```

3. Alternatively, you can debug the MCP server using the MCP Inspector:

Maven build:
```bash
npx @modelcontextprotocol/inspector java -jar target/mcp-micronaut-1.0.0.jar
```

Gradle build:
```bash
npx @modelcontextprotocol/inspector java -jar  build/libs/mcp-micronaut-all.jar
```

## Output

The server communicates via standard input/output (stdio) and is intended to be used as an MCP server by an AI client.

If you use the MCP inspector for debugging, once connected, it will display the available tools. You can now use its user interface to execute these tools.

![MCP Inspector UI interface](/mirror/c6/c639981041ece943c166648244d5f10a6984fb72.png)
