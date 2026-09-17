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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/06-multi-agent-collab.md"
sourceRel: "publish-pdf/staging/06-multi-agent-collab.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/06-multi-agent-collab.md"
sourceSha256: "45cd341f24a023f5affe2db1b6c5c8527844255ad74a8e55796c4ce86d984b7e"
pageSha256: "08ff2961691768228c46841fc48c695cb9f46a067b1c0687d6a1defd2c0e193e"
contentMode: "local-full"
zh: ""
---

## 通信协议与 Handoff

### Q：Handoff 的核心难点是什么？是路由问题、状态传递问题，还是权限边界问题？

> 来源：Agent 开发面试 30 题

**新手答**：“主要是路由问题，让请求到正确的 Agent。”

**高手答**：

Handoff（Agent 间交接）的难点**三个都有**，但最容易被低估的是**状态传递**。

**路由问题——最显眼但最好解决**：

用意图分类器或模型判断“该交给哪个 Agent”，准确率做到 90%+ 不难。兜底方案也简单——路由错了让目标 Agent 检测到不属于自己的任务后回退。

**权限边界——重要但相对静态**：

每个 Agent 的工具访问权限、数据访问范围可以在配置中明确定义。Handoff 时校验目标 Agent 是否有权限处理该任务。这是设计时就能确定的，运行时不太会变。

**状态传递——最隐蔽也最容易出问题**：

```text
Agent A 和用户聊了 10 轮 → Handoff 到 Agent B
Agent B 需要知道什么？

❌ 把 A 的全部对话历史传过去 → B 的上下文被污染，A 的推理过程干扰 B 的判断
❌ 只传最后一条消息 → B 丢失了关键约束（用户预算、偏好等）
✅ 传结构化的"交接摘要" → 任务目标 + 关键约束 + 已完成步骤 + 未完成步骤
```

状态传递的核心难点是**信息的取舍**——传多了上下文污染，传少了信息缺失。最佳实践是定义标准化的 Handoff Protocol：

```json
{
  "task_goal": "帮用户订北京到上海的机票",
  "constraints": {"budget": 2000, "date": "2026-04-20", "class": "经济舱"},
  "completed_steps": ["已查询航班列表", "用户选择了 CA1234"],
  "pending_steps": ["确认支付", "出票"],
  "handoff_reason": "进入支付环节，需要支付 Agent 处理"
}
```

**差距在哪**：新手只看到路由问题。高手分析了三个难点的层次——路由最显眼但最好解决，权限重要但静态，状态传递最隐蔽也最关键，且给出了标准化 Handoff Protocol 的设计。面试官考的是你对多 Agent 交接的工程化理解深度。

---

### Q：MCP 和 A2A 分别解决什么层面的问题？如果系统同时用了两者，架构上怎么分工？

> 来源：Agent 开发面试 30 题

**新手答**：“MCP 是调工具的，A2A 是 Agent 之间通信的。”

**高手答**：

方向对，但需要精确区分**协议层次和解决的核心问题**：

**MCP（Model Context Protocol）——Agent 与工具/资源的连接协议**：

解决的是“Agent 怎么发现和调用外部能力”——数据库查询、API 调用、文件读写等。本质是**Agent 到工具的标准化接口**，类似于 USB 协议让电脑能接各种外设。

```text
Agent ──MCP──→ 工具 A（数据库查询）
Agent ──MCP──→ 工具 B（搜索引擎）
Agent ──MCP──→ 工具 C（代码执行）
```

**A2A（Agent-to-Agent）——Agent 与 Agent 的协作协议**：

解决的是“多个 Agent 怎么互相发现、通信和协作”——任务委托、结果回传、状态同步。本质是**Agent 到 Agent 的通信协议**，类似于 HTTP 让不同服务之间能互相调用。

```text
Agent A ──A2A──→ Agent B（委托子任务）
Agent B ──A2A──→ Agent A（返回结果）
Agent A ──A2A──→ Agent C（并行委托）
```

**两者同时使用时的架构分工**：

- **A2A 负责“水平”通信**：Agent 之间的任务分发、结果汇总、状态协调
- **MCP 负责“垂直”连接**：每个 Agent 向下调用自己需要的工具和资源

两者不冲突，是**不同层次的协议**——A2A 解决组织协作问题，MCP 解决能力接入问题。类比公司组织：A2A 是部门之间的沟通协议，MCP 是员工使用办公工具的标准接口。

**差距在哪**：新手把两者简单对立。高手明确了两者的协议层次（水平通信 vs 垂直连接），且给出了同时使用时的架构图和分工原则。面试官考的是你对 Agent 协议生态的理解——不只是“知道”这两个概念，而是知道它们在系统架构中的位置。
