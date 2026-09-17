---
title: "Private artifact storage"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/artifacts/README.md"
sourceRel: "researcher/artifacts/README.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/artifacts/README.md"
sourceSha256: "6b8795d5245c17235d45c433b0a32d7b1bf85a89f744cb5108963c86579dc847"
pageSha256: "6b8795d5245c17235d45c433b0a32d7b1bf85a89f744cb5108963c86579dc847"
contentMode: "local-full"
zh: ""
---

# Private artifact storage

`researcher/artifacts/private/` is an ignored local default for SPEC-003 content-addressed bodies, reference records, storage bindings, freeze receipts, and locks. Deployments should configure a private root outside the public checkout.

`ArtifactRef` is portable and contains no storage locator. It records the target's native or legacy ID origin, and validation resolves the target kind and version before enforcing that schema's typed-ID prefix. `StorageBinding` is private metadata. Neither is authority. Callers supply an `ArtifactAuthority` for every read, and authorization occurs before object existence is checked. Every read loads and validates both records and proves that the binding locator matches the reference digest.

`LocalArtifactStore.put()` is for registered JSON records, not arbitrary bytes. It validates the body, kind, version, typed ID, and classification before writing. Candidate file bodies use the lower-level CAS only after a candidate record and editable-surface policy have passed freeze validation.

`head()` may inspect a validated `tombstoned` or `unavailable` reference for audit purposes. `put()`, `get()`, `verify()`, and `materialize()` deny that state even if bytes remain in CAS; a writer cannot silently resurrect an immutable reference.
