---
title: "Configuration system"
sourceId: "04-work/workbuddy-bench-official"
sourceTitle: "WorkBuddy Bench（腾讯官方评测集）"
sourceKind: "产品仓库"
licenseLabel: "限非商用"
lang: "英文"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/Tencent/workbuddy-bench"
entryUrl: "https://github.com/Tencent/workbuddy-bench/blob/625b2233093ae4f23e76be28c1f341d41cc70373/README.md"
zh: ""
---

# Configuration system

**English** | [简体中文](https://github.com/Tencent/workbuddy-bench/blob/625b2233093ae4f23e76be28c1f341d41cc70373/configs/README.zh.md)

Every input to an evaluation run lives here. The four subdirectories are the four
layers. At runtime they are first **deep-merged**, then resolved into a single
**resolved manifest JSON**, and finally rendered into the **runtime config YAML**
handed to Harbor (the difference between the last two is explained under
"Artifacts: manifest JSON vs. runtime config YAML" below):

```
configs/bench/<dataset_id>.yaml       ← run invariants + context window (per dataset)
configs/harnesses/<family>/…          ← identity, params, and env of the agent CLI under test
configs/models/<provider>/<slug>.yaml ← model identity, backend URL/KEY env names, sampling params
configs/jobs/<slug>.yaml              ← composition of the three above + per-run overrides
```

Merge order (later overrides earlier):

```
bench/_default.yaml
  → bench/<dataset_id>.yaml
    → harnesses/<family>/<version>.yaml
      → models/<slug>.yaml
        → jobs/<slug>.yaml
```

The merge is performed by `workbuddy_bench.runner.prepare_job`; the rendered
runtime config YAML is written to `.workspace/data/generated/jobs/` (a local,
gitignored working directory). Credentials never enter these YAML files — the
files carry only **env variable names**, while the real secrets stay in `.env`.

### Artifacts: manifest JSON vs. runtime config YAML

A run produces two easily-confused artifacts with different paths and purposes:

- **Resolved manifest JSON** —
