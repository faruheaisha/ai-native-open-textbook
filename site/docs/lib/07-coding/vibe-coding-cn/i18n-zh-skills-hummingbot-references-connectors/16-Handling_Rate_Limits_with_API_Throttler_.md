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
pageSha256: "aeae6d8651a966c40243b70425842c1b89154837651de8dcaec2caa9168ffe84"
contentMode: "local-full"
zh: ""
---

## Handling Rate Limits with API Throttler - Hummingbot

**URL:** https://hummingbot.org/developers/connectors/api_throttler

**Contents:**
- Handling Rate Limits with API Throttler
- RateLimit & LinkedLimitWeightPair data classes¶
- Types of rate limits¶
  - 1. Rate limit per endpoint¶
  - 2. Rate limit pools¶
  - 3. Weighted request rate limits¶
- Integrating rate limits into the connector¶
- Consuming the throttler¶

The information below are for developers building spot and perp connectors that integrate directly into the Hummingbot client. For information on developing gateway connectors that use Gateway, see Building Gateway Connectors.

This section will detail the necessary steps to integrate the AsyncThrottler into the connector. The AsyncThrottler class utilizes asynchronous context managers to throttle API and/or WebSocket requests and avoid reaching the exchange's server rate limits.

The integration of the AsyncThrottler into the connector is entirely optional, but it is recommended to enable a better user experience as well as allowing users to manually configure the usable rate limits per Hummingbot instance.

The RateLimit data class is used to represent a rate limit defined by exchanges, while the LinkedLimitWeightPair data class is used to associate an endpoint consumption weight to its API Pool (defaults to 1 if it is not specified)

limit_id can be any arbitrarily assigned value. In the examples given in the next few sections, the limit_id assigned to the various rate limits are either a generic API pool name or the path url of the API endpoint.

It is important to identify the exchange's rate limit implementation before starting development.

There are several types of rate limits that can be handled by the AsyncThrottler class. The following sections will detail (with examples) how to initialize the necessary RateLimit and the interaction between the connector and the throttler for each of the different rate limit types.

kucoin is an example of a connector that utilizes this rate limit implementation.

This refers to rate limits that are applied on a per endpoint basis. For this rate limit type, the key information to retrieve for each endpoint would be its assigned limit and time interval. Note that the time interval is on a rolling basis. For example, if an endpoint's rate limit is 20 and the time interval is 60, this meant that the throttler will check if there are 20 calls made (to the same endpoint) within the past 60 seconds from the current moment.

Configuring Rate Limits

As mentioned above, the key information to retrieve from the exchange are the limit and time_interval (in seconds) of each endpoint. An example of an exchange implementing this can be seen in the kucoin connector.

Rate limits for Kucoin can be found here.

All the rate limits are to be initialized in the kucoin_constants.py file.

binance, binance_perpetual, and ndax are examples of connectors that utilizes this rate limit implementation

Rate limit pools refer to a group of endpoints that consumes from a single rate limit. For this rate limit type, the key information to retrieve for each endpoint are its assigned pool(s) and its respective limit and time interval.

Configuring Rate Limits

An example of an exchange implementing this can be seen in the ndax connector.

All the rate limit are initialized in the ndax_constants.py file.

Notice that we assign an arbitrary limit id (i.e. HTTP_ENDPOINTS_LIMIT_ID) to the API pools and we use the LinkedLimitWeightPair to assign an endpoint to the API pool. Also do note that an endpoint may belong to multiple other endpoints.

It is also worth noting that there can be more complex implementations to API pools as seen in the bybit_perpetual connector here.

binance and binance_perpetual are examples of connectors that utilizes this rate limit implementation

For weighted rate limits, each endpoint is assigned a request weight. Generally, these exchanges would utilize Rate Limit Pools in conjunction with the request weights, where different endpoints will have a different impact on the given pool. Key information to retrieve for these exchanges are the weights for each endpoint, limits and the time intervals for the API Pool.

Configuring Rate Limits

An example of an exchange implementing this type of rate limit can be seen in the binance connector.

Rate limits for Binance can be found in the API response for the GET /api/v3/exchangeInfo endpoint here.

Binance implements both API Pools as well as weighted requests. In the example above, the BINANCE_CREATE_ORDER endpoint has a request weight of 1 for 3 API Pools, while the SNAPSHOT_PATH_URL endpopint has a request weight of 50 for the REQUEST_WEIGHT API Pool. Notice that the API Pools have different rate limits and time intervals.

The throttler should be consumed by all relevant classes that issue server API calls that are limited by the exchange (either http requests or websocket requests). Namely the Exchange/Derivative, APIOrderBookDataSource and UserStreamDataSource classes. Doing so ensures that the throttler manages all REST API/Websocket requests issued by any of the connector components.

The throttler is used as an asynchronous context manager.

The path_url must be match the limit_id of the endpoint as defined in the RATE_LIMITS constant. The throttler will match the path_url to its assigned rate limits or API pools.

**Examples:**

Example 1 (unknown):
```unknown
RATE_LIMITS = [
    RateLimit(WS_CONNECTION_LIMIT_ID, limit=WS_CONNECTION_LIMIT, time_interval=WS_CONNECTION_TIME_INTERVAL),
    RateLimit(WS_REQUEST_LIMIT_ID, limit=100, time_interval=10),

    RateLimit(limit_id=PUBLIC_WS_DATA_PATH_URL, limit=NO_LIMIT, time_interval=1),
    RateLimit(limit_id=PRIVATE_WS_DATA_PATH_URL, limit=NO_LIMIT, time_interval=1),
    RateLimit(limit_id=TICKER_PRICE_CHANGE_PATH_URL, limit=NO_LIMIT, time_interval=1),
    RateLimit(limit_id=SYMBOLS_PATH_URL, limit=NO_LIMIT, time_interval=1),
    RateLimit(limit_id=SNAPSHOT_NO_AUTH_PATH_URL, limit=NO_LIMIT, time_interval=1),
    RateLimit(limit_id=ACCOUNTS_PATH_URL, limit=NO_LIMIT, time_interval=1),
    RateLimit(limit_id=SERVER_TIME_PATH_URL, limit=NO_LIMIT, time_interval=1),
    RateLimit(limit_id=GET_ORDER_LIMIT_ID, limit=NO_LIMIT, time_interval=1),
    RateLimit(limit_id=FEE_PATH_URL, limit=NO_LIMIT, time_interval=1),
    RateLimit(limit_id=ALL_TICKERS_PATH_URL, limit=NO_LIMIT, time_interval=1),
    RateLimit(limit_id=LIMIT_FILLS_PATH_URL, limit=NO_LIMIT, time_interval=1),
    RateLimit(limit_id=ORDER_CLIENT_ORDER_PATH_URL, limit=NO_LIMIT, time_interval=1),
    RateLimit(limit_id=POST_ORDER_LIMIT_ID, limit=45, time_interval=3),
    RateLimit(limit_id=DELETE_ORDER_LIMIT_ID, limit=60, time_interval=3),
    RateLimit(limit_id=ORDERS_PATH_URL, limit=45, time_interval=3),
    RateLimit(limit_id=FILLS_PATH_URL, limit=9, time_interval=3),
]
```

Example 2 (unknown):
```unknown
# Pool IDs
HTTP_ENDPOINTS_LIMIT_ID = "AllHTTP"
WS_ENDPOINTS_LIMIT_ID = "AllWs"

RATE_LIMITS = [
  # REST API Pool(applies to all REST API endpoints)
  RateLimit(limit_id=HTTP_ENDPOINTS_LIMIT_ID, limit=HTTP_LIMIT, time_interval=MINUTE),
  # WebSocket Pool(applies to all WS requests)
  RateLimit(limit_id=WS_ENDPOINTS_LIMIT_ID, limit=WS_LIMIT, time_interval=MINUTE),
  # Public REST API endpoint
  RateLimit(
      limit_id=MARKETS_URL,
      limit=HTTP_LIMIT,
      time_interval=MINUTE,
      linked_limits=[LinkedLimitWeightPair(HTTP_ENDPOINTS_LIMIT_ID)],
  ),
  # WebSocket Auth endpoint
  RateLimit(
      limit_id=ACCOUNT_POSITION_EVENT_ENDPOINT_NAME,
      limit=WS_LIMIT,
      time_interval=MINUTE,
      linked_limits=[LinkedLimitWeightPair(WS_ENDPOINTS_LIMIT_ID)],
  ),
]
```

Example 3 (unknown):
```unknown
RATE_LIMITS = [
    # Pools
    RateLimit(limit_id=REQUEST_WEIGHT, limit=1200, time_interval=ONE_MINUTE),
    RateLimit(limit_id=ORDERS, limit=10, time_interval=ONE_SECOND),
    RateLimit(limit_id=ORDERS_24HR, limit=100000, time_interval=ONE_DAY),
    # Weighted Limits
    RateLimit(limit_id=SNAPSHOT_PATH_URL, limit=MAX_REQUEST, time_interval=ONE_MINUTE,
              linked_limits=[LinkedLimitWeightPair(REQUEST_WEIGHT, 50)]),
    RateLimit(limit_id=BINANCE_CREATE_ORDER, limit=MAX_REQUEST, time_interval=ONE_MINUTE,
              linked_limits=[LinkedLimitWeightPair(REQUEST_WEIGHT, 1),
                             LinkedLimitWeightPair(ORDERS, 1),
                             LinkedLimitWeightPair(ORDERS_24HR, 1)]),
]
```

Example 4 (unknown):
```unknown
async with throttler.execute_task(path_url):
    res = await aiohttp.ClientSession().get(path_url)
```
