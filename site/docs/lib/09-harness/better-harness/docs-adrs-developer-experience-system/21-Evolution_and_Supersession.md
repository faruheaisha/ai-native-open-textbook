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
pageSha256: "1567f1800cfba4b64c80105c2b9758cda6c03126a48814739ca9364e07fb359e"
contentMode: "local-full"
zh: ""
---

## Evolution and Supersession

Review this decision when any of the following occurs:

- a remote service or telemetry path becomes part of default operation;
- host-support declarations or native evidence move to an external authority;
- multiple products consume the DX control plane and repository-local ownership
  no longer fits;
- CLI, MCP, desktop, or hosted service becomes the primary product route;
- a schema or evidence compatibility break cannot be handled by a new major
  version;
- journey metrics influence release or support policy in a way not covered here;
- the federated model repeatedly causes unresolved ownership conflicts.

A superseding ADR must identify migrated declarations, projections, receipts,
compatibility windows, privacy changes, and rollback. Historical evidence and
decision ids remain discoverable.
