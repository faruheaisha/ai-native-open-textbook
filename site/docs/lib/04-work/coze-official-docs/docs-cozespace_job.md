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
sourceRel: "docs/cozespace_job.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozespace_job.md"
sourceSha256: "ef8f13eea823ea41ff83d656d50a56ee829489559498cf9853afe01d7532888d"
pageSha256: "ef8f13eea823ea41ff83d656d50a56ee829489559498cf9853afe01d7532888d"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

在日历视图里，所有任务一目了然，不同颜色代表不同状态（待执行、执行中、已完成、已暂停、执行失败）。你可以随时切换查看本周、下周的任务，掌握扣子的工作节奏。

:::tip 说明
**Agent 类型限制**：仅**扣子 Agent**  支持在线可视化查看日程。

**访问控制**：在团队版和企业版中，企业超级管理员可以通过**功能访问控制**和**空间资源可见性**，控制成员可见的功能入口和空间资源范围。如果你未看到预期的功能和资源，请联系企业超级管理员确认。更多信息，请参考功能访问控制和空间资源访问控制。
:::

## 什么是日程 \{#b281f5f1\}

日程是扣子的“工作计划表”。你只需告诉扣子“什么时间做什么事”，它就会自动排好计划、按时执行。通过日程，扣子可以在后台主动工作、执行你交代的任务，无需你时刻盯着。而你可以随时打开日程，像翻看日历一样，一目了然地掌握扣子今天、本周要做什么，任务进行到哪一步了，完成得怎么样。

所有循环任务会按频率自动归类，这样你就能快速找到并管理任务，不用在一堆任务里翻找。

在扣子中，日程分为以下两类：

* **Heartbeat 检查**：类似 OpenClaw 的心跳，Heartbeat 检查是扣子的“周期性自检”机制。每隔一段时间，扣子会主动"醒"过来，根据 `HEARTBEAT.md` 来批量检查，看看有没有需要你关注的事情。例如“`每隔半小时看看有没有紧急邮件`”。
* **定时任务**：类似 OpenClaw 的 cron 任务，定时任务是更为精确的时间调度。它更像你手机里的闹钟或日历提醒——你说"每天早上 9 点发日报"，它就会**准点**执行。例如“`每天 8 点提醒我完成日报`”、“`每周一早八点发送 AI 行业日报`”。

:::notice 注意
和扣子被动响应你的指令一样，日程任务（包括 Heartbeat 检查和定时任务）也会消耗 Token 和你账号中的积分。所以你可能会感觉“没有对话和任务，但是却消耗了积分”。如果你想停止日程任务、节约积分，可以在日程页面暂停或关闭日程。操作步骤可参考如何暂停或终止日程。
:::

## 如何创建日程 \{#8b892dd5\}

日程页面中展示扣子的任务清单。打开扣子，像和朋友聊天一样发送你的需求，扣子会为自己创建好对应的日程，按时执行你的指令，无需复杂操作。

:::tip 说明
如果担心日程消息扰乱了你的主对话，可以创建一个项目，在项目中让 Agent 创建日程，Agent 也只会在这个项目中定期执行任务，向你汇报结果。如何创建项目，可参考创建项目。
:::

::::tabs
@tab 网页端、桌面端
1. 在 Agent 对话中，发送指令。例如：
   * Heartbeat 检查：`每隔半小时检查下收件箱`。
   * 定时任务“`每周一早八点发送 AI 行业日报`” 、 “`每天21:00生成工作日报`”。
      发送指令后， Agent 在当前会话中创建日程。如果信息不足时，Agent 会向你确认。你也可以在**日程**卡片中，单击+，创建日程。
      ![Image=475x343](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/49ce2b469c9a427f8ef6a3bdf3614cc8~tplv-goo7wpa0wc-topic.webp)
2. 在对话页面单击**日程**卡片，查看对应任务创建的日程。
   ![Image=231x189](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/55da131a58954cf5bf56f1d1d9302913~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
1. 在 Agent 对话中，发送指令。例如：
   * Heartbeat 检查：`每隔半小时检查下收件箱`。
   * 定时任务“`每周一早八点发送 AI 行业日报`” 、 “`每天21:00生成工作日报`”。
      ![Image=150x285](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/55eb9999a6674520ac351f54ae078f9e~tplv-goo7wpa0wc-topic.webp)
2. 在对话页面右上角单击**日程**图标，查看对应任务创建的日程。
::::

## 如何执行日程 \{#a8e75dc2\}

创建日程之后，扣子会自动按时执行任务，完成后第一时间将结果推送给你。

::::tabs
@tab 网页端、桌面端
1. 自动执行日程。
   ![Image=325x213](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/f5bb957835874cc2b88160a9b9056d78~tplv-goo7wpa0wc-topic.webp)
2. 将任务状态标记为已完成。
   ![Image=321x301](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/fbb7c4afe4744227b68c0db4b14e8a0f~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
1. 自动执行日程。
   ![Image=150x295](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/0ab5b81d9c364707bd344aa36d11672a~tplv-goo7wpa0wc-topic.webp)
2. 将任务状态更新为已完成。
   ![Image=148x288](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/252cf4678c8340d98244a369d26ca185~tplv-goo7wpa0wc-topic.webp)
::::

## 如何查看日程 \{#6ba012d4\}

* **时间线**页签：所有任务以卡片形式展示在日历上，点击卡片可查看详情（类型、状态、执行周期、描述等）。
   ::::tabs
   @tab 网页端、桌面端
   在 Agent 右侧导航栏中，单击**日程**图标，在**时间线**页签下，查看此 Agent 的所有日程。
   
   ![Image=307x265](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/fc618eddc1cd4c74955423a1263d328c~tplv-goo7wpa0wc-topic.webp)
   
   @tab 移动端
   在 Agent 对话框右上角，展开折叠菜单，并选择**日程**，查看此 Agent 的所有日程。
   
   ![Image=183x347](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/041a38eca4d147538d113fff28b45bf5~tplv-goo7wpa0wc-topic.webp)
   ::::
* **全部日程**页签：专门管理循环任务，按频率分类，方便你统一查看。在**全部日程**页面，你还可以暂停或恢复循环日程。
   ::::tabs
   @tab 网页端、桌面端
   在 Agent 右侧导航栏中，单击**日程**图标，在**全部日程**页面查看此 Agent 的所有循环日程。
   
   ![Image=440x210](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/25862092bd594c76946cd159feb98da0~tplv-goo7wpa0wc-topic.webp)
   
   @tab 移动端
   在 Agent 对话框右上角，展开折叠菜单，并选择**日程**。**全部日程**页签中可查看所有循环日程。
   
   ![Image=194x368](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/f5f4cbccd4b64a29bc0435ee32b87711~tplv-goo7wpa0wc-topic.webp)
   ::::   

## 如何暂停或终止日程 \{#911c539a\}

扣子执行日程会消耗积分，如果你不再需要扣子定时执行哪些任务，可以暂停或终止对应的日程以节约积分。

::::tabs
@tab 网页端、桌面端
1. 在 Agent 右侧导航栏中，单击**日程**图标。
2. 在**全部日程**页签下，单击目标日程对应的**暂停**开关。
   ![Image=195x141](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/23d1ca2d8b7b4c7c86a4809fb7d61d36~tplv-goo7wpa0wc-topic.webp)
3. 如需彻底删除日程，可以单击目标日程，然后选择┇ > **删除日程**。
   ![Image=261x215](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/848692b5bcb74329a0d30e8ae979160d~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
1. 在 Agent 对话框右上角，展开折叠菜单，并选择**日程** >**全部日程**。
2. 找到要暂停或终止的 Heartbeat 检查或定时任务。
3. 单击**暂停执行**。
   如需彻底删除日程，可以在暂停后再次单击**终止日程**。
   ![Image=454x455](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/360240d475234558b4c19a6f7ab69d85~tplv-goo7wpa0wc-topic.webp)
::::

## 常见问题 \{#c9aacafe\}

* 我之前创建的长期计划在哪里？
* 新版扣子如何创建长期计划？
