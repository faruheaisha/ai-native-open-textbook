---
title: "dataset-quality-audit"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/dataset-quality-audit/SKILL.md"
sourceRel: "skills/dataset-quality-audit/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/dataset-quality-audit/SKILL.md"
sourceSha256: "db466ec94266463581043e9ddb970ba4f30de2439cf9ab4d20b0d0485c5dd560"
pageSha256: "db466ec94266463581043e9ddb970ba4f30de2439cf9ab4d20b0d0485c5dd560"
contentMode: "local-full"
zh: ""
---

# dataset-quality-audit

A data quality auditing tool that runs 12-dimension quality checks on tabular data, producing per-dimension scores (0–100), an overall grade, and actionable fix suggestions.

## Capabilities

| Dimension | Description |
|-----------|-------------|
| Missing Values | Count and percentage of null/NaN values per column |
| Duplicate Rows | Number and percentage of fully duplicated rows |
| Type Consistency | Mixed types within a single column (e.g., numbers mixed with text) |
| Value Range / Outliers | Outlier detection using the IQR method |
| Format Compliance | Consistency of date, email, phone number, and other formatted fields |
| Uniqueness Constraints | Whether ID-type columns contain duplicates |
| Whitespace Issues | Leading/trailing spaces, empty strings, whitespace-only values |
| Constant Columns | Columns with only a single unique value (zero information) |
| Distribution Skewness | Whether numeric columns have excessive skewness |
| Column Naming | Spaces, special characters, or inconsistent casing in column names |
| Cardinality Anomalies | Unusually high or low number of unique values |
| Cross-Column Consistency | Logical checks across columns (e.g., start date before end date) |

## Quick Start

```bash
# Basic quality check
python3 scripts/data_quality_checker.py data.csv

# Save report as JSON
python3 scripts/data_quality_checker.py data.csv --output report.json

# Specify ID columns (for uniqueness checks)
python3 scripts/data_quality_checker.py users.csv --id-columns "user_id,email"

# Specify date columns (for format checks)
python3 scripts/data_quality_checker.py orders.csv --date-columns "created_at,updated_at"
```

## Detailed Usage

### Basic Invocation

```bash
