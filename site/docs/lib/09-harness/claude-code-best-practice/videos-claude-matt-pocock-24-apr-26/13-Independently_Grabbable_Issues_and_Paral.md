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
pageSha256: "381ecaf1317ce66715d3f6eb634c20ecc860a81e25e93194bd0f6e10ec030bf5"
contentMode: "local-full"
zh: ""
---

### Independently Grabbable Issues and Parallelization

Uh, okay. So, we should uh after a couple of approvals uh end up with a set of issues. Now, these issues that we're creating, they're designed to be independently grabbable, which means that this canon board ends up looking kind of like this where you have essentially a set of tickets with a whole load of independent relationships. So, this one needs to be done before this one. This one needs to be done before this one. And this one, let's say we got another one over here. This one needs to be done before this one. This means that you can start to parallelize. You can start to get agents working at the same time on these tasks because yeah, this one needs to be done first and then these two can be grabbed at the same time by independent agents.

Raise your hand if you've done any kind of parallelization work with agents. Okay, cool. So this allows you um to turn those plans into optimally kind of like into directed asyclic graphs essentially where you just are able to um essentially have three phases here where you have phase one. Let me grab move that uh above this line here you do this one. Then phase two you do the two below it. And then phase three you do this third one. and add it onto there. And when you think about there could be this could this is a relatively simple plan but you could have many different plans operating all at once. It means that you can do really nice parallelization and we'll talk more about that in a bit.

But that's why I prefer a canon board set up like this to a sequential plan because a sequential plan can really only be picked up by one agent. So this where did it go? Over here. Yeah, this plan here, this is really only one loop, right? Only one agent can work on these because we have numbered phases and they're not parallelizable. Does that make sense? Cool.

So, we've got our issues. Ah, come on. Stop asking me for Oh, no. It's creating them on GitHub. I really don't want that. Oh, no. You fool. Create them in issues instead. No, that's not precise enough. Uh, you fool. Create them in local markdown files instead referencing the local version. Sorry about this. So, once we get to this point, we have a bunch of issues locally that we can start um looping over and implementing. And it's at this point that the human leaves the loop.

So, so far, let me pull up a a proper overview of this kind of flow that we're exploring here. So far, we have taken an idea, zoom this in a bit for the folks at the back, and we've grilled ourselves about the idea. We can skip over research and prototype, but we've turned that into a PRD into a destination document. We've then turned that PRD into a canon board and all of those steps are human reviewed. And now the implementation stage, we step back and we let an agent um work through that camp board or multiple agents work through the camp board. Now, what this means is that yeah, we've spent a lot of time planning here, but it means that we've queued up a lot of work for the agent. We can think of this as kind of like the day shift and the night shift. This is the day shift for the human, right? Planning everything, getting all the uh all the stuff ready and then once we kick it over to the night shift, the AI can just work AFK.
