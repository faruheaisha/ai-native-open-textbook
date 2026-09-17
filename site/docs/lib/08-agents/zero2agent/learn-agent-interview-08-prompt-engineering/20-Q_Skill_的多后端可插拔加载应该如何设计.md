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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/08-prompt-engineering/index.md"
sourceRel: "learn-agent-interview/08-prompt-engineering/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/08-prompt-engineering/index.md"
sourceSha256: "d742947505870bddb5c387683d51215ba6095898b0fc5efb77e32ec65ffd84c1"
pageSha256: "9a1e3babe2270f3fc3ecb6ab1f2e0432ef679520a10d6e3a1685990bf83ffdd6"
contentMode: "local-full"
zh: ""
---

## Q：Skill 的多后端可插拔加载应该如何设计？

> 来源：[阿里边缘 BU 一面](https://www.nowcoder.com/feed/main/detail/bdebbb6088b6405e9eb2bd2c345acb6e)

**新手答**：“定义统一接口，用工厂模式按配置加载本地、数据库或远程 Skill。”

**高手答**：先定义稳定的逻辑契约，而不是只统一 `load()`：后端返回 `skill_id、version、manifest、content_hash、dependencies、permissions、provenance`，并区分 `list metadata`、`resolve version`、`fetch content` 和 `watch changes`。文件系统、Git、对象存储和注册中心分别实现 Adapter；路由器只依赖契约，不能把某个后端的路径或一致性语义泄漏到 Agent Loop。

加载采用“两阶段”：先拉取小体积索引做候选路由，命中后再按不可变版本读取正文和依赖。缓存键包含 backend、skill、version 与内容哈希；发布者先写不可变对象，再原子更新可见指针。远程超时可回退到已经校验的旧版本，但必须标记 stale；哈希、签名、Schema、依赖和权限校验失败时拒绝加载，不能静默换后端取一份同名内容。

多后端还要定义优先级和冲突规则：项目级覆盖全局时必须显式可见，同名不同 owner 不自动合并。契约测试对所有 Adapter 跑同一套发现、版本、缓存、失效、权限和故障注入用例；线上记录本次 Run 实际使用的 backend、版本和哈希，保证问题可回放。

**差距在哪**：新手只有接口和工厂，高手补齐不可变版本、渐进披露、缓存一致性、供应链校验与跨后端冲突规则。
