---
title: "アクティブプロンプト"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/techniques/activeprompt.jp.mdx"
sourceRel: "pages/techniques/activeprompt.jp.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/techniques/activeprompt.jp.mdx"
sourceSha256: "103697c52b8b2c835de4fb12dd5787ca7f3a1d8b877a9fd72583c24b41350c92"
pageSha256: "103697c52b8b2c835de4fb12dd5787ca7f3a1d8b877a9fd72583c24b41350c92"
contentMode: "local-full"
zh: ""
---

# アクティブプロンプト

import \{ Callout, FileTree \} from 'nextra-theme-docs'
import \{Screenshot\} from 'components/screenshot'
import ACTIVE from '../../img/active-prompt.png'

# Active-Prompt

Chain-of-thought (CoT)メソッドは、固定された人間による注釈付きの例のセットに依存しています。これには、例が異なるタスクに対して最も効果的なものでない可能性があるという問題があります。[Diaoら(2023)](https://arxiv.org/pdf/2302.12246.pdf)は、最近、異なるタスク固有の例のプロンプト(人間によるCoT推論で注釈付けされたもの)に適応するための新しいプロンプトアプローチであるActive-Promptを提案しました。

以下は、このアプローチの概要図です。最初のステップは、LLMに対してCoT例をいくつか含めて問い合わせます。一連のトレーニング質問に対して、*k*個の可能な回答が生成されます。*k*個の回答に基づいて不確実性メトリックが計算されます(不一致を使用)。最も不確実な質問が人間によって注釈付けされます。新しい注釈付きの例は、それぞれの質問の推論に使用されます。

Image Source: [Diao et al., (2023)](https://arxiv.org/pdf/2302.12246.pdf)
