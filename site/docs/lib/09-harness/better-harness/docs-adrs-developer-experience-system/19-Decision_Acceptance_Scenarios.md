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
pageSha256: "dc2fe681fee8b8282851bb3071ae4bb421e843905afa15c631d4c62a7384a2d8"
contentMode: "local-full"
zh: ""
---

## Decision Acceptance Scenarios

The decision is ready for maintainer acceptance when:

- `DXS-AC-1`: reviewers can distinguish current behavior, target architecture,
  activation gates, and decision status.
- `DXS-AC-2`: every persona maps to at least one journey with observable
  completion and recovery.
- `DXS-AC-3`: every fact type has one canonical owner, and the DX catalog has no
  business-judgment ownership.
- `DXS-AC-4`: command, diagnostic, status, side-effect, privacy, compatibility,
  and machine-output rules are unambiguous.
- `DXS-AC-5`: support slices, promotion states, evidence classes, receipts,
  freshness, and demotion rules are explicit.
- `DXS-AC-6`: documentation, localization, Preview, contribution, CI, release,
  support, security, and accessibility are part of the same journey system.
- `DXS-AC-7`: measurement remains local-first by default and preserves
  unobserved values.
- `DXS-AC-8`: each migration phase has an entry purpose, exit gate, rollback,
  and separate implementation-spec requirement.
- `DXS-AC-9`: alternatives, consequences, costs, risks, mitigations, and
  supersession triggers are documented.
- `DXS-AC-10`: the ADR and matching spec are mutually linked, the ADR index
  provides a stable route, and architecture/contribution entrypoints identify
  when this decision applies.
- `DXS-AC-11`: links, focused document checks, package boundaries, whitespace,
  and independent architecture review pass with no unresolved P1 or P2.
