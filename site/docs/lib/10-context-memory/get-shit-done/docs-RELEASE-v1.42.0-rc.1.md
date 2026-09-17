---
title: "v1.42.0-rc.1 Release Notes"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/RELEASE-v1.42.0-rc.1.md"
sourceRel: "docs/RELEASE-v1.42.0-rc.1.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/RELEASE-v1.42.0-rc.1.md"
sourceSha256: "2964bfae3d4312a1487ff2a6c6577b12621ad2545608bd44cf68dddea9d23ea7"
pageSha256: "2964bfae3d4312a1487ff2a6c6577b12621ad2545608bd44cf68dddea9d23ea7"
contentMode: "local-full"
zh: ""
---

# v1.42.0-rc.1 Release Notes

First release candidate for the **1.42.0** train. Published to npm under the `next` dist-tag.

```bash
npx get-shit-done-cc@next
# or pin exact:
npm install -g get-shit-done-cc@1.42.0-rc1
```

> **Release-candidate stream caveat.** RCs come from `main` and are the staging stream for the next stable `latest`. They are stable enough for everyday use but may carry bake items resolved before the matching `vX.Y.0` is published. See [CANARY.md](/lib/10-context-memory/get-shit-done/docs-CANARY) for the stream policy.

---

## What's in this release

1.42.0-rc.1 is the first cut of the 1.42 train. The headline addition is a **package legitimacy gate against slopsquatting** — a three-layer defense across the research → plan → execute pipeline that prevents AI-hallucinated package names from flowing undetected into `npm install`. Underneath that, two structural refactors deepen the **SDK package seam** and the **phase lifecycle seams** so future work has cleaner module boundaries.

This RC also rolls up every fix that shipped in [v1.41.1](https://github.com/gsd-build/get-shit-done/releases/tag/v1.41.1). Those fixes are listed in the v1.41.1 notes and on the GitHub release page; this document is scoped to the **new features** in 1.42.0.

---

## Added

### Security

#### Package legitimacy gate against slopsquatting ([#3215](https://github.com/gsd-build/get-shit-done/pull/3215))
