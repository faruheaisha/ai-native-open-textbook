---
title: "Merging Tokens"
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
pageSha256: "9d64498c8d5c17b9dae43562720e22398d22f53bf0bf521bc0ec675b31d00829"
contentMode: "local-full"
zh: ""
---

# Merging Tokens
Source: https://docs.polymarket.com/developers/CTF/merge

In addition to splitting collateral for a full set, the inverse can also happen; a full set can be "merged" for collateral. This operation can again happen at any time after a condition has been prepared on the CTF contract. One unit of each position in a full set is burned in return for 1 collateral unit. This operation happens via the `mergePositions()` function on the CTF contract with the following parameters:

* `collateralToken`: IERC20 - The address of the positions' backing collateral token.
* `parentCollectionId`: bytes32 - The ID of the outcome collections common to the position being merged and the merge target positions. Null in Polymarket case.
* `conditionId`: bytes32 - The ID of the condition to merge on.
* `partition`: uint\[] - An array of disjoint index sets representing a nontrivial partition of the outcome slots of the given condition. E.G. A|B and C but not A|B and B|C (is not disjoint). Each element's a number which, together with the condition, represents the outcome collection. E.G. 0b110 is A|B, 0b010 is B, etc. In the Polymarket case 1|2.
* `amount` - The number of full sets to merge. Also the amount of collateral to receive.

# Overview
Source: https://docs.polymarket.com/developers/CTF/overview

All outcomes on Polymarket are tokenized on the Polygon network. Specifically, Polymarket outcomes shares are binary outcomes (ie "YES" and "NO") using Gnosis' Conditional Token Framework (CTF). They are distinct ERC1155 tokens related to a parent condition and backed by the same collateral. More technically, the binary outcome tokens are referred to as "positionIds" in Gnosis's documentation. "PositionIds" are derived from a collateral token and distinct "collectionIds". "CollectionIds" are derived from a "parentCollectionId", (always bytes32(0) in our case) a "conditionId", and a unique "indexSet".

The "indexSet" is a 256 bit array denoting which outcome slots are in an outcome collection; it MUST be a nonempty proper subset of a condition's outcome slots. In the binary case, which we are interested in, there are two "indexSets", one for the first outcome and one for the second. The first outcome's "indexSet" is 0b01 = 1 and the second's is 0b10 = 2. The parent "conditionId" (shared by both "collectionIds" and therefore "positionIds") is derived from a "questionId" (a hash of the UMA ancillary data), an "oracle" (the UMA adapter V2), and an "outcomeSlotCount" (always 2 in the binary case). The steps for calculating the ERC1155 token ids (positionIds) is as follows:

1. Get the conditionId
   1. Function:
      1. `getConditionId(oracle, questionId, outcomeSlotCount)`
   2. Inputs:
      1. `oracle`: address - UMA adapter V2
      2. `questionId`: bytes32 - hash of the UMA ancillary data
      3. `outcomeSlotCount`: uint - 2 for binary markets

2. Get the two collectionIds
   1. Function:
      1. `getCollectionId(parentCollectionId, conditionId, indexSet)`
   2. Inputs:
      1. `parentCollectionId`: bytes32 - bytes32(0)
      2. `conditionId`: bytes32 - the conditionId derived from (1)
      3. `indexSet`: uint - 1 (0b01) for the first and 2 (0b10) for the second.

3. Get the two positionIds
   1. Function:
      1. `getPositionId(collateralToken, collectionId)`
   2. Inputs:
      1. `collateralToken`: IERC20 - address of ERC20 token collateral (USDC)
      2. `collectionId`: bytes32 - the two collectionIds derived from (3)

Leveraging the relations above, specifically "conditionIds" -> "positionIds" the Gnosis CTF contract allows for "splitting" and "merging" full outcome sets. We explore these actions and provide code examples below.

# Reedeeming Tokens
Source: https://docs.polymarket.com/developers/CTF/redeem

Once a condition has had it's payouts reported (ie by the UMACTFAdapter calling `reportPayouts` on the CTF contract), users with shares in the winning outcome can redeem them for the underlying collateral. Specifically, users can call the `redeemPositions` function on the CTF contract which will burn all valuable conditional tokens in return for collateral according to the reported payout vector. This function has the following parameters:

* `collateralToken`: IERC20 - The address of the positions' backing collateral token.
* `parentCollectionId`: bytes32 - The ID of the outcome collections common to the position being redeemed. Null in Polymarket case.
* `indexSets`: uint\[] - The ID of the condition to redeem.
* `indexSets`: uint\[] - An array of disjoint index sets representing a nontrivial partition of the outcome slots of the given condition. E.G. A|B and C but not A|B and B|C (is not disjoint). Each element's a number which, together with the condition, represents the outcome collection. E.G. 0b110 is A|B, 0b010 is B, etc. In the Polymarket case 1|2.

# Splitting USDC
Source: https://docs.polymarket.com/developers/CTF/split

At any time, after a condition has been prepared on the CTF contract (via `prepareCondition`), it is possible to "split" collateral into a full (position) set. In other words, one unit USDC can be split into 1 YES unit and 1 NO unit. If splitting from the collateral, the CTF contract will attempt to transfer `amount` collateral from the message sender to itself. If successful, `amount` stake will be minted in the split target positions. If any of the transfers, mints, or burns fail, the transaction will revert. The transaction will also revert if the given partition is trivial, invalid, or refers to more slots than the condition is prepared with. This operation happens via the `splitPosition()` function on the CTF contract with the following parameters:

* `collateralToken`: IERC20 - The address of the positions' backing collateral token.
* `parentCollectionId`: bytes32 - The ID of the outcome collections common to the position being split and the split target positions. Null in Polymarket case.
* `conditionId`: bytes32 - The ID of the condition to split on.
* `partition`: uint\[] - An array of disjoint index sets representing a nontrivial partition of the outcome slots of the given condition. E.G. A|B and C but not A|B and B|C (is not disjoint). Each element's a number which, together with the condition, represents the outcome collection. E.G. 0b110 is A|B, 0b010 is B, etc. In the Polymarket case 1|2.
* `amount` - The amount of collateral or stake to split. Also the number of full sets to receive.

# RTDS Comments
Source: https://docs.polymarket.com/developers/RTDS/RTDS-comments

&lt;Note>Polymarket provides a Typescript client for interacting with this streaming service. [Download and view it's documentation here](https://github.com/Polymarket/real-time-data-client)&lt;/Note>
