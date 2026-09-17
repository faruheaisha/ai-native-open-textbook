---
title: "Week 17: Exercises & Checklist"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/curriculum/week-17/exercises.md"
sourceRel: "curriculum/week-17/exercises.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/curriculum/week-17/exercises.md"
sourceSha256: "17c5217105533e6e96b8dac28706c3f57e546bdfa34ed987435944fd335d97ef"
pageSha256: "17c5217105533e6e96b8dac28706c3f57e546bdfa34ed987435944fd335d97ef"
contentMode: "local-full"
zh: ""
---

# Week 17: Exercises & Checklist

## Graded exercises

1. **Easy**: Run `notebooks/01-agent-ops-observability.ipynb` end-to-end (no API key
   needed). It prints a coverage metric at the end (a number from 0 to 1). Record it in the
   Week 17 sheet of the Excel tracker.

2. **Standard**: Write two OpenClaw skills for ZoroLogistics, `track-shipment` and
   `refund-policy`: as `SKILL.md` files with YAML frontmatter (name, description, and a
   clear *when to use* trigger). Load them in your workspace and confirm with
   `openclaw skills list` (or the dashboard) that both are recognized.

3. **Stretch**: Pull a Hermes-class model (`ollama run hermes4`), point OpenClaw at it
   (`baseUrl: "http://localhost:11434"`, **no `/v1`**), and run the same three prompts you
   used with the previous model. Write down which prompts the Hermes model handled better
   and which it fumbled, and why function-calling tuning matters for tool use.

4. **Portfolio**: Commit the two skills, the generated ops runbook, and the coverage
   metric. The runbook, thresholds, dashboard, and incident steps, is the standing ops
   artifact a reviewer reads cold (tracked in
   [`curriculum/projects/README.md`](/lib/01-foundations/ai-engineering-lab/curriculum-projects)).

## Hints

1. **Easy**: Run the notebook top to bottom (no key needed); the last cell prints `COVERAGE`
   as a number from 0 to 1. Record exactly that value.
2. **Standard**: Each `SKILL.md` needs `name` + `description` frontmatter and a Markdown body
   with the exact steps; the `description` is what the agent matches against, so make it specific
   ("when a user asks for a shipment's status or ETA"). Confirm with `openclaw skills list`.
3. **Stretch**: Point OpenClaw at Ollama with `baseUrl: "http://localhost:11434"` and **no
   `/v1`**; run the same three prompts as before and note which the Hermes model handled better,
   which it fumbled, and how that tracks its function-calling tuning.
4. **Portfolio**: Commit the two `SKILL.md` files, the generated runbook, and the coverage
   number together; a reviewer reads the runbook cold, so thresholds and incident steps must be
   concrete numbers, not adjectives.

## Checklist (mirrors manifest.json + Excel tracker)

- [ ] Mon: Study OpenClaw and Hermes (reference/agents/openclaw.md + reference/agents/hermes.md + knowledge-base/10).
- [ ] Tue: Install and configure OpenClaw locally; connect a channel (WebChat or Telegram).
- [ ] Wed: Write 2 OpenClaw skills; wire the Week 16 MCP server; test the context loop.
- [ ] Thu: Swap in a Hermes-class model via Ollama; compare assistant quality.
- [ ] Fri: Use case: add tracing and cost tracking to the assistant; publish the ops runbook.
- [ ] Sat: Take the Week 17 quiz (quiz.md), pass with 8/10; record the score in Notes.
- [ ] Milestone: Update the Excel tracker; commit skills and the runbook.
