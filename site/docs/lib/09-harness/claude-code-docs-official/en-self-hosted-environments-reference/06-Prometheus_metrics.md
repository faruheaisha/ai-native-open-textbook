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
pageSha256: "fa29642e120cf470b2c96e189049d3541d149b11313b1017cfaa473a3ef085e1"
contentMode: "local-full"
zh: ""
---

## Prometheus metrics

Each runner serves Prometheus metrics at `GET /metrics` on the same port as `/healthz`. Key series:

| Series                                                                            | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :-------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `claude_code_self_hosted_runner_info\{runner_id,version,client_label\}`             | Always `1`; useful for fleet inventory and version-drift detection                                                                                                                                                                                                                                                                                                                                                                                                       |
| `claude_code_self_hosted_runner_capacity`                                         | Configured `--capacity`                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `claude_code_self_hosted_runner_active_sessions`                                  | Sessions currently running                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `claude_code_self_hosted_runner_locked_account\{email\}`                            | Present once the runner has locked to a user and a session token carrying an `act.email` claim has been issued. The series is absent on a runner locked to a Claude Tag agent, whose session tokens carry no `act.email`. The label value is the account email; if your metrics store is broadly readable, drop or hash the label at scrape time, for example with Prometheus `metric_relabel_configs`.                                                                  |
| `claude_code_self_hosted_runner_last_poll_age_seconds`                            | Seconds since the last successful poll. Alert if over 60.                                                                                                                                                                                                                                                                                                                                                                                                                |
| `claude_code_self_hosted_runner_poll_errors_total\{error_kind\}`                    | Cumulative PollWork failures by kind: `transport`, `timeout`, `5xx`, `429`, or `4xx`. All five series are present from process start; alert on `rate(...[5m]) > 0`.                                                                                                                                                                                                                                                                                                      |
| `claude_code_self_hosted_runner_sessions_started_total\{client_platform\}`          | Session child processes spawned over the runner's lifetime, one series per session origin such as `web_claude_ai`, `ios`, `android`, `desktop_app`, or `claude_code_cli`, or `unknown` when the server didn't send one. Slack sessions carry either `claude_in_slack` or `claude-in-slack` depending on which Slack integration created them, so match both with a regex selector such as `\{client_platform=~"claude[-_]in[-_]slack"\}`. Use `sum()` for the fleet total. |
| `claude_code_self_hosted_runner_sessions_completed_total\{client_platform\}`        | Sessions that ended cleanly, labeled the same way. Broader than a plain clean exit: see [session lifecycle counter semantics](#session-lifecycle-counter-semantics) for what counts.                                                                                                                                                                                                                                                                                     |
| `claude_code_self_hosted_runner_sessions_failed_total\{client_platform\}`           | Sessions that ended in failure, labeled the same way. Same caveat: see [session lifecycle counter semantics](#session-lifecycle-counter-semantics).                                                                                                                                                                                                                                                                                                                      |
| `claude_code_self_hosted_runner_sessions_interrupted_total\{client_platform\}`      | Sessions the runner terminated for an operational reason rather than a session outcome, labeled the same way. See [session lifecycle counter semantics](#session-lifecycle-counter-semantics).                                                                                                                                                                                                                                                                           |
| `claude_code_self_hosted_runner_initializing_sessions`                            | Sessions currently in the init phase, from assignment until the child's init event                                                                                                                                                                                                                                                                                                                                                                                       |
| `claude_code_self_hosted_runner_session_init_duration_seconds`                    | Histogram of session init durations                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `claude_code_self_hosted_runner_session_init_errors_total`                        | Sessions that failed before reaching init: a checkout hook failure, git prep, token issue, or a pre-init child crash                                                                                                                                                                                                                                                                                                                                                     |
| `claude_code_self_hosted_runner_session_start_hook_errors_total`                  | `SessionStart` hooks that reported an error outcome, one per failing hook execution                                                                                                                                                                                                                                                                                                                                                                                      |
| `claude_code_self_hosted_runner_session_idle_seconds\{session_id,client_platform\}` | Per-session gauge of seconds since the session went idle. Useful for terminating sessions stuck on an unanswered permission prompt.                                                                                                                                                                                                                                                                                                                                      |

The orchestrator serves its own series at `GET /metrics` on the same port as its `/healthz`:

| Series                                                                                  | Notes                                                                                                                                                                                                                                                                                                                                                  |
| :-------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `claude_code_self_hosted_orchestrator_info\{version,pool_id,orchestrator_uuid,hostname\}` | Always `1`                                                                                                                                                                                                                                                                                                                                             |
| `claude_code_self_hosted_orchestrator_connected`                                        | `1` when the most recent poll succeeded; drops to `0` after any failed poll, whatever the failure kind                                                                                                                                                                                                                                                 |
| `claude_code_self_hosted_orchestrator_last_poll_age_seconds`                            | Seconds since the last poll attempt, success or failure, unlike the runner's identically-named metric, which measures since the last success; pair with `connected` to catch failing polls. The orchestrator's poll loop waits on hook execution, so alert above `--hook-timeout` plus a margin, around 90 seconds at defaults, rather than a flat 60. |
| `claude_code_self_hosted_orchestrator_poll_errors_total\{error_kind\}`                    | Cumulative PollSpawnHints failures by kind: `transport`, `timeout`, `5xx`, `429`, or `4xx`. All five series are present from process start; alert on `rate(...[5m]) > 0`.                                                                                                                                                                              |
| `claude_code_self_hosted_orchestrator_queue_pending_sessions`                           | Spawn requests claimable right now                                                                                                                                                                                                                                                                                                                     |
| `claude_code_self_hosted_orchestrator_queue_backing_off_sessions`                       | Spawn requests in retry backoff after a retryable hook failure                                                                                                                                                                                                                                                                                         |
| `claude_code_self_hosted_orchestrator_queue_circuit_broken_sessions`                    | Spawn requests blocked until an Owner retries them from the environment's **Activity** tab; alert if above zero                                                                                                                                                                                                                                        |
| `claude_code_self_hosted_orchestrator_pool_pending_sessions`                            | Total sessions waiting on a runner for this environment. Environment-wide aggregate, identical on every orchestrator instance: use `MAX` rather than `SUM` across instances.                                                                                                                                                                           |
| `claude_code_self_hosted_orchestrator_pool_active_sessions`                             | Sessions currently assigned to an alive runner in this environment. Environment-wide aggregate, identical on every orchestrator instance: use `MAX` rather than `SUM` across instances.                                                                                                                                                                |
| `claude_code_self_hosted_orchestrator_spawn_hooks_total\{result\}`                        | Cumulative `spawn-runner` hook outcomes: `ok`, `retryable`, `non_retryable`. Counts orchestrator hook invocations, not session children the runners spawn: not comparable to `sessions_started_total`, since capacity above one, warm pools, and runners spawned again for the same session all diverge the two.                                       |
| `claude_code_self_hosted_orchestrator_spawn_hook_duration_seconds`                      | Histogram of hook durations                                                                                                                                                                                                                                                                                                                            |
| `claude_code_self_hosted_orchestrator_warm_hints_dispatched_total`                      | Standby spawn requests dispatched since process start                                                                                                                                                                                                                                                                                                  |
| `claude_code_self_hosted_orchestrator_session_queue_wait_seconds`                       | Histogram of seconds each session waited in the queue before the orchestrator claimed it for spawn, recorded from the queue-wait timestamp the control plane sends with each session's spawn request. Use for p50/p99 queue-time alerting. Pre-warming spawns aren't sampled.                                                                          |
| `claude_code_self_hosted_orchestrator_clock_skew_seconds`                               | Local-minus-server clock skew; diagnostic, present once measured                                                                                                                                                                                                                                                                                       |
| `claude_code_self_hosted_orchestrator_scm_connector_connected`                          | `1` when the [SCM connector](#scm-connector-flags)'s WebSocket is open; `0` while dialing or backing off. Absent when `--scm-connector-host` isn't set.                                                                                                                                                                                                |
| `claude_code_self_hosted_orchestrator_scm_connector_requests_forwarded_total`           | Cumulative HTTP requests proxied to the configured SCM host since process start. Absent when `--scm-connector-host` isn't set.                                                                                                                                                                                                                         |

For autoscaling, pick the series that matches your scaling style and gate it before it feeds the scaler:

* **Queue-depth scaling**: feed `claude_code_self_hosted_orchestrator_pool_pending_sessions` into your HPA or KEDA scaler, not `queue_pending_sessions`.
* **Capacity scaling**: scale on the ratio of the runner's `active_sessions` to `capacity`.
* **Gate on `connected`**: filter the query with `claude_code_self_hosted_orchestrator_connected == 1` per instance, so a disconnected replica's stale value doesn't feed the scaler.

During a full poll outage, every replica disconnected, the gated query returns no data. HPA holds the current replica count on a missing metric, but KEDA's Prometheus scaler at its default `ignoreNullValues: "true"` reads the empty result as zero and scales in; set `ignoreNullValues: "false"` on the ScaledObject, optionally with a `fallback` replica floor.

The following Prometheus Operator `PodMonitor` covers both processes. It selects pods by the `app.kubernetes.io/part-of: claude-code-self-hosted-runner` label and the named `health` port that the [Kubernetes recipe](https://code.claude.com/docs/en/self-hosted-environments-deploy#kubernetes) sets; adjust the namespaces to match your deployment:

```yaml theme={null}
# Example Prometheus Operator PodMonitor for the Claude Code self-hosted
# runner + orchestrator. Adjust the namespace and label selectors to match
# your deployment. Both the runner and the orchestrator serve /metrics on
# their --health-port (default 8080).
apiVersion: monitoring.coreos.com/v1
kind: PodMonitor
metadata:
  name: claude-code-self-hosted-runner
  namespace: monitoring
spec:
  namespaceSelector:
    matchNames:
      - claude-runners
  selector:
    matchExpressions:
      # Matches the runner Deployment from the Kubernetes recipe, plus any
      # on-demand runner Jobs and orchestrator pods you label the same way
      # and give a named 'health' containerPort.
      - key: app.kubernetes.io/part-of
        operator: In
        values: [claude-code-self-hosted-runner]
  podMetricsEndpoints:
    - port: health
      path: /metrics
      interval: 30s
```

These sample alert rules are a starting point; tune the thresholds for your fleet size:

```yaml theme={null}
# Example Prometheus alert rules for the Claude Code self-hosted runner
# + orchestrator. Tune thresholds for your fleet size and SLOs.
groups:
  - name: claude-code-self-hosted-runner
    rules:
      - alert: ClaudeRunnerPollStale
        expr: claude_code_self_hosted_runner_last_poll_age_seconds > 60
        for: 2m
        labels: {severity: warning}
        annotations:
          summary: "Runner {{ $labels.pod }} has not polled in >60s"
      - alert: ClaudeRunnerVersionDrift
        expr: count(count by (version) (claude_code_self_hosted_runner_info)) > 1
        for: 30m
        labels: {severity: info}
        annotations:
          summary: "Runners are running mixed versions"
      - alert: ClaudeRunnerInitErrorsHigh
        expr: increase(claude_code_self_hosted_runner_session_init_errors_total[10m]) > 3
        for: 5m
        labels: {severity: warning}
        annotations:
          summary: "Runner {{ $labels.pod }}: >3 session init failures in 10m (checkout hook / git / token / pre-init crash)"
      - alert: ClaudeRunnerPollErrors
        expr: sum by (pod) (rate(claude_code_self_hosted_runner_poll_errors_total[5m])) > 0
        for: 2m
        labels: {severity: warning}
        annotations:
          summary: "Runner {{ $labels.pod }}: PollWork failing ({{ $value | humanize }}/s over 5m)"
      - alert: ClaudeRunnerSessionStartHookErrors
        expr: increase(claude_code_self_hosted_runner_session_start_hook_errors_total[10m]) > 3
        for: 5m
        labels: {severity: warning}
        annotations:
          summary: "Runner {{ $labels.pod }}: >3 SessionStart hook failures in 10m"

  - name: claude-code-self-hosted-orchestrator
    rules:
      - alert: ClaudeOrchestratorDisconnected
        expr: claude_code_self_hosted_orchestrator_connected == 0
        for: 2m
        labels: {severity: critical}
        annotations:
          summary: "Orchestrator {{ $labels.pod }} cannot reach the Anthropic control plane"
      - alert: ClaudeOrchestratorPollStale
        expr: claude_code_self_hosted_orchestrator_last_poll_age_seconds > 90
        for: 2m
        labels: {severity: warning}
        annotations:
          summary: "Orchestrator {{ $labels.pod }} has not polled in >90s (poll loop waits on hook execution)"
      - alert: ClaudeOrchestratorCircuitBroken
        expr: claude_code_self_hosted_orchestrator_queue_circuit_broken_sessions > 0
        for: 1m
        labels: {severity: critical}
        annotations:
          summary: "{{ $value }} sessions circuit-broken — spawn-runner hook is repeatedly non-retryable; fix infra then retry from the Activity tab"
      - alert: ClaudeOrchestratorPollErrors
        expr: sum by (pod) (rate(claude_code_self_hosted_orchestrator_poll_errors_total[5m])) > 0
        for: 2m
        labels: {severity: warning}
        annotations:
          summary: "Orchestrator {{ $labels.pod }}: PollSpawnHints failing ({{ $value | humanize }}/s over 5m)"
      - alert: ClaudeOrchestratorSpawnHookFailing
        expr: sum by (pod) (increase(claude_code_self_hosted_orchestrator_spawn_hooks_total{result!="ok"}[5m])) > 3
        for: 5m
        labels: {severity: warning}
        annotations:
          summary: "Orchestrator {{ $labels.pod }}: >3 spawn-runner hook failures in 5m"
```

### Pass through session-child metrics

Each session runs in its own child process with its own OpenTelemetry metrics; at `--capacity` above one, the runner rewrites how those child metrics are exposed. Setting `OTEL_METRICS_EXPORTER=prometheus` on the runner host and `CLAUDE_CODE_ENABLE_TELEMETRY=1` in the session's environment, for example from your [wrapper script](https://code.claude.com/docs/en/self-hosted-environments-configuration#wrapper-scripts) or the runner's own environment, which sessions inherit, re-exposes each child's counter and gauge instruments on the runner's own `/metrics` endpoint, alongside the runner's series. The runner rewrites the child's exporter to push over OTLP to a loopback-only receiver on the health port, tags each series with `session_id` and `client_platform` labels, and evicts a session's series when that session ends. Histograms don't pass through, and a child metric whose name would collide with the runner's own prefix is dropped.

At the default `--capacity 1`, the rewrite doesn't apply: the session's child binds its own Prometheus endpoint on port 9464 as usual.

### Session lifecycle counter semantics

The `sessions_started_total`, `sessions_completed_total`, `sessions_failed_total`, and `sessions_interrupted_total` counters classify each session by how it ended. Every spawned session child increments `sessions_started_total` at spawn time, and exactly one of the other three increments at exit, so `sessions_started_total` minus the sum of the other three equals the number of session children currently running.

* `completed`: the session ended cleanly. This covers the child exiting on its own with code `0`, the session being archived or deleted while the child was still connected, and the runner handing the slot back cleanly: releasing the session at the idle timeout, the retire time, or the `--kill-session-after-min` limit; a startup timeout; or a server-side deassign the poll loop noticed before the child exited. Increments `sessions_completed_total`.
* `failed`: the child exited on its own with a non-zero code, either a crash or a setup failure after spawn. Increments `sessions_failed_total`.
* `interrupted`: the runner terminated the child for an operational reason that's neither a session success nor a runner fault, such as a drain, or terminating a session that was still on the runner when the [`SELF_HOSTED_RUNNER_MAX_LIFETIME_GRACE_MS`](#environment-variable-only-settings) grace window after its `--kill-session-after-min` limit ended. A Kubernetes rolling restart sending `SIGTERM` is one example of a drain. Increments `sessions_interrupted_total`.

Before v2.1.260, the runner terminated every session that reached its `--kill-session-after-min` limit and counted it in `sessions_interrupted_total`.

The [`post-session` hook](https://code.claude.com/docs/en/self-hosted-environments-configuration#post-session)'s `CLAUDE_RUNNER_EXIT_REASON` classifies clean handoffs differently. The hook reports a release, a startup timeout, and a server deassign as `interrupted`, because the runner stopped the child. These counters record the same events as `completed`, because the slot was handed back cleanly.

If you reconcile hook receipts against `sessions_completed_total` directly, you undercount completions. Use the hook for per-session guarantees and the counters for aggregate rates.

On a one-shot environment, `--capacity 1` with the default `--drain-grace-sec 0`, each runner process exits moments after its one session ends. `sessions_completed_total`, `sessions_failed_total`, and `sessions_interrupted_total` increment only at session end, right before that exit, so a Prometheus scrape every 15 to 60 seconds rarely catches the increment before the runner's series disappears; these three end-of-session counters are the terminal counters the rest of this section refers to. `sessions_started_total` increments at spawn and stays visible for the life of the session, so it reliably shows up, but on a one-shot environment it reads closer to "sessions currently running" than a cumulative count.

Use the series in this table for the corresponding goal instead of the terminal counters:

| Goal        | Use                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Throughput  | `claude_code_self_hosted_orchestrator_spawn_hooks_total\{result="ok"\}`, a counter on the long-lived orchestrator that increments once per successful `spawn-runner` hook and stays meaningful under `rate()`. It counts hook invocations rather than sessions, so pre-warming and repeated spawns for the same session diverge it from session counts.                                                                                                                                                                |
| Utilization | `sum(claude_code_self_hosted_runner_active_sessions)` against `sum(claude_code_self_hosted_runner_capacity)`, both gauges valid at every scrape regardless of runner lifetime                                                                                                                                                                                                                                                                                                                                        |
| Backlog     | `claude_code_self_hosted_orchestrator_pool_pending_sessions` for queue depth, and `claude_code_self_hosted_orchestrator_queue_circuit_broken_sessions`, alerting if above zero                                                                                                                                                                                                                                                                                                                                       |
| Failures    | `claude_code_self_hosted_runner_sessions_failed_total`, best effort: real crashes after spawn do increment it, and `rate()` is meaningful on runners that outlive their sessions with `--drain-grace-sec` above `0`. A one-shot environment has the same scrape-window problem as the other terminal counters, so treat any non-zero value you do see as worth investigating. Failures before spawn, such as a checkout hook failure, git preparation, or a token issue, appear only in `session_init_errors_total`. |

The `orchestrator_*` rows exist only on environments running the [on-demand orchestrator](https://code.claude.com/docs/en/self-hosted-environments-configuration#on-demand-runners). On a fixed fleet whose runners outlive their sessions, with `--drain-grace-sec` above `0`, use `sum(rate(claude_code_self_hosted_runner_sessions_started_total[5m]))` for throughput; on a one-shot fleet that series has the same scrape-window problem as the terminal counters, so rely on the queued-sessions count instead. Check backlog on the environment's **Activity** tab, on the [**Cloud environments** admin page](https://claude.ai/admin-settings/cloud-environments): the runners don't export a queue-depth series.

For per-session outcome reporting, use the [`post-session` hook](https://code.claude.com/docs/en/self-hosted-environments-configuration#post-session) instead: it fires at every session end where a child process was spawned, apart from abrupt runner termination such as a VM preemption, per the [hook's own contract](https://code.claude.com/docs/en/self-hosted-environments-configuration#post-session).
