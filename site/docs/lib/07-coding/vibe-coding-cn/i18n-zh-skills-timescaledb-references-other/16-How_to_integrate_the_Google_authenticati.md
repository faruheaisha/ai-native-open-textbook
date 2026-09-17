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
pageSha256: "714d19610bd9277d966877edb769df556b27764ece651c640d92474bf53c0659"
contentMode: "local-full"
zh: ""
---

#### How to integrate the Google authentication plugin

1.  In the Aiven Client, connect to your
    [service][Install and configure the Aiven client].

2.  Switch to the project that contains the Grafana service you want to integrate:

3.  List the services in the project. Make a note of the Grafana service that you want to integrate, listed under `SERVICE_NAME` column in the
    output.

4.  Get the details of the service that you want to integrate:

5.  Integrate the plugin with your services using the `<CLIENT_ID>` and `<CLIENT_SECRET>` from your Google developer console:

6.  Log in to Grafana with your service credentials.

7.  Navigate to `Configuration` → `Plugins` and verify that the Google OAuth application is listed as a plugin.

When you allow sign-ups using the `-c auth_google.allow_sign_up=true` option, by default each new user is created with `viewer` permissions and added to their own newly created organizations. To specify different permissions, use `-c user_auto_assign_org_role=ROLE_NAME`. To add all new users to the main organization, use the  `-c user_auto_assign_org=true` option.

### Integrating the GitHub authentication plugin

To integrate GitHub authentication with Grafana service on Managed Service for TimescaleDB, you need to create your [GitHub OAuth application][github-oauth-keys]. Store your client ID and client secret in a secure location.
