---
title: "Generated data"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/README.md"
zh: ""
---

# Generated data

This folder is where Week 1 writes the synthetic freight dataset. The files
themselves are gitignored. You generate them locally:

```python
from zoro import data
data.save_all()          # writes CSV + Parquet under data/
```

Do not commit the generated tables. Anyone who clones the repo can rebuild the
same rows from `zoro/data.py` with the same seed.
