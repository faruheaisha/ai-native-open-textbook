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
sourceRel: "docs/agent-permissions.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/agent-permissions.md"
sourceSha256: "19c21bbeef4d8737e394bf65783abe8fdb3c1b6d1547479a9c6d8110852485df"
pageSha256: "19c21bbeef4d8737e394bf65783abe8fdb3c1b6d1547479a9c6d8110852485df"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

你可以配置本地工作目录、Shell 命令、电脑操控、内置浏览器和本机免操作确认等权限，控制 Agent 在工作范围和操作权限。

## Shell 权限 \{#hgktRsbfo\}

你可以在**桌面端设置**的**Shell 权限**区域配置命令白名单。白名单中的命令可以由 Agent 直接执行，不需要你每次确认，也不会受到沙箱保护。你可以把常用且可信的基础命令加入白名单，例如查看文件、读取目录等。这样 Agent 处理本地任务时会更顺畅，减少反复确认。

请仅添加你信任的命令。

![Image=321x195](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/49d5532ebf8e4ba2979e0dedb219db0d~tplv-goo7wpa0wc-topic.webp)

## 电脑操控 \{#hTTm9DjuB\}

:::tip
* 电脑操控是一项实验特性，功能和体验仍在持续优化中，使用过程中可能出现不稳定或行为调整。
* 使用过程中，请避免展示密码、支付信息、隐私页面等敏感内容。
* 电脑操控目前为限时免费体验。
:::

在桌面端开启电脑操控后，Agent 可以在你的授权范围内查看屏幕并操作本机应用。例如点击按钮、输入内容、切换窗口，帮助你完成需要桌面交互的任务。你可以随时停止操作。

开启电脑操控前，你需要授权以下能力：

* 辅助功能：允许 Agent 帮你点击、输入和切换窗口。
* 屏幕录制：允许 Agent 查看屏幕，理解当前操作环境。

## 内置浏览器 \{#huOPlhohH\}

当你需要在对话中打开网页链接，或让 Agent 帮你操作网站时，可以在桌面端使用内置浏览器。

你可以在**桌面端设置**的**内置浏览器**区域，完成相关配置。

* **使用内置浏览器打开链接**：开启后，对话中的网页链接会在当前对话的的内置浏览器中打开；关闭后，会使用云端电脑的浏览器打开。
   ::::cols
   @col 50
   开启后的效果
   
   ![Image=2246x1598](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/b8da278bbbc04c47ba769c7dffa74f88~tplv-goo7wpa0wc-raw.image)
   
   @col 50
   关闭后的效果
   
   ![Image=2036x1596](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/025be6a14fe045f9945365120d58a20d~tplv-goo7wpa0wc-raw.image)
   ::::   

* **允许 Agent 使用内置浏览器**：开启后，Agent 可以使用内置浏览器访问网页和执行操作，例如打开页面、读取内容、点击按钮、填写表单等。关闭后，Agent 无法继续使用内置浏览器，正在进行的网页操作也会停止。
* **站点黑名单**：如果你不希望 Agent 访问某些网站，可以在**站点黑名单**中输入网址，将这些网站加入黑名单。
* **从系统浏览器导入登录状态**：将你本地系统浏览器的登录状态一次性导入内置浏览器。导入后，内置浏览器可以复用这些登录状态，减少重复登录。不会导入密码、书签或浏览记录，也不会上传到云端。
   网站登录状态属于敏感数据。导入时，系统可能请求访问浏览器的本地安全存储，该权限仅用于读取本机数据。无法兼容的数据会自动跳过。
* **清除浏览数据**：你可以清除当前账号在内置浏览器中的网站数据、缓存和站点授权。清除后，相关网站可能需要重新登录或重新授权。

## 本机免操作确认 \{#hk3omCTw2\}

在网页端创建 Agent 后，默认运行在云端环境中。安装并登录扣子桌面端后，你可以将运行环境切换为**本地电脑**。切换后，系统会在本地电脑的 `~/Coze/Drive` 目录中同步生成 Agent 工作目录。

如果你是在桌面端创建 Agent，则默认运行在**本地电脑**上。

选择运行环境为**本地电脑**后，你可以开启**本机免操作确认**。开启后，Agent 在这台电脑上执行已支持的本机操作时，将不再逐次向你确认，可以减少任务执行过程中的打断。

**生效范围**：本机免操作确认仅对**你的账号 × 当前电脑**生效。

**注意事项**：

* 高风险操作仍然需要你确认。
* 系统隐私权限不受该设置影响，仍需按系统要求授权。
* 建议仅在你信任当前设备，且任务需要连续执行本机操作时开启。
* 如果只是临时使用本地环境，或不希望 Agent 自动执行本机操作，可以保持关闭。

![Image=299x244](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/e81fec51dfd9424bb2684125823968c6~tplv-goo7wpa0wc-topic.webp)

## 本地工作目录 \{#hKSsaRmIs\}

扣子项目默认使用云盘文件夹作为工作目录，用来存放项目中的资料、文件和生成产物。现在，创建项目时也支持选择你电脑上的本地目录作为工作目录。选择本地目录后，项目里的 Agent 可以围绕这个目录读取、分析、编辑文件，并将生成结果保存到这个目录中，无需先把文件上传到云端。

更多信息，请参考[本地工作目录](https://docs.coze.cn/local-project)。
