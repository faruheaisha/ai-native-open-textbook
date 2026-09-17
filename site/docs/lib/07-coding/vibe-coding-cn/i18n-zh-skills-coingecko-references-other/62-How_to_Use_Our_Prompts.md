---
title: "src/api/client.py"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/other.md"
sourceRel: "i18n/zh/skills/coingecko/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/other.md"
sourceSha256: "0475f27bdec749a3923243511fa9995a6b979ed924a086b9b9a02c5e9a1741a5"
pageSha256: "a5ee54bdb8e3993c9489201c86b4f795d0b883cd88244184430507d2f663fc85"
contentMode: "local-full"
zh: ""
---

# src/api/client.py
  import os
  from coingecko_sdk import Coingecko, AsyncCoingecko

# Initialize a single, reusable client. This should be imported and used application-wide.
  client = Coingecko(
      pro_api_key=os.environ.get("COINGECKO_PRO_API_KEY"),
      environment="pro",
      max_retries=3, # Rely on the SDK's built-in retry mechanism.
  )

# Optional: Initialize a single async client for concurrent applications.
  async_client = AsyncCoingecko(
      pro_api_key=os.environ.get("COINGECKO_PRO_API_KEY"),
      environment="pro",
      max_retries=3,
  )

# src/main.py
  from api.client import client
  from coingecko_sdk import RateLimitError, APIError

def get_bitcoin_price():
      try:
          price_data = client.simple.price.get(
              ids="bitcoin",
              vs_currencies="usd",
          )
          # Access data using Pydantic models or dictionary keys
          return price_data['bitcoin'].usd
      except RateLimitError:
          print("Rate limit exceeded. Please try again later.")
          return None
      except APIError as e:
          print(f"An API error occurred: \{e\}")
          return None

if __name__ == "__main__":
      price = get_bitcoin_price()
      if price:
          print(f"The current price of Bitcoin is: $\{price\}")

python
  # ❌ NO direct HTTP requests.
  import requests
  response = requests.get('[https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd](https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd)')

# ❌ NO use of the outdated `pycoingecko` library.
  from pycoingecko import CoinGeckoAPI
  cg = CoinGeckoAPI()

# ❌ NO hardcoded API keys.
  client = Coingecko(pro_api_key='CG-abc123xyz789')

# ❌ NO manual retry loops. The SDK's `max_retries` handles this.
  import time
  for i in range(3):
      try:
          data = client.simple.price.get(ids='bitcoin', vs_currencies='usd')
          break
      except:
          time.sleep(5)

# ❌ NO generic exception handling for API errors.
  try:
      data = client.simple.price.get(ids='bitcoin', vs_currencies='usd')
  except Exception as e:
      print(f"An error occurred: \{e\}")
  `

* **GitHub**: [github.com/coingecko/coingecko-python](https://github.com/coingecko/coingecko-python)
* **PyPI**: [pypi.org/project/coingecko-sdk/](https://pypi.org/project/coingecko-sdk/)

Notice something off or missing? Let us know by opening an [Issue here](https://github.com/coingecko/coingecko-python/issues).

Have feedback, a cool idea, or need help? Reach out to `soonaik@coingecko[dot]com`

**Examples:**

Example 1 (python):
```python
# src/api/client.py
  import os
  from coingecko_sdk import Coingecko, AsyncCoingecko

  # Initialize a single, reusable client. This should be imported and used application-wide.
  client = Coingecko(
      pro_api_key=os.environ.get("COINGECKO_PRO_API_KEY"),
      environment="pro",
      max_retries=3, # Rely on the SDK's built-in retry mechanism.
  )

  # Optional: Initialize a single async client for concurrent applications.
  async_client = AsyncCoingecko(
      pro_api_key=os.environ.get("COINGECKO_PRO_API_KEY"),
      environment="pro",
      max_retries=3,
  )

  # src/main.py
  from api.client import client
  from coingecko_sdk import RateLimitError, APIError

  def get_bitcoin_price():
      try:
          price_data = client.simple.price.get(
              ids="bitcoin",
              vs_currencies="usd",
          )
          # Access data using Pydantic models or dictionary keys
          return price_data['bitcoin'].usd
      except RateLimitError:
          print("Rate limit exceeded. Please try again later.")
          return None
      except APIError as e:
          print(f"An API error occurred: {e}")
          return None

  if __name__ == "__main__":
      price = get_bitcoin_price()
      if price:
          print(f"The current price of Bitcoin is: ${price}")
```

Example 2 (python):
```python
# ❌ NO direct HTTP requests.
  import requests
  response = requests.get('[https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd](https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd)')

  # ❌ NO use of the outdated `pycoingecko` library.
  from pycoingecko import CoinGeckoAPI
  cg = CoinGeckoAPI()

  # ❌ NO hardcoded API keys.
  client = Coingecko(pro_api_key='CG-abc123xyz789')

  # ❌ NO manual retry loops. The SDK's `max_retries` handles this.
  import time
  for i in range(3):
      try:
          data = client.simple.price.get(ids='bitcoin', vs_currencies='usd')
          break
      except:
          time.sleep(5)

  # ❌ NO generic exception handling for API errors.
  try:
      data = client.simple.price.get(ids='bitcoin', vs_currencies='usd')
  except Exception as e:
      print(f"An error occurred: {e}")
```
