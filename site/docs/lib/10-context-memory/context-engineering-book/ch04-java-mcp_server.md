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
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch04/java/mcp_server/README.md"
sourceRel: "ch04/java/mcp_server/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch04/java/mcp_server/README.md"
sourceSha256: "0dfcdaface8034bd06e9c801e721e58e2eb6e8087916f65e51112ec2498f9058"
pageSha256: "0dfcdaface8034bd06e9c801e721e58e2eb6e8087916f65e51112ec2498f9058"
contentMode: "local-full"
zh: ""
---

# MCP Selenium server in Java

This Maven project a Java implementation of a basic [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server. This server provides a set of tools for an AI agent to control a web browser using [Selenium](http://selenium.dev/).

This project contains four modules:

1. `mcp-java-sdk`: A basic Selenium MCP server implemented using the [MCP Java SDK](https://java.sdk.modelcontextprotocol.io/).
2. `mcp-spring-ai`: Implementation using [Spring AI](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html).
3. `mcp-quarkus`: Implementation using [Quarkus MCP Server](https://docs.quarkiverse.io/quarkus-mcp-server/dev/index.html).
4. `mcp-micronaut`: Implementation using [Micronaut MCP](https://micronaut-projects.github.io/micronaut-mcp/latest/guide/).
