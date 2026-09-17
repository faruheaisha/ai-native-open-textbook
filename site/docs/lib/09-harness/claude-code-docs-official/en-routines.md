---
title: "Automate work with routines"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/routines.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/routines.md"
sourceSha256: "58c1526fa9b251f49a825d2006c13838445e1a0cdc0d6eda817c1282420f482b"
pageSha256: "58c1526fa9b251f49a825d2006c13838445e1a0cdc0d6eda817c1282420f482b"
contentMode: "local-full"
zh: ""
---

# Automate work with routines

> Put Claude Code on autopilot. Define routines that run on a schedule, trigger on API calls, or react to GitHub events from cloud infrastructure.

  Routines are in research preview. Behavior, limits, and the API surface may change.

A routine is a saved Claude Code configuration: a prompt, one or more repositories, and a set of [connectors](https://code.claude.com/docs/en/mcp), packaged once and run automatically. Routines execute on Anthropic-managed cloud infrastructure, or on your organization's [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments) when routed there, so they keep working when your laptop is closed.

Each routine can have one or more triggers attached to it:

* **Scheduled**: run on a recurring cadence like hourly, nightly, or weekly, or once at a specific future time
* **API**: trigger on demand by sending an HTTP POST to a per-routine endpoint with a bearer token
* **GitHub**: run automatically in response to repository events such as pull requests or releases

A single routine can combine triggers. For example, a PR review routine can run nightly, trigger from a deploy script, and also react to every new PR.

Routines are available on Pro, Max, Team, and Enterprise plans. Create and manage them at [claude.ai/code/routines](https://claude.ai/code/routines), or from the CLI with `/schedule`.

Team and Enterprise Owners can disable routines for all members with the Routines toggle at [claude.ai/admin-settings/claude-code](https://claude.ai/admin-settings/claude-code). When disabled, existing routines stop running and members cannot create new ones.

This page covers creating a routine, configuring each trigger type, managing runs, and how usage limits apply.

## Example use cases

Each example pairs a trigger type with the kind of work routines are suited to: unattended, repeatable, and tied to a clear outcome.

**Backlog maintenance.** A schedule trigger runs every weeknight against your issue tracker via a connector. The routine reads issues opened since the last run, applies labels, assigns owners based on the area of code referenced, and posts a summary to Slack so the team starts the day with a groomed queue.

**Alert triage.** Your monitoring tool calls the routine's API endpoint when an error threshold is crossed, passing the alert body as `text`. The routine's prompt tells Claude to investigate the alert in the fire payload, so it pulls the stack trace, correlates it with recent commits in the repository, and opens a draft pull request with a proposed fix and a link back to the alert. On-call reviews the PR instead of starting from a blank terminal.

**Bespoke code review.** A GitHub trigger runs on `pull_request.opened`. The routine applies your team's own review checklist, leaves inline comments for security, performance, and style issues, and adds a summary comment so human reviewers can focus on design instead of mechanical checks.

**Deploy verification.** Your CD pipeline calls the routine's API endpoint after each production deploy. The routine runs smoke checks against the new build, scans error logs for regressions, and posts a go or no-go to the release channel before the deploy window closes.

**Docs drift.** A schedule trigger runs weekly. The routine scans merged PRs since the last run, flags documentation that references changed APIs, and opens update PRs against the docs repository for an editor to review.

**Library port.** A GitHub trigger runs on `pull_request.closed` filtered to merged PRs in one SDK repository. The routine ports the change to a parallel SDK in another language and opens a matching PR, keeping the two libraries in step without a human re-implementing each change.

## Create a routine

Create a routine from the web at [claude.ai/code/routines](https://claude.ai/code/routines), from the Desktop app, or from the CLI. All three surfaces write to the same cloud account, so a routine you create in one shows up in the others immediately. In the Desktop app's **Code** tab, click **Routines** in the sidebar or in the sidebar's **More** menu, then **New routine**, and choose **Cloud**; choosing **Local** instead creates a [Desktop scheduled task](https://code.claude.com/docs/en/desktop-scheduled-tasks), which runs on your machine rather than in the cloud.

The creation form sets up the routine's prompt, repositories, environment, connectors, and triggers.

Routines run autonomously as full Claude Code cloud sessions: there is no permission-mode picker and no approval prompts during a run. The session can run shell commands, use [skills](https://code.claude.com/docs/en/skills) committed to the cloned repository, and call any connectors you include. What a routine can reach is determined by the repositories you select, the [environment's](https://code.claude.com/docs/en/cloud-environments) network access and variables, and the connectors you include. Scope each of those to what the routine actually needs.

Routines belong to your individual claude.ai account. They are not shared with teammates, and they count against your account's daily run allowance. Anything a routine does through your connected GitHub identity or connectors appears as you: commits and pull requests carry your GitHub user, and Slack messages, Linear tickets, or other connector actions use your linked accounts for those services.

### Create from the web

    Visit [claude.ai/code/routines](https://claude.ai/code/routines) and click **New routine**.

    Give the routine a descriptive name and write the prompt Claude runs each time. The prompt is the most important part: the routine runs autonomously, so the prompt must be self-contained and explicit about what to do and what success looks like.

    When a trigger fires, the session receives the routine's saved prompt as its assigned task and carries it out, rather than treating it as untrusted content that arrived mid-conversation. The trigger attests only that the prompt was stored ahead of time by an authorized session on your account, so the fired prompt is not live user input and can't act as approval or consent for actions during the run. Content the session fetches during the run keeps its normal handling. Before v2.1.213, the session received the same prompt framed as an untrusted background notification and could refuse to act on it.

    The prompt input includes a model selector. Claude uses the selected model on every run.

    Add one or more GitHub repositories for Claude to work in. Each repository is cloned at the start of a run, starting from the default branch. Claude creates `claude/`-prefixed branches for its changes.

    Pick a [cloud environment](https://code.claude.com/docs/en/cloud-environments) for the routine. Environments control what the cloud session has access to:

    * **Network access**: set the level of internet access available during each run
    * **Environment variables**: provide values Claude can use during each run. They're [visible to anyone who uses the environment](https://code.claude.com/docs/en/cloud-environments#what-carries-over-from-your-setup), so on Pro and Max plans, store keys for the APIs Claude calls during a run as [API credentials](https://code.claude.com/docs/en/cloud-environments#add-api-credentials) instead. That section also lists the requests that never get a credential
    * **Setup script**: install dependencies and tools the routine needs. The result is [cached](https://code.claude.com/docs/en/cloud-environments#environment-caching), so the script doesn't re-run on every session

    A **Default** environment is provided with **Trusted** network access, which allows only the [default allowlist](https://code.claude.com/docs/en/cloud-environments#default-allowed-domains) of package registries, cloud provider APIs, container registries, and common development domains through the session's network. Connectors you add to the routine reach their services through Anthropic's servers, so they don't need allowlist changes. If your routine needs to reach your own services directly, or a domain outside that list, edit the environment's [network access](https://code.claude.com/docs/en/cloud-environments#network-access) before running. To use a separate environment, [create one](https://code.claude.com/docs/en/cloud-environments#configure-your-environment) first.

    Under **Select a trigger**, choose how the routine starts. You can pick one trigger type or combine several.

        Pick a preset frequency for a recurring run, or schedule a single one-off run at a specific timestamp. See [Add a schedule trigger](#add-a-schedule-trigger) for timezone handling, stagger, custom cron intervals, and one-off runs.

        Select the repository, the event to react to, and optional filters. See [Add a GitHub trigger](#add-a-github-trigger) for the full list of supported events and filter fields.

        Select **API** here, then save the routine. The URL and token are generated after the routine is saved, since they depend on the routine ID. See [Add an API trigger](#add-an-api-trigger) to copy the URL and generate a token.
```
```

    Under **Connectors** at the bottom of the form, all of your connected [MCP connectors](https://code.claude.com/docs/en/mcp) are included by default. Remove any the routine doesn't need: Claude can use every tool from an included connector, including writes, without asking for permission during a run.

    Click **Create**. The routine appears in the list and runs the next time one of its triggers matches. To start a run immediately, click **Run now** on the routine's detail page.

    Each run creates a new session alongside your other sessions, where you can see what Claude did, review changes, and create a pull request.

### Create from the CLI

Run `/schedule` in any session to create a scheduled routine conversationally. You can also pass a description directly, for a recurring routine like `/schedule daily PR review at 9am` or a one-off like `/schedule clean up feature flag in one week`. Claude walks through the same information the web form collects, then saves the routine to your account. The command is also available under the alias `/routines`.

A successful start looks like a conversation: Claude asks follow-up questions about the schedule, repositories, and prompt before saving. If Claude instead replies that you need to authenticate or that it can't connect to your remote claude.ai account, no routine was created; see [Troubleshooting](#troubleshooting).

`/schedule` in the CLI creates scheduled routines. To add an API trigger, edit the routine on the web at [claude.ai/code/routines](https://claude.ai/code/routines). You can add a [GitHub trigger](#add-a-github-trigger) from the web or from the CLI. The CLI path requires Claude Code v2.1.225 or later.

A routine with no schedule trigger, such as one started only by API calls or GitHub events, has no next run time, and the CLI shows none when Claude saves or updates it. Before v2.1.211, the CLI reported a next run time in the year 1 for these routines.

## Configure triggers

A routine starts when one of its triggers matches. You can attach any combination of schedule, API, and GitHub triggers to the same routine, and add or remove them at any time from the **Select a trigger** section of the routine's edit form.

### Add a schedule trigger

A schedule trigger runs the routine on a recurring cadence, or once at a specific future time. Pick a preset frequency in the **Select a trigger** section: hourly, daily, weekdays, or weekly. Times are entered in your local zone and converted automatically, so the routine runs at that wall-clock time regardless of where the cloud infrastructure is located.

Runs may start a few minutes after the scheduled time due to stagger. The offset is consistent for each routine.

For a custom interval such as every two hours or the first of each month, pick the closest preset in the form, then run `/schedule update` in the CLI to set a specific cron expression. The minimum interval is one hour; expressions that run more frequently are rejected.

#### Schedule a one-off run

A one-off schedule fires the routine a single time at a specific timestamp. Use it to remind yourself later in the week, to open a cleanup PR after a rollout finishes, or to kick off a follow-up task when an upstream change lands. After the routine fires, it auto-disables and the web UI marks it as **Ran**. To run it again, edit the routine and set a new one-off time.

Create a one-off run from the CLI by describing the time in natural language. Claude resolves the phrase against the current time and confirms the absolute timestamp before saving.

```text theme={null}
/schedule tomorrow at 9am, summarize yesterday's merged PRs
```

```text theme={null}
/schedule in 2 weeks, open a cleanup PR that removes the feature flag
```

The same local-to-UTC conversion as recurring schedules applies to one-off timestamps.

One-off runs do not count against the daily routine run cap. See [Usage and limits](#usage-and-limits) for details.

### Add an API trigger

An API trigger gives a routine a dedicated HTTP endpoint. POSTing to the endpoint with the routine's bearer token starts a new session and returns a session URL. Use this to wire Claude Code into alerting systems, deploy pipelines, internal tools, or anywhere you can make an authenticated HTTP request.

API triggers are added to an existing routine from the web. The CLI cannot currently create or revoke tokens.

    Go to [claude.ai/code/routines](https://claude.ai/code/routines), click the routine you want to trigger via API, then click the pencil icon to open **Edit routine**.

    Scroll to the **Select a trigger** section below the **Instructions** box, click **Add another trigger**, and choose **API**.

    The modal shows the URL for this routine along with a sample curl command. Copy the URL, then click **Generate token** and copy the token immediately. The token is shown once and cannot be retrieved later, so store it somewhere secure such as your alerting tool's secret store.

    Send the token in the `Authorization: Bearer` header when you POST to the URL. The [Trigger a routine](#trigger-a-routine) section below shows a complete example.

Each routine has its own token, scoped to triggering that routine only. To rotate or revoke it, return to the same modal and click **Regenerate** or **Revoke**.

#### Trigger a routine

Send a POST request to the `/fire` endpoint with the bearer token in the `Authorization` header. The request body accepts an optional `text` field for run-specific context such as an alert body or a failing log, passed to the routine alongside its saved prompt. The value is freeform text and is not parsed: if you send JSON or another structured payload, the routine receives it as a literal string.
