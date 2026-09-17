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
sourceRel: "cookbook/examples/agents_sdk/agent_improvement_loop.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/agents_sdk/agent_improvement_loop.md"
sourceSha256: "e4974f3b65d46cea41ba7561497e8602ad0731cfc5d1ab4d976c4f0246ea610a"
pageSha256: "88a8cfb2f314e91867098d8cd93020151f1af29a370d4070f422eba98c856132"
contentMode: "local-full"
zh: ""
---

## Top 3 changes to implement first

1. **Add a deterministic diligence fact ledger and domain checklist layer.**  
   Encode canonical facts and source-of-truth rules for ARR, runway/burn, parent-account concentration, unsupported metrics, and SOC 2 status so the agent cannot rely only on generic citation instructions.

2. **Upgrade validators to audit the actual output artifacts, not just claimed evidence coverage.**  
   Current validation can pass while artifact-level citation or claim-audit issues still require later repair. Parse generated markdown/JSON/CSV artifacts, extract material claims, verify source support, and fail on unsupported or unaudited claims.

3. **Persist the five generated evals into the checked-in regression suite.**  
   The generated evals all passed, but they should become durable regression tests so future prompt/runtime changes cannot regress on the specific human-feedback issues.
