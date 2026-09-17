---
title: "Java Legacy Azure SDK → Modern Azure SDK"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/README.md"
sourceSha256: "30dbb87c2cc10837343c27be65299d24bf20e552e49dc43ed3d52c4fa26196ca"
pageSha256: "30dbb87c2cc10837343c27be65299d24bf20e552e49dc43ed3d52c4fa26196ca"
contentMode: "local-full"
zh: ""
---

# Java Legacy Azure SDK → Modern Azure SDK

> **Scenario scope**: Upgrade a Maven/Gradle project's Azure SDK dependencies from `com.microsoft.azure.*` (legacy, end-of-support 2023) to `com.azure.*` (modern) — source code, build files, tests.
>
> This is a **source-code modernization flow**, not an Azure service/plan/SKU upgrade. Follow the workflow below instead of the top-level `azure-upgrade` Steps. Do **NOT** use this for .NET, Python, JavaScript, or Go Azure SDK upgrades.

Upgrade all `com.microsoft.azure.*` to `com.azure.*` equivalents in one autonomous session.

You are an expert Azure SDK migration agent. Generate a unique run identifier at the start (format: `azure-sdk-upgrade-YYYYMMDD-HHMMSS`) and use it throughout all phases.

> ⚠️ **Lazy loading**: Do NOT pre-fetch the reference files listed below. Load each one **only when its workflow step is reached** or its trigger condition fires. Loading them upfront wastes context and causes premature decisions.

## Workflow (load references on demand)

Full procedure: per-phase files under `./workflow/` (load each one when entering that phase). Global rules apply to every step: [rules/execution-guidelines.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-rules-execution-guidelines), [rules/efficiency.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-rules-efficiency).

1. **Precheck** ([workflow/phase-1-precheck.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-workflow-phase-1-precheck)) — Verify Maven/Gradle project, detect JDK/build tools. If git available, create branch `java-upgrade/\{RUN_ID\}`. → load `./templates/PLAN_TEMPLATE.md` to create `plan.md`.
   - Step-wise rules: [rules/execution-guidelines.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-rules-execution-guidelines) (Output directory, Git, Wrapper preference).
2. **Plan** ([workflow/phase-2-plan.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-workflow-phase-2-plan)) — Inventory deps and populate `plan.md`. → load `./INSTRUCTION.md` for migration guide.
   - Step-wise rules: [rules/upgrade-strategy.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-rules-upgrade-strategy) (Incremental, Risk-first, Successor preference, Necessary/Meaningful steps).
3. **Execute** ([workflow/phase-3-execute.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-workflow-phase-3-execute)) — Migrate build config then source, build/test/fix, commit per step. → load `./templates/PROGRESS_TEMPLATE.md` to create `progress.md`; load `./rules/` before running builds/tests.
   - Step-wise rules: [rules/review-code-changes.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-rules-review-code-changes), [rules/upgrade-strategy.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-rules-upgrade-strategy) (Automation tools, Temporary errors OK), [rules/execution-guidelines.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-rules-execution-guidelines) (Template compliance, Git).
4. **Validate** ([workflow/phase-4-summarize.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-workflow-phase-4-summarize)) — Apply validation checklist. → load `./templates/SUMMARY_TEMPLATE.md` to create `summary.md`; load `./INSTRUCTION.md#validation`.
   - Step-wise rules: [rules/upgrade-success-criteria.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-rules-upgrade-success-criteria).

## Constraints

- 100% test pass · no premature termination · incremental changes · review each step
- Prefer wrappers (`mvnw`/`gradlew`)

## Examples

```
"upgrade legacy azure sdk" → precheck → plan → execute → validate
```
