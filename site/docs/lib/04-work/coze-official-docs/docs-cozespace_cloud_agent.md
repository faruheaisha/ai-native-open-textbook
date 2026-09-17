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
sourceRel: "docs/cozespace_cloud_agent.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozespace_cloud_agent.md"
sourceSha256: "7ca6008cebc3f9a9b3014d61fbdd8cb3f62fe167a63af8e63a154de4342413f1"
pageSha256: "7ca6008cebc3f9a9b3014d61fbdd8cb3f62fe167a63af8e63a154de4342413f1"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

三方精选 Agent 运行在扣子提供的云电脑中，与你的本地设备完全隔离。你无需安装任何软件、配置环境或解决网络问题，在扣子中选择框架、创建 Agent，通过自然语言下达任务即可。

:::tip 说明
在团队版和企业版中，企业超级管理员可以通过**功能访问控制**和**空间资源可见性**，控制成员可见的功能入口和空间资源范围。如果你未看到预期的功能和资源，请联系企业超级管理员确认。更多信息，请参考功能访问控制和空间资源访问控制。
:::

## 什么是三方精选 Agent \{#f74c9907\}

扣子三方精选 Agent 是基于主流 AI 框架构建、运行在扣子提供的云电脑中的 Agent，支持扣子原生 Agent、OpenClaw、Claude Code、Codex CLI、Hermes 框架。三方精选 Agent 不依赖本地电脑在线，适合长任务、自动化和值守等场景。

不同框架创建的三方精选 Agent 都具备通用的 AI 能力，例如理解需求、生成内容、处理文件、编写代码和执行任务。它们的区别不在于"能不能做"，而在于各自更擅长的任务类型、工具生态和使用体验——选择合适的框架，能让 Agent 在对应场景中发挥最大价值。框架介绍如下：

| **框架**  | **简介**  |
| --- | --- |
| 扣子 Agent  | 基于行业模板一键创建，内置专业技能包。无需任何技术背景，选择模板即可得到一个开箱即用的行业专家 Agent。 | \
| | | \
| | 包括投资理财顾问、小红书创作达人、公众号创作达人、数据分析等模板。  |
| OpenClaw  | 开源社区驱动的强大个人助理，支持自定义插件与灵活拓展。  |
| Claude Code  | 基于 Anthropic Claude Code 框架构建，仅使用其框架能力，未绑定 Anthropic 账号或模型，搭配扣子提供的大模型运行。 | \
| | | \
| | 命令行编程智能体，擅长理解代码库、编辑文件和处理复杂开发任务。  |
| Codex CLI  | 基于 OpenAI Codex CLI 框架构建，仅使用其框架能力，未绑定 OpenAI 账号或模型，搭配扣子提供的大模型运行。 | \
| | | \
| | 可以在本地终端运行的编程智能体，能够在指定目录中读取、修改和运行你机器上的代码。  |
| Hermes  | 带长期记忆和技能沉淀的自进化 Agent，能够在持续任务中沉淀经验、生成技能，并在后续任务中复用已有经验。 | \
| | | \
| | Hermes 更适合持续任务、长期记忆、经验沉淀和技能生成场景。  |

## 何时创建三方精选 Agent \{#ea010909\}

如果你熟悉某个主流 AI 框架（如 Claude Code、Codex CLI、OpenClaw、Hermes），或者听说过它们但一直因为环境配置复杂而没有上手，那么你可以通过扣子的三方精选 Agent，快速上手体验。你无需在本地安装任何依赖，也无需处理网络和账号问题，直接在扣子中选择对应框架创建即可。

## 套餐权益 \{#b922ec88\}

个人免费版、个人进阶版不支持创建三方精选 Agent，升级订阅套餐即可解锁该功能。

| **套餐权益**  | **个人免费版**  | **个人进阶版**  | **个人高阶版**  | **个人旗舰版**  | **个人尊享版**  | **团队高阶版**  | **团队旗舰版**  | **团队尊享版**  | **企业标准版**  | **企业旗舰版**  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 创建三方精选 Agent  | ➖  | ➖  | ✔️  | ✔️  | ✔️  | ✔️  | ✔️  | ✔️  | ✔️  | ✔️  |

## 创建步骤 \{#65c132e8\}

你可以参考如下步骤，创建三方精选 Agent。

:::warning 注意
三方精选 Agent 依赖创建时选择的云电脑。云电脑更改使用者后，部署在该设备上的 Claude Code、Codex CLI、OpenClaw 等 Agent 将无法继续使用，也不能自动恢复。更改使用者前，请先导出需要保留的数据。
:::

::::tabs
@tab 网页端、桌面端
1. 在[扣子](https://www.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)的对话列表中，单击➕ > **新增 Agent**。
2. 在**新建 Agent** 面板中，单击**新建三方精选 Agent**。
3. 选择 Agent 框架，填写 Agent 名称以及部署机器。
   1. 选择你要使用的三方精选 Agent 框架。
   2. 填写 Agent 名称和描述。
   3. 选择一台云电脑，用于部署 Agent。
      必须创建一台云电脑。支持多个 Agent 部署在同一台云电脑上。
   4. 单击**创建并部署**。
4. 等待创建后，你可以与对应的 Agent 对话。
   ![Image=256x231](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/7e7777b4f8df4602ae64d4a4ab5d8c2e~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
1. 在扣子 App 顶部，单击➕ > **新增 Agent**。
2. 在**新建 Agent** 面板中，单击**新建三方精选 Agent**。
3. 选择 Agent 框架，填写 Agent 名称以及部署机器。
   1. 选择你要使用的云端 Agent 框架。
   2. 填写 Agent 名称和描述。
   3. 选择一台云电脑，用于部署 Agent。
      三方框架必须选择一台云电脑。支持多个 Agent 部署在同一台云电脑上。
   4. 单击**创建Agent**。
4. 等待创建后，你可以与对应的 Agent 对话。
   ![Image=158x320](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/9a3c4c2f88574aef83e49bd2f6b9945e~tplv-goo7wpa0wc-topic.webp)
::::

## 简单使用 \{#78ee4355\}

创建完成后，你可以直接在对话中通过自然语言下达任务。

### 使用扣子 Agent：AI 自媒体助手 \{#72250bd5\}

你可以基于行业模板创建扣子 Agent，例如选择“小红书创作达人”模板，创建一个专业的 AI 自媒体助手。

示例指令如下：

```Markdown
我是一个小红书童书博主，请帮我搜寻今天小学生儿童文学主题的热门榜单，然后输出 10 个适合发布的小红书选题，每个选题包含标题、内容角度和推荐封面文案。
```

Agent 会结合模板内置能力，自动完成热点检索、选题分析和文案生成，适合运营策划、内容创作等场景。

::::tabs
@tab 网页端、桌面端
* 创建 Agent
   ![Image=342x297](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/49a446748f3c42b281ee7ed584de08f4~tplv-goo7wpa0wc-topic.webp)
* 执行任务
   ![Image=359x272](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/e8b78dc183fd475f85466584e1e07c17~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
* 创建Agent
   ![Image=148x295](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/ae36c404ab5744ce83213d3e92135236~tplv-goo7wpa0wc-topic.webp)
* 执行任务
   ![Image=165x314](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/72b02616e1b540d1b694227efecff344~tplv-goo7wpa0wc-topic.webp)
::::

### 使用 Claude Code ：开发一个 Web 应用 \{#e98a3bbc\}

创建一个基于 Claude Code 框架的三方精选 Agent，用于开发编程项目。

```Markdown
开发一个单词学习应用
```

Claude Code Agent 在开发过程中，会读取环境、搭建项目结构、逐步编写前后端代码、运行调试，每个关键节点会告知进度并请求确认。

::::tabs
@tab 网页端、桌面端
* 开发过程
   ![Image=378x305](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/38a5c6bd0ec74e5898bb13554d1728dd~tplv-goo7wpa0wc-topic.webp)
* 开发结果
   在云电脑中打开网页应用。
   ![Image=362x266](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/ffe61e275f564cbfbecfc77bd1364c62~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
![Image=170x352](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/38f692b8f3db47a887d78bbed04516e8~tplv-goo7wpa0wc-topic.webp)
::::

### 使用 OpenClaw：处理文件 \{#7ffef059\}

创建一个基于 OpenClaw 框架运行的 Agent，OpenClaw 可以在部署的云电脑上自动执行文件读写、数据处理等操作，全程无需你手动操作。

```Markdown
在云电脑桌面上创建日报文件夹，创建今天的日报文件，并且将今日的 AI 日报写入文件中
```

::::tabs
@tab 网页端、桌面端
* OpenClaw 指令
   ![Image=358x276](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/ade7d0179f3341fca688979fd474677e~tplv-goo7wpa0wc-topic.webp)
* 执行结果
   ![Image=390x246](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/5a70cca66f4f43f69e96eeef13fd1545~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
* OpenClaw 指令
   ![Image=149x304](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/c043e13fe43c41a6898759b292c578f8~tplv-goo7wpa0wc-topic.webp)
* 执行结果
   ![Image=139x286](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/b2091de7e69449ffa9b4c125be56980f~tplv-goo7wpa0wc-topic.webp)
::::

## 恢复初始设置 \{#afc7c91d\}

除扣子原生 Agent 之外的其他三方精选 Agent （OpenClaw、Claude Code、Codex CLI ），支持一键恢复初始设置。已有安装的技能、文件等数据不会清除。

::::tabs
@tab 网页端、桌面端
1. 在 Agent 页面的右上角，单击 **Agent 设置**图标。
2. 单击**恢复初始化设置**图标，然后单击**确认**。
   ![Image=432x354](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/7b8e65b13cf74caf94508425e2763e7b~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
1. 在 Agent 页面，单击 **Agent 名称**。
2. 单击 **···**> **恢复初始配置**，然后单击**确认**。
   ![Image=338x351](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/264035b633df468b8fa81bebeedddb7a~tplv-goo7wpa0wc-topic.webp)
::::

## 常见问题 \{#485d1ae0\}

* 三方精选 Claude Code、Codex CLI、OpenClaw 与原生版本有什么区别？
* 我可以通过三方精选 Agent 登录自己的 Claude 账号吗？
* 三方精选 Claude Code Agent 是否需要我有 Anthropic Claude 账号？
* 三方精选 Agent 使用的是 Claude、OpenAI 的模型吗？ 
* 三方精选 Codex CLI Agent 是否需要 OpenAI 账号或 API Key？ 
* 三方精选 Agent 会访问我本地电脑的文件或系统吗？
* 创建三方精选 Agent 时，我需要在本地安装任何软件或配置环境吗？
* 创建 Agent 之后如何查看 Agent 类型？
