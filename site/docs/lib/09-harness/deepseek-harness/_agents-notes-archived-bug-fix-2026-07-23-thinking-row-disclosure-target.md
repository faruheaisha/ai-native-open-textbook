---
title: "Agent Note: Thinking rows use one disclosure target"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/bug-fix/2026-07-23-thinking-row-disclosure-target.md"
sourceRel: ".agents/notes/archived/bug-fix/2026-07-23-thinking-row-disclosure-target.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/bug-fix/2026-07-23-thinking-row-disclosure-target.md"
sourceSha256: "92815c170972b1b91c3d75dd0c846c070805ec1e99ce368b6aae37b048e19869"
pageSha256: "92815c170972b1b91c3d75dd0c846c070805ec1e99ce368b6aae37b048e19869"
contentMode: "local-full"
zh: ""
---

# Agent Note: Thinking rows use one disclosure target

Status: implemented
Archived: 2026-07-26

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-bug-fix-2026-07-23-thinking-row-disclosure-target.zh)

## Problem

A collapsed reasoning entry presents `Think` and its one-line reasoning summary as one visual row, but an icon-only disclosure control leaves both visible labels inert. Applying title expansion to every tool row would instead break the generic tool-row contract, where the row opens details and only the leading control expands arguments.

## Decision

`ToolRow` exposes the opt-in `expandOnRowClick` policy. `ThinkRow` enables it so the title and reasoning summary form one accessible disclosure target; pointer clicks, Enter, and Space toggle the same component-local expanded state. Tool rows that do not opt in retain row-to-details selection and leading-control argument expansion.

## Verification

The component spec pins both Think click targets and the unchanged generic tool-row handoff. The keyless browser fixture loads the real sidebar and conversation bundles, opens an authored reasoning session, clicks the summary and title, and checks the disclosure state and expanded body.

## Alternatives considered

**Expand every tool row from its title.** Generic tool rows use row clicks for details selection, so sharing this behavior would conflate two controls.

**Keep icon-only disclosure.** The smallest hit target remains disconnected from the labels that describe the hidden content.

**Render separate title and summary buttons.** Two controls for one expanded state add duplicate focus stops and ambiguous semantics.

## Consequences

Thinking rows gain a larger pointer target and keyboard disclosure semantics without changing other tool interactions. The generic row component carries one optional policy because disclosure ownership differs between reasoning and tool calls.
