---
title: "Phase 21 Release Checklist"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/release-checklist-phase21.md"
sourceRel: "docs/release-checklist-phase21.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/release-checklist-phase21.md"
sourceSha256: "ec24d2e6d1f506086109a4f6e2c7e912199f14185f77dd50d2ce6de0f908f071"
pageSha256: "ec24d2e6d1f506086109a4f6e2c7e912199f14185f77dd50d2ce6de0f908f071"
contentMode: "local-full"
zh: ""
---

# Phase 21 Release Checklist

最終更新: 2026-03-06

このチェックリストは `trust repair`, `evidence pack`, `positioning refresh` を含む変更をリリース判断するときの確認表です。

## Surfaces

- [ ] `VERSION` と `.claude-plugin/plugin.json` が一致している
- [ ] README / README_ja が latest release badge を使っている
- [ ] README / README_ja のリンク切れがない
- [ ] `docs/distribution-scope.md` と `Plans.md` の記述が一致している
- [ ] `docs/claims-audit.md` の分類が今回の文言と矛盾していない

## Evidence

- [ ] `./tests/validate-plugin.sh`
- [ ] `./tests/validate-plugin-v3.sh`
- [ ] `./scripts/ci/check-consistency.sh`
- [ ] `cd core && npm test`
- [ ] `./scripts/evidence/run-work-all-smoke.sh`
- [ ] 必要なら `./scripts/evidence/run-work-all-success.sh --full`
- [ ] live Claude 完走を示したい場合は `./scripts/evidence/run-work-all-success.sh --full --strict-live`
- [ ] 必要なら `./scripts/evidence/run-work-all-failure.sh --full`

## Artifact Review

- [ ] `docs/evidence/work-all.md` の説明と生成物が一致している
- [ ] `out/evidence/work-all/` の直近 artifact を確認した
- [ ] success / failure のどちらが未検証かを release note に明記する

## Release Decision

- [ ] 今回の変更が release metadata 更新を伴うか判定した
- [ ] GitHub Release / tag 作成の明示承認を得た
- [ ] 告知文面で `trust repair`, `evidence pack`, `positioning refresh` を混ぜずに整理した

## Current Recommendation (2026-03-06)

- replay fallback 付きの evidence tooling を出すだけなら release 可能です。
- ただし「live Claude がそのまま happy path を完走した」と強く告知するなら、`--strict-live` artifact を取ってからにします。
