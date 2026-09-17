---
title: "Week 23: Exercises & Checklist"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/curriculum/week-23/exercises.md"
sourceRel: "curriculum/week-23/exercises.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/curriculum/week-23/exercises.md"
sourceSha256: "85429922f5bfd621cb40d07b0764265c99172892e451426ca7308df03e662561"
pageSha256: "85429922f5bfd621cb40d07b0764265c99172892e451426ca7308df03e662561"
contentMode: "local-full"
zh: ""
---

# Week 23: Exercises & Checklist

## Graded exercises

1. **Easy**: Run `notebooks/01-mlflow-feature-engineering-training.ipynb` to completion. It prints the champion and challenger test MAE and the final `@prod`/`@challenger` version mapping. Record all four in the Week 23 tracker sheet.

2. **Standard**: In `notebooks/02-vector-search-rag.ipynb`, add a fifth policy document to the inline corpus, re-embed it, re-sync the AI Search index, and confirm a matching question now retrieves the new document in the top results. Note the new groundedness score next to the old one.

3. **Stretch**: In `01-mlflow-feature-engineering-training.ipynb`, train a variant that drops the time-series `FeatureLookup` (static features only). Quantify the test-MAE degradation and write one sentence on what the point-in-time feature is worth, the measured value of preventing leakage.

4. **Portfolio**: Advance the **ZoroLogistics point-in-time ETA model** milestone: serve the `@prod` model on a Model Serving endpoint, call it with a sample feature vector, and record the prediction plus latency for your portfolio.

## Hints

1. **Easy**: Run notebook 01 to the final cell; record the two MAEs, the
   `@prod`/`@challenger` mapping, and the `point-in-time gain`. If autologging emits
   warnings, they are safe, the metrics still land on the run.
2. **Standard**: Add your fifth doc to the inline `docs` list *before* the
   `createDataFrame` write, re-run embed → index (`pipeline_type="TRIGGERED"` needs a
   sync) → query, and compare the new groundedness score to the old one.
3. **Stretch**: Reuse the challenger path in notebook 01 but drop the *entire*
   point-in-time lookup from `create_training_set`; the test-MAE delta against the
   champion is the measured value of preventing leakage.
4. **Portfolio**: Serve `@prod` with a scale-to-zero endpoint, call it with
   `dataframe_records` (the same feature dict the model signature expects), and record
   the prediction plus cold/warm latency.

## Checklist (mirrors manifest.json + Excel tracker)

- [ ] Mon: MLflow + feature tables: log a baseline; build point-in-time features.
- [ ] Tue: Train the ETA model (XGBoost or PyTorch); register it in MLflow; compare challenger.
- [ ] Wed: Create the serving endpoint + AI Gateway rate limit; call from Python.
- [ ] Thu: Vector Search: index policy docs; build the RAG chain with ai_query.
- [ ] Fri: Use case: Genie space on the gold tables; verify its SQL; publish it.
- [ ] Sat: Take the Week 23 quiz (quiz.md), pass with 8/10; record the score in Notes.
- [ ] Milestone: Update the Excel tracker; commit the ML assets.
