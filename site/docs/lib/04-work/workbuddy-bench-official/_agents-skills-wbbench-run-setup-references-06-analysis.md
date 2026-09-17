---
title: "Phase 6 — Metrics + trajectory analysis"
sourceId: "04-work/workbuddy-bench-official"
sourceTitle: "WorkBuddy Bench（腾讯官方评测集）"
sourceKind: "产品仓库"
licenseLabel: "限非商用"
lang: "英文"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/Tencent/workbuddy-bench"
entryUrl: "https://github.com/Tencent/workbuddy-bench/blob/625b2233093ae4f23e76be28c1f341d41cc70373/.agents/skills/wbbench-run-setup/references/06-analysis.md"
sourceRel: ".agents/skills/wbbench-run-setup/references/06-analysis.md"
rawUrl: "/raw/04-work/workbuddy-bench-official/.agents/skills/wbbench-run-setup/references/06-analysis.md"
sourceSha256: "f893790e3148a49480cdf2205d3e19789ea09d2841805dc988e62b0f57aeb940"
pageSha256: "f893790e3148a49480cdf2205d3e19789ea09d2841805dc988e62b0f57aeb940"
contentMode: "local-full"
zh: ""
---

# Phase 6 — Metrics + trajectory analysis

Do **not** reimplement reporting here. Once the run finishes, hand off to the
**`wbbench-report-skills`** skill (invoke it via the Skill tool). That skill
owns metric computation and trajectory analysis and routes to the matching
benchmark-specific workflow (WB-Bench-Office / WB-Bench-Web / WB-Bench-Code).

## What to pass

A single evaluation run artifact directory `RUN_DIR` — one model, one dataset,
one round. For a run launched here that's:

```
<bench.jobs_dir>/<slug>/<timestamp>/
```

(bench `jobs_dir` defaults to `results`, so typically
`results/<slug>/<timestamp>/`). Point at the timestamped run dir itself — the
one containing `config.json` / `result.json` / `job.log` / trial dirs — not a
parent `results/` and not a single trial dir.

If several timestamps exist under the slug, pass the exact one; the report skill
refuses to guess when a parent contains multiple runs.

## Boundary

`wbbench-report-skills` treats Harbor artifacts as read-only and writes only to
a user-specified output directory. Let it produce the metrics report and
trajectory analysis; this setup skill's job ends at a completed run.
