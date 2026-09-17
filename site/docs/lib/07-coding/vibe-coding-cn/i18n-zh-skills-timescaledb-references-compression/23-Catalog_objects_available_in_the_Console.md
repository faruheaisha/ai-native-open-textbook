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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/compression.md"
sourceRel: "i18n/zh/skills/timescaledb/references/compression.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/compression.md"
sourceSha256: "488dd1571052c58332a963deed8b1dbd3633dc2724e884eef2085c4098409ec7"
pageSha256: "167afd4975ae336eeafbd9e98ed32789d85726cd632451bf51f14f3733a557e7"
contentMode: "local-full"
zh: ""
---

### 🔬 Catalog objects available in the Console Explorer

You can now view catalog objects in the Console Explorer. Check out the internal schemas for PostgreSQL and TimescaleDB to better understand the inner workings of your database. To turn on/off visibility, select your service in Tiger Cloud Console, then click `Explorer` and toggle `Show catalog objects`.

![Explore catalog objects](https://assets.timescale.com/docs/images/tiger-cloud-console/tiger-cloud-explorer-catalog-objects.png)

## Iceberg Destination Connector (Tiger Lake)
<Label type="date">July 18, 2025</Label>

We have released a beta Iceberg destination connector that enables Scale and Enterprise users to integrate Tiger Cloud services with Amazon S3 tables. This enables you to connect Tiger Cloud to data lakes seamlessly. We are actively developing several improvements that will make the overall data lake integration process even smoother.

To use this feature, select your service in Tiger Cloud Console, then navigate to `Connectors` and select the `Amazon S3 Tables` destination connector. Integrate the connector to your S3 table bucket by providing the ARN roles, then simply select the tables that you want to sync into S3 tables. See the [documentation](https://docs.tigerdata.com/use-timescale/latest/tigerlake/) for details.

## 🔆Console just got better
<Label type="date">July 11, 2025</Label>
