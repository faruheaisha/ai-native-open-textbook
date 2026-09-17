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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/02-tool-management.md"
sourceRel: "publish-pdf/staging/02-tool-management.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/02-tool-management.md"
sourceSha256: "ff29c62f7add4777020864a28d5f388f5a1eb17b853650aa8e6eba538c7c00c1"
pageSha256: "e8b50fda5acd643556317d0cf4be244324082e060d0f6af94db07ac7554291e0"
contentMode: "local-full"
zh: ""
---

## 多 Skill 串行嵌套的容错设计

### Q：多 Skill 串行/嵌套时，依赖冲突、参数不兼容怎么做容错？有无编排优先级调度？

> 来源：百度 AI Agent前端研发实习生一面

**新手答**：“按顺序执行就行了，失败就报错。”

**高手答**：

多 Skill 编排的核心挑战是**上游 Skill 输出不一定能被下游 Skill 消费**——格式不匹配、字段缺失、语义偏移都可能发生。

**容错机制设计：**

**关键设计点：**

1. **参数适配层**：Skill 之间插入一个 adapter，做格式转换和字段映射。不让 Skill 直接互相传参——解耦后每个 Skill 独立演化
2. **Schema 契约**：每个 Skill 声明输入/输出 Schema（JSON Schema），编排引擎在运行前做静态校验——能提前发现不兼容而非运行时崩溃
3. **优先级调度**：当多个 Skill 可以并行时，按紧急程度和依赖关系排序。有硬依赖的串行（A→B），无依赖的并行（A∥C），部分依赖的条件触发（B 完成后看结果决定是否触发 D）
4. **幂等保证**：同一个 Skill 重复执行不产生副作用。这样任何一步失败后可以安全重试整条链
5. **部分成功语义**：链条中 Skill B 失败不应让整个任务失败——返回“A 已完成，B 因 XX 原因失败，C 跳过”

**差距在哪**：面试官考的是你对“工具编排是一个分布式系统问题”的认知。只说“顺序执行”说明你没处理过多工具协作的复杂性。能说出适配层 + Schema 契约 + 幂等 + 部分成功，说明你有生产级的编排设计经验。

---

### Q：你们有没有用 MCP？为什么要把 OAuth2.1 接到 MCP 里？

> 来源：视频面经汇总

**新手答**：“用了 MCP，OAuth 是做认证的。”

**高手答**：

MCP（Model Context Protocol）本身只解决“模型如何发现和调用工具”的问题，但在企业级 Agent 系统中，**工具背后的服务往往有权限管控**——调用 Slack 发消息需要 OAuth token，查 Google Drive 需要用户授权，操作 GitHub 需要 Personal Access Token。

**为什么 OAuth2.1 要接到 MCP 里：**

1. **代替静态 token**：早期 MCP Server 配置里直接写死 API Key，安全风险极高。OAuth2.1 提供动态令牌 + 自动续期，token 泄漏后可以吊销
2. **用户级权限隔离**：Agent 代替用户操作时，必须用该用户的 OAuth token 而非全局 service account。否则“帮用户 A 查邮件”可能读到用户 B 的数据
3. **最小权限原则**：OAuth2.1 的 scope 机制天然适合限制工具权限——MCP Server 声明需要哪些 scope，用户授权时看到明确的权限列表
4. **标准化**：不同 SaaS 服务（Google、Microsoft、Slack）都走 OAuth 协议，MCP Server 不需要为每个服务写不同的认证逻辑

**典型架构：**

**差距在哪**：新手只知道 OAuth 是“登录用的”。高手理解 MCP + OAuth2.1 组合解决的是 Agent 场景下“代用户操作第三方服务”的授权链路问题——这是 Agent 从 Demo 走向生产的关键安全基础设施。

---

### Q：工具返回了非常大的数据超出了大模型的上下文窗口，怎么办？

> 来源：唯品会一面

**新手答**：“截断数据，只取前面一部分给模型。”

**高手答**：

这是工具返回层的上下文管理问题，需要分层处理：

**第一层——工具侧约束（源头治理）**：
- 工具 schema 里声明 `max_results` 参数，让模型主动限制请求量
- 工具内部做分页或摘要，返回的不是原始数据而是经过处理的摘要版本
- 对于数据库查询类工具，强制 LIMIT + 只返回关键字段

**第二层——中间层压缩（返回后处理）**：
- 对工具返回做结构化摘要：保留统计信息（总数、分布）+ 典型样本
- 大表格转为“前 5 行 + schema 描述 + 统计特征”
- 大段文本用 Map-Reduce 模式压缩：先分块摘要再合并

**第三层——多轮渐进（架构设计）**：
- 第一轮只返回元信息（有多少条、大概什么分布）
- 模型根据任务需要决定要不要深入查看某个子集
- 本质上是把“一次性全量返回”变成“按需渐进获取”

**差距在哪**：新手只想到截断，但截断会丢失关键信息且模型无法判断丢了什么。高手的思路是从源头控制返回量、中间层做智能压缩、架构上支持多轮按需获取——三层递进，核心是“让模型看到足够决策的信息，而不是全量原始数据”。
