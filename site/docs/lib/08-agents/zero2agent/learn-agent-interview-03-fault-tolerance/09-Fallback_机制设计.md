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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/03-fault-tolerance/index.md"
sourceRel: "learn-agent-interview/03-fault-tolerance/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/03-fault-tolerance/index.md"
sourceSha256: "ec931d48d76195508909df9d726fa4662052593581a0a4b80cae3e9b5dc97699"
pageSha256: "1d8a08e5255dda7bd5ee5a31cda8a73271c21820e2a0f450afc8ff9f1115a119"
contentMode: "local-full"
zh: ""
---

## Fallback 机制设计

### Q：Agent 系统的 fallback 是怎么做的？

> 来源：字节Agent开发一面（某大厂） / [百度 Agent 一面](https://www.nowcoder.com/feed/main/detail/53542e2dcfd44b1d84b0ae55b4fc1b35)

**新手答**：“调用失败就报错呗。”

**高手答**：

Fallback 要分层设计——不同层级的失败对应不同的降级策略。

| 层级 | 故障 | Fallback 策略 |
|------|------|--------------|
| **工具层** | 单个工具调用失败 | 重试 → 换参数 → 替代工具 → 跳过该步骤 |
| **节点层** | 某个 Agent 节点异常 | 本节点重跑 → 换 Prompt 重试 → 标记跳过进入下一节点 |
| **模型层** | LLM API 超时/报错 | 指数退避重试 → 切备用模型 → 返回缓存/模板回答 |
| **会话层** | 整体任务超时或死循环 | 输出当前已完成部分 + “无法完成，建议手动处理” |

**关键设计原则：**

1. **每层独立 fallback，不要把所有错误都 raise 到顶层**：工具报错在工具层处理，不应让整个 Agent 任务失败
2. **fallback 要有信息保留**：降级时把已经获取到的信息传递给用户，而不是“系统异常请重试”
3. **区分可重试错误 vs 不可重试错误**：超时、限流可重试；权限不足、参数无效不应重试
4. **降级后主动告知用户**：告诉用户“因为 XX 不可用，当前回答基于 YY”，保持透明

**差距在哪**：面试官考的是你对“优雅降级”的理解深度。只说“try-catch”说明你只写过单层代码。能说出分层 fallback + 信息保留 + 用户告知，说明你设计过面向用户的生产系统。
