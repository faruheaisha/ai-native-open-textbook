---
title: "CLI CRUD and Operations"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/routine/references/cli-crud.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/routine/references/cli-crud.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/routine/references/cli-crud.md"
sourceSha256: "5817c5a84652b66c3af951aa1f25aec1fd1898c8e8cc31cbb8524652e16a55cc"
pageSha256: "5817c5a84652b66c3af951aa1f25aec1fd1898c8e8cc31cbb8524652e16a55cc"
contentMode: "local-full"
zh: ""
---

# CLI CRUD and Operations

Use `azd ai routine` for imperative routine CRUD and operations. Every verb accepts `--output json` or `--output table` (default), and `-p <endpoint>` to override the resolved project endpoint.

## Vocabulary: CLI aliases vs. manifest values

A routine is a **trigger** (when it fires) plus an **action** (what it does). There are two spellings for each type: the CLI flags accept a short **alias**, while a `--file` manifest (and `azure.yaml`) use the raw **wire `type:` value**. They mean the same thing.

**Triggers**

| Fires on | `--trigger` alias | manifest `type:` | Key fields |
|----------|-------------------|------------------|------------|
| A single moment (one-shot) | `timer` | `timer` | `at` (ISO 8601 UTC) |
| A recurring cron schedule | `recurring` | `schedule` | `cron_expression`, `time_zone` |
| A GitHub issue event | `github-issue` | `github_issue` | `connection_id`, `owner`, `repository`, `issue_event` |
| A custom external event | `custom` | `custom` | `provider`, `event_name`, `parameters` |

**Actions** — both invoke the target agent; they differ only in which agent protocol is called and which field resumes prior context.

| Invokes the agent using | `--action` alias | manifest `type:` | Resume field |
|-------------------------|------------------|------------------|--------------|
| the agent `responses` protocol | `agent-response` (default) | `invoke_agent_responses_api` | `conversation` |
| the agent `invocations` protocol | `agent-invoke` | `invoke_agent_invocations_api` | `session_id` |

## Create

Put the prompt or payload the routine sends to the agent in `action.input`. What it should contain depends on the action type you chose (the `--action` alias / action `type:` from the table above): when the action is `agent-response` (`invoke_agent_responses_api`), `action.input` is the natural-language prompt; when the action is `agent-invoke` (`invoke_agent_invocations_api`), it is the hosted agent's expected request payload. `azd ai routine create` has **no `--input` flag**, so any routine that needs `action.input` must be created from a manifest:

```yaml
# routine.yaml — the type: fields take the manifest value from the table above
triggers:
  default:
    type: schedule
    cron_expression: "0 * * * *"
action:
  type: invoke_agent_responses_api
  agent_name: my-agent
  input: "Say hi."
```

```bash
azd ai routine create hourly-hello --file routine.yaml
```

Flag-only create works only when the target agent needs no stored input. `--file` and `--trigger` are mutually exclusive.

```bash
# One-shot timer -> agent
azd ai routine create nightly-report \
  --trigger timer --at <YYYY-MM-DDTHH:MM:SSZ> \
  --action agent-response --agent-name my-agent

# Recurring cron schedule
azd ai routine create daily-digest \
  --trigger recurring --cron "0 8 * * *" --time-zone America/New_York \
  --action agent-response --agent-name my-agent \
  --description "Daily 8am digest"

# GitHub issue event -> agent
azd ai routine create triage-on-open \
  --trigger github-issue \
