---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/handoff-update/SKILL.md"
sourceRel: "examples/skills/handoff-update/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/handoff-update/SKILL.md"
sourceSha256: "6bd4d8c71e183229dbe68e9eb60c12cd0cd73b9a5b060c6636c6117b04a39220"
pageSha256: "6bd4d8c71e183229dbe68e9eb60c12cd0cd73b9a5b060c6636c6117b04a39220"
contentMode: "local-full"
zh: ""
---

# Claude Code Ultimate Guide

Update an existing handoff document with this session's progress.

## Step 1: Resolve the Handoff File

Determine which file to update, in this priority order:

1. If `$ARGUMENTS[0]` was provided, use it as the file path.
2. If this session was started via `/handoff:resume`, look in conversation history for the argument that was passed to it.
3. If neither is found, fall back to creating a new file: `claudedocs/handoffs/handoff_YYYYMMDD_HHMMSS.md`. Inform the user that no existing handoff was found.

## Step 2: Read the Existing File

Read the resolved file completely. Parse all sections as the baseline for the merge.

## Step 3: Apply Section Merge Rules

Rewrite the file with updated content using these merge rules:

| Section | Rule | Notes |
|---------|------|-------|
| **Task** | Keep original | Update only if scope fundamentally changed |
| **Scope** | Keep or refine | Narrow it if new understanding emerged |
| **Files** | Merge | Add new files touched in this session. Keep originals. Use `path:line` format |
| **Discoveries** | Append | Add new findings below existing list. Never remove prior discoveries |
| **Work Done** | **Append only** | Add new completed items below existing list. Never remove entries. Include commit hashes |
| **Status** | **Replace** | Write the current state: what is done now, what remains, test status |
| **Next Steps** | **Replace** | Write the updated actionable checklist |
| **Code** | Update | Replace with the most relevant snippets from the current state |

**The append-only rule for Work Done is strict.** Even if a previous entry describes work that was later revised, keep it. The history is the record. Add a new entry describing the revision instead of removing the old one.

## Step 4: Confirm

After saving, confirm:
- File path updated
- How many new Work Done items were added
- The updated Status (one line)
- How many Next Steps remain

---

> This command implements the Handoff Triad pattern documented in this guide's Session Handoff Pattern section.
> Template inspired by [Packmind's handoff commands](https://github.com/packmind/packmind) (Apache 2.0).
