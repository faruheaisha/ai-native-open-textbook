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
sourceRel: "docs/appshot.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/appshot.md"
sourceSha256: "165eec6bd763841b6d8b605e804da9266c0bb371a524c45a0cdf5ecad4562ac6"
pageSha256: "165eec6bd763841b6d8b605e804da9266c0bb371a524c45a0cdf5ecad4562ac6"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

使用深度截图，可以将其他应用的窗口画面和可读取文本快速添加到扣子对话。遇到报错、复杂页面或难以描述的界面时，无需手动截图和复制文字，按下快捷键即可开始提问。

## 关于深度截图 \{#hWkP1LfH6\}

深度截图会截取当前位于最前方的应用窗口，并在目标应用允许时，同时获取窗口中的可读取文本。截图和文本会作为附件添加到当前对话的输入框，你可以补充问题、检查附件，然后再将其发送给你的 Agent 查看。

深度截图截取的范围：

* 深度截图优先截取最前方的窗口。如果窗口无法截取，则会截取鼠标所在的屏幕。
* 使用多台显示器时，只截取其中一个屏幕，不会拼接所有屏幕。
* 除窗口画面外，深度截图还会尝试读取应用提供给系统的文本，其中可能包含当前屏幕上没有显示的内容。实际可读取的内容由系统和目标应用决定，部分应用或网页可能只能获取截图。

你可以在这些场景中使用深度截图：

* 遇到报错信息，请扣子分析原因并给出解决方法。
* 看到需要调整的界面，请扣子提出修改建议。
* 阅读文档或网页时，请扣子总结、解释或整理内容。
* 打开设置页面时，请扣子告诉你下一步如何操作。

:::tip 说明
* 目前仅扣子桌面端支持深度截图。
* **默认快捷键**：macOS 默认同时按下左右两个 **Option（⌥）** 键；Windows 默认为 **Ctrl + Alt + A**。
:::

## 权限与隐私说明 \{#hBmBG7Xnx\}

在 macOS 上，深度截图需要以下两项系统权限：

* **屏幕录制：​**用于截取当前窗口或屏幕画面。
* **辅助功能：​**用于读取窗口中的可用文本，并支持使用左右 Option 键唤起深度截图。

Windows 无需提前授予以上系统权限。

:::tip 说明
* 截取前，请确认窗口中没有不希望分享的敏感内容。附件添加到输入框后可能在发送前开始上传，请先检查图片和文本，再发送给扣子。
* 深度截图不会读取后台窗口、剪贴板或键盘输入记录，也不会将密码框和安全输入内容添加到文本附件。
:::

## 开启深度截图 \{#hPc5yxs1x\}

1. 打开扣子桌面端，进入**系统设置 → 应用和权限管理**。
2. 打开**深度截图**开关。
3. 在 macOS 上，按照提示开启**屏幕录制**和**辅助功能**权限。
4. （可选）根据页面提示，设置快捷键。
   如果快捷键已被占用或不符合要求，请根据提示更换后重试。
5. 点击**立即开启**。
   如果系统提示重启扣子，请重启后继续设置。
   ![Image=333x195](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/09e00cc042a14ce09079dab0f51ec1e4~tplv-goo7wpa0wc-topic.webp)   

## 使用深度截图 \{#hAim3q9lK\}

1. 在扣子中打开你和 Agent 的对话。
2. 切换到需要截取的应用，将目标窗口置于最前方。
3. 按下深度截图快捷键。
   macOS 默认同时按下左右两个 **Option（⌥）** 键；Windows 默认为 **Ctrl + Alt + A**。
4. 截取完成后，扣子会回到前台，并将图片和可读取文本添加到原对话的输入框。
5. 检查附件，输入你的问题，然后点击发送。
   例如，你可以继续输入：
   * “帮我分析这个报错，并告诉我怎么解决。”
   * “总结这个页面的主要内容。”
   * “这个界面有哪些可以改进的地方？”
      深度截图不会覆盖输入框中已有的文字，也不会自动发送。发送前，你可以预览或删除附件。如果没有获取到可读取文本，只会添加图片，你仍然可以正常提问。
      ![Image=229x152](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/c817462d517f4945b23f230e92e74d1d~tplv-goo7wpa0wc-topic.webp)      

## 常见问题 \{#hgnD1wjIc\}

* 深度截图和普通截图有什么区别？
* 如何修改快捷键？
* 按下快捷键没有反应？
