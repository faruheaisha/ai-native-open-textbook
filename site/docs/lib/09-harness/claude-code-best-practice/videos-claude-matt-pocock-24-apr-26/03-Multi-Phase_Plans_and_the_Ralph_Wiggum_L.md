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
pageSha256: "62b28615a3cc9b478c58ccae7fe2e1e406360343ee45c510ef4569909c5e6921"
contentMode: "local-full"
zh: ""
---

### Multi-Phase Plans and the Ralph Wiggum Loop

But how do you tackle big tasks? How do you take a large task like I don't know cloning a company or something or just doing something crazy? And how do you break it into small tasks so they all fit into the dumb zone? One way of course you could do is I mean kind of what the AI companies maybe want you to do or the natural way of doing it is just keep going and going and going. You end up in the dumb zone charging you tons of tokens per request. You then compact back down. We'll talk about compacting properly in a minute. And you keep going, keep going, keep going, compact back down, keep going, keep going, keep going. And I think that's doesn't really work very well because the more sediment, we'll talk about that in a minute.

So the theory here is then, and this is what I was doing for a while, is I would use these kind of multi-phase plans where I would say, okay, we have this sort of number four thing here, this large large task. Let's break it down into small sections so that we can then kind of chunk it up and do each little bit of work in the smart zone. Raise your hand if you've ever used a multi-phase plan before. Yeah, really common practice, right? This is kind of how we've been doing it. Certainly, this is how I was doing it up until December last year really.

And any developer worth their salt will look at this and go, "This is a loop, right? This is a loop. We've just got phase one, phase two, phase three, phase four. Why don't we just have phase n, right? Phase n where we essentially just say, okay, we have, let's say, a plan operating in the background and then we just loop over the top of it and we go through until it's complete. And this is where um raise your hand if you've heard of Ralph Wiggum as a software practice. Okay, cool. Raise your hand if you've not heard of Ralph Wigum as a software practice. Actually, that's more like it. Okay. So there's this idea called Ralph Wigum uh which is kind of um sort of based on this which is essentially all you need to do is sort of specify the end of the journey where you just say okay we create a PRD a product requirements document to say okay let's describe where we're going and then we just say to the AI just make a small change make a small change that gets us closer and closer to there and Ralph works okay but I prefer a little bit more structure so that's kind where we got to in terms of thinking about the smart zone.
