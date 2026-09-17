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
pageSha256: "e698b3a63c0d13325dcd33e689d255ab49fa5efcdc6d5f53cc9fa2a90c1cbfae"
contentMode: "local-full"
zh: ""
---

### Improve Codebase Architecture Skill

And so you might ask, how do I take a codebase that looks like this and then turn it into a codebase that looks like this? How do I deepen the modules? Well, we have hopefully it's in here. Pretty sure it is. We have a skill and that skill is called improve codebase architecture. Nice and direct. Uh let's run it. What this skill is going to do is it's essentially just going to do a scan of our codebase and looking for what's available here. And feel free to run this yourself if you're um uh running the exercises. And it's exploring the architecture, exploring um essentially how to work within this codebase. and it's going to attempt to uh find places to deepen the modules. Pretty simple.

One really cool um thing that it found here is part of my uh part of my course video manager app is a video editor. A video editor built in the browser, which is really hardcore. Uh it's a decent bit of engineering. And I wanted a way that I could wrap the entire front end all the way to the back end in like a single big module so that I could test the fact that I press something on the front end and it goes all the way to the back end. And so I found a way essentially by using a kind of discriminated union between the two types here by sort of I was able to use this uh skill to essentially have a huge great big module that just tested from the outside or was testable from the outside this video editor infrastructure. And it meant that AI could see the entire flow, could act on the entire flow and test on the entire flow. And honestly, it was just night and day in terms of the uh ability of AI to actually make changes because AI working on a video editor is pretty brutal if you don't give it good tests. So that is honestly I if you take one thing away from today, just try running this skill on your repo and see what happens.
