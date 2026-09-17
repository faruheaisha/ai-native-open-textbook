---
title: "Agentic Harness Engineering（论文与实现）"
landing: true
tier: 2
sourceId: "09-harness/agentic-harness-engineering"
sourceTitle: "Agentic Harness Engineering（论文与实现）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
volume: "09-harness"
sourceUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering"
entryUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering/blob/8b2a55d97590363fe50c3cc6b5e833b020a4bb4c/README.md"
sourceRel: ""
contentMode: "local-full"
zh: ""
---

# Agentic Harness Engineering（论文与实现）

**AHE (Agentic Harness Engineering)** is an open **observability system** for automatically evolving the harness around a coding agent. The base model is held fixed; what evolves are the harness components — system prompts, tool descriptions, tool implementations, middleware, skills, sub-agents, and long-term memory.

## 课时

- **agents**
  - **code_agent_simple**
    - [Long-Term Memory](/lib/09-harness/agentic-harness-engineering/agents-code_agent_simple-LongTermMEMORY.md)
    - [code_agent_simple](/lib/09-harness/agentic-harness-engineering/agents-code_agent_simple.md)
    - [Short-Term Memory](/lib/09-harness/agentic-harness-engineering/agents-code_agent_simple-ShortTermMEMORY.md)
    - [systemprompt](/lib/09-harness/agentic-harness-engineering/agents-code_agent_simple-systemprompt.md)
  - **evolve_agent**
    - [Context Compaction Prompt](/lib/09-harness/agentic-harness-engineering/agents-evolve_agent-compact_prompt.md)
    - [Core Principles](/lib/09-harness/agentic-harness-engineering/agents-evolve_agent-evolve_prompt.md)
    - **middleware**
      - **context_compaction**
        - **prompts**
          - [Emergency Context Compaction Prompt](/lib/09-harness/agentic-harness-engineering/agents-evolve_agent-middleware-context_compaction-prompts-emergency_compact_prompt.md)
    - **skills**
      - **agent-debugger-cli**
        - **_source**
          - **agent_debugger_core**
            - **runtime**
              - [system prompt](/lib/09-harness/agentic-harness-engineering/agents-evolve_agent-skills-agent-debugger-cli-_source-agent_debugger_core-runtime-system_prompt.md)
        - [Agent Debugger CLI](/lib/09-harness/agentic-harness-engineering/agents-evolve_agent-skills-agent-debugger-cli-SKILL.md)
      - **nexau-evolution-guide**
        - **reference**
          - [🤖 Core Concepts: Agents](/lib/09-harness/agentic-harness-engineering/agents-evolve_agent-skills-nexau-evolution-guide-reference-agents.md)
          - [hooks](/lib/09-harness/agentic-harness-engineering/agents-evolve_agent-skills-nexau-evolution-guide-reference-hooks.md)
          - [🧠 Core Concepts: LLM Configuration](/lib/09-harness/agentic-harness-engineering/agents-evolve_agent-skills-nexau-evolution-guide-reference-llms.md)
          - [Sandbox System](/lib/09-harness/agentic-harness-engineering/agents-evolve_agent-skills-nexau-evolution-guide-reference-sandbox.md)
          - [Skills](/lib/09-harness/agentic-harness-engineering/agents-evolve_agent-skills-nexau-evolution-guide-reference-skills.md)
          - [🛠️ Core Concepts: Tools](/lib/09-harness/agentic-harness-engineering/agents-evolve_agent-skills-nexau-evolution-guide-reference-tools.md)
        - [NexAU Evolution Guide — Simple Agent Starting Point](/lib/09-harness/agentic-harness-engineering/agents-evolve_agent-skills-nexau-evolution-guide-SKILL.md)
    - **tools**
      - [nexau 工具实现](/lib/09-harness/agentic-harness-engineering/agents-evolve_agent-tools-REFERENCE.md)
  - **explore_agent**
    - **source_agent**
      - [Context](/lib/09-harness/agentic-harness-engineering/agents-explore_agent-source_agent-prompt.md)
    - **web_agent**
      - [Context](/lib/09-harness/agentic-harness-engineering/agents-explore_agent-web_agent-prompt.md)
- **experiments**
  - **evolved_harness**
    - [Long-Term Memory](/lib/09-harness/agentic-harness-engineering/experiments-evolved_harness-LongTermMEMORY.md)
    - [code_agent_simple](/lib/09-harness/agentic-harness-engineering/experiments-evolved_harness.md)
    - [Short-Term Memory](/lib/09-harness/agentic-harness-engineering/experiments-evolved_harness-ShortTermMEMORY.md)
    - [systemprompt](/lib/09-harness/agentic-harness-engineering/experiments-evolved_harness-systemprompt.md)
- [Agentic Harness Engineering：以可观测性驱动的编码 Agent Harness 自动演化](/lib/09-harness/agentic-harness-engineering/README_zh.md)
- [Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses](/lib/09-harness/agentic-harness-engineering/skills-agentic-harness-engineering-references-analysis.md)
- **skills**
  - **agentic-harness-engineering**
    - **references**
      - **analysis**
        - [Task Analysis: {{task_id}}](/lib/09-harness/agentic-harness-engineering/skills-agentic-harness-engineering-references-analysis-detail-template.md)
        - [Evaluation Overview — Iteration {{iteration}}](/lib/09-harness/agentic-harness-engineering/skills-agentic-harness-engineering-references-analysis-overview-template.md)
      - [HARNESS.md Directory Template](/lib/09-harness/agentic-harness-engineering/skills-agentic-harness-engineering-references-directory-template.md)
      - **docs**
        - [results.json — 评估结果标准格式](/lib/09-harness/agentic-harness-engineering/skills-agentic-harness-engineering-references-docs-results-format.md)
        - [回滚策略 — Harness Change Rollback](/lib/09-harness/agentic-harness-engineering/skills-agentic-harness-engineering-references-docs-rollback-strategy.md)
      - **examples**
        - **trace-sample**
          - [Evaluation Overview — Iteration 3](/lib/09-harness/agentic-harness-engineering/skills-agentic-harness-engineering-references-examples-trace-sample-analysis-overview.md)
          - [Trace Sample — Task T-042: Search Results Exceed 50](/lib/09-harness/agentic-harness-engineering/skills-agentic-harness-engineering-references-examples-trace-sample-task-t042-search-truncation.md)
      - [HARNESS.md — Agent Harness Specification v1.0](/lib/09-harness/agentic-harness-engineering/skills-agentic-harness-engineering-references-HARNESS.md)
      - [🦁 HARNESS.md + AHE.skill](/lib/09-harness/agentic-harness-engineering/skills-agentic-harness-engineering-references-PROJECT_.md)
    - [AHE Skill — Agent Harness Evolution](/lib/09-harness/agentic-harness-engineering/skills-agentic-harness-engineering-SKILL.md)

开始学习 → [Long-Term Memory](agents-code_agent_simple-LongTermMEMORY.md)
