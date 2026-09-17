---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CONFIGURATION.md"
sourceRel: "docs/CONFIGURATION.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/CONFIGURATION.md"
sourceSha256: "3e67baa72c7b00dab65464616eb7f7f38b2c72cad311f0d2b8c6e7ba8e914eb1"
pageSha256: "fcbe2960f612fd7a6800bf7af1d1b6c0710073c38ee35a87fc3e32ec316372e2"
contentMode: "local-full"
zh: ""
---

## Agent Skills Injection

Inject custom skill files into GSD subagent prompts. Skills are read by agents at spawn time, giving them project-specific instructions beyond what CLAUDE.md provides.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `agent_skills` | object | `\{\}` | Map of agent types to skill directory paths |

### Configuration

Add an `agent_skills` section to `.planning/config.json` mapping agent types to arrays of skill directory paths (relative to project root):

```json
{
  "agent_skills": {
    "gsd-executor": ["skills/testing-standards", "skills/api-conventions"],
    "gsd-planner": ["skills/architecture-rules"],
    "gsd-verifier": ["skills/acceptance-criteria"]
  }
}
```

Each path must be a directory containing a `SKILL.md` file. Paths are validated for safety (no traversal outside project root).

### Supported Agent Types

Any GSD agent type can receive skills. Common types:

- `gsd-executor` -- executes implementation plans
- `gsd-planner` -- creates phase plans
- `gsd-checker` -- verifies plan quality
- `gsd-verifier` -- post-execution verification
- `gsd-researcher` -- phase research
- `gsd-project-researcher` -- new-project research
- `gsd-debugger` -- diagnostic agents
- `gsd-codebase-mapper` -- codebase analysis
- `gsd-advisor` -- discuss-phase advisors
- `gsd-ui-researcher` -- UI design contract creation
- `gsd-ui-checker` -- UI spec verification
- `gsd-roadmapper` -- roadmap creation
- `gsd-synthesizer` -- research synthesis

### How It Works

At spawn time, workflows call `gsd-sdk query agent-skills <type>` (or legacy `node gsd-tools.cjs agent-skills <type>`) to load configured skills. If skills exist for the agent type, they are injected as an `<agent_skills>` block in the Task() prompt:

```xml
<agent_skills>
Read these user-configured skills:
- @skills/testing-standards/SKILL.md
- @skills/api-conventions/SKILL.md
</agent_skills>
```

If no skills are configured, the block is omitted (zero overhead).

### CLI

Set skills via the CLI:

```bash
gsd-sdk query config-set agent_skills.gsd-executor '["skills/my-skill"]'
```
