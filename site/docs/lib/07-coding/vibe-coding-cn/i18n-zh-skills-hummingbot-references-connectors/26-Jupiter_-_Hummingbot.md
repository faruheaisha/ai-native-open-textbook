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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/connectors.md"
sourceRel: "i18n/zh/skills/hummingbot/references/connectors.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/connectors.md"
sourceSha256: "16ff6b5efa43a0629074cd926d8e11b244d1cda26f6f4eee157acd5d0c75f303"
pageSha256: "737db3f3f7bafef3011558ba0583ae2bdf5f78ace18e7d78f4b0efc0ed32c22b"
contentMode: "local-full"
zh: ""
---

## Jupiter - Hummingbot

**URL:** https://hummingbot.org/exchanges/gateway/jupiter

**Contents:**
- Jupiter¶
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
- Configuration¶
- Router Endpoints¶

Jupiter operates on Solana networks.

See Gateway Connect for instructions on connecting your wallet to Gateway.

Configure Jupiter settings in /conf/connectors/jupiter.yml.

Below are the Jupiter configuration parameters and their default values: # Default slippage percentage for swaps (as a decimal, e.g., 1 = 1%) slippagePct: 1 # Priority level for swap transaction processing # Options: medium, high, veryHigh priorityLevel: 'veryHigh' # Maximum priority fee in lamports (for dynamic priority fees) # Used when priorityLevel is set and no explicit priorityFeeLamports is provided maxLamports: 1000000 # Restrict routing to only go through 1 market # Default: false (allows multi-hop routes for better prices) onlyDirectRoutes: false # Restrict routing through highly liquid intermediate tokens only # Default: true (for better price and stability) restrictIntermediateTokens: true # Jupiter API key (optional) # For free tier, leave empty (uses https://lite-api.jup.ag) # For paid plans, generate key at https://portal.jup.ag (uses https://api.jup.ag) apiKey: ''

Jupiter DEX aggregator for optimal swap routing across Solana

For more info, run Gateway in development mode and go to http://localhost:15888 in your browser to see detailed documentation for each endpoint.

**Examples:**

Example 1 (unknown):
```unknown
# Default slippage percentage for swaps (as a decimal, e.g., 1 = 1%)
slippagePct: 1

# Priority level for swap transaction processing
# Options: medium, high, veryHigh
priorityLevel: 'veryHigh'

# Maximum priority fee in lamports (for dynamic priority fees)
# Used when priorityLevel is set and no explicit priorityFeeLamports is provided
maxLamports: 1000000

# Restrict routing to only go through 1 market
# Default: false (allows multi-hop routes for better prices)
onlyDirectRoutes: false

# Restrict routing through highly liquid intermediate tokens only
# Default: true (for better price and stability)
restrictIntermediateTokens: true

# Jupiter API key (optional)
# For free tier, leave empty (uses https://lite-api.jup.ag)
# For paid plans, generate key at https://portal.jup.ag (uses https://api.jup.ag)
apiKey: ''
```
