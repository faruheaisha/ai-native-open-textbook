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
pageSha256: "8e7bacb9db5f9fcd8b7b74955eb6aadfddf28764c8f260accd3e3aed54970ba7"
contentMode: "local-full"
zh: ""
---

## Q：页面结构变化导致 Skill 失效时，如何检测、降级与修复？

> 来源：[百度 Coding Agent 二面](https://www.nowcoder.com/feed/main/detail/b9521e2b51e04afeac0a3a32e13f4da9)

**新手答**：“Selector 找不到就换一个，失败时多重试几次。”

**高手答**：

页面变化属于**外部契约漂移**，原样重试通常没有意义。运行时应先区分网络故障、登录过期、A/B 页面差异和 DOM/语义结构变化，再决定是否重试；否则 Agent 可能把“按钮改版”误判成临时超时，反复点击甚至点到错误操作。

检测不能只等 Selector 抛异常。每个页面 Skill 都应声明前置条件、关键元素语义、允许的页面版本和操作后置条件：

- 进入页面后检查 URL/页面角色、关键标题和元素集合，而不是只看“加载成功”。
- 优先使用贴近用户语义的 role、label、text 或显式 test id；Playwright 官方也说明长 CSS/XPath 链会随 DOM 结构变化而失效，推荐使用更稳定的 [Locator 契约](https://playwright.dev/docs/locators)。
- 点击后验证业务终态，例如订单状态或保存结果；“元素被点击”不是成功证据。
- 连续出现定位歧义、关键元素缺失或页面指纹变化时，标记 `contract_drift`，不要归入普通超时。

触发漂移后按风险降级：只读操作可以切备用 API、搜索或人工选择；写入、支付、删除等副作用立即冻结，不允许模型猜 Selector。系统保存页面快照、DOM/可访问性树、操作轨迹和版本信息，方便复现；修复时更新 Skill 版本，用历史页面和新页面 fixture 跑契约回归，再 shadow/小流量发布。Playwright 的 [Trace Viewer](https://playwright.dev/docs/trace-viewer)可以辅助查看动作、DOM 快照和网络证据，但自动判定“哪个新元素等价”仍是工程推断，必须经过验收。

**差距在哪**：新手把页面变化当普通异常。高手把它建模为版本化外部契约，靠语义定位、前后置条件和 trace 主动检测；高风险操作先停，再通过回归和灰度修复，避免“自愈”成误操作。

---

### Q：在跨境汇款等金融业务场景下，Agent 超时/失败如何应对，并保证资金安全？

> 来源：腾讯AI应用开发（Agent后端）

**新手答**：“设置重试机制，失败了就重试。”

**高手答**：

金融场景的容错和普通 Agent 完全不同——核心约束是**幂等性和资金一致性**，不能简单重试。

**1. 幂等设计（防重复扣款）**：
- 每次操作携带唯一的 idempotency_key
- 下游支付系统基于此 key 做去重——重试不会重复转账
- Agent 层记录“已提交但未确认”的操作清单

**2. 超时分级处理**：
- **短超时（< 5s）**：可能是网络抖动，带 idempotency_key 安全重试
- **长超时（> 30s）**：进入“待确认”状态，异步轮询下游系统确认实际结果
- **彻底失败**：冻结操作 → 人工介入 → 绝不自动重试涉及资金的操作

**3. 影子模式 + 渐进放权**：
- 初期 Agent 只生成操作建议，不直接执行——人工确认后才触发
- 积累足够成功记录后，逐步放开小额自动执行
- 大额操作永远需要 Human-in-the-Loop

**4. 补偿事务（Saga 模式）**：
- 跨境汇款涉及多步：汇率锁定 → 扣款 → 跨行转账 → 到账确认
- 任何步骤失败都触发反向补偿（冲正/退款）
- Agent 不自己做补偿决策——触发告警，由专门的补偿服务处理

**差距在哪**：新手的“重试”在金融场景可能导致重复扣款。高手理解金融容错的核心是幂等+补偿+人工介入——Agent 的自主性在涉及资金时必须被严格约束，宁可慢不可错。
