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
sourceRel: "docs/cozespace_local_agent.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozespace_local_agent.md"
sourceSha256: "ec8028c4afb19d19964ac33e98d88474b987c33e1342bba553de012c0a091dc8"
pageSha256: "ec8028c4afb19d19964ac33e98d88474b987c33e1342bba553de012c0a091dc8"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

如果你已经可以在本地终端中使用 Claude Code、Codex CLI、OpenClaw 或 Hermes，就可以将它**接入扣子**，用扣子进行对话管理和操作。

扣子只提供对话入口，Agent 本身仍运行在你自己电脑上，不会迁移到云端。

## 什么是本地 Agent \{#6883322d\}

在扣子上创建本地 Agent，可以将你电脑上已经安装的 Agent 接入扣子，包括 Claude Code、Codex CLI、Hermes、基于 OpenClaw 开源框架的各类 Agent。接入后，你可以在扣子中直接和它对话，让它处理本机文件、操作本机软件，或读取、修改和运行本地代码项目。

扣子提供对话入口和协作管理，实际任务仍由你电脑上的本地 Agent 执行。你的本地 Agent 不会被迁移到云端。

## 接入后可以做什么？ \{#f3e1e658\}

如果你已经在本地部署 Claude Code、Codex CLI、OpenClaw、Hermes，接入扣子后可以解锁两种新的使用方式：

* **随时随地操作本地 Agent**：原本这些 Agent 部署在本地终端，你需要在电脑前才能使用。接入扣子后，只要终端保持在线，你就可以通过手机给本地 Agent 下指令，在不方便打开电脑时也能推进工作。例如：
   * 出门在外时，用手机让本地 Agent 查看电脑里的 Excel 文件，并帮你提取某个数据。
   * 在路上想到代码问题，让本地 Claude Code 查看本地仓库，定位可能原因。
   * 需要处理本机软件信息时，让本地 Agent 打开浏览器、飞书等应用，完成查询或操作。
* **拉入项目，团队共同指挥本地 Agent**：将本地 Agent 添加到项目后，项目内所有成员均可 **@ 它下达指令**。例如：
   * 开发者在本地通过 Claude Code 开发代码，那么将本地 Claude Code 拉入扣子项目后，产品经理等人员可以直接 @ 它询问开发进展。
   * 一个 Agent 负责编写代码，另一个 Agent 负责审核代码。比如让本地 Codex CLI 完成实现，再让 Claude Code Agent 审查代码，并给出修改建议。

## 怎么接入 \{#d27c5ca1\}

在扣子上接入本地 Agent，需要先让你的设备和扣子建立连接。接入本地 Agent 的核心是在你的电脑上安装并运行一个轻量程序 **coze-bridge**。它负责在扣子和你电脑上的本地 Agent 之间建立连接。coze-bridge 会识别你电脑上已安装并支持接入的 Agent，包括 OpenClaw、Claude Code、Codex CLI、Hermes。连接建立后，你在扣子中发送指令，本地 Agent 会在你的电脑上执行任务，并把结果通过扣子对话返回给你。

本地终端对话和扣子中的对话属于不同的会话，对话内容不同步。

你可以通过如下两种方式接入：

* **终端命令方式**：复制扣子页面提供的连接命令，在终端执行。
* **桌面端方式**：下载扣子桌面端，在接入本地 Agent 时，桌面端会自动在本机执行连接指令。

:::notice 注意
* 为保证本地 Agent 正常在线，请在使用期间保持 coze-bridge 进程运行，并建议开启合盖不休眠。电脑关机、断网、进入休眠状态，或 coze-bridge 进程停止运行，本地 Agent 与扣子的连接会断开。
* 如果断开连接，你可以重新运行连接命令来恢复连接。具体操作，请参考本地 Agent 连接掉线了，怎么处理？。
:::

## 注意事项 \{#hSAXbfyWi\}

在使用本地 Agent 时，需要注意如下事项：

| **分类**  | **说明**  |
| --- | --- |
| Agent 设置  | 如果将本地 Agent 加入项目，相关配置仍需在 **Agent 设置**页面中完成；项目内不提供 Agent 设置入口。  |
| 模型切换  | * 切换模型后，新模型仅对后续新建项目生效，已创建项目中的模型不会同步变更。 | \
| | * 本地 Agent 执行任务过程中，不支持切换模型或运行策略。 | \
| | * 模型和运行策略的可用范围、用量消耗及相关限制，以本地 Agent 对应服务方的规则为准。扣子仅提供配置入口。  |
| 账号和服务方规则  | * 接入扣子本身不会出现 Claude 等账号封号风险，风险主要来自你本地配置的账号、Token、调用方式和使用强度。 | \
| | * 如果本地 Agent 继续使用 Claude、OpenAI、OpenClaw、Hermes 配置，需注意： | \
| |    * 请求仍受原服务方条款、限流、计费和风控影响。 | \
| |    * 多人共享个人账号、代跑账号、高频自动化、长期无人值守批量调用，可能增加风控风险。 | \
| |    * 接入扣子不代表可以规避服务方限制，也不承诺降低封号风险。  |

## 套餐权益 \{#f64b56c1\}

不同套餐支持接入的本地 Agent 数量不同。

| **套餐权益**  | **个人免费版**  | **个人进阶版**  | **个人高阶版**  | **个人旗舰版**  | **个人尊享版**  | **团队高阶版**  | **团队旗舰版**  | **团队尊享版**  | **企业标准版**  | **企业旗舰版**  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 连接本地 Agent 数量  | 1个 | 1个  | 3个  | 10个  | 不限制  | 每个成员3个  | 每个成员10个  | 不限制  | 不限制  | 不限制  | \
| | | | | | | | | | | | \
| | （限时免费）  | | | | | | | | | |

## 前提条件 \{#f112c5a3\}

在接入本地 Agent 前，请先在本地电脑中安装 OpenClaw、Claude Code CLI、Codex CLI 或 Hermes 并完成登录。相关安装说明请参考：

* OpenClaw：请参考 [Install OpenClaw](https://docs.openclaw.ai/zh-CN/install)。
* Claude Code CLI：请参考[Install Claude Code CLI](https://code.claude.com/docs/en/quickstart#step-1-install-claude-code)。
* Codex CLI：请参考[Install Codex CLI](https://developers.openai.com/codex/cli#cli-setup)。
* Hermes：请参考[Install Hermes](https://hermes-agent.nousresearch.com/docs/getting-started/installation)。

## 接入本地 Agent \{#daa3d068\}

你可以参考如下步骤，接入本地 Agent。

::::tabs
@tab 桌面端
1. 在[扣子](https://www.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)的 **Agent 列表**中，单击➕ > **接入本地 Agent**。
   ![Image=311x187](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/1e1ffde7dd0e4622a2c15328de017479~tplv-goo7wpa0wc-topic.webp)
2. 系统自动执行连接操作。
   ![Image=301x144](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/b3d82278c57849ab9ad0c0439e64221f~tplv-goo7wpa0wc-topic.webp)
3. 创建 Agent。
   连接成功后，页面将展示本地设备名称和 ID 等信息，你可以设置 Agent 名称，然后单击**创建 Agent**。
   ![Image=295x244](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/7a217282fa8741659df67a2298fb77f4~tplv-goo7wpa0wc-topic.webp)

@tab 网页端
1. 在[扣子](https://www.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)的 **Agent 列表**中，单击➕ > **接入本地 Agent**。
   ![Image=311x187](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/1e1ffde7dd0e4622a2c15328de017479~tplv-goo7wpa0wc-topic.webp)
2. 单击**复制命令**，复制系统生成的本地连接命令。
   命令中 token 有效期为 60 分钟，请复制后，在 60 分钟内执行命令，完成配对。超过有效期后，请重新生成连接命令。
   ![Image=242x224](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/e5e5a47b570e47e2b4921f642c167cd3~tplv-goo7wpa0wc-topic.webp)
3. 打开本地终端，执行连接命令。
   ![Image=408x128](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/5f2d1737767a4a7e9f6495b433115e89~tplv-goo7wpa0wc-topic.webp)
   回显信息为 **`已配对连接完成，请返回到 coze 平台上点击 "我已执行"`**，则表示执行成功，本地已与扣子云端连接。
4. 返回扣子，单击**已粘贴执行**，系统开始识别本地 Agent。
   ![Image=276x259](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/fe5ed88c838944eb8c706693dc72d2f7~tplv-goo7wpa0wc-topic.webp)
5. 创建 Agent。
   识别成功后，你可以设置 Agent 名称，然后单击**创建 Agent**。
   ![Image=212x234](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/33e42d0cceba4f37a9756cbf7034392f~tplv-goo7wpa0wc-topic.webp)   

创建完成后，你就可以在扣子中与该本地 Agent 对话。

![Image=295x218](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/361b669d37dc46c7a3ef35a6cc384b1e~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
1. 在扣子 App 右上角，单击➕ > **新增 Agent**。
2. 在**新建 Agent** 面板中，单击**接入本地 Agent**。
3. 单击**复制命令**，复制系统生成的本地连接命令。
   命令中 token 有效期为 60 分钟，请复制后，在 60 分钟内执行命令，完成配对。超过有效期后，请重新生成连接命令。
   ![Image=125x241](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/5a65d56552414c83a911b53bcec88a7c~tplv-goo7wpa0wc-topic.webp)
4. 打开本地终端，执行连接命令。
   ![Image=296x93](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/29749465a8324636a1db2c4f54ba0a5c~tplv-goo7wpa0wc-topic.webp)
   回显信息为 **`已配对连接完成，请返回到 coze 平台上点击 "我已执行"`**，则表示执行成功，本地已与扣子云端连接。
5. 返回扣子，单击**已粘贴执行**，系统开始识别本地 Agent。
   ![Image=120x244](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/6b50788cc41249acb2c557a46c6daede~tplv-goo7wpa0wc-topic.webp)
6. 创建 Agent。
   识别成功后，你可以设置 Agent 名称，然后单击**创建 Agent**。创建完成后，你就可以在扣子中与该本地 Agent 对话。
   ![Image=242x244](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/e9773ee4c3b543769406927f3a259179~tplv-goo7wpa0wc-topic.webp)
::::

## 选择授权模式 \{#hnlG19NC1\}

在本地 Agent 的对话输入框中，你可以切换授权模式，用于控制 Agent 在执行任务时是否需要向你确认权限。如果你不确定选择哪种授权模式，建议先使用默认或较低权限模式。只有在你明确希望 Agent 自动执行文件修改、联网访问等操作，并信任当前任务时，再切换到更高权限模式。

Codex CLI、Claude Code 和 Hermes 框架的授权模式说明如下，OpenClaw 不支持在对话框中选择授权模式。

:::tip 说明
授权模式切换仅适用于新建的本地 Agent。历史版本需要升级后才可在对话输入框中选择授权模式，否则默认为最低权限模式 。如何升级，请参考为什么我的本地 Agent 没有授权模式选项？。
:::

| **Agent 框架**  | **授权模式说明**  |
| --- | --- |
| Codex CLI  | * **请求批准**：当 Agent 需要编辑外部文件、访问互联网时，需要先向你确认。未经批准，Agent 不能执行操作。 | \
| | * **替我审批**：Agent 会自动执行常规操作，仅在检测到风险较高的操作时请求确认。 | \
| | * **完全访问权限**：Agent 不受限制，可以访问互联网和编辑你电脑上的任何文件。建议仅在你希望 Codex CLI 拥有完全访问权限时使用。  |
| Claude Code  | * **询问授权**：Agent 仅可以运行预先批准的工具。 | \
| | * **接受编辑**：Agent 可以读取和编辑文件，并自动执行常见文件系统命令，适合反复修改并审查代码的场景。 | \
| | * **跳过权限**：Agent 可以跳过所有权限提示，执行所有操作。建议仅在你希望 Claude Code 拥有完全访问权限时使用。  |
| Hermes  | * **默认**：执行任何文件操作前，都会先询问用户，获得批准后才会继续。 | \
| | * **编辑前询问**：自动允许编辑工作区和 `/tmp` 目录内的文件；涉及敏感路径时，仍会询问用户确认。 | \
| | * **免询问**：本次会话中自动允许所有文件编辑；涉及敏感路径时，仍会询问用户确认。  |

## 切换模型及运行策略 \{#hT6O3tlWL\}

接入本地 Agent 后，对话框中会展示你当前登录账号所支持的模型。你可以直接切换当前会话使用的模型和运行策略。不同本地 Agent 支持的配置可能不同，请以界面展示为准。

你可以执行如下操作：

* 选择当前会话要使用的模型。
* 调整 Agent 的思考程度，例如低、中、高、超高。
* 开启或关闭快速模式。快速模式会优先提升响应速度，但可能增加模型用量。

![Image=290x273](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/417ef37043e342d9b3755768b8986ad7~tplv-goo7wpa0wc-topic.webp)

## 简单使用 \{#ec060ee4\}

接入本地 Agent 后，你可以直接在扣子中使用对应的本地 Agent，并用自然语言描述你想完成的任务。

### 团队共用 Claude \{#726526a0\}

在扣子项目中，所有成员可以共用一个本地 Claude，协助完成任务。例如开发者在本地通过 Claude Code 开发代码，那么将本地 Claude Code 拉入扣子项目后，产品经理、测试、运营等其他成员，可以直接在项目会话里 **@ 它**，询问开发进展、了解功能状态。

示例指令

```Markdown
博客网页这个项目开发完成了吗？你是基于什么语言开发的？
```

![Image=653x279](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/5232252dafb94c029d5147a23db374e5~tplv-goo7wpa0wc-topic.webp)

### 远程任务 \{#60f35f8c\}

当你不在电脑旁边，但需要使用本地 Claude Agent 帮你生成图片时，可以通过扣子远程下达指令。只要本地终端保持在线，本地 Claude Agent 就可以继续在你的电脑环境中执行任务。

例如，你在手机上想到一张运营配图创意，可以直接在扣子里 @ 本地 Claude Agent，让它根据你的描述生成图片，而不需要回到电脑前操作。

```Plain Text
请帮我生成一张小红书封面图，主题是“春季护肤新品”，风格清新明亮，画面中包含护肤品、花朵和浅色背景。帮忙发送到群里。
```

![Image=368x362](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/87e2013d964541eca57bc291e22ad6a5~tplv-goo7wpa0wc-topic.webp)

## 常见问题 \{#f0d2679b\}

* 什么是终端？
* 出现 npm not found、npx not found 错误，怎么处理？
* 本地 Agent 连接掉线了，怎么处理？
* 本地能接入的 Agent 类型包括哪些？
* 支持接入本地的 Hermes 吗？
* 创建 Agent 之后如何查看 Agent 类型？
* 接入本地 Agent 有数量限制吗？
