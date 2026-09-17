---
title: "Evaluation Suite Generation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/observe/references/evaluation-suite-generation.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/observe/references/evaluation-suite-generation.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/observe/references/evaluation-suite-generation.md"
sourceSha256: "bcdafbc4dbab193005e15c95e92d6a14fbcc40997fa7be002931ade352565bd7"
pageSha256: "bcdafbc4dbab193005e15c95e92d6a14fbcc40997fa7be002931ade352565bd7"
contentMode: "local-full"
zh: ""
---

# Evaluation Suite Generation

Use generated suites as the preferred setup path for deployed agents. The suite generation job can create synthetic or trace-derived data plus a rubric-based evaluator from agent, dataset, file, prompt, or trace context.

## Step 1: Ask the User Which Source to Use (MANDATORY)

> ⚠️ **Do not call `evaluation_suite_generation_job_create` without asking the user first.** The generation source materially changes the suite's coverage and cost. Use `ask_user` / `askQuestions` with these options:
>
> - **(a) Current agent code/definition** — synthetic Q&A generated from the agent's instructions and tool definitions. Best for brand-new or recently changed agents with no production traffic.
> - **(b) Historical traces** — sampled from real conversations. **Default lookback: last 3 days (`maxTraces` ~50).** Best for deployed agents with traffic, since the suite reflects real user intents and edge cases.
> - **(c) Existing eval.yaml** — local dataset/evaluator intent from the selected agent root. Best when azd AI agent eval configuration already exists.
>
> **Default selection rule:** If `eval.yaml` exists and `agent.name` matches the selected agent, recommend (c). Otherwise, if the agent has traces in the last 3 days (check via `trace` skill or `evaluation_agent_traces_batch_eval_create` lookback probe), recommend (b); otherwise recommend (a). Always let the user override.

If the user picks (b), compute `traceStartTime` and `traceEndTime` as unix seconds for the chosen window (default `now - 3*86400` to `now`).
If the user picks (c), do not assume a Foundry suite exists. Verify or register the local dataset and evaluators first as described below.

## Step 2: Create and Poll

Call `evaluation_suite_generation_job_create` with the selected `projectEndpoint`, `suiteName`, and `generationModelDeploymentName`. Provide the best available source context:

`suiteName` must start with a letter (`A-Z` or `a-z`). If a derived name starts with a number, prefix it with an alphabetic label such as `suite-`.

| Source | Parameters |
|--------|------------|
| Deployed agent (code/definition) | `agentName`, **`agentSourceNames: [<agentName>]`** (required for target), `agentSourceDescription` |
| Existing dataset | `datasetName`, `datasetVersion`, `datasetSourceDescription` |
| File | `fileId`, `fileSourceDescription` |
| Prompt | `promptSource`, `promptSourceDescription` |
| Traces | `traceAgentName` or `traceAgentId`, `traceAgentVersion`, `traceStartTime`, `traceEndTime` (unix seconds), `maxTraces`, `tracesSourceDescription` |

Set `dataGenerationType` (default `simple_qna`), `category` (default `quality`), `deploymentName` (target model for the evaluator's judge — required for LLM-judge evaluators), and `maxSamples` for generated examples.

### Parameter Requirements (Learned Constraints)

> ⚠️ The service rejects requests that miss these:
> - **`maxSamples` must be between 15 and 1000.** Smaller values (e.g., 10) fail with `Max samples must be between 15 and 1000`. Default to `15` for quick smoke suites, `50–100` for richer baselines.
> - **A `target` is required.** When generating from a deployed agent, pass **`agentSourceNames: [<agentName>]`** (not just `agentName`) so the service can construct the `azure_ai_agent` target. Without it, the request fails with `Target is required for evaluation suite generation`.
> - **`deploymentName`** (in `initialization_parameters`) is required when the generated evaluator uses an LLM judge — pass the same or a comparable deployment as `generationModelDeploymentName`.

Poll with `evaluation_suite_generation_job_get(projectEndpoint, jobId)` until the job reaches a terminal state (`succeeded`, `failed`, `canceled`). Generation typically takes **5-15 minutes** for synthetic Q&A and longer for trace-derived suites, so do not block the main response with repeated foreground polling.

> ⚠️ **Mandatory: poll in the background.** Once `evaluation_suite_generation_job_create` returns a `jobId`, persist the in-flight `generationJobId` in the selected `.foundry/agent-metadata*.yaml` file, start a background polling task or background terminal loop, and keep normal chat output clean. The foreground response should say that generation started and that final status will be surfaced when the background poll reaches a terminal state.
>
> **How to poll:** In the background worker, call `evaluation_suite_generation_job_get` every 60-120 seconds until `status` is `succeeded`, `failed`, or `canceled`. Suppress intermediate `in_progress` output unless the status changes or the job is stuck. Do not print every poll result to the user.
>
> The background poll may stop before terminal state only when: (a) the user explicitly tells you to stop polling, (b) the job has been `in_progress` for >30 minutes (treat as stuck and surface the job ID), or (c) polling errors repeatedly (surface the error). Leave the in-flight `generationJobId` recorded in metadata so a later turn can resume polling.
>
> When the background poll reaches `succeeded`, continue by calling `evaluation_suite_get` and then cache/update metadata before producing the completion summary. When it reaches `failed` or `canceled`, surface the terminal status and route to fallback.

## Existing eval.yaml Source

Use this path when the selected agent root has `eval.yaml` and the user chooses it:

1. Parse `agent.name`, `dataset.local_uri`, `dataset.name`, `dataset.version`, `validation_dataset`, `evaluators[]`, `name`, `options.eval_model`, `options.pass_threshold`, `max_samples`, `trace_days`, and `generation_instruction`. Legacy `dataset_file`, `dataset_reference`, and `validation_reference` may be normalized in memory when reading older files.
2. Verify `agent.name` matches the effective selected agent from azd/metadata. If it differs, stop and ask which target is authoritative.
3. Confirm `dataset.local_uri` exists under the selected agent root when present. Treat it as a local seed dataset until `evaluation_dataset_create` or a remote lookup succeeds.
4. For each evaluator name, call `evaluator_catalog_get` before treating it as remote. If missing, ask whether to create/register it or generate a new rubric-based evaluator.
5. If `name` is populated, call `evaluation_suite_get` before storing it as `suiteName`. If no suite exists, either create/register a reviewed suite or persist a local-draft entry without `suiteName`.
6. Persist only synced remote refs and local cache paths to `.foundry/agent-metadata*.yaml` with `generationSource: eval-yaml`; do not copy azd-owned deployment context into metadata.

## Cache Artifacts Locally

> ⚠️ **Mandatory after `succeeded`.** As soon as the background poll reaches `succeeded`, perform **all three** of the following calls and write **all three** files. This is not optional — partial caching (e.g., metadata stub instead of full evaluator definition) is the most common skill bug. Do not write the deployment/eval-setup summary until the three files exist.

Save artifacts under the selected agent root only, using these exact paths and contents:

| Call | Local file | Contents |
|------|------------|----------|
