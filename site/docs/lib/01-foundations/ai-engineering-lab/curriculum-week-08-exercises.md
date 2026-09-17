---
title: "Week 08: Exercises & Checklist"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/curriculum/week-08/exercises.md"
sourceRel: "curriculum/week-08/exercises.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/curriculum/week-08/exercises.md"
sourceSha256: "ed7b68bb6d5fbeac04d0c4526ad749f3f7b102cec282ebe797110c3d5b5a2cde"
pageSha256: "ed7b68bb6d5fbeac04d0c4526ad749f3f7b102cec282ebe797110c3d5b5a2cde"
contentMode: "local-full"
zh: ""
---

# Week 08: Exercises & Checklist

## Graded exercises

1. **Easy**: Re-run `02-vram-sizing-and-model-selection.ipynb` with `task="coding"` and `task="reasoning"`; explain in one sentence each how the recommendation changes and why.
2. **Standard**: Add two models to the catalog (e.g. Gemma 2 9B, Phi-3.5) using real layer/head numbers from their model cards, then re-run the picker for both hardware cases.
3. **Stretch**: In `01-local-model-playground.ipynb`, add a `num_ctx` sweep (2048 vs 8192) and report the tokens/sec and VRAM tradeoff for the same prompt.
4. **Portfolio**: Write `projects/model_picker.py` (CLI: hardware GB + task in → model + quant + license + footprint out) and commit it together with the backend benchmark table.

## Hints

1. **Easy**: Call `pick_model(16.0, task="coding")` and `task="reasoning"`; the difference is `MIN_PARAMS`, not the catalog, explain which floor each task raises and why the recommendation moves (or returns `None`).
2. **Standard**: Append two dicts to `CATALOG` with the real `layers`/`heads`/`head_dim` from each model card (e.g. Gemma 2 9B, Phi-3.5); re-run `list_options` for both hardware cases and note any change in the license column.
3. **Stretch**: Run `benchmark(model, prompt, n=3)` with `--verbose` at `num_ctx=2048` and `num_ctx=8192` (pass it as a flag); report tokens/sec *and* the KV-cache GB difference from `kv_cache_gb` for the two lengths.
4. **Portfolio**: `argparse` two args (`--gb`, `--task`); reuse the `total_footprint`/`list_options` logic and print the top pick plus its license; write the benchmark table to a markdown file beside it.

## Checklist (mirrors manifest.json + Excel tracker)

- [ ] Mon: Study the model landscape: open vs closed, licenses, families (knowledge-base 08).
- [ ] Tue: Install Ollama; pull a small model; run chat and structured outputs locally.
- [ ] Wed: Try llama.cpp and MLX; compare tokens/sec across backends in a table.
- [ ] Thu: GPU setup check: CUDA/MPS/ROCm; benchmark with a small script.
- [ ] Fri: Use case: ticket triage with a local model + the VRAM-based model picker.
- [ ] Sat: Take the Week 8 quiz (quiz.md), pass with 8/10; record the score in Notes.
- [ ] Milestone: Update the Excel tracker; commit the benchmark table and picker.
