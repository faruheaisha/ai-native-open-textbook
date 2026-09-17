---
title: "Application Runbook: Surface"
sourceId: "09-harness/repository-harness"
sourceTitle: "Repository Harness（仓库级 Agent 工作区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/hoangnb24/repository-harness"
entryUrl: "https://github.com/hoangnb24/repository-harness/blob/e765792b635b4d5e3e5fc0578f82f9ca5dea2681/docs/templates/application-runbook.md"
sourceRel: "docs/templates/application-runbook.md"
rawUrl: "/raw/09-harness/repository-harness/docs/templates/application-runbook.md"
sourceSha256: "1e87f2189066dd0469555406c9ef63c3939e53adfcb23494d2f13f0b9552a72d"
pageSha256: "1e87f2189066dd0469555406c9ef63c3939e53adfcb23494d2f13f0b9552a72d"
contentMode: "local-full"
zh: ""
---

# Application Runbook: Surface

Use this template only after repository evidence establishes the commands and
behavior. A heading with no verified content is a gap, not an operational
instruction.

## Scope

Name the application surface and the jobs this runbook supports.

## Prerequisites

List required runtimes, dependencies, services, credentials, and safe checks.

## Start

Record the exact command, process or project identity, ports, and writable
state. Distinguish fixed, defaulted, configurable, and observed values.

## Readiness

Name the observable condition that proves startup completed.

## Deterministic State

Explain how to create, select, or reset the scenario without touching unowned
state.

## Interface

Describe how to exercise the relevant browser, API, CLI, worker, or service.

## Runtime Evidence

Give retrieval commands for logs, traces, errors, and correlation identifiers.
Distinguish guaranteed fields from optional ones.

## Ownership And Cleanup

Explain how to identify resources created by this run and stop only those
resources. Keep missing cleanup policy under Unknowns.

## Validation

Name focused checks and the real-interface journey that prove the outcome.

## Unknowns

List missing facts or decisions that an agent must not invent.
