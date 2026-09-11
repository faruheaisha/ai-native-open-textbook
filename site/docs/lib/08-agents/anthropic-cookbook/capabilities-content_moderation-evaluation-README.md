---
title: "Evaluation"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/README.md"
zh: ""
---

# Evaluation

Runs the full pipeline against the labeled samples in all three domains
(`data/<domain>/samples.jsonl`) and compares each decision to its expected label.
Uses `engine.py` and `pipeline.py` from the cookbook folder, the same modules the
guide imports.

```bash
pip install anthropic python-dotenv
# from capabilities/content_moderation/ (needs ANTHROPIC_API_KEY):
python evaluation/run_eval.py
```

The ad_creatives domain uses the hand-written ruleset in `data/ad_creatives/rules.golden.json`;
the other two domains are compiled by Claude on first run and cached under
`evaluation/compiled/`. Results are written to `evaluation/results.json`.
