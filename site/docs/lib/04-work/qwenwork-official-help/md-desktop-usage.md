---
title: "千问办公官方帮助中心（阿里云）"
sourceId: "04-work/qwenwork-official-help"
sourceTitle: "千问办公官方帮助中心（阿里云）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: ""
entryUrl: null
sourceRel: "md/desktop-usage.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/desktop-usage.md"
sourceSha256: "da06995810a65ecc6ace4765a28c8856f64b0686499f9a1ff53ac116ca041aa6"
pageSha256: "da06995810a65ecc6ace4765a28c8856f64b0686499f9a1ff53ac116ca041aa6"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

千问办公桌面客户端是一款本地运行的应用，更像一位真正能"把活干完"的 AI 队友，而不只是聊天工具。这篇指南会带你走完一遍完整流程：下载安装、登录账号、熟悉工作界面，最后亲手提交第一个任务。

读完这一页，你的电脑上会有一个可用的客户端、一个登录好的账户，以及一项正在本地运行的真实任务。

## 1. 下载客户端
访问官网下载页 [qwenwork.cn/download](https://qwenwork.cn/download)，点击对应你系统的 macOS 或 Windows 按钮下载安装包。

目前支持两个平台：

* macOS 14 及以上，同时兼容 Apple Silicon 和 Intel 芯片。

* Windows 10 及以上，仅 64 位版本。

**说明**

请确认磁盘空间至少 500 MB，并保持网络稳定------客户端在使用过程中会从云端拉取模型、技能与连接器。

### macOS

下载完成后，双击 `.dmg` 文件，将客户端图标拖入 Applications 文件夹。等待拷贝结束后弹出磁盘映像，然后从启动台或 `/Applications` 启动应用。

首次启动时，Gatekeeper 可能会拦截并提示"无法打开，因为 Apple 无法检查其是否包含恶意软件"。打开「系统设置 → 隐私与安全性」，下拉到底部找到对应的提示，点击「仍然打开」即可。这一步只会出现一次。

### Windows

运行 `.exe` 安装包，按默认选项一路下一步即可。安装完成后，可以在开始菜单和桌面找到快捷方式。

如果 Windows Defender SmartScreen 弹出"Windows 已保护你的电脑"提示，点击「更多信息 → 仍要运行」即可继续安装。

## 2. 登录账号
首次启动客户端时，会出现欢迎页提示你登录。左侧是「登录/注册」按钮、语言切换，以及用于配置代理的「网络设置」入口；右侧展示产品标语。

![桌面端使用链路操作截图](https://g-adoc.alcasset.com/sync/maas_docs/qwenwork-cn/master/cn/media/zh/images/qwenwork-upstream-97f751ebe7e51fe5_295cca54ba29.png)

点击「登录/注册」在浏览器中完成认证，回到客户端后会自动进入主界面。已登录用户则会直接跳过这一步，本机的历史任务也会被自动恢复。  
**说明**

历史任务保存在本地设备，不会跨设备同步。换一台电脑登录，不会看到此前在其他设备上的历史任务。

## 3. 认识工作界面
主窗口由两部分组成：左侧是垂直的导航侧边栏，右侧是承载对话、任务监控和产物的工作区。

![桌面端使用链路操作截图](https://g-adoc.alcasset.com/sync/maas_docs/qwenwork-cn/master/cn/media/zh/images/qwenwork-upstream-67b54673b85e2e27_295cca54ba29.png)

侧边栏自上而下集中了高频入口：新任务、扩展（专家套件 / 技能 / 连接器）、定时任务、IM 频道，以及任务 / 频道历史的切换；左下角是账户区域和设置齿轮。

## 4. 跑通第一个任务
万事俱备，下面就来让客户端真正干一件活。

1. **新建任务**

   点击侧边栏中的「新任务」，进入任务编辑界面。界面是一个干净的画布，主标题写着"不止聊天，搞定一切"，下方是一个输入框。
2. **描述需求并发起**

   第一次跑任务，保持默认的「通用工作台 + 标准模型」就够用，用一段以"想要什么结果"为出发点的描述，按下回车。例如：  
   **说明**

   帮我调研一下目前市面上的 AI 桌面助手产品，包括 QwenWork、Cursor、Windsurf、GitHub Copilot。分别整理每个产品的核心功能、定价模式和目标用户。汇总成一张对比表格，并导出为 Excel 文件。

   ![桌面端使用链路操作截图](https://g-adoc.alcasset.com/sync/maas_docs/qwenwork-cn/master/cn/media/zh/images/qwenwork-upstream-54fe9aee9c1fc16f_295cca54ba29.png)

   从这一刻起，你只需要观察、回答澄清问题、收取产物，不用自己操心每一步该怎么做。
3. **回答澄清问题（视情况而定）**

   遇到复杂或不够明确的需求时，客户端不会立刻动手，而是先抛出一两个澄清问题，例如"是否需要把其他同类开源产品也包含进来？""价格用美元还是本地货币？"。先花十几秒澄清，能省掉之后大段的返工。直接在同一个对话里回答即可，回复送达后任务正式开始。如果需求本身已经足够清晰，这一步会自动跳过。
4. **查看任务监控**

   任务执行过程中，工作区会一分为二：左侧仍是对话，展示 AI 的解释和阶段性回复；右侧的「任务监控」会实时显示真正的执行内容------任务计划、产物、当下使用的技能 \& MCP 服务。

   ![桌面端使用链路操作截图](https://g-adoc.alcasset.com/sync/maas_docs/qwenwork-cn/master/cn/media/zh/images/qwenwork-upstream-45fc2e6a797ebb78_295cca54ba29.png)

   一切都是透明的------你看到的不只是答案，而是客户端是怎么得到这个答案的。如果中途发现方向不对，直接在对话里追加一句话即可------它会排入队列，等当前这一轮结束后接着执行，完整上下文会被保留，不必从头再来。
5. **收取产物**

   任务结束后，客户端会同时给你两件东西：一段在对话里的总结，说明它都做了什么；以及一个或多个「产物」------具体的可下载文件，比如这次要的 Excel 表格。产物是真实的本地文件，直接创建并保存在你电脑上，可随时打开、编辑或转移。

   ![桌面端使用链路操作截图](https://g-adoc.alcasset.com/sync/maas_docs/qwenwork-cn/master/cn/media/zh/images/qwenwork-upstream-534e42799373e3a5_295cca54ba29.png)

   点击产物卡片可以直接预览或下载。产物会一直附着在这个任务上，之后从侧边栏的「任务」能找回来。

   对结果不满意？不用重来，直接在同一个对话里继续说就行，比如"按价格从低到高排序"或"再加一列免费版的额度限制"。客户端会基于完整的任务上下文继续修改产物，迭代效率非常高。

## 三个需要记住的概念
下面这三个词会贯穿整个产品。理解了它们，你看客户端的任何界面都会清楚很多。
<table> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <thead> <tr> <td><p><b>概念</b></p></td> <td><p><b>含义</b></p></td> <td><p><b>出现在哪里</b></p></td> </tr> </thead> <tbody> <tr> <td><p>澄清（Clarification）</p></td> <td><p>任务开始前的简短确认，用来对齐模糊的需求</p></td> <td><p>对话中，刚提交任务之后</p></td> </tr> <tr> <td><p>任务监控（Task Monitor）</p></td> <td><p>实时展示计划、工具调用、使用的技能和被操作文件的执行面板</p></td> <td><p>任务运行时，工作区右侧</p></td> </tr> <tr> <td><p>产物（Artifacts）</p></td> <td><p>任务输出的具体文件------表格、幻灯片、报告、代码等</p></td> <td><p>任务结束后的对话区，以及历史任务列表中</p></td> </tr> </tbody> </table>

## 下一步
### 桌面端核心功能

了解系统设置、电脑操控、Hooks 等桌面端专属能力

### 定时任务

让任务按周期在本地自动运行
