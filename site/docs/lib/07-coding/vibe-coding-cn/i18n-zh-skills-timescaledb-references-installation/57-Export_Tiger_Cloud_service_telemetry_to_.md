---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/installation.md"
sourceRel: "i18n/zh/skills/timescaledb/references/installation.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/installation.md"
sourceSha256: "4a7b57ccaa9a9f7e4c22cc7a4a1dcd5ddf03b101b4f1914bcb18219176632044"
pageSha256: "eb732355862994db7dc344e0a885c297fa5083fab291ecca7ba4fe7d6a306769"
contentMode: "local-full"
zh: ""
---

## Export Tiger Cloud service telemetry to Prometheus

To export your data, do the following:

To export metrics from a Tiger Cloud service, you create a dedicated Prometheus exporter in Tiger Cloud Console, attach it to your service, then configure Prometheus to scrape metrics using the exposed URL. The Prometheus exporter exposes the metrics related to the Tiger Cloud service like CPU, memory, and storage. To scrape other metrics, use Postgres Exporter as described for self-hosted TimescaleDB. The Prometheus exporter is available for [Scale and Enterprise][pricing-plan-features] pricing plans.

1. **Create a Prometheus exporter**

1. In [Tiger Cloud Console][open-console], click `Exporters` > `+ New exporter`.

1. Select `Metrics` for data type and `Prometheus` for provider.

![Create a Prometheus exporter in Tiger](https://assets.timescale.com/docs/images/tiger-cloud-console/tiger-console-create-prometheus-exporter.png)

1. Choose the region for the exporter. Only services in the same project and region can be attached to this exporter.

1. Name your exporter.

1. Change the auto-generated Prometheus credentials, if needed. See [official documentation][prometheus-authentication] on basic authentication in Prometheus.

1. **Attach the exporter to a service**

1. Select a service, then click `Operations` > `Exporters`.

1. Select the exporter in the drop-down, then click `Attach exporter`.

![Attach a Prometheus exporter to a Tiger Cloud service](https://assets.timescale.com/docs/images/tiger-cloud-console/attach-prometheus-exporter-tiger-console.png)

The exporter is now attached to your service. To unattach it, click the trash icon in the exporter list.

![Unattach a Prometheus exporter from a Tiger Cloud service](https://assets.timescale.com/docs/images/tiger-cloud-console/unattach-prometheus-exporter-tiger-console.png)

1. **Configure the Prometheus scrape target**

1. Select your service, then click `Operations` > `Exporters` and click the information icon next to the exporter. You see the exporter details.

![Prometheus exporter details in Tiger Cloud](https://assets.timescale.com/docs/images/tiger-cloud-console/prometheus-exporter-details-tiger-console.png)

1. Copy the exporter URL.

1. In your Prometheus installation, update `prometheus.yml` to point to the exporter URL as a scrape target:

See the [Prometheus documentation][scrape-targets] for details on configuring scrape targets.

You can now monitor your service metrics. Use the following metrics to check the service is running correctly:

*   `timescale.cloud.system.cpu.usage.millicores`
      *   `timescale.cloud.system.cpu.total.millicores`
      *   `timescale.cloud.system.memory.usage.bytes`
      *   `timescale.cloud.system.memory.total.bytes`
      *   `timescale.cloud.system.disk.usage.bytes`
      *   `timescale.cloud.system.disk.total.bytes`

Additionally, use the following tags to filter your results.

|Tag|Example variable| Description                |
      |-|-|----------------------------|
      |`host`|`us-east-1.timescale.cloud`|                            |
      |`project-id`||                            |
      |`service-id`||                            |
      |`region`|`us-east-1`| AWS region                 |
      |`role`|`replica` or `primary`| For service with replicas |

To export metrics from self-hosted TimescaleDB, you import telemetry data about your database to Postgres Exporter, then configure Prometheus to scrape metrics from it. Postgres Exporter exposes metrics that you define, excluding the system metrics.

1. **Create a user to access telemetry data about your database**

1. Connect to your database in [`psql`][psql] using your [connection details][connection-info].

1. Create a user named `monitoring` with a secure password:

1. Grant the `pg_read_all_stats` permission to the `monitoring` user:

1. **Import telemetry data about your database to Postgres Exporter**

1. Connect Postgres Exporter to your database:

Use your [connection details][connection-info] to import telemetry data about your database. You connect as
       the `monitoring` user:

- Local installation:
           
        - Docker:

1. Check the metrics for your database in the Prometheus format:
