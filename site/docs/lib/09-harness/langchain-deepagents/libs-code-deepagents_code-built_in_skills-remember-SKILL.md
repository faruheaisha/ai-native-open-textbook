---
title: "LangChain DeepAgents"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/deepagents_code/built_in_skills/remember/SKILL.md"
sourceRel: "libs/code/deepagents_code/built_in_skills/remember/SKILL.md"
rawUrl: "/raw/09-harness/langchain-deepagents/libs/code/deepagents_code/built_in_skills/remember/SKILL.md"
sourceSha256: "86303ef1850c09d397f2a42f5f038519a47bd3747e8b47930d1b2984eea2b1a9"
pageSha256: "86303ef1850c09d397f2a42f5f038519a47bd3747e8b47930d1b2984eea2b1a9"
contentMode: "local-full"
zh: ""
---

# LangChain DeepAgents

Review our conversation and capture valuable knowledge. Focus especially on **best practices** we discussed or discovered—these are the most important things to preserve.

## Step 1: Identify Best Practices and Key Learnings

Scan the conversation for:

### Best Practices (highest priority)
- **Patterns that worked well** - approaches, techniques, or solutions we found effective
- **Anti-patterns to avoid** - mistakes, gotchas, or approaches that caused problems
- **Quality standards** - criteria we established for good code, documentation, or processes
- **Decision rationale** - why we chose one approach over another

### Other Valuable Knowledge
- Coding conventions and style preferences
- Project architecture decisions
- Workflows and processes we developed
- Tools, libraries, or techniques worth remembering
- Feedback I gave about your behavior or outputs

## Step 2: Decide Where to Store Each Learning

For each best practice or learning, choose the right destination:

### -> Memory (AGENTS.md) for preferences and guidelines
Use memory when the knowledge is:
- A preference or guideline (not a multi-step process)
- Something to always keep in mind
- A simple rule or pattern

**Global** (`$DEEPAGENTS_HOME/agent/AGENTS.md`): Universal preferences across all projects
**Project** (`.deepagents/AGENTS.md`): Project-specific conventions and decisions

### -> Skill for reusable workflows and methodologies
**Create a skill when** we developed:
- A multi-step process worth reusing
- A methodology for a specific type of task
- A workflow with best practices baked in
- A procedure that should be followed consistently

Skills are more powerful than memory entries because they can encode **how** to do something well, not just **what** to remember.

## Step 3: Create Skills for Significant Best Practices

If we established best practices around a workflow or process, capture them in a skill.

**Example:** If we discussed best practices for code review, create a `code-review` skill that encodes those practices into a reusable workflow.

### Skill Location
