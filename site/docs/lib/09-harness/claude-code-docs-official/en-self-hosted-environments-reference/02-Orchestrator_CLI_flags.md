---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/self-hosted-environments-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/self-hosted-environments-reference.md"
sourceSha256: "4739e5cb92adb1b34c04e2d5a81861d3f93cd8358bc7504aa5de16b03690d782"
pageSha256: "5acf93c72a6963de2ab915ed543639625c690eaf20b8826a6545a18d78d25daa"
contentMode: "local-full"
zh: ""
---

## Orchestrator CLI flags

The `self-hosted-runner orchestrator` subcommand, which spawns [on-demand runners](https://code.claude.com/docs/en/self-hosted-environments-configuration#on-demand-runners), accepts `--api-url`, `--environment-secret-file`, `--hooks-dir`, `--health-port`, and `--log-level` with the same defaults as the runner and, where the runner's flag has one, the same environment variable, except that `--hooks-dir` is required and must contain a `spawn-runner` hook. It also takes its own flags:

| Flag                             | Default | Description                                                                                                                                                                                                                                                      |
| :------------------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--hook-concurrency <n>`         | `4`     | Maximum `spawn-runner` hooks running in parallel. Also caps how many spawn requests are claimed per poll.                                                                                                                                                        |
| `--hook-timeout <sec>`           | `60`    | Terminate the hook's process tree after this many seconds. The timeout plus its 5-second kill grace must stay below `--expected-spawn-seconds`; the orchestrator enforces this at startup.                                                                       |
| `--expected-spawn-seconds <sec>` | `120`   | Expected p99 boot time for spawned runners, in the server-enforced range 10 to 3600. Sent on every poll as the server-side lease; if no runner registers before it elapses, the session is re-offered with a fresh order ID. All replicas must share this value. |
| `--min-idle <n>`                 | `0`     | Keep at least N idle session slots free by spawning standby runners proactively. `0` disables pre-warming. Pair with the runner's `--exit-if-unused-min` so surplus standby runners reclaim themselves.                                                          |
| `--debug-dir <path>`             | unset   | Write each spawn request's work order and hook stderr to disk. Debug only; never set in production.                                                                                                                                                              |

### SCM connector flags

The orchestrator can hold a standing WebSocket connection to Anthropic's control plane so that hosted pre-session flows, such as the repository picker and the branch or ref resolver, can reach a GitHub Enterprise Server host that's only routable from inside your network. The connector stays off unless you set `--scm-connector-host`.

| Flag                                                    | Default                              | Description                                                                                                                                                 |
| :------------------------------------------------------ | :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--scm-connector-host <host[:port]>`                    | unset                                | GitHub Enterprise Server hostname to forward requests to. Port defaults to `443`. Setting this flag enables the connector.                                  |
| `--scm-connector-id <n>`                                | required with `--scm-connector-host` | The numeric ID of your organization's GitHub Enterprise Server connection. Contact your Anthropic account team for the value when you enable the connector. |
| `--scm-connector-provider <slug>`                       | `ghe`                                | Path segment identifying the provider, matching `^[a-z0-9-]\{1,32\}$`.                                                                                        |
| `--scm-connector-ca-file <path>`                        | unset                                | Extra CA bundle, in PEM format, for TLS connections to the GitHub Enterprise Server host.                                                                   |
| `--scm-connector-host-rewrite <from>=<to_host:to_port>` | unset                                | For end-to-end testing only: redirects the TCP connection while keeping the Host header and TLS SNI as `--scm-connector-host`.                              |

The connector authenticates with the orchestrator's existing environment secret and reconnects automatically: with exponential backoff on a dropped connection, or a fixed 30-second delay when the control plane closes the connection because another orchestrator replica already holds it.
