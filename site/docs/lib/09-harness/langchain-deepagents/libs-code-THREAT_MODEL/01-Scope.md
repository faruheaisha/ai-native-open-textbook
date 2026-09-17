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
pageSha256: "0a9ff3997fc1d5204e7d4d2d401ac77b5d0a6e855b90c6438343787011cfb3ed"
contentMode: "local-full"
zh: ""
---

## Scope

### In Scope

- `deepagents_code/` — all Python source modules shipped as the `deepagents-code` package
- CLI entry point (`main.py`, `__init__.py`)
- Interactive TUI (`app.py`, `tui/textual_adapter.py`, `tui/widgets/`)
- Non-interactive pipeline runner (`client/non_interactive.py`)
- Agent creation (`agent.py`)
- Built-in tools (`tools.py`: `http_request`, `web_search`, `fetch_url`)
- MCP config loader and per-server allow/deny lists (`mcp_tools.py`, `model_config.py`)
- Hook runtimes (`hooks/`)
- Sandbox integration factory (`integrations/sandbox_factory.py`, `integrations/sandbox_provider.py`)
- Session persistence (`sessions.py`)
- Configuration system (`config.py`, `model_config.py`)
- Unicode/URL safety helpers (`unicode_security.py`)
- LangGraph dev server subprocess management (`client/launch/server.py`, `client/launch/server_manager.py`, `server_graph.py`)
- Remote agent client (`client/remote_client.py`)
- Local context middleware (`local_context.py`)
- Custom subagent loader (`subagents.py`, `agent.py:load_async_subagents`)
- Conversation offload (`offload.py`)
- Skill management (`skills/commands.py`)
- Python extension loading (`extensions/`)
- Persisted goal/rubric state notices (`goal_state_notice.py`, `goal_tools.py`,
  `goal_state_limits.py`)

### Out of Scope

- `libs/deepagents/` (SDK library) — separate package with its own threat model
- `libs/acp/`, `libs/evals/`, `libs/partners/` — separate packages
- `tests/` — not shipped code; used during analysis only
- `scripts/`, `examples/` — developer tooling, not shipped
- Deployment infrastructure, CI/CD pipelines
- LLM provider behavior (model outputs, jailbreaks) — user-controlled
- Sandbox provider internals (Daytona, LangSmith, Modal, Runloop, AgentCore) — third-party
- LangGraph server internals — consumed as a subprocess dependency

### Assumptions

> Throughout this document `~/.deepagents/` names the *effective* user profile directory. That is the default location; `DEEPAGENTS_HOME` selects a different one (TB14), and every claim about profile-owned files applies to whichever directory is selected at launch.

1. The CLI runs locally on the user's machine; the user is a developer who invoked `deepagents` themselves.
2. The project provides the HITL approval framework. Users control model selection, API keys, and whether to disable approval gates. Managed policy can narrow each of these; `[models].allowed` narrows model selection.
3. The user profile directory is only writable by the authenticated local user — no multi-user shared home directories. `DEEPAGENTS_HOME` (see TB14) can relocate that directory outside `$HOME`; keeping the selected location single-user is then the operator's responsibility.
4. Sandbox backends are trusted third-party services. CLI responsibility ends at correctly constructing and dispatching requests to them.
5. LangSmith tracing, if enabled, is user-opted-in via environment variables.
6. The LangGraph dev server subprocess binds to `127.0.0.1` by default (`client/launch/server.py:_DEFAULT_HOST`) and is ephemeral — started and stopped per CLI session.
7. `DA_SERVER_*` environment variables are readable only by the CLI process and its child server subprocess (OS process isolation assumption).
8. Users who set `class_path` in `config.toml` accept the same trust model as `pyproject.toml` build scripts — they control their own machine.
9. Administrators deploy and protect the fixed `managed_config.toml` path with operating-system controls; the CLI does not validate its owner or mode and never writes it.
10. User-directory, user-config, CLI, installed-plugin, and Python entry-point extensions are authorized by the user action that supplied them. Project extensions execute only after explicit, configured, or persisted trust.
11. Extension backend routes cannot overlap dcode's local artifact or conversation-history storage. A sandboxed agent rejects direct `FilesystemBackend` and `LocalShellBackend` mounts, including subclasses; wrapper implementations are responsible for their own isolation because dcode does not recursively inspect arbitrary backend object graphs.
