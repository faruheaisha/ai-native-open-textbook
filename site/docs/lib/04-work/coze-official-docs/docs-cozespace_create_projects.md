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
sourceRel: "docs/cozespace_create_projects.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozespace_create_projects.md"
sourceSha256: "6da1cffa2bdcce66999ddc36347a6b7bda948e24d38822b02ed326d5e1fbebc4"
pageSha256: "6da1cffa2bdcce66999ddc36347a6b7bda948e24d38822b02ed326d5e1fbebc4"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

在扣子里，你可以通过两种方式与 Agent 对话：

* 直接与 Agent 对话
* 创建项目，在项目中与 Agent 对话

如果你只是想完成一个独立的小任务，可以打开一个 Agent，直接对话。比如写一段内容、总结一份材料、做一个 PPT，这类任务通常不需要依赖项目上下文。

当一个任务需要持续推进、依赖相同的文件和素材、产生多个结果，或需要多个 Agent 和成员一起参与时，你可以创建项目。项目是扣子中围绕特定话题、目标或任务创建的协作场景。它可以把同一件事相关的对话、文件、成员、Agent 和产出放在一起，让你围绕同一个目标持续推进。

## 项目能做什么 \{#4966431d\}

相比和 Agent 持续对话，项目更适合承载**特定主题**或**持续推进**的工作，例如产品方案讨论、内容创作、研发任务拆解、资料整理等。项目会保留独立的讨论记录和上下文，方便后续继续跟进。

项目的作用，是帮你管理一个复杂、持续的任务。主要体现在如下方面：

* **共享项目上下文**
* **使用本地工作目录**
* **多人、多 Agent 分工协作**
* **通过子对话拆分不同任务**

### 共享项目上下文 \{#hbIg1Dxio\}

项目中的不同子对话会共享同一个项目上下文，包括上传的文件、生成的产出、Agent 记忆文件和项目简报（agents.md）等。

例如，你在项目里上传了一份活动方案、品牌资料和预算表。新建一个子对话来写宣传文案时，Agent 可以直接基于这些项目资料继续工作，不需要你重新上传文件，也不需要把活动背景再讲一遍。

项目下的子对话会使用同一个项目工作目录。这个目录里的文件，对项目里的 Agent 都可见。

同时，还可以通过项目简报沉淀更稳定的项目信息。项目简报通常包含项目目标、协作规则、角色分工、关键决策、当前状态、重要约束和待确认问题。它可以帮助项目内的成员和 Agent 更快理解项目背景，并在后续协作中保持一致。

项目简报可以通过以下方式创建与更新：

* 项目内的 Agent 会根据项目推进情况，自动触发项目简报更新，并由项目管理员确认。
* 项目成员也可以直接 @Agent，让 Agent 基于当前上下文创建或更新项目简报，并由项目管理员确认。

需要注意的是，不同子对话之间不会自动共享对话内容。如果某个子对话中的讨论结论需要在另一个子对话中继续使用，可以将相关内容整理到工作目录的文件中，或在对应子对话中手动说明。 

### 使用本地工作目录 \{#hxOzDpqpL\}

扣子项目默认使用云盘文件夹作为工作目录，用来存放项目中的资料、文件和生成产物。现在，在桌面端创建项目时也支持选择你电脑上的本地目录作为工作目录。选择本地目录后，项目里的 Agent 可以围绕这个目录读取、分析、编辑文件，并将生成结果保存到这个目录中，无需先把文件上传到云端。

例如运营人员在电脑上保存了一些运营数据，比如用户分层、活动转化、渠道投放、订单明细等。你可以在创建项目时选择这些数据所在的本地目录作为工作目录，让 Agent 基于本地工作目录分析数据，并基于分析结果生成运营活动方案。

更多信息，请参考本地工作目录。

### 多人、多 Agent 分工协作 \{#hiw3yGHYT\}

当项目变复杂时，通常不是一个人或一个 Agent 完成所有事。这时，可以邀请人类成员和多个 Agent 一起参与。

成员可以补充信息、确认需求和检查结果，不同 Agent 可以分头处理不同任务，例如资料整理、内容生成、代码开发、审核发布等，一起推进复杂任务。

例如，一个成员负责确认需求，一个 Agent 负责整理资料，另一个 Agent 负责生成方案。不同对象在同一个项目中分工推进，协作过程会更清楚。

更多信息，请参考项目与协作。

### 通过子对话拆分不同任务 \{#hItnFRCfq\}

一个项目里可以有多个子对话。建议为每个相对独立的任务或结果创建一个子对话，让每个子对话只围绕一件事推进。这样可以避免所有信息堆在一条长对话里，也方便单独保留讨论记录、进度与结果。

例如，在一个新品发布项目中，你可以按照用户调研、发布文案、发布会 PPT、发布前检查任务创建不同子对话。每个子对话可以添加对应的负责人和 Agent，专注处理一类任务。同时，所有子对话都基于同一个工作目录中的资料和产出协同推进。

## 创建项目 \{#d6a03e50\}

:::tip 说明
在团队版和企业版中，企业超级管理员可以通过**功能访问控制**和**空间资源可见性**，控制成员可见的功能入口和空间资源范围。如果你未看到预期的功能和资源，请联系企业超级管理员确认。更多信息，请参考功能访问控制和空间资源访问控制。
:::

::::tabs
@tab 网页端、桌面端
1. 在[扣子](https://www.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)的项目区域，单击加号（+）。
2. 填写项目名称，设置工作目录，单击**创建 Agent**。
   你可以选择已有的云盘文件夹，也可以新建一个。如果不手动选择，系统会自动生成一个工作目录。
   ![Image=314x190](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/071b28d37df14632b67b51c2e598974b~tplv-goo7wpa0wc-topic.webp)
3. 选择你想对话的 Agent。
   ![Image=316x190](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/5dedb6a5bede4495b622f41f988d2e03~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
1. 打开扣子 App。
2. 在首页右上角单击加号（+）。
3. 选择**新建项目**。
4. 填写项目名称，设置工作目录，单击**完成**。
   你可以选择已有的云盘文件夹，也可以新建一个。如果不手动选择，系统会自动生成一个工作目录。
5. 选择你想对话的 Agent。
::::

## 创建子对话 \{#hz9xZbxfi\}

::::tabs
@tab 桌面端、网页端
在**项目**区域中，找到目标项目，单击 **➕**，输入子对话要处理的任务，并选择要使用的 Agent，即可创建一个子对话。

![Image=544x218](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/4ec312244e444fb2b6737b9a8268dec2~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
1. 在扣子 App 中，打开一个项目。
2. 在项目右上角，单击...，然后单击**新建对话**。
3. 在新对话中，输入子对话要处理的任务，并选择要使用的 Agent。
::::

## 修改项目设置 \{#9e3dd9c0\}

创建项目后，你可以随时修改项目名称、置顶状态等设置。修改方式如下：

::::tabs
@tab 网页端、桌面端
* **修改项目名称**：在项目列表中，将鼠标悬浮在目标项目上，单击 ··· > **项目管理**，填写新的名称即可。
   ![Image=241x140](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/774b86fe187d407bb8d8158f83274e21~tplv-goo7wpa0wc-topic.webp)
* **置顶项目**：在项目列表中，将鼠标悬浮在目标项目上，单击**置顶**图标。置顶后，此项目将常驻消息列表最上方。
   ![Image=172x203](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/314c2c0030be46458879376951140957~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
1. 在对话列表中，长按指定项目。
2. 修改项目设置：
   * **修改项目名称**：单击**重命名**，并填写新的名称即可。
   * **置顶项目**：单击**置顶**。置顶后，此项目将常驻消息列表最上方。
      ![Image=151x289](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/2ec24da91dc94070a60315e7d2ae7dfc~tplv-goo7wpa0wc-topic.webp)
::::

## 搜索项目 \{#hX67FMWbe\}

::::tabs
@tab 桌面端、网页端
在扣子导航栏的顶部，单击**搜索**，可以搜索所有项目或子对话。

![Image=311x194](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/8c622776f0e64698849a1846544125d0~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
在扣子 App 首页的顶部，单击**搜索**，可以搜索所有项目或子对话。
::::

## 删除项目 \{#c1365f5a\}

删除操作适用于不再需要继续保留的项目。例如，项目已经完成、创建了重复项目，或项目中的内容不再需要后续查看时，可以删除项目，保持项目列表清晰。

:::notice 注意
* 仅项目创建者可删除项目。
* 删除项目会永久删除项目内的所有对话和文件，同时项目成员和 Agent 也会从项目中移除。删除后不可找回，请谨慎操作。
:::

::::tabs
@tab 网页端、桌面端
1. 在项目列表中，将鼠标悬浮在目标项目上，单击 ··· > **项目管理**
   ![Image=241x140](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/774b86fe187d407bb8d8158f83274e21~tplv-goo7wpa0wc-topic.webp)
2. 在项目管理页面，单击**删除**

@tab 移动端
1. 在对话列表中，长按指定项目。
2. 单击**删除项目**。
::::
