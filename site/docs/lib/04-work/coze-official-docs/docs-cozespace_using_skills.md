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
sourceRel: "docs/cozespace_using_skills.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozespace_using_skills.md"
sourceSha256: "4cfc39fd323abb1b0e071f763e12c6bbe43ad64b428da9169c99a779fcd6d376"
pageSha256: "4cfc39fd323abb1b0e071f763e12c6bbe43ad64b428da9169c99a779fcd6d376"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

技能是一个专为特定领域设计的知识库和工具包，用于指导智能体如何完成指定的任务。如果使用技能，扣子 AI 会在处理专业任务上有更好的表现，例如根据你指定的风格指南与格式撰写文档、例如依据公司的法务标准审查文件等等。本文档介绍如何在扣子对话中使用技能。

:::tip 说明
在团队版和企业版中，企业超级管理员可以通过**功能访问控制**和**空间资源可见性**，控制成员可见的功能入口和空间资源范围。如果你未看到预期的功能和资源，请联系企业超级管理员确认。更多信息，请参考功能访问控制和空间资源访问控制。
:::

## 背景信息 \{#urSmXlwjUu\}

在处理任务时，扣子 AI 会在技能商店中查找相关的技能。扣子 AI 会加载技能的介绍信息，如果判断技能与当前任务有关，将自动安装并触发技能来完成任务。通过技能的渐进式披露机制，扣子 AI 可以在节约上下文窗口的同时访问专业领域的知识。

在扣子中，技能可以分为如下几种：

* **官方技能**：由扣子官方提供的内置技能，无需安装，可直接使用。
* **第三方技能**：分为免费技能和付费技能。免费技能安装后即可使用，付费技能需要购买并安装后可使用。
* **自定义技能**：由开发者本人创建的技能，默认仅本人可用。
* **企业技能**：企业员工创建并上架的技能，仅限本企业内使用。

## 使用限制 \{#mJfRe8KYs1\}

* **技能数量限制**：每个用户最多只能启用 200 个第三方技能，其他类型的技能无数量限制。
* **企业技能商店限制**：
   * **套餐限制**：仅团队尊享版、企业旗舰版支持企业技能商店。
   * **角色限制**：企业技能商店不面向企业访客开放；仅企业员工可发布、查看和使用企业市场中的技能。

## 在扣子对话中使用技能 \{#DUXNuWnxPb\}

除此之外，你还可以上传技能压缩包、通过对话来创建技能，从而制作出符合你要求的技能，帮助你完成任务。

### Agent 自动匹配技能 \{#hUHgTZOAA\}

和 Agent 对话时，输入你的任务指令并敲击回车键，即可发起一个对话任务。Agent 会根据你的任务指令，自动使用匹配的技能。

::::tabs
@tab 网页端、桌面端
![Image=528x323](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/111dac228bf54a8186b7570cf5470819~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
![Image=137x256](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/635c32a0dc7d4f47b9bddcd7d35356d0~tplv-goo7wpa0wc-topic.webp)
::::

### **在对话框中指定技能** \{#hAwHHXFmz\}

你也可以输入斜杠（/），并在技能页签中选择要使用的技能，必须是你已添加的技能。移动端暂不支持通过斜杠指定技能。

![Image=365x316](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/f77932a1d35e4447a21c4c3de90b40ce~tplv-goo7wpa0wc-topic.webp)

如果 Agent 没有找到合适的技能，你可以从技能商店或本地电脑中为它添加技能。

#### **从商店添加技能** \{#hQ7A8AF8M\}

在对话框中单击加号（+），选择**技能** > **添加技能**，在商店中选择一个合适的技能，并单击**添加**。添加完成后即可在对话中使用这个技能。

::::tabs
@tab 网页端、桌面端
![Image=356x299](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/6f54cf3b197e4a7cab3e2dd079372713~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
![Image=114x215](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/2303e42a5288462aa52df6d6facf5d3d~tplv-goo7wpa0wc-topic.webp)
::::

#### 从个人设备添加技能 \{#hBn5AvcRG\}

如果你已经在本地个人设备上创建或下载了可用的技能，可以通过扣子桌面端添加这些技能，让扣子云端 Agent 在对话中直接调用，无需上传技能文件。

扫描个人设备中的技能文件依赖扣子的本地设备能力。在扣子桌面端，开启**允许 Coze 访问本地文件**开关后，扣子会扫描你个人设备中的技能目录。一般来说，包含 `SKILL.md`，且能解析出技能名称和描述的文件夹，会被识别为一个可添加的技能。

从个人设备添加技能后，技能文件仍保存在个人设备上，无需上传到扣子。扣子云端 Agent 调用该技能时，会从个人设备中读取技能文件。

使用技能前，请先了解如下事项：

* 当前仅扣子云端 Agent 支持从个人设备添加技能。
* 仅支持在桌面端添加个人设备的技能。添加后，可以在网页端、桌面端及移动端使用该技能。
* 需要保持扣子桌面端、个人设备在线，并开启本地文件访问权限，否则从个人设备添加的技能将不可用。

从个人设备添加技能的操作步骤如下：

1. 在扣子桌面端右下角，单击**设置**图标。
2. 在**桌面端设置**页面，打开**允许 Coze 访问本地文件**开关。
3. 单击**本机技能扫描**对应的**管理目录**，查看技能文件。
   系统会自动扫描并展示当前设备中的技能文件。如果没有扫描到，你也可以单击**添加**，手动添加技能文件夹。
   ::::cols
   @col 50
   ![Image=354x221](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/09bc954fefbb4632b87d84e412da467d~tplv-goo7wpa0wc-topic.webp)
   
   @col 50
   ![Image=275x176](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/6fd650beda1649e7933b75a404433552~tplv-goo7wpa0wc-topic.webp)
   ::::
4. 在对话中，选择➕ > 技能 > **从个人设备添加技能**，然后添加需要使用的技能。
   ::::cols
   @col 50
   ![Image=285x239](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/3c8981bd57c945ac9ed1bde8d3f79cba~tplv-goo7wpa0wc-topic.webp)
   
   @col 50
   ![Image=208x305](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/6f3edc1f09f146fcbeecb55ecc7410d8~tplv-goo7wpa0wc-topic.webp)
   ::::
5. 在对话中使用技能。
   在桌面端为目标 Agent 添加个人设备的技能后，你可以在网页端、桌面端及移动端的 Agent 对话使用技能。
   ::::cols
   @col 50
   ![Image=335x196](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/5e24a14dcc014d8dad3941156c28807e~tplv-goo7wpa0wc-topic.webp)
   
   @col 50
   ![Image=252x244](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/d223c89cade34e42b9f2cf741b96eacf~tplv-goo7wpa0wc-topic.webp)
   ::::   

## 相关操作 \{#LgZOiZOKxM\}

### 安装技能 \{#pPMhVy5pA3\}

对于技能商店和企业商店中的技能，你必须为 Agent 添加技能后才能使用。

::::tabs
@tab 网页端、桌面端
1. 在[技能商店](https://www.coze.cn/skills?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)页面，根据分类筛选或搜索你感兴趣的技能。
2. 单击目标技能卡片，并在技能详情页面，根据页面提示购买或添加技能。
   * **免费技能**：直接单击**添加**，并选择要添加技能的 Agent。企业市场中的技能默认为免费技能，直接安装即可。
   * **付费技能**：单击**订阅**，根据页面提示完成支付后，单击**添加**。
      添加技能后，技能默认为启用状态。如果启用的技能数量超过限制，安装后该技能为停用状态，如需启用技能，请参考**启用/停用技能**部分。
3. （可选）配置技能。
   部分技能在安装后需要配置环境变量，或授权后才能正常使用。
   * **授权**：如果一个技能需要访问你的其他应用（如飞书、邮箱等）的数据，首次使用时会弹出授权请求。你需要同意授权，技能才能读取或写入所需信息。
   * **配置环境变量**：一些高级技能可能需要你填入特定的 API 密钥或账号信息才能运行。请根据技能详情页的指引完成配置。
      ![Image=448x301](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/eee11d53b7514b30b780608eb7a78da4~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
1. 在扣子 App 首页点击**技能**，进入技能商店。
2. 单击目标技能卡片，并在技能详情页面，根据页面提示购买或添加技能。
   * **免费技能**：直接单击**添加**，并选择要添加技能的 Agent。企业市场中的技能默认为免费技能，直接安装即可。
   * **付费技能**：单击**订阅**，根据页面提示完成支付后，单击**添加**。
      添加技能后，技能默认为启用状态。如果启用的技能数量超过限制，安装后该技能为停用状态，如需启用技能，请参考**启用/停用技能**部分。
3. （可选）配置技能。
   部分技能在安装后需要配置环境变量，或授权后才能正常使用。
   * **授权**：如果一个技能需要访问你的其他应用（如飞书、邮箱等）的数据，首次使用时会弹出授权请求。你需要同意授权，技能才能读取或写入所需信息。
   * **配置环境变量**：一些高级技能可能需要你填入特定的 API 密钥或账户信息才能运行。请根据技能详情页的指引完成配置。

![Image=217x409](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/164b1770fe6a4062a51a4df3c654009e~tplv-goo7wpa0wc-topic.webp)
::::

### 启用/停用技能 \{#GVACMbrUji\}

安装技能后，默认为启用状态，如果你创建和安装的数量超过 30 个，可以停用部分不常用的技能来释放名额。

> 移动端暂不支持启用、停用技能，请在网页或桌面端操作。

1. 在[技能商店](https://www.coze.cn/skills?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)页面，单击**我的技能**页签，选择目标技能。
2. 单击**更多 (⋮)** 按钮，根据需要启用或停用技能。
   * **启用技能**：如果技能为停用状态，可以开启**启用**后的开关，重新启用技能。启用技能后，你才能使用该技能。
   * **停用技能**：如果启用的技能数量超过限制，你可以停用部分不常用的技能。关闭**启用**后的开关，停用技能。停用后，你将无法使用该技能。
      ![Image=461x257](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/975dd91432c449ae95f522c295948227~tplv-goo7wpa0wc-topic.webp)      

### 常见问题 \{#dNbHeqbGFP\}

* 如何切换技能绑定的授权账号？
* 重新部署技能之后，如何在扣子对话中使用最新版本？
