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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/getting_started.md"
sourceRel: "i18n/zh/skills/timescaledb/references/getting_started.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/getting_started.md"
sourceSha256: "d89ee1583c1ea9641e14a8f176f27150301b48061cbde17049ed1e459820f0d5"
pageSha256: "c89dc73dba37fbe29e6faa27133de46c9cd6b4fe902fd3fa1cfea713747d5439"
contentMode: "local-full"
zh: ""
---

## Connect Grafana to Tiger Cloud

To visualize the results of your queries, enable Grafana to read the data in your service:

1. **Log in to Grafana**

In your browser, log in to either:
    - Self-hosted Grafana: at `http://localhost:3000/`. The default credentials are `admin`, `admin`.
    - Grafana Cloud: use the URL and credentials you set when you created your account.
1. **Add your service as a data source**
   1. Open `Connections` > `Data sources`, then click `Add new data source`.
   1. Select `PostgreSQL` from the list.
   1. Configure the connection:
      - `Host URL`, `Database name`, `Username`, and `Password`

Configure using your [connection details][connection-info]. `Host URL` is in the format `<host>:<port>`.
      - `TLS/SSL Mode`: select `require`.
      - `PostgreSQL options`: enable `TimescaleDB`.
      - Leave the default setting for all other fields.

1. Click `Save & test`.

Grafana checks that your details are set correctly.

===== PAGE: https://docs.tigerdata.com/_partials/_prereqs-cloud-project-and-self/ =====

To follow the procedure on this page you need to:

* Create a [Tiger Data account][create-account].

This procedure also works for [self-hosted TimescaleDB][enable-timescaledb].

===== PAGE: https://docs.tigerdata.com/_partials/_caggs-function-support/ =====

The following table summarizes the aggregate functions supported in continuous aggregates:

| Function, clause, or feature                               |TimescaleDB 2.6 and earlier|TimescaleDB 2.7, 2.8, and 2.9|TimescaleDB 2.10 and later|
|------------------------------------------------------------|-|-|-|
| Parallelizable aggregate functions                         |✅|✅|✅|
| [Non-parallelizable SQL aggregates][postgres-parallel-agg] |❌|✅|✅|
| `ORDER BY`                                                 |❌|✅|✅|
| Ordered-set aggregates                                     |❌|✅|✅|
| Hypothetical-set aggregates                                |❌|✅|✅|
| `DISTINCT` in aggregate functions                          |❌|✅|✅|
| `FILTER` in aggregate functions                            |❌|✅|✅|
| `FROM` clause supports `JOINS`                             |❌|❌|✅|

DISTINCT works in aggregate functions, not in the query definition. For example, for the table:

- The following works:
  
- This does not:

===== PAGE: https://docs.tigerdata.com/_partials/_psql-installation-macports/ =====

#### Installing psql using MacPorts

1.  Install the latest version of `libpqxx`:

1.  [](#)View the files that were installed by `libpqxx`:

===== PAGE: https://docs.tigerdata.com/_partials/_toolkit-install-update-redhat-base/ =====

To follow this procedure:

- [Install TimescaleDB][red-hat-install].
- Create a TimescaleDB repository in your `yum` `repo.d` directory.
