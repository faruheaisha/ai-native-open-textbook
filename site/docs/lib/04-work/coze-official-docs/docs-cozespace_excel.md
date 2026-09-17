---
title: "扣子 Coze 官方文档"
sourceId: "04-work/coze-official-docs"
sourceTitle: "扣子 Coze 官方文档"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: ""
entryUrl: null
sourceRel: "docs/cozespace_excel.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozespace_excel.md"
sourceSha256: "0ed7f580fc29f0ad1d11bb24fd5778659ef0beaa0ccab6dc5562ce7fe9b33ff9"
pageSha256: "0ed7f580fc29f0ad1d11bb24fd5778659ef0beaa0ccab6dc5562ce7fe9b33ff9"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

扣子 Excel 处理功能是基于 AI 的 Excel 表格自动化处理技能“**Excel**”，提供一站式 Excel 表格解决方案，包括信息收集、数据分析、格式整理及 Excel 模板生成等能力，帮助用户节省格式调整、公式编写等时间，提升数据处理效率，适用于日常数据统计、报表制作、数据分析等场景。
## 功能特点 \{#6b0fd0a7\}
扣子的 Excel 处理功能整合了信息收集、数据分析、格式整理及 Excel 模板生成等核心能力，能够精准匹配用户在不同场景下的 Excel 处理需求。

* **信息收集**：能够精准筛选目标数据，智能提取关键信息，高效整合多源表格，并自动完成数据清洗（如去重、格式统一等），全方位助力用户高效收集信息。
* **数据分析**：具备生成多种可视化图表的能力，可辅助用户撰写分析报告。此外，支持专业领域的数据分析工作，例如产品运营领域的评论分析、舆情分析；学术研究领域的文本分析、机器学习建模分析；金融财务领域的财务模型构建等，满足不同用户的多样化需求。
* **格式整理**：支持文件格式转换、表格结构调整与合并，以及数据的批量生成与提取，帮助用户高效完成 Excel 的基础操作和数据处理工作，提升工作效率。
* **生成 Excel 模板**：支持定制生成具有特定格式和功能的表格，还可创建简单的 Excel 应用模板，以满足用户在不同业务场景下的个性化需求。

:::tip 说明
仅扣子 Agent 内置 **Excel** 技能，本地 Agent 等其他类型的 Agent，可前往[技能商店](https://www.coze.cn/skills?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)或虾评社区查找合适的 **Excel** 技能。
:::
##  体验效果 \{#e2d376b1\}

::::cols
@col 50
[依据实验数据绘图写报告](https://www.coze.cn/s/PnzIdlPiz-Q/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)
![Image=959x571](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/a362c95735fa4714be89a1f810b82717~tplv-goo7wpa0wc-image.image)

@col 50
 [电商销售分析 Excel 模板制作](https://www.coze.cn/s/NalxKrHAR7w/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)
![Image=277x380](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/0d33fb398d65483092b9045ced48d071~tplv-goo7wpa0wc-image.image)

::::

## 使用方式 \{#0231f6bf\}
### 处理 Excel \{#8850453e\}
扣子的 Excel Agent 像一位经验丰富的数据分析助手，能够智能解析用户指令。无论是几十行的简单表格还是上千条数据的复杂报表，Excel Agent 都能自动化完成数据筛选、计算、图表生成等复杂操作，无需手动编写公式或函数，显著提升数据处理效率。
使用方式如下：

1. 在[扣子](https://www.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)主对话页面，通过对话框输入斜杠（/），在技能页签选择**Excel**，输入任务提示词，然后敲击回车键发送你的指令。
2. 在提示词输入框中，描述你的需求，然后单击**运行**图标。
   清晰的需求描述可帮助 AI Agent 准确理解任务，应包括任务的关键要求（处理内容、输出形式等）。

::::cols
@col 50
   ![Image=1630x1414](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/22a062cd2f984e1889565951aed8b94b~tplv-goo7wpa0wc-image.image)

@col 50
![Image=393x338](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/88318d1cca484bacb031eaed3a06244f~tplv-goo7wpa0wc-image.image)

::::

3. 扣子 AI Agent 自动处理需求。
   扣子 AI Agent 接收到任务后，会先智能思考并拆解任务需求，明确核心要素与场景要求，然后开始执行相应的操作。它会读取你的 Excel 表格，按照你的要求进行数据筛选、生成分析图表等操作。
   ![Image=443x482](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/2854c434ebb14b478588af4feb48b894~tplv-goo7wpa0wc-image.image)
4. 预览与下载结果。
   处理完成后，扣子会生成预览界面，你可以直接查看生成结果。如果满意，可下载到本地；如果不满意，可重新输入任务提示词，再次生成结果。
   ![Image=1923x564](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/1b8671d808ec43aba7951f12e9fd21f6~tplv-goo7wpa0wc-image.image)

### 生成 Excel 模板 \{#08307e42\}
扣子的 Excel Agent 能够根据自然语言描述，快速生成符合特定场景的 Excel 模板。支持自定义列名、数据格式、公式规则及样式设计，覆盖高频办公场景，大大减少模板制作时间成本。
使用方式如下：

1. 在[扣子](https://www.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)主对话页面，通过对话框输入@，在技能页签选择 **Excel**，上传 Excel 表格。
   如果有参考样式，可直接上传作为 Excel Agent 生成模板的依据。如果没有，可直接输入提示词。
2. 在提示词输入框中，清晰描述你的需求，然后单击**运行**图标。
   你可以输入整体要求描述，让 Excel Agent 自主分析并完成任务。如果对列名、列格式、数据类型、公式设置等有具体要求，则需清晰地描述具体的要求，以便 Excel Agent 能够精准执行你的指令。
   ![Image=988x188](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/57eacaeda0314bcdb3ef394387b29457~tplv-goo7wpa0wc-image.image)
3. 扣子 AI Agent 自动处理需求。
   扣子 AI Agent 接收到任务后，会先智能思考并拆解任务需求，明确核心要素与场景要求，然后开始执行相应的操作。
   ![Image=425x558](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/53c05fbda26c4db09ede4366216f5412~tplv-goo7wpa0wc-image.image)
4. 预览与下载结果。
   处理完成后，扣子会生成预览界面，你可以直接查看生成的结果。如果满意，可下载到本地；如果不满意，可重新输入任务提示词，再次生成结果。
   ![Image=709x384](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/3b129afbd45043bdbd8bcc4b1885da5c~tplv-goo7wpa0wc-image.image)
