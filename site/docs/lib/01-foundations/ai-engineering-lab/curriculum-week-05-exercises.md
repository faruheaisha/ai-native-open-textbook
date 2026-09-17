---
title: "Week 05: Exercises & Checklist"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/curriculum/week-05/exercises.md"
sourceRel: "curriculum/week-05/exercises.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/curriculum/week-05/exercises.md"
sourceSha256: "149202b94fc9b5e23cdc59189a5ae1923beb049c2a5e08ca695b4363870d7e97"
pageSha256: "149202b94fc9b5e23cdc59189a5ae1923beb049c2a5e08ca695b4363870d7e97"
contentMode: "local-full"
zh: ""
---

# Week 05: Exercises & Checklist

## Graded exercises

1. **Easy**: Re-run `01-tokenization-lab.ipynb` with a different price pair (e.g. `$0.50/$1.50` per Mtok) and report the new daily cost. Then cut the system prompt to 8 words and show the dollar delta.
2. **Standard**: Add a new text type to the token-count comparison (a JSON schema, a legal clause, or a carrier contract excerpt). Write one sentence explaining why its chars/token ratio differs from prose.
3. **Stretch**: Extend `02-embeddings-and-attention-lab.ipynb`: split the toy embedding dimension in half and run *two* attention heads in parallel. Print both weight matrices and describe how the heads differ. No torch.
4. **Portfolio**: Write `projects/token_budget.py`: a CLI that reads a text file, takes a price pair and a target window size, and prints token count, cost, and percent-of-window used. Commit it with a small README.

## Hints

1. **Easy**: Reuse `estimate_cost` unchanged; only the two price arguments and the system-prompt string change. Report the *delta*, not just the new number.
2. **Standard**: Pick a text type with many punctuation/code-like symbols (a JSON schema or legal clause); tokenize it and compare its chars/token to the prose row before writing your sentence.
3. **Stretch**: Split the embedding dimension `d` in half along `axis=-1` into `Q1/K1/V1` and `Q2/K2/V2`, call the same `scaled_dot_product_attention` twice, and stack the outputs. Describe *which* token relationships each head's weight matrix favors.
4. **Portfolio**: `argparse` the file path, two prices, and the window size; use `len(enc.encode(text))` for tokens and `tokens / window` for percent. Round the dollar figure to 4 decimals.

## Checklist (mirrors manifest.json + Excel tracker)

- [ ] Mon: Study tokenization and embeddings (knowledge-base 03).
- [ ] Tue: Tokenizer lab: BPE encode/decode and a token-cost estimator for the LLM API.
- [ ] Wed: Embeddings lab: similarity search over shipment commodity descriptions.
- [ ] Thu: Attention lab: implement scaled dot-product attention in NumPy; visualize the weights.
- [ ] Fri: Use case: build the context-window budget calculator (tokens per call vs window size).
- [ ] Sat: Take the Week 5 quiz (quiz.md), pass with 8/10; record the score in Notes.
- [ ] Milestone: Update the Excel tracker; commit both labs.
