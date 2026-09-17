---
title: "Phase 4 — Job"
sourceId: "04-work/workbuddy-bench-official"
sourceTitle: "WorkBuddy Bench（腾讯官方评测集）"
sourceKind: "产品仓库"
licenseLabel: "限非商用"
lang: "英文"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/Tencent/workbuddy-bench"
entryUrl: "https://github.com/Tencent/workbuddy-bench/blob/625b2233093ae4f23e76be28c1f341d41cc70373/.agents/skills/wbbench-run-setup/references/04-job.md"
sourceRel: ".agents/skills/wbbench-run-setup/references/04-job.md"
rawUrl: "/raw/04-work/workbuddy-bench-official/.agents/skills/wbbench-run-setup/references/04-job.md"
sourceSha256: "2affc5505cfa55545257c719e61508655d3dbb1d8390c7672fabc4bce54f46fe"
pageSha256: "2affc5505cfa55545257c719e61508655d3dbb1d8390c7672fabc4bce54f46fe"
contentMode: "local-full"
zh: ""
---

# Phase 4 — Job

Goal: write `configs/jobs/<slug>.yaml` — a *pure composition* of model +
harness + dataset, plus optional overrides.

**Read `configs/jobs/_template.job.yaml` and `configs/jobs/_reference.yaml`
first.** The template is the minimal required set; `_reference.yaml` documents
every overlay block field-by-field. `configs/jobs/` is gitignored by default —
only a few examples ship.

## Required fields

```yaml
model: <provider>/<slug>          # a configs/models/<...>.yaml slug (Phase 2)
harness: <family>/<version>       # e.g. codebuddy-code/2.103.4
