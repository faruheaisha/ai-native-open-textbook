---
title: "Agent Note: Unlink stale profile fallback links instead of rmSync"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/bug-fix/2026-08-12-unlink-stale-profile-fallback-links.md"
sourceRel: ".agents/notes/archived/bug-fix/2026-08-12-unlink-stale-profile-fallback-links.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/bug-fix/2026-08-12-unlink-stale-profile-fallback-links.md"
sourceSha256: "153237035456f7878f2b143493e8507c46fa551ab01ee60807c8d123d9bed16f"
pageSha256: "153237035456f7878f2b143493e8507c46fa551ab01ee60807c8d123d9bed16f"
contentMode: "local-full"
zh: ""
---

# Agent Note: Unlink stale profile fallback links instead of rmSync

Status: implemented
Archived: 2026-09-04

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-bug-fix-2026-08-12-unlink-stale-profile-fallback-links.zh)

## Problem

`healProfilesModuleFallback` re-points `$DSH_HOME/profiles/node_modules` entries when an installation moves, and Windows hosts keep those entries as junctions. `ensureSymlink` deleted a stale entry with `rmSync(link)`, but Node treats a junction as a directory for removal: without `recursive`, `rmSync` throws `ERR_FS_EISDIR`, so every launch from a moved installation or a second worktree crashed before booting. The `replaces a wrong symlink` unit test reproduces that crash on Windows at the exact removal call.

## Decision

`ensureSymlink` removes a stale link with `unlinkSync(link)`. `unlink` deletes the reparse point or symlink itself on every platform and never descends into the target, which preserves the function's fail-loud guarantee that a real directory is never deleted. The [profile-plugin-bundles decision](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/architecture/2026-08-05-profile-plugin-bundles.md) keeps owning the fallback's two-anchor resolution; this note owns only the removal primitive.

## Alternatives considered

**`rmSync(link, \{ recursive: true \})`.** On Node 24 this deletes the junction without following its target, but `recursive` would silently delete a real directory that replaced the link between the `lstat` guard and the removal, weakening the fail-loud contract that motivates the guard.

**`rmdirSync(link)`.** Removes a junction on Windows as well, but it reads as directory removal for a link, and `unlinkSync` is the repository's existing junction-cleanup idiom.

**Delete and recreate every entry unconditionally.** Correct but churns unchanged links on every launch and widens the concurrent-heal race window.

## Consequences

Windows launches heal moved or second-checkout installations instead of crashing with `ERR_FS_EISDIR`; POSIX behavior is unchanged because `unlinkSync` also unlinks plain symlinks. The existing `replaces a wrong symlink` test now passes on Windows where it previously reproduced the crash. Two concurrent healers deleting the same stale link still surface the second deletion as `ENOENT`, unchanged from the previous `rmSync` implementation.
