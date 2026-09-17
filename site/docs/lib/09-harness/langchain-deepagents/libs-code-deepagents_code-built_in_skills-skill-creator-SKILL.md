---
title: "Skill Creator"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/libs/code/deepagents_code/built_in_skills/skill-creator/SKILL.md"
sourceRel: "libs/code/deepagents_code/built_in_skills/skill-creator/SKILL.md"
rawUrl: "/raw/09-harness/langchain-deepagents/libs/code/deepagents_code/built_in_skills/skill-creator/SKILL.md"
sourceSha256: "5da11304716c1dbcbb55d8179b57d0eb64e499dcd5a937e9593257cad39b56c0"
pageSha256: "5da11304716c1dbcbb55d8179b57d0eb64e499dcd5a937e9593257cad39b56c0"
contentMode: "local-full"
zh: ""
---

# Skill Creator

### Skill Location for Deepagents

The deepagents CLI loads skills from five sources, listed here from lowest to highest precedence:

| # | Directory | Scope | Notes |
|---|-----------|-------|-------|
| 0 | `<package>/built_in_skills/` | Built-in | Ships with deepagents CLI |
| 1 | `$DEEPAGENTS_HOME/<agent>/skills/` | User (deepagents alias) | Default for `deepagents skills create` |
| 2 | `~/.agents/skills/` | User | Shared across agent tools |
| 3 | `.deepagents/skills/` | Project (deepagents alias) | Default for `deepagents skills create --project` |
| 4 | `.agents/skills/` | Project | Shared across agent tools |

`<agent>` is the agent configuration name (default: `agent`). When two directories contain a skill with the same name, the higher-precedence version wins — project skills override user skills, and any user or project skill overrides built-in skills.

Example directory layout:

```
$DEEPAGENTS_HOME/agent/skills/     # user skills (lowest precedence)
├── skill-name-1/
│   └── SKILL.md
└── ...
