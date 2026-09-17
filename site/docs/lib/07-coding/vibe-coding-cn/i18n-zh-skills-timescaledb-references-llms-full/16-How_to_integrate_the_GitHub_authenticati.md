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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "dd30ddb913a8c8a0163a559ff8cf573dce9ae73a2f7e4bc85a34baa7cc6bd2d9"
contentMode: "local-full"
zh: ""
---

#### How to integrate the GitHub authentication plugin

1.  In the Aiven Client, connect to your [service][Install and configure the Aiven client].

2.  Switch to the project that contains the Grafana service you want to integrate:

    ```bash
     avn switch &lt;PROJECT>
    ```

3.  List the services in the project, and make a note of the Grafana service
    that you want to integrate, listed under `SERVICE_NAME` column in the
    output.

    ```bash
     avn service list
    ```

4.  Get the details of the service that you want to integrate:

    ```bash
    avn service get &lt;SERVICE_NAME>
    ```

5.  Integrate the plugin with your service using the `<CLIENT_ID>`, and
    `<CLIENT_SECRET>` from your GitHub OAuth application:

    ```bash
    avn service update -c auth_github.client_id=&lt;CLIENT_ID>\
    -c auth_github.client_secret=&lt;CLIENT_SECRET> &lt;SERVICE_NAME>

    ```

6.  Log in to Grafana with your service credentials.
7.  Navigate to `Configuration` → `Plugins`. The Plugins page lists
    GitHub OAuth application for the Grafana instance.

When you allow sign-ups using the `-c auth_github.allow_sign_up=true` option, by default each new user is created with `viewer`permission and added to their own newly created organizations. To specify different permissions, use `-c user_auto_assign_org_role=ROLE_NAME`. To add all new users to the main organization, use the `-c user_auto_assign_org=true` option.

### Integrating the GitLab authentication plugin

To integrate the GitLab authentication with Grafana service on Managed Service for TimescaleDB, you need to create your [GitLab OAuth
application][gitlab-oauth-keys]. Copy your client ID, client secret, and GitLab groups name to a secure location.

If you use your own instance of GitLab instead of gitlab.com, then you need to set the following:

*   auth_gitlab.api_url
*   auth_github.auth_url
*   auth_github.token_url
