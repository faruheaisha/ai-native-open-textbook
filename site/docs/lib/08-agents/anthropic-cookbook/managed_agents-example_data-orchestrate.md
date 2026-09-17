---
title: "Orchestrate, drive an issue to a merged PR"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/managed_agents/example_data/orchestrate/README.md"
sourceRel: "managed_agents/example_data/orchestrate/README.md"
rawUrl: "/raw/08-agents/anthropic-cookbook/managed_agents/example_data/orchestrate/README.md"
sourceSha256: "7156ca038b622ff721db8661fd90a2249e76e3b68e070c01fed9b0797f8d50c7"
pageSha256: "7156ca038b622ff721db8661fd90a2249e76e3b68e070c01fed9b0797f8d50c7"
contentMode: "local-full"
zh: ""
---

# Orchestrate, drive an issue to a merged PR

Self-contained mock of a maintainer workflow, used by `CMA_orchestrate_issue_to_pr.py`. The cookbook zips this directory and hands it to the agent.

- `gh-mock`, bash script that fakes the relevant `gh` subcommands. State persists in `.gh-state/`.
- `issue_42.json`, Unicode bug report (`Café Culture` → `caf-culture`). Vague enough that the agent has to read code.
- `src/url_utils.py` + `src/blog.py` + `tests/test_urls.py`, buggy `slugify()` and the failing tests that catch it.

Two recovery points are planted: an incomplete first fix fails CI with a pytest traceback, and the mock reviewer-bot blocks the merge if `slugify()` is missing a docstring. A healthy run ends with `.gh-state/pr_101.json` showing `state: merged`, `ci/test: pass`, and an `APPROVED` review.
