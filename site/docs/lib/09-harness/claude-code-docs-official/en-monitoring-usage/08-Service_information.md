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
pageSha256: "772a323bcddcdf7fcfc2ffc277857df561f3e3362c4b1d5b9b796489255175e2"
contentMode: "local-full"
zh: ""
---

## Service information

All metrics and events are exported with the following resource attributes:

* `service.name`: `claude-code` for terminal sessions, `claude-code-desktop` for sessions started from the Code tab in the [Claude Desktop app](https://code.claude.com/docs/en/desktop)
* `service.version`: Current Claude Code version, or the Desktop app version for Code tab sessions
* `os.type`: Operating system type (for example, `linux`, `darwin`, `windows`)
* `os.version`: Operating system version string
* `host.arch`: Host architecture (for example, `amd64`, `arm64`)
* `wsl.version`: WSL version number (only present when running on Windows Subsystem for Linux)
* Meter Name: `com.anthropic.claude_code`

If your collector pipelines or dashboards filter on `service.name = claude-code`, add `claude-code-desktop` to the filter to also capture telemetry from Code tab sessions.
