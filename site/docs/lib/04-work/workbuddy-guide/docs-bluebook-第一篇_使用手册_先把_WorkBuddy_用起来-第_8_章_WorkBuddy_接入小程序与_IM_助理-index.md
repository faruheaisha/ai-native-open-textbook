---
title: "第 8 章 WorkBuddy 接入小程序与 IM 助理"
sourceId: "04-work/workbuddy-guide"
sourceTitle: "WorkBuddyGuide（蓝皮书 + 社区案例集）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/AlephAITech/WorkBuddyGuide"
entryUrl: "https://github.com/AlephAITech/WorkBuddyGuide/blob/814ec835e9dae4a89da368fe208425ff50e121fe/README.md"
zh: ""
---

# 第 8 章 WorkBuddy 接入小程序与 IM 助理

## 小程序的两种模式

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/001_image_Vv5bbtLVBo.png)

| 模式 | 任务在哪里运行 | 是否依赖电脑在线 | 适合任务 |
|-|-|-|-|
| 本机模式 | 已连接的电脑 | 是 | 本地文件、本地 Skill、已有工作区 |
| 云端模式 | 隔离的云端环境 | 否 | 调研、写作、临时分析、并行任务 |

**首次使用**

1. 通过官方入口打开 WorkBuddy 小程序并登录；
2. 查看当前处于本机还是云端模式；
3. 本机模式下确认目标电脑在线且连接正确；

## IM 助理的工作链路

```mermaid
sequenceDiagram
    participant U as 手机 IM
    participant B as 应用机器人
    participant W as WorkBuddy 助理
    participant P as 本机工作区
    U->>B: 发送任务
    B->>W: 回调或长连接传递消息
    W->>P: 在授权目录执行
    P-->>W: 产物与状态
    W-->>B: 返回结果
    B-->>U: 手机查看与确认
```

## 接入微信助理：扫码绑定即可

1. 打开 WorkBuddy，在左侧“助理”栏点击齿轮，进入“助理设置”；

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/002_微信助理-进入助理设置_NbI2b9v4fo.png)

2. 找到“微信助理集成”，点击“配置”；

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/003_微信助理-选择集成_S9HlbaEmdo.png)

3. 等待绑定二维码生成，用手机微信扫码；

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/004_微信助理-扫码绑定_TElmbNPG5o.png)

4. 卡片显示“已绑定”后，先发送一条只读测试指令；

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/005_微信助理-已绑定_ZQtrb6jCmo.png)

5. 需要切换微信账号时，先解绑当前账号，再重新扫码。

二维码有时效限制。停留在“绑定中”、二维码过期或扫码失败时，关闭配置窗口后重新进入，必要时重启 WorkBuddy 并重新生成二维码。

***来源：WorkBuddy 官方指南。***

## 接入飞书

1. WorkBuddy → 设置 → 助理设置 → 选择飞书；

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/006_image_SbcEbSaoio.png)

2. 在飞书开放平台创建企业自建应用；

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/007_飞书-登录开放平台_EUPhblavHo.png)

3. 为应用添加机器人能力；

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/008_飞书-添加机器人能力_XFmTb5HGQo.png)

4. 按 WorkBuddy 当前页面要求开通最小权限；

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/009_飞书-批量导入权限_MRdCbm3Dvo.png)

5. 在“凭证与基础信息”获取 App ID 和 App Secret；

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/010_飞书-应用凭证_CnItbspOUo.png)

6. 将凭证填写到 WorkBuddy，生成或复制回调信息；

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/011_飞书-加密与校验配置_WiAYbwBDKo.png)

7. 在飞书配置事件订阅与回调；

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/012_飞书-添加接收消息事件_X4z6bNPsso.png)

8. 添加接收消息、卡片交互等当前指南要求的事件；

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/013_飞书-卡片回调_AvOxbO7M9o.png)

9. 创建版本并发布应用；

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/014_飞书-发布应用_TafwbySxco.png)

10. 在飞书内向机器人发送只读测试任务。

***来源：WorkBuddy 官方指南。***

## 接入钉钉

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/015_image_RRhMbPo5uo.png)

1. 创建应用与机器人使用企业管理员账号登录钉钉开发者后台；

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/016_钉钉-创建应用_NuNTbdscZo.png)

2. 进入“应用开发”，创建应用；

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/017_钉钉-添加机器人能力_ORRbbZrqgo.png)

3. 为应用添加机器人能力，填写机器人名称、描述和头像并确认发布；

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/018_钉钉-开通权限_QG1zbPhcxo.png)

4. 优先在测试组织或测试群完成验证。

![](https://gh-proxy.com/https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/assets/019_钉钉-获取应用凭证_OI8fbW0JNo.png)

***来源：WorkBuddy 官方指南。***
