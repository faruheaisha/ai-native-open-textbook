---
title: "Harness Engineering 文集"
sourceId: "09-harness/harness-engineering-anthology"
sourceTitle: "Harness Engineering 文集"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/lopopolo/harness-engineering"
entryUrl: "https://github.com/lopopolo/harness-engineering/blob/226c8d35fb6ea3ed55467753dba6dea2b5fd5778/sources/raw/acp/introduction.mdx"
sourceRel: "sources/raw/acp/introduction.mdx"
rawUrl: "/raw/09-harness/harness-engineering-anthology/sources/raw/acp/introduction.mdx"
sourceSha256: "fa4bc66d1116ece725a099f54073deb735e527c66b10296e3470f53b1997a00a"
pageSha256: "fa4bc66d1116ece725a099f54073deb735e527c66b10296e3470f53b1997a00a"
contentMode: "local-full"
zh: ""
---

# Harness Engineering 文集

The Agent Client Protocol (ACP) standardizes communication between code editors/IDEs and coding agents and is suitable for both local and remote scenarios.

## Why ACP?

AI coding agents and editors are tightly coupled but interoperability isn't the default. Each editor must build custom integrations for every agent they want to support, and agents must implement editor-specific APIs to reach users.
This creates several problems:

- Integration overhead: Every new agent-editor combination requires custom work
- Limited compatibility: Agents work with only a subset of available editors
- Developer lock-in: Choosing an agent often means accepting their available interfaces

ACP solves this by providing a standardized protocol for agent-editor communication, similar to how the [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) standardized language server integration.

Agents that implement ACP work with any compatible editor. Editors that support ACP gain access to the entire ecosystem of ACP-compatible agents.
This decoupling allows both sides to innovate independently while giving developers the freedom to choose the best tools for their workflow.

## Overview

ACP assumes that the user is primarily in their editor, and wants to reach out and use agents to assist them with specific tasks.

ACP is suitable for both local and remote scenarios:

- **Local agents** run as sub-processes of the code editor, communicating via JSON-RPC over stdio.
- **Remote agents** can be hosted in the cloud or on separate infrastructure, communicating over HTTP or WebSocket

  Full support for remote agents is a work in progress. We are actively
  collaborating with agentic platforms to ensure the protocol addresses the
  specific requirements of cloud-hosted and remote deployment scenarios.

The protocol re-uses the JSON representations used in MCP where possible, but includes custom types for useful agentic coding UX elements, like displaying diffs.

The default format for user-readable text is Markdown, which allows enough flexibility to represent rich formatting without requiring that the code editor is capable of rendering HTML.
