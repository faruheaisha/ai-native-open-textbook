---
title: "ADR: AI-Optimized Directory Structure"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/adrs/directory-structure.md"
sourceRel: "docs/adrs/directory-structure.md"
rawUrl: "/raw/09-harness/better-harness/docs/adrs/directory-structure.md"
sourceSha256: "5fcc4c4b6e18562538a8293a07f39cdbd562fcbf1f5536229a7dd17e4596061c"
pageSha256: "5fcc4c4b6e18562538a8293a07f39cdbd562fcbf1f5536229a7dd17e4596061c"
contentMode: "local-full"
zh: ""
---

# ADR: AI-Optimized Directory Structure

## Status

Proposed. Revision: 2026-07-31. Renamed from
`docs/specs/directory-structure.md`. If local host instructions still name the
old path, this ADR is the canonical successor.

This decision is listed as `ADR-0001` in the [ADR index](/lib/09-harness/better-harness/docs-adrs). The ID is a
stable navigation label and does not change this ADR's Proposed status.

This ADR is the detailed directory-status reference under
`docs/ARCHITECTURE.md`, the accepted repository-wide owner. Formal acceptance
of this ADR still requires the validation gate below.

## Scope

This ADR owns directory ownership and contribution routing. It does not define
knowledge-base registry schemas, host package generation internals, or the
cross-surface DX control plane; the latter belongs to the
[Developer Experience System ADR](/lib/09-harness/better-harness/docs-adrs-developer-experience-system/index).

Rejected direction: top-level `packs/`. A pack is a lifecycle state, not a
source directory.

Legend:

- `[active]`: exists or can be edited now.
- `[generated]`: package output; may be absent from the source checkout because
  the generator is source of truth.
- `[target]`: future owner; create only when the inline gate is satisfied.
- `[candidate]`: may be created as docs-only evidence; does not affect runtime.

## Directory Structure

```text
# host and agent surfaces
.claude-plugin/                        # [active] thin Claude Code shell
  plugin.json marketplace.json         # native install/discovery metadata only

.qoder-plugin/                         # [active] hand-maintained Qoder shell
  plugin.json                          # thin discovery/install metadata only

.cursor-plugin/                        # [active] thin Cursor shell
  plugin.json marketplace.json         # install/discovery metadata only

.codex-plugin/                         # [active] thin Codex shell
  plugin.json                          # thin discovery/install metadata only

.github/plugin/                        # [active] thin GitHub Copilot shell
  plugin.json marketplace.json         # native install/discovery metadata only

qwen-extension.json                    # [active] thin Qwen Code shell

.agents/
  skills/<skill>/                      # [active] host-local only; shared logic -> root skills/
    SKILL.md
    references/ scripts/               # host-only depth for this skill

skills/<skill>/                        # [active] canonical shared workflows
  SKILL.md
  references/

models/                                # [active] maturity models and embedded detector contracts
  routing.md
  <model>.md

agent-roles/<role>.md                  # [target] create only for role-only prompts
                                        # no workflow steps/tools/evidence contracts
                                        # reused by 2+ explicit consumers

# repository governance and support policy
SECURITY.md                            # [target] private disclosure and security policy
SUPPORT.md                             # [target] supported versions and support routes

# executable automation; split by business capability, never scripts/core/
scripts/
  dx-contracts/                       # [target] judgment-free declaration catalog,
                                      # activation ledger, validation, and projection diff
  host-support/                       # [active] host identities, support slices,
                                      # profile predicates, and freshness policies
  evidence-contract/                  # [target] shared receipt envelope, evidence
                                      # taxonomy, compatibility, and redaction invariants
  harness-doctor/                     # [target] bounded read-only product diagnostics
  support-bundle/                     # [target] plan/redact/persist/delete support evidence
  harness-analysis/                 # [active] Harness evidence and report mechanics
    canvas-preview/                 # [active] local Canvas preview subcapability
      cli.mjs                       # executable command owner
      index.mjs                     # public import surface inside/outside the capability
    report-source/                  # [active] report-source and bounded review integrity
      index.mjs                     # public contract/review import surface
      apply-review.mjs              # review application and compatibility CLI owner
  core-change-watch/               # [active] static structure/core-path/history evidence
  session-analysis.mjs                 # [active] thin shim; new exports -> scripts/session-analysis/
  session-analysis/                    # [active] session evidence collection/normalization
    platforms/<host>.mjs               # Qoder/Codex/Claude/Cursor/Qwen/Copilot/Pi/Kimi/WorkBuddy host adapters
    ides/<ide>/                        # target editor-local evidence not covered by host adapters
