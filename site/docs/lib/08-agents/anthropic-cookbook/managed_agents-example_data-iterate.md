---
title: "Iterate, get the tests green"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/managed_agents/example_data/iterate/README.md"
sourceRel: "managed_agents/example_data/iterate/README.md"
rawUrl: "/raw/08-agents/anthropic-cookbook/managed_agents/example_data/iterate/README.md"
sourceSha256: "780a43c8e0b1bcc9ed2d310c361c35db96e85b925cb8d07373f4d688fa0b223e"
pageSha256: "780a43c8e0b1bcc9ed2d310c361c35db96e85b925cb8d07373f4d688fa0b223e"
contentMode: "local-full"
zh: ""
---

# Iterate, get the tests green

A `calc.py` with three planted bugs and a `test_calc.py` with three assertions that catch them. Used by `CMA_iterate_fix_failing_tests.py`.

The interesting bug is `test_mean`: `mean()` calls `add` and `divide` internally, so it goes green on its own once the other two are fixed. An agent that edits `mean()` directly is over-fixing.
