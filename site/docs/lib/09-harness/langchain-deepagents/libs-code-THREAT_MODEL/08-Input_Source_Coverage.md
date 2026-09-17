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
pageSha256: "578560443c657a7a60c368c91337249ef2621fb9e466993a1b57bb5df2180eae"
contentMode: "local-full"
zh: ""
---

## Input Source Coverage

| Input Source          | Data Flows            | Threats       | Validation Points                                                          | Responsibility | Gaps                                                                                         |
|-----------------------|-----------------------|---------------|----------------------------------------------------------------------------|----------------|----------------------------------------------------------------------------------------------|
| User direct input     | DF1, DF2              | None (TB1)    | None — prompts accepted verbatim                                           | User           | No content filtering — intentional; HITL gates downstream tool calls                        |
| LLM output            | DF6, DF7              | T1, T2, T3, T4, T13, T14| HITL gate; shell allow-list; Unicode/URL warnings on tool args; Auto classifier review | Project        | LLM-generated tool args not scanned for injection beyond Unicode/URL; shell allow-list matches only the command's first token, so allow-listed interpreters/wrappers bypass it (T13); Auto classifier review quality follows the user-selected classifier model, and the classifier reads untrusted tool arguments, prior output, and model-authored `ask_user` question text (T14)   |
| Tool/function results | DF9, DF11             | T1            | Unicode warning on URL args; `markdownify` HTML conversion                 | Shared         | Tool *results* pass to context without prompt-injection scan                                 |
| URL-fetched content   | DF8, DF9              | T1            | `check_url_safety` on URL arg; HTML→markdown conversion                    | Shared         | Markup-embedded instructions survive markdownify; no LLM-layer guardrail                    |
| Configuration         | DF10, DF12, DF15, DF23| T9, T10, T12, T14  | Dotenv shell-env precedence; TOML schema; MCP schema + allow/deny lists; JSON structure check; `class_path` format check; dotenv denylist for execution-hook env keys and project-`.env` trust vars | User | Dotenv denylist is best-effort — execution-hook env keys consumed by tools not yet enumerated still reach subprocesses; `class_path` executes module code before type check; MCP env dict unfiltered; Auto classifier strength is a user choice with no floor enforced (T14) |
| Session restore       | DF14                  | T5            | OS file permissions; SQLite                                                | Project        | Unencrypted at rest                                                                           |
| Server IPC (env vars) | DF18                  | T6            | `ServerConfig` serialization; parent env passed to child                   | Project        | Provider API keys flow to server subprocess; system prompt in env                            |
| Offload operation     | DF26, DF27            | T6            | Per-field request schema on consumed context keys; endpoint/transport keys stripped from client `model_params` (`offload_api._strip_transport_model_params`); idle/pending/checkpoint checks; state-only update typed to permitted channels; messages writes rejected | Project | `context.model`/`profile_overrides` are type-checked but their values flow to `config.create_model` (see C17/TB11 for `class_path`); unknown context keys pass through by design; local built-in route relies on loopback and `noop` auth; custom deployments own route auth and thread authorization |
| Host environment      | DF19, DF20            | T7            | Static script; exit code check; 30s timeout                                | Shared         | Makefile content injected into system prompt without sanitization                            |
| Custom subagents (FS) | DF21                  | T8            | `yaml.safe_load`; HITL on `task` tool                                      | User           | Subagent body text not content-filtered                                                      |
| Async subagent config | DF22                  | None direct   | TOML parse; type validation in `load_async_subagents`                      | User           | URL and headers for remote subagents are user-controlled; no URL validation                 |
| MCP subprocess env    | DF24                  | T10           | Dict type check only (`_validate_server_config`)                           | User           | No key/value filtering; arbitrary env vars forwarded to subprocess                           |
| Offloaded history     | DF25                  | None direct   | Filename is a framework-minted session id (no path injection); backend handles storage | Shared         | Raw conversation content written to sandbox filesystem                                       |
| Goal/rubric state     | DF28, DF29            | T15, T16, T17 | Lifecycle projection; notice fingerprinting; raw-character validation (8,000 objective; 12,000 rubric and objective-plus-criteria; 4,000 note/blocker; 16,000 notice); boundary-tag escaping | Shared | Untrusted instructions remain model-readable; file contents are automatically transmitted; no post-escape, byte, or token budget or provider-transmission warning |
