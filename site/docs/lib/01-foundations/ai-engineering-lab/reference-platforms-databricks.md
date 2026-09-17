---
title: "Databricks: Zero to Hero"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/reference/platforms/databricks/README.md"
sourceRel: "reference/platforms/databricks/README.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/reference/platforms/databricks/README.md"
sourceSha256: "5db3793f55349787167977d2631cfcb46a7e182559ab0c31fde2da7e15729180"
pageSha256: "5db3793f55349787167977d2631cfcb46a7e182559ab0c31fde2da7e15729180"
contentMode: "local-full"
zh: ""
---

# Databricks: Zero to Hero

> Part of AI Engineering Lab · Developed by Zorost Intelligence AI Lab · https://zorost.com
> The most comprehensive module in the program: Databricks AI engineering from
> day zero to production, mirroring Zorost's own Databricks Modernization Practice
> (Legacy BI Migration · ETL Conversion → Lakeflow/Spark/DLT · Unity Catalog
> Governance · Model Serving · FinOps).

This module is the backbone of **Weeks 21 to 24** of the 24-week program and stands
alone as a complete Databricks learning path. Notebooks live in
[`curriculum/week-21/`](/lib/01-foundations/ai-engineering-lab/curriculum-week-21) through `week-24/`; the files
below are the concept deep-dives.

## The path

| # | File | What you learn | Week |
|---|---|---|---|
| 00 | [00-day-zero-setup.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-00-day-zero-setup) | Account, workspace, CLI auth, first notebook | 21 |
| 01 | [01-unity-catalog.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-01-unity-catalog) | Metastore, catalogs, schemas, volumes, grants, lineage | 21 |
| 02 | [02-compute.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-02-compute) | Clusters, SQL warehouses, serverless, DBU pricing | 21 |
| 03 | [03-delta-lake.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-03-delta-lake) | ACID, time travel, VACUUM/OPTIMIZE, liquid clustering, medallion | 21 |
| 04 | [04-dbsql.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-04-dbsql) | Databricks SQL, SQL editor, AI/BI dashboards | 21 |
| 05 | [05-pyspark.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-05-pyspark) | PySpark DataFrames, performance, Photon | 22 |
| 06 | [06-pipelines-jobs.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-06-pipelines-jobs) | Lakeflow Pipelines (DLT), streaming, Lakeflow Jobs, Connect | 22 |
| 07 | [07-mlflow-experiments.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-07-mlflow-experiments) | MLflow tracking, model registry, autologging | 23 |
| 08 | [08-feature-engineering.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-08-feature-engineering) | UC feature tables, FeatureLookup, point-in-time joins | 23 |
| 09 | [09-model-training.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-09-model-training) | Classic ML, AutoML, Databricks Model Training | 23 |
| 10 | [10-model-serving.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-10-model-serving) | Serving endpoints, AI Gateway, external models | 23 |
| 11 | [11-vector-search-rag.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-11-vector-search-rag) | Vector Search indexes, Delta Sync, RAG patterns | 23 |
| 12 | [12-ai-functions-genie.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-12-ai-functions-genie) | AI functions (ai_query…), Genie spaces | 23 |
| 13 | [13-agents.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-13-agents) | Agent Framework (Mosaic AI), Agent Bricks, Agent Evaluation | 23 to 24 |
| 14 | [14-apps-dashboards.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-14-apps-dashboards) | AI/BI dashboards, Databricks Apps | 24 |
| 15 | [15-dabs-ci-cd.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-15-dabs-ci-cd) | Asset Bundles, CLI, Git folders, CI/CD | 24 |
| 16 | [16-governance-security.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-16-governance-security) | Row filters, column masks, dynamic views, audit | 24 |
| 17 | [17-finopps-cost.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-17-finopps-cost) | Billing system tables, cost dashboards, FinOps | 24 |
| 18 | [18-certification-path.md](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-18-certification-path) | Databricks certifications and the hero's recap | 24 |

## The capstone

[`capstone/`](/lib/01-foundations/ai-engineering-lab/reference-platforms-databricks-capstone), **ZoroLogistics Lakehouse Intelligence**: the full
stack from Weeks 21 to 23 (medallion lakehouse, streaming pipeline, point-in-time ETA
model, Vector Search RAG, Genie space) shipped as a Databricks Asset Bundle with
CI/CD, governance, and a FinOps dashboard.

## How to use this module

1. **Weeks 21 to 24 give you the schedule**: follow the weekly checklists in the
   Excel tracker; each week links here for concept depth.
2. **Upload, don't rewrite**: the weekly notebooks run in any Databricks
   workspace (workspace files → Repos), or run the SQL parts in the SQL editor.
3. **Everything here is verified against the official Databricks documentation**
   (docs.databricks.com), cited in each file's Sources section. Databricks renames
   features at a brisk pace; each file notes "verify against live docs" where it
   matters.
4. **Free tier reality**: Databricks offers a free trial with serverless SQL and
   notebooks; keep the cost notes in file 17 in mind from day one.

## Related

- [Knowledge base: Databricks overview](/lib/01-foundations/ai-engineering-lab/reference-knowledge-base-13-databricks-overview)
- [Week 21: Day Zero](/lib/01-foundations/ai-engineering-lab/curriculum-week-21) · [Week 22](/lib/01-foundations/ai-engineering-lab/curriculum-week-22) ·
  [Week 23](/lib/01-foundations/ai-engineering-lab/curriculum-week-23) · [Week 24](/lib/01-foundations/ai-engineering-lab/curriculum-week-24)
- [Zorost Databricks Modernization Practice](https://zorost.com)

---
© 2026 Zorost Intelligence LLC · https://zorost.com
