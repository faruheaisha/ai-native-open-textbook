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
sourceRel: "docs/cloud_drive_agent_local_sync.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cloud_drive_agent_local_sync.md"
sourceSha256: "51697fbe49bdac4ef6b555531e4dc58a09df9e6bedc650ba8cc0ff353fc26900"
pageSha256: "51697fbe49bdac4ef6b555531e4dc58a09df9e6bedc650ba8cc0ff353fc26900"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

云盘是扣子提供的统一文件空间。

简单来说，你可以用云盘完成这些事：

* **像网盘一样管理文件**：上传、整理、预览、下载和保存素材等文件。
* **作为 Agent 工作目录**：把资料、数据和产物放在同一个文件夹里，Agent 可以直接读取、处理，以及保存产物。
* **多个 Agent 共用文件**：不同 Agent 可以复用同一个工作目录。
* **同步到本地继续编辑**：开启本地同步，把云盘文件同步到电脑。本地软件改完后，云盘会自动更新。

本文通过两个常见场景，帮你理解云盘怎么用更顺手。

## 场景一：多个 Agent 共用一个工作目录，完成活动策划和复盘 \{#hvut2qx8S\}

如果你需要同时使用多个 Agent 处理同一批资料，最省事的方式，是让它们共用同一个工作目录。

这种场景适合多人、多阶段、多 Agent 协作的任务，例如：

* 运营活动策划与复盘
* 内容选题、发布、数据回收与总结
* 用户调研、访谈整理与洞察报告
* 项目资料沉淀、执行跟进与阶段总结

**核心思路**：把资料、过程产物和结果文件放在一个工作目录里，让不同 Agent 基于同一批文件工作。

例如你正在做一次季度运营活动，需要先策划、再执行、最后复盘。这个过程中，你可能会用到两个 Agent：

* **运营助手**：整理活动资料，生成活动方案、执行清单和宣传文案。
* **复盘助手**：读取活动数据和运营文档，生成复盘报告。

这两个 Agent 都需要访问同一批文件。你可以在云盘里创建一个统一的工作目录，让它们都围绕这个目录工作。

1. 在[云盘](https://www.coze.cn/cloud-drive/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)中新建**运营工作台**文件夹。
   为了后续查找方便，可以按文件用途创建子文件夹。
   ::::cols
   @col 50
   ```Plain Text
   运营工作台
   ├── 运营资料
   ├── 运营数据
   └── 运营复盘
   ```
   
   @col 50
   ![Image=1280x695](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/363544f8ad0d4df58fa014b8a7e0152f~tplv-goo7wpa0wc-topic.webp)
   ::::
2. 分别创建**运营助手**和**复盘助手** Agent，并把它们的**工作目录**都设置为 **运营工作台**。
   这样设置后：
   * **运营助手 Agent** 生成的活动方案，会保存到**运营工作台**中。
   * **复盘助手 Agent** 可以直接读取这些方案，不需要你重新上传。
   * 后续补充的数据文件，也能被两个 Agent 继续使用。
   ::::cols
   @col 50
   **运营助手**
   
   ![Image=232x376](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/2a532b6ea70b4126bf29fc74895ca1d1~tplv-goo7wpa0wc-topic.webp)
   
   @col 50
   **复盘助手**
   
   ![Image=247x380](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/c91fb79a64f943ada6f5c73b2863dc6a~tplv-goo7wpa0wc-topic.webp)
   ::::
3. 上传基础资料。
   活动开始前，先把产品介绍、历史活动方案和本次活动目标上传到 `运营资料` 文件夹。
   ```Plain Text
   运营工作台
   ├── 运营资料
   │   ├── 产品介绍.md
   │   ├── 历史活动方案.md
   │   └── 活动目标.md
   ├── 运营数据
   └── 运营复盘
   ```
4. 让**运营助手 Agent** 生成活动资料。
   你可以对**运营助手 Agent** 这样说：
   ::::cols
   @col 50
   ```Plain Text
   请基于工作目录中的产品介绍、历史活动方案和活动目标，生成 2026-Q1 活动方案、活动执行清单和活动宣传文案，存放到运营工作台/运营资料文件夹下。
   ```
   
   @col 50
   ![Image=1344x622](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/2b7ea1ce8fb140448eabb6d2acae2602~tplv-goo7wpa0wc-topic.webp)
   ::::
5. 补充结果数据。
   活动结束后，再把活动数据、投放记录和用户反馈上传到**运营数据**文件夹。
   ::::cols
   @col 50
   ```Plain Text
   运营工作台
   ├── 运营资料
   │   ├── 产品介绍.md
   │   ├── 历史活动方案.md
   │   ├── 活动目标.md
   │   ├── 2026-Q1活动方案.md
   │   ├── 2026-Q1活动执行清单.md
   │   └── 2026-Q1活动宣传文案.md
   ├── 运营数据
   │   ├── 活动数据.xlsx
   │   ├── 投放记录.xlsx
   │   └── 用户反馈汇总.md
   └── 运营复盘
   ```
   
   @col 50
   
   ::::
6. 让**复盘助手 Agent** 生成复盘报告。
   你可以对**复盘助手 Agent** 这样说：
   ::::cols
   @col 50
   ```Plain Text
   请基于工作目录中的 2026-Q1 活动方案、活动执行清单、活动宣传文案、活动数据、投放记录和用户反馈，生成一份季度运营复盘报告，存储到运营工作台/运营复盘文件夹下。
   报告需要包含：活动目标回顾、活动效果总结、核心数据摘要、主要问题、原因分析和下季度行动建议。
   ```
   
   @col 50
   ![Image=1224x479](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/f2c2d0d7e3c9487fa5d4be9f1f5a593d~tplv-goo7wpa0wc-topic.webp)
   ::::
   **运营助手 Agent 和复盘助手 Agent** 使用的是同一个工作目录，所以**复盘助手 Agent** 可以直接读取前面生成的方案、清单、文案，以及后续上传的数据文件。   

## 场景二：本地与云端协同处理文件 \{#hNFTopo47\}

如果一个文件既需要让 Agent 读取和生成，又需要你用本地软件继续编辑，建议开启扣子桌面端的本地同步。

这种方式适合“先让 AI 生成初稿，你再修改定稿”的文件任务，例如：

* 客户提案 PPT
* 项目方案和报价表
* 课程资料和讲义
* 简历、作品集、申请材料

**核心思路**：Agent 负责整理资料和生成初稿，你负责判断、修改和定稿；本地保存后，文件会自动同步回云盘，Agent 也能基于最新版继续检查和优化。

例如你正在准备一份客户提案，需要处理客户访谈纪要、竞品截图、历史方案、预算表和最终 PPT。你可以先让 Agent 基于云盘资料生成提案初稿，再用本地 Word、Excel、PPT 继续调整内容、排版和数据。

如果不开启本地同步，你可能需要反复经历“下载文件 → 本地修改 → 重新上传”。开启后，你可以直接在电脑本地编辑云盘文件，保存后内容会自动同步回云盘。

1. 创建**提案专属 Agent**。
   创建后，系统会自动生成它的工作目录（**提案助手）**。你上传到这里的资料，Agent 可以读取；Agent 生成的文件，也会保存到这里。
   ![Image=162x257](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/556f9a46f49942228ea6bf13d5c1202b~tplv-goo7wpa0wc-topic.webp)
2. 上传客户提案资料。
   在**提案助手**文件夹下创建**客户A提案**文件夹，再把已有资料上传进去。
   ::::cols
   @col 50
   ```Plain Text
   提案助手
   └── 客户A提案
       ├── 客户访谈纪要.md
       ├── 竞品截图
       ├── 历史方案.pdf
       └── 预算表.xlsx
   ```
   
   @col 50
   ![Image=1280x310](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/23ff122a990e490585dfabd359ea3801~tplv-goo7wpa0wc-topic.webp)
   ::::
3. 让 Agent 生成初稿。
   你可以对**提案专属 Agent** 这样说：
   ```Plain Text
   请基于客户A提案工作目录中的资料，生成一份客户提案 PPT 初稿。
   重点包括：客户诉求、推荐方案、预算说明和下一步跟进建议。
   ```
4. 开启本地同步。
   在桌面端开启本地同步，并选择同步**客户A提案**文件夹。
   同步完成后，你可以在本地 `~/Coze/Drive` 目录中看到这个文件夹。
   ::::cols
   @col 50
   ![Image=412x245](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/d56f8f3c01ed4c75821a0b36f4d209c5~tplv-goo7wpa0wc-topic.webp)
   
   @col 50
   ![Image=910x310](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/597f6f9dc1a8471abbd7e7e7615fce5a~tplv-goo7wpa0wc-topic.webp)
   ::::
5. 用本地软件继续处理文件。
   * 用 Excel 打开预算表.xlsx，补充报价明细、折扣信息和备注。
   * 用 PowerPoint 打开提案 PPT，调整排版、图片、动画和讲述顺序。
   * 用 Word 或文档软件修改方案说明、合同草稿。
      保存后，文件会自动同步回云盘。
6. 让 Agent 基于最新文件继续处理。
   你可以对**提案专属 Agent** 这样说：
   ```Plain Text
   请基于客户A提案工作目录中的最新版 PPT 和预算表，检查内容是否完整。
   ```
   因为本地修改后的文件已经同步回云盘，所以 Agent 可以直接读取最新版本，你不需要手动重新上传。
