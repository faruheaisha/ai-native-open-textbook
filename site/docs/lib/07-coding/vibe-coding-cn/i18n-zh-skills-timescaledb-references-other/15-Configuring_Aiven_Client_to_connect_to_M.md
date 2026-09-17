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
pageSha256: "7636c5ff1d5708419f85838f3562575c72a7b99c5b2727cd2f3ea630f7407ce0"
contentMode: "local-full"
zh: ""
---

#### Configuring Aiven Client to connect to Managed Service for TimescaleDB

1.  Change to the install directory that contains the configuration files:

1.  Open the `aiven-credentials.json` using any editor and update these lines with your Managed Service for TimescaleDB `User email`, and the
    `authentication token` that you generated:

1.  Save the `aiven-credentials.json` file.

1.  To verify that you can access your services on Managed Service for TimescaleDB, type:

This command shows a list of all your projects:

## Fork services with Aiven client

When you a fork a service, you create an exact copy of the service, including
the underlying database. You can use a fork of your service to:

*   Create a development copy of your production environment.
*   Set up a snapshot to analyze an issue or test an upgrade.
*   Create an instance in a different cloud, geographical location, or under
    a different plan.

For more information about projects, plans, and other details about
services, see [About Managed Service for TimescaleDB][about-mst].

### Creating a fork of your service

1.  In the Aiven client, connect to your [service][Install and configure the Aiven client].

2.  Switch to the project that contains the service you want to fork:

3.  List the services in the project, and make a note of the service that you want to fork, listed under `SERVICE_NAME` column in the output.

4.  Get the details of the service that you want to fork:

To create a fork named `grafana-fork` for a service named `grafana` with these parameters:

*   PROJECT_ID: `project-fork`
*   CLOUD_NAME: `timescale-aws-us-east-1`
*   PLAN_TYPE: `dashboard-1`

You can switch to `project-fork` and view the newly created `grafana-fork` using:

## Configure Grafana authentication plugins

Grafana supports multiple authentication plugins, in addition to built-in username and password authentication.

On Managed Service for TimescaleDB, Grafana supports Google, GitHub, and GitLab authentication. You can configure authentication integration using the Aiven command-line client.

### Integrating the Google authentication plugin

To integrate Google authentication with Grafana service on Managed Service for TimescaleDB, you need to create your
[Google OAuth keys][google-oauth-keys]. Copy your client ID and client secret to a secure location.
