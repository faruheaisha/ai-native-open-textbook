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
pageSha256: "cc5499109f5ff4a6ec406cfe454dff6f795262e9f7b4c1f9225e7be061f1c5f9"
contentMode: "local-full"
zh: ""
---

## Quick start

Configure OpenTelemetry using environment variables:

```bash theme={null}
# 1. Enable telemetry
export CLAUDE_CODE_ENABLE_TELEMETRY=1

# 2. Choose exporters (both are optional - configure only what you need)
export OTEL_METRICS_EXPORTER=otlp       # Options: otlp, prometheus, console, none
export OTEL_LOGS_EXPORTER=otlp          # Options: otlp, console, none

# 3. Configure OTLP endpoint (for OTLP exporter)
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317

# 4. Set authentication (if required)
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer your-token"

# 5. For debugging: reduce export intervals, and reset them for production use
export OTEL_METRIC_EXPORT_INTERVAL=10000  # 10 seconds (default: 60000ms)
export OTEL_LOGS_EXPORT_INTERVAL=5000     # 5 seconds (default: 5000ms)

# 6. Run Claude Code
claude
```

To verify a setup that exports metrics, check your backend for the `claude_code.session.count` metric, which Claude Code emits when a session starts. To verify a logs-only setup, submit a prompt and check for the `claude_code.user_prompt` event.

If nothing arrives, run `claude --debug` and check the debug log. Claude Code reports failures from the exporters you configure as `[3P telemetry]` errors, where 3P means third-party. Lines prefixed `[Anthropic telemetry]` describe [Anthropic's separate operational telemetry](https://code.claude.com/docs/en/data-usage#telemetry-services) and don't indicate a problem with your setup.

For full configuration options, see the [OpenTelemetry specification](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/protocol/exporter.md#configuration-options).
