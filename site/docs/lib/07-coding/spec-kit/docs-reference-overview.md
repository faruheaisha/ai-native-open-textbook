---
title: "Reference"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/docs/reference/overview.md"
sourceRel: "docs/reference/overview.md"
rawUrl: "/raw/07-coding/spec-kit/docs/reference/overview.md"
sourceSha256: "3ceaf0acfcdb3c3b980ca34832834be5ed1d968a90c2b897b50a2ad07f011150"
pageSha256: "3ceaf0acfcdb3c3b980ca34832834be5ed1d968a90c2b897b50a2ad07f011150"
contentMode: "local-full"
zh: ""
---

# Reference

The Specify CLI (`specify`) manages the full lifecycle of Spec-Driven Development — from project initialization to workflow automation. This section is the detailed reference for the CLI's commands and primitives, plus the agentic `/speckit.*` processes your coding agent runs.

## Core Commands

The foundational commands for creating and managing Spec Kit projects. Initialize a new project with the necessary directory structure, templates, and scripts. Verify that your system has the required tools installed. Check version and system information.

[Core Commands reference →](/lib/07-coding/spec-kit/docs-reference-core)

## Integrations

Integrations connect Spec Kit to your AI coding agent. Each integration sets up the appropriate command files and directory structures for a specific agent. Only one integration is active per project at a time, and you can switch between them at any point.

[Integrations reference →](/lib/07-coding/spec-kit/docs-reference-integrations)

## Extensions

Extensions add new capabilities to Spec Kit — domain-specific commands, external tool integrations, quality gates, and more. They are discovered through catalogs and can be installed, updated, enabled, disabled, or removed independently. Multiple extensions can coexist in a single project.

[Extensions reference →](/lib/07-coding/spec-kit/docs-reference-extensions)

## Presets

Presets customize how Spec Kit works — overriding command files, template files, and script files without changing any tooling. They let you enforce organizational standards, adapt the workflow to your methodology, or localize the entire experience. Multiple presets can be stacked with priority ordering to layer customizations.

[Presets reference →](/lib/07-coding/spec-kit/docs-reference-presets)

## Workflows

Workflows automate multi-step Spec-Driven Development processes into repeatable sequences. They chain commands, prompts, shell steps, and human checkpoints together, with support for conditional logic, loops, fan-out/fan-in, and the ability to pause and resume from the exact point of interruption.

[Workflows reference →](/lib/07-coding/spec-kit/docs-reference-workflows)

## Bundles

Bundles compose existing extensions, presets, workflows, and steps into a single, versioned, installable unit. Rather than adding new behavior, a bundle curates a stack of primitives — everything a team or role needs — and installs it in one step through each component's own machinery, with version pinning, conflict checks, and provenance tracking for clean updates and removal.

[Bundles reference →](/lib/07-coding/spec-kit/docs-reference-bundles)

## Agentic Commands

The sections above cover primitives managed by the `specify` CLI. The following are the `/speckit.*` slash commands your coding agent runs step by step inside the editor — the agentic processes built on top of that foundation.

### Agentic SDD

The `/speckit.*` slash commands that drive the core Spec-Driven Development process your coding agent runs step by step: constitution, specify, clarify, plan, checklist, tasks, analyze, implement, and converge. Run them in order, adding the clarify/checklist/analyze quality gates for anything with meaningful ambiguity.

[Agentic SDD reference →](/lib/07-coding/spec-kit/docs-reference-agentic-sdd)

### Agentic Bug Fix

The bundled **bug** extension adds a three-step bug triage process — assess, fix, and validate — with each bug tracked in its own directory under `.specify/bugs/`. Install it with `specify extension add bug`.

[Agentic Bug Fix reference →](/lib/07-coding/spec-kit/docs-reference-agentic-bugfix)
