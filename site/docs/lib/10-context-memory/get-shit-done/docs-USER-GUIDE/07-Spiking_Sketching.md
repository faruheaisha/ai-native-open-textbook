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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/USER-GUIDE.md"
sourceRel: "docs/USER-GUIDE.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/USER-GUIDE.md"
sourceSha256: "4550e970e63aa2066ecde7d4f8350d0d1c104699167310213bc4c5a9ca0fb7e4"
pageSha256: "524a3ba04380b31729ea74434b9f458ba66aa1d2569fd70d7aa51e1275d104ad"
contentMode: "local-full"
zh: ""
---

## Spiking & Sketching

Use `/gsd-spike` to validate technical feasibility before planning, and `/gsd-sketch` to explore visual direction before designing. Both store artifacts in `.planning/` and integrate with the project-skills system via their wrap-up companions.

### When to Spike

Spike when you're uncertain whether a technical approach is feasible or want to compare two implementations before committing a phase to one of them.

```
/gsd-spike                              # Interactive intake — describes the question, you confirm
/gsd-spike "can we stream LLM tokens through SSE"
/gsd-spike --quick "websocket vs SSE latency"
```

Each spike runs 2–5 experiments. Every experiment has:
- A **Given / When / Then** hypothesis written before any code
- **Working code** (not pseudocode)
- A **VALIDATED / INVALIDATED / PARTIAL** verdict with evidence

Results land in `.planning/spikes/NNN-name/README.md` and are indexed in `.planning/spikes/MANIFEST.md`.

Once you have signal, run `/gsd-spike --wrap-up` to package the findings into `.claude/skills/spike-findings-[project]/` — future sessions will load them automatically via project-skills discovery.

### When to Sketch

Sketch when you need to compare layout structures, interaction models, or visual treatments before writing any real component code.

```
/gsd-sketch                             # Mood intake — explores feel, references, core action
/gsd-sketch "dashboard layout"
/gsd-sketch --quick "sidebar navigation"
/gsd-sketch --text "onboarding flow"    # For non-Claude runtimes (Codex, Gemini, etc.)
```

Each sketch answers **one design question** with 2–3 variants in a single `index.html` you open directly in a browser — no build step. Variants use tab navigation and shared CSS variables from `themes/default.css`. All interactive elements (hover, click, transitions) are functional.

After picking a winner, run `/gsd-sketch --wrap-up` to capture the visual decisions into `.claude/skills/sketch-findings-[project]/`.

### Spike → Sketch → Phase Flow

```
/gsd-spike "SSE vs WebSocket"     # Validate the approach
/gsd-spike --wrap-up              # Package learnings

/gsd-sketch "real-time feed UI"   # Explore the design
/gsd-sketch --wrap-up             # Package decisions

/gsd-discuss-phase N              # Lock in preferences (now informed by spike + sketch)
/gsd-plan-phase N                 # Plan with confidence
```
