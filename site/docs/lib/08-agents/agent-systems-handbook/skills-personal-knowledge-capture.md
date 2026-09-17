---
title: "Personal Knowledge Capture"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/personal-knowledge-capture/README.md"
sourceRel: "skills/personal-knowledge-capture/README.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/personal-knowledge-capture/README.md"
sourceSha256: "ad18d36e3bb282dcad3c16c1f6a2314d70d596889989691959223ba6b2c0f0e3"
pageSha256: "ad18d36e3bb282dcad3c16c1f6a2314d70d596889989691959223ba6b2c0f0e3"
contentMode: "local-full"
zh: ""
---

# Personal Knowledge Capture

## Why This Skill Exists

This package is a Practitioner-facing workflow for turning local research files into searchable, cited Markdown notes.

"Summarize my research folder" is not a single prompt problem once the workflow needs durable watch paths, incremental detection, file hashing, document parsing, source references, and repeated notes across sessions. This skill keeps those deterministic parts in a local helper script and leaves synthesis to Codex.

## Who It Is For

This skill is for students, contributors, and operators who collect local research material and want a repeatable way to capture what changed.

It is most useful for requests such as:

- watch my AI research folder
- summarize files I added today
- turn new Markdown, TXT, DOCX, or PDF files into cited notes
- keep a local SQLite record of captured sources

## End-to-End Workflow

The workflow is local-first and explicit:

1. Register a folder the user names.
2. Scan only registered folders.
3. Detect new or modified files by path and SHA-256 hash.
4. Extract text where supported.
5. Write a dated Markdown note with source references.
6. Keep runtime state outside the repository by default.

## What The Package Actually Does

The helper script supports:

- `add-watch` for persistent watch-path registration
- `scan` for new and modified source detection previews
- `summarize` for scan-and-write dated Markdown note generation
- `capture-url` for explicitly provided URLs

The generated Markdown note uses the required section structure:

```md
# Summary

## New Files

## Key Insights

## Actionable Notes

## Open Questions

## Source References
```

## What It Does Not Do

This package does not:

- run a live background watcher
- scan unregistered folders
- upload local files to external services
- move or rewrite source files
- commit runtime databases or generated notes

## Status And Maintenance

This is a first-version local helper. Maintain it as a deterministic scanner and note writer: keep runtime state outside git, keep new extractors optional unless they use the Python standard library, and update `references/supported-file-types.md` when file type support changes.

## How To Read It In The Handbook

Treat this package as a Practitioner example of a local knowledge workflow:

- `README.md` explains the human story and workflow
- `SKILL.md` explains the Codex invocation contract
- `scripts/personal_knowledge_capture.py` implements deterministic local state and scanning
- `references/supported-file-types.md` documents extraction boundaries

## Professional AI Agent Course: Understand

### What you will learn

Extract and deduplicate selected sources into a cited note, flag contradictions and track changes. Never relocate source files.

### Prerequisites

Use Python 3.10+, a fork/clone opened in Codex, and the [shared course setup](/lib/08-agents/agent-systems-handbook/skills-course-support). Run from the repository root. Seed the synthetic Lesson 2 files once; choose a fresh output directory if they already exist. PDF extraction optionally requires `pypdf`; TXT/Markdown/DOCX need no extra package.

### 5-minute quick start

```bash
python3 skills/personal-knowledge-capture/scripts/course_knowledge.py synthesize --folder .local-state/course-demo/lesson-2/research --note-id weekly-note
python3 skills/personal-knowledge-capture/scripts/course_knowledge.py show --note-id weekly-note
```

Sample prompt:

```text
Use $personal-knowledge-capture on the course research folder; deduplicate repeated sources, surface the conflicting capacity claims and create a cited weekly note without changing originals.
```

### Expected result

Three sources produce two unique texts, one duplicate and a capacity conflict (20 versus 24), with source ids/hashes and actionable notes. Repeating the run marks unchanged sources and increments the same note revision. These are examples, not recorded production results.

### 20–30 minute classroom exercise

Ask Codex to inspect the source-grounded extractive draft and distinguish the two capacity claims. Explain which source is authoritative without guessing. Edit only a synthetic source, rerun and compare the note revision, changed-source metadata and citations. Source file hashes must remain unchanged by the helper. Resolve `workflow.py` / `course_organizer.py` command shorthand to this package's `scripts/` directory.

### What to modify

Change a synthetic capacity or action line; add a semantically conflicting sentence without a field label. Observe that deterministic field checks have limits and use Codex to cite the semantic conflict. Edit the canonical package, rerun course setup, and commit only source changes to your fork.

### How to verify persistence

All course commands accept the shared storage flags before the subcommand. Start locally, then use `--storage prompthon` only after the Web App owner provisions the contract and scoped course access.

```bash
python3 skills/course-support/scripts/course_store.py runs --skill personal-knowledge-capture
