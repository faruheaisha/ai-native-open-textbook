---
title: "Vally Scenarios Guide"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/README.md"
sourceRel: "tests/scenarios/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/README.md"
sourceSha256: "5ee400238b16f5abbd382878de3644ffd76e6292a2dc7bb61c0fc6aab49b150b"
pageSha256: "5ee400238b16f5abbd382878de3644ffd76e6292a2dc7bb61c0fc6aab49b150b"
contentMode: "local-full"
zh: ""
---

# Vally Scenarios Guide

This directory contains per-skill Vally evaluation scenarios used to validate skill effectiveness and code quality.

## Scope

- Scenario folders live under this directory, for example:
  - azure-ai-projects-py
  - fastapi-router-py
  - azure-storage-blob-ts
- Shared grader tools and plugin code live in:
  - _shared/vally

## Prerequisites

Install and configure the following tools before running evaluations:

1. Node.js 20.17+
2. Corepack enabled
3. pnpm version pinned by tests/package.json
4. Dependencies installed in tests/
5. Build scripts approved for pnpm install policy
6. Python installed and on PATH for Python syntax and idiomatic graders

## One-Time Setup

From repository root:

1. Enable Corepack:
   corepack enable

2. Activate pinned pnpm version (currently 11.10.0):
   corepack prepare pnpm@11.10.0 --activate

3. Install test dependencies:
   pnpm --dir tests install --frozen-lockfile

4. Install Python test dependencies:
   pip install -r tests/requirements.txt

5. Approve required build scripts (if prompted):
   pnpm --dir tests approve-builds

## Running Evaluations

### Run all evals

From repository root:

- All languages:
  ./tests/run-all-evals.ps1

- Python only:
  ./tests/run-all-evals.ps1 -Language py

- TypeScript and Python:
  ./tests/run-all-evals.ps1 -Language ts,py

- Filter by service:
  ./tests/run-all-evals.ps1 -AzureService cosmos

- Single worker for easier debugging:
  ./tests/run-all-evals.ps1 -Language py -Workers 1

- JUnit output:
  ./tests/run-all-evals.ps1 -Language py -JUnit

Results are written to:

- tests/scenario-results/

### Run one eval file directly with Vally

From tests/:

- pnpm exec vally eval --eval-spec scenarios/fastapi-router-py/vally/eval.yaml --output-dir scenario-results/fastapi-router-py --workers 1

From repository root:

- pnpm --dir tests exec vally eval --eval-spec tests/scenarios/fastapi-router-py/vally/eval.yaml --output-dir tests/scenario-results/fastapi-router-py --workers 1

### Run a skill effectiveness experiment

From tests/scenarios/&lt;skill>/vally:

- pnpm --dir ../../.. exec vally experiment run scenarios/&lt;skill>/vally/skill_effectiveness_experiment.yaml --variant sonnet_baseline --output-dir .vally/smoke/&lt;skill> --workers 1

## Scenario Folder Structure

Each skill scenario should follow this layout:
