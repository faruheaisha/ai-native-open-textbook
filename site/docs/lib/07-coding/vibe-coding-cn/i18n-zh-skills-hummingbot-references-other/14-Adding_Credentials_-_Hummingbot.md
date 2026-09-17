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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/other.md"
sourceRel: "i18n/zh/skills/hummingbot/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/other.md"
sourceSha256: "7bd57673fc3df5b901db36ae3eac6be136526e8e2dbb141702c9a6ebc26b607a"
pageSha256: "86d534a65b5b3f728b5673a55af1384cf9ef98257b001a5d96924e02d9df04df"
contentMode: "local-full"
zh: ""
---

## Adding Credentials - Hummingbot

**URL:** https://hummingbot.org/dashboard/credentials/

**Contents:**
- Adding Credentials
- Available Accounts and Credentials¶
- Manage Accounts¶
- Add Credentials (API Keys)¶
- Known Issues¶
  - Manually adding credentials for DEXes¶

The Credentials page in the Hummingbot Dashboard is a comprehensive interface for managing your API keys and related credentials. It offers several functionalities to streamline the process of handling multiple accounts and their respective credentials.

In the example above we have two accounts currently setup, the master account with gate_io API keys and a team_account with Kucoin API keys.

In this section we can create & delete an account or delete a credential from the existing accounts.

Allows you to create a new account by providing a name. This is useful for organizing credentials under different categories or user profiles.

Provides an option to delete an existing account along with all its associated credentials, helping you keep your credential management clean and up-to-date.

Enables you to remove specific credentials from an account without deleting the entire account. This is useful when you need to update or revoke access to a particular exchange.

In this section we can add new credentials to an account by selecting the account and connector (e.g., exchange). You can enter the required API key and secret, which will be securely stored and used by Hummingbot for trading activities.

Some exchanges, like DEXes will have issues trying to add the API credentials using Dashboard. You may get an error message similar to the one below:

If you get the above message, you can try the workaround below:

Go to the PMM_Simple (or any controller) page and create a random config and Upload Config

Next in the Deploy V2 page, select the controller you just created and then under Instance Name, enter credentials and then click Launch Bot

Open your terminal and run the command

This should filter the docker containers that have the name credentials. Take note of the container ID of that instance.

Run the docker attach command to attach to the Hummingbot instance

**Examples:**

Example 1 (unknown):
```unknown
docker ps -a | grep credentials
```

Example 2 (unknown):
```unknown
docker attach [container_ID]
```

Example 3 (unknown):
```unknown
connect [exchange_name]
```

Example 4 (unknown):
```unknown
cp bots/instances/hummingbot-credentials*/conf/connectors/*.yml bots/credentials/master_account/connectors/
```
