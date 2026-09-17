---
title: "Create your first Tiger Cloud service"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "cd3054da9c09c7eb698c27d95bd977bbfa4517f055ca6bca6e0c581060697b60"
contentMode: "local-full"
zh: ""
---

# Create your first Tiger Cloud service

Tiger Cloud is the modern Postgres data platform for all your applications. It enhances Postgres to handle time series, events,
real-time analytics, and vector search—all in a single database alongside transactional workloads.

You get one system that handles live data ingestion, late and out-of-order updates, and low latency queries, with the performance, reliability, and scalability your app needs. Ideal for IoT, crypto, finance, SaaS, and a myriad other domains, Tiger Cloud allows you to build data-heavy, mission-critical apps while retaining the familiarity and reliability of Postgres.

## What is a Tiger Cloud service?

A Tiger Cloud service is a single optimised Postgres instance extended with innovations in the database engine and cloud
infrastructure to deliver speed without sacrifice. A Tiger Cloud service is 10-1000x faster at scale! It
is ideal for applications requiring strong data consistency, complex relationships, and advanced querying capabilities.
Get ACID compliance, extensive SQL support, JSON handling, and extensibility through custom functions, data types, and
extensions.

Each service is associated with a project in Tiger Cloud. Each project can have multiple services. Each user is a [member of one or more projects][rbac].

You create free and standard services in Tiger Cloud Console, depending on your [pricing plan][pricing-plans]. A free service comes at zero cost and gives you limited resources to get to know Tiger Cloud. Once you are ready to try out more advanced features, you can switch to a paid plan and convert your free service to a standard one.

![Tiger Cloud pricing plans](https://assets.timescale.com/docs/images/tiger-cloud-console/tiger-pricing.svg)

The Free pricing plan and services are currently in beta.

To the Postgres you know and love, Tiger Cloud adds the following capabilities:

- **Standard services**:

    - _Real-time analytics_: store and query [time-series data][what-is-time-series] at scale for
      real-time analytics and other use cases. Get faster time-based queries with hypertables, continuous aggregates, and columnar storage. Save money by compressing data into the columnstore, moving cold data to low-cost bottomless storage in Amazon S3, and deleting old data with automated policies.
    - _AI-focused_: build AI applications from start to scale. Get fast and accurate similarity search
      with the pgvector and pgvectorscale extensions.
    - _Hybrid applications_: get a full set of tools to develop applications that combine time-based data and AI.

  All standard Tiger Cloud services include the tooling you expect for production and developer environments: [live migration][live-migration],
  [automatic backups and PITR][automatic-backups], [high availability][high-availability], [read replicas][readreplica], [data forking][operations-forking], [connection pooling][connection-pooling], [tiered storage][data-tiering],
  [usage-based storage][how-plans-work], secure in-Tiger Cloud Console [SQL editing][in-console-editors], service [metrics][metrics]
  and [insights][insights],&nbsp;[streamlined maintenance][maintain-upgrade],&nbsp;and much more. Tiger Cloud continuously monitors your services and prevents common Postgres out-of-memory crashes.

- **Free services**:

  _Postgres with TimescaleDB and vector extensions_

  Free services offer limited resources and a basic feature scope, perfect to get to know Tiger Cloud in a development environment.

You manage your Tiger Cloud services and interact with your data in Tiger Cloud Console using the following modes:

| **Ops mode**                                                                                                                                                                                                                                                                                                                 | **Data mode**                                                                                                                                                                                                                                                                                                                                                   |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ![Tiger Cloud Console ops mode][ops-mode]                                                                                                                                                                                                                                                                                                   | ![Tiger Cloud Console data mode][data-mode]                                                                                                                                                                                                                                                                                                                                    |
| **You use the ops mode to:**  <ul> <li>Ensure data security with high availability and read replicas</li> <li>Save money with columnstore compression and tiered storage</li> <li>Enable Postgres extensions to add extra functionality</li> <li>Increase security using VPCs</li> <li>Perform day-to-day administration</li> </ul> | **Powered by PopSQL, you use the data mode to:**  <ul> <li>Write queries with autocomplete</li> <li>Visualize data with charts and dashboards</li> <li>Schedule queries and dashboards for alerts or recurring reports</li> <li>Share queries and dashboards</li> <li>Interact with your data on auto-pilot with SQL assistant</li></ul> This feature is not available under the Free pricing plan.  |

To start using Tiger Cloud for your data:

1. [Create a Tiger Data account][create-an-account]: register to get access to Tiger Cloud Console as a centralized point to administer and interact with your data.
1. [Create a Tiger Cloud service][create-a-service]: that is, a Postgres database instance, powered by [TimescaleDB][timescaledb], built for production, and extended with cloud features like transparent data tiering to object storage.
1. [Connect to your Tiger Cloud service][connect-to-your-service]: to run queries, add and migrate your data from other sources.

## Create a Tiger Data account

You create a Tiger Data account to manage your services and data in a centralized and efficient manner in Tiger Cloud Console. From there, you can create and delete services, run queries, manage access and billing, integrate other services, contact support, and more.

You create a standalone account to manage Tiger Cloud as a separate unit in your infrastructure, which includes separate billing and invoicing.

To set up Tiger Cloud:

1. **Sign up for a 30-day free trial**

   Open [Sign up for Tiger Cloud][timescale-signup] and add your details, then click `Start your free trial`. You receive a confirmation email in your inbox.

1. **Confirm your email address**

    In the confirmation email, click the link supplied.

1. **Select the [pricing plan][pricing-plans]**

   You are now logged into Tiger Cloud Console. You can change the pricing plan to better accommodate your growing needs on the [`Billing` page][console-billing].

To have Tiger Cloud as a part of your AWS infrastructure, you create a Tiger Data account through AWS Marketplace. In this
case, Tiger Cloud is a line item in your AWS invoice.

To set up Tiger Cloud via AWS:

1. **Open [AWS Marketplace][aws-marketplace] and search for `Tiger Cloud`**

   You see two pricing options, [pay-as-you-go][aws-paygo] and [annual commit][aws-annual-commit].

1. **Select the pricing option that suits you and click `View purchase options`**

1. **Review and configure the purchase details, then click `Subscribe`**

1. **Click `Set up your account` at the top of the page**

   You are redirected to Tiger Cloud Console.

1. **Sign up for a 30-day free trial**

   Add your details, then click `Start your free trial`. If you want to link an existing Tiger Data account to AWS, log in with your existing credentials.

1. **Select the [pricing plan][pricing-plans]**

   You are now logged into Tiger Cloud Console. You can change the pricing plan later to better accommodate your growing needs on the [`Billing` page][console-billing].

1. **In `Confirm AWS Marketplace connection`, click `Connect`**

    Your Tiger Cloud and AWS accounts are now connected.

## Create a Tiger Cloud service

Now that you have an active Tiger Data account, you create and manage your services in Tiger Cloud Console. When you create a service, you effectively create a blank Postgres database with additional Tiger Cloud features available under your pricing plan. You then add or migrate your data into this database.

To create a free or standard service:

1. In the [service creation page][create-service], click `+ New service`.

   Follow the wizard to configure your service depending on its type.

1. Click `Create service`.

   Your service is constructed and ready to use in a few seconds.

1. Click `Download the config` and store the configuration information you need to connect to this service in a secure location.

   This file contains the passwords and configuration information you need to connect to your service using the
   Tiger Cloud Console data mode, from the command line, or using third-party database administration tools.

If you choose to go directly to the service overview, [Connect to your service][connect-to-your-service]
shows you how to connect.

## Connect to your service

To run queries and perform other operations, connect to your service:

1. **Check your service is running correctly**

   In [Tiger Cloud Console][services-portal], check that your service is marked as `Running`.

   ![Check service is running](https://assets.timescale.com/docs/images/tiger-cloud-console/tiger-console-services-view.png)

1. **Connect to your service**

   Connect using data mode or SQL editor in Tiger Cloud Console, or psql in the command line:

   This feature is not available under the Free pricing plan.

   1. In Tiger Cloud Console, toggle `Data`.

   1. Select your service in the connection drop-down in the top right.

      ![Select a connection](https://assets.timescale.com/docs/images/tiger-cloud-console/tiger-console-data-mode-connection-dropdown.png)

   1. Run a test query:

      ```sql
      SELECT CURRENT_DATE;
      ```

      This query gives you the current date, you have successfully connected to your service.

   And that is it, you are up and running. Enjoy developing with Tiger Data.

   1. In Tiger Cloud Console, select your service.

   1. Click `SQL editor`.

      ![Check a service is running](https://assets.timescale.com/docs/images/tiger-cloud-console/tiger-console-ops-mode-sql-editor.png)

   1. Run a test query:

      ```sql
      SELECT CURRENT_DATE;
      ```

      This query gives you the current date, you have successfully connected to your service.

   And that is it, you are up and running. Enjoy developing with Tiger Data.

   1. Install [psql][psql].

   1. Run the following command in the terminal using the service URL from the config file you have saved during service creation:

      ```
