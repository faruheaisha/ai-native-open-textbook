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
sourceRel: "cookbook/examples/partners/temporal_agents_with_knowledge_graphs/temporal_agents.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/partners/temporal_agents_with_knowledge_graphs/temporal_agents.md"
sourceSha256: "60af0697052abdc36b954c9ca21610d04c8f0d571ea518f561f8de0a7bc8de8c"
pageSha256: "8aea42c9d3888b5afcd99b80f328d2e83b9b8cec66a19be2477771d4166adb5b"
contentMode: "local-full"
zh: ""
---

### Creating a Temporally-Aware Knowledge Graph with a Temporal Agent
<ol style="margin-left: 1em; line-height: 1.6; padding-left: 0.5em;">
  <li style="margin-bottom: 1.2em;">
    <strong>Why make your knowledge graph temporal?</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
     Traditional knowledge graphs treat facts as static, but real-world information evolves constantly. What was true last quarter may be outdated today, risking errors or misinformed decisions if the graph does not capture change over time. Temporal knowledge graphs allow you to precisely answer questions like “What was true on a given date?” or analyse how facts and relationships have shifted, ensuring decisions are always based on the most relevant context.
    </p>
  </li>

  <li style="margin-bottom: 1.2em;">
    <strong>What is a Temporal Agent?</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
      A Temporal Agent is a pipeline component that ingests raw data and produces time-stamped triplets for your knowledge graph. This enables precise time-based querying, timeline construction, trend analysis, and more.
    </p>
  </li>

  <li style="margin-bottom: 1.2em;">
    <strong>How does the pipeline work?</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
      The pipeline starts by semantically chunking your raw documents. These chunks are decomposed into statements ready for our Temporal Agent, which then creates time-aware triplets. An Invalidation Agent can then perform temporal validity checks, spotting and handling any statements that are invalidated by new statements that are incident on the graph.
    </p>
  </li>
</ol>
