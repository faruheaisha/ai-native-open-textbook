---
title: "Step 2 - Run Evaluation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/observe/references/evaluate-step.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/observe/references/evaluate-step.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/observe/references/evaluate-step.md"
sourceSha256: "4915507eee85e4a30559da41e60ca7e20cb3658c0804c779f10ab329286357e9"
pageSha256: "4915507eee85e4a30559da41e60ca7e20cb3658c0804c779f10ab329286357e9"
contentMode: "local-full"
zh: ""
---

# Step 2 - Run Evaluation

## Prerequisites

- Agent deployed and running in the selected environment
- Selected `.foundry/agent-metadata*.yaml` file loaded for the active agent root
- Evaluation suite selected from the environment's `evaluationSuites[]`
- For generated suites: `suiteName` present and verified with `evaluation_suite_get`
- For legacy suites: local dataset and evaluator metadata available in `.foundry/`

## Definition of Done — Evaluation Run

A Step 2 evaluation run is complete only when **every** box below is checked. Do **not** produce a final "evaluation complete" summary, score table, or report link until all items are done. "Status reached `completed`" is **not** a stopping condition — `evaluation_get` returns metadata only.

- [ ] `evaluation_agent_batch_eval_create` returned an `evalRunId`
- [ ] `evalId` and `evalRunId` mirrored into the selected `.foundry/agent-metadata*.yaml` (`environments.<env>.lastEval.\{evalId, evalRunId, runName, suiteName, suiteVersion, agentVersion, startedAt\}`) so a later turn can resume
- [ ] Polling reached terminal state (`completed`, `failed`, or `cancelled`)
- [ ] Per-item `output_items` downloaded via the `azure-ai-projects` Python SDK (see [Step 3 → Download Results](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-observe-references-analyze-results#step-3--download-results)) — NOT via `evaluation_get`, NOT via `evaluation_dataset_sas_url_get`
