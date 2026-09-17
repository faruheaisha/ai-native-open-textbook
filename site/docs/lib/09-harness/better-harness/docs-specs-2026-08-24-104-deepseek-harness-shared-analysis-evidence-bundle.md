---
title: "DeepSeek Harness Shared Analysis and Frozen-Cwd Evidence Bundle"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-24-104-deepseek-harness-shared-analysis-evidence-bundle.md"
sourceRel: "docs/specs/2026-08-24-104-deepseek-harness-shared-analysis-evidence-bundle.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-24-104-deepseek-harness-shared-analysis-evidence-bundle.md"
sourceSha256: "14668fd817a741df85665499a208ec41cf3e92a30249d8e5d2310ad58200f9d9"
pageSha256: "14668fd817a741df85665499a208ec41cf3e92a30249d8e5d2310ad58200f9d9"
contentMode: "local-full"
zh: ""
---

# DeepSeek Harness Shared Analysis and Frozen-Cwd Evidence Bundle

## Traceability

- Spec ID: deepseek-harness-shared-analysis-evidence-bundle
- Story: #104
- Status: Implemented
- Approved scope: [Issue #104](https://github.com/QoderAI/better-harness/issues/104)

## Intent

DeepSeek Harness (DSH) already exposes independent persisted Session evidence
and configured filesystem Skills plus cwd-sensitive Instructions. The canonical
`/better-harness` workflow cannot combine those sources because DSH is rejected
at the shared Asset Practices, Harness Report, and Evidence Bundle gates.

This Story qualifies those three shared capabilities together. Evidence Bundle
v3 freezes canonical cwd as part of evidence identity; Asset Baseline v2 retains
the minimum current configured-snapshot provenance needed to keep configuration
separate from historical Session observation. Existing generic inventory,
lint, integrity, Project Harness, task-loop, and neutral Harness analysis owners
remain canonical.

The implementation is one Story and one PR. Report rendering and Checkup remain
unsupported.

## Privacy blocker resolution

The privacy blocker is resolved for the scope of #104 by inheriting the current
shared cross-host Session Evidence behavior:

- bounded sanitized ordinary user-intent prose may remain in
  `session-core-facts.candidates[].request.summary`;
- existing credential, recognized-secret, identifier, injected-context,
  transcript-tail, and selected private-path sanitization remains in force;
- the independent lead may retain its existing bounded request sample only
  where the shared lead contract already permits it;
- #104 adds no DSH-specific Session privacy projector and no new lead text path.

This inherited boundary is not claimed to be privacy-complete. The earlier DSH
Session Evidence specification documented exposure of this same shared field as
a pre-existing unresolved privacy concern. That concern remains unresolved and
outside #104. Any future tightening belongs in shared Session and lead privacy
owners for every host, not in a DSH-only Bundle rule.

## Story boundary

Before #104, DSH advertises:

```text
SESSION_ANALYSIS
AGENT_CUSTOMIZE
```

After #104, DSH advertises exactly:

```text
SESSION_ANALYSIS
AGENT_CUSTOMIZE
ASSET_PRACTICES
HARNESS_REPORT
EVIDENCE_BUNDLE
```

It remains absent from:

```text
REPORT_RENDERING
CHECKUP
```

The three new gates land together only after their executable routes and tests
are complete. `HARNESS_REPORT` means neutral shared Harness evidence, not HTML,
Markdown, Canvas, Studio, or another durable output.

## Canonical pipeline

```text
/better-harness
-> harness evidence-bundle
-> Evidence Bundle v3 frozen context
   |- Session population -> DSH facts -> sessionEvidence
   |- existing Project Harness -> projectHarness
   |- DSH current configured inventory at frozen cwd
   |  -> shared lint + public inventory + integrity
   |  -> Asset Baseline v2 -> agentCustomize
   `- same Session population -> generic task-loop source
      -> independent current practice recollection at frozen cwd
      -> neutral evidence + summaryFacts -> lead
-> complete / partial / failed Bundle
-> specialists and lead reconciliation
```

Session and Project collection consume workspace, topology, analysis scope, and
the frozen window. They do not consume configured cwd. Only current configured
and practice collection consumes cwd.

## Acceptance scenarios

### AC-1: Exact capability promotion

DSH gains exactly `ASSET_PRACTICES`, `HARNESS_REPORT`, and `EVIDENCE_BUNDLE` in
addition to its existing two capabilities. `REPORT_RENDERING` and `CHECKUP`
remain absent.

### AC-2: Evidence Bundle v3 and frozen cwd

`EVIDENCE_BUNDLE_SCHEMA_VERSION` becomes `3`. Every emitted v3 context contains:

```js
{
  workspace: "<canonical workspace realpath>",
  cwd: "<canonical contained cwd realpath>",
  provider: "dsh",
  language: "en" | "zh-CN",
  depth: "quick" | "normal",
  window: { since: "<ISO>", until: "<ISO>" },
  evidenceLimit: 1 | 2 | 3 | 4 | 5,
  authority: {
    includeUserHome: boolean,
    includeMemories: boolean
  },
  topology: "<validated frozen topology>",
  analysisScope: "<scope derived from topology>"
}
```

The complete frozen context, including cwd, identifies the evidence collection.
No new identity hash, v2 migration reader, or unrelated schema field is added.

### AC-3: Canonical cwd contract

```text
effectiveCwd = explicit cwd ?? workspace
```

Workspace and cwd must exist as directories and are canonicalized through the
real filesystem path. Canonical cwd must equal or be contained by canonical
workspace. A lexical in-workspace symlink resolving outside workspace is
rejected. The stable failures are `INVALID_CONFIGURED_CWD` and
`CONFIGURED_CWD_OUTSIDE_WORKSPACE`.

The implementation uses native `node:path` semantics and supports Windows,
macOS, Linux, spaces, Unicode, drives, and UNC paths. Cwd is never derived from
Session evidence.

### AC-4: Cwd propagation

One canonical frozen cwd reaches Evidence Bundle context, Agent Customize,
Asset Baseline, public configured inventory, Agent Lint, Harness report-run, and
task-loop configured-practice collection. It does not become a Session analyzer
or Session selection option and does not replace Project Harness's existing
Git-root/workspace cwd.

### AC-5: Nested DSH Instruction selection

For workspace `repo/packages/api` and cwd `repo/packages/api/src`, shared
configured/practice collection includes an applicable
`src/AGENTS.local.md`. With cwd equal to `repo/packages/api`, that nested local
Instruction is not applicable. Existing #101 DSH native selection semantics are
reused unchanged.

### AC-6: Asset Baseline v2

`ASSET_BASELINE_SCHEMA_VERSION` becomes `2`. A successful DSH baseline contains:

```js
{
  kind: "agent-asset-baseline",
  schemaVersion: 2,
  status: "complete" | "partial" | "failed",
  scope: {
    provider: "dsh",
    workspace: "<canonical workspace>",
    cwd: "<canonical cwd>",
    includeUserHome: boolean,
    includeMemories: false
  },
  configuredSnapshot,
  envelopes: { lint, inventory, integrity },
  diagnostics
}
```

Lint, inventory, and integrity consume one raw configured inventory snapshot
inside the Baseline owner. Empty unsupported DSH collections are valid observed
emptiness, not failures.

### AC-7: Compact configuredSnapshot

A successful DSH baseline projects exactly:

```js
{
  collectedAt: "<raw DSH inventory generatedAt>",
  evidenceKind: "configured-not-observed",
  configurationSource: "qualified-defaults" | "caller-overrides",
  userHomeCollection: "included" | "not-authorized",
  instructionCollection: "enabled" | "disabled-by-byte-limit",
  qualification: {
    provider: "dsh",
    version: "0.1.1-rc.2",
    sourceSha: "b150a551b8d465e31e418e1b2eaf5e79bbb7d28e"
  },
  runtimeResolution: {
    cordis: false,
    profile: false,
    preset: false,
    runtimeSkills: false
  }
}
```

It excludes diagnostics arrays, configured paths, bodies, digests, symlink
targets, and duplicate cwd. Failed raw inventory does not fabricate the field.

### AC-8: Current configuration is not historical observation

The analysis may state that an asset is currently configured, when it was
collected, or that current configuration was not observed in bounded Session
evidence. It must not infer that a current Skill or Instruction existed during,
was used by, or influenced a historical Session; that a same-name current asset
is the historical asset; or that current absence proves historical absence.

### AC-9: Generic Skills and Rules practice coverage

`collectProviderInventory()` derives `summary.practiceCoverageRows` from shared
configured surfaces. Non-empty DSH Skills and Rules produce their existing
generic rows with identity-deduplicated counts and bounded locators. Empty
collections produce no phantom row. Representative existing generic hosts and
Qoder Memory behavior remain compatible.

### AC-10: Asset Practices qualification

DSH uses the existing public inventory, `agent-assets-review` lint, integrity,
and Asset Baseline owners. No DSH-specific lint or integrity engine is added.
User-home collection remains default-closed.

### AC-11: Bundle-facing path privacy

Direct DSH Agent Customize retains its qualified lexical evidence. Bundle-facing
Baseline findings use only:

| Source | Locator |
| --- | --- |
| workspace itself | `<workspace>` |
