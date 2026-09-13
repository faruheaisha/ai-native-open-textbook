---
title: "Visual Tour"
sourceId: "09-harness/learn-workbuddy"
sourceTitle: "Learn WorkBuddy（从 0 复刻桌面 Agent Harness）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/adongwanai/learn-workbuddy"
entryUrl: "https://github.com/adongwanai/learn-workbuddy/blob/d8c2a32614555196e405f20c67e23ed84f2f2239/README.md"
zh: ""
---

# Visual Tour

10 张图看懂 WorkBuddy-style desktop agent harness。所有图片都来自本仓库的原创教学图，不依赖产品截图或私有素材。

## 1. 总架构

![Architecture Overview](/mirror/ae/aec3dd470d17faaeb0f40645fe2f7c632d26c9e6.svg)

桌面 agent 不是一个聊天框。它是 UI shell、sidecar、session runtime、agent loop、tool registry、memory、storage 和 safety layer 的组合。

## 2. Agent Loop

![Agent Loop](/mirror/a6/a6ee6435f7ed0b749f558b82ad97469b532cf2a7.svg)

最小 agent harness 是一个反馈环：模型请求工具，harness 执行工具，再把结果喂回模型。

## 3. Deferred Loading

![Deferred Loading](/mirror/29/29b9a4c8d706efba53c365ac24887f9e2920653f.svg)

工具很多时，不要一开始把所有 schema 塞进 prompt。先让模型搜索工具，需要时再展开。

## 4. Permission Gates

![Permission Gates](/mirror/c4/c4047661496c2dc38df9e250f10725f5c6a00888.svg)

Agent 越有用，越需要权限门。高风险动作应该在工具执行前被识别、拦截、记录。

## 5. Sidecar

![Sidecar](/mirror/62/62861b380f70d51e89dd37c6a0a56ceebe12ad3e.svg)

UI 进程不应该承载长任务。sidecar/session runtime 是桌面 shell 和 agent work 之间的隔离层。

## 6. Session Lifecycle

![Session Lifecycle](/mirror/78/7844cc945c8f5c80cccfb3e25e95eb4b5e4a8b1a.svg)

会话要能创建、暂停、恢复、重连和结束。否则 agent 只是一次性脚本，不是桌面工作流。

## 7. Memory

![Three Layer Memory](/mirror/8b/8bcd1651fba4c953f7b85c6b4de67c35b7afe9ec.svg)

记忆要分层：项目事实、用户偏好、远端/历史召回、transcript 和 artifact 指针不该混成一坨。

## 8. Context Compaction

![Context Compact](/mirror/05/0522468a82a649c4be6e9bb89296a8a4d35cddad.svg)

长任务一定会撞上下文窗口。压缩不是删除历史，而是把旧事件换成可继续工作的摘要。

## 9. Skills And Connectors

![Skills System](/mirror/fa/fabf152c3cc5192a3fd214a86a58a53a34132bc9.svg)

Skills 给模型能力说明和脚本，Connectors 接外部服务。两者都需要发现、权限和信任边界。

## 10. Comprehensive Harness

![Comprehensive](/mirror/cf/cf32b317bbd1247c14f57b6ff4de8c1066bb6639.svg)

最后所有机制回到同一个 loop：模型负责 agency，harness 负责落地、记忆、权限、审计和交付。

## 一句话复盘

```text
模型会思考，但 harness 决定它能不能长期、安全、可恢复地工作。
```
