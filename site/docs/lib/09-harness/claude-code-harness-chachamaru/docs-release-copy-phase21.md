---
title: "Phase 21 Release Copy Drafts"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/release-copy-phase21.md"
sourceRel: "docs/release-copy-phase21.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/release-copy-phase21.md"
sourceSha256: "4d0a22e2291612eaa241c5444f6beb87c2592712a9f27d2276db4a4a2320c62b"
pageSha256: "4d0a22e2291612eaa241c5444f6beb87c2592712a9f27d2276db4a4a2320c62b"
contentMode: "local-full"
zh: ""
---

# Phase 21 Release Copy Drafts

最終更新: 2026-03-06

Phase 21 を外向けに告知する場合の下書きです。
`trust repair`, `evidence pack`, `positioning refresh` を混ぜず、1トピックずつ分けて使います。

## Draft 1: Trust Repair

`claude-code-harness` の公開面を整理しました。README badge、欠損 docs、配布境界の説明を揃え、README / Plans / docs の自己矛盾を減らしています。

## Draft 2: Evidence Pack

`/harness-work all` の success / failure fixture と smoke runner を追加しました。主張だけでなく、artifact を見ながら再確認できる導線を用意しています。

## Draft 3: Positioning Refresh

Harness の中心メッセージを `5 verb skills + TypeScript guardrail engine` に再集中しました。skill pack を増やすだけでなく、runtime enforcement と verification を一体で回せる点を前面に出しています。

## Current Recommendation

- quota に当たっても evidence artifact は replay fallback で継続取得できる
- full success artifact が揃うまでは、Draft 2 で「再現可能な骨格を整備した」と表現する
- `production-ready` のような強い断言は避ける
- 競合比較を出す場合は `docs/positioning-notes.md` の語彙に合わせる
