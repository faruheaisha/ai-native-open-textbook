---
title: "How Faithful are RAG Models?"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/research/rag-faithfulness.en.mdx"
sourceRel: "pages/research/rag-faithfulness.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/research/rag-faithfulness.en.mdx"
sourceSha256: "8f8f0da04554ee4ed6e167e0919cd581d500c5f29f58cb70a40da3cd4d1326c4"
pageSha256: "8f8f0da04554ee4ed6e167e0919cd581d500c5f29f58cb70a40da3cd4d1326c4"
contentMode: "local-full"
zh: ""
---

# How Faithful are RAG Models? 

import \{Bleed\} from 'nextra-theme-docs'

<iframe width="100%"
  height="415px"
  src="https://www.youtube.com/embed/eEU1dWVE8QQ?si=b-qgCU8nibBCSX8H" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  />

This new paper by [Wu et al. (2024)](https://arxiv.org/abs/2404.10198) aims to quantify the tug-of-war between RAG and LLMs' internal prior.  

It focuses on GPT-4 and other LLMs on question answering for the analysis.

It finds that providing correct retrieved information fixes most of the model mistakes (94% accuracy).  

!["RAG Faithfulness"](/mirror/dd/dd92cd1f5b2fd38cf5fce8ee54d2be2a9e43e230.png)
*Source: [Wu et al. (2024)](https://arxiv.org/abs/2404.10198)*

When the documents contain more incorrect values and the LLM's internal prior is weak, the LLM is more likely to recite incorrect information. However, the LLMs are found to be more resistant when they have a stronger prior.  

The paper also reports that "the more the modified information deviates from the model's prior, the less likely the model is to prefer it."  

So many developers and companies are using RAG systems in production. This work highlights the importance of assessing risks when using LLMs given different kinds of contextual information that may contain supporting, contradicting, or completely incorrection information.
