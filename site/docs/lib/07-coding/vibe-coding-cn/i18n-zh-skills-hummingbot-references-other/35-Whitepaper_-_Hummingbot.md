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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/other.md"
sourceRel: "i18n/zh/skills/hummingbot/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/other.md"
sourceSha256: "7bd57673fc3df5b901db36ae3eac6be136526e8e2dbb141702c9a6ebc26b607a"
pageSha256: "0714c0fe0305f3fed8580a6d74614bfb956ddd06661baf45b54acdb0107c62f3"
contentMode: "local-full"
zh: ""
---

## Whitepaper - Hummingbot

**URL:** https://hummingbot.org/governance/whitepaper/

**Contents:**
- Hummingbot Foundation Governance¶
- Overview¶
  - Principles¶
  - Ecosystem¶
  - Governance¶
- Foundation¶
  - Sources of funds¶
    - Exchange fee share agreements¶
    - Administration of bounties, grants, and hackathons¶
  - Roles¶

See State of the Foundation 2024 for an update to this whitepaper.

Originally posted on December 17, 2021

The Hummingbot Foundation (the “Foundation”) is a not-for-profit organization established in the Cayman Islands. The Foundation’s mission is to democratize high-frequency trading by enabling decentralized maintenance and community governance over the open-source Hummingbot code repository.

Hummingbot is software that helps you build and run automated trading strategies (“bots”), freely and publicly available under the Apache 2.0 open source license at https://github.com/hummingbot/hummingbot.

Launched in April 2019, Hummingbot’s latest v0.46.0 release spans 1.8 million lines of code across 12,625 commits from 112 unique code contributors, and it contains over 30 different exchange/blockchain connectors and 14 strategy templates. Approximately 1100 Github users have forked the Hummingbot codebase for their own use.

Below are the core principles that underpin Hummingbot’s development:

The Hummingbot Foundation’s primary role is to coordinate the ongoing maintenance and improvement of the open source Hummingbot codebase via a decentralized set of actors: Exchanges, Contributors, and Users.

Exchanges are centralized or decentralized exchanges, blockchain protocols, other other organizations who enter into fee share and/or other referral agreements with Hummingbot Foundation based on user trading volume. Polls define the level of maintenance that the Foundation spends on each connector.

Contributors are individual developers and firms that build and maintain Hummingbot components. Contributors submit their work as pull requests to the official Github repository, and they are paid bounties when that work has been merged and included in an official release. Bounties may be funded by either Hummingbot Foundation or other community members.

Users are individual and professional traders who install and use the Hummingbot open source software, released every month, to run trading bots. The volume they generate on partner exchanges sustains the operations of Hummingbot Foundation.

The Foundation will administer a system that will empower holders of the Hummingbot Governance Token (“HBOT”) to govern Hummingbot. The sole use case for HBOT Tokens will be to empower holders to decide how the Hummingbot codebase changes over time through voting on proposals.

All pull requests, or proposed code changes to the Github code repository, will need to be submitted as a Pull Request Proposal and be approved by HBOT holders in order to be merged into the codebase and included in an official release.

In addition, HBOT holders will be able to create and vote on Improvement Proposals that direct the Foundation to implement architectural changes or prioritize specific enhancements or bug fixes. HBOT holders will also be able to create and vote on Governance Proposals that modify aspects of the governance system or allocate funding toward grant programs. Development work that results from an approved grant or Improvement Proposal also will need to undergo the pull request approval process in order to be merged into the development branch.

Pull requests will be continually approved and merged through the month. Approximately once per month, the development branch of the codebase will be cloned onto the master branch of the codebase, which will subsequently be packaged into an official release in various formats for different operating systems.

In order to enable decentralized maintenance and democratic governance of the Hummingbot codebase, the Foundation plans to engage in the following functions:

Hummingbot exchange connectors integrate with the API of a cryptocurrency exchange in order to expose standardized data format and endpoints to Hummingbot strategies (automated processes that interact with exchange APIs) that are created and configured by Users. Since exchange APIs vary widely, these connectors allow anyone to run bots across multiple exchanges without requiring engineering time on low-level exchange API integrations.

Thus far, CoinAlpha has built many of the connectors in the Hummingbot codebase, and it has agreements and contracts with many of the connected exchanges that rebate a portion of fees incurred by Users, measured via unique identifiers in API requests executed with the Hummingbot software, to CoinAlpha.

In the future, the Foundation plans to negotiate and enter into similar agreements with new exchanges for connectors. To support the Foundation and the Hummingbot community, CoinAlpha also plans to remit to the Foundation all income from its existing agreements, or assign them to the Foundation. The Foundation anticipates using this income to compensate community Maintainers for their services.

One of the Foundation’s primary responsibilities will be to work with Sponsors seeking to fund specific work items such as new connectors, new strategies, or enhancements or fixes to existing components (bounties), as well as others who want to fund more work in more general areas such as strategies for new assets or exchange types (grants and hackathons).

The Foundation may charge Sponsors a fee in order to administer the programs, liaise with Contributors, and review/merge the resulting development work.

Similar to the Linux and Apache Foundations, the Foundation’s Board of Directors will provide oversight over the Foundation and its staff, as well as manage the HBOT multi-sig wallet. All transfers of HBOT from the wallet will be approved by a majority of the Board.

The initial 5-person Board of Directors will be elected by HBOT holders. Board members will serve 12-month terms and will not receive any compensation for Board service. No more than a maximum of 2 Board members will be full-time employees and/or directors of the same outside entity, such as CoinAlpha.

The Foundation plans to employ a Chief Financial Officer (CFO) who will oversee the Foundation’s budget and finances and a Chief Operating Officer (COO) who will represent the Foundation in executing partnerships with Sponsors and contracts with Maintainers.

In addition, the Foundation plans to employ engineering, project management, community management, and quality assurance personnel who will handle the day-to-day operations of maintaining the Hummingbot codebase and the HBOT governance system, such as:

The HBOT governance system will allow holders to propose and approve changes to the Hummingbot codebase and the Hummingbot Foundation governance process.

The Hummingbot Foundation expects to use Snapshot for effecting HBOT governance. All proposals will be found on the official Hummingbot Snapshot hosted at https://snapshot.org/#/hbot.eth.

There will initially be three types of proposals, and each type will have different initial governance parameters:

HBOT token holdings entitles the holder to an equivalent amount of votes, including any fractional token amounts.

A Pull Request Proposal (PRP) will be a proposal linked to an open pull request in the Hummingbot code repository. Each PRP will go through the process below:

During either the preliminary or the final review, the Foundation may unilaterally reject a proposal (e.g., to prevent a security vulnerability or merge conflict) as long as it communicates the rationale behind the decision to the community. It is anticipated that such authority would be used sparingly and in legitimate circumstances. If the community disagrees with the Foundation’s decision to reject a proposal, the community has the power to replace the Foundation’s directors with more like-minded directors to ensure that the community’s directives are followed.

An Improvement Proposal (IP) will be a proposal linked to an issue in the Hummingbot Github repository that specifies a proposed improvement to a component of the Hummingbot codebase. While there will be no formal restriction on what types of Improvement Proposals can be created, the Foundation expects that the community will approve proposals that benefit the Hummingbot user base as a whole, either by fixing a critical bug, adding a key new feature, or making a necessary refactor of the architecture.

Each IP will go through the process below:

A Governance Proposal (GP) will be a proposal linked to an issue in the Hummingbot Github repository that specifies either a proposed modification to the Foundation governance system, or a proposed distribution of HBOT tokens from the treasury for a community activity such as a grant.

Each GP will go through the process below:

Aspects of the Foundation governance system that Governance Proposals may modify will include approval thresholds, quorum thresholds, board of director elections, and Maintainer elections. GPs may not modify the Foundation bylaws, HBOT token distribution and issuance mechanics, or HBOT total supply.

One of the main activities of the Foundation will be enabling third party Sponsors to fund bounties and hackathons that compensate developers for submitting pull requests, such as feature enhancements, bug fixes, and new connectors/strategies, to the open source Hummingbot codebase. Sponsors are expected to comprise exchanges, blockchain protocols, trading firms, and other institutions who use Hummingbot or benefit from usage on their platforms.

Pull requests linked to bounties and hackathons will go through the same Pull Request Process as other pull requests. The Foundation will charge a fee to Sponsors to administer these pull requests.

One of the primary ways that Foundation will distribute tokens to Hummingbot Users is through grant programs that reward developers to make contributions to the codebase. These grant programs will aim to incentivize contributions similar to the launch contributions described in the Hummingbot Foundation announcement, which include a new strategy template that enables Users to run triangular arbitrage, a web-based graphical interface for the Hummingbot client, and webhooks that enable TradingView integration.

The Foundation expects that a significant portion of the HBOT tokens that will be allocated over the next 4 years (36% of total tokens) will be allocated toward grants to facilitate similar contributions. In 2022, the Foundation will begin accepting applications for HBOT token grants. Once accepted, developers will need to issue a pull request and have it merged via the governance system in order to receive grant funds.

The initial governance framework described above is intended to lay the groundwork for a viable governance system that will enable the Hummingbot community to decide how the Hummingbot codebase evolves, while allowing developers to maintain and contribute to the codebase. The Foundation hopes and expects that the community will improve and expand upon this initial governance framework as the community sees fit in order to meet the needs of a growing, diversified user base.
