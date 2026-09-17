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
pageSha256: "4f655676d5e7986825332ad47c9538983f97a09eafbf286c997afa5785dbf619"
contentMode: "local-full"
zh: ""
---

## Connect a Rails app to your service

Every Tiger Cloud service is a 100% Postgres database hosted in Tiger Cloud with
Tiger Data extensions such as TimescaleDB. You connect to your Tiger Cloud service
from a standard Rails app configured for Postgres.

1.  **Create a new Rails app configured for Postgres**

Rails creates and bundles your app, then installs the standard Postgres Gems.

1. **Install the TimescaleDB gem**

1.  Open `Gemfile`, add the following line, then save your changes:

1. In Terminal, run the following command:

1. **Connect your app to your Tiger Cloud service**

1.  In `<my_app_home>/config/database.yml` update the configuration to read securely connect to your Tiger Cloud service
       by adding `url: <%= ENV['DATABASE_URL'] %>` to the default configuration:

1.  Set the environment variable for `DATABASE_URL` to the value of `Service URL` from
       your [connection details][connection-info]

1. Create the database:
      - **Tiger Cloud**: nothing to do. The database is part of your Tiger Cloud service.
      - **Self-hosted TimescaleDB**, create the database for the project:

1.  Verify the connection from your app to your Tiger Cloud service:

The result shows the list of extensions in your Tiger Cloud service

|  Name  | Version | Schema | Description  |
      | --  | -- | -- | -- |
      | pg_buffercache      | 1.5     | public     | examine the shared buffer cache|
      | pg_stat_statements  | 1.11    | public     | track planning and execution statistics of all SQL statements executed|
      | plpgsql             | 1.0     | pg_catalog | PL/pgSQL procedural language|
      | postgres_fdw        | 1.1     | public     | foreign-data wrapper for remote Postgres servers|
      | timescaledb         | 2.18.1  | public     | Enables scalable inserts and complex queries for time-series data (Community Edition)|
      | timescaledb_toolkit | 1.19.0  | public     | Library of analytical hyperfunctions, time-series pipelining, and other SQL utilities|
