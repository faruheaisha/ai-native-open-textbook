---
title: "Reducing Hallucination in Structured Outputs via RAG"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/research/rag_hallucinations.en.mdx"
sourceRel: "pages/research/rag_hallucinations.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/research/rag_hallucinations.en.mdx"
sourceSha256: "dcaa9d37c006b682d0935ecb38461151b3bd7243467f307abaaa41c4dcbc5545"
pageSha256: "dcaa9d37c006b682d0935ecb38461151b3bd7243467f307abaaa41c4dcbc5545"
contentMode: "local-full"
zh: ""
---

# Reducing Hallucination in Structured Outputs via RAG

import \{Bleed\} from 'nextra-theme-docs'

<iframe width="100%"
  height="415px"
  src="https://www.youtube.com/embed/TUL5guqZejw?si=Doc7lzyAY-SKr21L" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  />

Researchers at ServiceNow shared a [new paper](https://arxiv.org/abs/2404.08189) where they discuss how to deploy an efficient RAG system for structured output tasks.

!["RAG Hallucination"](/mirror/21/21ca5ec237becb45c45364a7f847634a638a6f2d.png)

The RAG system combines a small language model with a very small retriever. It shows that RAG can enable deploying powerful LLM-powered systems in limited-resource settings while mitigating issues like hallucination and increasing the reliability of outputs.

The paper covers the very useful enterprise application of translating natural language requirements to workflows (formatted in JSON). So much productivity can come from this task but there is a lot of optimization that can be further achieved (eg., using speculative decoding or using YAML instead of JSON).

The paper provides some great insights and practical tips on how to effectively develop RAG systems for the real world.
