---
title: "5. Prototype to Production"
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
pageSha256: "381a00a1c60efe1916c7cc9c7be0dcdc323d1ae581f379e86586055f0bf244a7"
contentMode: "local-full"
zh: ""
---

# 5. Prototype to Production
---

Transitioning your knowledge graph system from a proof-of-concept to a robust, production-grade pipeline requires you to address several key points:
- **Storing and retrieving high-volume graph data**
- **Managing and pruning datasets**
- **Implementing concurrency in the ingestion pipeline**
- **Minimizing token cost**
- **Scaling retrieval agents**
- **Safeguards**

This section serves as a walkthrough of key considerations and best practices to ensure your temporally-aware knowledge graph can operate reliably in a real-world environment. A more detailed [Prototype to Production Appendix section](#a-prototype-to-production) can be found towards the end of this cookbook.

<ol style="margin-left: 1em; line-height: 1.6; padding-left: 0.5em;">

<li style="margin-bottom: 1.2em;">
  <strong>Storing and Retrieving High-Volume Graph Data</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
[Appendix section A.1. "Storing and Retrieving High-Volume Graph Data"](#a1-storing-and-retrieving-high-volume-graph-data)
  </p>
  <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
    Manage scalability through thoughtful schema design, sharding, and partitioning. Clearly define entities, relationships, and ensure schema flexibility for future evolution. Use high-cardinality fields like timestamps for efficient data partitioning.
  </p>
</li>

<li style="margin-bottom: 1.2em;">
  <strong>Temporal Validity & Versioning</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
[Appendix section A.1.2. "Temporal Validity & Versioning"](#a12-temporal-validity-versioning)
  </p>
  <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
    Include temporal markers (valid_from, valid_to) for each statement. Maintain historical records non-destructively by marking outdated facts as inactive and indexing temporal fields for efficient queries.
  </p>
</li>

<li style="margin-bottom: 1.2em;">
  <strong>Indexing & Semantic Search</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
[Appendix section A.1.3. "Indexing & Semantic Search"](#a13-indexing-semantic-search)
  </p>
  <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
    Utilize B-tree indexes for efficient temporal querying. Leverage PostgreSQL’s pgvector extension for semantic search with approximate nearest-neighbor algorithms like ivfflat, ivfpq, and hnsw to optimize query speed and memory usage.
  </p>
</li>

<li style="margin-bottom: 1.2em;">
  <strong>Managing and Pruning Datasets</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
[Appendix section A.2. "Managing and Pruning Datasets"](#a2-managing-and-pruning-datasets)
  </p>
  <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
    Establish TTL and archival policies for data retention based on source reliability and relevance. Implement automated archival tasks and intelligent pruning with relevance scoring to optimize graph size.
  </p>
</li>

<li style="margin-bottom: 1.2em;">
  <strong>Concurrent Ingestion Pipeline</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
[Appendix section A.3. "Implementing Concurrency in the Ingestion Pipeline"](#a3-implementing-concurrency-in-the-ingestion-pipeline)
  </p>
  <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
    Implement batch processing with separate, scalable pipeline stages for chunking, extraction, invalidation, and entity resolution. Optimize throughput and parallelism to manage ingestion bottlenecks.
  </p>
</li>

<li style="margin-bottom: 1.2em;">
  <strong>Minimizing Token Costs</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
[Appendix section A.4. "Minimizing Token Cost"](#a4-minimizing-token-cost)
  </p>
  <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
    Use caching strategies to avoid redundant API calls. Adopt service tiers like OpenAI's flex option to reduce costs and replace expensive model queries with efficient embedding and nearest-neighbor search.
  </p>
</li>

<li style="margin-bottom: 1.2em;">
  <strong>Scaling Retrieval Agents</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
[Appendix section A.5. "Scaling and Productionizing our Retrieval Agent"](#a5-scaling-and-productionizing-our-retrieval-agent)
  </p>
  <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
    Use a controller and traversal workers architecture to handle multi-hop queries. Implement parallel subgraph extraction, dynamic traversal with chained reasoning, caching, and autoscaling for high performance.
  </p>
</li>

<li style="margin-bottom: 1.2em;">
  <strong>Safeguards & Verification</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
[Appendix section A.6. "Safeguards"](#a6-safeguards)
  </p>
  <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
    Deploy multi-layered output verification, structured logging, and monitoring to ensure data integrity and operational reliability. Track critical metrics and perform regular audits.
  </p>
</li>

<li style="margin-bottom: 1.2em;">
  <strong>Prompt Optimization</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
[Appendix section A.7. "Prompt Optimization"](#a7-prompt-optimization)
  </p>
  <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
    Optimize LLM interactions with personas, few-shot prompts, chain-of-thought methods, dynamic context management, and automated A/B testing of prompt variations for continuous performance improvement.
  </p>
</li>

</ol>

## Closing thoughts

This cookbook equips you with foundational techniques and concrete workflows to effectively build and deploy temporally-aware knowledge graphs coupled with powerful multi-hop retrieval capabilities. 

Whether you're starting from a prototype or refining a production system, leveraging structured graph data with OpenAI models can unlock richer, more nuanced interactions with your data. As these technologies evolve rapidly, look out for updates in OpenAI's model lineup and keep experimenting with indexing methods and retrieval strategies to continuously enhance your knowledge-centric AI solutions.

You can easily adapt the frameworks presented in this cookbook to your respective domain by customizing the provided ontologies and refining the extraction prompts. Swapping in Neo4j as the graph database takes you well on the way to an MVP level application, providing data persistence out of the box. It also opens the door to levelling up your retriever's tools with Cypher queries. 

Iterively develop your solution by making use of synthetic evals, and then test your solution against "golden" expert-human annotated solutions. Once in production, you can quickly iterate from human feedback to push your application to new heights. 

## Contributors
This cookbook serves as a joint collaboration between OpenAI and [Tomoro](https://tomoro.ai/).

- [Alex Heald](https://www.linkedin.com/in/alexandra-heald/)
- [Douglas Adams](https://www.linkedin.com/in/douglas-adams99/)
- [Rishabh Sagar](https://www.linkedin.com/in/rish-sagar/)
- [Danny Wigg](https://www.linkedin.com/in/dannywigg/)
- [Shikhar Kwatra](https://www.linkedin.com/in/shikharkwatra/)

# Appendix
---

Within this appendix, you'll find a more in-depth *Prototype to Production* section.

## A. Prototype to Production
