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
pageSha256: "ed1fdf239aa15f89076e82d773c40c63f42ada5e37f1183bdbf575aa851d744f"
contentMode: "local-full"
zh: ""
---

## Add your Tiger Cloud service as a virtual connection

To connect the data in your Tiger Cloud service to Tableau:

1.  **Log in to Tableau**
    - Tableau Cloud: [sign in][tableau-login], then click `Explore` and select a project.
    - Tableau Desktop: sign in, then open a workbook.

1.  **Configure Tableau to connect to your Tiger Cloud service**
    1. Add a new data source:
       - Tableau Cloud: click `New` > `Virtual Connection`.
       - Tableau Desktop: click `Data` > `New Data Source`.
    1. Search for and select `PostgreSQL`.

For Tableau Desktop download the driver and restart Tableau.
    1. Configure the connection:
        - `Server`, `Port`, `Database`, `Username`, `Password`: configure using your [connection details][connection-info].
        - `Require SSL`: tick the checkbox.

1.  **Click `Sign In` and connect Tableau to your service**

You have successfully integrated Tableau with Tiger Cloud.

===== PAGE: https://docs.tigerdata.com/integrations/apache-kafka/ =====
