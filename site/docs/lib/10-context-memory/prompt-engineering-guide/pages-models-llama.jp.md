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
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/models/llama.jp.mdx"
sourceRel: "pages/models/llama.jp.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/models/llama.jp.mdx"
sourceSha256: "964f1962e3bba0ddf6a64e15d95b1527d421a1aa4b799098510be3e7e51386a3"
pageSha256: "964f1962e3bba0ddf6a64e15d95b1527d421a1aa4b799098510be3e7e51386a3"
contentMode: "local-full"
zh: ""
---

# Prompt Engineering Guide

## LLaMA: オープンで効率的な基礎言語モデル

  このセクションは現在開発中です。

import \{Screenshot\} from 'components/screenshot'
import \{ Callout, FileTree \} from 'nextra-theme-docs'
import LLAMA1 from '../../img/llama-1.png'

## What's new?

本稿では、7Bから65Bパラメータの基礎言語モデルのコレクションを紹介します。

このモデルは、公開されているデータセットを用いて何兆ものトークンでトレーニングしました。

[(Hoffman et al. 2022)](https://arxiv.org/abs/2203.15556)は、計算予算があれば、より小さいモデルがより多くのデータで訓練された場合、より大きなモデルよりも優れたパフォーマンスを達成できる可能性が示されています。この研究では、10Bモデルを2000億トークンで訓練することを推奨しています。しかし、LLaMA論文では、7Bモデルのパフォーマンスが1兆トークンを超えても改善し続けることが示されています。

この研究では、より多くのトークンでトレーニングすることで、様々な推論予算で最高の性能を達成する言語モデル(LLaMa)をトレーニングすることに焦点を当てています。

## 性能と主な結果

全体として、LLaMA-13Bは10倍小さく、シングルGPUで動作可能でありながら、多くのベンチマークでGPT-3(175B)を上回りました。LLaMA 65BからChinchilla-70BやPaLM-540Bなどのモデルと競争力を持っています。

*Paper:* [LLaMA: Open and Efficient Foundation Language Models](https://arxiv.org/abs/2302.13971)

*Code:* https://github.com/facebookresearch/llama

## 参考文献

- [Koala: A Dialogue Model for Academic Research](https://bair.berkeley.edu/blog/2023/04/03/koala/) (April 2023)
- [Baize: An Open-Source Chat Model with Parameter-Efficient Tuning on Self-Chat Data](https://arxiv.org/abs/2304.01196) (April 2023)
- [Vicuna: An Open-Source Chatbot Impressing GPT-4 with 90%* ChatGPT Quality](https://vicuna.lmsys.org/) (March 2023)
- [LLaMA-Adapter: Efficient Fine-tuning of Language Models with Zero-init Attention](https://arxiv.org/abs/2303.16199) (March 2023)
- [GPT4All](https://github.com/nomic-ai/gpt4all) (March 2023)
- [ChatDoctor: A Medical Chat Model Fine-tuned on LLaMA Model using Medical Domain Knowledge](https://arxiv.org/abs/2303.14070) (March 2023)
- [Stanford Alpaca](https://github.com/tatsu-lab/stanford_alpaca) (March 2023)
