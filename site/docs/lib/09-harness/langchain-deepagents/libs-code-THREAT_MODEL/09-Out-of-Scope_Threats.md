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
pageSha256: "d271f00a857bddf3ad64c059c42c51092303852efdd792d2a92bebb16c5b2921"
contentMode: "local-full"
zh: ""
---

## Out-of-Scope Threats

Threats that appear valid in isolation but fall outside project responsibility because they depend on conditions the project does not control.

| Pattern                                                                 | Why Out of Scope                                                                                                                                                                     | Project Responsibility Ends At                                                                                     |
|-------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| Prompt injection leading to arbitrary code execution (interactive mode) | In interactive mode, every side-effecting tool call requires explicit user approval via the HITL dialog. The user is the final gatekeeper.                                          | Providing HITL for all side-effecting tools (`agent._add_interrupt_on`) and Unicode/URL warnings in the approval dialog. |
| API key exfiltration via LLM-directed `http_request`                   | `http_request` requires HITL in interactive mode. Keys it could exfiltrate are user-supplied env vars. In non-interactive mode, user has opted into autonomous operation.             | Providing HITL gate for HTTP tools. Users control which env vars are in scope.                                      |
| Malicious MCP server injecting prompt instructions                     | Users configure MCP servers and explicitly trust project-level configs. Once trusted, MCP tool outputs are data from a system the user controls.                                     | Interactive approval prompt + per-server allow/deny lists for project-level configs (`main._check_mcp_project_trust`, `model_config.load_mcp_server_trust_lists`). |
| LLM jailbreak / safety bypass                                          | Model selection and safety configuration are user-controlled. The project routes prompts to the configured LLM but cannot guarantee model behavior.                                   | Correctly routing prompts to the configured LLM; applying the system prompt from `agent.get_system_prompt`.         |
| Sandbox provider security vulnerabilities                              | Daytona, LangSmith, Modal, Runloop, and AgentCore are third-party services. Their internal security is not this project's responsibility.                                            | Correctly initializing sandbox sessions via `integrations.sandbox_factory.create_sandbox`.                          |
| Hook commands doing harmful things                                     | User-scoped hooks (`~/.deepagents/hooks.json`), project-scoped hooks (`.deepagents/hooks.json`, only after interactive workspace trust or `--trust-project-hooks`), and plugin-scoped hooks (`hooks/hooks.json` in a plugin the user installed and enabled) are intentionally configured commands. The payload is data-only (JSON on stdin). | Schema validation (`hooks.loading.load_hooks_config`); workspace trust for project hooks (versioned store under `~/.deepagents/.state/hooks_trust.json`; cancelling the trust prompt aborts startup); install plus enablement for plugin hooks, with declared events listed in the plugin manager; bounded execution with per-event default timeouts (600s for most events, 30s for `UserPromptSubmit`); sanitized subprocess environment with only the plugin's own path variables overlaid. |
| Async subagent traffic interception / MitM                             | Async subagents connect to user-configured LangGraph deployment URLs. The project does not control those endpoints or their TLS certificates.                                        | Accepting URL/headers from user config and passing them to the LangGraph SDK (`agent.load_async_subagents`).        |
| LangGraph dev server port enumeration / discovery                     | Discovering the local dev server port requires local access. Port scanning localhost is a general OS security concern, not a framework vulnerability.                                 | Binding to `127.0.0.1` by default (`server._DEFAULT_HOST`); ephemeral server lifetime; OS-assigned ephemeral port (`server._EPHEMERAL_PORT`) is not predictable across runs. |
| `.env` file from parent directory changes app/API configuration        | `config._find_dotenv_from_start_path` walks up the directory tree to find `.env` files. Discovering ordinary configuration values (API keys, `DEEPAGENTS_CODE_*` settings) this way is standard `python-dotenv` behavior, and the user controls their filesystem. The *code-execution* implication of a project `.env` (shell startup hooks) is tracked in-scope as T12. | Finding `.env` from the project root (`config._find_dotenv_from_start_path`); `override=False` by default (existing env vars preserved); shell startup / environment-hijack keys (`BASH_ENV`, `ENV`) denied during dotenv loading. |

### Rationale

**Prompt injection in interactive mode**: The HITL interrupt means every file write, shell command, web search, URL fetch, task delegation, and async subagent action shows the user a confirmation dialog with full tool arguments. Even a successful prompt injection can only execute what the user explicitly approves. The project's responsibility is to make that dialog accurate — hence the Unicode/URL warning layer in `unicode_security.py`.

**LangGraph dev server without auth**: The `LANGGRAPH_AUTH_TYPE=noop` setting is intentional for local dev server use. Adding authentication would require users to manage tokens for a locally-spawned ephemeral process, creating more friction than security benefit in this context. The 127.0.0.1 binding limits exposure to the local machine. T6 documents this as an accepted risk for the threat model.

**Custom subagent system prompts**: Subagent definitions in `.deepagents/agents/` are user-authored files. The framework correctly treats them as user-controlled content. The HITL gate on `task` tool calls ensures the user approves subagent delegation before it occurs.

**`class_path` code execution**: This follows the same trust model as `pyproject.toml` build scripts — the user edits their own config file on their own machine. The `issubclass(BaseChatModel)` check provides a post-import guard, though module-level side effects execute before it. Documented as intentional in `model_config.py`.
