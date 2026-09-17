---
title: "第 4 章：工具系统"
sourceId: "09-harness/how-claude-code-works"
sourceTitle: "How Claude Code Works"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works"
entryUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/04-tool-system.md"
sourceRel: "docs/04-tool-system.md"
rawUrl: "/raw/09-harness/how-claude-code-works/docs/04-tool-system.md"
sourceSha256: "6286b4f8c28527b3c7eef1334044de019a8b5c8d192bdf1033018d43a334149c"
pageSha256: "17e281ac27be04c4c23d74353a1631a0c6d4a7e7d32f9b087f6bf847850cfb09"
contentMode: "local-full"
zh: ""
---

# 第 4 章：工具系统

> 工具系统是 Claude Code 能力的载体：60+ 内置工具，加上 MCP 接进来的外部世界。

Claude Code 的所有能力——文件读写、Shell 命令、代码搜索、子 Agent 派生、MCP 外部服务调用——都通过统一的工具系统暴露给模型。模型不直接操作文件系统或网络，而是通过调用工具来完成一切副作用操作。工具系统是连接"模型智能"与"真实世界"的唯一桥梁。

这套系统的核心架构分为三层：

- **设计层**：`src/Tool.ts` 的 `Tool` 泛型接口——定义每个工具必须实现的契约：执行逻辑、输入 Schema、只读/破坏性/并发安全三类安全语义标记、权限检查、UI 渲染
- **组装层**：`src/tools.ts` 里 `getAllBaseTools()`、`getTools()`、`assembleToolPool()` 三级接力——从编译时裁剪到运行时过滤，最终将内置工具和 MCP 工具合并为统一的工具池
- **执行层**：`src/services/tools/` 的 `StreamingToolExecutor`——在模型流式输出的同时并发执行工具，处理权限检查、Hook 回调和结果格式化

这种设计带来两个关键优势：新增工具只需实现 `Tool` 接口，无需修改执行流水线或权限系统；安全语义（`isReadOnly`、`isDestructive`）编码为接口方法而非外部配置，确保安全属性与工具实现始终同步。

本章路线图：4.1-4.2 介绍接口定义与组装流水线；4.3 列出内置工具全景；4.4-4.5 讲解执行生命周期与并发控制；4.6-4.7 深入分析最复杂的两个工具（BashTool 和 AgentTool）；4.8-4.10 覆盖大结果处理、MCP 集成和延迟加载；4.11-4.12 总结设计洞察与 UI 渲染模式。

## 本篇目录

- [4.1 Tool 接口定义](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/01-4.1_Tool_接口定义.md)
- [4.2 工具注册与组装](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/02-4.2_工具注册与组装.md)
- [4.3 内置工具清单](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/03-4.3_内置工具清单.md)
- [4.4 工具执行生命周期](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/04-4.4_工具执行生命周期.md)
- [4.5 并发控制](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/05-4.5_并发控制.md)
- [4.6 BashTool 深度解析](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/06-4.6_BashTool_深度解析.md)
- [4.7 AgentTool 深度解析](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/07-4.7_AgentTool_深度解析.md)
- [4.8 大结果处理机制](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/08-4.8_大结果处理机制.md)
- [4.9 MCP 工具集成](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/09-4.9_MCP_工具集成.md)
- [4.10 工具搜索与延迟加载](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/10-4.10_工具搜索与延迟加载.md)
- [4.11 设计洞察](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/11-4.11_设计洞察.md)
- [4.12 工具 UI 渲染模式](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/12-4.12_工具_UI_渲染模式.md)
