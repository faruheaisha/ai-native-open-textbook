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
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/capabilities/content_moderation/evaluation/README.md"
sourceRel: "capabilities/content_moderation/evaluation/README.md"
rawUrl: "/raw/08-agents/anthropic-cookbook/capabilities/content_moderation/evaluation/README.md"
sourceSha256: "698a711fa45bc1cb24f8da590f28ce828e0d101476e329ca1733e99df272b854"
pageSha256: "698a711fa45bc1cb24f8da590f28ce828e0d101476e329ca1733e99df272b854"
contentMode: "local-full"
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
