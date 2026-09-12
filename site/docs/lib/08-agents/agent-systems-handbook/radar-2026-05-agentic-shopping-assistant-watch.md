---
title: "Agent Systems Handbook（智能体系统手册）"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md"
zh: ""
---

# Agent Systems Handbook（智能体系统手册）

import SupportCTA from "/snippets/support-cta.mdx";

## Summary

Amazon's May 2026 Alexa for Shopping launch pushes the phrase "AI assistant"
into a more transactional product shape: a shopping assistant can remember
preferences, compare products, track prices, schedule recurring purchase
actions, build carts, and hand off between phone, web, and Echo Show surfaces.

For handbook readers, the useful signal is not that commerce has another chat
box. It is that an assistant is being framed as a cross-surface system with
memory, product search, user preferences, purchase intent, automation, and
checkout review living in the same flow.

## Why It Matters

Shopping assistants are a practical test case for agent systems because they
sit near money, personal preferences, household context, and irreversible
actions. That makes the design boundary sharper than a general Q&A assistant:
the system needs to know when it is researching, recommending, cart-building,
scheduling, or asking a human to confirm a purchase.

This note connects to four durable handbook topics:

- [agent runtime building blocks](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/patterns/agent-runtime-building-blocks/README.md),
  because the assistant needs a message layer, tool boundary, memory layer, and
  action layer that do not blur together
- [agent memory and retrieval](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/patterns/agent-memory-and-retrieval/README.md), because
  preferences, past purchases, and current research context need separate
  storage and review rules
- [evaluation and observability](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/systems/evaluation-and-observability/README.md),
  because product comparisons, scheduled actions, and cart changes need audit
  trails that are easy to replay
- [messaging transaction assistant starter](/lib/08-agents/agent-systems-handbook/ecosystem-examples-messaging-transaction-assistant-starter-README),
  because checkout-adjacent assistants should keep payment execution outside
  the assistant until a user has reviewed the proposed action

## Evidence And Sources

- [Alexa for Shopping](https://www.aboutamazon.com/news/retail/alexa-for-shopping-ai-assistant):
  Amazon describes a personalized, agentic shopping assistant that combines
  Rufus product knowledge, Alexa+ context, shopping history, preferences,
  product comparisons, price history, scheduled actions, cart building, and
  cross-web purchase assistance.
- [Echo Show shopping with Alexa+](https://www.aboutamazon.com/news/devices/echo-show-alexa-plus-shopping):
  Amazon is moving the full shopping interface onto Echo Show, where customers
  can browse, compare, review, and order with voice, touch, or both.
- [Amazon's generative and agentic AI shopping overview](https://www.aboutamazon.com/news/retail/amazon-agentic-ai-gen-ai-shopping/):
  Amazon positions shopping assistance as an agentic commerce surface, including
  price tracking, recommendations, and the Buy for Me flow for eligible products
  outside Amazon's own store.

## Signals To Watch

- Whether shopping assistants separate research, recommendation, cart changes,
  scheduled actions, and purchase confirmation in the user interface and logs.
- Whether personal preference memory can be reviewed, corrected, scoped, or
  deleted separately from shopping history and order history.
- Whether "buy for me" style flows make the merchant, payment method, shipping
  address, refund path, and cancellation boundary explicit before completion.
- Whether cross-device assistants expose enough context transfer state for a
  user to understand why a suggestion appeared on a different surface.

## Editorial Take

This belongs in `radar/` for now. The durable lesson is not "shopping assistant
as a category" yet. The reusable pattern is narrower: transactional assistants
need a clear action ladder.

One useful ladder is:

1. answer a product or category question
2. compare options with visible sources and criteria
3. propose a cart or scheduled action
4. ask for explicit user review
5. execute only the approved purchase or reminder
6. preserve an audit trail for what changed and why

Future evergreen updates should treat that ladder as a transaction-safety
pattern, not as a vendor-specific shopping story.

## Update Log

- 2026-05-13: Added a radar note on agentic shopping assistants, cross-surface
  shopping memory, scheduled purchase actions, and review-before-checkout
  boundaries.
