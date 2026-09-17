---
title: "Prompt Engineering Guide"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/models/llama.zh.mdx"
sourceRel: "pages/models/llama.zh.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/models/llama.zh.mdx"
sourceSha256: "6400d4902f054aab76821da8ef7e2a7ec615e9b013001e767fc54248f7031351"
pageSha256: "6400d4902f054aab76821da8ef7e2a7ec615e9b013001e767fc54248f7031351"
contentMode: "local-full"
zh: ""
---

# Prompt Engineering Guide

## LLaMA: 开放且高效的基础语言模型

  本节正在大力开发中。

import \{Screenshot\} from 'components/screenshot'
import \{ Callout, FileTree \} from 'nextra-theme-docs'
import LLAMA1 from '../../img/llama-1.png'

## 有什么新鲜事？

这篇论文介绍了一组基础语言模型，参数范围从70亿到650亿。

这些模型在可公开获取的数据集上进行了数万亿次训练。

[(Hoffman et al. 2022)](https://arxiv.org/abs/2203.15556) 的工作表明，在更小的计算预算下，对更多数据进行训练的较小模型可以实现比其较大的模型更好的性能。论文建议用 200B token训练 10B 的模型。然而，LLaMA 论文发现，即使在 1T token之后，7B 模型的性能也会继续提高。

这项工作专注于通过更多的token训练模型（LLaMA），使其在不同的推理预算下实现最佳性能。

## 能力与关键结果

总的来说，尽管 LLaMA-13B 模型比 GPT-3（175B）小10倍，但在许多基准测试上的表现仍优于 GPT-3，并且可以在单个GPU上运行。LLaMA 65B 与 Chinchilla-70B 和 PaLM-540B 等模型都具有竞争力。

*Paper:* [LLaMA: 开放且高效的基础语言模型](https://arxiv.org/abs/2302.13971)

*Code:* https://github.com/facebookresearch/llama

## 引用

- [Koala: A Dialogue Model for Academic Research](https://bair.berkeley.edu/blog/2023/04/03/koala/) (April 2023)
- [Baize: An Open-Source Chat Model with Parameter-Efficient Tuning on Self-Chat Data](https://arxiv.org/abs/2304.01196) (April 2023)
- [Vicuna: An Open-Source Chatbot Impressing GPT-4 with 90%* ChatGPT Quality](https://vicuna.lmsys.org/) (March 2023)
- [LLaMA-Adapter: Efficient Fine-tuning of Language Models with Zero-init Attention](https://arxiv.org/abs/2303.16199) (March 2023)
- [GPT4All](https://github.com/nomic-ai/gpt4all) (March 2023)
- [ChatDoctor: A Medical Chat Model Fine-tuned on LLaMA Model using Medical Domain Knowledge](https://arxiv.org/abs/2303.14070) (March 2023)
- [Stanford Alpaca](https://github.com/tatsu-lab/stanford_alpaca) (March 2023)
