---
title: "MCP Selenium server in Java"
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

# MCP Selenium server in Java

This Maven project a Java implementation of a basic [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server. This server provides a set of tools for an AI agent to control a web browser using [Selenium](http://selenium.dev/).

This project contains four modules:

1. `mcp-java-sdk`: A basic Selenium MCP server implemented using the [MCP Java SDK](https://java.sdk.modelcontextprotocol.io/).
2. `mcp-spring-ai`: Implementation using [Spring AI](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html).
3. `mcp-quarkus`: Implementation using [Quarkus MCP Server](https://docs.quarkiverse.io/quarkus-mcp-server/dev/index.html).
4. `mcp-micronaut`: Implementation using [Micronaut MCP](https://micronaut-projects.github.io/micronaut-mcp/latest/guide/).
