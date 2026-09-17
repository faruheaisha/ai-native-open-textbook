---
title: "Week 15: Exercises & Checklist"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/curriculum/week-15/exercises.md"
sourceRel: "curriculum/week-15/exercises.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/curriculum/week-15/exercises.md"
sourceSha256: "78b57e3f7e7d49f134e619bc26494bde619c0541815a4a6dae810e5c61275378"
pageSha256: "78b57e3f7e7d49f134e619bc26494bde619c0541815a4a6dae810e5c61275378"
contentMode: "local-full"
zh: ""
---

# Week 15: Exercises & Checklist

## Graded exercises

1. **Easy**: Run `notebooks/01-langgraph-support-agent.ipynb` end-to-end with the mock
   brain. Copy the graph diagram (ASCII/Mermaid) and the per-node latency/token table into
   the Week 15 sheet of the Excel tracker.

2. **Standard**: Change the refund-approval threshold from `$500` to a value of your own,
   add one new node (`log_escalation`) that writes an escalation record to a JSONL file on
   the escalate path, and re-print the graph visualization so the new node appears.

3. **Stretch**: Run with a real API key, deliberately crash the graph mid-run (e.g. raise
   in the `tool` node), then resume from the checkpoint with `Command(resume=...)` and
   confirm the final answer matches a clean (uncrashed) run. Record the checkpoint ID you
   resumed from.

4. **Portfolio**: Commit the graph agent with (a) the visualization, (b) the checkpoint
   config, and (c) the refund-approval trace; add a `README` block stating the graph shape,
   the threshold, and which node the interrupt guards (tracked in
   [`curriculum/projects/README.md`](/lib/01-foundations/ai-engineering-lab/curriculum-projects)).

## Hints

1. **Easy**: Run top to bottom with the mock brain; copy the Mermaid diagram and the
   per-node latency/token table exactly as printed. The table's `calls` column tells you which
   nodes actually fired.
2. **Standard**: Find the `500.0` comparison inside `compute_refund`/`classify_intent`, not
   the diagram string; change the threshold in one place, then add `log_escalation` as a node
   that appends a line to a JSONL file and wire it on the `escalate` path *before* `escalate`.
3. **Stretch**: Raise inside `tool_node` to force the crash, then resume on the *same*
   `thread_id`; compare the resumed `final_answer` to a clean run's. Record the checkpoint id
   from `graph.get_state(cfg)`.
4. **Portfolio**: The reviewer reads the `README` block cold: state the graph shape (nodes +
   edges), the checkpoint config (`MemorySaver`), the threshold, and *which node the interrupt
   guards*, not just "HITL was added."

## Checklist (mirrors manifest.json + Excel tracker)

- [ ] Mon: Study graph-based agent design (reference/knowledge-base/10-agents-multiagent.md + LangGraph docs).
- [ ] Tue: Port the Week 14 agent to LangGraph; visualize the graph.
- [ ] Wed: Add checkpoints and resume; crash mid-run and recover.
- [ ] Thu: Add the human-in-the-loop interrupt for refunds over $500.
- [ ] Fri: Use case: end-to-end run with approval; record latency and tokens per node.
- [ ] Sat: Take the Week 15 quiz (quiz.md), pass with 8/10; record the score in Notes.
- [ ] Milestone: Update the Excel tracker; commit the graph agent.
