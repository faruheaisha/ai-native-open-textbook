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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/llms-full.md"
sourceRel: "i18n/zh/skills/coingecko/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/llms-full.md"
sourceSha256: "a3cd0a16407a7e6b85ceb3cc714181ec1aecb3fdb5043afd1a82ec9cfdea8ec8"
pageSha256: "a3ab7fda3325735e8f23e6cfcb527c018d9eea29997a1863965f75258953e037"
contentMode: "local-full"
zh: ""
---

## Remote Server (Authenticated)

To access more tools and higher rate limits, use your CoinGecko API key with our hosted "Bring Your Own Key" (BYOK) server. Get your API key [here](https://www.coingecko.com/en/api/pricing)

### Step 1: Add the configuration

Add the following configuration to your `mcp_config.json`:

  ```json JSON theme={null}
  {
    "mcpServers": {
      "coingecko_mcp": {
        "command": "npx",
        "args": [
          "mcp-remote",
          "https://mcp.pro-api.coingecko.com/mcp"
        ]
      }
    }
  }
  ```

### Step 2: Authorize your MCP access

After adding the config, the first time your client tries to use the CoinGecko MCP, a new browser tab will open, redirecting you to our authentication page:

&lt;img src="https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/0fd54e7-image.png?fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=c40d3876ad3b12c0c3177231e8642bf7" alt="" data-og-width="1627" width="1627" data-og-height="1611" height="1611" data-path="images/reference/0fd54e7-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/0fd54e7-image.png?w=280&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=b44038862f84320e55096acf29d704ab 280w, https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/0fd54e7-image.png?w=560&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=d7518c452993e3c2191de720716fc28a 560w, https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/0fd54e7-image.png?w=840&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=f4e361fa7c96759e52cf23b245e44bfc 840w, https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/0fd54e7-image.png?w=1100&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=41d3e848470a50259a8aabd2f11f879d 1100w, https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/0fd54e7-image.png?w=1650&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=4767ab92447bc5ba7a7f1ed2994945ea 1650w, https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/0fd54e7-image.png?w=2500&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=686d5177b5697a4561eae0f10f157694 2500w" />

* Simply paste in your CoinGecko API key, and authorize to link your key to the MCP session.

  ✨ Don't have an API key yet? Upgrade to Pro today! Read more [here](https://www.coingecko.com/en/api/pricing).

* You can also toggle between dynamic/static tools here. Learn more about [Dynamic Tools](#dynamic-vs-static-tools).
