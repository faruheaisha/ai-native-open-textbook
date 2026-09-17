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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/polymarket/references/learn.md"
sourceRel: "i18n/zh/skills/polymarket/references/learn.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/polymarket/references/learn.md"
sourceSha256: "7c4ec0ea55ae27ce367a9d1986e4f0bc407b2b03ed70d46936adcee4ea22bde2"
pageSha256: "56fd2c76983bac34076fa1b073a8e8c0649a7d2454b6a27ee2ef0f9b100e67e8"
contentMode: "local-full"
zh: ""
---

## Augmented Negative Risk

There is a known issue with the negative risk architecture which is that the outcome universe must be complete before conversions are made or otherwise conversion will “cost” something. In most cases, the outcome universe can be made complete by deploying all the named outcomes and then an “other” option. But in some cases this is undesirable as new outcomes can come out of nowhere and you'd rather them be directly named versus grouped together in an “other”.

To fix this, some markets use a system of **"augmented negative risk"**, where named outcomes, a collection of unnamed outcomes, and an *other* is deployed. When a new outcome needs to be added, an unnamed outcome can be clarified to be the new outcome via the bulletin board. This means the “other” in the case of augmented negative risk can effectively change definitions (outcomes can be taken out of it).

As such, trading should only happen on the named outcomes, and the other outcomes should be ignored until they are named or until resolution occurs. The Polymarket UI will not show unnamed outcomes.

If a market becomes resolvable and the correct outcome is not named (originally or via placeholder clarification), it should resolve to the *“other”* outcome. An event can be considered “augmented negative risk” when `enableNegRisk` is true **AND** `negRiskAugmented` is true.

The naming conventions are as follows:

### Original Outcomes

* Outcome A
* Outcome B
* ...

### Placeholder Outcomes

* Person A -> can be clarified to a named outcome
* Person B -> can be clarified to a named outcome
* ...

* Other -> not meant to be traded as the definition of this changes as placeholder outcomes are clarified to named outcomes
