---
title: "Microsoft Agent Skills"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-app-onboard-prereq/references/prereq-artifacts.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-app-onboard-prereq/references/prereq-artifacts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-app-onboard-prereq/references/prereq-artifacts.md"
sourceSha256: "156966f4513314e6f181cb4206742ccba01e04e462d71257651deb383ed81531"
pageSha256: "156966f4513314e6f181cb4206742ccba01e04e462d71257651deb383ed81531"
contentMode: "local-full"
zh: ""
---

# Microsoft Agent Skills

Artifact write procedures for the prereq phase exit. Read at Step 4 of the [readiness gate](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-prereq-references-readiness-gate).

## Write Artifacts

> ⛔ **Write all 3 artifacts before exiting prereq.** Downstream phases read these.
> ⛔ **Use `create` tool for ALL session files — NEVER `powershell`.** Terminal is OK ONLY for read-only ops: UUID generation, git info, file existence checks.
> ⛔ **Path scoping:** ALL `create` calls target `.copilot-azure/sessions/\{uuid\}/`. After writing, read back to confirm correct path.

1. **`prereq-output.json`** — ⛔ Read [`prereq-schemas.ts`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-app-onboard-prereq/references/prereq-schemas.ts) for `PrereqOutput` interface.

   > ⛔ **Per-component verdicts MUST persist.** Every entry in `components[]` MUST include a `verdicts` object: `\{ "build", "completeness", "deployability" \}` with values `PASS`/`WARN`/`FAIL` (`build` may be `SKIPPED` when build validation was skipped; `completeness`/`deployability` are never `SKIPPED`). Downstream readiness scoring and the prepare phase read these — never omit them.
   >
   > ⛔ **Warnings MUST persist.** Every ⚠️ WARN → `warnings[]`: `\{ "id": "W-\{ID\}", "component", "axis", "summary", "detail", "fix", "fixPhase" \}`. Both `fix` and `fixPhase` are required — validate before writing.
   >
   > ⛔ **Health endpoint:** Write detected path to `healthEndpoint` (e.g., `"/api/v1/health/"`). If none → `null` + `W-HEALTH` warning with `fixPhase: "scaffold"`.
   >
   > ⛔ **Entry point:** Write to `entryPoint` (e.g., `"index.js"`). `null` for .NET/Go/Java (Oryx handles startup).
   >
   > ⛔ **`postDeployRecommendations[]`:** For each ⚠️ WARN, write per `PostDeployRecommendation` schema from [`session-schemas.ts`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-app-onboard-prereq/references/session-schemas.ts): `\{ "title", "reason", "effort": "low|medium|high", "services": [] \}`.

2. **`context.json`** — ⛔ Use `edit` (not `create` — Step 1 already created it). Populate `components[]`, `repo`, `detectedInfra[]`, `detectedServices[]`, `app.name` (from primary component's project manifest or workspace root dir name). Append `"prereq"` to `completedPhases` NOW (before presenting), set `currentPhase: null`, update `lastModifiedUtc`.

3. **`readiness-report.md`** — Summary table (Build/Completeness/Deployability verdicts), detected stack, all warnings with actionable detail. Clean markdown, no rigid template.

> ⛔ **Phase exit gate:** All 3 artifacts must exist. If any missing, write NOW.
