---
title: "Hello Agents（Datawhale 智能体教程）"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter8/Chapter8-Memory-and-Retrieval.md"
sourceRel: "docs/chapter8/Chapter8-Memory-and-Retrieval.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter8/Chapter8-Memory-and-Retrieval.md"
sourceSha256: "33b062e56895ab0d9e523d94ac73e6243e6123e429d06eede3cc21944a485db0"
pageSha256: "c538c6c0710c567b9233e3fc3e9728f5e0ff9cd7e74187373317d384dfadd7d0"
contentMode: "local-full"
zh: ""
---

## Exercises

> **Note**: Some exercises do not have standard answers. The focus is on cultivating learners' comprehensive understanding and practical ability of memory systems and RAG technology.

1. This chapter introduced four memory types: working memory, episodic memory, semantic memory, and perceptual memory. Please analyze:

   - In Section 8.2.5, each memory type has a unique scoring formula. Please compare the scoring mechanisms of episodic memory and semantic memory, and explain why episodic memory emphasizes "temporal recency" more (weight 0.2), while semantic memory emphasizes "graph retrieval" more (weight 0.3)?
   - If you were to design a "personal health management assistant" (needs to record user's diet, exercise, sleep data, and provide health advice), how would you combine these four memory types? Please design specific application scenarios for each memory type.
   - Working memory uses a TTL (Time To Live) mechanism to automatically clean expired data. Please think: under what circumstances should important working memories be "consolidated" into long-term memory? How to design an automatic consolidation trigger condition?

2. In the RAG system in Section 8.3, we use MarkItDown to uniformly convert various format documents to Markdown. Please think deeply:

   > **Note**: This is a hands-on practice question, actual operation is recommended

   - The current intelligent chunking strategy is based on Markdown heading hierarchy (#, ##, ###) for segmentation. If processing documents without clear heading structure (such as novels, legal provisions), how should the chunking strategy be optimized? Please try to implement a chunking algorithm based on "semantic boundaries".
   - Section 8.3.5 introduced two advanced retrieval strategies: MQE (Multi-Query Expansion) and HyDE (Hypothetical Document Embeddings). Please select a practical scenario (such as technical document Q&A, medical knowledge retrieval), compare the effect differences of basic retrieval, MQE, and HyDE, and analyze their respective applicable scenarios.
   - The retrieval quality of the RAG system largely depends on the choice of embedding model. Please compare the three embedding solutions mentioned in this chapter (Bailian API, local Transformer, TF-IDF) from the dimensions of accuracy, speed, cost, offline deployment, etc., and provide selection recommendations.

3. The "forgetting" mechanism of the memory system is an important design that simulates human cognition. Based on the MemoryTool in Section 8.2.3, please complete the following extended practice:

   > **Note**: This is a hands-on practice question, actual operation is recommended

   - Currently, three forgetting strategies are provided: importance-based, time-based, and capacity-based. Please design and implement an "intelligent forgetting" strategy that comprehensively considers importance, access frequency, time decay, and other factors, using weighted scoring to decide which memories should be forgotten.
   - In long-running agent systems, the memory database may accumulate a large amount of data. Please design a "memory archiving" mechanism: transfer long-unused but potentially valuable memories to cold storage, and restore them when needed. How should this mechanism be integrated with the existing four memory types?
   - Think: If the agent needs to "forget" certain sensitive information (such as user privacy data), is it sufficient to just delete it from the database? In the case of using vector databases and graph databases, how to ensure data is completely cleared?

4. In the "Intelligent Learning Assistant" case in Section 8.4, we combined MemoryTool and RAGTool. Please analyze in depth:

   - The `ask_question()` method in the case uses both RAG retrieval and memory retrieval. Please analyze: under what circumstances should RAG be prioritized? Under what circumstances should Memory be prioritized? How to design an "intelligent routing" mechanism to automatically select the most appropriate retrieval method?
   - The current learning report (`generate_report()`) only contains statistical information. Please extend this function and design a more intelligent learning report generator: able to analyze user's learning trajectory, identify knowledge blind spots, and recommend next learning content. Which memory types and retrieval strategies are needed for this?
   - Suppose you want to deploy this learning assistant as a multi-user Web service, where each user has independent memory and knowledge base. Please design a data isolation solution: how to implement user-level data isolation in Qdrant and Neo4j? How to optimize retrieval performance in multi-user scenarios?

5. Semantic memory uses Neo4j graph database to store knowledge graphs. Please think:

   - In the semantic memory implementation in Section 8.2.5, the system automatically extracts entities and relationships to build knowledge graphs. Please analyze: how accurate is this automatic extraction? Under what circumstances might incorrect entities or relationships be extracted? How to design a "knowledge graph quality assessment" mechanism?
   - An important advantage of knowledge graphs is supporting complex relational reasoning. Please design a query scenario that fully utilizes Neo4j's graph query capabilities (such as multi-hop relationships, path finding) to accomplish tasks that pure vector retrieval cannot complete.
   - Compare the "vector retrieval + graph retrieval" hybrid strategy of semantic memory with pure vector retrieval: in what types of queries can graph retrieval bring significant performance improvements? Please illustrate with specific examples.
