---
title: "Chief of Staff Agent Architecture"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/claude_agent_sdk/chief_of_staff_agent/flow_diagram.md"
sourceRel: "claude_agent_sdk/chief_of_staff_agent/flow_diagram.md"
rawUrl: "/raw/08-agents/anthropic-cookbook/claude_agent_sdk/chief_of_staff_agent/flow_diagram.md"
sourceSha256: "bc49b80ea12d69940d564cb7d6a91233d3fa11d3167b060fd15686a54f455b6b"
pageSha256: "bc49b80ea12d69940d564cb7d6a91233d3fa11d3167b060fd15686a54f455b6b"
contentMode: "local-full"
zh: ""
---

# Chief of Staff Agent Architecture

```mermaid
graph TD
    User[User] --> Chief[Chief of Staff Agent]
    Chief --> Memory[CLAUDE.md]
    Chief --> FinData[financial_data/]
    Chief --> Tools
    Chief --> Commands[Slash Commands]
    Chief --> Styles[Output Styles]
    Chief --> Hooks[Hooks]

    Tools --> Task[Task Tool]
    Task --> FA[Financial Analyst]
    Task --> Recruiter[Recruiter]

    FA --> Scripts1[Python Scripts]
    Recruiter --> Scripts2[Python Scripts]

    style Chief fill:#f9f,stroke:#333,stroke-width:3px
    style Task fill:#bbf,stroke:#333,stroke-width:2px
    style FA fill:#bfb,stroke:#333,stroke-width:2px
    style Recruiter fill:#bfb,stroke:#333,stroke-width:2px
```

## Expected Agent Communication Flow

```mermaid
sequenceDiagram
    participant User
    participant Chief as Chief of Staff
    participant Task as Task Tool
    participant FA as Financial Analyst
    participant Scripts as Python Scripts
    participant Hooks as Post-Write Hook
    User->>Chief: /budget-impact hiring 5 engineers
    Chief->>Chief: Expand slash command
    Chief->>Task: Delegate financial analysis
    Task->>FA: Analyze hiring impact
    FA->>Scripts: Execute hiring_impact.py
    Scripts-->>FA: Return analysis results
    FA->>FA: Generate report
    FA-->>Task: Return findings
    Task-->>Chief: Subagent results
    Chief->>Chief: Write report to disk
    Chief->>Hooks: Trigger post-write hook
    Hooks->>Hooks: Log to audit trail
    Chief-->>User: Executive summary
```
