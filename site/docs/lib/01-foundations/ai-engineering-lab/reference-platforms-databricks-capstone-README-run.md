---
title: "Capstone: Run Instructions"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/reference/platforms/databricks/capstone/README-run.md"
sourceRel: "reference/platforms/databricks/capstone/README-run.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/reference/platforms/databricks/capstone/README-run.md"
sourceSha256: "151dc7411299a0d1dd121c2f82e02b1fab9fad078ae51cc9afe89ede7e3c28cf"
pageSha256: "151dc7411299a0d1dd121c2f82e02b1fab9fad078ae51cc9afe89ede7e3c28cf"
contentMode: "local-full"
zh: ""
---

# Capstone: Run Instructions

> Part of AI Engineering Lab · Developed by Zorost Intelligence AI Lab · [zorost.com](https://zorost.com)

Step-by-step runbook to reproduce the ZoroLogistics Lakehouse Intelligence bundle from a
clean checkout. Goal: `validate` → `deploy` → `run` → verify the three tables.

---

## 0. Prerequisites

- A Databricks workspace (free trial is fine; serverless pipelines need a serverless-capable
  region).
- The **Databricks CLI** (unified, ≥ v0.281 recommended), `databricks --version`.
- The **Week-01 `shipments.csv`** (generate locally with
  `python -c "from zoro import data; data.save_all('data', seed=42)"`).

## 1. Authenticate (OAuth U2M)

Create a CLI profile for the bundle's `dev` target (`zrl-dev`):

```bash
