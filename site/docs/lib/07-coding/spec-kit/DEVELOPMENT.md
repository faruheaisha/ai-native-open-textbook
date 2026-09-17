---
title: "Development Notes"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/DEVELOPMENT.md"
sourceRel: "DEVELOPMENT.md"
rawUrl: "/raw/07-coding/spec-kit/DEVELOPMENT.md"
sourceSha256: "c9f4458b35f38e052ab305b252ef54acb7a7984b47ce42286192456ef2f62f9b"
pageSha256: "c9f4458b35f38e052ab305b252ef54acb7a7984b47ce42286192456ef2f62f9b"
contentMode: "local-full"
zh: ""
---

# Development Notes

Spec Kit is a toolkit for spec-driven development. At its core, it is a coordinated set of prompts, templates, scripts, and CLI/integration assets that define and deliver a spec-driven workflow for AI coding agents. This document is a starting point for people modifying Spec Kit itself, with a compact orientation to the key project documents and repository organization.

**Essential project documents:**

| Document                                                   | Role                                                                                  |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [README.md](/lib/07-coding/spec-kit/overview)                                     | Primary user-facing overview of Spec Kit and its workflow.                            |
| [DEVELOPMENT.md](/lib/07-coding/spec-kit/DEVELOPMENT)                           | This document.                                                                        |
| [spec-driven.md](/lib/07-coding/spec-kit/spec-driven)                           | End-to-end explanation of the Spec-Driven Development workflow supported by Spec Kit. |
| [RELEASE-PROCESS.md](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/.github/workflows/RELEASE-PROCESS.md) | Release workflow, versioning rules, and changelog generation process.                 |
| [docs/index.md](/lib/07-coding/spec-kit/docs)                             | Entry point to the `docs/` documentation set.                                         |
| [CONTRIBUTING.md](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/CONTRIBUTING.md)                         | Contribution process, review expectations, testing, and required development practices. |

**Main repository components:**

| Directory          | Role                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `templates/`       | Prompt assets and templates that define the core workflow behavior and generated artifacts. |
| `scripts/`         | Supporting scripts used by the workflow, setup, and repository tooling.                     |
| `src/specify_cli/` | Python source for the `specify` CLI, including agent-specific assets.                       |
| `extensions/`      | Extension-related docs, catalogs, and supporting assets.                                    |
| `presets/`         | Preset-related docs, catalogs, and supporting assets.                                       |
