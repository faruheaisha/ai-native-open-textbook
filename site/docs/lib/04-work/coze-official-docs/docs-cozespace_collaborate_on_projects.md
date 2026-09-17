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
sourceRel: "docs/cozespace_collaborate_on_projects.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozespace_collaborate_on_projects.md"
sourceSha256: "a92d0a43613b053a758d737ec74bca81898ba20d25b28d0f0392bb2be618700a"
pageSha256: "a92d0a43613b053a758d737ec74bca81898ba20d25b28d0f0392bb2be618700a"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

本文档介绍如何在项目中补充背景、@ 成员或 Agent 推进任务，并通过多 Agent 分工、成员与 Agent 接力等方式完成协作。

:::tip 说明
在团队版和企业版中，企业超级管理员可以通过**功能访问控制**和**空间资源可见性**，控制成员可见的功能入口和空间资源范围。如果你未看到预期的功能和资源，请联系企业超级管理员确认。更多信息，请参考功能访问控制和空间资源访问控制。
:::

## 如何协作 \{#083a7233\}

在项目中，成员可以围绕同一个目标持续沟通，并通过 @ 成员或 @Agent 的方式分配任务、补充信息和确认结果。人类成员可以参与讨论和判断方向，Agent 可以根据指令处理具体任务，例如整理资料、生成方案、编写代码或分析问题。

开始协作前，建议先了解以下几点：

* 项目中的消息、文件和 Agent 产物会保留在当前项目中，方便后续继续查看和跟进。
* @ 的范围仅包括当前项目中的成员和 Agent。你可以 @ 人类成员提醒对方查看或确认，也可以 @Agent 下达任务。
* 项目中的 Agent 可以结合项目上下文处理任务。多个 Agent 可以分工处理不同任务，也可以基于已有结果接力推进。
* 如果 Agent 在项目中执行后台任务，你可以在项目中查看任务进度和执行结果。

:::notice 注意
正式开始协作前，完成以下准备工作：

* **准备账号**：如果你需要邀请他人加入自己的项目，请确认账号已升级至个人高阶版及以上套餐。
* **准备积分**：在项目中 @Agent 处理任务时，消耗 Agent 创建者的积分。请确保积分余额充足，否则你的 Agent 可能无法正常响应。
* **准备项目**：创建项目，并将邀请人类成员和 Agent 加入项目。详细操作可参考邀请成员加入协作。
:::

### 补充项目背景 \{#8d753fe1\}

项目中的消息、文件和 Agent 产物会形成项目上下文，帮助成员和 Agent 了解当前任务。因此，在与其他成员、Agent 分工协作前，建议先在项目中补充必要的背景信息，让大家快速了解目标是什么、当前进展如何、有哪些资料可供参考、希望产出什么结果。

你可以通过以下方式补充项目背景：

* **直接发送文字消息**：
   在项目中发送消息，说明这件事要解决什么问题、当前进展是什么、需要成员或 Agent 重点关注哪些内容。
   项目中的消息会保留在当前项目中。后续成员或 Agent 加入协作时，可以基于已有消息了解上下文，并继续推进任务。
   ![Image=375x250](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/967e16c5441c4b0eb4daf5997ace906d~tplv-goo7wpa0wc-topic.webp)
* **上传并查看文件**：
   如果任务需要参考文档、图片、表格或其他资料，可以将文件上传到项目中。项目成员可以在项目文件中查看这些资料，并在后续讨论或任务处理中引用。
   项目中的 Agent 也可以基于项目文件处理任务，例如阅读资料、整理重点、提取结论或生成方案。
   ![Image=381x300](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/9062fb9207ef4af894bb9f1f384c4f2e~tplv-goo7wpa0wc-topic.webp)
* **查看和引用 Agent 产物**：
   Agent 在项目中生成的文件和结果会作为项目产物保留下来。后续协作时，成员可以查看这些产物，也可以继续 @Agent 基于已有结果进行修改、补充或下一步处理。
   ![Image=400x340](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/30e94c8476ef492cab559de041c30ba9~tplv-goo7wpa0wc-topic.webp)   

例如，在准备产品方案时，你可以先上传需求文档、用户反馈和竞品资料，再发送消息说明本次方案的目标、范围和重点。这样后续 @Agent 下达任务时，Agent 就可以结合项目中的消息和文件进行处理，其他成员也能基于同一份背景信息参与讨论和确认。

### @Agent、@ 成员 \{#d63ccadb\}

项目背景补充好后，就可以通过 @ 来推进任务。你可以 @ 人类成员，请对方查看消息、补充信息或确认结果；也可以 @Agent，让指定 Agent 处理具体任务。

:::tip 说明
Agent 可以 @人类成员，但是无法直接 @其他 Agent。目前只有人类成员可以为 Agent 派发任务，Agent 不能。
:::

在项目中，@ 的范围仅包括当前项目里的成员和 Agent。你可以在输入框中输入 @，或点击输入框中的 @ 按钮，选择要 @ 的对象后继续输入消息。

* **@ 人类成员**
   当你需要某个成员参与讨论、补充信息或确认结果时，可以在消息中 @ 对方。
   例如：
   @张三 帮忙看下这版方案的需求范围是否准确。
   ![Image=433x339](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/3329532c64014689aa81c7534de5259c~tplv-goo7wpa0wc-topic.webp)
* **@ 自己的 Agent**
   当你需要自己的 Agent 处理任务时，可以直接 @ 它，并说明任务目标和输出要求。
   例如：
   @资料整理助手 帮我整理上面的用户反馈，提炼出 5 个高频问题和用户原声。
   ![Image=453x391](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/30140f0d779a4ae69650ec4e5e4f554b~tplv-goo7wpa0wc-topic.webp)
* **@ 其他成员的 Agent**
   如果项目中有其他成员添加的 Agent，你也可以 @ 它们处理任务。不同 Agent 可以承担不同类型的工作，比如整理资料、生成方案、编写代码或分析问题。
   例如：
   @代码助手 请基于上面的需求，评估一下实现成本和可能的技术风险。
   ![Image=436x376](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/3a1cc04f49a54b9c8e29af975964a515~tplv-goo7wpa0wc-topic.webp)   

### 使用 Agent 能力处理任务 \{#5ab06e83\}

在项目中，Agent 不只能回复消息，也可以通过技能或后台任务处理更复杂的工作。你可以直接 @Agent 下达任务，也可以通过技能或后台任务，让 Agent 完成更复杂的工作。

* **直接向 Agent 下达任务**：
   当任务比较明确时，可以直接 @Agent，并说明你希望它完成什么。
   例如，让 Agent 整理一份资料、生成一版方案、分析一组问题，或根据已有内容继续修改。
   ![Image=406x343](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/ed1f445a69354ca68c7b43720c741582~tplv-goo7wpa0wc-topic.webp)
* **使用 Agent 技能**：
   如果项目中的 Agent 配置了技能，你可以在输入框中输入 `/`，查看当前可用的技能列表。技能列表会展示对应的 Agent 信息，方便你选择合适的 Agent 和技能。
   选择技能后，系统会自动带上对应的 Agent。你可以继续输入任务内容并发送，让 Agent 使用该技能处理任务。
   ![Image=430x340](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/af5d36e3c4e548a19375d8d7862e75db~tplv-goo7wpa0wc-topic.webp)
* **看后台任务**：
   如果 Agent 在项目中执行后台任务，你可以在项目中查看任务进度和执行结果。
   项目的后台任务列表会展示任务名称、执行任务的 Agent、运行状态、耗时等信息。对于正在进行中的后台任务，仅任务发起者或 Agent 创建者可以终止任务。
   ![Image=438x276](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/e9e8a601c9de4a2997a318f19a0cb08a~tplv-goo7wpa0wc-topic.webp)   

## 典型协作场景 \{#73050793\}

项目可以用来承载不同类型的协作任务。你可以根据任务复杂度、参与成员和 Agent 能力，选择合适的协作方式。

### 场景一：围绕一个主题持续推进 \{#3969111b\}

当一件事需要持续讨论、反复修改或长期跟进时，可以创建项目来承载这个主题。相关资料、讨论过程和 Agent 产物都会保留在项目中，后续回到项目时，可以接着之前的内容继续推进。

例如：

* **持续打磨一份方案**：你正在准备一份“新功能产品方案”，可以把用户反馈、竞品截图、团队讨论结论都放进项目中，让 Agent 持续帮你整理结构、补充内容和修改版本。
* **跟进一个长期问题**：你在持续分析“用户为什么没有完成 onboarding”，可以把数据现象、用户访谈、每次讨论结论都放进项目中，让 Agent 帮你归纳线索、整理假设和生成下一步分析方向。
* **维护一个固定主题的资料库**：你长期关注“AI 编程工具体验”，可以把看到的文章、产品案例、截图和自己的想法持续放进项目中，让 Agent 帮你整理重点和沉淀结论。

![Image=353x277](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/f7933a077db942379698bb0a458a06ae~tplv-goo7wpa0wc-topic.webp)

### 场景二：多人共同确认需求和结果 \{#a29a4c86\}

当任务需要多人参与判断时，可以让成员一起在项目中补充信息、确认方向和检查结果。Agent 可以根据成员提供的信息整理结论、生成方案或补充材料。

例如：

* **一起确认一版需求**：产品先补充用户问题和目标，设计补充交互限制，研发补充实现风险，再让 Agent 整理需求范围、待确认问题和结论。
* **一起评审一份输出**：针对 Agent 输出的产品方案，项目成员分别从产品、设计、前后端研发、运营等角度提出意见，再让 Agent 汇总修改成下一版。
* **一起写产品规划**：产品团队的不同成员分别补充自己负责模块的规划，例如用户增长、商业化、GTM 等。Agent 可以将各个模块的内容汇总成一份完整规划，再交给大家一起确认和修改。

![Image=373x293](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/90677bfcb77f49bb85fb5d0ae8231765~tplv-goo7wpa0wc-topic.webp)

### 场景三：多个 Agent 分工处理复杂任务 \{#c42864d2\}

当一个任务包含多个不同类型的工作时，可以让不同 Agent 分头处理。每个 Agent 负责自己擅长的部分，最后再把结果汇总到项目中继续讨论。

例如：

* **撰写公众号文章**：选题 Agent 收集热点和用户关注点，确定可写的文章选题；写作 Agent 基于选题生成大纲和正文；审核 Agent 检查错别字、事实错误和风险内容；发布 Agent 调用公众号发布相关技能提交草稿或发布内容。
* **开发一个新功能**：产品 Agent 根据背景信息撰写 PRD，设计 Agent 基于 PRD 生成设计方案或原型建议，研发 Agent 根据需求和设计实现功能，测试 Agent 整理测试用例并检查风险。
* **制作培训材料**：资料 Agent 整理产品文档、历史问答和使用案例；课程 Agent 设计培训大纲和学习路径；写作 Agent 生成讲义、操作步骤和练习题；视频 Agent 根据已有素材制作培训视频。

::::cols
@col 50
<div style="text-align: center"><img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/f770e21cc51442e0b773c3d26cc275c0~tplv-goo7wpa0wc-image.image" width="1930px" height="1558px" /></div>

@col 50
<div style="text-align: center"><img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/5c9e2e3ff1d24e1babfe35d77ac1fa61~tplv-goo7wpa0wc-image.image" width="1952px" height="1534px" /></div>
::::

### 场景四：成员和 Agent 接力推进任务 \{#353ecae5\}

当任务需要一边判断方向、一边产出结果，并根据反馈持续调整时，可以让人类成员和 Agent 接力推进。人类成员负责补充信息、判断结果和决定方向，Agent 负责执行具体任务。

例如：

* **电商直播**：运营成员先确认直播目标、主推商品和卖点方向，素材 Agent 基于这些信息准备脚本和商品素材。主播完成直播后，运营成员筛选重点片段或补充剪辑要求，视频 Agent 再剪辑短视频或回放片段。数据负责人确认直播数据口径后，复盘 Agent 结合数据和视频内容生成复盘结论，团队再一起确定下一场直播的改进计划。
* **项目管理**：项目负责人先在项目中确认目标、里程碑和分工，PMO Agent 维护项目日程和任务规划，并在关键节点 @ 对应的人类成员跟进进展。成员补充实际进度、风险或阻塞后，PMO Agent 再更新计划、同步风险，并整理阶段性结论供项目负责人确认。
* **客户跟进**：销售成员先补充客户背景、沟通记录和当前诉求，方案 Agent 基于这些信息生成解决方案或报价说明。客户经理确认方案后继续与客户沟通，并把客户反馈补充回项目中。复盘 Agent 再根据沟通过程和结果总结风险点、成交机会和下一步动作，销售团队确认后继续推进。

::::cols
@col 50
<div style="text-align: center"><img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/a36ee67071604deea072923847f07ea0~tplv-goo7wpa0wc-image.image" width="1960px" height="1548px" /></div>

@col 50
<div style="text-align: center"><img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/a71653a2620546d9ad6bcd33b41a2b0c~tplv-goo7wpa0wc-image.image" width="1942px" height="1554px" /></div>
::::
