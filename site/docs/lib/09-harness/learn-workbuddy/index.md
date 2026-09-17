---
title: "Learn WorkBuddy（从 0 复刻桌面 Agent Harness）"
landing: true
tier: 1
sourceId: "09-harness/learn-workbuddy"
sourceTitle: "Learn WorkBuddy（从 0 复刻桌面 Agent Harness）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
volume: "09-harness"
sourceUrl: "https://github.com/adongwanai/learn-workbuddy"
entryUrl: "https://github.com/adongwanai/learn-workbuddy/blob/d8c2a32614555196e405f20c67e23ed84f2f2239/README.md"
sourceRel: ""
contentMode: "local-full"
zh: ""
---

# Learn WorkBuddy（从 0 复刻桌面 Agent Harness）

**一份开源教学蓝图 — 不是产品源码，是可以跑的 Agent 工程课。**

## 课时

- **🧠 30 秒看懂**
  - [Learning Guide](/lib/09-harness/learn-workbuddy/docs-learning-guide.md)
- **📚 学习路径**
  - [s01](/lib/09-harness/learn-workbuddy/s01_agent_loop.md)
  - [s05](/lib/09-harness/learn-workbuddy/s05_electron_shell.md)
  - [s10](/lib/09-harness/learn-workbuddy/s10_workspace_memory.md)
  - [s13](/lib/09-harness/learn-workbuddy/s13_output_externalization.md)
  - [s16](/lib/09-harness/learn-workbuddy/s16_skills_system.md)
  - [s19](/lib/09-harness/learn-workbuddy/s19_visualizer.md)
  - [Chapter Map](/lib/09-harness/learn-workbuddy/docs-chapter-map.md)
- **📖 章节目录**
  - [s02 Tool Dispatch](/lib/09-harness/learn-workbuddy/s02_tool_dispatch.md)
  - [s03 Deferred Loading](/lib/09-harness/learn-workbuddy/s03_deferred_loading.md)
  - [s04 Permission Hooks](/lib/09-harness/learn-workbuddy/s04_permission_hooks.md)
  - [s06 Sidecar Server](/lib/09-harness/learn-workbuddy/s06_sidecar_server.md)
  - [s07 Session Management](/lib/09-harness/learn-workbuddy/s07_session_management.md)
  - [s08 Model Routing](/lib/09-harness/learn-workbuddy/s08_model_routing.md)
  - [s09 JSONL Transcript](/lib/09-harness/learn-workbuddy/s09_jsonl_transcript.md)
  - [s11 User Memory](/lib/09-harness/learn-workbuddy/s11_user_memory.md)
  - [s12 Cloud Memory](/lib/09-harness/learn-workbuddy/s12_cloud_memory.md)
  - [s14 Context Compact](/lib/09-harness/learn-workbuddy/s14_context_compact.md)
  - [s15 Prompt Assembly](/lib/09-harness/learn-workbuddy/s15_prompt_assembly.md)
  - [s17 MCP Connectors](/lib/09-harness/learn-workbuddy/s17_mcp_connectors.md)
  - [s18 Experts System](/lib/09-harness/learn-workbuddy/s18_experts_system.md)
  - [s20 Result Presentation](/lib/09-harness/learn-workbuddy/s20_result_presentation.md)
  - [s21 SQLite Database](/lib/09-harness/learn-workbuddy/s21_sqlite_database.md)
  - [s22 Automation Scheduler](/lib/09-harness/learn-workbuddy/s22_automation_scheduler.md)
  - [s23 Audit Sandbox](/lib/09-harness/learn-workbuddy/s23_audit_sandbox.md)
  - [s24 Comprehensive](/lib/09-harness/learn-workbuddy/s24_comprehensive.md)
- **🧪 Mini WorkBuddy**
  - **为什么教程同时支持 DeepSeek / OpenAI / Anthropic 多 provider**
    - [docs/appendix/provider-adapter.md](/lib/09-harness/learn-workbuddy/docs-appendix-provider-adapter.md)
- **🧠 记忆系统重点**
  - [Layered Memory Walkthrough](/lib/09-harness/learn-workbuddy/examples-layered_memory_walkthrough.md)
  - [Memory Resilience Evaluation](/lib/09-harness/learn-workbuddy/examples-memory_resilience_eval.md)
  - [Answer-grounded RAG Evaluation](/lib/09-harness/learn-workbuddy/examples-answer_grounding_eval.md)
- [Third-Party Notices](/lib/09-harness/learn-workbuddy/THIRD_PARTY_NOTICES.md)
- **.github**
  - [Pull Request 模板](/lib/09-harness/learn-workbuddy/_github-PULL_REQUEST_TEMPLATE.md)
- **文档**
  - [Code Quality Review](/lib/09-harness/learn-workbuddy/docs-code-quality-review.md)
  - [Further Reading Map](/lib/09-harness/learn-workbuddy/docs-further-reading.md)
  - [Progression Contract](/lib/09-harness/learn-workbuddy/docs-progression-contract.md)
  - [Review & Fixes — 对标 learn-claude-code](/lib/09-harness/learn-workbuddy/docs-review-and-fixes.md)
  - [安全边界：先读这个，再信任代码](/lib/09-harness/learn-workbuddy/docs-security-boundaries.md)
  - [Skill Evolution & Evaluation (Reference)](/lib/09-harness/learn-workbuddy/docs-skill-evolution-and-evaluation.md)
  - [Visual Tour](/lib/09-harness/learn-workbuddy/docs-visual-tour.md)
  - **architecture**
    - [WorkBuddy Harness 架构图谱](/lib/09-harness/learn-workbuddy/docs-architecture-harness-map.md)
    - [Source And Memory System](/lib/09-harness/learn-workbuddy/docs-architecture-source-and-memory-system.md)
  - **evidence**
    - [Model Benchmark Sample Report](/lib/09-harness/learn-workbuddy/docs-evidence-model-benchmark-sample.md)
    - [WorkBuddy-Style Harness Research Summary](/lib/09-harness/learn-workbuddy/docs-evidence-workbuddy-5.2.3.md)
    - [Public Research Material Review](/lib/09-harness/learn-workbuddy/docs-evidence-workbuddy-self-analysis-review.md)
  - **legal**
    - [Clean-room Boundary](/lib/09-harness/learn-workbuddy/docs-legal-clean-room.md)
- **示例**
  - [Retrieval-to-Prompt Context Pipeline：检索结果怎样安全进入 Prompt](/lib/09-harness/learn-workbuddy/examples-context_pipeline_walkthrough.md)
  - [Full Tour：一次跑遍完整 harness](/lib/09-harness/learn-workbuddy/examples-full_tour.md)
  - [Mini WorkBuddy 集成 demo](/lib/09-harness/learn-workbuddy/examples-mini_workbuddy_demo.md)
  - [Reflection Memory 离线示例](/lib/09-harness/learn-workbuddy/examples-reflection_memory.md)
  - [Retrieval & Routing Evaluation 离线示例](/lib/09-harness/learn-workbuddy/examples-retrieval_routing_eval.md)
  - [Self-Evolving Skills 离线示例](/lib/09-harness/learn-workbuddy/examples-self_evolving_skills.md)
  - [Source-grounded RAG：从 Markdown 到可验证引用](/lib/09-harness/learn-workbuddy/examples-source_grounded_rag.md)
    - **fixtures**
      - **corpus**
        - [Agent Harness Operations](/lib/09-harness/learn-workbuddy/examples-source_grounded_rag-fixtures-corpus-agent-harness.md)
        - [分层 Memory 约定](/lib/09-harness/learn-workbuddy/examples-source_grounded_rag-fixtures-corpus-layered-memory.md)
        - [Source-grounded RAG](/lib/09-harness/learn-workbuddy/examples-source_grounded_rag-fixtures-corpus-rag-security.md)
        - [Retrieved Evidence Shortcut](/lib/09-harness/learn-workbuddy/examples-source_grounded_rag-fixtures-corpus-untrusted-note.md)
- **skills**
  - **git-commit**
    - [Git Commit 技能](/lib/09-harness/learn-workbuddy/skills-git-commit-SKILL.md)

开始学习 → [Pull Request 模板](_github-PULL_REQUEST_TEMPLATE.md)
