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
sourceRel: "docs/cozespace_session.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozespace_session.md"
sourceSha256: "6fda4e7e6dc32df65b316d3012862f5d1bfe8a8d8db6c3acbe745ea7096658fe"
pageSha256: "6fda4e7e6dc32df65b316d3012862f5d1bfe8a8d8db6c3acbe745ea7096658fe"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

在扣子，解决复杂问题就像聊天一样简单。通过自然语言下达你的指令，Agent 会主动规划、智能决策，逐步推进任务，并最终生成满意的结果。

本文档以和扣子 Agent 对话为例，其他云端 Agent、本地 Agent 的对话方式类似。

:::tip 说明
在团队版和企业版中，企业超级管理员可以通过**功能访问控制**和**空间资源可见性**，控制成员可见的功能入口和空间资源范围。如果你未看到预期的功能和资源，请联系企业超级管理员确认。更多信息，请参考功能访问控制和空间资源访问控制。
:::

## 对话入口 \{#5ce43524\}

扣子提供了 3 种即开即用的对话入口，你可以通过网页可视化操作、手机随时聊天，或者通过飞书和扣子一起开展你的工作。

::::tabs
@tab 网页端、桌面端
1. 下载并安装[扣子桌面端](https://docs.coze.cn/what_is_coze#1ad3c90d)，或访问[扣子网页端](https://www.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)。
2. 在对话框中输入你的指令，和扣子打个招呼。
   ![Image=323x226](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/69acfedba7544c33a2db57f6f03b5718~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
1. 下载并安装扣子 App。
   访问[扣子官网](https://www.coze.cn/overview?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)，鼠标指向**下载移动端**，用手机扫描二维码，下载扣子 App。
   你也可以在 App Store、华为应用市场等应用商店搜索“扣子”，下载扣子 App。
2. 注册并登录扣子 App。
3. 直接发送消息即可对话。

![Image=126x235](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/24c0b816315f4876aa9ea59734545365~tplv-goo7wpa0wc-topic.webp)

@tab 即时通讯 App
1. 打开[扣子官网](https://www.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)，通过对话为扣子 Agent 绑定飞书渠道，并按照页面指引完成授权。
   ![Image=306x236](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/0cea0363c29a4ba18c894ab18e3739f2~tplv-goo7wpa0wc-topic.webp)
2. 飞书应用审批通过后，你就可以在飞书中发消息给扣子 Agent。
   ![Image=279x250](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/cf3eb34cb4c24e95bc7fff15307c919b~tplv-goo7wpa0wc-topic.webp)
::::

## 如何发送指令 \{#c56a66da\}

### 基础指令 \{#3a0b66ed\}

通过简单的对话，直接告诉扣子要做什么，基础格式为：`动作 + 对象 + 要求`。例如：

* **制作 PPT**：`@ PPT 帮我制作一个关于青少年儿童心理健康主题的 PPT，要包含最近 3 年的数据`。
* **生成海报**：`帮我制作一个商务庆典宣传风海报，9:16 比例，红金渐变底纹。标语 “同心筑梦・共赢未来”`。
* **发送邮件**：`帮我发个邮件给小明的扣子 Agent，看看小明晚上 7 点有空吗`。
* **操作云手机**：`@云手机 帮我打开手机浏览器，搜索扣子的使用教程`。

::::tabs
@tab 网页端、桌面端
![Image=404x360](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/94ca463228514a368d5d7124105f6ac1~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
![Image=99x191](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/49716f2c61f74798b36a53c5b8303d96~tplv-goo7wpa0wc-topic.webp)
::::

另外，扣子是一个有记忆的工作搭子，无需嘱咐就能记住对话上下文。你可以基于已有的对话内容开展新的对话。例如：

* **生成日报**：`每天下午 6 点向我发送日报，介绍你当天的工作内容和进展`。
* **修改材料**：`之前做的商务风海报，再帮我加几个字“20XX 年度盛典，业绩突破 8000 万元”`。

::::tabs
@tab 网页端、桌面端
![Image=455x345](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/105a62db553e447d8b47e5da9508cf27~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
![Image=179x339](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/8e016971452d48438f24175341606c22~tplv-goo7wpa0wc-topic.webp)
::::

### 包含文件的指令 \{#6a1f006a\}

在对话中，你还可以上传文件，也可以引用注释、选中区域等具体内容。文字、文件引用内容可以放在同一条指令中，不需要分多次发送。

**上传和引用文件**

::::tabs
@tab 网页端、桌面端
打开 Agent 对话窗口，在输入区域单击 +，上传文件，并发送消息开始对话。

输入超长文本后，内容会自动收起为文本卡片。Agent 仍可读取完整内容，你也可以随时重新编辑。

![Image=389x288](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/826ed0d1f7d040adac8a94150e591804~tplv-goo7wpa0wc-topic.webp)

@tab 手机端
打开 Agent 对话窗口，单击 +，上传文件，并发送消息开始对话。

![Image=176x328](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/c63669140af1482ab30e449e25c9f933~tplv-goo7wpa0wc-topic.webp)
::::

### 包含扩展的指令 \{#hWwNFLvUF\}

在对话中，你还可以使用已安装的插件、技能或 MCP。插件、技能、MCP、引用内容和指令都可以放在同一条指令中，不需要分多次发送。

**使用技能**

技能是给 AI Agent 使用的专项工具包，让 AI 在特定场景里更稳定、更专业、更像一个熟练工。关于技能的详细说明、如何添加技能与数据集，可参考技能概述。

::::tabs
@tab 网页端、桌面端
打开 Agent 对话窗口，在输入区域单击 +，选择要使用的技能或者数据集，并发送指令开始对话。

你也可以输入斜杠（/）来快速引用技能。

![Image=358x270](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/3a2ef8b5c30847749f674687a40fcfc0~tplv-goo7wpa0wc-topic.webp)

@tab 手机端
打开 Agent 对话窗口，在输入区域单击 +，选择要使用的技能或者数据集，并发送指令开始对话。

![Image=160x313](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/c7898bd57ade491da2608e77a68f32a5~tplv-goo7wpa0wc-topic.webp)
::::

**使用插件**

插件是一组可以安装到 Agent 的能力。安装后，Agent 可以按照预设的方法完成任务、调用外部工具，也可以通过 Panel 和你共同处理同一份内容。关于插件的详细说明、如何添加插件，可参考插件。

::::tabs
@tab 网页端、桌面端
打开 Agent 对话窗口，在输入区域单击 +，选择要使用的插件，并发送指令开始对话。

你也可以输入`@`快速引用插件。

![Image=372x204](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/81a68ab7722a4667b45888b72fae9cfb~tplv-goo7wpa0wc-topic.webp)

@tab 手机端
打开 Agent 对话窗口，在输入区域单击 +，选择要使用的插件，并发送指令开始对话。
::::

### 使用语音输入 \{#hPG4lY469\}

在网页端、桌面端（macOS）或移动端与扣子对话时，你可以直接使用语音输入，更轻松地说出指令。

* 首次使用前，请允许浏览器或扣子 App 访问麦克风。
* 如果语音输入无法使用，请检查麦克风权限和设备连接。

::::tabs
@tab 网页端、桌面端
* **长按说话**：在 macOS 上，默认按住右 Command（⌘）键开始语音输入，松开后结束，适合快速输入短句。短按右 Command 键不会触发录音。
* **连续听写**：按一下 Option + M 开始听写，再按一下结束，适合输入较长内容，无需一直按住按键。
* **自定义快捷键**：你可以在左下角通用设置的**语音输入快捷键**中，分别调整或关闭**长按说话**和**连续听写**。长按说话还可选择右 Option、右 Control 或空格键。

@tab 移动端
1. 在输入框中点击**语音输入**图标，切换至语音输入模式。
2. 长按**按下说话**并开始说话。松开按钮后，扣子会将语音识别为文字，并直接发送这条文字消息。
   * 长按说话时，向**取消**方向滑动并松开，可取消本次发送。
   * 向**编辑文字**方向滑动并松开，识别出的文字会进入输入框，你可以确认或修改后再发送。
::::

### 表情回复和快捷回复 \{#hKXrTKotG\}

你可以通过常见的 emoji 表情对单条消息进行快速反馈。此外，扣子还支持快捷回复表情，适用于确认、赞同、提醒等常见协作场景，帮助你减少重复文字回复，提升沟通效率。

::::tabs
@tab 表情回复
* **使用表情回复消息**：将鼠标悬停在目标消息上，点击消息右侧的 **表情回复** 按钮，即可打开表情面板并在**点个反应**区域选择需要发送的表情。
   ![Image=277x218](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/2ef62016e32b43f6bc29572547da515f~tplv-goo7wpa0wc-topic.webp)
* **查看已回复的表情**：选择表情后，表情会展示在对应消息下方，便于项目成员快速查看和理解反馈内容。你可以将鼠标悬停在表情回复上，即可查看是谁发送的这些表情。
   ![Image=295x184](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/6978478ce0a94e7d8752a57ed796b260~tplv-goo7wpa0wc-topic.webp)
* **撤回表情回复**：只有 emoji 表情（点个反应）支持撤回。表情撤回后直接消失，不会留痕也不会通知其他人。撤回方式包括：
   * 对同一条消息再发送一次同样的表情回应。
   * 在消息下方点击你发送的表情回应。

@tab 快捷回复
暂不支持撤回快捷回复。

* **使用表情回复消息**：将鼠标悬停在目标消息上，点击消息右侧的 **表情回复** 按钮，即可打开表情面板并在**快捷回复**区域选择需要发送的表情。
   ![Image=317x242](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/f03e68cc449442a48153d73c1beaaeeb~tplv-goo7wpa0wc-topic.webp)
* **查看已回复的表情**：选择表情后，系统代你自动发送一条包含此表情的消息回复。你可以在对话中直接看到这条消息回复。
   ![Image=295x215](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/203e6d3ab94144148076eb02359e4096~tplv-goo7wpa0wc-topic.webp)
::::

## 任务进行中 \{#hAQYFIe71\}

Agent 开始执行任务后，你不需要一直等待。你可以继续安排后续工作、查看任务进度，也可以补充信息或停止任务。

### 消息排队 \{#hlaEoom6e\}

Agent 执行任务时，你仍然可以继续发送新消息，不必等待当前任务完成。新消息会先进入输入框上方的队列，你可以拖动调整顺序、单击立即发送，也可以随时编辑或删除。

* **立即发送：​**立即把消息发送给 Agent，让 Agent 根据这条消息调整当前正在执行的任务。适合用来改变话题方向、补充遗漏信息或提供新的要求。
* **消息排队**：将消息加入到队列中，等 Agent 做完当前任务后再处理。

![Image=363x198](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/614a6d44421d41e8b498508fd77f71a9~tplv-goo7wpa0wc-topic.webp)

在桌面端、网页端，你还可以使用快捷键发送对话。

| **快捷键**  | **Agent 正在执行任务**  | **Agent 处于空闲状态**  |
| --- | --- | --- |
| Enter  | 进入消息排队，当前任务结束后再发送。  | 直接发送消息。  |
| Command+ Enter  | 立即发送消息，打断当前任务并让 Agent 处理新消息。  | 直接发送消息。  |
| Shift + Enter  | 在输入框内换行，不发送消息。  | 在输入框内换行，不发送消息。  |

### Agent 主动询问 \{#hvLo9mKqW\}

执行过程中，如果 Agent 发现信息不够、需要你拍板，它会暂停下来主动询问。问题可能是单选、多选等，你也可以自由补充自己的要求。当 Agent 连续提出多个问题时，卡片会显示当前进度，例如“1/2”，让你清楚知道已经回答到哪一步、还剩几项需要确认。

![Image=296x207](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/01417ff3902141849d0cf7013070bfa8~tplv-goo7wpa0wc-topic.webp)

### 查看任务进度 \{#hUnhIsA6I\}

Agent 执行多步骤任务时，输入框上方会出现一个进度卡片，显示“第 X/Y 步”和当前正在处理的事项。单击可以展开查看完整任务清单，不需要反复追问“做到哪了”。

![Image=332x259](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/c87aa31dee9d4250989e1057f55da81c~tplv-goo7wpa0wc-topic.webp)

### 随时叫停 \{#hnNav6XqC\}

如果 Agent 跑偏了，或者你临时改了想法，可以随时让它停下来。Agent 运行中且输入框为空时，对话框右侧会显示停止按钮，单击即可停止当前任务。

![Image=314x172](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/46949def5d704e59969c6d469a0219d9~tplv-goo7wpa0wc-topic.webp)

## 发起后台任务 \{#hOTNo6iSv\}

对于生成视频、生成网页、操作云手机等耗时较久的任务，扣子会在后台自动处理，你无需等待任务结束就能开始新的对话。

* 发送指令后，任务会自动转为异步处理，不会占用你的对话。
* 在对话区域右上角打开**后台任务**页面，你可以像看下载进度条一样，清晰掌握所有任务的当前进度。

::::tabs
@tab 网页端、桌面端
![Image=626x325](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/7a9af08defdd433f9945eaf6c76b8592~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
![Image=258x490](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/27294b36e9ae4ba391591980a2b62b81~tplv-goo7wpa0wc-topic.webp)
::::

## 在项目中对话 \{#hVCgZRGb3\}

在扣子中，默认只有一个主对话。现在你可以通过“创建项目”开启新的独立工作空间。更多信息，请参考项目。

创建项目时，需要选择一个 Agent。每个项目都会基于所选 Agent 创建一条独立的 Session，也就是一段独立的上下文和对话任务。不同项目之间互不干扰，各自保存自己的对话历史、对话任务、文件和日程。

你可以把项目理解为“为某个任务单独开启的一间工作室”。例如，一个项目用于撰写方案，另一个项目用于分析数据，第三个项目用于开发代码。它们可以同时存在，但不会共享上下文，也不会相互影响。

这样做的好处是：

* 不同任务可以分开管理，避免上下文混杂，每个项目都能保持连续的任务记忆和对话记录。
* 适合长期任务、并行任务或需要分阶段推进的复杂工作。

此外，项目中还支持多人多 Agent 协作，你可以邀请其他用户和 Agent 加入项目，组建团队来一起工作。详细说明可参考项目与协作。

## 更多能力 \{#564f7e13\}

直接在对话框里对扣子说出你的需求，它就能帮你完成一系列操作。以下为部分使用示例：

* **信息检索**：实时全网搜索最新资讯、行业报告、热点事件，快速获取权威数据与背景信息，帮你高效完成资料搜集与事实核查。
   示例指令：“帮我查看 OpenClaw 最新热点”。
* **图像生成**：通过描述生成海报、插画、示意图等视觉素材，支持风格定制与尺寸调整，满足内容配图与创意设计需求。
   示例指令：“生成一张适合公众号推文的春天主题封面图”。
* **文件处理**：支持上传文档、表格、PPT 等文件，自动提取核心内容、分析数据趋势、生成摘要或结构化报告，大幅提升文档处理效率。
   示例指令：“帮我分析这份销售数据表，找出 Q1 增长最快的品类”。   

::::cols
@col 33
**信息检索**

![Image=241x199](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/375f61180945480b99d1822469c8e283~tplv-goo7wpa0wc-topic.webp)

@col 33
**生成图像**

![Image=1850x1311](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/d7c1265c1ec6493a85e48bb3d81896a2~tplv-goo7wpa0wc-topic.webp)

@col 33
**处理文件**

![Image=2808x1705](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/9e5a5e215c6c41dabb6b811ba6efe8b3~tplv-goo7wpa0wc-topic.webp)
::::

## 常见问题 \{#93945550\}

* 如何新建话题？
* 什么是已归档对话？
* 各个平台的对话是打通的吗？
* 各个渠道的对话是打通的吗？
* 可以把对话分享给其他人吗？
* 如何删除扣子的对话记录、聊天记录？
* 可以重置扣子，或者清空对话吗？
* 扣子对话能保证隐私安全吗？
* 哪些 Agent 支持自定义模型？
* 不支持@收藏夹文档了吗？
