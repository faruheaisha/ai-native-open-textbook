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
pageSha256: "cfef485a1e4532d423c5cb15b45311a708fcf03e7638fd9da1fa0b616dbe8a4e"
contentMode: "local-full"
zh: ""
---

## Components

| ID  | Component                   | Description                                                                                                         | Trust Level          | Default? | Entry Points                                                                                      |
|-----|-----------------------------|---------------------------------------------------------------------------------------------------------------------|----------------------|----------|---------------------------------------------------------------------------------------------------|
| C1  | CLI Entry Point             | Parses argv, loads config/env, bootstraps session                                                                   | framework-controlled | Yes      | `main.cli_main`, `main.parse_args`                                                                |
| C2  | TUI / Non-interactive       | Textual UI for interactive chat; `client/non_interactive.py` for headless pipelines (both use `RemoteAgent`)        | framework-controlled | Yes      | `app.DeepAgentsApp.run`, `client.non_interactive.run_non_interactive`                             |
| C3  | Agent Engine                | LangGraph agent graph running inside `langgraph dev` server, assembled by `create_cli_agent`                        | framework-controlled | Yes      | `agent.create_cli_agent`, `agent._add_interrupt_on`, `server_graph.make_graph`                    |
| C4  | Built-in Tools              | `http_request`, `web_search` (Tavily), `fetch_url` (HTML→markdown)                                                 | framework-controlled | Partial¹ | `tools.http_request`, `tools.web_search`, `tools.fetch_url`                                       |
| C5  | MCP Loader & Trust          | Discovers/loads `.mcp.json`, validates server configs, applies per-server allow/deny lists + interactive approval    | framework-controlled | No²      | `mcp_tools.resolve_and_load_mcp_tools`, `model_config.load_mcp_server_trust_lists`, `main._check_mcp_project_trust` |
| C6  | Hook Runtime                | Fires subprocess commands on agent lifecycle events                                                                 | framework-controlled | No³      | `hooks.runtime.HooksRuntime`, `hooks.runner.run_command_handler`                                  |
| C7  | Sandbox Integration         | Creates/destroys remote sandboxes (Daytona, LangSmith, Modal, Runloop, AgentCore)                                  | framework-controlled | No⁴      | `integrations.sandbox_factory.create_sandbox`                                                     |
| C8  | Session Persistence         | SQLite checkpoint store for LangGraph thread state                                                                  | framework-controlled | Yes      | `sessions.get_db_path`, `sessions.generate_thread_id`                                             |
| C9  | Configuration System        | Managed/user TOML, env vars, `AGENTS.md` system prompts, model config                                               | administrator/user-controlled | N/A | `configuration`, `config.Credentials`, `config.RuntimeState`, `_paths.PATHS`, `model_config.ModelConfig`, fixed managed path, `~/.deepagents/config.toml` |
| C10 | Unicode/URL Safety          | Detects hidden Unicode, checks URL domain spoofing for approval UI warnings                                         | framework-controlled | Yes      | `unicode_security.detect_dangerous_unicode`, `unicode_security.check_url_safety`                  |
| C11 | LangGraph Dev Server        | Subprocess running `langgraph dev` with `LANGGRAPH_AUTH_TYPE=noop`; managed by `ServerProcess`                      | framework-controlled | Yes⁵     | `client.launch.server.ServerProcess.start`, `client.launch.server.generate_langgraph_json`, `client.launch.server_manager.start_server_and_get_agent` |
| C12 | Remote Agent Client         | HTTP+SSE client wrapping `RemoteGraph`; connects to C11 on localhost                                                | framework-controlled | Yes⁵     | `client.remote_client.RemoteAgent.astream`, `client.remote_client.RemoteAgent.aget_state`         |
| C13 | Server Config Channel       | Passes CLI config to server subprocess via `DA_SERVER_*` environment variables                                      | framework-controlled | Yes      | `_server_config.ServerConfig.to_env`, `_server_config.ServerConfig.from_env`                      |
| C14 | Async Subagent Config       | Loads remote LangGraph deployment specs from `[async_subagents]` in `config.toml`                                  | user-controlled      | No       | `agent.load_async_subagents`                                                                      |
| C15 | LocalContext Middleware      | Runs a bash detection script via backend; injects git/project/env context into system prompt each turn              | framework-controlled | Yes⁶     | `local_context.LocalContextMiddleware.before_agent`, `local_context.build_detect_script`          |
| C16 | Custom Subagent Loader      | Reads `\{dir\}/\{name\}/AGENTS.md` YAML frontmatter from `.deepagents/agents/` and project `.agents/` directories      | user-controlled      | No       | `subagents.list_subagents`, `subagents._parse_subagent_file`                                      |
| C17 | Model Config Loader         | Resolves model providers, enforces the `models.allowed` policy (exact specs and `provider:*` wildcards), and supports `class_path` for arbitrary `BaseChatModel` instantiation via `importlib` | administrator/user-controlled | N/A | `config.create_model`, `config._create_model_from_class`, `model_config.ModelConfig.load` |
| C18 | Server Offload Boundary     | Custom HTTP route registered with LangGraph's route-auth layer (inert under the shipped `noop` auth, which relies on the loopback bind); reads thread state, runs the agent's shared compaction/hooks/backend, and commits a state-only result plus cost | framework-controlled | Yes for built-in graph⁷ | `offload_api.offload`, `offload_api._execute_offload`, `offload_middleware.OffloadOperation.execute` |
| C19 | Goal/Rubric State Notice    | Projects persisted goal objectives, active criteria, and status notes into synthetic messages for the primary model | framework-controlled | Yes      | `goal_state_notice.build_goal_state_notice`, `goal_tools.GoalToolsMiddleware`                     |

**Notes:**
1. `http_request` and `fetch_url` enabled by default; `web_search` requires `TAVILY_API_KEY`.
2. MCP servers only load if `.mcp.json` config files are present.
3. User hooks load from `~/.deepagents/hooks.json`. Project hooks load from `.deepagents/hooks.json` only after interactive workspace trust or the headless `--trust-project-hooks` opt-in.
4. Sandbox mode requires explicit `--sandbox` CLI flag.
5. Both TUI and non-interactive modes now always spawn a local LangGraph dev server and connect via `RemoteAgent`.
6. `LocalContextMiddleware` is added whenever `LocalShellBackend` or an `_AsyncExecutableBackend` is in use (`agent.py:create_cli_agent`).
7. Custom graph references do not receive dcode's HTTP app and do not support `/offload`.
