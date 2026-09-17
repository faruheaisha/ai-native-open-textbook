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
pageSha256: "e478ee6660dc417f9d1fc155df09db9b496770a17c3be4f3d95ec181f5781b6a"
contentMode: "local-full"
zh: ""
---

## Q：业务模块增删时，如何治理 Multi-Agent 能力拓扑，避免 Agent 增殖和路由配置失控？

> 来源：懂车帝 / Agent 开发 / 一面

**新手答**：“按业务模块一个模块拆一个 Agent，新增模块就新增 Agent，删除时把配置删掉。”

**高手答**：

我的默认方案是先用单 Agent + Skill；只有一个候选单元同时满足下面多数条件，才升级成独立 Agent：

| 拆分判断 | 需要回答的问题 |
|---------|---------------|
| 独立目标与契约 | 能否定义稳定的输入、结构化输出和独立验收标准？ |
| 专用上下文 | 隔离领域知识后，是否能显著减少上下文污染？ |
| 工具与权限 | 是否需要不同工具集、数据域或最小权限边界？ |
| 并行收益 | 能否和其他任务并行，且汇总成本低于节省的时间？ |
| 评测与故障域 | 能否单独评测、限流、降级和回滚，而不拖垮整条链路？ |

例如代码审查可以有三个并行子 Agent，但不是复制三份相同配置：正确性 Agent 的 prompt 关注行为与测试，工具是测试运行器和代码检索；安全 Agent 关注攻击面与数据流，工具是 SAST、依赖扫描和密钥检测；可维护性 Agent 关注复杂度与规范，工具是 lint、类型检查和 diff 分析。三者只返回统一的 `finding_id、位置、严重级别、证据、置信度、修复建议`，不直接写代码。

Supervisor 汇总时先按位置和根因去重，再执行确定性优先级：合规硬门禁和已证实的高危安全问题优先，其次是正确性、影响范围、证据质量和置信度，最后才是风格建议。规则无法裁决的语义冲突才交给模型仲裁；低置信度冲突进入人工复核，并在 trace 中保留少数意见，不能用一段总结把分歧抹掉。

防止 Agent 随业务线无限增殖，关键是把能力与模块解耦：维护带 owner、版本、输入输出 schema、工具权限、SLO 和生命周期状态的能力注册表；拓扑、router 和 prompt 引用同一份版本化配置。新增模块先复用已有能力，确需新增时经过离线路由评测、shadow 流量和小流量发布；删除模块则先标记 `deprecated`、停止接收新任务、排空在途任务，再删除路由，并保留可回滚版本。

我会持续看路由 Top-1 准确率、handoff 率、冲突率、单任务活跃 Agent 数、上下文 token、成功率和回退率。典型失败信号包括孤儿路由仍指向已删除 Agent、prompt 与工具版本错配、低价值 handoff 激增，以及新增 Agent 后成功率不升反降；出现这些信号就回滚拓扑，而不是继续补 Agent。

**差距在哪**：新手把组织架构或代码模块直接映射成 Agent。高手以契约、权限、上下文、并行收益和独立故障域决定粒度，用注册表和版本化拓扑管理增删，并能说明不同子 Agent 的 prompt、工具和验收标准，以及 Supervisor 如何基于证据稳定裁决冲突。
