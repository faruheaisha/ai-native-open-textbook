---
title: "Agent Note: Resolve filesystem paths against the caller's session cwd"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/architecture/2026-07-02-fs-per-session-cwd.md"
sourceRel: ".agents/notes/archived/architecture/2026-07-02-fs-per-session-cwd.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/architecture/2026-07-02-fs-per-session-cwd.md"
sourceSha256: "5eb7a57a84ce430f6eda3259b8733173d37a8ca6c9489d9f9ba118b57e6e2f5f"
pageSha256: "5eb7a57a84ce430f6eda3259b8733173d37a8ca6c9489d9f9ba118b57e6e2f5f"
contentMode: "local-full"
zh: ""
---

# Agent Note: Resolve filesystem paths against the caller's session cwd

Status: implemented
Archived: 2026-09-04

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-architecture-2026-07-02-fs-per-session-cwd.zh)

## Problem

The ACP bridge gives every session its own workspace: `session/new` records the automation client's project directory as `SessionHeader.cwd`, and `dsh-tool-bash` defaults each bash call's `workdir` to the calling agent's `session.header.cwd` (see [the ACP package](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/packages/acp/acp/README.md) and `resolveWorkdir` in `dsh-tool-bash`). So a bash command in session A runs in A's project, and in session B runs in B's — one server process, N workspaces.

Filesystem resolution used one plugin-load cwd while bash used the session project directory. Relative paths therefore disagreed whenever the automation client's project differed from the server launch directory; snapshots hid the bug by making those paths identical.

A valid absolute cwd can itself have two apparent parents: when it contains `symlink/..`, filesystem lookup follows the symlink before applying `..`, while `path.resolve()` erases both components lexically. Resolving sandbox policy lexically while launching bash from the raw cwd granted the unrelated lexical parent, denied writes in the real workspace, and let filesystem tools resolve relative paths into the wrong directory.

An ordinary symlink cwd exposes the same distinction when the requested relative path contains `..`: a process traverses from the symlink's physical target, while `path.resolve(cwd, path)` traverses from its lexical spelling. Reads would therefore select a different file than bash or a sandboxed mutation for the same model-supplied path.

## Decision

Thread the caller's session cwd into path resolution, exactly as `dsh-tool-bash` already does for `workdir`. When either the cwd or the requested path contains a parent segment, resolve the cwd to its native filesystem identity before any lexical join; ordinary cwd spellings stay stable for display when no traversal makes their identity observable. Reuse the resolved sandbox-policy root for mutations and sandboxed bash calls so one call has one workspace identity. The **caller** (the tool) supplies the cwd; the provider does not read a session or agent.

- `FileSystem.resolve` accepts `resolve(path: string, opts?: \{ cwd?: string; signal?: AbortSignal \}): Promise<FsTarget>`. `opts.cwd` is the base a RELATIVE `path` resolves against; an absolute `path` ignores it; omitting `opts.cwd` uses the backend's own default. `opts.signal` cancels resolution when the backend performs I/O. The options object keeps both caller-owned resolution controls together without positional growth.
- `dsh-fs-local.resolve` uses `resolveLocalTarget(opts?.cwd ?? this.config.cwd, path)`. `config.cwd` stays the default for a caller that supplies no session cwd.
- `dsh-tool-fs`'s `read`/`write`/`edit` derive the session cwd through a shared `sessionCwd(exec, requestedPath)` helper (`exec.agent?.session.header.cwd`, mirroring bash's `resolveWorkdir`) and pass it to `resolve`. The helper uses native realpath semantics when a parent segment in either value could cross a symlink while retaining ordinary spellings otherwise; a sandboxed mutation reuses the complete policy's `workspaceRoot`; a non-agent / headerless caller yields `undefined`, so the backend applies its default.

## Alternatives considered

### Why the caller supplies the cwd (not the provider)

The provider contract must not depend on `dsh-agent` / `dsh-session` — it is a text-storage backend that a sandboxed or remote implementation also satisfies, and those have no notion of an "agent session". The tool already receives the `ToolExecution` (`exec`), which carries the agent, so the tool is the right place to project `exec → cwd` and hand the provider a plain string. This is the "explicit > implicit at package boundaries" convention: the base directory arrives as an explicit argument the provider acts on, not smuggled in by having the provider reach into a session it should not know about. It also matches `dsh-tool-bash` one-to-one, so the two model-facing file surfaces resolve paths identically.

The default lives in ONE place — the provider's `config.cwd`. `sessionCwd` returns `undefined` rather than `process.cwd()` when there is no session, so the tool never manufactures a base the provider would otherwise choose.

## Consequences

- In the ACP demo the fs tools and bash agree on each session's workspace; an automation client can select any absolute project directory and both tool families act on it.
- A session cwd containing `symlink/..`, or an ordinary symlink cwd paired with a parent-traversing relative path, resolves from the same physical workspace for bash, filesystem tools, and the sandbox grant; the lexical parent receives no grant.
- No change to `FsTarget` identity: `targetKey` is still the realpath of the resolved absolute path, so observed-state keying and symlink identity are unaffected — a correct per-session cwd produces the same key bash targets.
- Backward compatible: every existing `resolve(path)` call (all in tests) keeps working; the new argument is optional.
- The single-session stdio demo is unaffected: it supplies no session cwd (its agent's session has no `cwd`), so resolution falls back to `config.cwd = process.cwd()`, which is the workspace.
