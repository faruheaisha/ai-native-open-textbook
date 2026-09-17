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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/polymarket/references/llms-full.md"
sourceRel: "i18n/zh/skills/polymarket/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/polymarket/references/llms-full.md"
sourceSha256: "f2977ee42f8298e33bc8c8a0ee646bdd5f4e91e39de2641b8e15138a3174bd62"
pageSha256: "5c26c928fc006d60cb37c1bd9beb78624049631d903887b919d878c35733e7f2"
contentMode: "local-full"
zh: ""
---

## Resolution Process

### Actions

* **Initiate** - Binary CTF markets are initialized via the `UmaCtfAdapter`'s `initialize()` function. This stores the question parameters on the contract, prepares the CTF and requests a price for a question from the OO. It returns a `questionID` that is also used to reference on the `UmaCtfAdapter`. The caller provides:
  1. `ancillaryData` - data used to resolve a question (i.e the question + clarifications)
  2. `rewardToken` - ERC20 token address used for payment of rewards and fees
  3. `reward` - Reward amount offered to a successful proposer. The caller must have set allowance so that the contract can pull this reward in.
  4. `proposalBond` - Bond required to be posted by OO proposers/disputers. If 0, the default OO bond is used.
  5. `liveness` - UMA liveness period in seconds. If 0, the default liveness period is used.

* **Propose Price** - Anyone can then propose a price to the question on the OO. To do this they must post the `proposalBond`. The liveness period begins after a price is proposed.

* **Dispute** - Anyone that disagrees with the proposed price has the opportunity to dispute the price by posting a counter bond via the OO, this proposed will now be escalated to the DVM for a voter-wide vote.

### Possible Flows

When the first proposed price is disputed for a `questionID` on the adapter, a callback is made and posted as the reward for this new proposal. This means a second `questionID`, making a new `questionID` to the OO (the reward is returned before the callback is made and posted as the reward for this new proposal). This allows for a second round of resolution, and correspondingly a second dispute is required for it to go to the DVM. The thinking behind this is to doubles the cost of a potential griefing vector (two disputes are required just one) and also allows far-fetched (incorrect) first price proposals to not delay the resolution. As such there are two possible flows:

* **Initialize (CTFAdapter) -> Propose (OO) -> Resolve (CTFAdapter)**
* **Initialize (CTFAdaptor) -> Propose (OO) -> Challenge (OO) -> Propose (OO) -> Resolve (CTFAdaptor)**
* **Initialize (CTFAdaptor) -> Propose (OO) -> Challenge (OO) -> Propose (OO) -> Challenge (CtfAdapter) -> Resolve (CTFAdaptor)**
