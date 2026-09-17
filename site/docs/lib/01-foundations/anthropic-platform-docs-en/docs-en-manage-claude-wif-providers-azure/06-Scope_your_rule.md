---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/manage-claude/wif-providers/azure.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/manage-claude/wif-providers/azure.md"
sourceSha256: "952202dd6887403d9a88e6fd385834a36f495c73cd33536fe2d20c2acfccfa6a"
pageSha256: "b3e918f9b9d64ea1b7559fa18471efa306779568f364164a95a4f529d4002ad7"
contentMode: "local-full"
zh: ""
---

## Scope your rule

A federation rule can match the token's subject with `subject_prefix` in addition to (or instead of) the `claims` map; see [Rule matching semantics](https://platform.claude.com/docs/en/manage-claude/wif-reference#rule-matching-semantics) for how the fields combine. Entra `sub` values for these identities are fixed-length canonical GUIDs, so a `subject_prefix` containing the full 36-character object ID matches only that subject; this is a property of Entra's subject format, not of `subject_prefix` in general.

  Every identity in your tenant can request a token for the registered audience, so `audience` and `tid` alone do not identify a specific workload. A rule that omits an `oid` (or `azp`/`appid`) match, or that uses a wildcard or partial-GUID `subject_prefix`, authorizes every managed identity and service principal in the tenant.

Lock the rule's `match` block to the narrowest scope that fits your use case:

* **Match `oid` as an exact value:** Set `claims.oid` to the managed identity's full object ID. A `subject_prefix` set to that full object ID is equivalent (the Console wizard sets both); never use a wildcard or partial-GUID `subject_prefix`, which matches more identities than you intend.
* **Pin `tid` as defense in depth:** The issuer URL already pins your tenant, but adding `claims.tid` guards against configuration drift if the issuer record is later edited.
* **Pin the audience:** Set `audience` to the exact `aud` value from your decoded token so tokens minted for other applications are rejected.
* **Use a separate rule for each managed identity:** Create one rule for each identity rather than one rule that authorizes several, so you can revoke a single workload's access without affecting others.
