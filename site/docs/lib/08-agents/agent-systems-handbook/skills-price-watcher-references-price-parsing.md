---
title: "Price Parsing"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/price-watcher/references/price-parsing.md"
sourceRel: "skills/price-watcher/references/price-parsing.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/price-watcher/references/price-parsing.md"
sourceSha256: "923b6e9b8ee302787b4f0d827209796cc3881dfd6f337b7c4b5b15bf44ecf28d"
pageSha256: "923b6e9b8ee302787b4f0d827209796cc3881dfd6f337b7c4b5b15bf44ecf28d"
contentMode: "local-full"
zh: ""
---

# Price Parsing

Extract prices conservatively. Do not record a price unless it is visible or present in structured product offer data.

## Currency

Recognize common symbols:

- `$` -> infer USD/CAD/AUD from site or user locale
- `US$` -> USD
- `CA$` -> CAD
- `£` -> GBP
- `€` -> EUR

Store ISO-style currency codes when possible.

## Parsing Rules

- Remove thousands separators.
- Preserve cents.
- Ignore crossed-out list prices when a current sale price is visible.
- Ignore monthly financing prices unless the product is normally sold as a subscription.
- Ignore cart, checkout, or member-only prices if they require an account, cart action, or bypassing access controls.
- If a page shows a range, report the range in Markdown and store the lowest visible price only when it is a valid purchasable price.

## Preferred Extraction Order

1. JSON-LD `Product.offers.price` and `priceCurrency`
2. meta tags such as `product:price:amount`
3. embedded page state JSON with offer data
4. visible DOM text near the product title, price block, or buy box
