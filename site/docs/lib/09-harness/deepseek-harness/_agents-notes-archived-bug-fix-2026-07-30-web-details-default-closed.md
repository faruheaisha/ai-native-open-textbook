---
title: "Agent Note: Web details default closed"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/bug-fix/2026-07-30-web-details-default-closed.md"
sourceRel: ".agents/notes/archived/bug-fix/2026-07-30-web-details-default-closed.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/bug-fix/2026-07-30-web-details-default-closed.md"
sourceSha256: "27a280a817c8048718bb22927e7d9572cf99ffd0c044631e99e0fd6ea236876f"
pageSha256: "27a280a817c8048718bb22927e7d9572cf99ffd0c044631e99e0fd6ea236876f"
contentMode: "local-full"
zh: ""
---

# Agent Note: Web details default closed

Status: implemented
Archived: 2026-08-07

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-bug-fix-2026-07-30-web-details-default-closed.zh)

## Problem

The transient layout store initialized details to its 360px contract width. The first connected Session and every full reload therefore reserved a right column before the user selected any detail content. Chat tool rows deliberately remain inline and do not open details, while Trajectory rows open the panel when an event is selected, so an open layout default did not represent an active detail selection.

## Decision

The layout store initializes details to zero while retaining the existing 360px contract default for `openDetails()`. `AppFrame` keeps the details slot mounted at zero width, so an explicit entry point such as Trajectory event selection can open the panel without remounting its subtree. The [Session ownership lifecycle](/lib/09-harness/deepseek-harness/_agents-notes-archived-bug-fix-2026-07-29-web-details-session-lifecycle) remains authoritative: unselected surfaces derive zero width without taking ownership, returning to the same Session preserves an explicitly opened width, and selecting a different Session closes it.

Panel geometry remains transient. No browser storage key is introduced, and reload restores the sidebar default while details returns to zero. Component tests pin the store default, mounted zero-width slot, drag and concession behavior after explicit opening, and Session ownership transitions. The keyless shipped-composition regression pins the closed first Session, reload, new-session surface, and subsequent Session selections.

## Alternatives considered

**Persist the last open or closed preference.** Rejected because reload should have a deterministic closed baseline, and persisting geometry would reintroduce stale viewing state across browser sessions.

**Keep details open until Chat receives a replacement selection gesture.** Rejected because empty space is not useful detail content. Chat's inline tool-row interaction and any future detail-selection gesture are separate product decisions.

**Remove the details column and layout service.** Rejected because Trajectory already opens event details through this seam, and keeping the mounted slot preserves that working interaction.

## Consequences

New, restored, and reloaded Sessions use the full center area until an explicit details action opens the right column. Trajectory event selection can still open details at 360px and its close control returns the track to zero; Chat tool rows remain geometry-inert. Switching to another Session closes an opened panel, and no panel state survives reload.
