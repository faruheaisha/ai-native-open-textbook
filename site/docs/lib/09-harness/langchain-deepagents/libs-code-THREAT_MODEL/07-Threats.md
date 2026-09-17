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
pageSha256: "4ecdaadf85b320535bce1e21d46506e196750295f25bfd49de02eebe84af217f"
contentMode: "local-full"
zh: ""
---

## Threats

| ID  | Data Flow | Classification | Threat                                                                                      | Boundary | Severity | Validation | Code Reference                                                         |
|-----|-----------|----------------|---------------------------------------------------------------------------------------------|----------|----------|------------|------------------------------------------------------------------------|
| T1  | DF8, DF9  | —              | Prompt injection via fetched web content causes LLM to request harmful actions              | TB3      | Medium   | Likely     | `tools.fetch_url`, `agent._add_interrupt_on`                          |
| T2  | DF7       | —              | `--shell-allow-list all` removes pattern checks; LLM-injected shell commands execute without approval in non-interactive mode | TB2 | Medium | Verified | `config.is_shell_command_allowed`, `client.non_interactive._handle_action_request` |
| T3  | DF7       | —              | Unicode-homoglyph URL in LLM-generated tool args deceives user during approval              | TB2      | Low      | Disproven  | `unicode_security.check_url_safety`, `agent._format_fetch_url_description` |
| T4  | DF5, DF9  | —              | Auto-approve mode bypasses all HITL gates; any LLM-initiated tool call executes             | TB2      | Low      | Verified   | `agent.create_cli_agent` (`auto_approve` param), `agent._add_interrupt_on` |
| T5  | DF13, DF14| DC2            | Local SQLite checkpoint file tampered with to inject adversarial content into future LLM context | None | Low   | Unverified | `sessions.get_db_path`                                                 |
| T6  | DF3, DF4, DF26 | DC2       | Unauthenticated LangGraph dev server on localhost can be accessed by any local process     | TB10     | Medium   | Verified   | `server._build_server_env`, `server._DEFAULT_HOST`, `offload_api.app` |
| T7  | DF19, DF20| DC3            | Makefile or project file content injected into system prompt via LocalContextMiddleware    | TB9      | Low      | Verified   | `local_context._section_makefile`, `local_context.LocalContextMiddleware._get_modified_request` |
| T8  | DF21      | DC3            | Custom subagent AGENTS.md body used verbatim as system_prompt without content validation   | None     | Low      | Verified   | `subagents._parse_subagent_file`, `agent.create_cli_agent`            |
| T9  | DF23      | —              | `class_path` in config.toml triggers arbitrary Python code execution via `importlib.import_module()` | TB11 | Low | Verified | `config._create_model_from_class`, `model_config.ProviderConfig`      |
| T10 | DF24      | DC1            | MCP stdio subprocess env dict accepts arbitrary keys including `PATH`, `LD_PRELOAD`, `PYTHONPATH` without filtering | TB4 | Low | Verified | `mcp_tools._validate_server_config`, `mcp_tools._load_tools_from_config` |
| T12 | DF10      | —              | Project `.env` sets shell startup-hook variables (`BASH_ENV`, `ENV`) that run attacker-controlled scripts when `dcode` spawns Bash, before any HITL approval | TB11 | High | Verified | `config._load_dotenv`, `local_context.build_detect_script` |
| T13 | DF7       | —              | Configured shell allow-list checks only the first token, so an allow-listed interpreter/wrapper (`python3`, `bash`, `env`, `xargs`, …) runs arbitrary code via its arguments without approval in non-interactive mode | TB2 | Medium | Verified | `config.is_shell_command_allowed`, `config.contains_dangerous_patterns` |
| T14 | DF7, DF9  | —              | A weaker model configured for the Auto approval classifier reviews gated actions less reliably, including untrusted text carried in tool arguments and file content | TB2 | Low | Verified | `auto_mode.AutoModeHITLMiddleware._classifier_model`, `config.resolve_auto_classifier_model`, `config_manifest.resolve_auto_classifier_timeout` |
| T15 | DF28, DF29 | DC2 | Stored prompt injection through a goal, rubric, or status note influences later primary-model tool requests | TB12 | Medium | Likely | `goal_state_notice.build_goal_state_notice`, `goal_tools.GoalToolsMiddleware._request_with_goal_notice` |
| T16 | DF28, DF29 | DC2 | Sensitive local-file content, up to the 12,000-character rubric limit, is automatically persisted and transmitted to the configured model provider as rubric criteria | TB12 | Medium | Verified | `app.DeepAgentsApp._set_rubric_from_file`, `goal_state_notice.build_goal_state_notice` |
| T17 | DF28, DF29 | DC2 | Character-bounded goal/rubric/status-note text can still exceed provider context budgets after escaping or tokenization | TB12 | Medium | Verified | `goal_state_limits`, `goal_state_notice.build_goal_state_notice`, `goal_tools.GoalToolsMiddleware._request_with_goal_notice` |

### Threat Details

#### T1: Prompt Injection via Fetched Web Content

- **Flow**: DF8 (external web) → DF9 (tool result) → C3 Agent context
- **Description**: When the agent calls `fetch_url` or `web_search`, the response body enters the LLM's context window as a `ToolMessage`. A maliciously crafted web page or search snippet can embed natural-language instructions that the LLM may interpret as authoritative commands, leading to unexpected tool call requests in the next turn.
- **Preconditions**: (1) User or LLM-initiated call to `fetch_url`/`web_search` reaches a malicious page; (2) LLM interprets injected instructions as directives; (3) In interactive mode, user must still approve the resulting tool call.

#### T15: Stored Prompt Injection Through Goal/Rubric State

- **Flow**: DF28/DF29 (user or local-file content → checkpointed notice → primary-model context)
- **Description**: The goal-state notice embeds the full actionable objective, active criteria, and status note in a synthetic `HumanMessage`. A rubric loaded from an untrusted repository file, or a crafted status note, can therefore persist instructions that influence later model behavior. Bounded superseded notices remain in the append-only request history until compaction; the latest notice identifies itself as authoritative, but a model can still attend to older text. Oversized legacy notices are replaced only in the transient model request. HTML escaping and boundary labels prevent literal tag forgery. They do not stop natural-language prompt injection. Interactive HITL still gates side-effecting tool calls. Auto and non-interactive configurations can reduce that protection.
- **Preconditions**: (1) The user accepts a goal/rubric or loads a file containing attacker-controlled instructions; (2) the state is actionable or the rubric remains active; (3) the primary model follows the injected content; (4) for side effects, the resulting tool call is approved or an approval-bypassing mode is active.

#### T16: Automatic Disclosure of File-Loaded Rubrics

- **Flow**: DF28/DF29 (`/rubric file` → checkpoint → primary-model request)
- **Description**: `/rubric file` reads the entire selected UTF-8 text file and persists its nonempty contents, up to the 12,000-character rubric limit (see TB12); a larger file is rejected outright rather than truncated. The notice then embeds the criteria into primary-model context. There is no warning or confirmation specific to provider transmission, so a user can inadvertently select a secret-bearing or proprietary file. This flow handles user content, not provider credentials. Credential storage and provider retention are outside the scoped implementation.
- **Preconditions**: (1) A user selects a file with sensitive content; (2) it becomes an active rubric; (3) a model request is made while the rubric is active.

#### T17: Provider Context Pressure Despite Character Limits

- **Flow**: DF28/DF29 (character-bounded text → escaped notice → model request)
- **Description**: Direct, file-loaded, generated, and tool-authored goal-state paths enforce raw-character limits before persistence or notice construction. HTML escaping happens afterward and can expand the rendered notice (for example, `&` becomes `&amp;`), while provider tokenization and available context budgets vary. The middleware restores or re-pins the current notice after compaction. A valid near-limit notice therefore remains recurring model-request overhead. This increases spend. It can also contribute to a provider context-limit failure.
- **Preconditions**: (1) A user, file, or model-supplied status note produces a valid near-limit notice; (2) its escaped or tokenized representation is large relative to the configured provider's available context; (3) the corresponding goal or rubric remains model-visible.

#### T2: Shell Allow-List Bypass via `SHELL_ALLOW_ALL`

- **Flow**: DF7 (LLM tool call) → C4 Tools (execute)
- **Description**: When `--shell-allow-list all` (or `DEEPAGENTS_SHELL_ALLOW_LIST=all`) is set, `is_shell_command_allowed` returns `True` for any non-empty command without invoking `contains_dangerous_patterns`. In non-interactive mode, any shell command the LLM requests executes unconditionally. Combined with T1, an attacker-controlled page could cause arbitrary command execution. A configured (non-`all`) allow-list narrows this but is not a robust boundary either — see T13.
- **Preconditions**: (1) User has configured `--shell-allow-list all`; (2) Non-interactive mode; (3) Successful prompt injection via DF8/DF9.

#### T3: Unicode Homoglyph URL in Approval Dialog

- **Flow**: DF7 (LLM-generated fetch_url args) → C2 TUI approval dialog
- **Description**: An LLM influenced by adversarial input could generate a `fetch_url` call with a URL containing mixed-script or confusable characters visually identical to ASCII.
- **Preconditions**: LLM generates a confusable URL (requires adversarial steering). `check_url_safety` detects mixed-script domain labels and `strip_dangerous_unicode` removes invisible BiDi/zero-width characters; warnings displayed in approval dialog. Classified Disproven as a project vulnerability — the UI warnings are the intended control.

#### T4: Auto-Approve Removes All Execution Safeguards

- **Flow**: DF7 (all tool calls) when `auto_approve=True`
- **Description**: When auto-approve is enabled (via `--auto-approve` flag or `Shift+Tab` in TUI), all tool calls including `execute`, `write_file`, `edit_file`, `fetch_url`, `launch_async_subagent` execute without user confirmation.
- **Preconditions**: User explicitly enables auto-approve. Default is approval-required.

#### T5: Local SQLite Checkpoint Tampering

- **Flow**: DF13/DF14 (session persist/restore)
- **Description**: LangGraph checkpoints stored in `~/.deepagents/*.db` contain the full conversation history and agent state. An attacker with local filesystem write access could inject adversarial messages that re-enter the LLM context on session resume.
- **Preconditions**: Attacker has write access to the user's home directory — equivalent to a fully compromised user account.

#### T6: Unauthenticated LangGraph Dev Server on Localhost

- **Flow**: DF3/DF4/DF26 (CLI ↔ LangGraph dev server)
- **Description**: The CLI spawns a `langgraph dev` server subprocess with `LANGGRAPH_AUTH_TYPE=noop` (`client/launch/server.py:_build_server_env`). This disables all server-side authentication. The server binds to `127.0.0.1:\{port\}` (a free ephemeral port by default, so it no longer squats the well-known `langgraph dev` port 2024). Any local process that discovers the port can send inputs, read conversation state (including tool results that may contain file contents or secrets), inject messages, trigger state updates, or request server-owned offload for a known thread. The offload route does not accept conversation state and cannot write `messages`, so its direct impact is additional model/archive work plus a state-only summarization update. The server is ephemeral — it lives only for the duration of the CLI session — but this is the entire attack window. Port discovery is feasible via localhost port scanning or by reading `/proc/\{pid\}/cmdline` which contains the `--port` argument.
- **Preconditions**: (1) Attacker has a local process running as the same user (or as root); (2) Attacker discovers the server port (port scan on localhost, or reads process arguments).

#### T7: LocalContextMiddleware Injects Host File Contents into System Prompt

- **Flow**: DF19 → DF20
- **Description**: `LocalContextMiddleware` runs a bash script (`build_detect_script`) that reads the first 20 lines of `Makefile` (`_section_makefile`) and a filtered directory listing, then injects this output verbatim into the system prompt on every turn. An attacker with write access to the project's working directory could craft `Makefile` content designed to manipulate the agent's behavior.
- **Preconditions**: Attacker has write access to the `Makefile` in the agent's working directory. The agent must be running in that directory (local mode, not sandbox mode).

#### T8: Custom Subagent Body Used as System Prompt Without Validation

- **Flow**: DF21
- **Description**: `subagents._parse_subagent_file` reads AGENTS.md files from `.deepagents/agents/\{name\}/AGENTS.md` and project-level `.agents/\{name\}/AGENTS.md`. The markdown body after the YAML frontmatter is used verbatim as the subagent's `system_prompt`. No content filtering is applied.
- **Preconditions**: Attacker has write access to `~/.deepagents/agents/` or the project's `.agents/` directory. User or LLM must invoke the malicious subagent via the `task` tool.

#### T9: Arbitrary Python Code Execution via `class_path` Config

- **Flow**: DF23 (config.toml → importlib)
- **Description**: The `class_path` field in `[models.providers.<name>]` config triggers `importlib.import_module()` in `config._create_model_from_class`. While the imported class is validated as a `BaseChatModel` subclass, module-level code executes unconditionally during import — before the type check runs. A malicious or compromised `config.toml` pointing to a hostile module causes arbitrary code execution at model initialization time. This applies to both `class_path` and the `_load_provider_profiles` path that uses `exec_module()` to load `_profiles.py` from provider packages.
- **Preconditions**: Attacker has write access to `~/.deepagents/config.toml` AND a malicious Python package installed in the user's environment (or on `sys.path`). The code comments document this as intentional: "same trust model as `pyproject.toml` build scripts — the user controls their own machine."

#### T10: MCP Stdio Env Dict Forwarded Without Filtering

- **Flow**: DF24 (MCP config → subprocess environment)
- **Description**: The `"env"` field in stdio MCP server definitions (`.mcp.json`) accepts an arbitrary key-value dict. `mcp_tools._validate_server_config` only checks that the field is a dict — it does not filter key names or values. The dict is forwarded directly to `StdioConnection(env=...)` which passes it to the subprocess. An attacker who can modify a project-level `.mcp.json` could set `PATH` to redirect command resolution, `LD_PRELOAD` to inject shared libraries, or `PYTHONPATH` to hijack Python imports in the MCP subprocess.
- **Preconditions**: (1) Attacker has write access to a project-level `.mcp.json`; (2) The project MCP config must be approved by the user (the interactive prompt, `--trust-project-mcp`, or the server approved via `[mcp].enabled_project_server_approvals` / the `DEEPAGENTS_CODE_DANGEROUSLY_ENABLE_PROJECT_MCP_SERVERS` env var). For user-level `~/.deepagents/.mcp.json`, the attacker already has home directory write access. Note: the `env` dict from MCP config is passed to `StdioConnection` — whether it replaces or merges with `os.environ` depends on the `langchain_mcp_adapters` library implementation.

#### T11: Auto-Installed ripgrep Binary from Upstream Release

- **Flow**: Download performed by `managed_tools.ensure_ripgrep` when `rg` is not on `PATH` — either on first run, or eagerly at install time via `dcode tools install` (invoked by `scripts/install.sh`).
- **Description**: Without a system `rg`, Deep Agents Code fetches the pinned ripgrep release tarball from `github.com/BurntSushi/ripgrep/releases/...`, verifies it against an in-tree SHA-256 (`RIPGREP_ASSETS`), extracts it under a `TemporaryDirectory`, and atomically moves the binary into `managed_tools.BIN_DIR` (`<sys.prefix>/share/deepagents-code/bin/rg`, shared by every profile), or into the profile-scoped `managed_tools.FALLBACK_BIN_DIR` when that directory is not writable. The binary then runs unsandboxed, inheriting the same trust as a user-installed `rg` (the SDK invokes it via `subprocess.run(["rg", ...])`). The same verified path backs the `dcode tools install` verb, so the install script reuses it rather than re-encoding the version + checksum table in bash.
- **Mitigations**: (1) SHA-256 verified against the pinned hash table before move — a mismatch aborts the install and leaves the chosen bin directory clean. (2) Network egress is limited to `github.com`. (3) Opt-out via `DEEPAGENTS_CODE_OFFLINE` for air-gapped environments, or `DEEPAGENTS_CODE_RIPGREP_INSTALLER=system` to defer to the OS package manager instead of the managed binary. (4) Pinned version + checksums are bumped in-tree, so a compromised upstream release is detected on the next Deep Agents Code release rather than silently propagating. (5) Atomic move-into-place avoids partial installs when concurrent CLI invocations race. (6) The eager install-script path is non-`sudo` (no system package manager is invoked in the default `managed` mode).
- **Preconditions**: User has not installed `rg` via their package manager, `DEEPAGENTS_CODE_OFFLINE` is unset, `DEEPAGENTS_CODE_RIPGREP_INSTALLER` is not `system`, and the host can reach `github.com`. The pinned SHA-256 in `RIPGREP_ASSETS` would need to be incorrect (a supply-chain compromise of the deepagents-code release) for a tampered binary to be installed.

#### T11b: Unpinned Pricing Catalog Fetched Hourly from a Mutable Upstream Ref

- **Flow**: Background daemon thread started by `cost_tracking._start_price_updater` on the first priced model request.
- **Description**: Unless opted out, Deep Agents Code starts `genai_prices.UpdatePrices`, which fetches `raw.githubusercontent.com/pydantic/genai-prices/refs/heads/main/prices/new_data/v2/data.json` every hour and installs it via `set_custom_snapshot`. The fetched catalog wholesale-replaces the pricing data bundled with the installed package for the life of the process. Unlike the ripgrep download (T11), the payload is **not** checksummed and the URL names a mutable branch ref rather than a pinned release, so the content can change between any two fetches. The blast radius is confined to displayed cost estimates — the catalog is parsed as data by `genai-prices`, never executed — but corrupt, regressed, or hostile upstream data silently changes every cost figure the user sees, and a catalog that omits providers makes lookups fail in a way that reads as "this model has no published rates."
- **Mitigations**: (1) Opt-out via `DEEPAGENTS_CODE_PRICES_AUTO_UPDATE=0` or `[update].prices_auto_update = false` in `config.toml`, or `DEEPAGENTS_CODE_OFFLINE` for air-gapped environments, all checked before the thread starts. (2) `cost_tracking._build_price_updater` refuses a fetched catalog listing fewer providers than the bundled one, so a truncated or mid-publish `data.json` cannot take effect. (3) A refused or failed fetch leaves the previously installed catalog in place rather than clearing it. (4) `genai-prices` rejects any payload that is not a JSON array of schema-valid providers. (5) Network egress is limited to `raw.githubusercontent.com`. (6) The updater is started lazily on first pricing, never at CLI startup, so a session that prices nothing makes no request.
- **Preconditions**: `DEEPAGENTS_CODE_PRICES_AUTO_UPDATE` is not falsy, `DEEPAGENTS_CODE_OFFLINE` is unset, the host can reach `raw.githubusercontent.com`, and at least one model request is priced. For tampered data to be installed, the upstream repository or the CDN path would need to be compromised **and** the substituted catalog would need to list at least as many providers as the bundled data.

#### T12: Project `.env` Injects Shell Interpreter Startup Hooks

- **Flow**: DF10 (project `.env` → process environment) → bash subprocess startup (DF19)
- **Description**: `config._load_dotenv` discovers the nearest project `.env` by walking up from the working directory and applies its values to the process environment (`override=False`, so shell-exported values still win). Bash treats several environment variables as startup hooks — `BASH_ENV` and `ENV` name a file that is sourced when a non-interactive shell starts. Because Deep Agents Code runs its own local-context detection through Bash at startup (`local_context.build_detect_script`) and spawns shells for the `execute` tool, a project `.env` that sets one of these keys could run attacker-controlled scripts inside the `dcode` process *before* any model-requested tool call or HITL approval prompt. The broader trust boundary is that running `dcode` in a project directory lets that project influence the process environment. The mitigation is a key denylist (`config._DOTENV_DENIED_ENV_KEYS`) covering known execution-hook consumers (shell startup, dynamic linker, interpreter startup/paths, askpass hijack); it is a best-effort enumeration, not a closed set, so an execution hook consumed by some other spawned tool remains viable until its keys are added to the list.
- **Preconditions**: (1) User launches `dcode` in a directory containing an attacker-controlled `.env` (for example, a freshly cloned untrusted repository); (2) the `.env` sets a shell startup-hook key that is not already exported in the user's shell (dotenv uses `override=False`).

#### T13: First-Token Shell Allow-List Bypass via Interpreters/Wrappers

- **Flow**: DF7 (LLM tool call) → C4 Tools (execute)
- **Description**: `is_shell_command_allowed` splits a command on `|`, `;`, `&&`, and `||`, then validates only the *first token* (`tokens[0]`) of each segment against the configured allow-list, after rejecting a set of dangerous patterns (`contains_dangerous_patterns`: command substitution `$(`/backticks, redirects, `${`, bare `$VAR`, background `&`). Because only the executable name is checked, any allow-listed general-purpose interpreter or command wrapper carries arbitrary behavior in its arguments: `python3 -c '<code>'`, `bash script.sh`, `sh -c '<code>'`, `env <cmd>`, `xargs <cmd>`, `uv run <cmd>`, and similar. A user who allow-lists such a program — reasonably believing they have restricted the agent to a "safe" tool — has effectively allowed unrestricted execution, and in headless `-x`/Auto mode those commands run without an approval prompt. This is the same class of weakness as T2 but applies to *normal, non-`all`* allow-lists. The allow-list is an ergonomic auto-approve heuristic, not a security boundary; textual command classification cannot robustly constrain execution.
- **Preconditions**: (1) User configures a shell allow-list (`--shell-allow-list` / `DEEPAGENTS_SHELL_ALLOW_LIST`) that includes an interpreter or wrapper; (2) non-interactive or Auto mode (interactive Manual mode still shows the human the literal command before it runs); (3) for the injected-command variant, successful prompt injection via DF8/DF9. The intended control is HITL approval; OS-native execution sandboxing would be the robust boundary the string allow-list cannot provide.

#### T14: Weaker Auto Classifier Model Weakens Action Review

- **Flow**: DF7 (LLM tool call) → Auto classifier review → C4 Tools
- **Description**: In Auto approval mode, gated tool calls that deterministic policy cannot clear are reviewed by an LLM authorization classifier. That classifier can be pointed at a separate model (`--auto-classifier-model`, `DEEPAGENTS_CODE_AUTO_CLASSIFIER_MODEL`, `[models].auto_classifier`, or `/auto model`) so reviews are cheaper and faster than the main agent model. Review quality then follows the chosen model: a weaker one is likelier to mis-authorize an action, and likelier to be steered by injected instructions in the untrusted material it reads (tool arguments, paths, prior tool output, remote metadata, and the model-authored `ask_user` question text paired with a same-turn answer). Question text is a distinct case: the `ask_user` receipt attests only that this exact text was displayed to the user and answered, never that its content is true, so a question asserting prior or blanket authorization is untrusted content rather than evidence. `_CLASSIFIER_POLICY` instructs the classifier to read a paired question strictly as a description of a proposed action and target, to disregard directives embedded in it, and to allow an action only where that description matches the action's canonical arguments. Choosing the classifier is a user-level decision, so it is restricted to trusted surfaces: shell exports, the global `~/.deepagents/.env`, `~/.deepagents/config.toml`, the CLI flag, and `/auto model`. A *project* `.env` travels with a cloned repo, so `DEEPAGENTS_CODE_AUTO_CLASSIFIER_MODEL` is listed in `config._PROJECT_DOTENV_DENIED_ENV_KEYS` — the same mitigation TB4 applies to the project-MCP trust vars; without that entry a checked-in `.env` could silently downgrade the review on `dcode` startup. With it, this is a self-inflicted weakening of a control rather than an external attack path. Auto's model-independent guards are unchanged by the setting: deterministic allow (the deterministic deny rules are narrow and do not cover the Deny categories, so an action the classifier affirmatively allows is not re-checked downstream), the consecutive/total denial counters, batch-replay detection, control-state availability, and the human-fallback thresholds. A classifier model that cannot be constructed (bad spec, missing credentials, uninstalled provider package) never falls back to the main model — the first such batch is marked `classifier_unavailable`, so those calls are denied and do not execute, and the failing spec is latched so every subsequent batch escalates straight to human approval until a review succeeds. A transient failure instead escalates once `_CONSECUTIVE_UNAVAILABLE_FALLBACK` consecutive batches have failed, or immediately when Auto's control state cannot be persisted. The review deadline is tunable through a subset of the same trusted surfaces — shell exports, the global `~/.deepagents/.env`, and `[models].auto_classifier_timeout` in `~/.deepagents/config.toml` (there is no CLI flag and no `/auto` subcommand for it) — and `DEEPAGENTS_CODE_AUTO_CLASSIFIER_TIMEOUT` is denied from a project `.env` for the same reason, so a cloned repo cannot stall gated batches or squeeze the budget until reviews time out. `config_manifest.resolve_auto_classifier_timeout` rejects any resolved value outside `[AUTO_CLASSIFIER_TIMEOUT_FLOOR, AUTO_CLASSIFIER_TIMEOUT_CEILING]` — out-of-range and malformed values are discarded in favor of the next config source rather than clamped — so the deadline itself cannot be removed; a timed-out batch remains fail-closed (`classifier_unavailable`).
- **Preconditions**: (1) Auto approval mode is active (interactive TUI only, and not under a sandbox); (2) a classifier model is configured through one of the trusted surfaces above — the default reuses the main agent model; (3) for the injected-review variant, untrusted content reaches the classifier through DF8/DF9 and the chosen model follows it. The intended control is that the human remains the fallback for anything the classifier does not affirmatively allow.
