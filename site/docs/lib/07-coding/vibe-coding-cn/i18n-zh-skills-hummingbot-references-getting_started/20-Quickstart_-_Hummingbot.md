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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/getting_started.md"
sourceRel: "i18n/zh/skills/hummingbot/references/getting_started.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/getting_started.md"
sourceSha256: "aee68b742e5dcbc964624d10833db685d054e63a53b7e60a19dcbb50ba658356"
pageSha256: "98e49731ca0975f4964ab85cc17dc970055c1dd7f4e3400335df6578304704b7"
contentMode: "local-full"
zh: ""
---

## Quickstart - Hummingbot

**URL:** https://hummingbot.org/hummingbot-api/quickstart/

**Contents:**
- Quickstart
- Prerequisites¶
- Setup Python Client (Optional)¶
- List Available Exchanges¶
- Get Connector Configuration¶
- Add Exchange Credentials¶
- View Your Portfolio¶
- Get Trading Rules¶
- Place a Limit Order¶
- Complete Example¶

This guide demonstrates how to use Hummingbot API to add exchange credentials, view your portfolio, and place a market order.

If you want to use the Python client for the examples below:

Install the Hummingbot API Client: pip install hummingbot-api-client

Create a new Python file (e.g., hummingbot_api_demo.py): touch hummingbot_api_demo.py

Add the following code to initialize the client: import asyncio from hummingbot_api_client import HummingbotAPIClient # Create client instance client = HummingbotAPIClient( base_url="http://localhost:8000", username="admin", password="admin" )

To run any of the examples below, use: python hummingbot_api_demo.py

Get a list of all available exchange connectors. Note that spot and perpetual markets are separate connectors (e.g., hyperliquid for spot and hyperliquid_perpetual for perps).

Before adding credentials, check what configuration fields are required for your connector:

Add your exchange credentials to the API. By default, only the master_account is created. You can add multiple accounts with different names if needed.

Check your portfolio balances across all connected exchanges:

Before placing orders, fetch the trading rules for your intended trading pair to understand order size limits and price increments:

Execute a limit sell order for HYPE:

Geo-Restriction Error

If you receive an error like: \{ "detail": "Failed to place trade: No order book exists for 'HYPE-USDC'." \} This may indicate you are geo-restricted from trading on the exchange. Check your API logs for more details: docker logs hummingbot-api

Here's a complete example that performs all three operations:

Save this code to hummingbot_api_demo.py:

Run the script: python hummingbot_api_demo.py

Now that you've completed the quickstart, explore more advanced features:

For the complete API reference, visit the API documentation when your API is running.

**Examples:**

Example 1 (unknown):
```unknown
pip install hummingbot-api-client
```

Example 2 (unknown):
```unknown
touch hummingbot_api_demo.py
```

Example 3 (python):
```python
import asyncio
from hummingbot_api_client import HummingbotAPIClient

# Create client instance
client = HummingbotAPIClient(
    base_url="http://localhost:8000",
    username="admin",
    password="admin"
)
```

Example 4 (unknown):
```unknown
python hummingbot_api_demo.py
```
