---
title: "Macro Evals for Agentic Systems"
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
pageSha256: "8265ba188ab20b12545e490c2286c17674e8ac55b4781daca978a46ad437969f"
contentMode: "local-full"
zh: ""
---

# Macro Evals for Agentic Systems

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

When an agentic system fails, the problem is often larger than a single bad response. A handoff may happen too late, a specialist agent may miss the same signal across many runs, or a review process may trigger for the wrong class of cases. To improve the system, teams need to see recurring behavior across the whole population of traces.

This cookbook walks through a macro-eval workflow for a multi-agent system. We use a synthetic EV order workflow where specialist agents handle pricing, compliance, supply, factory routing, scheduling, and release decisions while market and operational conditions change.

The notebook uses precomputed synthetic traces and saved lower-level eval labels, so you can run the full workflow without an OpenAI API key.

You will learn how to:
1. Generate or collect many traced agent runs;
2. Run lower-level evals on each completed run;
3. Turn each trace into a compact document;
4. Discover recurring behavior patterns across the population; and
5. Drill into one high-impact pattern to find where a human should inspect the system next.

The goal is not to build a perfect taxonomy of every trace. The goal is to show how an AI engineering team can move from thousands of agent events to a small number of patterns that are understandable by both technical and business stakeholders.

## 本篇目录

- [End-to-End Agentic System Map](https://developers.openai.com/cookbook)
- [1. Why Macro Evals?](https://developers.openai.com/cookbook)
- [Setup and Data Materials](https://developers.openai.com/cookbook)
- [2. The Simulation: Automotive Orders in a Changing World](https://developers.openai.com/cookbook)
- [3. Lower-Level Agent Evals with Promptfoo](https://developers.openai.com/cookbook)
- [4. Build the Analysis Dataset](https://developers.openai.com/cookbook)
- [5. BERTopic-Style Discovery](https://developers.openai.com/cookbook)
- [6. AgentTrace-Style Diagnosis](https://developers.openai.com/cookbook)
- [7. What We Learned and What to Do Next](https://developers.openai.com/cookbook)
- [Contributors](https://developers.openai.com/cookbook)
