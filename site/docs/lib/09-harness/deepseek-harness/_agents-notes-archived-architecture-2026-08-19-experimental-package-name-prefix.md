---
title: "Agent Note: Mark experimental packages in npm names"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/architecture/2026-08-19-experimental-package-name-prefix.md"
sourceRel: ".agents/notes/archived/architecture/2026-08-19-experimental-package-name-prefix.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/architecture/2026-08-19-experimental-package-name-prefix.md"
sourceSha256: "d95ab61cd38321d40ac137d80d05f430ce6d38917f4cb24d4a16a39030e9df3e"
pageSha256: "d95ab61cd38321d40ac137d80d05f430ce6d38917f4cb24d4a16a39030e9df3e"
contentMode: "local-full"
zh: ""
---

# Agent Note: Mark experimental packages in npm names

Status: implemented
Archived: 2026-09-04

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-architecture-2026-08-19-experimental-package-name-prefix.zh)

## Problem

Directory placement, private manifests, and release-family filtering keep experimental packages out of releases, but an npm specifier or Cordis configuration row does not expose that status. A stable-looking package name can be copied into another composition without the reader seeing that its complete public contract remains experimental.

## Decision

Every package directly below `packages/experimental/` uses the `@deepseek-ai/dsh-experimental-*` npm prefix. The workspace constraints gate discovers those manifests and rejects a missing prefix alongside the existing `private: true` and omitted-`publishConfig` requirements.

Agent Teams uses `@deepseek-ai/dsh-experimental-agent-team` from `packages/experimental/agent-team` and `@deepseek-ai/dsh-experimental-tool-agent-team` from `packages/experimental/tool-agent-team`. Package imports, Cordis configuration rows, generated catalogs, and repository metadata use those names without compatibility aliases.

Promotion moves a package to its product-role group, removes `experimental-` from its npm name, and updates every repository reference atomically. The pre-release compatibility policy permits that rename without an alias package.

## Alternatives considered

**Keep stable-looking npm names while using only directory and release metadata for experimental status.** This minimizes promotion churn, but import specifiers and configuration rows hide the package status and cannot carry the repository-only placement rule into review.

**Use an experimental suffix.** A prefix groups every experimental package under one searchable npm namespace and makes the status visible before the product role; a suffix would scatter that marker after role-specific names.

## Consequences

Experimental imports and configuration rows identify their support status without consulting repository layout. The top-level constraints command and its focused unit test prevent a newly added experimental package from omitting the prefix.

Promotion deliberately renames imports, configuration, generated references, and metadata. No compatibility package preserves the experimental name.
