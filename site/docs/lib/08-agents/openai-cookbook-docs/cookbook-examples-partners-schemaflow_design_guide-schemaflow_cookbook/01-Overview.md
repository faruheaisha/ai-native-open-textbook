---
title: "openai-cookbook-docs"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/partners/schemaflow_design_guide/schemaflow_cookbook.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/partners/schemaflow_design_guide/schemaflow_cookbook.md"
sourceSha256: "afab413d868b1d2b8951a5c01c177c86ce2789efff0e64115a37780fd84076dc"
pageSha256: "6c6593f8db425d063c58a05ba844482f8da5d73c18b945567db9c47990412b47"
contentMode: "local-full"
zh: ""
---

## Overview

Schema changes are deceptively simple. A request like “add a nullable column and backfill it” can affect landing tables, staging models, dimensional tables, marts, reporting logic, lineage assumptions, validation checks, rollback procedures, and release sequencing.

The examples use retail customer data because the dependencies are easy to see, but the same kinds of handoffs show up in many analytics and platform teams.

This cookbook demonstrates a practical pattern for using agents as a **change-analysis and implementation assistant** for database engineering work. Instead of asking one model to produce a final SQL script directly, the workflow breaks the task into explicit stages:

1. Parse the natural-language request into structured JSON.
2. Analyze impacted objects and operational risks.
3. Create a rollout plan with prechecks, postchecks, and rollback guidance.
4. Generate SQL across platform layers.
5. Run deterministic sanity checks.
6. Save a machine-readable artifact.
7. Optionally run Promptfoo evals against the current flow.

The result is not just a generated SQL script. It is an auditable bundle containing the interpreted change request, impact analysis, plan, SQL, validation results, optional RAG evidence summaries, and eval outputs.
