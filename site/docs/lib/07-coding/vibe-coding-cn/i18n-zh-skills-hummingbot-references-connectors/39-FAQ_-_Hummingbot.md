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
pageSha256: "f2f408754a2127ee90df837db7184f28fa057b45f0c45dceda0ad9f809d0e94e"
contentMode: "local-full"
zh: ""
---

## FAQ - Hummingbot

**URL:** https://hummingbot.org/faq

**Contents:**
- FAQ
- Hummingbot client¶
  - What type of software is Hummingbot?¶
  - Is Hummingbot a protocol or an exchange?¶
  - How do people use Hummingbot?¶
  - Why is Hummingbot open source?¶
  - Why did you make Hummingbot available to the general public?¶
  - What is market making?¶
  - How does Hummingbot store my private keys and API keys?¶
  - What does it cost for me to run Hummingbot?¶

See below for answers to frequently asked questions about:

Hummingbot is software that helps you build and run crypto trading bots, freely available at https://github.com/hummingbot/hummingbot under the open source Apache 2.0 license.

No, Hummingbot is open source client software that you install on a local machine that interacts with exchanges and protocols.

With many connectors and strategies being added all the time, Hummingbot is a constantly evolving publicly available codebase with frequent external contributors seeking to merge their changes into the master branch, which is released once a month and widely used by tens of thousands of individual and professional bot-runners globally.

You can use Hummingbot to build any type of automated crypto trading bot, with the most common bot types being market making and arbitrage bots. Market making bots provide liquidity to a trading pair on an exchange, while arbitrage bots exploit price differences between trading pairs on different exchanges.

Typically, users install the Docker image version on AWS or another cloud provider. Afterwards, they can add their API key or private keys to it, which allows them to configure and run one of Hummingbot's pre-built strategies on many different exchanges.

Since Hummingbot is an open, modular codebase, many developers and professional firms fork the codebase and use it for their own purposes.

Trust and transparency: Market makers need to keep their API keys, private keys, and strategy configuration private and secure, so which is why Hummingbot is a local software client, not a web-based platform. In addition, Hummingbot's open source codebase enables anyone to inspect and audit the code.

Community maintenance: Hummingbot's value proposition is that it connects to many different centralized and decentralized exchanges, along with pre-built strategy templates that enable users to run many different types of trading strategies. In order to scale the number of connectors and strategies, Hummingbot relies upon its open source community.

Democratizing HFT: From the beginning, our mission has been to democratize high-frequency trading with open source software.

As we wrote in the original Hummingbot whitepaper, market making is an important function critical to organic, efficient markets that should be decentralized to prevent the concentration risk that exists in traditional finance.

Later, we pioneered the concept of decentralized market making by writing the Liquidity Mining whitepaper and built the first such platform: Hummingbot Miner. Miner has turned into a successful, standalone business that provides liquidity to hundreds of tokens across multiple exchanges, powered by thousands of individual market makers running Hummingbot.

This has allowed CoinAlpha to spin off Hummingbot into a not-for-profit foundation, which is dedicated to keeping Hummingbot open source.

Market making is the act of simultaneously creating buy and sell orders for an asset in a market. By doing so, a market maker acts as a liquidity provider, facilitating other market participants to trade by giving them the ability to fill the market maker's orders. Traditionally, market-making industry has been dominated by highly technical quantitative hedge funds and trading firms that have the infrastructure and intelligence to deploy sophisticated algorithms at scale.

Market makers play an important role in providing liquidity to financial markets, especially in the highly fragmented cryptocurrency industry. While large professional market makers fight over the most actively traded pairs on the highest volume exchanges, there exists a massive long tail of smaller markets who also need liquidity: tokens outside the top 10, smaller exchanges, decentralized exchanges, and new blockchains.

See What is market making? for more information.

Similar to wallet software, Hummingbot stores your private keys and API keys in encrypted form, using the password you enter when you first start Hummingbot. These keys are saved in your /conf folder.

Since Hummingbot is a local client, your private keys and API keys are as secure as the computer you are running them on. This is because the keys are used to create authorized instructions locally on the local machine, and only the instructions which have already been signed or authorized are sent out from the client.

Hummingbot is a free software, so you can download, install, and run it for free.

Transactions from Hummingbot are normal transactions conducted on exchanges; therefore when operating Hummingbot, you would be subject to each exchange’s fees (e.g. maker, taker, and withdrawal fees), as you would if you were trading on that exchange normally (i.e. without Hummingbot).

There is no minimum amount of assets to use Hummingbot, but users should pay heed to exchange-specific minimum order sizes. We include links to the exchange's minimum order size page. This can be found in each exchange's page in Exchange Connectors.

💡 DEX / Blockchain Experience Needed

Since Hummingbot Gateway is still nascent and DEX trading bots entails more specialized blockchain engineering than running CEX bots, we recommend Gateway for users with blockchain engineering or DEX trading experience.

Hummingbot Gateway is API middleware that helps Hummingbot clients interact with decentralized exchanges (DEXs) on various blockchain networks. It:

Similar to Hummingbot client, Gateway is open source under the Apache 2.0 license. Community developers can contribute DEX and blockchain connectors to the Gateway codebase via Pull Request Proposals.

If you want to understand how Gateway works, install the standalone Gateway repository: https://github.com/hummingbot/gateway

If you just want to get Gateway up and running alongside Hummingbot, following the Install with Docker process is the easiest method.

Afterwards, follow the instructions at Using Gateway with Hummingbot.

Currently, Hummingbot Gateway is ideal for bots that:

In the future, as Gateway should support additional use cases, but we are currently focused on enabling these only.

Bots that compete with others for transactions on the same blockchain (single-domain) need to compete to get transactions confirmed and thus need to play at the MEV level.

However, to improve latency, you may explore using Flashbots Protect as the RPC endpoint, i.e. use it as nodeUrl.

Here are some helpful articles and videos:

Speed and latency in DEX trading is heavily dependent on your connection to the blockchain network. Your options are to:

1 - Use a node provider

This is the most common route. Gateway ships with [Ankr] as the default node provider, since they don’t require API keys. See default settings for each chain.

2 - Use a mempool service

For advanced or professional users, mempool services allow you to “skip the line” and send your transaction bundle to a miner for inclusion in a block.

3 - Run your own node

While this is infeasible on Solana or BNB Chain, this is possible on Ethereum and EVM-based chains. See Run a Node for more details.

Check out the amm-arb or amm-v3-lp strategies.

The Hummingbot Foundation is a not-for-profit organization established in the Cayman Islands. The Foundation’s mission is to democratize high-frequency trading by enabling decentralized maintenance and community governance over the open-source Hummingbot code repository.

Below are its main roles and responsibilities:

Since Hummingbot is not a blockchain protocol, but rather open source client software run locally on individual client devices that interacts with protocols and exchanges, the Foundation governance system aims to fits into the existing Hummingbot open source software release process, which has been used to handle thousands of Github issues and pull requests created by the community over the past three years.

A large part of Hummingbot’s value comes from the number of connectors it supports and its overall usage, which can be measured by the aggregate trading activity that Hummingbot users supply to connected exchanges and protocols. The Foundation has fee share agreements and other partnerships with these exchanges and protocols that rebate fees based on usage, tracked at the API header level.

Meanwhile, community developers can maintain Hummingbot components of the codebase and extend the toolset to more markets and asset types, keeping maintenance costs low.

In addition, the Foundation plans to charge bounty administration fees to administer, review and merge the development work performed by bounty contributors.

Based on the source of income above, the Foundation is projected to be self-sustainable at inception. Over time, we expect this margin to increase as volume and fees generated grow as the Hummingbot user base expands.

A five-person Board of Directors provides oversight over the Foundation and oversees staff who manage day-to-day operations. This board is elected by HBOT token holders every 12 months.

In addition, the Foundation has a Chief Operating Officer and Chief Finance Officer, who collectively manage partnerships with exchanges, negotiate contracts with maintainers, and oversee the Foundation’s budget and finances.

The Foundation also employs staff who administer the governance system, respond to users on Discord, and handle other day-to-day operations of maintaining Hummingbot, including:

For the past 20 years, the Cayman Islands has been one of the preferred global jurisdictions for the incorporation of new securitizations, special purpose vehicles, and other new organizations. In 2017, the Cayman Islands introduced the Foundation Company structure, a flexible structure that allows a limited liability legal entity to operate similar to a civil law foundation, steered by a decentralized set of participants. The Hummingbot Foundation uses this structure.

See What is a Cayman Foundation Company? from Zedra, our corporate services provider in the Cayman Islands.

Post a message with your CV to one of the Foundation staff on Discord.

The Hummingbot Governance Token (HBOT) is the medium of governance for the Hummingbot open source ecosystem. It is a standard Ethereum ERC-20 token with a fixed total supply of 1,000,000,000 HBOT tokens.

HBOT is a governance token that give holders control over the Hummingbot codebase, the HBOT community treasury, and the Hummingbot Foundation. For instance, holders can:

HBOT token holders make these decisions by creating proposals and voting with their token balances. One HBOT equals one vote, and voting does not consume any tokens.

No. All Hummingbot Foundation proposals are on Snapshot, which lets HBOT holders vote by signing messages using their HBOT token balance to vote on issues without paying gas. Snapshots are recorded to IPFS to generate a permanent record.

To prevent HBOT token holders from being scammed by fraudulent versions of the token, unverified pools/DEXs, or incorrect coin listings, we maintain a compilation of verified HBOT-related pages from Reputable Sources. This does not constitute investment advice or a recommendation for any platform or market listed.

Please see Reputable Sources for information about venues where HBOT may be traded.

The Foundation plans to distribute the remaining 36 million tokens (36% of total supply) to Hummingbot users over the 4 years after inception across fixed Epochs. The goal is to distribute tokens to developers who contribute improvements to the codebase, and users of the Hummingbot software on connected exchanges and market making platforms.

See Hummingbot Governance Proposals for more information on the categories of HBOT grants.

The Hummingbot Foundation is grateful to everyone who has used Hummingbot, found bugs, and contributed to the codebase in the past. However, for the Retroactive Distribution, the Foundation decided to allocate tokens only to two types of historical activity: 1) Github code contributors and 2) users of the Hummingbot Miner platform. We chose these two types because past activity can be verified through public commit history and Miner API keys, respectively.

Other than those listed in the HBOT announcement, there are no other eligible HBOT recipients.

If you accidentally entered a Binance.com deposit address to claim your tokens, here is how you may be able to retrieve those tokens:
