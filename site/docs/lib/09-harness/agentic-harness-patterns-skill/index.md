---
title: "Agentic Harness Patterns（模式与技能）"
landing: true
tier: 3
sourceId: "09-harness/agentic-harness-patterns-skill"
sourceTitle: "Agentic Harness Patterns（模式与技能）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "中英混排"
volume: "09-harness"
sourceUrl: "https://github.com/keli-wen/agentic-harness-patterns-skill"
entryUrl: "https://github.com/keli-wen/agentic-harness-patterns-skill/blob/17549f55b84a94b1ff647ae4711be600fe8ae12f/README.md"
sourceRel: ""
contentMode: "local-full"
zh: ""
---

# Agentic Harness Patterns（模式与技能）

The model loop is easy. `User -> LLM -> tool_use -> execute -> loop` fits on a napkin. What makes a production agent actually work — reliably, safely, at scale — is everything *around* the loop: memory that persists across sessions, permissions that fail closed, context budgets that don't explode, multi-agent…

## 课时

- [Claude Code 源码蒸馏 - Harness Engineering 实践记录](/lib/09-harness/agentic-harness-patterns-skill/docs-distillation-harness-practice-zh.md)
- **六层 Harness 结构**
  - [记忆系统](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-zh-SKILL.md)
- **深度参考文档**
  - [memory-persistence-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-zh-references-memory-persistence-pattern.md)
  - [skill-runtime-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-zh-references-skill-runtime-pattern.md)
  - [tool-registry-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-zh-references-tool-registry-pattern.md)
  - [permission-gate-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-zh-references-permission-gate-pattern.md)
  - [agent-orchestration-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-zh-references-agent-orchestration-pattern.md)
  - [context-engineering](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-zh-references-context-engineering-pattern.md)
  - [select-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-zh-references-context-engineering-select-pattern.md)
  - [compress-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-zh-references-context-engineering-compress-pattern.md)
  - [isolate-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-zh-references-context-engineering-isolate-pattern.md)
  - [hook-lifecycle-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-zh-references-hook-lifecycle-pattern.md)
  - [task-decomposition-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-zh-references-task-decomposition-pattern.md)
  - [bootstrap-sequence-pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-zh-references-bootstrap-sequence-pattern.md)
- [Agentic Harness Patterns（模式与技能）](/lib/09-harness/agentic-harness-patterns-skill/README_ZH.md)
- **文档**
  - [Distilling Claude Code Source — A Harness Engineering Practice Log](/lib/09-harness/agentic-harness-patterns-skill/docs-distillation-harness-practice.md)
- **skills**
  - **agentic-harness-patterns**
    - [Agentic Harness Patterns](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-SKILL.md)
    - **references**
      - [Agent Orchestration Pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-agent-orchestration-pattern.md)
      - [Bootstrap Sequence Pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-bootstrap-sequence-pattern.md)
      - [Context Engineering Pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-context-engineering-pattern.md)
      - [Hook Lifecycle Pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-hook-lifecycle-pattern.md)
      - [Memory and Persistence Pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-memory-persistence-pattern.md)
      - [Permission Gate Pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-permission-gate-pattern.md)
      - [Skill Runtime and Packaging Pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-skill-runtime-pattern.md)
      - [Long-running Work Management](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-task-decomposition-pattern.md)
      - [Tool Registry Pattern](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-tool-registry-pattern.md)
      - **context-engineering**
        - [Context Compression and Snapshot Management](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-context-engineering-compress-pattern.md)
        - [Context Isolation for Delegated Work](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-context-engineering-isolate-pattern.md)
        - [Context Selection and Progressive Disclosure](/lib/09-harness/agentic-harness-patterns-skill/skills-agentic-harness-patterns-references-context-engineering-select-pattern.md)

开始学习 → [Claude Code 源码蒸馏 - Harness Engineering 实践记录](docs-distillation-harness-practice-zh.md)
