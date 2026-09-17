---
title: "Community Extensibility"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/community.md"
sourceRel: "docs/community.md"
rawUrl: "/raw/09-harness/better-harness/docs/community.md"
sourceSha256: "dc72df65bdbbe0e8dbb2dc06f54b3c8157385db60b22b21e4ccb0c05c6dc177e"
pageSha256: "dc72df65bdbbe0e8dbb2dc06f54b3c8157385db60b22b21e4ccb0c05c6dc177e"
contentMode: "local-full"
zh: ""
---

# Community Extensibility

## Start Here

Most contributions touch one of two surfaces. Try these before reading the full
matrix below:

1. **Add guidance to an existing workflow** -> drop a topic-scoped Markdown file
   in `skills/<skill>/references/` (or shared `references/`). No code, no schema;
   just stable headings and a link/path check.
2. **Add a report style** -> add a directive-only `templates/style/<style>.md`
   and route it in `templates/style/routing.md`. Style files own visual grammar,
   not runnable skeletons.

Reach for the full surface matrix only when you add executable behavior (scripts,
hooks), a maturity model or detector, a host adapter, or packaging.

To add a Coding Agent host, start with
[Contributing a New Coding Agent Host](https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/adapters/contributing-new-coding-agent.md).
It turns the matrix row into an evidence, implementation, cross-platform, and
review workflow without making every support slice mandatory.

## Extensible Surfaces

This is the complete reference. For the common cases, see Start Here above.

| Surface | Extensible by community | Canonical owner | Contract required | Activation path | Validation evidence |
| --- | --- | --- | --- | --- | --- |
| Shared workflow | Yes | `skills/<skill>/` | `SKILL.md` frontmatter and concise workflow; optional `references/` for conditional detail | Triggered by the host skill loader or packaged plugin | `quick_validate.py`, realistic prompt smoke, path checks |
| Skill detail and reusable guidance | Yes | `skills/<skill>/references/` or shared `references/` | Topic-scoped Markdown with stable headings and source boundaries | Loaded only when the skill or agent task needs it | Link/path check; consumer grep for any 2+ consumer claim |
| Maturity model | Yes, additive only | `models/<model>.md` plus `models/routing.md` | Stable `model_id`, aliases, audience, levels, dimensions, evidence sources, scoring and confidence rules | Selectable through model routing after routing-file registration | Model-routing checks, fixture/report sample, no mutation of built-in defaults unless intentional |
