---
title: "2. How to Use This Cookbook"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/partners/temporal_agents_with_knowledge_graphs/temporal_agents.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/partners/temporal_agents_with_knowledge_graphs/temporal_agents.md"
sourceSha256: "60af0697052abdc36b954c9ca21610d04c8f0d571ea518f561f8de0a7bc8de8c"
pageSha256: "99cb4d2ecfe9e5a3d3888de032fdc218a6dc602ee7e6116267470c8e2b730098"
contentMode: "local-full"
zh: ""
---

# 2. How to Use This Cookbook
---

This cookbook is designed for flexible engagement:

1. Use it as a comprehensive technical guide—read from start to finish for a deep understanding of temporally-aware knowledge graph systems.
2. Skim for advanced concepts, methodologies, and implementation patterns if you prefer a high-level overview.
3. Jump into any of the three modular sections; each is self-contained and directly applicable to real-world scenarios.

Inside, you'll find:

<ol style="margin-left: 1em; line-height: 1.6; padding-left: 0.5em;">
  <li style="margin-bottom: 1.2em;">
    <strong>Creating a Temporally-Aware Knowledge Graph with a Temporal Agent</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
      Build a pipeline that extracts entities and relations from unstructured text, resolves temporal conflicts, and keeps your graph up-to-date as new information arrives.
    </p>
  </li>

  <li style="margin-bottom: 1.2em;">
    <strong>Multi-Step Retrieval Over a Knowledge Graph</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
      Use structured queries and language model reasoning to chain multiple hops across your graph and answer complex questions.
    </p>
  </li>

  <li style="margin-bottom: 1.2em;">
    <strong>Prototype to Production</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
      Move from experimentation to deployment. This section covers architectural tips, integration patterns, and considerations for scaling reliably.
    </p>
  </li>
</ol>

## 2.1. Pre-requisites

Before diving into building temporal agents and knowledge graphs, let's set up your environment. Install all required dependencies with pip, and set your OpenAI API key as an environment variable. Python 3.12 or later is required.

```python
!python -V
%pip install --upgrade pip
%pip install -qU chonkie datetime ipykernel jinja2 matplotlib networkx numpy openai plotly pydantic rapidfuzz scipy tenacity tiktoken pandas
%pip install -q "datasets<3.0"
```

```text
Python 3.12.8
Requirement already satisfied: pip in ./.venv/lib/python3.12/site-packages (25.1.1)
Note: you may need to restart the kernel to use updated packages.
Note: you may need to restart the kernel to use updated packages.
Note: you may need to restart the kernel to use updated packages.
```

```python
import os

if "OPENAI_API_KEY" not in os.environ:
    import getpass
    os.environ["OPENAI_API_KEY"] = getpass.getpass("Paste your OpenAI API key here: ")
```

# 3. Creating a Temporally-Aware Knowledge Graph with a Temporal Agent
---

**Accurate data is the foundation of any good business decision.** 
OpenAI’s latest models like o3, o4-mini, and the GPT-4.1 family are enabling businesses to build state-of-the-art retrieval systems for their most important workflows. However, information evolves rapidly: facts ingested confidently yesterday may already be outdated today.

<img src="https://developers.openai.com/cookbook/assets/images/01_benefit_of_temporal_kb.jpg"
  alt="Benefits of Temporal Knowledge Base"
  width="791"
  style="height:auto;"
/>

Without the ability to track when each fact was valid, retrieval systems risk returning answers that are outdated, non-compliant, or misleading. The consequences of missing temporal context can be severe in any industry, as illustrated by the following examples.

<table>
  <thead>
    <tr>
      <th>Industry</th>
      <th>Example question</th>
      <th>Risk if database is not temporal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3"><strong>Financial Services</strong></td>
      <td><em>"How has Moody’s long‑term rating for Bank YY evolved since Feb 2023?"</em></td>
      <td>Mispricing credit risk by mixing historical & current ratings</td>
    </tr>
    <tr>
      <td><em>"Who was the CFO of Retailer ZZ when the FY‑22 guidance was issued?"</em></td>
      <td>Governance/insider‑trading analysis may blame the wrong executive</td>
    </tr>
    <tr>
      <td><em>"Was Fund AA sanctioned under Article BB at the time it bought Stock CC in Jan 2024?"</em></td>
      <td>Compliance report could miss an infraction if rules changed later</td>
    </tr>
    <tr>
      <td rowspan="3"><strong>Manufacturing / Automotive</strong></td>
      <td><em>"Which ECU firmware was deployed in model Q3 cars shipped between 2022‑05 and 2023‑03?"</em></td>
      <td>Misdiagnosing field failures due to firmware drift</td>
    </tr>
    <tr>
      <td><em>"Which robot‑controller software revision ran on Assembly Line 7 during Lot 8421?"</em></td>
      <td>Root‑cause analysis may blame the wrong software revision</td>
    </tr>
    <tr>
      <td><em>"What torque specification applied to steering‑column bolts in builds produced in May 2024?"</em></td>
      <td>Safety recall may miss affected vehicles</td>
    </tr>
  </tbody>
</table>

While we've called out some specific examples here, this theme is true across many industries including pharmaceuticals, law, consumer goods, and more.

**Looking beyond standard retrieval**

A temporally-aware knowledge graph allows you to go beyond static fact lookup. It enables richer retrieval workflows such as factual Q&A grounded in time, timeline generation, change tracking, counterfactual analysis, and more. We dive into these in more detail in our retrieval section later in the cookbook.

<img src="https://developers.openai.com/cookbook/assets/images/02_question_types_for_temporal_kbs.jpg"
  alt="Question types suitable for temporal knowledge bases"
  style="width:1091px; height:auto;"
/>

## 3.1. Introducing our Temporal Agent
---

A **temporal agent** is a specialized pipeline that converts raw, free-form statements into time-aware triplets ready for ingesting into a knowledge graph that can then be queried with the questions of the character *“What was true at time T?”*. 

Triplets are the basic building blocks of knowledge graphs. It's a way to represent a single fact or piece of knowledge using three parts (hence, *"triplet"*): 
- **Subject** - the entity you are talking about
- **Predicate** - the type of relationship or property
- **Object** - the value or other entity that the subject is connected to

You can thinking of this like a sentence with a structure `[Subject] - [Predicate] - [Object]`. As a more clear example:
```
"London" - "isCapitalOf" - "United Kingdom"
```

The Temporal Agent implemented in this cookbook draws inspiration from [Zep](https://arxiv.org/abs/2501.13956) and [Graphiti](https://github.com/getzep/graphiti), while introducing tighter control over fact invalidation and a more nuanced approach to episodic typing.
