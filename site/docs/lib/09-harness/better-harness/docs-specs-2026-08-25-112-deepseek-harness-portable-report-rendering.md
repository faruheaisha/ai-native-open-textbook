---
title: "DeepSeek Harness Portable Report Rendering"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-25-112-deepseek-harness-portable-report-rendering.md"
sourceRel: "docs/specs/2026-08-25-112-deepseek-harness-portable-report-rendering.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-25-112-deepseek-harness-portable-report-rendering.md"
sourceSha256: "4a85629b98535dc648f4b5149da8bf529dbcf4801dcbab0756c44b145856e7f6"
pageSha256: "4a85629b98535dc648f4b5149da8bf529dbcf4801dcbab0756c44b145856e7f6"
contentMode: "local-full"
zh: ""
---

# DeepSeek Harness Portable Report Rendering

## Traceability

- Spec ID: deepseek-harness-portable-report-rendering
- Story: #112
- Status: Implemented
- Approved scope: [Issue #112](https://github.com/QoderAI/better-harness/issues/112)
- Qualified native baseline: DeepSeek Harness `0.1.1-rc.2` at
  `b150a551b8d465e31e418e1b2eaf5e79bbb7d28e`

## Product story

> A DeepSeek Harness user invokes `/better-harness` in a qualified project.
> Better Harness collects the already-supported Session, configured-asset,
> project, and shared Harness evidence and reconciles one reviewed findings
> input. Instead of stopping at inline/no-files analysis, an ordinary durable
> run publishes `findings.json`, `report.md`, and `report.html` under the normal
> Better Harness DSH output root and returns the renderer-reported report path.
> When the user explicitly selects inline or no-files output, the same analysis
> remains available and no durable artifact is written.

On success, the user receives a compact result such as `N findings. Open the
report`, linked to the renderer-reported primary report. On failure, the user
receives a bounded failure for the stage that failed and no success link to an
unvalidated or unpublished report. A prior valid run remains available wherever
the existing generic publication owner guarantees rollback or preservation.

## Intent and current gap

Post-#110 DSH can already:

- discover and explicitly invoke the canonical Better Harness Skill;
- analyze persisted DSH Session evidence;
- collect qualified filesystem Skills and cwd-sensitive Instructions;
- enter shared Asset Practices and neutral Harness analysis;
- build Evidence Bundle v3 under a frozen parameter context;
- reconcile shared findings; and
- return inline/no-files analysis.

DSH currently advertises `SESSION_ANALYSIS`, `AGENT_CUSTOMIZE`,
`ASSET_PRACTICES`, `HARNESS_REPORT`, and `EVIDENCE_BUNDLE`, but not
`REPORT_RENDERING` or `CHECKUP`. The missing rendering capability keeps the
final durable-output path unavailable even though the reviewed findings use the
existing generic report-data contract.

Issue #112 adds no analysis intelligence. It qualifies the already-supported shared
analysis result for the existing portable durable publication path.

## Architecture decision

DSH joins the existing generic portable-host branch:

```text
Evidence Bundle v3 and shared analysis
-> three independent evidence passes
-> lead reconciliation
-> one reviewed findings.json
-> harness render --mode html
-> repair and normalize report data
-> same-parent staging
-> artifact and report validation
-> same-parent rename-based atomic publication with replacement/rollback
-> findings.json + report.md + report.html
```

Evidence Bundle is not renderer input. The lead consumes its evidence and
`summaryFacts`, performs reconciliation, and authors the reviewed findings data
that the renderer accepts. There is no DSH Evidence Bundle-to-renderer adapter,
DSH report-data schema, or DSH renderer.

This flow has two deterministic executable boundaries around one model-authored
boundary:

```text
raw/native evidence
-> deterministic privacy projection into public shared evidence
-> Better Harness Skill / model lead reconciliation
-> reviewed findings
-> deterministic portable rendering and publication
```

The public-evidence projection and reviewed-findings renderer are executable
software interfaces. Lead reconciliation is model-authored through the Better
Harness Skill. #112 does not add a deterministic command planner,
raw-evidence-to-findings reconciliation API, or second privacy pipeline.

The existing owners remain canonical:

- `scripts/host-support/index.mjs` owns capability qualification.
- `skills/better-harness/SKILL.md` owns `/better-harness` orchestration and the
  output choice.
- `templates/reporting/routing.md` owns the report-route switchboard.
- `scripts/harness-analysis/report-data-schema.mjs` owns shared input
  normalization and findings publication projection.
- `scripts/harness-analysis/render-report.mjs` owns output location, staging,
  validation, and publication.
- `scripts/harness-analysis/renderers/html.mjs` and `markdown.mjs` own the
  shared portable presentations.

## Capability contract

After #112, DSH advertises exactly:

```text
SESSION_ANALYSIS
AGENT_CUSTOMIZE
ASSET_PRACTICES
HARNESS_REPORT
REPORT_RENDERING
EVIDENCE_BUNDLE
```

`CHECKUP` remains absent. `REPORT_RENDERING` admits DSH to the render platform
allowlist and portable HTML route. It does not grant Canvas, Studio, Checkup,
plugin lifecycle, or any new evidence authority. Tests assert the entire DSH
capability array in order, not a subset.

## Routing and output-root contract

The normal DSH durable route uses `mode=html`. Qoder and Cursor retain their
Canvas modes; DSH never selects either Canvas mode. DSH requires no new
host-specific Skill workflow: capability qualification makes it an “other
rendering host,” and the explicit portable-host route list is updated to match.

The default Skill-owned durable root is:

```text
<target>/.dsh/better-harness
```

It is derived from Better Harness's existing
`<target>/.<provider>/better-harness` convention. Better Harness owns this
subtree; it is not a native DSH storage contract.

The path terms remain distinct:

- **target**: the selected workspace/project whose evidence is analyzed. It is
  passed to the renderer for topology validation and target identity.
- **out root**: the host report root. The Skill passes the target-local absolute
  `.dsh/better-harness` path through `--out`; the CLI's provider-derived
  `.dsh/better-harness` default is otherwise resolved from the process cwd.
- **run directory**: one report run. Without `--run-dir`, the renderer allocates
  a date/time/target-slug directory below `--out`. A relative `--run-dir` is
  resolved below `--out` and must remain contained there. An absolute
  caller-selected `--run-dir` remains exact and intentionally bypasses
  relative containment.

The Skill command remains the generic command:

```text
