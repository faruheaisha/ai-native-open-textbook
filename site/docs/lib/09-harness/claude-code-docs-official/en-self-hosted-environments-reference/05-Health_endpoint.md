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
pageSha256: "ad32473118b6e494f1353d04255da2e86b057bc991af23cf45802e00f6ef2878"
contentMode: "local-full"
zh: ""
---

## Health endpoint

The runner serves `GET /healthz` on the configured health port. The response is `200 OK` whenever the process is alive, whatever state the poll loop is in, so an HTTP probe on this endpoint detects a dead process only. The JSON body describes current state:

```json theme={null}
{
  "status": "ok",
  "runner_id": "ccrunner_...",
  "active_sessions": 2,
  "last_poll_at": "2026-03-31T18:04:11.220Z",
  "last_poll_age_ms": 842
}
```

Use `last_poll_age_ms` as a liveness signal in custom probes; a value that grows unbounded indicates the poll loop is stuck. Both `last_poll_at` and `last_poll_age_ms` are `null` until the first poll completes.

The orchestrator serves its own `/healthz` on its health port. Its endpoint always returns `200`, and the body carries a `connected` field reporting whether the most recent poll succeeded, plus per-state spawn-queue counts in `queue_counts`. Gate readiness and alerting on `connected` rather than the status code.

When the [SCM connector](#scm-connector-flags) is configured, the orchestrator's `/healthz` body also carries `scm_connector_connected` and a `scm_connector` object with `connected`, `last_connected_at`, `last_error`, `reconnects`, and `requests_forwarded`. Both fields are `null` when `--scm-connector-host` isn't set.
