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
pageSha256: "608b1b9cc186165df713991088d3ae6a8a0ea216b011b1b0125b4d380f206823"
contentMode: "local-full"
zh: ""
---

## Data Classification

| ID  | PII Category           | Specific Fields                                   | Sensitivity | Storage Location(s)              | Encrypted at Rest | Retention          | Regulatory |
|-----|------------------------|---------------------------------------------------|-------------|----------------------------------|-------------------|--------------------|------------|
| DC1 | API Keys / Credentials | `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `TAVILY_API_KEY`, `LANGSMITH_API_KEY`, `LANGGRAPH_API_KEY` | Critical | Process environment only; never written to disk by CLI code | N/A (in-memory) | Process lifetime | All — breach trigger |
| DC2 | Conversation Messages  | User prompts, LLM responses, tool args/results, goal objectives, rubric criteria, and status notes | High | SQLite (`~/.deepagents/*.db`) via LangGraph checkpointer | No (local file, unencrypted) | Unbounded (session files persist) | GDPR if personal data is discussed |
| DC3 | System Prompt Content  | `DA_SERVER_SYSTEM_PROMPT` env var; custom AGENTS.md contents | Medium | Process environment (transient); `~/.deepagents/\{agent\}/AGENTS.md` on disk | No | Config lifetime | None direct |
| DC5 | Offloaded Conversation History | Summarized + raw conversation messages written to sandbox backend | High | Sandbox filesystem at `/conversation_history/session_\{uuid4hex\}.md` | Depends on sandbox provider | Sandbox session lifetime | GDPR if personal data is discussed |

### Data Classification Details

#### DC1: API Keys / Credentials

- **Fields**: `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `TAVILY_API_KEY`, `LANGSMITH_API_KEY`, `LANGGRAPH_API_KEY`, and any provider-specific keys in the user's environment.
- **Storage**: Loaded from environment at process start (`config.py`). The CLI explicitly strips `LANGGRAPH_CLOUD_LICENSE_KEY` and related auth vars from the server subprocess environment (`client/launch/server.py:_build_server_env`) but passes the remaining env vars (including provider API keys) to the server subprocess via `os.environ.copy()`.
- **Access**: Available to both the CLI process and the server subprocess (which inherits the full environment minus stripped vars).
- **Encryption**: Not encrypted — in-memory process environment only.
- **Retention**: Process lifetime; cleared on CLI exit.
- **Logging exposure**: Provider SDK error messages may include partial key information. The CLI does not log keys directly.
- **Gaps**: API keys are passed to the server subprocess via `_build_server_env` which does `os.environ.copy()` — all keys in the parent's environment become available to the child.

#### DC2: Conversation Messages

- **Fields**: Full conversation history (HumanMessage, AIMessage, ToolMessage) stored as LangGraph checkpoint state, including synthetic notices that embed actionable goal objectives, active rubric criteria, and status notes.
- **Storage**: SQLite at `~/.deepagents/\{agent\}/\{thread_id\}.db` (via `sessions.get_db_path`).
- **Access**: Local filesystem; readable by any process running as the same user.
- **Encryption**: None — plaintext SQLite.
- **Retention**: Unbounded — session files persist until manually deleted.
- **Logging exposure**: Tool call arguments and results (including fetched web content) are in the checkpoint. File contents read by the agent are stored there too.
- **Gaps**: Unencrypted on disk; no retention policy enforced by the CLI.

#### DC5: Offloaded Conversation History

- **Fields**: Timestamped, formatted conversation messages written by the SDK's `SummarizationMiddleware._aoffload_to_backend`, reached through `offload_middleware.CLICompactionMiddleware`.
- **Producers**: Three paths write this data.
  - Automatic trigger-based compaction.
  - The model-initiated `compact_conversation` tool (HITL-gated, see TB2).
  - The explicit `/offload` command. This one is available only through C18 on a built-in server, which reads checkpoint state and writes the archive without entering the tool-approval path.
  - **Read guard**: The server-owned `/offload` path wraps the backend in `offload_middleware._ArchiveReadGuard`, which fails closed rather than truncating existing history when its prerequisite read fails. The automatic and model-initiated paths write through the raw backend on the SDK's own code path. The guard is applied per write site rather than by the backend's type, so a new write site does not inherit it — see the `_guarded_backend()` call site.
- **Storage**: Sandbox backend filesystem at path `/conversation_history/session_\{uuid4hex\}.md`. The leaf is the *summarization session* id (`SummarizationMiddleware._get_history_path`), not the thread id: it is minted per summarization session and persisted under `_summarization_session_id` so later compactions append to the same file. One thread can therefore own several archives.
- **Access**: Accessible within the sandbox session; depends on provider access controls.
- **Encryption**: Depends on sandbox provider storage backend.
- **Retention**: Sandbox session lifetime (destroyed when sandbox is deleted).
- **Logging exposure**: Contains full message history including tool results.
- **Gaps**: The filename is a framework-minted `session_<uuid4 hex>` with no user-controlled component (no path injection risk), but offloaded content is unstructured markdown containing raw conversation data.
