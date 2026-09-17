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
pageSha256: "d1409c8c5f649fb5f8e3a081fe6026d151ac576ed7f83a6b07f984eb3fc92d64"
contentMode: "local-full"
zh: ""
---

## Context and Problem Statement

Better Harness already has strong local DX components: bilingual documentation,
host-specific entrypoints, audience-layered CLI help, machine-readable output,
cross-platform tests, package verification, Preview tooling, evidence-first
adapter guidance, Specs, and review gates. The components do not yet behave as
one system.

The same product fact can currently appear in host manifests, command parsers,
CLI help, adapter matrices, README sections, Docusaurus pages, issue forms,
tests, changelog entries, and release workflows. Those copies can agree with
each other while still being stale. A command group can look discoverable at the
root while a leaf command treats `--help` as runtime input. A deterministic
fixture can pass while a native host path is broken. A public support label can
remain current after its native evidence is no longer current. A successful
collector can also be confused with a collector that failed and was silently
downgraded.

This creates different failure modes at different developer levels:

- evaluators cannot always distinguish a host-integrated report path from a
  source or probe CLI;
- operators can install a surface without knowing how to verify, invoke,
  recover, update, remove, or find its output;
- first-time contributors can run root tests but may not discover the separate
  documentation build or the smallest change-specific gate;
- experienced contributors can find the capability owner but still encounter
  inconsistent leaf-command contracts and hidden local runtime dependencies;
- adapter authors have a good evidence checklist but must propagate host facts
  manually across many surfaces;
- maintainers have broad CI and package checks but no single chain from a public
  claim to fresh native evidence and a protected release;
- support and security responders lack one bounded, redacted diagnostic
  contract and a private disclosure path.

The architecture must make a public experience claim traceable without moving
all product judgment into a new central monolith.
