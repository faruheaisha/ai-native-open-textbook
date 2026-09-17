---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/third-party-tools.md"
sourceRel: "guide/ecosystem/third-party-tools.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/third-party-tools.md"
sourceSha256: "b3e2f559e8457efd6710fab561c9ec7cd746c62b9885fa5535509f700f4a2677"
pageSha256: "786637bb750ae139adb1d13b1d440962c88844afb6438e58037bd8004dc871d0"
contentMode: "local-full"
zh: ""
---

## Skills Observability

### Skillsight

The only open-source tool for team-level skills usage analytics. Ingests Claude Code OTEL telemetry and shows which skills are actually invoked (by whom, how often, in which sessions) rather than which skills you think are being used.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: PackmindHub/skillsight](https://github.com/PackmindHub/skillsight) |
| **Author** | Cédric Teyton (Packmind) |
| **License** | Apache 2.0 |
| **Version** | 0.2.1 (active, 101 commits) |
| **Stack** | Bun + Hono + PostgreSQL + React 18 (self-hosted Docker) |
| **Ingestion** | OTLP HTTP push from Claude Code, or Loki pull from Grafana Cloud |

**What it tracks:** skill invocations per user and session, plugin catalog (synced from Git marketplaces), cohort segmentation, audit log, real-time event stream.

**Two ingestion modes:**

*Direct OTLP push*: Claude Code sends telemetry straight to Skillsight. Lower latency, simpler setup:

```json
// ~/.claude/settings.json
{
  "env": {
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://your-skillsight:4200/api/v0/telemetry/v1/logs",
