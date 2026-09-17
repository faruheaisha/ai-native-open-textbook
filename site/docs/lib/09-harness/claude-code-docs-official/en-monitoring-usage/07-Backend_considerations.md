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
pageSha256: "13a914e544dc889b500ee0272658457aad74695a139fc5199030920451aec275"
contentMode: "local-full"
zh: ""
---

## Backend considerations

Your choice of metrics, logs, and traces backends determines the types of analyses you can perform:

### For metrics

* **Time series databases**: Rate calculations, aggregated metrics
* **Columnar stores**: Complex queries, unique user analysis
* **Full-featured observability platforms**: Advanced querying, visualization, alerting

### For events/logs

* **Log aggregation systems**: Full-text search, log analysis
* **Columnar stores**: Structured event analysis
* **Full-featured observability platforms**: Correlation between metrics and events

### For traces

Choose a backend that supports distributed trace storage and span correlation:

* **Distributed tracing systems**: Span visualization, request waterfalls, latency analysis
* **Full-featured observability platforms**: Trace search and correlation with metrics and logs

For organizations requiring Daily/Weekly/Monthly Active User (DAU/WAU/MAU) metrics, consider backends that support efficient unique value queries.
