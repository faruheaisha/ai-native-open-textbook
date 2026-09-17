---
title: "Zero-Shotプロンプティング"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/techniques/zeroshot.jp.mdx"
sourceRel: "pages/techniques/zeroshot.jp.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/techniques/zeroshot.jp.mdx"
sourceSha256: "afc5c656f347305c48f88608e233f507101a339aef9f1b4fef1b6d06d1fce6a8"
pageSha256: "afc5c656f347305c48f88608e233f507101a339aef9f1b4fef1b6d06d1fce6a8"
contentMode: "local-full"
zh: ""
---

# Zero-Shotプロンプティング
大量のデータでトレーニングされ、指示に従うように調整されたLLMは、ゼロショットでタスクを実行することができます。前のセクションでいくつかのゼロショットの例を試しました。以下は、使用した例の1つです。

*プロンプト：*
```
テキストを中立、否定的、または肯定的に分類してください。

テキスト: 休暇はまずまずでした。
所感:
```

*出力：*
```
中立
```

上記のプロンプトでは、モデルに任意の例を提供していないことに注意してください。これがゼロショットの機能です。

指示のチューニングは、ゼロショット学習の改善を示しています[Wei et al. (2022)](https://arxiv.org/pdf/2109.01652.pdf)。指示の説明に従って説明されたデータセットでモデルを微調整することが、指示のチューニングの本質です。さらに、[RLHF](https://arxiv.org/abs/1706.03741)（人間のフィードバックからの強化学習）が指示のチューニングの拡大に採用されており、モデルが人間の好みにより適合するように調整されています。この最近の開発により、ChatGPTのようなモデルが強化されています。これらのアプローチと方法については、次のセクションで説明します。

ゼロショットが機能しない場合は、プロンプトにデモンストレーションや例を提供することをお勧めし、フューショットプロンプティングに移行します。次のセクションでは、フューショットプロンプティングをデモンストレーションします。
