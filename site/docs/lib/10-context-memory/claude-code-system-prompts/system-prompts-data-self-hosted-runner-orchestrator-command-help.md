---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-self-hosted-runner-orchestrator-command-help.md"
sourceRel: "system-prompts/data-self-hosted-runner-orchestrator-command-help.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-self-hosted-runner-orchestrator-command-help.md"
sourceSha256: "f68319afe21cfff883219d2a3d9a926493db811a0b8148048a458f1e2ec47b35"
pageSha256: "f68319afe21cfff883219d2a3d9a926493db811a0b8148048a458f1e2ec47b35"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Usage: claude self-hosted-runner orchestrator [options]

Polls the spawn-hints queue (server returns immediately) and runs ${hooks-dir}/spawn-runner once per
hint. The hook must submit work asynchronously (kubectl create job, EC2
RunInstances, ...) and exit within --hook-timeout. Exit-code contract (session
spawns): 0 = success (no-op); 1 = retryable failure (backoff); >=2 = non-retryable
(circuit-break); stderr tail is forwarded as the nack error. Standby (--min-idle)
spawns: any non-zero exit is logged locally and re-requested after the lease.

Connection:
  --api-url &lt;url>             API base URL (default: ${DEFAULT_SELF_HOSTED_RUNNER_API_URL\})
  --environment-secret-file &lt;path>
                              Path to environment secret file (or set SELF_HOSTED_RUNNER_ENVIRONMENT_SECRET)
                              (--pool-secret-file / SELF_HOSTED_RUNNER_POOL_SECRET are deprecated aliases.)

Hook:
  --hooks-dir &lt;path>          Directory containing the spawn-runner hook (REQUIRED).
                              [env: SELF_HOSTED_RUNNER_HOOKS_DIR]
  --hook-concurrency &lt;n>      Max spawn-runner hooks running in parallel (default: ${DEFAULT_HOOK_CONCURRENCY}).
                              Also caps how many hints are claimed per poll.
  --hook-timeout &lt;sec>        SIGTERM the hook after &lt;sec> seconds (default: ${DEFAULT_HOOK_TIMEOUT_MS/1000\}).
  --expected-spawn-seconds &lt;n>  p99 boot time for runners this orchestrator spawns
                              (default: ${DEFAULT_EXPECTED_SPAWN_SECONDS}). Sent on every Poll as the
                              server-side lease; if the runner doesn't register before then, the
                              session is re-hinted with a fresh jti. HA replicas MUST use the same value.
  --min-idle &lt;n>              Keep at least &lt;n> idle slots free (free capacity across runners, not
                              runner count; default: 0, disabled). The server mints standby
                              work_orders (no session binding) for the gap on every Poll.

SCM connector (optional — standing tunnel so Anthropic-hosted pre-session flows can
reach a GHES host that is only routable from inside your network):
  --scm-connector-host &lt;h[:p]>   GHES hostname to forward to (port defaults to 443).
                                 Setting this enables the connector.
  --scm-connector-id &lt;n>         ghe_configurations.id for this org (REQUIRED with --scm-connector-host).
  --scm-connector-provider &lt;s>   Provider slug (default: ghe).
  --scm-connector-ca-file &lt;path> Extra CA bundle (PEM) for TLS to the GHES host.
  --scm-connector-host-rewrite &lt;from>=&lt;to_host:to_port>
                                 e2e only — redirect the TCP connect while keeping
                                 Host/SNI as --scm-connector-host.

Runtime:
  --health-port &lt;port>        Port for /healthz HTTP listener (default: ${DEFAULT_HEALTH_PORT\}). 0 disables.
                              ALWAYS returns 200 (liveness). Body carries connected/last_*/queue_counts/warm_hints_dispatched
                              for readiness/alerting. [env: SELF_HOSTED_RUNNER_HEALTH_PORT]
  --log-level &lt;level>         Log level: info or debug (default: info)

Debug:
  --debug-dir &lt;path>          DEV ONLY — writes each work-order JWT + decoded JSON + hook stderr to
                              &lt;dir>/&lt;jti>.\{jwt,json,stderr\}. Auto-pruned after 5m.
                              [env: SELF_HOSTED_RUNNER_DEBUG_DIR]

  --help, -h                  Show this help message
