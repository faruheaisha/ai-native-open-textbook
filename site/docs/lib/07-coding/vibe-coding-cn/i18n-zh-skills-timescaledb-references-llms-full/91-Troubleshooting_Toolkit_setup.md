---
title: "Time-weighted average"
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
pageSha256: "a5d32adc4a72835b90b3a8a7d167c6651a31ed0d1181bb4e240bd071fecaaf8c"
contentMode: "local-full"
zh: ""
---

# Time-weighted average

Time weighted average in TimescaleDB is implemented as an aggregate that
weights each value using last observation carried forward (LOCF), or linear
interpolation. The aggregate is not parallelizable, but it is supported with
[continuous aggregation][caggs].

## Run a time-weighted average query

In this procedure, we are using an example table called `freezer_temps` that
contains data about internal freezer temperatures.

### Running a time-weighted average query

1.  At the `psql`prompt, find the average and the time-weighted average of
    the data:

    ```sql
    SELECT freezer_id,
      avg(temperature),
     average(time_weight('Linear', ts, temperature)) as time_weighted_average
    FROM freezer_temps
    GROUP BY freezer_id;
    ```

1.  To determine if the freezer has been out of temperature range for more
    than 15 minutes at a time, use a time-weighted average in a window function:

    ```sql
    SELECT *,
    average(
            time_weight('Linear', ts, temperature) OVER (PARTITION BY freezer_id ORDER BY ts RANGE  '15 minutes'::interval PRECEDING )
           ) as rolling_twa
    FROM freezer_temps
    ORDER BY freezer_id, ts;
    ```

For more information about time-weighted average API calls, see the
[hyperfunction API documentation][hyperfunctions-api-timeweight].

===== PAGE: https://docs.tigerdata.com/use-timescale/services/service-management/ =====

# Service management

In the `Service management` section of the `Operations` dashboard, you can fork
your service, reset the password, pause, or delete the service.

## Fork a service

When you a fork a service, you create its exact copy including
the underlying database. This allows you to create a copy that you can use for
testing purposes, or to prepare for a major version upgrade. The only difference
between the original and the forked service is that the `tsdbadmin` user has a
different password.

The fork is created by restoring from backup and applying the write-ahead log.
The data is fetched from Amazon S3, so forking doesn't tax the running instance.

You can fork services that have a status of `Running` or `Paused`. You cannot
fork services while they have a status of `In progress`. Wait for the service to
complete the transition before you start forking.

Forks only have data up to the point when the original service was forked. Any
data written to the original service after the time of forking does not appear
in the fork. If you want the fork to assume operations from the original
service, pause your main service before forking to avoid any
data discrepancy between services.

1.  In Tiger Cloud Console, from the `Services` list, ensure the service
    you want to form has a status of `Running` or `Paused`, then click the name
    of the service you want to fork.
1.  Navigate to the `Operations` tab.
1.  In the `Service management` section, click `Fork service`. In the dialog,
    confirm by clicking `Fork service`. The forked service takes a few minutes
    to start.
1.  [](#)To change the configuration of your fork, click
    `Advanced options`. You can set different compute and storage options,
    separate from your original service.
1.  Confirm by clicking `Fork service`. The forked service takes a few minutes
    to start.
1.  The forked service shows in the `Services` dashboard with a label stating
    which service it has been forked from.

class="main-content__illustration"
width=\{1375\} height=\{944\}
src="https://assets.timescale.com/docs/images/tsc-forked-service.webp"
alt="Fork a Tiger Cloud service"
/>

## Create a service fork using the CLI

To manage development forks:

1. **Install Tiger CLI**

   Use the terminal to install the CLI:

    ```shell
    curl -s https://packagecloud.io/install/repositories/timescale/tiger-cli/script.deb.sh | sudo os=any dist=any bash
    sudo apt-get install tiger-cli
    ```

    ```shell
    curl -s https://packagecloud.io/install/repositories/timescale/tiger-cli/script.deb.sh | sudo os=any dist=any bash
    sudo apt-get install tiger-cli
    ```

    ```shell
    curl -s https://packagecloud.io/install/repositories/timescale/tiger-cli/script.rpm.sh | sudo os=rpm_any dist=rpm_any bash
    sudo yum install tiger-cli
    ```

    ```shell
    curl -s https://packagecloud.io/install/repositories/timescale/tiger-cli/script.rpm.sh | sudo os=rpm_any dist=rpm_any bash
    sudo yum install tiger-cli
    ```

    ```shell
    brew install --cask timescale/tap/tiger-cli
    ```

    ```shell
    curl -fsSL https://cli.tigerdata.com | sh
    ```

1. **Set up API credentials**

   1. Log Tiger CLI into your Tiger Data account:

      ```shell
      tiger auth login
      ```
      Tiger CLI opens Console in your browser. Log in, then click `Authorize`.

      You can have a maximum of 10 active client credentials. If you get an error, open [credentials][rest-api-credentials]
      and delete an unused credential.

   1. Select a Tiger Cloud project:

      ```terminaloutput
      Auth URL is: https://console.cloud.timescale.com/oauth/authorize?client_id=lotsOfURLstuff
      Opening browser for authentication...
      Select a project:

      > 1. Tiger Project (tgrproject)
      2. YourCompany (Company wide project) (cpnproject)
      3. YourCompany Department (dptproject)

      Use ↑/↓ arrows or number keys to navigate, enter to select, q to quit
      ```
      If only one project is associated with your account, this step is not shown.

      Where possible, Tiger CLI stores your authentication information in the system keychain/credential manager.
      If that fails, the credentials are stored in `~/.config/tiger/credentials` with restricted file permissions (600).
      By default, Tiger CLI stores your configuration in `~/.config/tiger/config.yaml`.

1. **Test your authenticated connection to Tiger Cloud by listing services**

    ```bash
    tiger service list
    ```

   This call returns something like:
    - No services:
      ```terminaloutput
      🏜️  No services found! Your project is looking a bit empty.
      🚀 Ready to get started? Create your first service with: tiger service create
      ```
    - One or more services:

      ```terminaloutput
      ┌────────────┬─────────────────────┬────────┬─────────────┬──────────────┬──────────────────┐
      │ SERVICE ID │        NAME         │ STATUS │    TYPE     │    REGION    │     CREATED      │
      ├────────────┼─────────────────────┼────────┼─────────────┼──────────────┼──────────────────┤
      │ tgrservice │ tiger-agent-service │ READY  │ TIMESCALEDB │ eu-central-1 │ 2025-09-25 16:09 │
      └────────────┴─────────────────────┴────────┴─────────────┴──────────────┴──────────────────┘
      ```

1. **Fork the service**

   ```shell
    tiger service fork tgrservice --now --no-wait --name bob
   ```
   By default a fork matches the resource of the parent Tiger Cloud services. For paid plans specify `--cpu` and/or `--memory` for dedicated resources.

   You see something like:

    ```terminaloutput
    🍴 Forking service 'tgrservice' to create 'bob' at current state...
    ✅ Fork request accepted!
    📋 New Service ID: &lt;service_id>
    🔐 Password saved to system keyring for automatic authentication
    🎯 Set service '&lt;service_id>' as default service.
    ⏳ Service is being forked. Use 'tiger service list' to check status.
    ┌───────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────┐
    │     PROPERTY      │                                              VALUE                                               │
    ├───────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────┤
    │ Service ID        │ &lt;service_id>                                                                                       │
    │ Name              │ bob                                                                                              │
    │ Status            │                                                                                                  │
    │ Type              │ TIMESCALEDB                                                                                      │
    │ Region            │ eu-central-1                                                                                     │
    │ CPU               │ 0.5 cores (500m)                                                                                 │
    │ Memory            │ 2 GB                                                                                             │
