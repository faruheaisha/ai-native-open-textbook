---
title: "In Progress"
sourceId: "10-context-memory/mattpocock-skills"
sourceTitle: "**Matt Pocock Skills**"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/mattpocock/skills"
entryUrl: "https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/README.md"
zh: ""
---

# In Progress

Beta. These skills are public on purpose: try them and tell me what breaks. They're excluded from the plugin and the top-level README until they graduate to a stable bucket, they get no docs pages, and they can change or disappear without warning.

The plugin won't give you these. Install one directly:

```bash
npx skills@latest add mattpocock/skills --skill=<name>
```

- **[loop-me](/lib/10-context-memory/mattpocock-skills/skills-in-progress-loop-me-SKILL)**: Grill yourself into implementable workflow specs over multiple sessions, using the current directory as a stateful workspace. User-invoked.
- **[writing-beats](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/in-progress/writing-beats/SKILL.md)**: Shape an article as a journey of beats, choose-your-own-adventure style. Pick a starting beat, write only that beat, then pivot to the next, until the article reaches a natural end.
- **[writing-fragments](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/in-progress/writing-fragments/SKILL.md)**: Grilling session that mines you for fragments (heterogeneous nuggets of writing) and appends them to a single document as raw material for a future article.
- **[writing-shape](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/in-progress/writing-shape/SKILL.md)**: Take a markdown file of raw material and shape it into an article paragraph by paragraph, arguing format choices at each step.
- **[claude-handoff](/lib/10-context-memory/mattpocock-skills/skills-in-progress-claude-handoff-SKILL)**: Hand the current conversation off to a fresh background agent that picks up the work immediately, seeded with a handoff summary via `claude --bg`. User-invoked.
- **[setup-ts-deep-modules](/lib/10-context-memory/mattpocock-skills/skills-in-progress-setup-ts-deep-modules-SKILL)**: Wire dependency-cruiser into a TypeScript repo so each package is a deep module: implementation hidden in subfolders, reachable only through its entry-point files, tests exercising it through those. User-invoked.
- **[implement-spec](/lib/10-context-memory/mattpocock-skills/skills-in-progress-implement-spec-SKILL)**: Implement a whole spec on one branch. Works the tickets as a task graph rather than a list, running implementer subagents across the ready frontier for maximum concurrency, and lands the result as a single PR. User-invoked.
- **[retro](/lib/10-context-memory/mattpocock-skills/skills-in-progress-retro-SKILL)**: Suggest improvements to the coding agent's environment (steering files, coding standards, automated checks, tooling) after a session. STUB: design notes only, not functional yet. User-invoked.
