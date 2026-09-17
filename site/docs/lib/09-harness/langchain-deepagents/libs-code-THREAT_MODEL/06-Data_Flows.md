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
pageSha256: "fe3db0a55810bcbcdd85b80fb046a78fa3251cf1657b7a63e96bb31eee3a6c6e"
contentMode: "local-full"
zh: ""
---

## Data Flows

| ID   | Source       | Destination  | Data Type                                      | Classification | Crosses Boundary | Protocol               |
|------|-------------|-------------|------------------------------------------------|----------------|------------------|------------------------|
| DF1  | User         | C2 TUI       | User prompt text                               | —              | TB1              | Keystrokes / stdin     |
| DF2  | C2 TUI       | C12 RemoteAgent | Human message + thread config                | —              | TB1              | Function call          |
| DF3  | C12 RemoteAgent | C11 LangGraph Dev Server | Input messages, thread ID    | DC2            | TB10             | HTTP POST (localhost)  |
| DF4  | C11 LangGraph Dev Server | C12 RemoteAgent | SSE stream (AI responses, tool calls, interrupts) | DC2 | TB10 | HTTP+SSE (localhost) |
| DF5  | C3 Agent     | External LLM | System prompt + message history               | DC1, DC2       | TB7              | HTTPS / LangChain      |
| DF6  | External LLM | C3 Agent     | AI response + tool call decisions             | —              | TB7              | HTTPS / LangChain      |
| DF7  | C3 Agent     | C4 Tools     | Tool call arguments (file/URL/command)        | —              | TB2              | Function call + HITL   |
| DF8  | External     | C4 Tools     | HTTP response bodies (web/API content)        | —              | TB3              | HTTPS                  |
| DF9  | C4 Tools     | C3 Agent     | Tool results (file content, web pages)        | —              | TB3              | ToolMessage            |
| DF10 | C9 Config    | C1 Entry     | TOML config, env vars, API keys               | DC1            | None             | File + environ         |
| DF11 | C5 MCP       | C3 Agent     | MCP tool call results                         | —              | TB3, TB4         | MCP protocol           |
| DF12 | C9 Config    | C5 MCP       | `.mcp.json` server definitions (command, args, env) | —        | TB4              | File read              |
| DF13 | C3 Agent     | C8 Sessions  | Agent state snapshots                         | DC2            | None             | SQLite async write     |
| DF14 | C8 Sessions  | C3 Agent     | Restored thread state on resume               | DC2            | None             | SQLite async read      |
| DF15 | C9 Config    | C6 Hooks     | `hooks.json` command definitions              | —              | TB5              | File read              |
| DF16 | C3 Agent     | C6 Hooks     | Event payload (JSON)                          | —              | TB5              | subprocess stdin       |
| DF17 | User         | C7 Sandbox   | Setup script path + content                   | —              | TB6              | File read + execute    |
| DF18 | C1 Entry     | C11 Server   | `DA_SERVER_*` env vars (config + credentials) | DC1, DC3       | TB8              | Process environment    |
| DF19 | Host FS      | C15 LocalContext | Makefile, project file contents (first 20 lines), directory listing | DC3 | TB9 | bash subprocess stdout |
| DF20 | C15 LocalContext | C3 Agent | Project context markdown appended to system prompt | DC3       | TB9              | string append to prompt|
| DF21 | C16 Subagent Loader | C3 Agent | AGENTS.md body (raw text) used as subagent system_prompt | DC3 | None | YAML parse + dict |
| DF22 | C14 Async Config | C3 Agent | AsyncSubAgent specs (URL, graph_id, headers) from config.toml | — | None | TOML parse + dict |
| DF23 | C9 Config    | C17 Model Config | `class_path` string from `config.toml` | —              | TB11             | TOML parse → importlib |
| DF24 | C5 MCP Config | MCP Subprocess | `env` dict from `.mcp.json` forwarded to stdio subprocess | DC1 | TB4 | subprocess environment |
| DF25 | C3 Agent, C18 Server Offload Boundary | C7 Sandbox | Conversation messages for offload | DC5 | TB6 | `backend.awrite()` |
| DF26 | C12 RemoteAgent | C18 Server Offload Boundary | Thread ID, operation identity, model/hook context, opaque hook replies; typed result or hook request | — | TB10 | HTTP+JSON (localhost) |
| DF27 | C18 Server Offload Boundary | C8 Sessions | Checkpoint message read; summarization event and additive cost update (never a messages write) | DC2 | None | In-process LangGraph SDK |
| DF28 | User / Host FS | C19 Goal/Rubric State Notice | Goal objective, criteria, and status notes; `/rubric file` content | DC2 | TB1, TB12 | TUI command + local file read + checkpoint update |
| DF29 | C19 Goal/Rubric State Notice | External LLM | Synthetic user-role message containing actionable objective, active criteria, and status note | DC2 | TB12, TB7 | LangChain model request over configured provider transport |
| DF30 | Administrator | C9 Config   | Managed TOML policy                            | DC1            | TB13             | Fixed local file read |

### Flow Details

#### DF8/DF9: External Web Content → Agent Context

- **Data**: Arbitrary HTML/JSON from the internet, converted to markdown by `markdownify`. Can be megabytes.
- **Validation**: URL domain checked for Unicode spoofing / script mixing (`unicode_security.check_url_safety`); displayed as warning in approval dialog. Content not scanned for prompt-injection patterns.
- **Trust assumption**: User approved the fetch. Content is data — but the LLM may interpret adversarial content as instructions.

#### DF11: MCP Tool Results → Agent Context

- **Data**: Arbitrary strings/objects from MCP tool calls.
- **Validation**: MCP config approved at load time (per-server allow-list or interactive prompt). Tool result content not validated after server is trusted.
- **Trust assumption**: User trusted the MCP server; its outputs are as reliable as the server.

#### DF18: DA_SERVER_* Env Vars

- **Data**: Model name, system prompt text, sandbox settings, CWD, MCP config path, shell-enable flags — plus inherited provider API keys.
- **Validation**: No validation on server side beyond TOML/JSON decoding for structured fields (`_read_env_json`). The system prompt and model name are passed through verbatim.
- **Trust assumption**: The server subprocess is trusted with the same access as the CLI process.

#### DF19/DF20: LocalContextMiddleware Bash Script

- **Data**: Git branch/status, project language/structure, Makefile first 20 lines, directory listing (up to 20 files), runtime versions.
- **Validation**: Script exit code checked (`_handle_detect_result`). 30-second timeout. Script itself is static framework code — not interpolated from user input.
- **Trust assumption**: Files in the working directory are trustworthy. A malicious Makefile could inject content into the system prompt (requires write access to CWD).

#### DF23: class_path Config → importlib Code Execution

- **Data**: Fully-qualified Python class path string (e.g., `my_package.models:MyChatModel`) from `[models.providers.<name>]` section of `config.toml`.
- **Validation**: Format check (`module:ClassName` with `:` separator). After import, `issubclass(cls, BaseChatModel)` check. No validation of module contents before import.
- **Trust assumption**: User controls `~/.deepagents/config.toml` (same trust model as `pyproject.toml` build scripts).

#### DF24: MCP Stdio Env Dict → Subprocess

- **Data**: Arbitrary key-value pairs from the `"env"` field of stdio server definitions in `.mcp.json`.
- **Validation**: Type check only — `env` must be a dict (`mcp_tools._validate_server_config`). No filtering of key names or values. Forwarded directly to `StdioConnection` which passes to `subprocess.Popen`.
- **Trust assumption**: User authored or approved the MCP config. Project-level configs go through the approval gate (allow-list or interactive prompt) before loading.

#### DF28/DF29: Goal/Rubric State → Primary-Model Context

- **Data**: User-entered goal objectives and rubric criteria, full text loaded through `/rubric file`, and agent-written completion or blocker notes. These are persisted in checkpoint state and embedded in a synthetic `HumanMessage` whenever the current notice must be restored or re-pinned.
- **Validation**: Direct, file-loaded, generated, and tool-authored goal-state paths enforce raw-character limits: 8,000 for an objective, 12,000 for a rubric, 12,000 for an accepted objective and criteria combined, 4,000 for a status note or prior blocker, and 16,000 across a notice. `goal_state_notice._embedded_text` then escapes `<`, `>`, and `&` to prevent boundary-tag forgery; lifecycle projection suppresses a paused or complete goal's objective. The scoped code has no content-safety, secret-detection, byte, token, or post-escape rendered-size limit.
- **Trust assumption**: The user intentionally designates this content for model processing and accepts the configured provider's handling of the resulting request. Provider retention, location, and request authentication are configured outside this scoped flow.
