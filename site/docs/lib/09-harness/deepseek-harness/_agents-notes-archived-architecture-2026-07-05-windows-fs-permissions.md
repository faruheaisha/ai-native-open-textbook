---
title: "Agent Note: Windows write-permission semantics — inherited DACLs, not mode bits"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/architecture/2026-07-05-windows-fs-permissions.md"
sourceRel: ".agents/notes/archived/architecture/2026-07-05-windows-fs-permissions.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/architecture/2026-07-05-windows-fs-permissions.md"
sourceSha256: "03734da511eae3b0736f7cad73d9da76ae2f69f9d5ed09089b0121ccb135a861"
pageSha256: "03734da511eae3b0736f7cad73d9da76ae2f69f9d5ed09089b0121ccb135a861"
contentMode: "local-full"
zh: ""
---

# Agent Note: Windows write-permission semantics — inherited DACLs, not mode bits

Status: implemented
Archived: 2026-07-26

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-architecture-2026-07-05-windows-fs-permissions.zh)

The replacement-file decision in this record is superseded by [Windows DACL preservation](/lib/09-harness/deepseek-harness/_agents-notes-archived-bug-fix-2026-07-19-windows-atomic-write-dacl-preservation).

## Problem

`writeFileAtomic` in `@deepseek-ai/dsh-fs-local` protects write-in-progress content with POSIX mode bits: the staging directory is created `0o700`, the temp file is opened `0o600`, and new files default to `0o600`. On POSIX this keeps temporary content owner-only regardless of the parent directory's permissions.

Windows has no working equivalent behind the same API. Node's `chmod` there drives only the read-only attribute (every mode this package passes carries owner-write, so the calls are benign no-ops), and `stat().mode` reports synthetic `0o666`/`0o444` bits. The real security state is the file's DACL: a newly created file or directory inherits from its parent, while replacement needs the explicit handling owned by the superseding Agent Note.

## Decision

New Windows files use directory inheritance rather than synthetic mode bits: the staging directory is created inside the target's parent directory (`dirname(absolutePath)`), so it and the temp file inherit the destination directory's DACL. Replacement files follow the stricter [DACL preservation contract](/lib/09-harness/deepseek-harness/_agents-notes-archived-bug-fix-2026-07-19-windows-atomic-write-dacl-preservation).

Tests assert mode bits on POSIX only. Native Windows coverage pins the package-owned replacement behavior; new-file inheritance remains an operating-system contract rather than a machine-specific ACL allowlist.

## Alternatives considered

**Explicit owner-only DACLs for new files.** Rejected because they would break inheritance and surprise users whose project directories are deliberately shared. Replacement writes copy the target's existing DACL rather than inventing an owner-only policy.

**Test-side ACL verification.** A `Get-Acl` SID allowlist or `icacls` would verify Windows inheritance and the machine's `%TEMP%` ACL rather than package behavior; `icacls` also localizes well-known account names, making parsing locale-fragile.

**Skip `chmod` on Windows.** Platform-guarding benign no-op calls adds branches without changing behavior.

## Consequences

POSIX keeps owner-only temp content regardless of the parent directory. A new Windows target inside a broadly accessible directory inherits that accessibility by design; a replacement retains the target's narrower DACL when one exists.

Mode preservation across a replace degenerates to a no-op on Windows: a writable file probes as `0o666`, and replaying that through `chmod` leaves the read-only attribute clear. A read-only target cannot be replaced there because publication fails before the synthetic mode would matter.
