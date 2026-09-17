---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "90263161de1e8b99a056588c4e6e0cf5e65671b5e7df85ed97269d190a5169db"
contentMode: "local-full"
zh: ""
---

## Trust and Permission Scoping

> **Changelog-sourced (v2.1.222, v2.1.232)**: these tightenings come from the changelog;
> the settings reference does not yet spell them out.

A recurring theme in recent releases: security-relevant settings can no longer be widened
by a repository you cloned. Three changes to know about.

**Nested repositories need their own trust confirmation (v2.1.232).** A git repository
inside a trusted parent directory no longer inherits that trust. If you trust
`~/work/monorepo` and it contains a vendored submodule, you will be asked to trust the
submodule separately the first time Claude Code works inside it.

**`sandbox.ripgrep` is user-scope only (v2.1.232).** The setting that names the ripgrep
binary the sandbox uses is honored only from user settings, managed settings, or
`--settings`. Project settings can no longer point the sandbox at a different binary.

**Remote Control auto-start is user-scope only (v2.1.222).** Repo-local settings cannot
enable Remote Control auto-start; it can only be turned on at user scope via `/config`.

The pattern to internalize: if a setting would let a checked-in file expand what Claude
Code is allowed to do on your machine, assume it is now user-scope only.
