---
title: "方向性刺激プロンプティング"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/techniques/dsp.jp.mdx"
sourceRel: "pages/techniques/dsp.jp.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/techniques/dsp.jp.mdx"
sourceSha256: "f55c5bdb878755d42d6c1a062b60627c51d3734f87eb35dfc3da2fcab0204448"
pageSha256: "f55c5bdb878755d42d6c1a062b60627c51d3734f87eb35dfc3da2fcab0204448"
contentMode: "local-full"
zh: ""
---

# 方向性刺激プロンプティング

import \{ Callout, FileTree \} from 'nextra-theme-docs'
import \{Screenshot\} from 'components/screenshot'
import DSP from '../../img/dsp.jpeg'

[Li et al.、(2023)](https://arxiv.org/abs/2302.11520)は、望ましい要約を生成するためにLLMをより適切に誘導するための新しいプロンプティング技術を提案しています。

調整可能なポリシーLMは、刺激/ヒントを生成するためにトレーニングされます。RLの使用がLLMの最適化により多く見られるようになっています。

以下の図は、方向性刺激プロンプティング（Directional Stimulus Prompting）が標準的なプロンプティングと比較した場合の様子を示しています。ポリシーLMは小さく、ブラックボックスの凍結LLMを誘導するヒントを生成するために最適化されます。

Image Source: [Li et al., (2023)](https://arxiv.org/abs/2302.11520)

具体的な例は近日中に公開します！
