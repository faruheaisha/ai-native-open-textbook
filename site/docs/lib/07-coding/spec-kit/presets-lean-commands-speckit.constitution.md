---
title: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/presets/lean/commands/speckit.constitution.md"
sourceRel: "presets/lean/commands/speckit.constitution.md"
rawUrl: "/raw/07-coding/spec-kit/presets/lean/commands/speckit.constitution.md"
sourceSha256: "56ca2ffc2938d04285adc8e0a7cc33164d7f0b8538d5b8aa70791de6ddb9f0a0"
pageSha256: "56ca2ffc2938d04285adc8e0a7cc33164d7f0b8538d5b8aa70791de6ddb9f0a0"
contentMode: "local-full"
zh: ""
---

# Spec Kit（GitHub 官方规格驱动开发工具包）

## User Input

```text
$ARGUMENTS
```

## Scope Guard

This command's own work is limited to creating or updating the project constitution and
propagating constitution-driven changes to dependent Spec Kit artifacts.

- Classify every part of the user input as constitution content or a separate non-governance
  intent. Feature implementation, code generation, refactoring, build, and deployment requests
  are examples of non-governance intents.
- You **MUST NOT** execute any non-governance intent. Defer each one to `Next Actions`.
- You **MUST NOT** create, modify, or delete application source files or other artifacts
  unrelated to the constitution workflow.
- If an instruction could be either constitution content or a non-governance intent, ask for
  clarification before making changes.
- After updating the constitution, list each deferred intent in a `Next Actions` section with an
  appropriate follow-up Spec Kit command, such as `__SPECKIT_COMMAND_SPECIFY__`, but do not
  invoke it.
- Omit `Next Actions` when there are no non-governance intents.

## Outline

1. Create or update the project constitution and store it in `.specify/memory/constitution.md`.
   - Project name, guiding principles, non-negotiable rules
   - Derive from user input and existing repo context (README, docs)
