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
pageSha256: "f3829515a4df47d108c208bdca822168628747dbaebe57f5465757f18dea9f41"
contentMode: "local-full"
zh: ""
---

## Telemetry

Session children send operational telemetry to Anthropic unless you turn it off. No code or repository content is sent. Set telemetry variables on the runner process; the runner re-asserts them after applying server-provided environment variables, so the operator's setting always takes precedence.

One control is specific to self-hosted environments: `CLAUDE_CODE_BYOC_ENABLE_DATADOG=1` opts in to Datadog operational metrics, which are off by default in self-hosted environments. The general Claude Code telemetry controls, `DISABLE_TELEMETRY`, `DO_NOT_TRACK`, `DISABLE_ERROR_REPORTING`, and `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`, apply to session children as documented in the [environment variable reference](https://code.claude.com/docs/en/env-vars). `DISABLE_GROWTHBOOK` is related but different: setting `DISABLE_GROWTHBOOK=1` disables feature-flag fetching, and telemetry stays on unless `DISABLE_TELEMETRY` is also set.

`CLAUDE_CODE_ENABLE_TELEMETRY` is unrelated: it enables OpenTelemetry export to your own collector, as described in [Monitoring](https://code.claude.com/docs/en/monitoring-usage), and doesn't control Anthropic's analytics.
