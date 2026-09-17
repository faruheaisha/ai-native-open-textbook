---
title: "webfetch policy"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-recommender/references/web-fetch-policy.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/vm-recommender/references/web-fetch-policy.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-recommender/references/web-fetch-policy.md"
sourceSha256: "741bc6ee5c542502412e75770a3abb1df79ccc80a32c9bdf15a5e233bf6d53e7"
pageSha256: "741bc6ee5c542502412e75770a3abb1df79ccc80a32c9bdf15a5e233bf6d53e7"
contentMode: "local-full"
zh: ""
---

# web_fetch policy

Steps 2 and 3 of the recommender rely on `web_fetch` against `learn.microsoft.com` to verify that a recommendation reflects current capabilities (especially VMSS features, family availability, and Spot eligibility).

## When `web_fetch` succeeds

Use the live documentation as the source of truth. Cite the URL in the recommendation so the user can verify.

## When `web_fetch` fails (timeout, 404, blocked, offline)

Proceed using the reference files in `../../references/` — but **always** include this warning in the recommendation:

> ⚠ Unable to verify against latest Azure documentation. Recommendation is based on reference material that may not reflect recent updates (e.g., new VM families, Spot eligibility changes, regional rollouts).

Do not block the recommendation on `web_fetch` failure. The user is better served by an annotated recommendation than by no recommendation.

## What to fetch (Step 2 — VMSS)

```
https://learn.microsoft.com/azure/virtual-machine-scale-sets/overview
https://learn.microsoft.com/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-autoscale-overview
```

## What to fetch (Step 3 — VM family)

```
