---
title: "How Claude Code Works"
landing: true
tier: 2
sourceId: "09-harness/how-claude-code-works"
sourceTitle: "How Claude Code Works"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works"
entryUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/README.md"
sourceRel: ""
contentMode: "local-full"
zh: ""
---

# How Claude Code Works

**Claude Code 架构学习笔记 — Agentic Coding System 深度分析**

## 课时

- [10 分钟快速入门](/lib/09-harness/how-claude-code-works/docs-quick-start.md)
- **核心架构**
  - [1. 概述](/lib/09-harness/how-claude-code-works/docs-01-overview.md)
  - [2. 系统主循环](/lib/09-harness/how-claude-code-works/docs-02-agent-loop.md)
  - [3. 上下文工程](/lib/09-harness/how-claude-code-works/docs-03-context-engineering/index.md)
- **能力系统**
  - [4. 工具系统](/lib/09-harness/how-claude-code-works/docs-04-tool-system/index.md)
  - [5. 技能系统](/lib/09-harness/how-claude-code-works/docs-09-skills-system.md)
  - [6. 记忆系统](/lib/09-harness/how-claude-code-works/docs-08-memory-system.md)
  - [7. Hooks 与可扩展性](/lib/09-harness/how-claude-code-works/docs-06-hooks-extensibility.md)
  - [8. 多 Agent 架构](/lib/09-harness/how-claude-code-works/docs-07-multi-agent.md)
- **运行逻辑**
  - [9. Plan 模式](/lib/09-harness/how-claude-code-works/docs-10-plan-mode.md)
  - [10. 代码编辑策略](/lib/09-harness/how-claude-code-works/docs-05-code-editing-strategy.md)
  - [11. 任务管理系统](/lib/09-harness/how-claude-code-works/docs-15-task-system.md)
  - [12. 权限与安全](/lib/09-harness/how-claude-code-works/docs-11-permission-security.md)
- **设计哲学**
  - [13. 系统提示词设计](/lib/09-harness/how-claude-code-works/docs-14-system-prompt-design/index.md)
  - [14. 用户体验设计](/lib/09-harness/how-claude-code-works/docs-12-user-experience.md)
- **落地实践**
  - [15. 最小必要组件](/lib/09-harness/how-claude-code-works/docs-13-minimal-components.md)
- **运行观测**
  - [16. 可观测性：Metrics 与 Trace](/lib/09-harness/how-claude-code-works/docs-16-observability.md)
- **快照之后的新功能（黑盒逆向）**
  - [17. 自治与续跑：/goal 与 /loop](/lib/09-harness/how-claude-code-works/docs-17-autonomy-goal-loop.md)
  - [18. Auto Mode：权限进入分类器时代](/lib/09-harness/how-claude-code-works/docs-18-auto-mode.md)
  - [19. Dynamic Workflows：确定性脚本编排 agent 舰队](/lib/09-harness/how-claude-code-works/docs-19-dynamic-workflows.md)
  - [20. Agent Teams：对等组队与跨会话安全](/lib/09-harness/how-claude-code-works/docs-20-agent-teams.md)
  - [21. 后台 Agent 舰队：脱终端常驻与 daemon 监管](/lib/09-harness/how-claude-code-works/docs-21-background-fleet.md)
- **参考**
  - [速查参考](/lib/09-harness/how-claude-code-works/docs-reference.md)
- [How Claude Code Works](/lib/09-harness/how-claude-code-works/_coverpage.md)
- [How Claude Code Works](/lib/09-harness/how-claude-code-works/README_EN.md)
- **文档**
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-03-context-engineering/01-为什么上下文工程如此重要.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-03-context-engineering/02-3.1_上下文构建全景.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-03-context-engineering/03-3.2_系统提示词的构建.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-03-context-engineering/04-3.3_消息历史管理.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-03-context-engineering/05-3.4_五级压缩流水线.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-03-context-engineering/06-3.5_Token_预算管理.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-03-context-engineering/07-3.6_前缀缓存策略.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-03-context-engineering/09-3.8_记忆预取.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-03-context-engineering/10-3.9_反应式压缩.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-03-context-engineering/11-3.10_实践指南_如何高效利用_KV_Cache.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-03-context-engineering/12-3.11_设计洞察.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-04-tool-system/01-4.1_Tool_接口定义.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-04-tool-system/02-4.2_工具注册与组装.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-04-tool-system/03-4.3_内置工具清单.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-04-tool-system/04-4.4_工具执行生命周期.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-04-tool-system/05-4.5_并发控制.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-04-tool-system/06-4.6_BashTool_深度解析.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-04-tool-system/07-4.7_AgentTool_深度解析.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-04-tool-system/08-4.8_大结果处理机制.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-04-tool-system/09-4.9_MCP_工具集成.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-04-tool-system/10-4.10_工具搜索与延迟加载.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-04-tool-system/11-4.11_设计洞察.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-04-tool-system/12-4.12_工具_UI_渲染模式.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-14-system-prompt-design/01-概览.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-14-system-prompt-design/02-13.1_主系统提示词_Static_Sections.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-14-system-prompt-design/03-13.2_动态_Sections_Dynamic_Sections.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-14-system-prompt-design/04-13.3_内置_Agent_提示词.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-14-system-prompt-design/05-13.4_Coordinator_模式提示词.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-14-system-prompt-design/06-13.5_全部_Tool_提示词.md)
  - [How Claude Code Works](/lib/09-harness/how-claude-code-works/docs-14-system-prompt-design/07-13.6_提示词构建流程.md)
- [How Claude Code Works](/lib/09-harness/how-claude-code-works/en.md)
  - **文档**
    - [Chapter 1: Claude Code Overview](/lib/09-harness/how-claude-code-works/en-docs-01-overview.md)
    - [Chapter 2: The Main Loop](/lib/09-harness/how-claude-code-works/en-docs-02-agent-loop.md)
    - [Chapter 3: Context Engineering](/lib/09-harness/how-claude-code-works/en-docs-03-context-engineering/index.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-03-context-engineering/01-Why_Is_Context_Engineering_So_Important.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-03-context-engineering/02-3.1_Context_Construction_Overview.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-03-context-engineering/03-3.2_System_Prompt_Construction.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-03-context-engineering/04-3.3_Message_History_Management.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-03-context-engineering/05-3.4_Five-Level_Compression_Pipeline.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-03-context-engineering/06-3.5_Token_Budget_Management.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-03-context-engineering/07-3.6_Prefix_Caching_Strategy.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-03-context-engineering/09-3.8_Memory_Prefetch.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-03-context-engineering/10-3.9_Reactive_Compression.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-03-context-engineering/11-3.10_Practical_Guide_How_to_Maximize_KV_.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-03-context-engineering/12-3.11_Design_Insights.md)
    - [Chapter 4: Tool System](/lib/09-harness/how-claude-code-works/en-docs-04-tool-system/index.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-04-tool-system/01-4.1_Tool_Interface_Definition.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-04-tool-system/02-4.2_Tool_Registration_and_Assembly.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-04-tool-system/03-4.3_Built-in_Tool_Inventory.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-04-tool-system/04-4.4_Tool_Execution_Lifecycle.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-04-tool-system/05-4.5_Concurrency_Control.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-04-tool-system/06-4.6_BashTool_Deep_Dive.md)
    - [Chapter 10: Code Editing Strategy](/lib/09-harness/how-claude-code-works/en-docs-05-code-editing-strategy.md)
    - [Chapter 7: Hooks and Extensibility](/lib/09-harness/how-claude-code-works/en-docs-06-hooks-extensibility.md)
    - [Chapter 8: Multi-Agent Architecture](/lib/09-harness/how-claude-code-works/en-docs-07-multi-agent/index.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-07-multi-agent/01-8.1_Three_Multi-Agent_Patterns.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-07-multi-agent/02-8.2_Sub-Agent_Pattern_AgentTool.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-07-multi-agent/03-8.3_Coordinator_Mode.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-07-multi-agent/04-8.4_Swarm_Execution_Backend.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-07-multi-agent/05-8.5_Worker_Result_Delivery.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-07-multi-agent/06-8.6_Plan_Mode_Two-Phase_Execution.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-07-multi-agent/07-8.7_Design_Insights.md)
    - [Chapter 6: Memory System](/lib/09-harness/how-claude-code-works/en-docs-08-memory-system.md)
    - [Chapter 5: Skills System](/lib/09-harness/how-claude-code-works/en-docs-09-skills-system.md)
    - [Chapter 9: Plan Mode](/lib/09-harness/how-claude-code-works/en-docs-10-plan-mode.md)
    - [Chapter 12: Permissions and Security](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/index.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/01-12.1_Defense_in_Depth_Architecture.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/02-12.2_Permission_Modes.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/03-12.3_Permission_Rule_System.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/04-12.4_Complete_Permission_Decision_Flow.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/05-12.5_Three_Permission_Handlers.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/06-12.6_Multi-layer_Security_Verification_f.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/07-12.7_Dangerous_File_and_Directory_Protec.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/08-12.8_Permission_Decision_Tracking.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/09-12.9_Sandbox_Design.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/10-12.10_Path_Boundary_Protection.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/11-12.11_Prompt_Injection_Defense.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/12-12.12_Environment_Variable_Security.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/13-12.13_Denial_Tracking_and_Degradation.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/14-12.14_PermissionRequest_Hook.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-11-permission-security/15-12.15_Security_Design_Principles_Summary.md)
    - [Chapter 14: User Experience Design](/lib/09-harness/how-claude-code-works/en-docs-12-user-experience.md)
    - [Chapter 15: Minimal Necessary Components](/lib/09-harness/how-claude-code-works/en-docs-13-minimal-components/index.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-13-minimal-components/01-15.1_Why_the_Minimal_Necessary_Perspecti.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-13-minimal-components/02-15.2_The_Seven_Minimal_Necessary_Compone.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-13-minimal-components/03-15.3_From_Minimal_to_Production_Progress.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-13-minimal-components/04-15.4_The_claude-code-from-scratch_Projec.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-13-minimal-components/05-15.5_Key_Differences_Between_Minimal_and.md)
    - [How Claude Code Works](/lib/09-harness/how-claude-code-works/en-docs-13-minimal-components/06-15.6_Core_Insights.md)
    - [Chapter 13: System Prompt Design](/lib/09-harness/how-claude-code-works/en-docs-14-system-prompt-design.md)
    - [Chapter 11: Task Management System](/lib/09-harness/how-claude-code-works/en-docs-15-task-system.md)
    - [Chapter 16: Observability — Making a Whole Task Traceable](/lib/09-harness/how-claude-code-works/en-docs-16-observability.md)
    - [Chapter 17: Autonomy & Continuation — /goal and /loop](/lib/09-harness/how-claude-code-works/en-docs-17-autonomy-goal-loop.md)
    - [Chapter 18: Auto Mode — Permissions Enter the Classifier Era](/lib/09-harness/how-claude-code-works/en-docs-18-auto-mode.md)
    - [Chapter 19: Dynamic Workflows — Orchestrating an Agent Fleet with a Deterministic Script](/lib/09-harness/how-claude-code-works/en-docs-19-dynamic-workflows.md)
    - [Chapter 20: Agent Teams — Peer Collaboration and Cross-Session Safety](/lib/09-harness/how-claude-code-works/en-docs-20-agent-teams.md)
    - [Chapter 21: A Background Agent Fleet — Detaching from the Terminal and Daemon Supervision](/lib/09-harness/how-claude-code-works/en-docs-21-background-fleet.md)
    - [Understand Claude Code in 10 Minutes](/lib/09-harness/how-claude-code-works/en-docs-quick-start.md)
    - [Quick Reference](/lib/09-harness/how-claude-code-works/en-docs-reference.md)

开始学习 → [How Claude Code Works](_coverpage.md)
