---
title: "データ生成"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/applications/generating.jp.mdx"
sourceRel: "pages/applications/generating.jp.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/applications/generating.jp.mdx"
sourceSha256: "4a8918313782d374a85c2edf7d969bcda427700e4ef51fc9cacc6fcad2f6cac3"
pageSha256: "4a8918313782d374a85c2edf7d969bcda427700e4ef51fc9cacc6fcad2f6cac3"
contentMode: "local-full"
zh: ""
---

# データ生成
LLMsは、一貫したテキストを生成する強力な機能を持っています。効果的なプロンプト戦略を使用することで、モデルをより良く、一貫性があり、より事実に基づいた回答を生成することができます。 LLMsは、あらゆる種類の実験や評価を実行するのに本当に役立つデータを生成するのに特に役立ちます。例えば、次のようにして、感情分析のための10の例を生成することができます。

*プロンプト:*
```
感情分析のための10の例を作成してください。例は、ポジティブまたはネガティブに分類されます。ネガティブな例2つとポジティブな例8つを生成してください。次のフォーマットを使用してください：
Q：<文>
A：<感情>
```

*出力:*
```
Q: 私は今、最高のニュースを聞きました！
A: ポジティブ

Q: 私たちは仕事で昇給したばかりです！
A: ポジティブ

Q: 私は今日成し遂げたことにとても誇りを感じています。
A: ポジティブ

Q: 私は今日一番の日を過ごしています！
A: ポジティブ

Q: 週末が本当に楽しみです。
A: ポジティブ

Q: 私は今、最高のプレゼントをもらいました！
A: ポジティブ

Q: 私は今とても幸せです。
A: ポジティブ

Q: 私は素晴らしい家族を持っていてとても幸せです。
A: ポジティブ

Q: 外の天気はとても暗いです。
A: ネガティブ

Q: 私はとても悪いニュースを聞きました。
A: ネガティブ
```

これは非常に有用です。実際、私たちは、ガイドの別のセクションで別のテストにこの例を使用しています。
