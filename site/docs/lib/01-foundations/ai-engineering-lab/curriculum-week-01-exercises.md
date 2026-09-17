---
title: "Week 01: Exercises & Checklist"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/curriculum/week-01/exercises.md"
sourceRel: "curriculum/week-01/exercises.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/curriculum/week-01/exercises.md"
sourceSha256: "56f21159c1772d9418d7cf6a168345d7ee1d8f315ef4f0e29088e363baf22d5f"
pageSha256: "56f21159c1772d9418d7cf6a168345d7ee1d8f315ef4f0e29088e363baf22d5f"
contentMode: "local-full"
zh: ""
---

# Week 01: Exercises & Checklist

## Graded exercises

1. **Easy**: Run `notebooks/01-environment-and-tools.ipynb` end-to-end. It prints a
   readiness score at the end (a number from 0 to 6). Record that number in the Week 1
   sheet of the Excel tracker. If any check fails, fix the environment and re-run,
   the goal is a score of 6, not a screenshot of an error.

2. **Standard**: Open `notebooks/02-zorologistics-data-generator.ipynb` and change two
   things: the seed (from `42` to something of your own) and the shipment count (from
   `100_000` to `5_000`). Re-run. Confirm that (a) the row counts change, (b) the
   column schema is identical, and (c) the planted data issues (duplicate rows, `NaN`
   weights, `NaN` distances) still appear. Write one sentence in a markdown cell
   explaining *why* the schema is stable but the rows differ.

3. **Stretch**: Write a standalone script `generate_small.py` in your own scratch
   space (not committed to the curriculum folder) that imports `zoro.data`, generates
   one of each table (`carriers`, `lanes`, `shipments`, `support_tickets`) at a
   reduced size with an explicit seed, and prints a one-line summary per table (name +
   row count). Run it from a *fresh* terminal with `python generate_small.py` to prove
   your environment is portable outside Jupyter.

4. **Portfolio**: Begin the **ZoroLogistics data generator + silver dataset**
   milestone (tracked in [`curriculum/projects/README.md`](/lib/01-foundations/ai-engineering-lab/curriculum-projects)). Commit the
   output of `save_all()` to your fork's `data/` directory together with
   `data/data-dictionary.md`, and add a short `README` block stating: the seed used,
   the exact row counts per table, and the schema. This is the first artifact of the
   program that a stranger can inspect.

## Hints

1. **Easy**: If the score is not 6, read each `FAIL` line in order from the top; the
   very first failure (usually a missing `zoro` import or not being inside a Git work
   tree) is usually what pulls the score down.
2. **Standard**: Change *only* the `seed` and `n` arguments you pass to
   `data.shipments(...)`; do not touch `zoro/data.py`. Then confirm the *column list*
   (not the values) is identical by printing `df.columns` before and after.
3. **Stretch**: Reuse the walk-up path loop from the notebooks (`while not
   (p / "zoro").is_dir() ...`) so your script finds `zoro` regardless of which folder
   you launch it from.
4. **Portfolio**: In your `README` block, record the four row counts and the seed in
   one place; a stranger should be able to regenerate and see the same numbers without
   asking you.

## Checklist (mirrors manifest.json + Excel tracker)

- [ ] Tue: Complete the Python refresher exercises in the environment notebook.
- [ ] Wed: Run the environment check notebook end-to-end (versions, imports, deterministic seed).
- [ ] Thu: Build the ZoroLogistics data generator: shipments, carriers, lanes, deterministic seeds.
- [ ] Fri: Use case: generate the 100k-row dataset, save to CSV/Parquet, commit it with a data dictionary.
- [ ] Sat: Take the Week 1 quiz (quiz.md), pass with 8/10; record the score in Notes.
- [ ] Milestone: Update the Excel tracker: Week 1 checked off; push your fork to GitHub.
