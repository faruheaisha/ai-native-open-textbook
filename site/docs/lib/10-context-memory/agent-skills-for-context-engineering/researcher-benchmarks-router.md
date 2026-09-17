---
title: "Router Benchmark (Stage 2)"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/benchmarks/router/README.md"
sourceRel: "researcher/benchmarks/router/README.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/benchmarks/router/README.md"
sourceSha256: "dd2ae87147529dcc8193fc1b8a4a39f6ec982b5a8112ba4a6b0f845a5108522e"
pageSha256: "dd2ae87147529dcc8193fc1b8a4a39f6ec982b5a8112ba4a6b0f845a5108522e"
contentMode: "local-full"
zh: ""
---

# Router Benchmark (Stage 2)

Tests whether the activation-scenario descriptions in v2.2.0 skill frontmatter are good enough to route the right skill to a given prompt.

See `researcher/benchmarks/PLAN.md` for full methodology.

## Files

- `prompts.jsonl`: ground-truth prompts. Each line has `prompt_id`, `prompt`, `expected_primary_skill`, optional `acceptable_secondary_skills` and `rejected_skills`, and a `reason`.
- `routing-prompt.md`: the template given to the LLM. Uses <code v-pre>{{SKILL_BLOCK}}</code>, <code v-pre>{{USER_PROMPT}}</code>, <code v-pre>{{SKILL_COUNT}}</code> placeholders.
- `results/<date>-<seed>/`: per-run JSON outputs (gitignored).

## Running

From the SDK runner:

```bash
cd researcher/benchmarks/sdk-runner
npm install
npm run router:dry-run                       # see the plan and cost forecast
npm run router:run -- --max-budget-usd 5     # execute (after exporting CURSOR_API_KEY)
```

## Ground truth

Initial fixtures are 50 prompts covering:

- Single-skill positive controls (one per skill, 15 cases)
- Adversarial boundary pairs from the v2.2.0 boundary-confusion list (15 cases across 5 pairs x 3 variants)
- Combined-skill prompts where multiple are acceptable (10 cases)
- Negative controls where no skill should fit well (5 cases)
- Subtle activation cases that should still resolve (5 cases)

Expand to 100 by adding prompts as new boundary confusions surface in the wild.
