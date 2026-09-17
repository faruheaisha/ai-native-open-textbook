---
title: "Asset Demand Reconciliation"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/skills/better-harness/references/asset-demand-reconciliation.md"
sourceRel: "skills/better-harness/references/asset-demand-reconciliation.md"
rawUrl: "/raw/09-harness/better-harness/skills/better-harness/references/asset-demand-reconciliation.md"
sourceSha256: "1413e78deee9228c853ba1835b240e6b7e9455b9c266c2c5dc86b338dc376afe"
pageSha256: "1413e78deee9228c853ba1835b240e6b7e9455b9c266c2c5dc86b338dc376afe"
contentMode: "local-full"
zh: ""
---

# Asset Demand Reconciliation

Use this reference only after the three specialists return and before the lead
freezes final findings. Join Session demand with Agent Customize coverage; do
not send either specialist the other's brief.

## Evidence Boundary

- Session may support repeated **procedure demand** or **knowledge demand**.
- Agent Customize may support asset presence, content quality, routing,
  integrity, scope, provenance, use, and outcome states.
- Project Evidence may identify the current owner or executable route. It does
  not prove a user/global asset was selected or used.
- An absent asset and an uncovered repeated demand are different facts. Keep
  the gap `Unobserved` until both sides are comparable.

Do not inspect raw prompts, Memory bodies, plugin caches, or another provider's
home state to complete the join. Do not create, install, enable, consolidate,
or delete an asset in this read-only review.

## Select the Smallest Durable Owner

For each supported demand, ask what must persist:

| Demand shape | First owner route |
|---|---|
| Stable trigger, ordered procedure, output, stop, and verifier | [Skill Discovery](/lib/09-harness/better-harness/references-agent-customize-skill-discovery) |
| Concise correction, decision, preference, or recurring trap | [Memory Review](/lib/09-harness/better-harness/references-agent-customize-memory-review) |
| Current project fact, invariant, policy, or architecture boundary | Rule, `AGENTS.md`, spec, runbook, or project documentation |
| Deterministic transform or lifecycle enforcement | Script, Hook, Gate, Workflow, Agent, or another owner selected by Loop Discovery |
| External access without a reusable procedure | MCP/app/connector capability, not automatically a Skill |

Use [Loop Discovery](/lib/09-harness/better-harness/references-loop-engineering-loop-discovery) when
the durable owner is unresolved. Before creation, apply the coverage ladder:
observed capability -> host built-in -> configured owner -> extend existing ->
create new -> needs more evidence.

## Decide Whether a Memory Gap Exists

Require at least two independent comparable Episodes that repeat the same
correction, decision, rediscovery, or avoidable trap. Confirm that current
project truth does not already own it and the coverage map has no current,
retrievable owner. Then define the smallest provenance-bound lesson and a later
retrieval/application check.

Inventory count, one title collision, a short `AGENTS.md`, or one failed task
cannot prove missing Memory. A Memory candidate remains an opportunity until a
later episode supports retrieval, relevance, application, and outcome.

## Decide Whether a Skill or Plugin Trial Is Useful

A repeated procedure may enter Skill Discovery only when its trigger, inputs,
steps, output, validation, and failure boundary are stable. Existing installed
or built-in coverage wins unless evidence shows the missing behavior.

For a Plugin or packaged Skill, preserve this evidence ladder:

```text
available -> installed -> discovered -> selected -> invoked
-> task-relevant -> accepted outcome -> later comparable improvement
```

A fresh-task trial can establish discovery, activation, invocation, and
task-level usefulness. It cannot alone establish durable Loop Effectiveness or
justify replacing another package. Record missing steps and comparison scope.

## Lead Disposition

For each joined candidate, internally record whether demand and coverage are
comparable, the current/smallest owner, the missing behavior, evidence state,
and one of: retain, merge, downgrade, unsupported, defer, route to Skill
Discovery, or route to Memory Review. This is lead working state, not a new
specialist schema or report artifact.

Only after this disposition may the lead phrase a recommendation. Keep
creation, installation, cleanup, or write-back behind separate task-local
authorization and a named verifier.
