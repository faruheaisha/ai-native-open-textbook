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
pageSha256: "9fee3ecc907dcfe8a19f8989709f60d976951f757b21ccca9d125be174ada193"
contentMode: "local-full"
zh: ""
---

## Injective Helix - Hummingbot

**URL:** https://hummingbot.org/exchanges/injective/

**Contents:**
- Injective Helix
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
  - Delegate account mode¶
    - Trading permissions grant¶
    - Mode parameters¶
  - Off-chain vault mode¶
    - Mode parameters¶
  - Gas Fee Calculator Mode¶

Create a wallet on one of the supported networks below:

The connector supports two different account modes: - Trading with delegate accounts - Trading through off-chain vault contracts

There is a third account type called read_only_account. This mode only allows to request public information from the nodes, but since it does not require credentials it does not allow to perform trading operations.

When configuring the connector with this mode, the account used to send the transactions to the chain for trading is not the account holding the funds. The user will need to have one portfolio account and at least one trading account. And permissions should be granted with the portfolio account to the trading account for it to operate using the portfolio account's funds.

To grant permissions from a portfolio account to a trading account to operate using the portfolio account funds please refer to the script account_delegation_script.py

When configuring a new instance of the connector in Hummingbot the following parameters are required:

When configuring the connector with this mode, all the operations are sent to be executed by a vault contract in the chain. The user will need to have a vault contract deployed on chain, and use the vault's admin account to configure this mode's parameters. To know more about vaults please read the official Mito managed vaults documentation

When configuring a new instance of the connector in Hummingbot the following parameters are required:

Injective connectors support two different modes to calculate the gas fee when broadcasting transactions:

The gas estimation without simulation is more efficient because it does not require requesting the node to run the simulation (an action that could take around 200 milliseconds when using public nodes). But the gas estimation is not as accurate as the gas cost determined by the simulation. Using the gas estimation mode could result in spending a little bit more INJ on gas fee compared to the gas amount spent when using the fee calculator using simulation.

The gas estimation with transaction simulation uses a multiplier to estimate the gas fee. The default multiplier is 1.3, but users can change this value with the global variable GAS_LIMIT_ADJUSTMENT_MULTIPLIER in the constants module (hummingbot/connector/exchange/injective_v2/injective_constants.py).

Integration to spot markets API endpoints

This connector supports the following OrderType constants:

Integration to derivative markets API endpoints

This connector supports the following OrderType constants:

This connector supports the following position modes:
