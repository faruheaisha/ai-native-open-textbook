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
sourceRel: "cookbook/examples/partners/macro_evals_for_agentic_systems/macro_evals_for_agentic_systems.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/partners/macro_evals_for_agentic_systems/macro_evals_for_agentic_systems.md"
sourceSha256: "8e4ce8a04972a43b5743557fbb3b3e380c8bbb81c9660fa3c0c3e2e83a97c026"
pageSha256: "fdccbc32c82713d8a86c404447ca2eac6de2fb4e68967d135461e2f345094c1b"
contentMode: "local-full"
zh: ""
---

## End-to-End Agentic System Map

![End-to-end macro evals architecture](https://developers.openai.com/cookbook/assets/images/agentic-system-architecture.svg)

The key idea is that the notebook evaluates a saved agentic system, not a generic chat transcript. Scenario inputs drive an orchestrated specialist swarm, the runtime emits trace bundles, saved Promptfoo labels are joined to normalized traces, and the macro-eval layer turns that evidence into pattern and diagnosis views.
