---
title: "リスクと誤用"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/risks.jp.mdx"
sourceRel: "pages/risks.jp.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/risks.jp.mdx"
sourceSha256: "f9eb09f88373621991d8b97ef25b00579c190b3bc27f83d9787be06c6bf51336"
pageSha256: "f9eb09f88373621991d8b97ef25b00579c190b3bc27f83d9787be06c6bf51336"
contentMode: "local-full"
zh: ""
---

# リスクと誤用

import \{ Callout \} from 'nextra-theme-docs'
import ContentFileNames from 'components/ContentFileNames'

私たちは、few-shot学習やchain-of-thoughtプロンプトのようなテクニックを使って、うまく作られたプロンプトがさまざまなタスクでいかに効果的であるかをすでに見てきました。LLMの上に実世界のアプリケーションを構築することを考えると、言語モデルの誤用、リスク、安全対策について考えることが非常に重要になります。

このセクションでは、プロンプトインジェクションのような手法によるLLMのリスクと誤用に焦点を当てます。また、有害な行動と、効果的なプロンプト技術によってそれを軽減する方法についても言及します。その他、一般化可能性、キャリブレーション、バイアス、社会的バイアス、事実性など、興味のあるトピックをいくつか挙げていきます。
