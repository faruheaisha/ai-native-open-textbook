---
title: "LangChain DeepAgents"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/THREAT_MODEL.md"
sourceRel: "libs/code/THREAT_MODEL.md"
rawUrl: "/raw/09-harness/langchain-deepagents/libs/code/THREAT_MODEL.md"
sourceSha256: "3c2cc0e59404e891c3f675fd7a4f39e610cbad666bd5ec5ae6b0f1b09774c3dc"
pageSha256: "eb3fbe06b1ba3c99b6a979b08006f1aedf3b1c96c5cefcd5eb09967786d225a4"
contentMode: "local-full"
zh: ""
---

## System Overview

`deepagents-code` is a terminal-based AI coding assistant. It wraps the `deepagents` SDK in an interactive TUI (Textual) and a headless non-interactive mode. Both modes route agent execution through a local `langgraph dev` subprocess: the CLI spawns a server, passes configuration via `DA_SERVER_*` environment variables, and communicates via a `RemoteAgent` HTTP+SSE client. The agent receives user prompts, reasons with a configurable LLM, and executes side-effecting tools (file read/write, shell commands, web search, HTTP requests) subject to a human-in-the-loop (HITL) approval gate. Sessions are persisted in a local SQLite checkpoint database. Users can extend the agent with MCP servers (stdio processes or remote HTTP/SSE endpoints), hooks (event-driven subprocesses), custom subagents (AGENTS.md files in `.deepagents/agents/`), async remote subagents (LangGraph deployments configured in `config.toml`), and pluggable sandbox backends for remote code execution.

### Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                        User (local machine)                          │
│                                                                      │
│  CLI Args / Env Vars ──► C1: CLI Entry Point (main.py)               │
│                                  │                                   │
│                 ┌────────────────┼─────────────────────┐             │
│                 ▼                ▼                     ▼             │
│        C2: TUI (app.py)  C2b: Non-interactive   C13: Config Channel  │
│                 │      (client/non_interactive.py) (DA_SERVER_* vars) │
│ - - - - - - - - - - TB8: CLI / Server IPC - - - - - │ - - - - - - - │
│                 │                                     ▼              │
│                 │        C11: Server Manager (client/launch)          │
│                 │                      │ spawns                      │
│                 │                      ▼                             │
│                 │           C11b: LangGraph Dev Server               │
│                 │     (client/launch/server.py:ServerProcess)        │
│                 │           LANGGRAPH_AUTH_TYPE=noop                 │
│ - - - - - - - - │ - - - - - TB10: RemoteAgent / Dev Server - - - -  │
│                 │                      ▲                             │
│                 └─►C12: RemoteAgent────┘ (HTTP+SSE on 127.0.0.1)    │
│                     (client/remote_client.py)                        │
│                            │                                         │
│                 ┌──────────┴───────────┐                             │
│                 ▼                      ▼                             │
│       C18: Offload HTTP Boundary  C3: Agent Engine                   │
│       (custom route + operation)  (server_graph.py)                  │
│                 │                      │                             │
│                 └──────────┬───────────┘                             │
│                            │                                         │
│                     (create_cli_agent, deepagents SDK)               │
│                            │                                         │
│  User Prompt ──────────────┘                                         │
│                            │                                         │
│ - - - - - - - - - TB1: User→Agent Input - - - - - - - - - - - - -   │
│                            │                                         │
│                     LLM Decision                                     │
│ - - - - - - - - - TB2: LLM → Tool Execution (HITL) - - - - - - - -  │
│                            │                                         │
│   ┌──────────┬─────────┬───┴────────┬──────────┬──────────────┐     │
│   ▼          ▼         ▼            ▼          ▼              ▼     │
│  C4:Tools  C5:MCP   C6:Hooks     C8:Sessions C7:Sandbox  C14:Async  │
│  (file,    (procs/  (subprocs    (SQLite)    (Daytona/   Subagents   │
│  shell,    remote)  hooks.json)             Modal/etc.) (LangGraph   │
│  HTTP)                                                   remotes)   │
│   │          │                     │          │              │       │
│ - │ - - - - -│- - - - TB3 - - - - -│- - - - - │ - - - - - - -│ - -  │
│   │          ▼                     ▼          ▼              │       │
│   │      External               Local FS   Remote     External LG   │
│   ▼      MCP Server            (~/.deep   Sandbox    Deployment     │
│ External  (proc/net)           agents/)   API                       │
│ Web/APIs                                                             │
│ - - - TB4: Web content → Context - - - - - - - - - - - - - - - - -  │
│   Tool results re-enter agent context window                         │
│ - - - TB9: LocalContextMiddleware / Host environment - - - - - - -   │
│   C15: LocalContextMiddleware runs bash detect script                │
│                                                                      │
│  C9: Config System ──► C17: Model Config (class_path → importlib)   │
│  (config.toml, .env)                                                │
└──────────────────────────────────────────────────────────────────────┘
```
