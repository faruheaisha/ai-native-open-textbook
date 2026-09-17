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
pageSha256: "6427bad54e13476b5826e87ff2c0e608eb6a7461562049ff6cd1f243a7a00355"
contentMode: "local-full"
zh: ""
---

### Wrap-Up

Okay. So we have nominally kind of 17 minutes left. I don't know about you, but I'm knackered. Um I want to let let me kind of sum up for you because I think we're sort of reaching the end of our stamina. I'm going to be available for the full time if you want to um come and ask me questions. Um, I might do one more check of the slider, but let's kind of sum up where we've got to.

So, this is essentially the flow where throughout this whole process, we're bearing in mind the shape of our codebase. This is not a specttocode compiler. This is not an AI that's sort of just like churning out code. We are being very intentional with the kind of modules and the shape of the codebase that we want. We are making sure that we are as aligned as possible by using the grilling session by really hammering out our idea. We're not overindexing into the PRD. We're not trying to read every part of it. We're not thinking too much about it even. We're then just turning that into a set of parallelizable issues which can be worked on by agents in parallel. We implement it and we QA and code review the hell out of it and then keep going back to that implementation.

One thing I didn't really mention is that in the QA phase, what the QA phase is for is creating more issues for that canon board. So while it's implementing even, you can be QAing the stuff and going back adding more issues. And the canon board just allows you to add blocking issues kind of um sort of infinitely really. And then once that's all done, once you've got code that you're happy with, once you've got work that you're happy with, then you can share it with your team and you can get a full review. So this is kind of like once you get here, this is kind of one developer or maybe a couple of developers sort of managing this and then it's kind of up to you to figure out how to merge it back in.

Of course, all of this can be customized by you. This is just something that I have found works. I'm not trying to like sell you on a kind of approach here. What I recommend if you take one thing away from this session is that you should head back you should head to Amazon and just buy a ton of those old books because I mean I just found it so enlightening reading them. Uh you know preai writing is always like a really fun to read anyway and I just on every single page I found that there was something useful and something interesting to to read.

So thank you so much. Thank you for putting up with the heat. Um hopefully your body temperatures will reset soon. Uh thank you very much.
