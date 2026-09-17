---
title: "はじめに"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/introduction.jp.mdx"
sourceRel: "pages/introduction.jp.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/introduction.jp.mdx"
sourceSha256: "44863ca8700ba6a07e70e6980e795befc70a65ff0a5b85e0a66309999638e3c4"
pageSha256: "44863ca8700ba6a07e70e6980e795befc70a65ff0a5b85e0a66309999638e3c4"
contentMode: "local-full"
zh: ""
---

# はじめに

import ContentFileNames from 'components/ContentFileNames'

プロンプトエンジニアリングは、言語モデル（LM）を効率的に使用するためのプロンプトの開発と最適化のための比較的新しい学問分野です。プロンプトエンジニアリングのスキルは、大規模な言語モデル（LLM）の能力と限界をより良く理解するのに役立ちます。研究者は、プロンプトエンジニアリングを使用して、質問応答や算術推論などの一般的で複雑なタスクの幅広い範囲でLLMの能力を向上させます。開発者は、プロンプトエンジニアリングを使用して、LLMやその他のツールとインターフェースする堅牢で効果的なプロンプティング技術を設計します。

このガイドでは、プロンプトの基本をカバーし、大規模な言語モデル（LLM）とやり取りして指示する方法の概要を提供します。

すべての例は、OpenAIのプレイグラウンドを使用した `text-davinci-003` でテストされています。デフォルトの設定、すなわち `temperature = 0.7` および `top-p = 1` を使用しています。
