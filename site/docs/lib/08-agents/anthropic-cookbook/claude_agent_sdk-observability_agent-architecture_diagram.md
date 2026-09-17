---
title: "Observability Agent Architecture"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/claude_agent_sdk/observability_agent/architecture_diagram.md"
sourceRel: "claude_agent_sdk/observability_agent/architecture_diagram.md"
rawUrl: "/raw/08-agents/anthropic-cookbook/claude_agent_sdk/observability_agent/architecture_diagram.md"
sourceSha256: "41fd97116a107803bb9b6b44af960b7234deecf0d15e8808a592e7bc7d714a5b"
pageSha256: "41fd97116a107803bb9b6b44af960b7234deecf0d15e8808a592e7bc7d714a5b"
contentMode: "local-full"
zh: ""
---

# Observability Agent Architecture

```mermaid
graph TD
    User[User] --> Agent[Observability Agent]
    Agent --> GitHub[GitHub MCP Server]

    Agent --> Tools[Tools]
    Tools --> WebSearch[WebSearch]
    Tools --> Read[Read Files]

    GitHub --> Docker[Docker Container]
    Docker --> API[GitHub API]

    style Agent fill:#f9f,stroke:#333,stroke-width:3px
    style GitHub fill:#bbf,stroke:#333,stroke-width:2px
```

# Communication Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Agent
    participant MCP as GitHub MCP
    participant API as GitHub API

    User->>Agent: Query about repo
    Agent->>MCP: Connect via Docker
    Agent->>MCP: Request data
    MCP->>API: Fetch info
    API-->>MCP: Return data
    MCP-->>Agent: Process results
    Agent-->>User: Display answer
```
