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
sourceRel: "docs/cozespace_create_skill.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozespace_create_skill.md"
sourceSha256: "357c95c9d333d06abd98060eebb15e766a8ab91352558dca4fa990ae3f9237a7"
pageSha256: "357c95c9d333d06abd98060eebb15e766a8ab91352558dca4fa990ae3f9237a7"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

技能可以将过去分散在提示词、代码片段或零散文档中的隐性知识，显性化、结构化地组织起来，让 AI Agent 按需、稳定地执行专业任务。你可以将技能看做是新员工的入职材料，将积累的工作经验和最佳实践打包为技能包，让扣子 AI 成为你专业领域的专家。

不同于一次性的提示词（Prompt），技能是可保存、复用、优化的任务解决方案，让 AI **从理解你的指令**，**变成掌握你的方法**。如果一个任务的处理流程相对固定、可稳定重复操作，且需要一致、可靠的输出时，可以将其封装为技能，提供给通用智能体使用。

:::tip 说明
* 关于技能的工作机制、技能和工作流等其他概念的区别，可参考技能概述。
* 在团队版和企业版中，企业超级管理员可以通过**功能访问控制**和**空间资源可见性**，控制成员可见的功能入口和空间资源范围。如果你未看到预期的功能和资源，请联系企业超级管理员确认。更多信息，请参考功能访问控制和空间资源访问控制。
:::

如果技能商店中没有你满意的技能，你可以针对自己的业务场景，自行制作一个技能。通过扣子对话，将你满意的扣子对话任务制作为技能，扣子会自动总结这个任务的核心工作流程，将其沉淀为“可复用的操作说明书”，以便后续在类似场景中直接复用。

## 制作技能 \{#hJsG8FDxg\}

在扣子对话任务中，你往往需要多轮的问答交互、反复调整细节，才能生成一个完全符合要求的产物。如果这个流程比较固定、输出格式明确、有令人满意的样例，就可以考虑将其制作为一个技能，让扣子 Agent 在后续执行类似的任务时，参考这个对话任务的处理流程和详细要求，一次性生成符合需求的产物。

:::tip 说明
你也可以在[扣子编程](https://code.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)中通过自然语言开发技能。将你在指定领域已沉淀的专业知识、工作流程和最佳实践提供给编程 Agent，它会生成格式标准的技能文件包，打包后即可在扣子对话中使用。
:::

例如，这个将产品公告制作为网页格式的对话任务，已经经过公告优化、网页格式调整等多轮修改，生成了基本符合要求的网页页面，我们可以将其制作为技能，后续直接输入公告内容，就可以制作一个风格、结构类似的公告网页。

::::tabs
@tab 网页端、桌面端
1. 在扣子中，找到需要制作为技能的对话。
2. 输入生成技能的指令。
   例如：
   ```Plain Text
   帮我将以上处理流程制作为技能，已生成的产物可作为风格、格式的参考。
   ```
   ![Image=435x347](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/72491d0ec8f84020a12012bd0fb1d84e~tplv-goo7wpa0wc-topic.webp)
   扣子会自动总结任务的要求、沉淀模板，制作 SKILL.md 等技能文件，并将制作好的技能添加到当前对话的 Agent 中。
3. 试用技能，确认效果。
   输入一条指令，查看这个技能的触发时机和效果是否符合你的预期。如果不满意，还可以通过对话让扣子帮你优化这个技能。例如，在对话中输入“`/技能名称：帮我优化一下这个技能`”
   ![Image=512x278](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/df51430f8bcb49d4af29f510491e939a~tplv-goo7wpa0wc-topic.webp)
4. 为其他 Agent 添加这个技能。
   制作好的技能可以在当前对话的 Agent 中直接使用，如果想为其他 Agent 添加这个技能，可以将其发布到技能商店、上传到虾评，再从商店添加技能。

@tab 移动端
1. 在扣子 App 中，找到需要制作为技能的对话。
2. 输入生成技能的指令。
   例如：
   ```Plain Text
   帮我将以上处理流程制作为技能，已生成的产物可作为风格、格式的参考。
   ```
   ![Image=153x254](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/cf2cd1b83aca436c9976bf1636399762~tplv-goo7wpa0wc-topic.webp)
   扣子会自动总结任务的要求、沉淀模板，制作 SKILL.md 等技能文件，并将制作好的技能添加到当前对话的 Agent 中。
3. 试用技能，确认效果。
   输入一条指令，查看这个技能的触发时机和效果是否符合你的预期。如果不满意，还可以通过对话让扣子帮你优化这个技能。
   ![Image=134x228](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/23f8fefb3fba458ba9979984a62ed0d3~tplv-goo7wpa0wc-topic.webp)
::::

## 上架技能 \{#hbh1YbHMj\}

成功制作技能之后，你可以将创建的技能上架到技能商店或企业市场，以便其他用户使用技能。

* **技能商店**：面向所有扣子用户的公开商店，技能可被扣子用户发现、安装和使用。你可将自主开发的技能设为付费模式上架，实现商业变现。这一机制既为开发者提供创意变现渠道，也为扣子用户提供丰富的技能选择。
* **企业市场**（仅部分版本支持）：面向企业内部的专属技能分发中心，仅限本企业员工访问使用。适用于分发核心业务工具或内部专属技能，既能保护知识产权，又能提升内部协作效率。

### 使用限制 \{#hVKXrqQnS\}

* 仅**技能所有者**能上架并管理技能。
* 扣子移动端暂不支持该操作，请在网页端或桌面端体验。
* 个人工作空间中的技能不可上架到企业技能商店。

### 准备工作 \{#hhTEjmnth\}

在开始上架流程前，请确保你已完成以下准备：

* 已创建技能。
* 如果上架付费技能，你需要先开通支付渠道，详细步骤可参考开通收款账户。
* 如果公开上架到技能商店，需要先申请技能上架资质。在[我的技能](https://www.coze.cn/skills?tab=my&surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)页面找到要上架的技能，单击**更多 (⋮)** 按钮，选择**申请技能上架资质**，提交表单并等待审核通过。
   ![Image=553x188](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/f0aea46c0708451c98e67648a34229b2~tplv-goo7wpa0wc-topic.webp)   

### 将技能上架到技能商店 \{#hq5zUwVG8\}

#### 步骤一：开启成员上架权限 \{#hiidEcI7i\}

:::tip 说明
仅团队版、企业版需要执行该操作，个人版请跳过。
:::

默认情况下，只有企业超级管理员和管理员能将企业工作空间中的技能上架到技能商店。管理员可以修改配置，为企业成员开启此权限。

1. 在[扣子](https://www.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)左下角单击个人头像，选择**企业账号** > **企业管理**。
   你也可以直接访问扣子编程的企业管理页面，此域名默认打开最近一次访问过的企业管理页面。
2. 在左侧导航栏中选择**企业成员管理**，在顶部单击**成员权限**页签。
3. 关闭**禁止企业成员上架 Skill 到扣子商店**的开关。
   * **关闭**：企业成员可将企业工作空间中，本人创建的技能上架至技能商店。
   * **开启**：仅企业超级管理员和管理员可将企业工作空间中，**本人创建**的技能上架至技能商店。
      ![Image=584x279](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/ea614296ece044e08928d1d9ab537aa0~tplv-goo7wpa0wc-topic.webp)      

#### 步骤二：上架到技能商店 \{#huW6gENTp\}

你可以将你开发的技能上架到技能商店，供扣子的其他用户使用你的技能。

1. 在[扣子](https://space.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)左侧导航栏选择**技能商店**。
2. 在**我的技能** > **我创建的**页签下，选择目标技能。
3. 单击**更多**按钮，选择**上架到商店**。
   ![Image=433x212](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/569a1251285e44d190db078e067449c0~tplv-goo7wpa0wc-topic.webp)
4. 在上架到商店页面，根据页面提示，完成配置。
   关于基础信息与付费设置，请参考上架配置项说明。
   ![Image=325x275](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/622ce55272c447bb9055e7a0ab4e96e3~tplv-goo7wpa0wc-topic.webp)   

:::tip 说明
提交上架申请后，扣子团队将对技能的图标、名称、描述、功能等进行审核，以确保其符合扣子商店规范。你可以在扣子站内信中查看上架审核的结果。
:::

### 将技能上架到企业市场 \{#hDrBusFPb\}

企业市场是专为企业打造的内部技能分发中心。对于涉及核心业务逻辑或仅限内部使用的技能，上架到企业市场既能保护知识产权，又能提升内部协作效率。

:::tip 说明
**套餐限制**：仅团队尊享版、企业旗舰版支持将技能上架到企业市场。
:::

#### 步骤一：管理员设置审核策略 \{#hgKCrW9rC\}

默认情况下，成员无需审核即可将技能直接上架到企业市场。企业超级管理员或管理员可以修改此设置，增加上架审核环节。开启审核后，成员提交的技能必须先通过管理员审批，才能成功上架。

:::tip 说明
**角色限制**：企业超级管理员或管理员。
:::

1. 在[扣子](https://www.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)左下角单击个人头像。
2. 找到要访问的企业，并单击**团队与企业管理**。
   你也可以直接访问扣子编程的企业管理页面，此域名默认打开最近一次访问过的企业管理页面。
   ![Image=178x187](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/7ff4f527cf5f4e908162eb4addf9a97d~tplv-goo7wpa0wc-topic.webp)
3. 在左侧导航栏中选择**技能审核管理**。
4. 开启企业技能商店审核。
   * **开启**：成员提交的技能需要由企业超级管理员或管理员审核通过后，才能在企业市场上架。
   * **关闭**：（默认）成员提交的技能将直接上架企业市场，无需审批。
      ![Image=629x197](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/ac21298bcf83450fbda3740312e7cb96~tplv-goo7wpa0wc-topic.webp)      

#### 步骤二：上架到企业市场 \{#hcrDtmBar\}

你可将企业工作空间中你创建的技能上架至企业市场，供企业内部员工发现和使用。

1. 在[扣子](https://space.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)左侧导航栏选择**技能商店**。
2. 在**我的技能** > **我创建的**页签下，选择目标技能。
3. 单击**更多**按钮，选择**上架到企业**。
   ![Image=338x233](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/47a4743d12ad4dd98d8fa08910b78cee~tplv-goo7wpa0wc-topic.webp)
4. 根据页面提示，完成配置。
   关于基础信息与付费设置，请参考上架配置项说明。
   ![Image=278x239](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/2e0b2a0763ca4d0198db29c94ab69e29~tplv-goo7wpa0wc-topic.webp)   

#### 步骤三：管理员审核技能 \{#hN7s8p58K\}

如果开启了企业技能上架审核，员工提交的技能必须由企业超级管理员或管理员审批通过，才能在企业市场上架。审批通过后，该技能将对所有企业员工可见。

:::tip 说明
**角色限制**：企业超级管理员或管理员。
:::

1. 在[扣子](https://space.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)左侧导航栏选择**技能商店**。
2. 在右上角选择**企业管理** > **技能审核管理**。
3. 单击**待审核**标签筛选待审核的技能，在目标技能右侧，你可以查看技能详情、通过或拒绝上架。

### 上架配置项说明 \{#hIRwIIiyP\}

在上架技能过程中，你可以参考如下内容配置技能的基本信息和付费模式。

#### 基础展示信息 \{#hkDKiME3V\}

下表说明了技能各项基本展示信息的配置要求。

| **配置项**  | **说明**  |
| --- | --- |
| **技能名称**  | 为你的技能起一个独特、易记、贴合功能的名称。 | \
| | | \
| | * 支持中英文和数字。 | \
| | * 长度不超过 20 个字符。  |
| **一句话描述**  | 用一句话精准概括技能的核心功能、能解决的问题，最多 200 字。  |
| **封面图**  | 设置技能在商店中展示的封面。  |
| **详细介绍**  | 详细描述技能的功能、使用方法、应用场景和价值。  |
| **分类**  | 为技能选择一个合适的分类，方便用户通过分类浏览时找到它。  |
| **精选案例**  | 提供 3 个在扣子中使用该技能的公开案例链接，以展示技能的实际应用效果。 | \
| | | \
| | 1. 单击➕。 | \
| | 2. 在**任务分享链接**中输入已在扣子中通过该技能生成的案例链接。 | \
| | 3. 输入案例名称，并上传案例配图。 | \
| | 4. 单击**保存**。  |
| **是否开源**  | 选择是否允许其他用户查看你的技能源码并进行复制改造。 | \
| | | \
| | * **开启**：其他用户可以对该技能进行复制改造，进行二次创作。 | \
| | * **关闭**（默认）：不允许其他用户复制改造此技能。  |

#### 付费设置 \{#hGCS8AIXf\}

你可以为技能选择付费模式，用户购买技能后，你将得到对应的收入。

::::tabs
@tab 按次付费
:::tip 说明
* 上架到企业商店时，不支持选择按次付费模式。
* **按次付费**模式根据用户调用你技能中特定的 API 进行计费。每成功调用一次 API，计为一次使用并扣除相应积分。因此，该模式仅适用于**通过调用 API 提供功能**的技能。开发案例，请参考开发“按次付费”技能。
:::

你可以设置技能的付费方式为**按次付费**。用户每调用一次，需支付相应积分。结算技能收入时，系统将按照一定的积分和现金比例，结算给你。

你可以在一个技能中添加多个付费接口，并为每个接口设置不同的价格，具体配置项说明如下：

* **付费接口**：开放给用户付费调用的接口 URL。
   * **URL 格式**：遵循 `\{schema\}://\{domain\}/\{path\}` 格式，例如`https://api.coze.cn/v1/workspaces`。
   * **URL 变量**：如果 URL 中包含变量，需使用 `\{\}` 将其包裹，例如 `https://api.coze.cn/v1/workspaces/\{workspace_id\}/members`。
   * **获取方法**：你需要从技能代码中获取对应的 URL。
      1. 在扣子编程中找到对应的技能
      2. 在文件目录树中展开 `scripts` 目录，然后在 `xxx.py` 代码文件中，找到 `requests` 请求对应的接口 URL 并复制。例如，本案例中为 `\{API_BASE_URL\}/images/generations`，即`https://ark.cn-beijing.volces.com/api/v3/images/generations`。
         ![Image=574x268](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/098b5f00c9674b44a3b0df12a6b3e052~tplv-goo7wpa0wc-topic.webp)
* **接口显示名**：设置一个易于记忆和理解的接口名称。
* **调用单次消耗积分**：设定用户每调用一次这个接口，需要消耗的积分数量。

![Image=353x225](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/6148b9b7ae2d456d8768d052e13d6c22~tplv-goo7wpa0wc-topic.webp)

@tab 一次买断
你可以设置技能的付费方式为**一次买断**并设定对应的**购买方式。​**用户订阅后，可在有效时间内无限次使用该技能。

设定价格时，你需要从系统提供的价格档位中选择一个月度价格。设定后，系统将以此为基础，自动生成更具性价比的**季度价**和**年度价**，以鼓励用户选择更长的订阅周期。

![Image=285x367](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/ccb7352dc17143158866a7ef7a17a121~tplv-goo7wpa0wc-topic.webp)

@tab 免费
设定为**免费**后，用户可以免费使用你的技能。
::::

## 管理我的技能 \{#hJVMvcp83\}

### 分享技能 \{#hBbOhxo4N\}

上架技能商店后，你可以将技能分享给其他用户。

:::tip 说明
技能所有者和普通用户均可分享技能。
:::

1. 在[扣子](https://space.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)左侧导航栏选择**技能商店**。
3. 单击目标技能，在技能详情页左上角单击分享按钮，可以将技能详情页分享给其他人。
   对方打开链接后，可直接通过技能详情页购买或安装该技能。
   ![Image=298x263](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/c08eab2210914d319571bd470ea4eef8~tplv-goo7wpa0wc-topic.webp)   

### 更新上架 \{#hH4fuMRZg\}

在扣子编程更新技能后，您可以将新版本上架至技能商店。更新完成后，所有已安装该技能的用户将自动升级至最新版本。

1. 在[扣子](https://space.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)左侧导航栏选择**技能商店**。
2. 在**我的技能** > **我创建的**页签下，选择目标技能。
3. 单击**更多 (⋮)** 按钮，选择**商店上架管理** > **更新上架技能**或**企业上架管理** > **更新上架技能**。
   ![Image=389x243](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/40ff7351e54743ef992b497c3dc4f4ee~tplv-goo7wpa0wc-topic.webp)   

### 下架技能 \{#hHNnofmcc\}

若技能商店或企业市场中的技能存在问题，或不希望被继续使用，你可以将其下架。

:::tip 说明
技能下架后，用户将无法在技能商店中查找并安装该技能，具体影响如下：

* **付费技能**：付费用户在有效期内仍可正常使用，直至其订阅到期，到期后无法再续费。
* **免费技能**：已安装该技能的用户仍可正常使用。
:::

**操作权限**

技能下架的操作权限要求：

* **技能商店**：仅所有者可下架。
* **企业市场**：技能所有者、企业超级管理员和管理员可下架。

**操作步骤**

::::tabs
@tab 所有者下架技能
1. 在[扣子](https://space.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)左侧导航栏选择**技能商店**。
2. 单击**我的技能**页签，在**我创建的**区域，选择目标技能。
3. 单击**更多 (⋮)** 按钮，选择**商店上架管理** > **下架**或**企业上架管理** > **下架**。
   ![Image=279x233](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/1752230577c14eeb9a832abb0ebd7c61~tplv-goo7wpa0wc-topic.webp)

@tab 管理员下架技能
企业超级管理员或管理员可以下架技能商店或企业市场中，本企业工作空间中上架的任何技能。

1. 在[扣子](https://space.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)左侧导航栏选择**技能商店**。
2. 在右上角选择**企业管理** > **技能审核管理**。
3. 在**已通过**页签中找到要下架的技能，并单击**下架**。
   ![Image=526x179](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/3ac64eed660c439f842adcda390dc3b3~tplv-goo7wpa0wc-topic.webp)
::::

### 移除技能 \{#hbJWkBFOP\}

对于**已下架**的技能，如果后续不再使用，你可以将其从技能列表中移除。

:::tip 说明
删除技能后，该技能将从**我的技能**列表中删除，扣子编程侧对应的技能项目并不会被删除。
:::

1. 在[扣子](https://space.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)左侧导航栏选择**技能商店**。
2. 单击**我的技能**页签，在**我创建的**区域，选择目标技能。
3. 单击**更多 (⋮)** 按钮，选择**删除**。
   ![Image=231x235](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/d58cf2c5ecbd42228a152505d4104332~tplv-goo7wpa0wc-topic.webp)   

## 常见问题 \{#hWuyiauSY\}

* 企业管理员能上架其他员工的技能吗？
* 下架技能对已购买技能有影响吗？
