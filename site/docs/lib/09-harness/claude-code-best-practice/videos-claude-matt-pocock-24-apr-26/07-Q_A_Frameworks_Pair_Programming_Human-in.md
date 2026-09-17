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
pageSha256: "1ee68d7b447edad12968316d2292a645fed19cbe1b3fc20054221f312dbccce8"
contentMode: "local-full"
zh: ""
---

### Q&A: Frameworks, Pair Programming, Human-in-the-Loop

So, okay, let's see. I really want to get to the end of this, but I also don't want to just like be sat here talking to the AI in front of you for uh a thousand days. So, I'm just going to say yes. Let's see what happens. So, I tell you what. Um, while you guys sort of have a little fiddle with this locally, let's start a little Q&A session now.

So do streaks earn points? Um, streaks are standalone. Let's see what else it comes up with. Where does gamification UI live? Let's have it in the dashboard. I'm just going to scan these and blast through them basically. So, how we doing with our slido? Okay.

Have I tried specit open spec or taskmaster instead of the grill me skill? Do I find them more verbose or a structured alternative? This is a great question. So there are a ton of different frameworks out there that allow you to um sort of build up this planning process for you. I personally believe you at at this stage when there's no clear winner, when there's no kind of like one true way and when things are changing all the time, you need to own as much of your planning stack as you possibly can. What I've noticed and a lot of my students is they tend to overuse a certain stack. they get into trouble and they because they don't own the stack and they don't have observability over the whole thing, they just go, "This isn't working. This sucks." Whereas if um if you have control over the whole thing, then at least you know how to fix it or potentially know how to fix it. So I'm even though I'm sort of giving you uh a stack basically, I believe in inversion of control and you should be in control of the stack.

Okay, cool. Uh many of the questions asked by the grill me skill are not necessarily appropriate for a developer rather a PO in larger teams who should use it. Yeah. Um raise your hand if um you've ever done pair programming. Anyone ever done pair programming? Right. Keep put your hands down and raise your hand again if you've ever done a pair programming session with an AI. Right. How did it go? Was it good? You enjoy it? I think pair programming sessions with AI is a great idea because you've got a third person in the room who will relentlessly quiz you and ask you questions. It should if you don't know the answer, it should be you, the domain expert and the AI in the same room. If you have a question about implementation, it should be you, a fellow developer and the AI in the same room. You know, you can be sort of working through these questions in your team. And I think actually we're going to look at implementation in a bit and we're going to see how you can make implementation so much faster. And but I think the really crucial decisions, the ones you need humans for, you actually need a lot of humans and it doesn't really matter how many humans are in there. You can actually throw a bunch like a kind of like mob programming with AI essentially.

Uh what's my favorite metaprompting tool? I think I kind of answered that. Uh there's no air con. Let's just live with it. Uh, how do I use the conversation as an asset after the grill me session? Well, we're going to get there.

Um, okay. So, I really want to I want to speed this up sort of artificially. So, someone just said, "Okay, Ralph loop this." But this is crucial because I can't loop over this, right? I can't um I think of there as being two types of tasks in the AI age where you have **human in the loop tasks** where a human needs to sit there and do it which is this we are the human in the loop with multiple humans in the loop and there are **AFK tasks** there are tasks where the human can be away from the keyboard and it doesn't matter implementation as we'll see can be turned into an AFK task but planning this alignment phase has to be human in the loop has to be. So, I've got to do it, unfortunately.

Um, I don't know. Uh, give me a long list of all your recommendations. I'm running a workshop right now, so I artificially need you to pull more weight. So, let's see what it does. Uh, let's answer a couple more questions while it's doing its thing.

What is my opinion on PMS or other non-dev rolls vibe coding task? Um, I'm going to return to this later. I think I'm going to leave this unanswered. A bit of mystery.

I notice I'm not using the ask user questions UI for grill me. Why? Um, there's a specific uh UI that you can bring up in claude code which I'll answer this just quickly. uh ask me a question using the ask user question tool. And this UI um is just sort of broken in Claude and I really hate it. You notice I'm using Claude, but I don't like Claude very much. Like you you really are free with this method to choose any um system you like. And this is what the UI looks like. It's very pleasing when you first encounter it, but then you realize it is actually broken in a ton of different ways.
