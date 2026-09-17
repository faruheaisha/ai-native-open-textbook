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
pageSha256: "ec73cf8ffdd59d42f212da3a0c64043198ed4317b1ba8612883530fa93e60981"
contentMode: "local-full"
zh: ""
---

## Spot Connector Developer Checklist - Hummingbot

**URL:** https://hummingbot.org/developers/connectors/spot-connector-checklist/

**Contents:**
- Spot Connector v2.1¶
- Prerequisites¶
- API Checklist¶
- Directory Setup¶
  - Connector¶
  - Tests¶
- Build Process¶
  - CONSTANTS¶
  - Web Utils¶
  - Utils¶

Before proceeding with the setup of the Spot Connector, ensure that you have the Hummingbot source version installed on your system. Follow the detailed installation instructions provided at Hummingbot Installation Guide.

Create connector folder inside hummingbot/hummingbot/connector/exchange called connector_name.

connector_name = the name of the connector in lowercase and separated with underscores if applies.

Example without underscore: binance

Example with underscore: crypto_com

Create the following files inside of the connector folder:

Create test folder dwad inside hummingbot/test/hummingbot/exchange called connector_name.

Create the following files inside of the test folder:

Add to the constant files the following variables

connector_name_order_book.py

For now we will not implement any method, the only purpose of this step because we need to import this class in the connector_name_api_order_book_data_source.py and we don’t want to have errors.

connector_name_api_order_book_data_source.py

test_connector_name_api_order_book_data_source.py

Now we are going to start implementing the functionalities of the Order Book Data source but in a TDD way.

listen_for_subscriptions

listen_for_order_book_diffs

listen_for_order_book_snapshots

connector_name_auth.py

test_connector_name_auth.py

Replace binance for connector_name.

connector_name_api_user_stream_data_source.py

test_connector_name_api_user_stream_data_source.py

Now we are going to start implementing the functionalities of the User Stream Data source but in a TDD way.

If you need Listen Key:

listen_for_user_stream

connector_name_exchange.py

test_connector_name_exchange.py

Replace binance for connector_name.

A lot of tests are already in the Generic test class! But you have to implement some methods to let it work.

trade_event_for_full_fill_websocket_update

Methods to implement of ExchangePyBase

update_time_synchronizer

_user_stream_event_listener

Add connector_name_api_key and connector_name_api_secret to the conf_global_TEMPLATE.yml
