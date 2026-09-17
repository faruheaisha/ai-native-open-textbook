---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/cli-sdks-libraries/overview.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/cli-sdks-libraries/overview.md"
sourceSha256: "7a7f111f8dae62fd6c05663c12e72673df225083b760db14ebb28c7f8fac9976"
pageSha256: "7a7f111f8dae62fd6c05663c12e72673df225083b760db14ebb28c7f8fac9976"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

Anthropic provides three kinds of official tooling for building with the Claude API:

* **CLI:** The `ant` command-line tool for shell scripting and interactive use.
* **Client SDKs:** General-purpose Messages API clients for Python, TypeScript, C#, Go, Java, PHP, and Ruby. Each SDK provides idiomatic interfaces, type safety, and built-in support for streaming, retries, and error handling.
* **Libraries and integrations:** Packages and compatibility layers that expose Claude inside another framework's API surface rather than the Messages API directly.

  For the full API specification, see the [API reference](https://platform.claude.com/docs/en/api/overview).

## CLI

    Shell scripting, typed flags, response transforms

## Client SDKs

    Sync and async clients, Pydantic models

    Node.js, Deno, Bun, and browser support

    .NET Standard 2.0+, IChatClient integration

    Context-based cancellation, functional options

    Builder pattern, CompletableFuture async

    Value objects, builder pattern

    Sorbet types, streaming helpers

## Libraries and integrations

Libraries and integrations expose Claude through another framework's API surface. They are not general-purpose Messages API clients.

    Swift package for Apple's `LanguageModelSession` API

    Use Claude through the OpenAI SDK surface

## Building agents or using Claude Code?

The CLI, client SDKs, and libraries are for calling the Claude API yourself: you send each request and handle each response. Claude Code, the Claude Agent SDK, and Claude Managed Agents work at a higher level, providing the agent loop, tool execution, and runtime.

    Agentic coding tool for delegating coding tasks to Claude

    Build agents that run in a process you operate

    Run agents in Anthropic's managed infrastructure
