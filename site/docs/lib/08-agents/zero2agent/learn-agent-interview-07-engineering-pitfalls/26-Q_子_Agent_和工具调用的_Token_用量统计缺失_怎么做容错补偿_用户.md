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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/07-engineering-pitfalls/index.md"
sourceRel: "learn-agent-interview/07-engineering-pitfalls/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/07-engineering-pitfalls/index.md"
sourceSha256: "0214669d4cd53d5c31df35ebc9b82df54b029eeebc1ad4358ad54c8ee17cbace"
pageSha256: "cc5fe10502d3143be62d78c7964da846bb00174d04f8dee15827973d73c5612a"
contentMode: "local-full"
zh: ""
---

## Q：子 Agent 和工具调用的 Token 用量统计缺失，怎么做容错补偿？（用户断连、子 Agent 延迟退出场景）

> 来源：深信服 AI 全栈开发二面（开源 Agent 项目贡献）

**新手答**：“每次调用完记一下 token 数就行了。”

**高手答**：

Token 用量统计看似简单，但在多 Agent 架构中，有几个场景会导致统计缺失：

**问题场景分析**：

```mermaid
flowchart TD
    A["用户发起请求"] --> B["主 Agent 启动子 Agent"]
    B --> C["子 Agent 调用工具 1"]
    B --> D["子 Agent 调用工具 2"]
    C --> E["Token 消耗记录"]
    D --> F["Token 消耗记录"]
    
    G["❌ 用户断连"] -.-> H["子 Agent 仍在运行\n结果无法回传"]
    I["❌ 子 Agent 超时退出"] -.-> J["退出前的最后几次\n工具调用未上报"]
    K["❌ 网络抖动"] -.-> L["上报请求丢失"]
    
    style G fill:#faa,stroke:#333
    style I fill:#faa,stroke:#333
    style K fill:#faa,stroke:#333
```

**容错补偿的三层设计**：

**第一层：预扣费（Pessimistic Accounting）**

在子 Agent 启动前，基于历史数据预估本次任务的 token 消耗上限，先从用户配额中预扣。任务正常完成后，用实际消耗替换预扣值；异常退出时，预扣值作为近似统计保留。

```text
预扣策略：
  子 Agent 启动 → 预扣 estimated_max_tokens（基于任务类型 P95 消耗）
  正常完成 → 预扣释放，记录实际值
  异常退出 → 预扣值按衰减系数保留（如 0.7 × estimated_max）
```

**第二层：异步上报 + 本地缓冲**

子 Agent 和工具调用的 token 消耗不依赖同步回传，而是写入本地缓冲队列，异步批量上报：

1. **本地 WAL（Write-Ahead Log）**：每次模型调用完成后，先写本地日志文件（追加写，不丢失），再异步上报到统计服务
2. **重试队列**：上报失败的记录进入重试队列，指数退避重试
3. **进程退出前 flush**：子 Agent 收到终止信号（SIGTERM）时，先 flush 缓冲区再退出。设置 graceful shutdown 超时（如 5s）

**第三层：事后对账（Reconciliation）**

对于极端情况（进程被 kill -9、机器宕机），用定期对账补偿：

| 对账方式 | 实现 | 适用场景 |
|---------|------|---------|
| 模型供应商账单核对 | 每小时拉取 API 使用量，和本地统计做 diff | 使用云端 API 时 |
| 请求日志反推 | 从网关/负载均衡器的请求日志中提取 token 信息 | 自部署推理服务 |
| 估算补偿 | 按“同类任务的平均 token 消耗”补充缺失记录 | 日志完全丢失时的兜底 |

**用户断连场景的特殊处理**：

用户断连后，子 Agent 可能还在运行（尤其是异步任务）。这时需要：

1. 子 Agent 的 token 统计独立于用户连接状态——即使用户断了，统计仍然正常记录
2. 任务级别的 token 预算熔断——用户断连后，子 Agent 继续消耗 token 超过预算上限时自动终止
3. 断连恢复后，客户端拉取任务级别的 token 汇总，补齐前端展示

**差距在哪**：新手只想到“调用完记一下”——这是理想路径。高手考虑了用户断连、子 Agent 延迟退出、网络丢失三类异常场景，用预扣费 + 异步缓冲 + 事后对账三层容错保证统计完整性。面试官考的是你对分布式系统中“数据完整性”问题的工程化思考——token 统计本质上是一个分布式计数器的可靠性问题。
