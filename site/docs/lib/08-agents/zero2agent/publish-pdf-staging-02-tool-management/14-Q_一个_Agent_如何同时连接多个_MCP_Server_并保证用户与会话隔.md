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
pageSha256: "e29fbf0096b54fafd565f57e316c59cd5b421cf8a0bda3174c439ae7cfdb2378"
contentMode: "local-full"
zh: ""
---

## Q：一个 Agent 如何同时连接多个 MCP Server，并保证用户与会话隔离？

> 来源：百度/秋招后端一面【补充：AI 面经中的 MCP 用户身份追问】

**新手答**：“配置多个 MCP 地址，模型需要哪个工具就调用哪个。”

**高手答**：

Host 启动时为每个 MCP Server 建立独立 Client 会话，完成能力发现后，把工具规范化为带命名空间的注册表，例如 `calendar.create_event`、`crm.create_lead`，避免同名冲突。路由器先按租户、权限和任务召回允许暴露的工具子集，再交给模型选择。

用户身份不能靠 IP 推断。Host 应把已认证用户映射为短期、最小权限的凭证，通过 MCP transport 的认证头或受控上下文传递；Server 端仍要独立鉴权，不能相信模型参数里的 `user_id`。会话状态按 `tenant_id + user_id + session_id + server_id` 隔离，并设置过期与撤销机制。

还要处理四类工程问题：Server 健康检查与熔断、工具 schema 版本漂移、跨 Server 调用的超时预算，以及敏感工具的人工审批。多个 MCP 是能力联合，不等于把所有工具无条件塞进上下文。

**差距在哪**：新手只会“多配几个地址”，高手能讲清命名空间、能力发现、动态披露、身份传递和 Server 端二次鉴权。面试官考的是多 MCP 场景的协议与安全边界。
