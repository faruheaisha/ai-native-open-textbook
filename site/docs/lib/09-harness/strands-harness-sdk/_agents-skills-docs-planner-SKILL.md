---
title: "Documentation Planner"
sourceId: "09-harness/strands-harness-sdk"
sourceTitle: "Strands Harness SDK"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/strands-agents/harness-sdk"
entryUrl: "https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/.agents/skills/docs-planner/SKILL.md"
sourceRel: ".agents/skills/docs-planner/SKILL.md"
rawUrl: "/raw/09-harness/strands-harness-sdk/.agents/skills/docs-planner/SKILL.md"
sourceSha256: "e1c3a19ec499584e7501c0fbebd9ecb85c5d17626a676032de38ffc582632e88"
pageSha256: "e1c3a19ec499584e7501c0fbebd9ecb85c5d17626a676032de38ffc582632e88"
contentMode: "local-full"
zh: ""
---

# Documentation Planner

Identify gaps in the docs site and produce a prioritized backlog.

## Inputs

- **Scope**: Area to assess — all docs, a specific section, or a feature area. Default: all.
- **Signals** (optional): GitHub issues, community questions, support threads.
- **Competitive context** (optional): What competitors document that we don't.

## Process

### Step 1: Inventory current docs

Read `site/src/config/navigation.yml` for the full navigation tree — this is the authoritative navigation source for the Astro site, loaded by `site/astro.config.mjs` via `site/src/sidebar.ts`. Glob `site/src/content/docs/**/*.\{md,mdx\}` for all content files. Classify each by content type (tutorial, how-to, reference, explanation, mixed) and coverage area (quickstart, tools, agents, multi-agent, deployment, etc.).

### Step 2: Identify gaps

Compare the inventory against:

- **SDK surface area**: Are all major features documented? Features without docs pages are gaps.
- **Diataxis completeness**: For each feature area, does documentation exist across all four types? A feature with reference but no tutorial has a gap.
- **Community signals**: If GitHub CLI is available, pull open issues labeled "documentation" from strands-agents/harness-sdk. Map questions to existing docs (unclear/hard to find) or missing docs (content gap).
- **Competitive comparison** (if provided): What do LangChain, CrewAI, Anthropic, and OpenAI document about equivalent features that we don't?

### Step 3: Prioritize

Score each gap on developer impact and effort:

- **P0 (do now)**: High impact, any effort. Quickstart, getting-started, core concepts.
- **P1 (do soon)**: Medium impact, low effort. Missing how-to guides for common tasks.
- **P2 (plan for)**: Medium impact, high effort. New tutorials, architectural explanations.
- **P3 (backlog)**: Low impact. Niche scenarios, edge case documentation.

### Step 4: Produce the backlog

Output as markdown:

```markdown
## Docs Backlog: [Scope]

**Generated:** [date]
**Pages inventoried:** [count]
**Gaps identified:** [count]

### P0: Do Now
- [ ] [Task] — [content type] — [target page] — [reason]

### P1: Do Soon
- [ ] [Task] — [content type] — [target page] — [reason]

### P2: Plan For
- [ ] [Task] — [content type] — [target page] — [reason]

### P3: Backlog
- [ ] [Task] — [content type] — [target page] — [reason]

### Coverage Matrix

| Feature Area | Tutorial | How-To | Reference | Explanation |
|---|---|---|---|---|
| Agent basics | Y | ~ | Y | N |
| Custom tools | Y | Y | Y | N |
| Multi-agent  | ~ | N | Y | ~ |

### Signal-Driven Insights
- [Theme from community signals mapped to specific doc gaps]
```

## What This Skill Does NOT Do

- Does not write docs (use docs-writer for that)
- Does not require external signal pipelines (works with local inventory alone)
- Does not auto-create tasks in external tools
