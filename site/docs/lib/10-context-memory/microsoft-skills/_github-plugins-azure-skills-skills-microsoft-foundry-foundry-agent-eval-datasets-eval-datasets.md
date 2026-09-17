---
title: "Evaluation Datasets — Trace-to-Dataset Pipeline & Lifecycle Management"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/eval-datasets.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/eval-datasets.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/eval-datasets.md"
sourceSha256: "02654e7ae740323ce61c94b1425135452ff44e1ca8d73bc89656282bafca0fa9"
pageSha256: "02654e7ae740323ce61c94b1425135452ff44e1ca8d73bc89656282bafca0fa9"
contentMode: "local-full"
zh: ""
---

# Evaluation Datasets — Trace-to-Dataset Pipeline & Lifecycle Management

Manage the full lifecycle of evaluation datasets for a Foundry agent: generating or regenerating data, harvesting production traces into the selected agent root's local `.foundry` cache, curating versioned test datasets, tracking evaluation quality over time, and syncing approved updates back to Foundry when needed.

## When to Use This Skill

USE FOR: create dataset from traces, harvest traces into dataset, build test dataset, dataset versioning, version my dataset, tag dataset, pin dataset version, organize datasets, dataset splits, curate test cases, review trace candidates, evaluation trending, metrics over time, eval regression, regression detection, compare evaluations over time, dataset comparison, evaluation lineage, trace to dataset pipeline, annotation review, production traces to test cases.

> ⚠️ **DO NOT manually run** KQL queries to extract datasets or call `evaluation_dataset_create` **without reading this skill first.** This skill defines the correct trace extraction patterns, schema transformation, cache rules, versioning conventions, and quality gates that raw tools do not enforce.

> 💡 **Tip:** This skill complements the [observe skill](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-observe-observe) (eval-driven optimization loop) and the [trace skill](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-trace-trace) (production trace analysis). Use this skill when you need to bridge traces and evaluations: turning production data into test cases and tracking evaluation quality over time.

## Quick Reference

| Property | Value |
|----------|-------|
| MCP server | `azure` |
| Key Foundry MCP tools | `data_generation_job_create`, `data_generation_job_get`, `evaluation_dataset_create`, `evaluation_dataset_get`, `evaluation_dataset_versions_get`, `evaluation_suite_create`, `evaluation_suite_get`, `evaluation_get`, `evaluation_comparison_create`, `evaluation_comparison_get` |
| Storage tools | `project_connection_list` (discover `AzureStorageAccount` connection), `project_connection_create` (add storage connection) |
| Azure services | Application Insights (via `monitor_resource_log_query`), Azure Blob Storage (dataset sync) |
| Prerequisites | Agent deployed, effective context resolved from azd or metadata overlay, App Insights connected |
| Local cache | `.foundry/datasets/`, `.foundry/results/`, `.foundry/evaluators/` |

## Entry Points

| User Intent | Start At |
|-------------|----------|
| "Create dataset from production traces" / "Harvest traces" | [Trace-to-Dataset Pipeline](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-eval-datasets-references-trace-to-dataset) |
| "Version my dataset" / "Tag dataset" / "Pin dataset version" | [Dataset Versioning](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-eval-datasets-references-dataset-versioning) |
| "Organize my datasets" / "Dataset splits" / "Filter datasets" | [Dataset Organization](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-eval-datasets-references-dataset-organization) |
| "Review trace candidates" / "Curate test cases" | [Dataset Curation](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-eval-datasets-references-dataset-curation) |
| "Show eval metrics over time" / "Evaluation trending" | [Eval Trending](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-eval-datasets-references-eval-trending) |
| "Did my agent regress?" / "Regression detection" | [Eval Regression](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-eval-datasets-references-eval-regression) |
| "Compare datasets" / "Experiment comparison" / "A/B test" | [Dataset Comparison](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-eval-datasets-references-dataset-comparison) |
| "Sync dataset to Foundry" / "Refresh local dataset cache" | [Trace-to-Dataset Pipeline -> Step 5](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-eval-datasets-references-trace-to-dataset#step-5--sync-local-cache-with-foundry-optional) |
| "Trace my evaluation lineage" / "Audit eval history" | [Eval Lineage](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-eval-datasets-references-eval-lineage) |
| "Generate eval dataset" / "Create seed dataset" / "Generate test cases for my agent" | [Generate Seed Dataset](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-eval-datasets-references-generate-seed-dataset) |
| "Regenerate dataset" / "Refresh synthetic data" / "Generate from traces without full suite" | [Generated Data Refresh](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-observe-references-evaluation-suite-generation#regenerate-one-artifact) |

## Before Starting — Detect Current State

1. Resolve the target agent root, environment, effective deployment context, and selected metadata overlay using [Common Project Context Resolution](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-SKILL#agent-common-project-context-resolution).
2. Confirm the selected environment's `projectEndpoint`, `agentName`, and observability settings from azd first, then metadata overrides.
3. Check `.foundry/datasets/`, `.foundry/results/`, `.foundry/datasets/manifest.json`, and `eval.yaml` in the selected agent root only.
4. Check whether `evaluation_dataset_get` returns server-side datasets for the same environment and whether `evaluationSuites[]` contains `suiteName`/`suiteVersion` references.
5. Route to the appropriate entry point based on user intent.

## The Foundry Flywheel

```text
Production Agent -> [1] Trace (App Insights + OTel)
                -> [2] Harvest (KQL extraction)
                -> [3] Curate (human review)
                -> [4] Dataset Cache (.foundry/datasets, versioned)
                -> [5] Sync to Foundry (optional refresh/push)
                -> [6] Evaluate (batch eval)
                -> [7] Analyze (trending + regression)
                -> [8] Compare (agent versions OR dataset versions)
                -> [9] Deploy -> back to [1]
```

Each cycle makes the test suite harder and more representative. Production failures from release N become regression tests for release N+1.

## Behavioral Rules

1. **Always show KQL queries.** Before executing any trace extraction query, display it in a code block. Never run queries silently.
2. **Scope to time ranges.** Always include a time range in KQL queries (default: last 7 days for trace harvesting). Ask the user for the range if not specified.
3. **Require human review.** Never auto-commit harvested traces to a dataset without showing candidates to the user first. The curation step is mandatory.
4. **Use dataset naming conventions.** Follow the naming conventions below and keep local filenames aligned with the registered Foundry dataset name/version.
5. **Treat local files as cache.** Reuse `.foundry/datasets/` and `.foundry/evaluators/` when they already match the selected environment in the selected agent root. Offer refresh when the user asks or when remote state has changed.
6. **Use generated data when requested.** Prefer `data_generation_job_create` for standalone dataset regeneration from agent, dataset, prompt, file, or trace context. Poll with `data_generation_job_get`; if generation fails or returns incomplete artifacts, explain the failure and fall back to the local/manual dataset flow.
7. **Stay inside the selected agent root.** After resolving the agent root, inspect only that folder's `.foundry/` cache and source context. Never merge sibling agent folders.
8. **Persist artifacts.** Save datasets to `.foundry/datasets/`, evaluation results to `.foundry/results/`, and track lineage in `.foundry/datasets/manifest.json`.
9. **Keep evaluation suites aligned.** Update the selected environment's `evaluationSuites[]` in the selected metadata file whenever a dataset version, evaluator set, suite version, or suite tags change. Local flows should default to `agent-metadata.yaml`; prod or CI-targeted flows can use `agent-metadata.<env>.yaml`. If the environment still uses older `testSuites[]` or legacy `testCases[]`, treat that list as the current suite source for this session and rewrite it as `evaluationSuites[]` on the next metadata save.
10. **Confirm before overwriting.** If a dataset version or cache file already exists, warn the user and ask for confirmation before replacing or refreshing it.
11. **Sync to Foundry when requested or needed.** After saving datasets locally, refresh or register them in Foundry only when the user asks or the workflow needs shared/CI usage. Use `evaluation_suite_create` for reviewed suite versions that combine the updated dataset and evaluator set.
12. **Never remove dataset rows or weaken evaluators to recover scores.** Score drops after a dataset update are expected - harder tests expose real gaps. Optimize the agent for new failure patterns; do not shrink the test suite.
13. **Match eval parameter names exactly.** Use `evaluation_agent_batch_eval_create` for agent-target batch eval, including suites that have `suiteName`; call `evaluation_suite_get` only to resolve suite metadata. Use `evaluationId` when creating grouped batch runs, but use `evalId` for `evaluation_get` and comparison/trending lookups.

## Dataset Naming and Metadata Conventions

| Dataset type | Foundry dataset name | Foundry dataset version | Typical local file | Metadata stage |
|--------------|----------------------|-------------------------|--------------------|----------------|
