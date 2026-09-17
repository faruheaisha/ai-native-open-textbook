---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/architecture.md"
sourceRel: "guide/core/architecture.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/core/architecture.md"
sourceSha256: "8d6da52e869bf1c04028a4cb8b16e5a7dd993877d379aa8b75c3433580d098d6"
pageSha256: "1575233a7d9390a8e98a747bb4f0f33825b23cdbf19705507b2c310f303942cf"
contentMode: "local-full"
zh: ""
---

## Visual Overview

Claude Code is not a new AI model. It's an orchestration layer that wraps Claude (Opus/Sonnet/Haiku) with the ability to read files, run shell commands, navigate repositories, and spawn sub-agents, all in a continuous loop until the task is done.

```mermaid
flowchart TB
    DEV([Developer]) --> CC

    subgraph CC["Claude Code — Orchestration Layer"]
        CLAUDE["Claude Model\n(Opus / Sonnet / Haiku)"]
        TOOLS["Tool Arsenal\n(Read · Edit · Bash · Task · Grep…)"]
        CLAUDE <--> TOOLS
    end

    CC --> ENV

    subgraph ENV["Your Development Environment"]
        FS[File System]
        GIT[Git Repository]
        SHELL[Shell / CLI]
        MCP[MCP Servers]
    end

    style CC fill:#E87E2F,color:#fff
    style CLAUDE fill:#F5E6D3,color:#333
    style TOOLS fill:#6DB3F2,color:#fff
    style DEV fill:#7BC47F,color:#333
    style FS fill:#B8B8B8,color:#333
    style GIT fill:#B8B8B8,color:#333
    style SHELL fill:#B8B8B8,color:#333
    style MCP fill:#B8B8B8,color:#333
```

*Inspired by [Mohamed Ali Ben Salem's architecture diagram](https://www.linkedin.com/posts/mohamed-ali-ben-salem-2b777b9a_en-ce-moment-je-vois-passer-des-posts-du-activity-7420592149110362112-eY5a). See [Architecture Internals diagrams](/lib/09-harness/claude-code-ultimate-guide/guide-diagrams-04-architecture-internals) for a deeper breakdown.*
