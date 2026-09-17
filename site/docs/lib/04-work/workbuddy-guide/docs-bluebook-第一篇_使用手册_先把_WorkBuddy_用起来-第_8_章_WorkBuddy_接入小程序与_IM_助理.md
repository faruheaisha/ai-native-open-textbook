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
entryUrl: "https://github.com/AlephAITech/WorkBuddyGuide/blob/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇%20使用手册：先把%20WorkBuddy%20用起来/第%208%20章%20WorkBuddy%20接入小程序与%20IM%20助理/index.md"
sourceRel: "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/index.md"
rawUrl: "/raw/04-work/workbuddy-guide/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 8 章 WorkBuddy 接入小程序与 IM 助理/index.md"
sourceSha256: "44a90368698f9aea623826bf6d860117a33bc7b5c3aadbcbfc4c97971b8ebd04"
pageSha256: "44a90368698f9aea623826bf6d860117a33bc7b5c3aadbcbfc4c97971b8ebd04"
contentMode: "local-full"
zh: ""
---

# 第 8 章 WorkBuddy 接入小程序与 IM 助理

## 小程序的两种模式

![](/mirror/2e/2ef03529800dac900bcfed4ae7779c557e1cb46e.png)

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

![](/mirror/88/880d9ad136ed1535d42bf9f9f9169a59eaf38f71.png)

2. 找到“微信助理集成”，点击“配置”；

![](/mirror/0b/0bd8e6bb73cbde6dee276b860dfc49982e999254.png)

3. 等待绑定二维码生成，用手机微信扫码；

![](/mirror/19/193ae6c59ab0e8957d458ae3c46f77649a6325f2.png)

4. 卡片显示“已绑定”后，先发送一条只读测试指令；

![](/mirror/b6/b69c6739af78498577f72f099755b77e54be6718.png)

5. 需要切换微信账号时，先解绑当前账号，再重新扫码。

二维码有时效限制。停留在“绑定中”、二维码过期或扫码失败时，关闭配置窗口后重新进入，必要时重启 WorkBuddy 并重新生成二维码。

***来源：WorkBuddy 官方指南。***

## 接入飞书

1. WorkBuddy → 设置 → 助理设置 → 选择飞书；

![](/mirror/d1/d1d8df336c68088b60c5ba9860da20549b76eb41.png)

2. 在飞书开放平台创建企业自建应用；

![](/mirror/62/622756ef1ec54f8a2129d7fb87e5bfe2a67146d5.png)

3. 为应用添加机器人能力；

![](/mirror/8d/8d03ac2a8f42afd045ad0f219b1940f1c9f82d2d.png)

4. 按 WorkBuddy 当前页面要求开通最小权限；

![](/mirror/8b/8b4fe3c3444cb73cebffc4c8225ae89069551448.png)

5. 在“凭证与基础信息”获取 App ID 和 App Secret；

![](/mirror/30/30705cced653bbd1235745503066713caeb0346d.png)

6. 将凭证填写到 WorkBuddy，生成或复制回调信息；

![](/mirror/05/05a8065b07f51a27e7dd3be9b731707ae9d6763f.png)

7. 在飞书配置事件订阅与回调；

![](/mirror/18/180e487f1cfa88f5aee31b2f940df9ba95ed39c7.png)

8. 添加接收消息、卡片交互等当前指南要求的事件；

![](/mirror/70/7062f2d5feecb74c66a9577ca606a267599a1715.png)

9. 创建版本并发布应用；

![](/mirror/65/65c4b68299d460fe54c714729f987d4b8bef17c7.png)

10. 在飞书内向机器人发送只读测试任务。

***来源：WorkBuddy 官方指南。***

## 接入钉钉

![](/mirror/a0/a0f7c243393faadabdfa75c0df4567b5dd027dd5.png)

1. 创建应用与机器人使用企业管理员账号登录钉钉开发者后台；

![](/mirror/e3/e3bdadcc7f350439d2b76fb10c1e7b36cad341ee.png)

2. 进入“应用开发”，创建应用；

![](/mirror/2a/2a40f9bac220f402838fc3d8c3cb5d0b053a6ce5.png)

3. 为应用添加机器人能力，填写机器人名称、描述和头像并确认发布；

![](/mirror/da/da16ead60e6774007cf9d6ccdc478cf237c2c861.png)

4. 优先在测试组织或测试群完成验证。

![](/mirror/11/116a318486db736a2204183756137e0f644ea7d2.png)

***来源：WorkBuddy 官方指南。***
