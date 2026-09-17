---
title: "CSV Playbook"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/tools/skills/csv-workbench/playbook.md"
sourceRel: "examples/tools/skills/csv-workbench/playbook.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/tools/skills/csv-workbench/playbook.md"
sourceSha256: "5817db0ccc885a1ce4636588c3866276a8b6c6d5d349f22803bf6cb73e603613"
pageSha256: "5817db0ccc885a1ce4636588c3866276a8b6c6d5d349f22803bf6cb73e603613"
contentMode: "local-full"
zh: ""
---

# CSV Playbook

## Quick checks

- Preview rows: `head -n 10 /mnt/data/your-file.csv`.
- Count rows:

```bash
python - <<'PY'
import csv

with open('/mnt/data/your-file.csv', newline='') as f:
    print(sum(1 for _ in csv.DictReader(f)))
PY
```

## Grouped totals template

```bash
python - <<'PY'
import csv
from collections import defaultdict

totals = defaultdict(float)
with open('/mnt/data/your-file.csv', newline='') as f:
    for row in csv.DictReader(f):
        totals[row['region']] += float(row['amount'])

for region in sorted(totals):
    print(region, round(totals[region], 2))
PY
```
