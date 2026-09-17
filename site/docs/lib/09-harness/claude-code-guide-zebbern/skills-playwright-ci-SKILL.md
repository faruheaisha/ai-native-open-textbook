---
title: "Playwright CI/CD"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/playwright/ci/SKILL.md"
sourceRel: "skills/playwright/ci/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/playwright/ci/SKILL.md"
sourceSha256: "f81872558704d48ab2bb41e730a210f301513f632a94d0a3b0f98e100dbf24ea"
pageSha256: "f81872558704d48ab2bb41e730a210f301513f632a94d0a3b0f98e100dbf24ea"
contentMode: "local-full"
zh: ""
---

# Playwright CI/CD

> Ship reliable tests in every pipeline — CI-specific patterns for speed, stability, and actionable reports.

**9 guides** covering CI/CD setup, parallel execution, containerized runs, reporting, and infrastructure patterns for all major CI providers.

## Golden Rules

1. **`retries: 2` in CI only** — surface flakiness in pipelines, not locally
2. **`traces: 'on-first-retry'`** — capture rich debugging artifacts without slowing every run
3. **Shard across runners** — `--shard=N/M` splits tests evenly; scale horizontally, not vertically
4. **Cache browser binaries** — `~/.cache/ms-playwright` keyed on Playwright version
5. **Upload artifacts on failure** — traces, screenshots, and HTML reports as CI artifacts
6. **Use the official Docker image** — `mcr.microsoft.com/playwright:v*` has all OS deps pre-installed
7. **Global setup for auth** — run login once in `globalSetup`, reuse `storageState` across workers
8. **Fail fast, debug later** — keep CI runs short; use trace viewer and HTML reports to investigate

## Guide Index

### CI Providers

| Provider                          | Guide                                        |
| --------------------------------- | -------------------------------------------- |
| GitHub Actions                    | [ci-github-actions.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-ci-ci-github-actions) |
| GitLab CI                         | [ci-gitlab.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-ci-ci-gitlab)                 |
| CircleCI / Azure DevOps / Jenkins | [ci-other.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-ci-ci-other)                   |

### Execution & Scaling

| Topic                         | Guide                                                        |
| ----------------------------- | ------------------------------------------------------------ |
| Parallel execution & sharding | [parallel-and-sharding.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-ci-parallel-and-sharding)         |
| Docker & containers           | [docker-and-containers.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-ci-docker-and-containers)         |
| Multi-project config          | [projects-and-dependencies.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-ci-projects-and-dependencies) |

### Reporting & Setup

| Topic                 | Guide                                                    |
| --------------------- | -------------------------------------------------------- |
| Reports & artifacts   | [reporting-and-artifacts.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-ci-reporting-and-artifacts) |
| Code coverage         | [test-coverage.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-ci-test-coverage)                     |
| Global setup/teardown | [global-setup-teardown.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-ci-global-setup-teardown)     |
