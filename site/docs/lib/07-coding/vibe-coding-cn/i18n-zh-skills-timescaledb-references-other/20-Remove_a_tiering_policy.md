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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/other.md"
sourceRel: "i18n/zh/skills/timescaledb/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/other.md"
sourceSha256: "b53764abbdaf16beaf22420ad0a62ac75d41058fb99968403f1bbd067870709e"
pageSha256: "29118f59ff40423ce0d27253e42ad93fd766edc7cc04853396d3e3fd391c4300"
contentMode: "local-full"
zh: ""
---

#### Remove a tiering policy

To remove an existing tiering policy, call `remove_tiering_policy`:

For example, to remove the tiering policy from the `example` hypertable:

If you remove a tiering policy, the remaining scheduled chunks are not tiered. However, chunks in tiered storage are not untiered. You [untier chunks manually][manual-tier] to local storage.

### Manually tier and untier chunks

If tiering policies do not meet your current needs, you can tier and untier chunks manually. To do so, [connect to your service][connect-to-service] and run the queries below in the data mode, the SQL editor, or using `psql`.

Tiering a chunk is an asynchronous process that schedules the chunk to be tiered. In the following example, you tier chunks older than three days in the `example` hypertable. You then list the tiered chunks.

1. **Select all chunks in `example` that are older than three days:**

This returns a list of chunks. Take a note of the chunk names:

1. **Call `tier_chunk` to manually tier each chunk:**

1. **Repeat for all chunks you want to tier.**

Tiering a chunk schedules it for migration to the object storage tier, but the migration won't happen immediately. Chunks are tiered one at a time in order to minimize database resource consumption. A chunk is marked as migrated and deleted from the standard storage only after it has been durably stored in the object storage tier. You can continue to query a chunk during migration.

1. **To see which chunks are tiered into the object storage tier, use the `tiered_chunks` informational view:**

To see which chunks are scheduled for tiering either by policy or by a manual call, but have not yet been tiered, use this view:

To update data in a tiered chunk, move it back to the standard high-performance storage tier in Tiger Cloud. Untiering chunks is a synchronous process. Chunks are renamed when the data is untiered.

To untier a chunk, call the `untier_chunk` stored procedure.

1.  **Check which chunks are currently tiered:**

1.  **Call `untier_chunk`**:

1.  **See the details of the chunk with `timescaledb_information.chunks`**:

If you no longer want to use tiered storage for a particular hypertable, drop the associated metadata by calling `disable_tiering`.

1. **To drop all tiering policies associated with a table, call `remove_tiering_policy`**.

1. **Make sure that there is no tiered data associated with this hypertable**:

1. List the tiered chunks associated with this hypertable:

1. If you have any tiered chunks, either untier this data, or drop these chunks from tiered storage.

1. **Use `disable_tiering` to drop all tiering-related metadata for the hypertable**:

1. **Verify that tiering has been disabled by listing the hypertables that have tiering enabled**:

===== PAGE: https://docs.tigerdata.com/use-timescale/data-tiering/querying-tiered-data/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT add_tiering_policy(hypertable REGCLASS, move_after INTERVAL, if_not_exists BOOL = false);
```

Example 2 (sql):
```sql
SELECT add_tiering_policy('example', INTERVAL '3 days');
```

Example 3 (sql):
```sql
SELECT remove_tiering_policy(hypertable REGCLASS, if_exists BOOL = false);
```

Example 4 (sql):
```sql
SELECT remove_tiering_policy('example');
```

---

## Integrate with PostgreSQL

**URL:** llms-txt#integrate-with-postgresql

**Contents:**
- Prerequisites
- Query another data source

You use Postgres foreign data wrappers (FDWs) to query external data sources from a Tiger Cloud service. These external data sources can be one of the following:

- Other Tiger Cloud services
- Postgres databases outside of Tiger Cloud

If you are using VPC peering, you can create FDWs in your Customer VPC to query a service in your Tiger Cloud project. However, you can't create FDWs in your Tiger Cloud services to query a data source in your Customer VPC. This is because Tiger Cloud VPC peering uses AWS PrivateLink for increased security. See [VPC peering documentation][vpc-peering] for additional details.

Postgres FDWs are particularly useful if you manage multiple Tiger Cloud services with different capabilities, and need to seamlessly access and merge regular and time-series data.

To follow the steps on this page:

* Create a target [Tiger Cloud service][create-service] with the Real-time analytics capability.

You need [your connection details][connection-info]. This procedure also
   works for [self-hosted TimescaleDB][enable-timescaledb].

## Query another data source

To query another data source:

You create Postgres FDWs with the `postgres_fdw` extension, which is enabled by default in Tiger Cloud.

1. **Connect to your service**

See [how to connect][connect].

1. **Create a server**

Run the following command using your [connection details][connection-info]:

1. **Create user mapping**

Run the following command using your [connection details][connection-info]:

1. **Import a foreign schema (recommended) or create a foreign table**

- Import the whole schema:

- Alternatively, import a limited number of tables:

- Create a foreign table. Skip if you are importing a schema:

A user with the `tsdbadmin` role assigned already has the required `USAGE` permission to create Postgres FDWs. You can enable another user, without the `tsdbadmin` role assigned, to query foreign data. To do so, explicitly grant the permission. For example, for a new `grafana` user:

You create Postgres FDWs with the `postgres_fdw` extension. See [documenation][enable-fdw-docs] on how to enable it.

1. **Connect to your database**

Use [`psql`][psql] to connect to your database.

1. **Create a server**

Run the following command using your [connection details][connection-info]:

1. **Create user mapping**

Run the following command using your [connection details][connection-info]:

1. **Import a foreign schema (recommended) or create a foreign table**

- Import the whole schema:

- Alternatively, import a limited number of tables:

- Create a foreign table. Skip if you are importing a schema:

===== PAGE: https://docs.tigerdata.com/integrations/power-bi/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE SERVER myserver
   FOREIGN DATA WRAPPER postgres_fdw
   OPTIONS (host '<host>', dbname 'tsdb', port '<port>');
```

Example 2 (sql):
```sql
CREATE USER MAPPING FOR tsdbadmin
   SERVER myserver
   OPTIONS (user 'tsdbadmin', password '<password>');
```

Example 3 (sql):
```sql
CREATE SCHEMA foreign_stuff;

      IMPORT FOREIGN SCHEMA public
      FROM SERVER myserver
      INTO foreign_stuff ;
```

Example 4 (sql):
```sql
CREATE SCHEMA foreign_stuff;

      IMPORT FOREIGN SCHEMA public
      LIMIT TO (table1, table2)
      FROM SERVER myserver
      INTO foreign_stuff;
```

---

## About configuration in Tiger Cloud

**URL:** llms-txt#about-configuration-in-tiger-cloud

By default, Tiger Cloud uses the default Postgres server configuration settings.
Most configuration values for a Tiger Cloud service are initially set in accordance with
best practices given the compute and storage settings of the service. Any time
you increase or decrease the compute for a service, the most essential values
are set to reflect the size of the new service.

There are times, however, when your specific workload could require tuning some
of the many available Tiger Cloud-specific and Postgres parameters. By providing the
ability to tune various runtime settings, Tiger Cloud provides the balance
and flexibility you need when running your workloads in a hosted environment.
You can use [service settings][settings] and [service operations][operations] to
customize Tiger Cloud configurations.

===== PAGE: https://docs.tigerdata.com/use-timescale/configuration/customize-configuration/ =====

---

## Integrations

**URL:** llms-txt#integrations

**Contents:**
- Integrates with Postgres? Integrates with your service!
- Authentication and security
- Business intelligence and data visualization
- Configuration and deployment
- Data engineering and extract, transform, load
- Data ingestion and streaming
- Development tools
- Language-specific integrations
- Logging and system administration
- Observability and alerting

You can integrate your Tiger Cloud service with third-party solutions to expand and extend what you can do with your data.

## Integrates with Postgres? Integrates with your service!

A Tiger Cloud service is a Postgres database instance extended by Tiger Data with custom capabilities. This means that any third-party solution that you can integrate with Postgres, you can also integrate with Tiger Cloud. See the full list of Postgres integrations [here][postgresql-integrations].

Some of the most in-demand integrations are listed below.

## Authentication and security

|                                                                Name                                                                 | Description                                                               |
|:-----------------------------------------------------------------------------------------------------------------------------------:|---------------------------------------------------------------------------|
| <img isIcon src='https://assets.timescale.com/docs/icons/auth-logo.png' alt='auth-logo'  />[Auth.js][auth-js] | Implement authentication and authorization for web applications.          |
|                                                           <img isIcon src='https://assets.timescale.com/docs/icons/auth0-logo.png' alt='auth0-logo'  />[Auth0][auth0]                                                            | Securely manage user authentication and access controls for applications. |
|                                                            <img isIcon src='https://assets.timescale.com/docs/icons/okta-logo.png' alt='okta-logo'  />[Okta][okta]                                                             | Secure authentication and user identity management for applications.      |

## Business intelligence and data visualization

|                                                                Name                                                                | Description                                                             |
|:----------------------------------------------------------------------------------------------------------------------------------:|-------------------------------------------------------------------------|
|                                                         <img isIcon src='https://assets.timescale.com/docs/icons/cube-js-logo.png' alt='cubejs-logo'  />[Cube.js][cube-js]                                                         | Build and optimize data APIs for analytics applications.                |
| <img isIcon src='https://assets.timescale.com/docs/icons/looker-logo.png' alt='looker-logo'  />[Looker][looker] | Explore, analyze, and share business insights with a BI platform.       |
|                                                        <img isIcon src='https://assets.timescale.com/docs/icons/metabase-logo.png' alt='metabase-logo'  />[Metabase][metabase]                                                        | Create dashboards and visualize business data without SQL expertise.    |
|                                                        <img isIcon src='https://assets.timescale.com/docs/icons/power-bi-logo.png' alt='power-bi-logo'  />[Power BI][power-bi]                                                        | Visualize data, build interactive dashboards, and share insights.       |
|                                                        <img isIcon src='https://assets.timescale.com/docs/icons/superset-logo.png' alt='superset-logo'  />[Superset][superset]                                                        | Create and explore data visualizations and dashboards.                  |

## Configuration and deployment

|                Name                | Description                                                                    |
|:----------------------------------:|--------------------------------------------------------------------------------|
| <img isIcon src='https://assets.timescale.com/docs/icons/azure-functions-logo.png' alt='azure-functions-logo'  />[Azure Functions][azure-functions] | Run event-driven serverless code in the cloud without managing infrastructure. |
|     <img isIcon src='https://assets.timescale.com/docs/icons/deno-deploy-logo.png' alt='deno-deploy-logo'  />[Deno Deploy][deno-deploy]     | Deploy and run JavaScript and TypeScript applications at the edge.             |
|          <img isIcon src='https://assets.timescale.com/docs/icons/flyway-logo.png' alt='flyway-logo'  />[Flyway][flyway]          | Manage and automate database migrations using version control.                 |
|       <img isIcon src='https://assets.timescale.com/docs/icons/liquibase-logo.png' alt='liquibase-logo'  />[Liquibase][liquibase]       | Track, version, and automate database schema changes.                          |
|          <img isIcon src='https://assets.timescale.com/docs/icons/pulimi-logo.png' alt='pulimi-logo'  />[Pulumi][pulumi]          | Define and manage cloud infrastructure using code in multiple languages.       |
|          <img isIcon src='https://assets.timescale.com/docs/icons/render-logo.png' alt='render-logo'  />[Render][render]          | Deploy and scale web applications, databases, and services easily.             |
|    <img isIcon src='https://assets.timescale.com/docs/icons/terraform-logo.png' alt='terraform-logo'  />[Terraform][terraform]          | Safely and predictably provision and manage infrastructure in any cloud.       |
| <img isIcon src='https://assets.timescale.com/docs/icons/kubernets-logo.png' alt='kubernets-logo'  />[Kubernetes][kubernetes] | Deploy, scale, and manage containerized applications automatically. |

## Data engineering and extract, transform, load

|            Name                      | Description                                                                              |
|:------------------------------------:|------------------------------------------------------------------------------------------|
|          <img isIcon src='https://assets.timescale.com/docs/icons/airbyte-logo.png' alt='airbyte-logo'  />[Airbyte][airbyte]          | Sync data between various sources and destinations.                                      |
| <img isIcon src='https://assets.timescale.com/docs/icons/amazon-sagemaker-logo.png' alt='amazon-sagemaker-logo'  />[Amazon SageMaker][amazon-sagemaker] | Build, train, and deploy ML models into a production-ready hosted environment.           |
|   <img isIcon src='https://assets.timescale.com/docs/icons/airflow-logo.png' alt='airflow-logo'  />[Apache Airflow][apache-airflow]   | Programmatically author, schedule, and monitor workflows.                                |
|      <img isIcon src='https://assets.timescale.com/docs/icons/beam-logo.png' alt='beam-logo'  />[Apache Beam][apache-beam]      | Build and execute batch and streaming data pipelines across multiple processing engines. |
|        <img isIcon src='https://assets.timescale.com/docs/icons/kafka-logo.png' alt='kafka-logo'  />[Apache Kafka][kafka]         | Stream high-performance data pipelines, analytics, and data integration.                 |
|       <img isIcon src='https://assets.timescale.com/docs/icons/lambda-logo.png' alt='lambda-logo'  />[AWS Lambda][aws-lambda]       | Run code without provisioning or managing servers, scaling automatically as needed.      |
|              <img isIcon src='https://assets.timescale.com/docs/icons/dbt-logo.png' alt='dbt-logo'  />[dbt][dbt]              | Transform and model data in your warehouse using SQL-based workflows.                    |
|         <img isIcon src='https://assets.timescale.com/docs/icons/debezium-logo.png' alt='debezium-logo'  />[Debezium][debezium]         | Capture and stream real-time changes from databases.                                     |
|        <img isIcon src='https://assets.timescale.com/docs/icons/decodable-logo.png' alt='decodable-logo'  />[Decodable][decodable]        | Build, run, and manage data pipelines effortlessly.                                      |
|        <img isIcon src='https://assets.timescale.com/docs/icons/delta-lake-logo.png' alt='delta-lake-logo'  />[DeltaLake][deltalake]        | Enhance data lakes with ACID transactions and schema enforcement.                        |
| <img isIcon src='https://assets.timescale.com/docs/icons/firebase-logo.png' alt='firebase-logo'  />[Firebase Wrapper][firebase-wrapper] | Simplify interactions with Firebase services through an abstraction layer.               |
|           <img isIcon src='https://assets.timescale.com/docs/icons/stitch-logo.png' alt='stitch-logo'  />[Stitch][stitch]           | Extract, load, and transform data from various sources to data warehouses.               |

## Data ingestion and streaming

|                                                                 Name                                                                  | Description                                                                                                                |
|:-------------------------------------------------------------------------------------------------------------------------------------:|----------------------------------------------------------------------------------------------------------------------------|
|       <img isIcon src='https://assets.timescale.com/docs/icons/spark-logo.png' alt='spark-logo' />[Apache Spark][apache-spark]        | Process large-scale data workloads quickly using distributed computing.                                                    |
|      <img isIcon src='https://assets.timescale.com/docs/icons/confluent-logo.png' alt='confluent-logo'  />[Confluent][confluent]      | Manage and scale Apache Kafka-based event streaming applications. You can also [set up Postgres as a source][confluent-source]. |
| <img isIcon src='https://assets.timescale.com/docs/icons/electric-sql-logo.png' alt='electric-sql-logo'  />[ElectricSQL][electricsql] | Enable real-time synchronization between databases and frontend applications.                                              |
|                <img isIcon src='https://assets.timescale.com/docs/icons/emqx-logo.png' alt='emqx-logo'  />[EMQX][emqx]                | Deploy an enterprise-grade MQTT broker for IoT messaging.                                                                  |
|          <img isIcon src='https://assets.timescale.com/docs/icons/estuary-logo.png' alt='estuary-logo'  />[Estuary][estuary]          | Stream and synchronize data in real time between different systems.                                                        |
|              <img isIcon src='https://assets.timescale.com/docs/icons/flink-logo.png' alt='flink-logo'  />[Flink][flink]              | Process real-time data streams with fault-tolerant distributed computing.                                                  |
|        <img isIcon src='https://assets.timescale.com/docs/icons/fivetran-logo.png' alt='fivetran-logo'  />[Fivetran][fivetran]        | Sync data from multiple sources to your data warehouse.                                                                    |
|        <img isIcon src='https://assets.timescale.com/docs/icons/highbyte-logo.svg' alt='highbyte-logo'  />[HighByte][highbyte]        | Connect operational technology sources, model the data, and stream it into Postgres.                                            |
|       <img isIcon src='https://assets.timescale.com/docs/icons/red-panda-logo.png' alt='red-panda-logo'  />[Redpanda][redpanda]       | Stream and process real-time data as a Kafka-compatible platform.                                                          |
|            <img isIcon src='https://assets.timescale.com/docs/icons/striim-logo.png' alt='strimm-logo'  />[Striim][striim]            | Ingest, process, and analyze real-time data streams.                                                                       |

|                  Name                   | Description                                                                          |
|:---------------------------------------:|--------------------------------------------------------------------------------------|
| <img isIcon src='https://assets.timescale.com/docs/icons/deepnote-logo.png' alt='deepnote-logo' />[Deepnote][deepnote]                    | Collaborate on data science projects with a cloud-based notebook platform.           |
|            <img isIcon src='https://assets.timescale.com/docs/icons/django-logo.png' alt='django-logo' />[Django][django]             | Develop scalable and secure web applications using a Python framework.               |
|         <img isIcon src='https://assets.timescale.com/docs/icons/long-chain-logo.png' alt='long-chain-logo' />[LangChain][langchain]          | Build applications that integrate with language models like GPT.                     |
|              <img isIcon src='https://assets.timescale.com/docs/icons/rust-logo.png' alt='rust-logo' />[Rust][rust]               | Build high-performance, memory-safe applications with a modern programming language. |
|         <img isIcon src='https://assets.timescale.com/docs/icons/streamlit-logo.png' alt='streamlit-logo' />[Streamlit][streamlit]          | Create interactive data applications and dashboards using Python.                    |

## Language-specific integrations

|        Name        | Description                                       |
|:------------------:|---------------------------------------------------|
|  <img isIcon src='https://assets.timescale.com/docs/icons/golang-logo.png' alt='golang-logo' />[Golang][golang]  | Integrate Tiger Cloud with a Golang application.  |
|    <img isIcon src='https://assets.timescale.com/docs/icons/java-logo.png' alt='java-logo' />[Java][java]    | Integrate Tiger Cloud with a Java application.    |
| <img isIcon src='https://assets.timescale.com/docs/icons/node-logo.png' alt='node-logo' />[Node.js][node-js] | Integrate Tiger Cloud with a Node.js application. |
|  <img isIcon src='https://assets.timescale.com/docs/icons/python-logo.png' alt='python-logo' />[Python][python]  | Integrate Tiger Cloud with a Python application.  |
|    <img isIcon src='https://assets.timescale.com/docs/icons/ruby-logo.png' alt='ruby-logo' />[Ruby][ruby]    | Integrate Tiger Cloud with a Ruby application.    |

## Logging and system administration

|          Name          | Description                                                               |
|:----------------------:|---------------------------------------------------------------------------|
|   <img isIcon src='https://assets.timescale.com/docs/icons/rsyslog-logo.png' alt='rsyslog-logo' />[RSyslog][rsyslog]   | Collect, filter, and forward system logs for centralized logging.         |
| <img isIcon src='https://assets.timescale.com/docs/icons/schemaspy-logo.png' alt='schemaspy-logo' />[SchemaSpy][schemaspy] | Generate database schema documentation and visualization.                 |

## Observability and alerting

|                          Name                          | Description                                                                                                                                               |
|:------------------------------------------------------:|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
|            <img isIcon src='https://assets.timescale.com/docs/icons/cloudwatch-logo.png' alt='cloudwatch-logo' />[Amazon Cloudwatch][cloudwatch]             | Collect, analyze, and act on data from applications, infrastructure, and services running in AWS and on-premises environments.                            |
|         <img isIcon src='https://assets.timescale.com/docs/icons/skywalking-logo.png' alt='skywalking-logo' />[Apache SkyWalking][apache-skywalking]         | Monitor, trace, and diagnose distributed applications for improved observability. You can also [set up Postgres as storage][apache-skywalking-storage]. |
|             <img isIcon src='https://assets.timescale.com/docs/icons/azure-monitor-logo.png' alt='azure-monitor-logo' />[Azure Monitor][azure-monitor]             | Collect and analyze telemetry data from cloud and on-premises environments.
|                   <img isIcon src='https://assets.timescale.com/docs/icons/dash0-logo.png' alt='dash0-logo' />[Dash0][dash0]                   | OpenTelemetry Native Observability, built on CNCF Open Standards like PromQL, Perses, and OTLP, and offering full cost control.     |
|                   <img isIcon src='https://assets.timescale.com/docs/icons/datadog-logo.png' alt='datadog-logo' />[Datadog][datadog]                   | Gain comprehensive visibility into applications, infrastructure, and systems through real-time monitoring, logging, and analytics.                        |
|                   <img isIcon src='https://assets.timescale.com/docs/icons/grafana-logo.png' alt='grafana-logo' />[Grafana][grafana]                   | Query, visualize, alert on, and explore your metrics and logs.                                                                                            |
|               <img isIcon src='https://assets.timescale.com/docs/icons/instana-logo.png' alt='instana-logo' />[IBM Instana][ibm-instana]               | Monitor application performance and detect issues in real-time.                                                                                           |
|                    <img isIcon src='https://assets.timescale.com/docs/icons/jaeger-logo.png' alt='jaeger-logo' />[Jaeger][jaeger]                    | Trace and diagnose distributed transactions for observability.                                                                                            |
|                 <img isIcon src='https://assets.timescale.com/docs/icons/new-relic-logo.png' alt='new-relic-logo' />[New Relic][new-relic]                 | Monitor applications, infrastructure, and logs for performance insights.                                                                                  |
|          <img isIcon src='https://assets.timescale.com/docs/icons/open-telemetery-logo.png' alt='open-telemetery-logo' />[OpenTelemetry Beta][opentelemetry]           | Collect and analyze telemetry data for observability across systems.                                                                                      |
|                <img isIcon src='https://assets.timescale.com/docs/icons/prometheus-logo.png' alt='prometheus-logo' />[Prometheus][prometheus]                | Track the performance and health of systems, applications, and infrastructure.                                                                            |
|                             <img isIcon src='https://assets.timescale.com/docs/icons/signoz-logo.png' alt='signoz-logo' />[SigNoz][signoz]           | Monitor application performance with an open-source observability tool.                                                                                   |
|                   <img isIcon src='https://assets.timescale.com/docs/icons/tableau-logo.png' alt='tableau-logo' />[Tableau][tableau]                   | Connect to data sources, analyze data, and create interactive visualizations and dashboards.                                                              |
|              <img isIcon src='https://assets.timescale.com/docs/icons/Influx-telegraf.svg' alt='telegraf-logo' />[Telegraf][telegraf]               | Collect, process, and ship metrics and events into databases or monitoring platforms.                             |

## Query and administration

|                                                                     Name                                                                     | Description                                                                                                                               |
|:--------------------------------------------------------------------------------------------------------------------------------------------:|-------------------------------------------------------------------------------------------------------------------------------------------|
| <img isIcon src='https://assets.timescale.com/docs/icons/azure-data-studio-logo.png' alt='azure-data-studio-logo' />[Azure Data Studio][ads] | Query, manage, visualize, and develop databases across SQL Server, Azure SQL, and Postgres.                                                    |
|              <img isIcon src='https://assets.timescale.com/docs/icons/dbeaver-logo.png' alt='dbeaver-logo' />[DBeaver][dbeaver]              | Connect to, manage, query, and analyze multiple database in a single interface with SQL editing, visualization, and administration tools. |
|    <img isIcon src='https://assets.timescale.com/docs/icons/forest-admin-logo.png' alt='forest-admin-logo' />[Forest Admin][forest-admin]    | Create admin panels and dashboards for business applications.                                                                             |
|                <img isIcon src='https://assets.timescale.com/docs/icons/hasura-logo.png' alt='hasura-logo' />[Hasura][hasura]                | Instantly generate GraphQL APIs from databases with access control.                                                                       |
|          <img isIcon src='https://assets.timescale.com/docs/icons/mode-logo.png' alt='mode-logo' />[Mode Analytics][mode-analytics]          | Analyze data, create reports, and share insights with teams.                                                                              |
|                    <img isIcon src='https://assets.timescale.com/docs/icons/neon-logo.png' alt='neon-logo' />[Neon][neon]                    | Run a cloud-native, serverless Postgres database with automatic scaling.                                                                       |
|              <img isIcon src='https://assets.timescale.com/docs/icons/pgadmin-logo.png' alt='pgadmin-logo' />[pgAdmin][pgadmin]              | Manage, query, and administer Postgres databases through a graphical interface.                                                                |
|           <img isIcon src='https://assets.timescale.com/docs/icons/postgresql-logo.png' alt='postgresql-logo' />[Postgres][postgresql]            | Access and query data from external sources as if they were regular Postgres tables.                                                           |
|                <img isIcon src='https://assets.timescale.com/docs/icons/prisma-logo.png' alt='prisma-logo' />[Prisma][prisma]                | Simplify database access with an open-source ORM for Node.js.                                                                             |
|                    <img isIcon src='https://assets.timescale.com/docs/icons/psql-logo.png' alt='psql-logo' />[psql][psql]                    | Run SQL queries, manage databases, automate tasks, and interact directly with Postgres.                                                 |
|          <img isIcon src='https://assets.timescale.com/docs/icons/qlik-logo.png' alt='qlik-logo' />[Qlik Replicate][qlik-replicate]          | Move and synchronize data across multiple database platforms. You an also [set up Postgres as a source][qlik-source].                   |
|              <img isIcon src='https://assets.timescale.com/docs/icons/qstudio-logo.png' alt='qstudio-logo' />[qStudio][qstudio]              | Write and execute SQL queries, manage database objects, and analyze data in a user-friendly interface.                                    |
|                <img isIcon src='https://assets.timescale.com/docs/icons/redash-logo.png' alt='redash-logo' />[Redash][redash]                | Query, visualize, and share data from multiple sources.                                                                                   |
|       <img isIcon src='https://assets.timescale.com/docs/icons/sql-alchemy-logo.png' alt='sqlalchemy-logo' />[SQLalchemy][sqlalchemy]        | Manage database operations using a Python SQL toolkit and ORM.                                                                            |
|          <img isIcon src='https://assets.timescale.com/docs/icons/sequelize-logo.png' alt='sequelize-logo' />[Sequelize][sequelize]          | Interact with SQL databases in Node.js using an ORM.                                                                                      |
|              <img isIcon src='https://assets.timescale.com/docs/icons/stepzen-logo.png' alt='stepzen-logo' />[StepZen][stepzen]              | Build and deploy GraphQL APIs with data from multiple sources.                                                                            |
|              <img isIcon src='https://assets.timescale.com/docs/icons/typeorm-logo.png' alt='typeorm-logo' />[TypeORM][typeorm]              | Work with databases in TypeScript and JavaScript using an ORM.                                                                            |

## Secure connectivity to Tiger Cloud

|                 Name                 | Description                                                                 |
|:------------------------------------:|-----------------------------------------------------------------------------|
|      <img isIcon src='https://assets.timescale.com/docs/icons/aws-logo.png' alt='aws-logo' />[Amazon Web Services][aws]      | Connect your other services and applications running in AWS to Tiger Cloud. |
| <img isIcon src='https://assets.timescale.com/docs/icons/corporate-data-center-logo.png' alt='corporate-data-center-logo' />[Corporate data center][data-center] | Connect your on-premise data center to Tiger Cloud.
|     <img isIcon src='https://assets.timescale.com/docs/icons/google-cloud-logo.png' alt='google-cloud-logo' />[Google Cloud][google-cloud]     | Connect your Google Cloud infrastructure to Tiger Cloud.                    |
|       <img isIcon src='https://assets.timescale.com/docs/icons/azure-logo.png' alt='azure-logo' />[Microsoft Azure][azure]       | Connect your Microsoft Azure infrastructure to Tiger Cloud.                 |

## Workflow automation and no-code tools

|       Name           | Description                                                               |
|:--------------------:|---------------------------------------------------------------------------|
| <img isIcon src='https://assets.timescale.com/docs/icons/appsmith-logo.png' alt='appsmith-logo' />[Appsmith][appsmith] | Create internal business applications with a low-code platform.           |
|      <img isIcon src='https://assets.timescale.com/docs/icons/n8n-logo.png' alt='n8n-logo' />[n8n][n8n]      | Automate workflows and integrate services with a no-code platform.        |
|   <img isIcon src='https://assets.timescale.com/docs/icons/retool-logo.png' alt='retool-logo' />[Retool][retool]   | Build custom internal tools quickly using a drag-and-drop interface.      |
|  <img isIcon src='https://assets.timescale.com/docs/icons/tooljet-logo.png' alt='tooljet-logo' />[Tooljet][tooljet]  | Develop internal tools and business applications with a low-code builder. |
|   <img isIcon src='https://assets.timescale.com/docs/icons/zapier-logo.png' alt='zapier-logo' />[Zapier][zapier]   | Automate workflows by connecting different applications and services.     |

===== PAGE: https://docs.tigerdata.com/integrations/aws-lambda/ =====

---

## Scheduled jobs stop running

**URL:** llms-txt#scheduled-jobs-stop-running

Your scheduled jobs might stop running for various reasons. On self-hosted
TimescaleDB, you can fix this by restarting background workers:

On Tiger Cloud and Managed Service for TimescaleDB, restart background workers by doing one of the following:

*   Run `SELECT timescaledb_pre_restore()`, followed by `SELECT
    timescaledb_post_restore()`.
*   Power the service off and on again. This might cause a downtime of a few
    minutes while the service restores from backup and replays the write-ahead
    log.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/invalid-attribute-reindex-hypertable/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT _timescaledb_functions.start_background_workers();
```

Example 2 (sql):
```sql
SELECT _timescaledb_internal.start_background_workers();
```

---

## Multi-node configuration

**URL:** llms-txt#multi-node-configuration

**Contents:**
- Update settings
  - `max_prepared_transactions`
  - `enable_partitionwise_aggregate`
  - `jit`
  - `statement_timeout`
  - `wal_level`
  - Transaction isolation level

[Multi-node support is sunsetted][multi-node-deprecation].

TimescaleDB v2.13 is the last release that includes multi-node support for Postgres
versions 13, 14, and 15.

In addition to the
[regular TimescaleDB configuration][timescaledb-configuration], it is recommended
that you also configure additional settings specific to multi-node operation.

Each of these settings can be configured in the `postgresql.conf` file on the
individual node. The `postgresql.conf` file is usually in the `data` directory,
but you can locate the correct path by connecting to the node with `psql` and
giving this command:

After you have modified the `postgresql.conf` file, reload the configuration to
see your changes:

### `max_prepared_transactions`

If not already set, ensure that `max_prepared_transactions` is a non-zero value
on all data nodes is set to `150` as a starting point.

### `enable_partitionwise_aggregate`

On the access node, set the `enable_partitionwise_aggregate` parameter to `on`.
This ensures that queries are pushed down to the data nodes, and improves query
performance.

On the access node, set `jit` to `off`. Currently, JIT does not work well with
distributed queries. However, you can enable JIT on the data nodes successfully.

### `statement_timeout`

On the data nodes, disable `statement_timeout`. If you need to enable this,
enable and configure it on the access node only. This setting is disabled by
default in Postgres, but can be useful if your specific environment is suited.

On the data nodes, set the `wal_level` to `logical` or higher to
[move][move_chunk] or [copy][copy_chunk] chunks between data nodes. If you
are moving many chunks in parallel, consider increasing `max_wal_senders` and
`max_replication_slots` as well.

### Transaction isolation level

For consistency, if the transaction isolation level is set to `READ COMMITTED`
it is automatically upgraded to `REPEATABLE READ` whenever a distributed
operation occurs. If the isolation level is `SERIALIZABLE`, it is not changed.

===== PAGE: https://docs.tigerdata.com/self-hosted/multinode-timescaledb/multinode-maintenance/ =====

**Examples:**

Example 1 (sql):
```sql
SHOW config_file;
```

Example 2 (bash):
```bash
pg_ctl reload
```

---

## SQL inteface for pgvector and pgvectorscale

**URL:** llms-txt#sql-inteface-for-pgvector-and-pgvectorscale

**Contents:**
- Installing the pgvector and pgvectorscale extensions
- Creating the table for storing embeddings using pgvector
- Query the vector embeddings
- Indexing the vector data using indexes provided by pgvector and pgvectorscale
  - StreamingDiskANN index
  - pgvector HNSW
  - pgvector ivfflat

## Installing the pgvector and pgvectorscale extensions

If not already installed, install the `vector` and `vectorscale` extensions on your Tiger Data database.

## Creating the table for storing embeddings using pgvector

Vectors inside of the database are stored in regular Postgres tables using `vector` columns. The `vector` column type is provided by the pgvector extension. A common way to store vectors is alongside the data they are embedding. For example, to store embeddings for documents, a common table structure is:

This table contains a primary key, a foreign key to the document table, some metadata, the text being embedded (in the `contents` column) and the embedded vector.

You may ask why not just add an embedding column to the document table? The answer is that there is a limit on the length of text an embedding can encode and so there needs to be a one-to-many relationship between the full document and its embeddings.

The above table is just an illustration, it's totally fine to have a table without a foreign key and/or without a metadata column. The important thing is to have a column with the data being embedded and the vector in the same row, enabling you to return the raw data for a given similarity search query

The vector type can specify an optional number of dimensions (1,538) in the example above). If specified, it enforces the constraint that all vectors in the column have that number of dimensions. A plain `VECTOR` (without specifying the number of dimensions) column is also possible and allows a variable number of dimensions.

## Query the vector embeddings

The canonical query is:

Which returns the 10 rows whose distance is the smallest. The distance function used here is cosine distance (specified by using the `<=>` operator). Other distance functions are available, see the [discussion][distance-functions].

The available distance types and their operators are:

| Distance type          | Operator      |
|------------------------|---------------|
| Cosine/Angular         | `<=>`           |
| Euclidean              | `<->`           |
| Negative inner product | `<#>`           |

If you are using an index, you need to make sure that the distance function used in index creation is the same one used during query (see below). This is important because if you create your index with one distance function but query with another, your index cannot be used to speed up the query.

## Indexing the vector data using indexes provided by pgvector and pgvectorscale

Indexing helps speed up similarity queries of the basic form:

The key part is that the `ORDER BY` contains a distance measure against a constant or a pseudo-constant.

Note that if performing a query without an index, you always get an exact result, but the query is slow (it has to read all of the data you store for every query). With an index, your queries are an order-of-magnitude faster, but the results are approximate (because there are no known indexing techniques that are exact see [here for more][vector-search-indexing]).

Nevertheless, there are excellent approximate algorithms. There are 3 different indexing algorithms available on TimescaleDB: StreamingDiskANN, HNSW, and ivfflat. Below is the trade-offs between these algorithms:

| Algorithm       | Build Speed | Query Speed | Need to rebuild after updates |
|------------------|-------------|-------------|-------------------------------|
| StreamingDiskANN | Fast        | Fastest     | No                            |
| HNSW    | Fast     | Fast      | No                            |
| ivfflat | Fastest     | Slowest     | Yes                           |

You can see [benchmarks](https://www.timescale.com/blog/how-we-made-postgresql-the-best-vector-database/) in the blog.

For most use cases, the StreamingDiskANN index is recommended.

Each of these indexes has a set of build-time options for controlling the speed/accuracy trade-off when creating the index and an additional query-time option for controlling accuracy during a particular query.

You can see the details of each index below.

### StreamingDiskANN index

The StreamingDiskANN index is a graph-based algorithm that was inspired by the [DiskANN](https://github.com/microsoft/DiskANN) algorithm.
You can read more about it in
[How We Made Postgres as Fast as Pinecone for Vector Data](https://www.timescale.com/blog/how-we-made-postgresql-as-fast-as-pinecone-for-vector-data).

To create an index named `document_embedding_idx` on table `document_embedding` having a vector column named `embedding`, with cosine distance metric, run:

Since this index uses cosine distance, you should use the `<=>` operator in your queries.  StreamingDiskANN also supports L2 distance:

For L2 distance, use the `<->` operator in queries.

These examples create the index with smart defaults for all parameters not listed. These should be the right values for most cases. But if you want to delve deeper, the available parameters are below.
