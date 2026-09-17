---
title: "1. Executive Summary"
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
pageSha256: "973dcdfa0b7975961cd61692a0583219f212bc6e096050a725a4b98aad8336bd"
contentMode: "local-full"
zh: ""
---

# 1. Executive Summary

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

---

## 1.1. Purpose and Audience

This notebook provides a hands-on guide for building **temporally-aware knowledge graphs** and performing **multi-hop retrieval directly over those graphs**. 

It's designed for engineers, architects, and analysts working on temporally-aware knowledge graphs. Whether you’re prototyping, deploying at scale, or exploring new ways to use structured data, you’ll find practical workflows, best practices, and decision frameworks to accelerate your work.

This cookbook presents two hands-on workflows you can use, extend, and deploy right away:

<ol style="margin-left: 1em; line-height: 1.6; padding-left: 0.5em;">
  <li style="margin-bottom: 1.2em;">
    <strong>Temporally-aware knowledge graph (KG) construction</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
      A key challenge in developing knowledge-driven AI systems is maintaining a database that stays current and relevant. While much attention is given to boosting retrieval accuracy with techniques like semantic similarity and re-ranking, this guide focuses on a fundamental—yet frequently overlooked—aspect: <em>systematically updating and validating your knowledge base as new data arrives</em>.
    </p>
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
      No matter how advanced your retrieval algorithms are, their effectiveness is limited by the quality and freshness of your database. This cookbook demonstrates how to routinely validate and update knowledge graph entries as new data arrives, helping ensure that your knowledge base remains accurate and up to date.
    </p>
  </li>

  <li style="margin-bottom: 1.2em;">
    <strong>Multi-hop retrieval using knowledge graphs</strong><br />
<p style="margin-top: 0.5em; margin-bottom: 0.5em;">
  Learn how to combine OpenAI models (such as o3, o4-mini, GPT-4.1, and GPT-4.1-mini) with structured graph queries via tool calls, enabling the model to traverse your graph in multiple steps across entities and relationships.
</p>
<p style="margin-top: 0.5em; margin-bottom: 0.5em;">
  This method lets your system answer complex, multi-faceted questions that require reasoning over several linked facts, going well beyond what single-hop retrieval can accomplish.
</p>
  </li>
</ol>

Inside, you'll discover:

* **Practical decision frameworks** for choosing models and prompting techniques at each stage
* **Plug-and-play code examples** for easy integration into your ML and data pipelines
* **Links to in-depth resources** on OpenAI tool use, fine-tuning, graph backend selection, and more
* **A clear path from prototype to production**, with actionable best practices for scaling and reliability

> **Note:** All benchmarks and recommendations are based on the best available models and practices as of June 2025. As the ecosystem evolves, periodically revisit your approach to stay current with new capabilities and improvements.

## 1.2. Key takeaways

## 本篇目录

- [Creating a Temporally-Aware Knowledge Graph with a Temporal Agent](https://developers.openai.com/cookbook)
- [Multi-Step Retrieval Over a Knowledge Graph](https://developers.openai.com/cookbook)
- [Prototype to Production](https://developers.openai.com/cookbook)
- [3.1.1. Key enhancements introduced in this cookbook](https://developers.openai.com/cookbook)
- [3.1.2. The Temporal Agent Pipeline](https://developers.openai.com/cookbook)
- [3.1.3. Selecting the right model for a Temporal Agent](https://developers.openai.com/cookbook)
- [Architecture diagram](https://developers.openai.com/cookbook)
- [3.2.1. Load transcripts](https://developers.openai.com/cookbook)
- [3.2.2. Creating a Semantic Chunker](https://developers.openai.com/cookbook)
- [3.2.3. Laying the Foundations for our Temporal Agent](https://developers.openai.com/cookbook)
- [3.2.4. Statement Extraction](https://developers.openai.com/cookbook)
- [3.2.5. Temporal Range Extraction](https://developers.openai.com/cookbook)
- [3.2.6. Creating our Triplets](https://developers.openai.com/cookbook)
- [3.2.7. Temporal Event](https://developers.openai.com/cookbook)
- [3.2.8. Defining our Temporal Agent](https://developers.openai.com/cookbook)
- [3.2.9. Entity Resolution](https://developers.openai.com/cookbook)
- [3.2.10. Invalidation agent](https://developers.openai.com/cookbook)
- [3.2.11. Putting it all together](https://developers.openai.com/cookbook)
- [3.3.1 Building our Knowledge Graph with NetworkX](https://developers.openai.com/cookbook)
- [3.3.2 NetworkX versus Neo4j in Production](https://developers.openai.com/cookbook)
- [3.4.1. Temporal Agent](https://developers.openai.com/cookbook)
- [3.4.2. Invalidation Agent](https://developers.openai.com/cookbook)
- [4.1.1. Imports](https://developers.openai.com/cookbook)
- [4.1.2. (Re-)Initialise OpenAI Client](https://developers.openai.com/cookbook)
- [4.1.3. (Re-)Load our Temporal Knowledge Graph](https://developers.openai.com/cookbook)
- [4.1.4. Planner](https://developers.openai.com/cookbook)
- [4.1.5. Function calling](https://developers.openai.com/cookbook)
- [4.1.6. Retriever](https://developers.openai.com/cookbook)
- [4.1.7. Selecting the right model for Multi-Step Knowledge-Graph Retrieval](https://developers.openai.com/cookbook)
- [Which is the best evaluation method?](https://developers.openai.com/cookbook)
- [A.1. Storing and Retrieving High-Volume Graph Data](https://developers.openai.com/cookbook)
- [A.2. Managing and Pruning Datasets](https://developers.openai.com/cookbook)
- [A.3. Implementing Concurrency in the Ingestion Pipeline](https://developers.openai.com/cookbook)
- [Advantages of Batch Processing](https://developers.openai.com/cookbook)
- [A.4. Minimizing Token Cost](https://developers.openai.com/cookbook)
- [A.5. Scaling and Productionizing our Retrieval Agent](https://developers.openai.com/cookbook)
- [A.6. Safeguards](https://developers.openai.com/cookbook)
- [A.7. Prompt Optimization](https://developers.openai.com/cookbook)
