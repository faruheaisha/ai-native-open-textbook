---
title: "Efficient Infinite Context Transformers"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/research/infini-attention.en.mdx"
sourceRel: "pages/research/infini-attention.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/research/infini-attention.en.mdx"
sourceSha256: "19a538bf7240e38b17d96993e81367410f4f74ad18b0f03a03aa39f148e06e62"
pageSha256: "19a538bf7240e38b17d96993e81367410f4f74ad18b0f03a03aa39f148e06e62"
contentMode: "local-full"
zh: ""
---

# Efficient Infinite Context Transformers

import \{Bleed\} from 'nextra-theme-docs'

<iframe width="100%"
  height="415px"
  src="https://www.youtube.com/embed/tOaTaQ8ZGRo?si=pFP-KiLe63Ppl9Pd" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  />

A new [paper](https://arxiv.org/abs/2404.07143) by Google integrates compressive memory into a vanilla dot-product attention layer. 

The goal is to enable Transformer LLMs to effectively process infinitely long inputs with bounded memory footprint and computation.

They propose a new attention technique called Infini-attention which incorporates a compressive memory module into a vanilla attention mechanism. 

!["Infini-Attention"](/mirror/ac/ac04954561d48ac479a9ada95b4afcc2b974c603.png)

It builds in both masked local attention and long-term linear attention into a single Transformer block. This allows the Infini-Transformer model to efficiently handle both long and short-range contextual dependencies. 

This approach outperforms baseline models on long-context language modeling with a 114x compression ratio of memory!

They also show that a 1B LLM can naturally scale to a 1M sequence length and a 8B model achieves a new SoTA result on a 500K length book summarization task.

Given how important long-context LLMs are becoming having an effective memory system could unlock powerful reasoning, planning, continual adaption, and capabilities not seen before in LLMs.
