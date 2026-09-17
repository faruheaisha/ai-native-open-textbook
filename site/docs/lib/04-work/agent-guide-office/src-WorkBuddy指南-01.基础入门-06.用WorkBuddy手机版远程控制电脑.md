---
title: "WorkBuddy 手机版怎么用？远程控制电脑完成任务"
sourceId: "04-work/agent-guide-office"
sourceTitle: "Agent 办公实战指南（社区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/tangshiyegit/agent-guide"
entryUrl: "https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/src/WorkBuddy指南/01.基础入门/06.用WorkBuddy手机版远程控制电脑.md"
sourceRel: "src/WorkBuddy指南/01.基础入门/06.用WorkBuddy手机版远程控制电脑.md"
rawUrl: "/raw/04-work/agent-guide-office/src/WorkBuddy指南/01.基础入门/06.用WorkBuddy手机版远程控制电脑.md"
sourceSha256: "ed57b6cbcaba6649f6d906faf6a1b0cdc149722c83d8cfe10ffb2702bdb9952d"
pageSha256: "ed57b6cbcaba6649f6d906faf6a1b0cdc149722c83d8cfe10ffb2702bdb9952d"
contentMode: "local-full"
zh: ""
---

# WorkBuddy 手机版怎么用？远程控制电脑完成任务

人已经离开工位，才想起电脑里还有一份文件没发，这时可以用 WorkBuddy 手机版给电脑端派任务。

手机只是远程入口。

指令从手机发出，查找文件和执行任务的仍是电脑端，所以使用前要先把电脑准备好。

## 远程连接前，先检查两个条件

手机远程有两个前提。

第一，电脑端已经打开锁屏远程。这样离开工位并锁屏以后，WorkBuddy 仍能接收任务。

第二，电脑要保持开机，WorkBuddy 也要处于运行状态。关机、休眠或者退出 WorkBuddy，都会让手机端失去执行环境。

如果任务需要调用连接器，也要提前在电脑端完成授权，避免远程执行时卡在登录或权限确认上。

## 把电脑端和微信助理绑定

进入 WorkBuddy 的助理页面，打开远程相关开关。

页面会出现小程序二维码，用微信扫码并授权登录。

![image-20260805171329943](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122732Z-089ec40dae3a01d7-c56d7079.jpg)

找到微信助理集成配置项，点击配置，再按照页面提示扫码，就能把当前电脑和手机微信绑定起来。

![image-20260805171428067](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122734Z-12d6063a431025c0-ed792ae9.jpg)

显示已连接后，可以先发一个简单任务，确认消息能够正常送达。

## 从手机查找并接收文件

比如，我想拿到桌面上的商品销售明细表格，可以在手机端这样说。

> 帮我把桌面上的商品销售明细表格发送给我。

![image-20260805172015883](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122733Z-b6e84b0d91f62b80-4a76bf4c.jpg)

指令发出后，桌面版 WorkBuddy 会开始查找，稍后把符合要求的表格发送到手机端。

![image-20260805171843646](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122733Z-2b0fc6536d00582d-8b49d422.jpg)

收到文件后，再核对文件名并尝试打开。

若一直没有结果，先检查电脑是否在线、WorkBuddy 是否仍在运行，再确认文件是不是放在指定位置。

## 远程任务要写得具体

远程控制适合目标清楚、范围有限的任务，比如查找并发送一份已有文件。

指令里最好写明查找位置、准确文件名、允许执行的动作，以及找不到时怎样处理。

涉及删除、覆盖或批量移动文件时要谨慎。

能加上不删除、不覆盖、不修改原文件，就提前写清楚。

发送敏感资料前，也要确认当前会话和接收对象。

远程功能让人离开电脑后，仍能调用本机文件完成任务。

不过，实际执行始终依赖电脑持续开机和 WorkBuddy 正常运行，关机状态下的小程序不能充当云端执行环境。

## 相关阅读

- [WorkBuddy 是什么？核心功能与入门方法](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/getting-started/01-work-buddy.html)
- [WorkBuddy 自动化任务设置方法](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/getting-started/07-work-buddy-automation.html)
- [WorkBuddy 文件处理教程](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/office-productivity/05-work-buddy-file-management.html)
- [查看完整 WorkBuddy 教程目录](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/README.md)
