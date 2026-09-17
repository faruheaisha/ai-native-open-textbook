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
sourceRel: "docs/coze-meeting-observation.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/coze-meeting-observation.md"
sourceSha256: "61f49c44ae441142aa13b77f7d1508d3bd7f9ac6c67ef86d6d44e8a78c38d3f4"
pageSha256: "61f49c44ae441142aa13b77f7d1508d3bd7f9ac6c67ef86d6d44e8a78c38d3f4"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

开会时顾不上记重点，散会后还要补纪要？在扣子 App 中开启会议旁听，Agent 就能全程记录你的线下会议，实时将发言转成文字，并在会议结束后自动整理纪要、结论和待办，帮你把注意力留给讨论本身。

## 支持哪些能力 \{#hURqbR1VY\}

会议旁听是扣子 App 提供的会议辅助功能。开启后，Agent 会通过手机麦克风全程收听会议，实时理解并转写讨论内容；会议结束后，还会自动整理会议纪要。除了帮你记录，Agent 也能结合会议上下文回答问题、识别重点，并协助跟进会上产生的待办。

* **全程旁听：​**通过手机麦克风记录会议内容，切换到其他应用后也可继续运行。
* **实时字幕：​**将会议发言实时转成文字，像是给会议添加了字幕，没听清的内容也可以随时回看。
* **区分说话人：​**自动区分不同说话人；录入声纹后，还能更准确地识别你的发言。
* **自动生成纪要：​**会议结束后，自动提炼重点、结论和待办事项。
* **随时提问：​**会中或会后都可以围绕会议内容向 Agent 提问。

::::cols
@col 25
实时字幕：

![Image=206x384](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/21a48417a67d41199180cd9e0b23c574~tplv-goo7wpa0wc-topic.webp)

@col 24
会议纪要：

![Image=199x380](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/b5d9b820a4e94eeabbe115123d4f6d27~tplv-goo7wpa0wc-topic.webp)

@col 25
随时提问：

![Image=218x376](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/7e9a93146cb04c80b9533356de3c9626~tplv-goo7wpa0wc-topic.webp)

@col 25
一键创建日程：

![Image=197x379](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/1b594502450f4b789836ec3c2252a648~tplv-goo7wpa0wc-topic.webp)
::::

## 使用前须知 \{#hCvt3UCbO\}

* **平台限制**：仅支持在扣子 App 中发起会议旁听。旁听结束后，可在网页端和桌面端查看、分享会议纪要或下载录音。
* **麦克风权限**：会议旁听需要使用手机麦克风收音。首次使用时，请按照页面提示允许扣子 App 使用麦克风；如果未开启权限，将无法开始旁听。
* **Agent 限制**：所有类型的 Agent 均支持会议旁听，但项目中暂不支持发起旁听。
* **积分限制**：账号积分为 0 或处于欠费状态时，无法开启会议旁听。
* **套餐限制**：不同版本支持的单场旁听时长和声纹数量如下：
   
   | **套餐版本**  | **免费版**  | **个人进阶版**  | **个人高阶版**  | **个人旗舰版**  | **个人尊享版**  | **团队高阶版**  | **团队旗舰版**  | **团队尊享版**  | **企业标准版**  | **企业旗舰版**  |
   | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
   | 单场旁听时长  | 30 分钟  | 30 分钟  | 4 小时  | 4 小时  | 4 小时  | 4 小时  | 4 小时  | 4 小时  | 4 小时  | 4 小时  |
   | 声纹数量  | 不支持  | 不支持  | 1 个  | 2 个  | 5 个  | 1 个  | 2 个  | 5 个  | 5 个  | 10 个  |
* 费用：具体计费规则，请参考旁听费用。

## 如何使用会议旁听 \{#hKCZgeQhl\}

### 步骤一：打开会议旁听 \{#hdEmPkHq4\}

会议开始前，先在扣子 App 中开启旁听，并确保手机能够正常收音。建议在会议开始前提前开启，避免漏掉开场内容。

1. 选择以下任一方式打开旁听：
   * **从 Agent 会话进入：​**打开扣子 App，进入需要使用的 Agent 单聊会话，点击输入框中的加号（+），再点击菜单中的**旁听录音**。
   * **从手机桌面进入：​**长按扣子 App 图标，在快捷菜单中点击启动旁听录音的入口。
      首次使用时，请按照页面提示为扣子 App 授予麦克风权限。
   ::::cols
   @col 33
   **从 Agent 会话进入**
   
   ![Image=134x254](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/c73cc44ed8374ceab01d43b921d72807~tplv-goo7wpa0wc-topic.webp)
   
   @col 33
   **从手机桌面进入**
   
   ![Image=139x251](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/a5bf26fac85a4095a457c6b001c4bbf5~tplv-goo7wpa0wc-topic.webp)
   
   @col 33
   
   ::::
2. （可选）如需让 Agent 更准确地识别你的发言，可以先点击**添加我的声纹**，按照提示完成录入。
   后续如需继续添加、删除或重新录入声纹，可在扣子 App 中前往**我的 > 声纹管理**进行操作。网页端和桌面端暂不支持添加或管理声纹。
3. 点击**直接开始旁听**，Agent 立即开始旁听。

### 步骤二：正常参加会议 \{#hSqjixcZy\}

旁听开始后，你可以正常发言和讨论，Agent 会持续记录并理解会议内容。

会议进行期间，请注意：

* **确保收音清晰**：将手机放在能够清楚收音的位置，避免遮挡麦克风，便于 Agent 清楚听到会议发言。
* **会中标记**：听到重要结论、待确认问题或关键发言时，点击**标记**，方便会后快速定位。
* **实时字幕**：在旁听页面查看实时字幕和说话人信息，没听清的内容可以随时回看。
* **会中智能问答**：需要了解会议进展时，可以通过文字或语音向 Agent 提问。
* **后台运行**：如需使用其他应用，可以将扣子切换至后台，旁听会继续运行。

::::cols
@col 33
会中标记：

![Image=204x383](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/74e33d469f7043f48fe9b5f8c22e0102~tplv-goo7wpa0wc-topic.webp)

@col 33
实时字幕：

![Image=209x390](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/73c8829b671647eab65f2f5c28dbc48a~tplv-goo7wpa0wc-topic.webp)

@col 33
智能问答：

![Image=226x390](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/552a3c22e8404e0bad664111aa62eef3~tplv-goo7wpa0wc-topic.webp)
::::

### 步骤三：结束会议并查看纪要 \{#hfOVV2Gns\}

会议结束后，停止旁听，Agent 会根据录音和转写内容自动整理会议纪要。

1. 返回旁听页面，点击**停止**图标。
2. 等待 Agent 处理会议内容并生成纪要。
   会议越长，生成所需时间可能越久。
3. 打开会议详情，查看录音、文字记录、会议重点、结论和待办事项。
   如需进一步了解某个讨论点，可以继续围绕会议内容向 Agent 提问；也可以转发待办，让 Agent 协助跟进。每场旁听还会在该 Agent 的文件目录中保存会议纪要、完整转写等文件，方便后续查找和使用。   

::::cols
@col 24
结束会议：

![Image=818x1482](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/e3d0a7e8569945539ed3527dac847ccb~tplv-goo7wpa0wc-topic.webp)

@col 24
会议纪要：

![Image=204x389](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/58eac2646d7a440cb6a03ec96b91975a~tplv-goo7wpa0wc-topic.webp)

@col 23
文字记录：

![Image=812x1516](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/04fa952c17b64b479153207faa604797~tplv-goo7wpa0wc-topic.webp)

@col 26
一键待办：

![Image=198x381](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/9b53c276fcf64ea38389d5678e79b624~tplv-goo7wpa0wc-topic.webp)
::::

## 通过旁听还能做什么 \{#hec5HqwOt\}

### 实时问答：边开会，边了解进展 \{#hUNpJd51r\}

旁听过程中，Agent 能理解当前会议的上下文。你可以在 Agent 对话中发送文字或语音消息询问：

* 刚提到的这个概念什么意思
* 你觉得刚提到这个想法怎么样
* 这个计划还有什么需要确认的细节吗

即使中途你去忙别的了，只要 Agent 还在录制，就可以让你不错过任何细节。

::::cols
@col 33
会中提问：

![Image=193x371](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/5930032ab2ce4b159ba396453d0cc431~tplv-goo7wpa0wc-topic.webp)

@col 33
发送问题：

![Image=211x364](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/0db3949709594180a95450b73c548702~tplv-goo7wpa0wc-topic.webp)

@col 33

::::

### 录入声纹：让 Agent 认出你 \{#hpwWjqrN3\}

开始旁听前，你可以先录入自己的声纹。添加声纹后，Agent 能更准确地识别哪些内容是你说的，让转写记录和会议纪要中的发言人信息更清晰。

不同版本支持录入的声纹数量可参考[使用前须知](#hCvt3UCbO)。

添加声纹的方式：

::::cols
@col 25
1. 扣子 App 中单击你的头像，进入**账号信息**页面：

![Image=842x1495](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/67d93d9e211b4e41af6809b94baaa335~tplv-goo7wpa0wc-topic.webp)

@col 25
2. 选择**添加声纹**：

![Image=196x379](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/34d2ce4b048749b3bdb2b3b1860a59e7~tplv-goo7wpa0wc-topic.webp)

@col 25
3. 根据页面提示录制指定的音频片段：

![Image=816x1540](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/eea817441a754acb87b2464615b162e7~tplv-goo7wpa0wc-topic.webp)

@col 25
4. 添加声纹的效果：

![Image=836x1534](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/a1c1475968d4463eb8d815834478434c~tplv-goo7wpa0wc-topic.webp)
::::

### 转发待办：让 Agent 继续跟进任务 \{#hx8ANaYIC\}

会议结束后，可以将纪要中的待办一键转发给 Agent，或者转发到多人/多 Agent 项目。Agent 会结合会议上下文继续协助你处理，例如整理后续计划、查询资料、撰写消息或提醒任务进展。

::::cols
@col 33
转发给 Agent 或项目：

![Image=202x388](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/3b15d7d7514d478e858ed55214f6465a~tplv-goo7wpa0wc-topic.webp)

@col 33
Agent 帮你记录、执行待办：

![Image=196x377](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/cdf4c85e887b4dd8a07b25b30d369631~tplv-goo7wpa0wc-topic.webp)

@col 33

::::

### 会中标记：快速记下关键信息 \{#hZ0rGj9PZ\}

听到重要结论、待确认问题或关键发言时，可以点击**标记**图标。会后查看记录时，能够更快定位这些内容，不必从头翻找整场会议。

::::cols
@col 33
在会中添加标记：

![Image=202x379](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/21b73703b15947b199bf8d3693fe4f1d~tplv-goo7wpa0wc-topic.webp)

@col 33
会后定位标记信息：

![Image=189x357](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/ac9cc8af33fe4024854dd8442ad3404d~tplv-goo7wpa0wc-topic.webp)

@col 33

::::

## 适合哪些场景 \{#hMTq4Ng9S\}

### 进度同步会 \{#hMSZzZS2A\}

项目成员依次同步进展时，Agent 可以记录每个人的完成情况、当前问题和下一步安排，并在会后整理出负责人和待办。讨论到风险、延期或需要协作的事项时，你还可以随手标记，方便会后重点跟进。会议结束后，也可以让 Agent 生成一份简明的进度摘要，快速同步给未参会的成员。

::::cols
@col 50
![Image=2616x1624](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/5012ed315f8d46a2952974814cd14bdb~tplv-goo7wpa0wc-topic.webp)

@col 50
![Image=226x272](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/d17642d798b649b38c03d9c4fcd8b079~tplv-goo7wpa0wc-topic.webp)
::::

### 辅助面试 \{#hKp8HZVMr\}

面试前先告诉 Agent 本次需要考察的维度。面试过程中，可以随时询问哪些考察点尚未覆盖、候选人的回答中有哪些值得深入追问的方向，让你更专注于和候选人交流。遇到关键回答时，还可以添加标记，方便面试结束后快速回顾。会后，Agent 也能帮助整理候选人的主要经历、回答要点和待确认信息，为后续评价提供参考。

::::cols
@col 50
![Image=2534x1682](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/a69225eb8a414a83bbc6bfdfb922abb4~tplv-goo7wpa0wc-topic.webp)

@col 50
![Image=232x296](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/ae92f22843cb4e108dbd1e69c121a480~tplv-goo7wpa0wc-topic.webp)
::::

### 课堂与培训 \{#hRV77zbYZ\}

上课或参加培训时开启旁听，Agent 会持续记录讲解内容。听到重要知识点、案例或课后任务时，可以随手标记，之后快速定位。课程结束后，你可以通过纪要回顾知识重点，让 Agent 按主题整理复习提纲，也可以继续追问没听懂的内容，减少课后重新整理笔记的时间。

::::cols
@col 50
![Image=2536x1688](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/2f66b817679c4f4fabc326f0c17df2b5~tplv-goo7wpa0wc-topic.webp)

@col 50
![Image=230x295](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/911cffe56019446db80b128f9fbefdc6~tplv-goo7wpa0wc-topic.webp)
::::

### 销售拜访 \{#hv7IoRSIg\}

拜访客户时开启旁听，Agent 可以记录客户的业务背景、核心需求、关注问题和购买意向。沟通过程中遇到客户异议、竞品信息或关键承诺时，可以及时标记，避免后续遗漏。拜访结束后，再让 Agent 整理双方确认的事项、负责人和下一步动作，帮助你快速完成拜访记录，也便于后续跟进或同步给团队。

::::cols
@col 50
![Image=2540x1678](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/a04f8a31f1c64dbb87c66cf311ae5144~tplv-goo7wpa0wc-topic.webp)

@col 50
![Image=212x293](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/45016287c9fb4024a13a8e84370184bc~tplv-goo7wpa0wc-topic.webp)
::::

## 用户访谈 \{#hE6FQnSgO\}

访谈用户时开启旁听，Agent 可以完整记录用户对产品的使用体验、遇到的问题和真实表达，减少边沟通边做笔记带来的信息遗漏。访谈结束后，你可以让 Agent 按主题归纳用户痛点、需求和典型观点，也可以对比不同用户的反馈，为产品分析和后续决策提供参考。

::::cols
@col 50
![Image=2540x1680](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/092aed1ae12f45d7aa3554dbb6ca43cb~tplv-goo7wpa0wc-topic.webp)

@col 50
![Image=211x292](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/8985147055284442bb692f65913911be~tplv-goo7wpa0wc-topic.webp)
::::

## 常见问题 \{#hJJVEBhoI\}

### 网络不好时还能使用吗？ \{#hNuE9Frc8\}

可以。进入弱网或无网状态后，扣子会先在手机本地继续录音，但此时不会实时转写。恢复网络后，扣子会校验免费额度和积分，再上传并处理录音。

### Agent 会在会议中发声吗？ \{#hUVBzHGQN\}

不会。会议旁听通过手机麦克风收音，Agent 不会主动发声或打断会议。需要与 Agent 交流时，可以在旁听页面中输入文字。

### 其他参会人会察觉 Agent 正在旁听吗？ \{#hvKjzjren\}

Agent 不会以参会人的身份加入会议，其他人也不会收到 Agent 入会提示。不过，会议旁听会录制现场声音。开始前请主动告知其他参会人并征得同意，同时遵守所在地区及组织关于录音和个人信息保护的规定。

### 结束后会有完整的录音和文字记录吗？ \{#hIVF00URH\}

结束旁听后，你可以在会议详情中回听录音、查看转写记录和自动生成的会议纪要。弱网或离线期间的内容需要在恢复网络并成功上传处理后才能查看。

### 能旁听飞书会议或腾讯会议吗？ \{#hTuZZcaxH\}

可以旁听，但不建议在同一部手机上同时参会并开启旁听。旁听期间，扣子会占用手机麦克风，且无法直接收录同一部手机扬声器播放的会议声音，可能导致会议发言或旁听收音异常。

建议使用另一台设备参加飞书会议或腾讯会议，并将开启旁听的手机放在能够清楚收音的位置。

### 如何下载会议录音？ \{#hEoeJJFBh\}

听结束并生成纪要后，打开会议纪要详情页，点击页面顶部的**下载**按钮，即可将本场录音下载到本地。你也可以在网页端或桌面端打开会议纪要并下载录音。

:::tip 说明
仅网页端和桌面端支持下载会议录音。
:::

![Image=215x274](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/ab8ffeb0c3a44541b93e0b756316ba66~tplv-goo7wpa0wc-topic.webp)

### 为什么录入声纹后，会议中没有识别出我？ \{#hEjkc2iFi\}

这是正常现象。声纹识别不会在会议旁听过程中实时显示；旁听结束并完成处理后，Agent 会在文字记录中根据已录入的声纹识别你的发言。
