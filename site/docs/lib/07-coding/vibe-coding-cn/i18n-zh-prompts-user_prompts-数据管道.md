---
title: "数据管道"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/prompts/user_prompts/数据管道.md"
sourceRel: "i18n/zh/prompts/user_prompts/数据管道.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/prompts/user_prompts/数据管道.md"
sourceSha256: "423f37764564232809bb54a851a5538817b57c2eca3e1aff914df43750e948c0"
pageSha256: "423f37764564232809bb54a851a5538817b57c2eca3e1aff914df43750e948c0"
contentMode: "local-full"
zh: ""
---

# 数据管道

你的任务是将用户输入的任何内容、请求、指令或目标，转换为一段“工程化代码注释风格的数据处理管道流程”。

输出要求如下：
1. 输出必须为多行、箭头式（->）的工程化流水线描述，类似代码注释
2. 每个步骤需使用自然语言精准描述
3. 自动从输入中抽取关键信息（任务目标或对象），放入 UserInput(...)
4. 若用户输入缺少细节，你需自动补全精准描述
5. 输出必须保持以下完全抽象的结构示例：

UserInput(用户输入内容)
  -> 占位符1
  -> 占位符2
  -> 占位符3
  -> 占位符4
  -> 占位符5
  -> 占位符6
  -> 占位符7
  -> 占位符8
  -> 占位符9

6. 最终输出只需上述数据管道

请将用户输入内容转换成以上格式

你需要处理的是：
