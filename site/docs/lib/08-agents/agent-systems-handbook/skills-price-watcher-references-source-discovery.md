---
title: "Source Discovery And Product Normalization"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/price-watcher/references/source-discovery.md"
sourceRel: "skills/price-watcher/references/source-discovery.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/price-watcher/references/source-discovery.md"
sourceSha256: "c4f36a6607c3d3bb500db739476d2b72c0ad0e4a771d882f10f054801ff1ffc2"
pageSha256: "c4f36a6607c3d3bb500db739476d2b72c0ad0e4a771d882f10f054801ff1ffc2"
contentMode: "local-full"
zh: ""
---

# Source Discovery And Product Normalization

Discover sources from the product query instead of asking for a URL.

## Search Pattern

Run several searches, mixing broad and retailer-specific queries:

- `"<query>" price`
- `"<query>" buy`
- `"<query>" site:bestbuy.com`
- `"<query>" site:walmart.com`
- `"<query>" site:target.com`
- `"<query>" site:bhphotovideo.com`
- `"<query>" site:amazon.com`

Choose retailers or marketplaces appropriate to the product category and the user's country.

## Normalization

Normalize names before deduplication:

- lowercase
- strip punctuation and marketing suffixes
- normalize units, generations, and sizes
- preserve important attributes such as model, year, processor, storage, dimensions, color, pack size, and condition

Treat these as likely different products unless the page proves equivalence:

- different generation or release year
- different storage or memory
- refurbished vs new
- used/open-box vs new
- bundle vs standalone item
- subscription price vs one-time price

Prefer source URLs that lead to a stable product detail page over search result pages.
