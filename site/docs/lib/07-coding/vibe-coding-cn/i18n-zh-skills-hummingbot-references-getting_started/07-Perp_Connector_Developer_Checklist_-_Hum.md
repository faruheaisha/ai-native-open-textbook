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
pageSha256: "6c94a406acd623997ef37115eed45b50bce9037a04f21c40f36a0f283eb946d0"
contentMode: "local-full"
zh: ""
---

## Perp Connector Developer Checklist - Hummingbot

**URL:** https://hummingbot.org/developers/connectors/perp-connector-checklist/

**Contents:**
- Perpetual Connector v2.1¶
- Prerequisites¶
- API Checklist¶
- Build Process¶
  - Constants¶
  - Web Utils¶
  - Utils¶
  - Order Book Data Source¶
  - Auth¶
  - User Stream Data Source¶

Before proceeding with the setup of the Spot Connector, ensure that you have the Hummingbot source version installed on your system. Follow the detailed installation instructions provided at Hummingbot Installation Guide.

Add to the constant files the following variables

connector_name_api_order_book_data_source.py

test_connector_name_api_order_book_data_source.py

Now we are going to start implementing the functionalities of the Order Book Data source but in a TDD way.

listen_for_subscriptions

listen_for_order_book_diffs

listen_for_order_book_snapshots

listen_for_funding_info

test_connector_name_auth.py

connector_name_api_user_stream_data_source.py

test_connector_name_api_user_stream_data_source.py

Now we are going to start implementing the functionalities of the User Stream Data source but in a TDD way.

If you need Listen Key:

listen_for_user_stream

connector_name_exchange.py

test_connector_name_exchange.py

A lot of test are already in the Generic test class! But you have to implement some methods to let it work.

Methods for the Generic test class

Methods to implement of ExchangePyBase

Methods to implement of PerpetualDerivativePyBase

update_time_synchronizer

_user_stream_event_listener

Add connector_name_api_key and connector_name_api_secret to the conf_global_TEMPLATE.yml
