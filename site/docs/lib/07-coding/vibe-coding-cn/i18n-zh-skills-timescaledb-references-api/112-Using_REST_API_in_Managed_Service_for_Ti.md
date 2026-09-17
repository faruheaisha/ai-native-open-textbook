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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/api.md"
sourceRel: "i18n/zh/skills/timescaledb/references/api.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/api.md"
sourceSha256: "3e08a12386bc1c2c2965dda885ab8b9b9b30d35e89d8c00a2f2d70066d208a6e"
pageSha256: "1b44c48a018c2cc1fce9c9b10390573174977dda8df25ba63e490a9d95955c70"
contentMode: "local-full"
zh: ""
---

## Using REST API in Managed Service for TimescaleDB

**URL:** llms-txt#using-rest-api-in-managed-service-for-timescaledb

**Contents:**
  - Using cURL to get your details

Managed Service for TimescaleDB has an API for integration and automation tasks.
For information about using the endpoints, see the [API Documentation][aiven-api].
MST offers an HTTP API with token authentication and JSON-formatted data. You
can use the API for all the tasks that can be performed using the MST Console.
To get started you need to first create an authentication token, and then use
the token in the header to use the API endpoints.

1.  In [Managed Service for TimescaleDB][mst-login], click `User Information` in the top right corner.
1.  In the `User Profile` page, navigate to the `Authentication`tab.
1.  Click `Generate Token`.
1.  In the `Generate access token` dialog, type a descriptive name for the
    token and leave the rest of the fields blank.
1.  Copy the generated authentication token and save it.

### Using cURL to get your details

1.  Set the environment variable `MST_API_TOKEN` with the access token that you generate:

1.  To get the details about the current user session using the `/me` endpoint:

The output looks similar to this:

===== PAGE: https://docs.tigerdata.com/mst/identify-index-issues/ =====

**Examples:**

Example 1 (bash):
```bash
export MST_API_TOKEN="access token"
```

Example 2 (bash):
```bash
curl -s -H "Authorization: aivenv1 $MST_API_TOKEN" https://api.aiven.io/v1/me|json_pp
```

Example 3 (bash):
```bash
{
        "user": {
            "auth": [],
            "create_time": "string",
            "features": { },
            "intercom": {},
            "invitations": [],
            "project_membership": {},
            "project_memberships": {},
            "projects": [],
            "real_name": "string",
            "state": "string",
            "token_validity_begin": "string",
            "user": "string",
            "user_id": "string"
        }
    }
```
