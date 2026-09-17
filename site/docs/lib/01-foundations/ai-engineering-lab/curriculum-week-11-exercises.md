---
title: "Week 11: Exercises & Checklist"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/curriculum/week-11/exercises.md"
sourceRel: "curriculum/week-11/exercises.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/curriculum/week-11/exercises.md"
sourceSha256: "da8714957f55f6a741145759056bbb9e2ec2a7c0bc7c0f64fba12c9769e70550"
pageSha256: "da8714957f55f6a741145759056bbb9e2ec2a7c0bc7c0f64fba12c9769e70550"
contentMode: "local-full"
zh: ""
---

# Week 11: Exercises & Checklist

## Graded exercises

1. **Easy**: Run `notebooks/01-zoroeval-harness.ipynb` end-to-end. Record the
   judge-agreement rate (on the doubled sample) and the calibration agreement (judge vs
   your human labels) it prints in the Week 11 sheet of the Excel tracker. Without an
   API key, run the code-metric cells (extraction + triage accuracy) and record those,
   noting the judge cells were skipped.

2. **Standard**: Add a *fourth* golden set to the `ZoroEval` class. Pick a new task
   (shipment-note summarization or ticket *priority* classification), write a 10-item
   golden set with a metric that fits the task (judge-with-rubric or exact-match), and
   run it through the same judge/agreement pipeline. Document the metric you chose and
   why.

3. **Stretch**: Turn the CI gate into a real script `zoroeval/gate.py` (or
   `scripts/zoroeval_gate.py`): it reads a JSON file of eval scores, applies the
   thresholds, prints a pass/fail table, and exits with a non-zero code when any metric
   falls below threshold. Demonstrate it (a) passing a good artifact and (b) blocking a
   deliberately broken one.

4. **Portfolio**: Commit **ZoroEval v1** as the **eval harness + CI gate** milestone
   (tracked in [`curriculum/projects/README.md`](/lib/01-foundations/ai-engineering-lab/curriculum-projects)): the harness class, the
   three golden sets, the calibrated judge and its agreement numbers, the error-analysis
   note (top failure cluster + the fix), and the gate script. This is the artifact every
   later week adds failure classes to, make it inspectable.

## Hints

1. **Easy**: The code-metric cells (extraction + triage) run with no key; the judge
   cells skip when `OPENAI_API_KEY` is unset. Record whichever numbers actually ran,
   and note the skipped cells.

2. **Standard**: Pick a metric that *fits the task*: exact-match for priority labels,
   judge-with-rubric for summarization. Write 10 real items sourced from the domain,
   not copied from the existing three sets.

3. **Stretch**: `ci_gate(score, threshold)` already returns a boolean; the script just
   reads a JSON of scores, applies each metric's threshold, prints PASS/FAIL, and
   `sys.exit(1)` when any metric fails. Demonstrate both the passing and blocking case.

4. **Portfolio**: The gate on *your* harness is self-referential: a harness with no
   threshold, or a judge nobody calibrated, fails its own gate. Ship the class, the
   three sets, the agreement numbers, and the top-fix note together.

## Checklist (mirrors manifest.json + Excel tracker)

- [ ] Mon: Study evals and error analysis (knowledge-base 07 + Ng's letters).
- [ ] Tue: Define golden eval sets for extraction, RAG, and triage; implement LLM-as-judge with a rubric.
- [ ] Wed: Run the judges; measure judge agreement; calibrate the rubric.
- [ ] Thu: Error analysis: cluster failures from Weeks 6 to 10 artifacts; pick the top fix.
- [ ] Fri: Use case: ZoroEval v1 gates one artifact in a CI-style script; document the loop.
- [ ] Sat: Take the Week 11 quiz (quiz.md), pass with 8/10; record the score in Notes.
- [ ] Milestone: Update the Excel tracker; commit ZoroEval.
