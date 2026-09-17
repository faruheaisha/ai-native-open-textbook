---
title: "Zero2Agent：从零实现 Agent"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/06-multi-agent-collab/index.md"
sourceRel: "learn-agent-interview/06-multi-agent-collab/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/06-multi-agent-collab/index.md"
sourceSha256: "5ee244b67f4d348fad5285b36ca146b5ff0d9717e0f3b855e900f08593dbf592"
pageSha256: "75d3bfc88de9b81c2cfcba869592742a4adaccd4bb808496b53c406080d5cfac"
contentMode: "local-full"
zh: ""
---

## Q：多人、多 Agent、跨设备协同与“群聊式多 Agent”有什么不同？

> 来源：[跨设备多 Agent 项目一面](https://www.nowcoder.com/feed/main/detail/9b1329caf4b64389a0ab666585bda045)

**新手答**：“群聊是多个 Agent 互相发消息，跨设备只是再加网络同步。”

**高手答**：群聊式方案常默认一个会话、一个用户和在线参与者，重点是轮次与角色路由；跨设备协同还要处理多用户身份、设备能力、离线重连、局部状态、权限边界和现实世界副作用。手机、电脑和边缘设备不是可互换 Agent：它们拥有不同传感器、凭据、网络和可执行动作，编排器必须显式声明 capability、owner、scope 与在线状态。

任务应写入服务器侧事件日志，由协调器分配带 lease、deadline 和幂等键的子任务。设备只缓存自己有权看到的最小状态；重连后按单调序号补事件，冲突使用版本条件、单一字段 owner 或领域合并规则收敛，不能依赖“最后写入覆盖”。照片、位置、通讯录等数据在源设备上先做授权和最小化，敏感结果用引用传递而不是广播进群聊上下文。

人和 Agent 都是可接管的参与者：高风险动作要求明确确认，用户撤销、设备掉线和 Agent 失败要传播取消并释放 lease。测试应覆盖重复投递、乱序、网络分区、两台设备同时执行、权限变更和离线后迟到结果；指标除成功率外，还包括状态收敛时间、重复副作用、跨设备数据泄露和人工接管率。

**差距在哪**：新手只增加消息通道，高手把身份、设备能力、离线一致性、数据最小化和副作用所有权纳入协议。
