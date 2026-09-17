---
title: "Reasoning with Intermediate Revision and Search for LLMs"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/research/thoughtsculpt.en.mdx"
sourceRel: "pages/research/thoughtsculpt.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/research/thoughtsculpt.en.mdx"
sourceSha256: "6a4846785b012eb6c1c16730a32fdad252855d8ff964fed4a83d6b05e99982e9"
pageSha256: "6a4846785b012eb6c1c16730a32fdad252855d8ff964fed4a83d6b05e99982e9"
contentMode: "local-full"
zh: ""
---

# Reasoning with Intermediate Revision and Search for LLMs

import \{Bleed\} from 'nextra-theme-docs'

<iframe width="100%"
  height="415px"
  src="https://www.youtube.com/embed/13fr5m6ezOM?si=DH3XYfzbMsg9aeIx" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  />

This work by [Chi et al. (2024)](https://arxiv.org/abs/2404.05966) presents an approach for general reasoning and search on tasks that can be decomposed into components. 

The proposed graph-based framework, THOUGHTSCULPT, incorporates iterative self-revision capabilities and allows an LLM to build an interwoven network of thoughts. 

Unlike other approaches such as Tree-of-thoughts that shape the reasoning process using a tree, this new approach incorporates Monte Carlo Tree Search (MCTS) to efficiently navigate the search space.

This new method uses an LLM-powered thought evaluator to provide feedback on candidate partial outputs. Then a thought generator component produces potential solutions. The thought evaluator and thought generator are considered the expansion phase which helps with refining the current solution. 

!["ThoughtSculpt"](/mirror/8e/8ef8dd75a72fa09ad80ce6722d60062978426f3c.png)

Finally, the decision simulator (which acts as part of the MCTS process) simulates consecutive lines of thought to evaluate the potential value of a path.

Due to its ability for continuous thought iteration, THOUGHTSCULPT is particularly suitable for tasks such as open-ended generation, multip-step reasoning, and creative ideation.

We might be seeing more advanced approaches that use similar concepts and search algorithms to elevate the reasoning capabilities of LLMs and the ability to tackle problems that require complex reason and planning. Great paper to keep track of this research trend.
