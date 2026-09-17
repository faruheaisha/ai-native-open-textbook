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
sourceRel: "en/monitoring-usage.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/monitoring-usage.md"
sourceSha256: "85703528e4de5432950951e0ff1d44d191bee607096ec4370353aa6b15a70b70"
pageSha256: "01f5d9c3a74e459a93bcb2e0c232bc5c4776ef62bdbcdc67da0606deecaf5be6"
contentMode: "local-full"
zh: ""
---

## Administrator configuration

Administrators can configure OpenTelemetry settings for all users through the [managed settings file](https://code.claude.com/docs/en/managed-settings#delivery-mechanisms). See the [settings precedence](https://code.claude.com/docs/en/settings#settings-precedence) for more information about how settings are applied.

Example managed settings configuration:

```json theme={null}
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "http://collector.example.com:4317",
    "OTEL_EXPORTER_OTLP_HEADERS": "Authorization=Bearer example-token"
  }
}
```

Claude Code doesn't pass `OTEL_*` environment variables to the subprocesses it spawns, including the Bash tool, hooks, MCP servers, and language servers. An OpenTelemetry-instrumented application that you run through the Bash tool doesn't inherit Claude Code's exporter endpoint or headers, so set those variables directly in the command if that application needs to export its own telemetry.

### How managed settings lock the OTLP destination

When you set an `OTEL_EXPORTER_OTLP_*` variable in managed settings, Claude Code removes conflicting developer-set variables at startup and logs a warning you can see with `claude --debug`. What it removes depends on which variable you set:

* **Endpoints**: when you set `OTEL_EXPORTER_OTLP_ENDPOINT`, Claude Code removes every developer-set per-signal endpoint. Developers can't point one signal at a different collector, so you don't need to also set the per-signal endpoint variables in managed settings.
* **Protocols**: when you set `OTEL_EXPORTER_OTLP_PROTOCOL`, Claude Code removes every developer-set per-signal protocol.
* **Credentials**: when you set `OTEL_EXPORTER_OTLP_HEADERS`, `OTEL_EXPORTER_OTLP_CLIENT_KEY`, or `OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE`, Claude Code removes the developer-set per-signal versions of that variable, plus every developer-set endpoint variable, generic or per-signal, since those credentials would otherwise reach a collector the managed settings didn't choose.
* **Exporter selectors**: `OTEL_METRICS_EXPORTER`, `OTEL_LOGS_EXPORTER`, and the beta `OTEL_TRACES_EXPORTER` follow normal per-key precedence. A developer's setting can still disable a signal or switch it to the console exporter, so set the selectors in managed settings too if you need them locked. Across [admin sources](https://code.claude.com/docs/en/managed-settings#precedence-within-the-managed-tier), `OTEL_LOGS_EXPORTER` follows the [telemetry unit](https://code.claude.com/docs/en/server-managed-settings#per-key-exceptions-across-managed-sources) while the other two selectors merge per key. Requires Claude Code v2.1.223 or later.
* **Beta tracing endpoints**: with [detailed beta tracing](#traces-beta) active, Claude Code exports logs and traces to `BETA_TRACING_ENDPOINT` instead of through the logs and traces exporters. Claude Code therefore removes a developer-set `BETA_TRACING_ENDPOINT` whenever any of these managed settings decides either signal's destination:

  * A generic or logs/traces endpoint or credential
  * An [`otelHeadersHelper`](https://code.claude.com/docs/en/settings-reference#otelheadershelper)
  * A logs or traces exporter selector set to `none`, `console`, or empty, values that keep the signal off a collector
  * `CLAUDE_CODE_ENABLE_TELEMETRY` turned off

  A metrics-only endpoint or credential doesn't remove it. Before v2.1.251, a developer-set `BETA_TRACING_ENDPOINT` redirected the logs and traces that detailed beta tracing exports even when managed settings pinned the collector.

Claude Code doesn't remove per-signal variables that you set in managed settings itself, so you can route one signal to a different collector by setting its variable there, as the [SIEM example](#send-events-to-a-siem) does. If you set a per-signal credential there, Claude Code removes the developer-set endpoint for that signal.

This removal behavior changes where telemetry is delivered, not what Claude Code collects.

Before v2.1.217, every variable followed per-key settings precedence independently, so a signal-specific endpoint set in user settings or the shell redirected that signal away from the managed collector.

When the desktop app or a [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments) runner launches Claude Code and names an OTLP endpoint in the environment it provides, Claude Code pins the destination the same way: the launcher's telemetry variables remove developer-set variables exactly as managed settings do. Claude Code doesn't remove variables that the launcher itself set. Requires Claude Code v2.1.251 or later.
