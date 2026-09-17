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
pageSha256: "67b5979cdb58b70e9b342f735916ce772fadd3cab2a2298b1f640c424ccd8cc0"
contentMode: "local-full"
zh: ""
---

## Q：如何设计类似 LangFlow 的 Agent 工作流可视化编排画布？

> 来源：商汤 AI Agent 开发面经（2026-03-05）

**新手答**：“前端用节点编辑器画流程，后端把节点按连线顺序执行。”

**高手答**：

先把画布定位为**版本化工作流中间表示的可视化投影**，而不是一张靠坐标驱动执行的图。组件注册表定义节点类型、配置 schema、输入输出端口、权限、超时、重试和版本；画布文档只保存稳定的 `node_id`、组件版本、配置、边、视图坐标和子图引用。端口使用 typed schema，连线时就检查类型、必填输入、单/多输入基数和作用域，避免等到运行时才发现两个节点不能连接。

前端按“节点库 + 画布 + 属性面板 + 运行面板”拆分。拖拽、连线、撤销重做和批量移动都转成可重放 command；自动保存采用文档版本与乐观锁，服务端拒绝基于旧版本的覆盖。大图只渲染可视区域，搜索、分组、折叠子图和键盘操作保证可用性。UI 状态与业务图状态分离，缩放和选中状态不能污染发布制品。

发布时由编译器完成四层门禁：

| 阶段 | 核心检查 |
|------|----------|
| 静态校验 | 孤立节点、不可达节点、端口类型、必填配置、非法环和未绑定秘密 |
| 语义校验 | 条件分支是否完备、循环是否有退出条件、并行汇聚 reducer 是否确定 |
| 安全校验 | 节点权限、数据分级、跨租户引用和高风险工具审批 |
| 执行计划 | 拓扑/状态机编译、并发组、超时预算、checkpoint 和补偿边界 |

运行时只消费不可变的已发布版本，草稿修改不能影响在途任务。每个节点事件通过 `run_id + node_id + attempt` 回传，画布展示排队、运行、成功、失败、耗时和输入输出摘要，并能从失败节点基于 checkpoint 重放。组件升级要做 schema migration 和兼容检查，旧工作流仍绑定旧版本；验收既测编译正确性，也测大图交互性能、协同冲突、断线恢复和运行轨迹与节点高亮的一致性。

**差距在哪**：新手把画布当拖拽 UI，高手把它设计成“组件元数据 → typed Graph IR → 编译门禁 → 可观测 Runtime”的完整产品，并处理版本、迁移、协作和安全边界。面试官考的是能否让低代码编排既好用又可执行、可治理。
