---
title: "Better Harness（QoderAI）"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/adrs/developer-experience-system.md"
sourceRel: "docs/adrs/developer-experience-system.md"
rawUrl: "/raw/09-harness/better-harness/docs/adrs/developer-experience-system.md"
sourceSha256: "9b9c3c71dc8a49c147885497857e99bfe5eae866c09b264ca76e9decb808950f"
pageSha256: "344ef586676fbe8a522ea17fbe2afa4efab73cc55e68fccb73a40b46c1d30405"
contentMode: "local-full"
zh: ""
---

## Journey Contracts

Every journey must declare its owner, entry surface, prerequisites, observable
completion, safe recovery, privacy boundary, evidence class, and measurement.

| ID | Journey | Observable completion |
| --- | --- | --- |
| `DX-J1` | Evaluate | The evaluator can select host-integrated use, CLI use, or source contribution; identify current support and limitations; and understand reads, writes, and network behavior |
| `DX-J2` | Install and verify | The selected surface is installed and a host-native inspection or read-only diagnostic confirms the intended version and capability slice |
| `DX-J3` | Reach first value | The correct host invocation or CLI command completes and the user can open the declared report or artifact |
| `DX-J4` | Recover from failure | A stable diagnostic distinguishes invalid input, missing authority, unsupported scope, unavailable dependency, empty evidence, collector failure, and malformed output; the user can retry safely or prepare bounded support evidence |
| `DX-J5` | Update, roll back, or remove | The user can preview compatibility, update or pin a version, roll back when supported, uninstall the surface, and locate any retained reports or caches |
| `DX-J6` | Make a first contribution | A contributor can clone, select the owner, run the smallest focused gate, preview when relevant, and open a PR whose evidence matches the changed scope |
| `DX-J7` | Extend a capability or host | The author can prepare a spec, implement one owned slice, run fixtures and conformance, attach native evidence when claimed, update projections, and request promotion without broad search-and-copy work |
| `DX-J8` | Release and verify | A maintainer can plan from a protected revision, verify version and evidence, publish immutable artifacts, install from the real distribution surface, and roll back or deprecate deliberately |
| `DX-J9` | Support or disclose | A user can create a redacted reproduction, choose public support or private security disclosure, understand retention, and receive a stable next action |

The following routing matrix instantiates the required journey fields for this
decision. This ADR permanently owns the core ids, core completion meanings,
required fields, and removal rules. Future operational detail moves to the
target versioned journey catalog under `docs/dx/` only through the activation
ledger; until then, this table owns both layers.

| ID | Primary personas | Current owner and entry surface | Prerequisite | Recovery route | Privacy and evidence boundary | Measure owner |
| --- | --- | --- | --- | --- | --- | --- |
| `DX-J1` | Evaluator, Operator | Root README, curated site introduction, and public host matrix | A candidate host or CLI/source intent | Installation chooser and support matrix | Public structured facts and bounded sample artifacts only | Target DX metric policy; unobserved until a metric spec lands |
| `DX-J2` | Operator | Host shell or native install route plus installation guide; target host profile and `doctor` contribute verification | Supported host/version and authority to install | Host-specific recovery and read-only diagnostic | Install/discovery receipt; no raw sessions required | Host-support owner supplies facts; DX metric policy owns definition |
| `DX-J3` | Operator | Canonical Skill/output contract or capability-owned CLI command | Verified entrypoint, qualified workspace, and declared evidence scope | Stable command diagnostic and artifact-discovery guidance | Report/output receipt; session data remains within declared capability scope | Report/command capability supplies event; DX metric policy owns definition |
| `DX-J4` | Operator, Support responder | Command capability diagnostics and troubleshooting guidance | A reproducible failed or partial attempt | Code-specific safe retry, bounded support plan, or private disclosure | Redacted diagnostic envelope; failure and unobserved lanes retained | Diagnostic capability supplies codes; DX metric policy owns recovery measure |
| `DX-J5` | Operator | Native host install owner, package owner, and support policy | Installed version and supported update/removal mechanism | Pin, rollback, reinstall, or explicit retained-data cleanup | Package/host evidence only; no deletion of reports or config without explicit scope | Host/package owner supplies lifecycle event; DX metric policy owns definition |
| `DX-J6` | First-time contributor | `CONTRIBUTING.md`, root package tasks, Preview route, and PR template | Supported Node/npm, clone, and selected change owner | Baseline-failure recording, focused troubleshooting, and maintainer help | Repository/fixture evidence; no private host state in PRs | CI supplies deterministic timing; DX metric policy owns population |
| `DX-J7` | Experienced contributor, Adapter author | `AGENTS.md`, architecture, community matrix, capability owner, and host guide | Matching dated spec when required and explicit claimed slices | Conformance failures, advisory native evidence, and rollback owner | Fixture, package, and native evidence stay separately typed | Capability/host owner supplies gates; DX metric policy owns definition |
| `DX-J8` | Maintainer, Releaser | Package/packaging owners and protected release workflow | Accepted release plan, immutable revision, fresh claim evidence, and authority | Abort plan, withdraw artifact, roll back, or deprecate | Release snapshot references immutable digests; post-publish evidence is separate | Release owner supplies events; DX metric policy owns definition |
| `DX-J9` | Operator, Support and security responder | Troubleshooting and issue routes; target `SUPPORT.md`, `SECURITY.md`, privacy policy, and support-bundle capability | User-selected public support or private disclosure route | Redacted plan, explicit persistence/send, deletion route, and responder handoff | No raw source/session/credential defaults; upload is separate external apply | Support owner supplies demand category; DX metric policy owns definition |

Each journey is reviewed through all five DX pillars. A journey does not pass
because only its documentation exists or only its deterministic tests pass.

After the journey catalog activates, contributors use these non-overlapping
edit routes:

- add an operational field or change an owner, entry surface, prerequisite,
  recovery route, evidence mapping, or stable metric-id binding in the versioned
  `docs/dx/` instance through a dated spec;
- add or change a metric definition, population, numerator, denominator,
  sampling boundary, privacy class, cadence, or decision consumer only in the
  separately versioned DX metric-policy registry under `docs/dx/`;
- add a non-core journey with a new id in the versioned catalog through a dated
  spec and explicit persona mapping;
- revise this ADR to remove, reuse, or change the completion meaning of
  `DX-J1` through `DX-J9`, remove a required field, or change the five-pillar
  rule.

Validation requires every core id exactly once in the active catalog, rejects
any operational instance that changes its ADR-owned completion meaning, and
requires every metric-id binding to resolve to exactly one active metric-policy
definition for that journey. Journey instances may not embed metric definitions.
The ADR does not duplicate later operational values.
