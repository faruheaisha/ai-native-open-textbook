---
title: "Research Agent Architecture"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/README.md"
zh: ""
---

# Research Agent Architecture

```mermaid
graph TD
    User[User] --> Agent[Research Agent]
    Agent --> Tools[Tools]

    Tools --> WebSearch[WebSearch]
    Tools --> Read[Read Files/Images]

    style Agent fill:#f9f,stroke:#333,stroke-width:3px
    style Tools fill:#bbf,stroke:#333,stroke-width:2px
```

# Communication Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Agent
    participant Tools

    User->>Agent: Query

    loop Until Complete
        Agent->>Agent: Think
        Agent->>Tools: Search/Read
        Tools-->>Agent: Results
    end

    Agent-->>User: Answer
```
