---
title: "Polymarket - Api"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/polymarket/references/api.md"
sourceRel: "i18n/zh/skills/polymarket/references/api.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/polymarket/references/api.md"
sourceSha256: "ae807707d344e934b64855cdf092619bc5d757d8285344ecdce0b6b5af70123f"
pageSha256: "ae807707d344e934b64855cdf092619bc5d757d8285344ecdce0b6b5af70123f"
contentMode: "local-full"
zh: ""
---

# Polymarket - Api

**Pages:** 46

---

## Get sports metadata information

**URL:** llms-txt#get-sports-metadata-information

Source: https://docs.polymarket.com/api-reference/sports/get-sports-metadata-information

api-reference/gamma-openapi.json get /sports
Retrieves metadata for various sports including images, resolution sources, ordering preferences, tags, and series information. This endpoint provides comprehensive sport configuration data used throughout the platform.

---

## Get user activity

**URL:** llms-txt#get-user-activity

Source: https://docs.polymarket.com/api-reference/core/get-user-activity

api-reference/data-api-openapi.yaml get /activity
Returns on-chain activity for a user.

---

## Get comments by comment id

**URL:** llms-txt#get-comments-by-comment-id

Source: https://docs.polymarket.com/api-reference/comments/get-comments-by-comment-id

api-reference/gamma-openapi.json get /comments/\{id\}

---

## Get open interest

**URL:** llms-txt#get-open-interest

Source: https://docs.polymarket.com/api-reference/misc/get-open-interest

api-reference/data-api-openapi.yaml get /oi

---

## Get total value of a user's positions

**URL:** llms-txt#get-total-value-of-a-user's-positions

Source: https://docs.polymarket.com/api-reference/core/get-total-value-of-a-users-positions

api-reference/data-api-openapi.yaml get /value

---

## Get related tags (relationships) by tag id

**URL:** llms-txt#get-related-tags-(relationships)-by-tag-id

Source: https://docs.polymarket.com/api-reference/tags/get-related-tags-relationships-by-tag-id

api-reference/gamma-openapi.json get /tags/\{id\}/related-tags

---

## List events

**URL:** llms-txt#list-events

Source: https://docs.polymarket.com/api-reference/events/list-events

api-reference/gamma-openapi.json get /events

---

## Get tag by id

**URL:** llms-txt#get-tag-by-id

Source: https://docs.polymarket.com/api-reference/tags/get-tag-by-id

api-reference/gamma-openapi.json get /tags/\{id\}

---

## Get market by id

**URL:** llms-txt#get-market-by-id

Source: https://docs.polymarket.com/api-reference/markets/get-market-by-id

api-reference/gamma-openapi.json get /markets/\{id\}

---

## WSS Authentication

**URL:** llms-txt#wss-authentication

Source: https://docs.polymarket.com/developers/CLOB/websocket/wss-auth

&lt;Tip> Only connections to `user` channel require authentication. &lt;/Tip>

| Field      | Optional | Description                           |
| ---------- | -------- | ------------------------------------- |
| apikey     | yes      | Polygon account's CLOB api key        |
| secret     | yes      | Polygon account's CLOB api secret     |
| passphrase | yes      | Polygon account's CLOB api passphrase |

---

## Get tags related to a tag slug

**URL:** llms-txt#get-tags-related-to-a-tag-slug

Source: https://docs.polymarket.com/api-reference/tags/get-tags-related-to-a-tag-slug

api-reference/gamma-openapi.json get /tags/slug/\{slug\}/related-tags/tags

---

## Get related tags (relationships) by tag slug

**URL:** llms-txt#get-related-tags-(relationships)-by-tag-slug

Source: https://docs.polymarket.com/api-reference/tags/get-related-tags-relationships-by-tag-slug

api-reference/gamma-openapi.json get /tags/slug/\{slug\}/related-tags

---

## Get total markets a user has traded

**URL:** llms-txt#get-total-markets-a-user-has-traded

Source: https://docs.polymarket.com/api-reference/misc/get-total-markets-a-user-has-traded

api-reference/data-api-openapi.yaml get /traded

---

## Get market by slug

**URL:** llms-txt#get-market-by-slug

Source: https://docs.polymarket.com/api-reference/markets/get-market-by-slug

api-reference/gamma-openapi.json get /markets/slug/\{slug\}

---

## List tags

**URL:** llms-txt#list-tags

Source: https://docs.polymarket.com/api-reference/tags/list-tags

api-reference/gamma-openapi.json get /tags

---

## Get market price

**URL:** llms-txt#get-market-price

Source: https://docs.polymarket.com/api-reference/pricing/get-market-price

api-reference/clob-subset-openapi.yaml get /price
Retrieves the market price for a specific token and side

---

## Next page of markets with tag filtering

**URL:** llms-txt#next-page-of-markets-with-tag-filtering

**Contents:**
- Best Practices
- Related Endpoints

curl "https://gamma-api.polymarket.com/markets?tag_id=100381&closed=false&limit=25&offset=25"
```

1. **For Individual Markets:** Always use the slug method for best performance
2. **For Category Browsing:** Use tag filtering to reduce API calls
3. **For Complete Market Discovery:** Use the events endpoint with pagination
4. **Always Include `closed=false`:** Unless you specifically need historical data
5. **Implement Rate Limiting:** Respect API limits for production applications

* [Get Markets](/developers/gamma-markets-api/get-markets) - Full markets endpoint documentation
* [Get Events](/developers/gamma-markets-api/get-events) - Full events endpoint documentation
* [Search Markets](/developers/gamma-markets-api/get-public-search) - Search functionality

---

## API Key Operations

**URL:** llms-txt#api-key-operations

**Contents:**
- Create API Key
- Derive API Key
- Get API Keys
- Delete API Key
- Access Status
- Get Closed Only Mode Status

<Tip>This endpoint requires an **L1 Header**.</Tip>

Create new API key credentials for a user.

<Tip>This endpoint requires an **L1 Header**. </Tip>

Derive an existing API key for an address and nonce.

<Tip>This endpoint requires an **L2 Header**. </Tip>

Retrieve all API keys associated with a Polygon address.

<Tip>This endpoint requires an **L2 Header**.</Tip>

Delete an API key used to authenticate a request.

Check the value of `cert_required` by signer address.

## Get Closed Only Mode Status

<Tip>This endpoint requires an **L2 Header**.</Tip>

Retrieve the closed-only mode flag status.

**Examples:**

Example 1 (unknown):
```unknown
***

## Derive API Key

<Tip>This endpoint requires an **L1 Header**. </Tip>

Derive an existing API key for an address and nonce.

**HTTP Request:**
```

Example 2 (unknown):
```unknown
***

## Get API Keys

<Tip>This endpoint requires an **L2 Header**. </Tip>

Retrieve all API keys associated with a Polygon address.

**HTTP Request:**
```

Example 3 (unknown):
```unknown
***

## Delete API Key

<Tip>This endpoint requires an **L2 Header**.</Tip>

Delete an API key used to authenticate a request.

**HTTP Request:**
```

Example 4 (unknown):
```unknown
***

## Access Status

Check the value of `cert_required` by signer address.

**HTTP Request:**
```

---

## List comments

**URL:** llms-txt#list-comments

Source: https://docs.polymarket.com/api-reference/comments/list-comments

api-reference/gamma-openapi.json get /comments

---

## Get trades for a user or markets

**URL:** llms-txt#get-trades-for-a-user-or-markets

Source: https://docs.polymarket.com/api-reference/core/get-trades-for-a-user-or-markets

api-reference/data-api-openapi.yaml get /trades

---

## Get event tags

**URL:** llms-txt#get-event-tags

Source: https://docs.polymarket.com/api-reference/events/get-event-tags

api-reference/gamma-openapi.json get /events/\{id\}/tags

---

## Create and Place an Order

**URL:** llms-txt#create-and-place-an-order

**Contents:**
  - Request Payload Parameters
  - Order types
  - Response Format
  - Insert Error Messages
  - Insert Statuses

&lt;Tip> This endpoint requires a L2 Header &lt;/Tip>

Create and place an order using the Polymarket CLOB API clients. All orders are represented as "limit" orders, but "market" orders are also supported. To place a market order, simply ensure your price is marketable against current resting limit orders, which are executed on input at the best price.
