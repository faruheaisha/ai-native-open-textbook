---
title: "Claude Code Best Practice"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/videos/claude-matt-pocock-24-apr-26.md"
sourceRel: "videos/claude-matt-pocock-24-apr-26.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/videos/claude-matt-pocock-24-apr-26.md"
sourceSha256: "87d58effa16d07454b30f5a302a1f775665e6a4f4624e510fb1908118fe8bd94"
pageSha256: "b738943c11587d2ee06c93b67a43d5f50057b806c317e420848dfa78d2a7363e"
contentMode: "local-full"
zh: ""
---

### Improve Codebase Architecture Results

Then any question? Actually, let let me uh before we do more questions, let's go back here. Okay, where are we at? Okay, we're sort of zooming everywhere in this uh talk because I'm kind of having to run things in parallel. So, let's go back to the improved codebase architecture.

It has finally finished running and it's found a bunch of architectural improvement candidates. So it's got essentially a cluster of different modules that are all kind of related that could probably be tested as a unit. Got number one the quiz scoring service. There's some reordering logic extraction as well. It has arguments for why they're coupled and it has a dependency category as well. So local substitutable in SQLite within memory test DB quiz scoring service currently has zero test. This is the biggest gap. So this is what it looks like when we come back of uh improved codebase architecture.
