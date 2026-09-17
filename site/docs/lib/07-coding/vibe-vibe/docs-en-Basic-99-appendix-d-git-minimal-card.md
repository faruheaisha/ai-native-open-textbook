---
title: "D. Git Minimal Action Card"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/en/Basic/99-appendix/d-git-minimal-card.md"
sourceRel: "docs/en/Basic/99-appendix/d-git-minimal-card.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/en/Basic/99-appendix/d-git-minimal-card.md"
sourceSha256: "c850ea34c5010e02ba46a919dc1ff1bd5b9dae5a55d578fe8f5aaa134ea769e3"
pageSha256: "c850ea34c5010e02ba46a919dc1ff1bd5b9dae5a55d578fe8f5aaa134ea769e3"
contentMode: "local-full"
zh: ""
---

# D. Git Minimal Action Card

In the basic version, Git does not handle a full collaboration workflow. It mainly does three things: save snapshots, view history, and roll back. Think of it as the project's “undo button,” and that's enough.

## 1. Save a snapshot: mark the current stable version

Suitable scenario: before making major changes.

You can directly ask the AI like this:

```text
I'm about to start a fairly major round of changes.
Please first help me create a minimal snapshot of the current project as a version I can roll back to.
Only tell me the steps I need for this time, and don't go into Git theory.
```

## 2. View history: check which versions have been saved before

Suitable scenario: you've already made several rounds of changes and want to know what you can still roll back to.

You can ask like this:

```text
Please help me check what snapshot records currently exist for this project.
I want to know what the most recent rollback points are.
```

## 3. Roll back: if a round of changes broke things, return to a stable version first

Suitable scenario: the layout is broken, the content has become messy, or the page has clearly regressed.

You can say this:

```text
The results of this round of changes are not good.
Please help me return to the previous stable version, and tell me which snapshot point this rollback returned to.
```

## A minimal mental model

| Action | What you should think of it as right now |
|------|--------------------|
| Save once | Mark the current version with a point you can “come back to” |
| View history | See which points you've saved before |
| Roll back | Return to the most recent stable state when something goes wrong |

## The single most important reminder in the basic version

Don't wait until the project is already broken before thinking of Git for the first time. A safer order is: **save once first, then make bold changes.**

If you want to systematically understand branches, PRs, and collaborative workflows later, you can go directly to the advanced version's [Chapter 11: Collaborative Development](https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/Advanced/11-git-collaboration/README.md).
