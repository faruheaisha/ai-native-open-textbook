---
title: "Agent Note: Source checkout paths do not define working directories"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/bug-fix/2026-07-30-source-checkout-workdir-distinction.md"
sourceRel: ".agents/notes/archived/bug-fix/2026-07-30-source-checkout-workdir-distinction.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/bug-fix/2026-07-30-source-checkout-workdir-distinction.md"
sourceSha256: "e05169d4ee99d3d41e7808256bdd97a596036073e94fbb3ca257fd28315cfc37"
pageSha256: "e05169d4ee99d3d41e7808256bdd97a596036073e94fbb3ca257fd28315cfc37"
contentMode: "local-full"
zh: ""
---

# Agent Note: Source checkout paths do not define working directories

Status: implemented
Archived: 2026-09-04

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-bug-fix-2026-07-30-source-checkout-workdir-distinction.zh)

## Problem

The `harness:source` prompt section follows the [source-location decision](/lib/09-harness/deepseek-harness/_agents-notes-archived-feature-2026-07-21-dsh-system-prompt-source-path), but its original wording called the checkout “your own source code” without distinguishing that path from the session workspace. In a normal TUI configuration that does not state <code v-pre>{{cwd}}</code> in its persona, this may be the only fixed absolute path near the start of the system prompt. DeepSeek V4 could therefore answer “what's the workdir?” with the harness checkout instead of determining the session's current working directory.

A blanket statement that the checkout is not the working directory would also be false. `dsh meta` intentionally makes the source checkout both values.

## Decision

The section identifies the path as the “DeepSeek Harness implementation checkout.” It says that the checkout location and current working directory are separate values that may differ, forbids inferring the working directory from the checkout path, directs the model to use `pwd`, and limits the checkout's purpose to inspecting or extending DSH itself.

The path derivation and global `harness:source` ownership remain unchanged. The section uses first-party order −900, immediately after `harness:identity`. Describing the values as conceptually separate rather than always unequal keeps the instruction accurate in both ordinary project sessions and `dsh meta`.

## Verification

The `dsh-app-boot` unit test pins the exact text and its ordering. The CLI keyless PTY smoke inspects the assembled request header. The TUI `source-checkout-workdir` snapshot mounts the section with `/opt/dsh-source`, asks “what's the workdir?” through a recorded DeepSeek V4 turn, and requires the replayed transcript to run `pwd` and report the generated workspace rather than the checkout.

## Alternatives considered

**Say that the checkout is never the working directory.** Rejected because `dsh meta` deliberately makes them the same path.

**Put the current working directory in the global source section.** Rejected because the source section is launcher-global while the working directory belongs to each session; combining them would duplicate the loop's `cwd` ownership and make a stable source fact vary per agent.

**Remove the source path from the prompt.** Rejected because self-referential DSH tools still need a reliable checkout location when the launcher starts from an unrelated project.

## Consequences

The prompt is longer and a direct working-directory question may spend one inexpensive `pwd` tool call. In exchange, the model no longer treats the harness implementation path as an implicit task workspace, while meta mode remains truthful when both values coincide.
