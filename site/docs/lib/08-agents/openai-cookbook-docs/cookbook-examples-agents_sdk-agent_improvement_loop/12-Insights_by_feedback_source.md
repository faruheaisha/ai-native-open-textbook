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
pageSha256: "21e880019c18a8669bcfc3abbd093537282fa795c620625dfe7f683037f97b48"
contentMode: "local-full"
zh: ""
---

## Insights by feedback source

| Feedback source | Key insights |
|---|---|
| Traces | The agent generally follows the artifact-generation workflow and validation loop, but execution is generic and sometimes monolithic. Some repairs happen after validators pass, showing validation is not strict enough. Parent concentration trace demonstrated a good deterministic-calculation pattern worth generalizing. |
| Human feedback | Human feedback is the strongest evidence for domain gaps: runway must be 11 months with financing pressure; ARR must use finance-controlled source of truth; concentration must roll up to parent accounts; SOC 2 Type I and Type II must not be conflated; official NRR and CAC payback must be refused when unsupported. |
| LLM feedback | LLM insights reinforce the human themes: ARR headline numbers need caveats, unsupported metrics should not be promoted, retention and pipeline claims require source caveats, and SOC 2 Type II completion must not be overstated. |
| Generated evals | Five targeted evals were generated from the feedback themes: runway/burn, ARR source of truth, customer concentration parent rollup, SOC 2 precision, and unsupported metrics refusal. These encode the right regression surface and should be checked in. |
| Eval-gate results | The current eval gate passed: 5 total, 5 passed, 0 failed. This indicates the latest generated eval suite is satisfied, but the suite should be persisted and expanded to cover validators, artifact parsing, and calculation correctness. |
| Harness config | The harness already has strong generic evidence, citation, artifact, and validation requirements. Its main weakness is that it lacks explicit financial-diligence invariants and deterministic runtime checks for the exact mistakes surfaced by feedback. |
