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
sourceRel: "docs/cozespace_coze_agent.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozespace_coze_agent.md"
sourceSha256: "bf629bda2a8520e47b5355e7597d7036059bada65d4db98d3dccdc5ae11c787a"
pageSha256: "bf629bda2a8520e47b5355e7597d7036059bada65d4db98d3dccdc5ae11c787a"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

打开扣子后，你会拥有一个默认的扣子 Agent。日常任务可以直接交给它处理，比如写文案、分析数据、整理资料、制作 PPT 等。

如果你希望不同类型的任务由不同 Agent 分开处理，或者希望某个 Agent 长期专注在一个专业领域，可以新建 Agent。你可以通过两种方式创建：

* **一键创建行业 Agent**：选择一个预设模板，快速创建对应领域的行业 Agent。
* **定义你的专属 Agent**：自定义 Agent 人设，按需添加插件、技能。

:::tip 说明
在团队版和企业版中，企业超级管理员可以通过**功能访问控制**和**空间资源可见性**，控制成员可见的功能入口和空间资源范围。如果你未看到预期的功能和资源，请联系企业超级管理员确认。更多信息，请参考功能访问控制和空间资源访问控制。
:::

## 一键创建行业 Agent \{#c9b7b9fd\}

行业 Agent 面向自媒体、金融、法务、科研等常见专业场景。模板中已预设对应场景常用的能力和配置，支持一键创建。

### 为什么要创建行业 Agent？ \{#hClQMR7ue\}

当任务有明确行业背景时，行业 Agent 比通用 Agent 更适合。它已经配置了对应场景常用的能力和处理方式，创建后可以直接用于专业任务。

行业 Agent 具备如下优势：

* **一键创建**：选择模板后即可一键创建，不需要从零配置。
* **内置能力**：已预设该行业常用的技能和处理方式。
* **上手更快**：适合直接处理常见专业任务，减少前期说明。

### 有哪些行业 Agent？ \{#hTvGvb6j0\}

目前，扣子提供了如下行业 Agent 模板：

| **行业 Agent**  | **适合处理的任务**  |
| --- | --- |
| 自媒体运营达人  | 适合处理选题、文案、账号诊断、内容复盘等自媒体运营任务。  |
| 调研分析师  | 适合处理竞品分析、用户研究、数据整理和商业分析报告。  |
| 投资顾问  | 适合处理股票分析、ETF 筛选、板块观察和收益测算等投资研究任务。  |
| 科研助理  | 适合处理论文检索、文献梳理、研究动态跟踪和引用关系分析。  |
| 金牌法务  | 适合处理合同审查、法律文书起草、合规检查和类案检索。  |
| 视频导演  | 适合写脚本、排分镜，把创意变成视频。  |
| 编程专家  | 适合写代码、修问题，推动应用部署上线。  |

### 创建行业 Agent \{#695eea3d\}

你可以通过内置的行业模板，快速创建对应领域的扣子 Agent。

::::tabs
@tab 网页端、桌面端
1. 在[扣子](https://www.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)左侧的 Agent 区域中，单击➕ > **自定义 Agent**。
2. 在左侧导航栏中，选择职业模板。
3. 设置 Agent 信息，然后单击**立即创建**。
   * Agent 名称：建议带岗位前缀，方便后续识别。例如：运营-小红书助手、法务-合同审核员。
   * 描述：说明该 Agent 的用途。
   * 工作目录：选择云盘文件夹作为工作目录，你可以选择已有的云盘文件夹，也可以新建一个。如果不手动选择，系统会自动生成一个工作目录。更多信息，请参考[项目、 Agent 的工作目录](https://docs.coze.cn/cozespace_cloud_drive#hYzE7PMpQ)。

@tab 移动端
1. 在扣子 App 顶部，单击➕ > **自定义 Agent**。
2. 选择职业模板。
3. 设置 Agent 信息，然后单击**立即创建**。
   * Agent 名称：建议带岗位前缀，方便后续识别。例如：运营-小红书助手、法务-合同审核员。
   * 描述：说明该 Agent 的用途。
   * 工作目录：选择云盘文件夹作为工作目录，你可以选择已有的云盘文件夹，也可以新建一个。如果不手动选择，系统会自动生成一个工作目录。更多信息，请参考[项目、 Agent 的工作目录](https://docs.coze.cn/cozespace_cloud_drive#hYzE7PMpQ)。
::::

## 定义你的专属 Agent \{#hvsEg5XLn\}

如果行业模板不能满足你的需求，可以从空白创建一个专属 Agent。你可以自己设置名称、描述、工作目录，并按需添加技能、插件或 MCP。

### 什么时候创建专属 Agent \{#heR1DATkc\}

当你想自己定义 Agent 的用途、能力和工作方式时，可以创建专属 Agent。

以下场景适合创建专属 Agent：

* 现有行业模板不适合你的任务，比如记账、会议纪要、客户沟通、个人资料整理等。
* 你想给 Agent 添加指定能力，比如某个技能、插件或 MCP。
* 你希望某一类任务长期由同一个 Agent 处理，避免每次重新说明用途和要求。

### 基于云端 Agent 创建 \{#731b0574\}

::::tabs
@tab 网页端、桌面端
1. 在[扣子](https://www.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)左侧的 Agent 区域中，单击➕ > **自定义 Agent**。
2. 在左侧导航栏中，单击**直接创建**。
3. 设置 Agent 信息，然后单击**立即创建**。
   * Agent 名称：建议带岗位前缀，方便后续识别。例如：运营-小红书助手、法务-合同审核员。
   * 描述：说明该 Agent 的用途。
   * 工作目录：选择云盘文件夹作为工作目录，你可以选择已有的云盘文件夹，也可以新建一个。如果不手动选择，系统会自动生成一个工作目录。更多信息，请参考[项目、 Agent 的工作目录](https://docs.coze.cn/cozespace_cloud_drive#hYzE7PMpQ)。
   * 扩展能力：你可以按需添加技能、MCP 和插件，扩展 Agent 的能力。扣子提供了内置工具，你也可以自行开发扩展，并在后续使用过程中继续补充。

@tab 移动端
1. 在扣子 App 顶部，单击➕ > **自定义 Agent**。
2. 单击**直接创建**。
3. 设置 Agent 信息，然后单击**立即创建**。
   * Agent 名称：建议带岗位前缀，方便后续识别。例如：运营-小红书助手、法务-合同审核员。
   * 描述：说明该 Agent 的用途。
   * 工作目录：选择云盘文件夹作为工作目录，你可以选择已有的云盘文件夹，也可以新建一个。如果不手动选择，系统会自动生成一个工作目录。更多信息，请参考[项目、 Agent 的工作目录](https://docs.coze.cn/cozespace_cloud_drive#hYzE7PMpQ)。
   * 扩展能力：你可以按需添加技能、MCP 和插件，扩展 Agent 的能力。扣子提供了内置工具，你也可以自行开发扩展，并在后续使用过程中继续补充。
::::

## 常见问题 \{#85f14818\}

* 行业模板创建和自定义创建的扣子 Agent 有什么区别？
