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
pageSha256: "686e833bdaf3c579d2baabcb6df1a72907cb45f990ae735c71a9a95fb91221c4"
contentMode: "local-full"
zh: ""
---

### Advantages of Batch Processing
* Throughput – Batching reduces the overhead of individual API calls and database transactions.

* Parallelism – Each stage can horizontally scale: you can run multiple worker processes for chunking, extraction, invalidation, etc., each reading from a queue.

* Backpressure & Reliability – If one stage becomes slow (e.g., statement invalidation during a sudden data surge), upstream stages can buffer more items in the queue until capacity frees up.
