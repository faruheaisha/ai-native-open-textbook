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
pageSha256: "50bee240f4e5bb6b4ad17d98a1d9cd827c2dcd18addbe4e1ffe9fd76cf6c9fab"
contentMode: "local-full"
zh: ""
---

### TDD: Red, Green, Refactor

So hopefully we have started to get some stuff cooking. It's just pinging on the explore phase here. Tempted to just start running it AFK. Maybe I will, maybe I won't. Um, what it's essentially doing is it's exploring the repo. It's going to then start implementing based on what we wanted.

Let's actually have one more question just while it's running. Yeah. So the question was why do you not get AI to QA? AI to QA. I just got jargon overload for a second. Um why do you not get AI to uh test its own code? Now of course you absolutely can. And I think while it's doing while it's cooking here, okay, it's got a clear picture of the codebase. It's assessing the issues. It's doing issue O2 is the next task. I'm again going to show you that in a bit. I think the sort of uh because you definitely should do an automated review step as part of implementation. So you have your implementation. You should then because tokens are pretty cheap and AI is actually really good at reviewing stuff. You should get it to review its own code before you then QA it. I found that that catches a ton of different bugs.

And the way that works is I will just do a little diagram is if you have let's say an implementation that's sort of like used up a bunch of tokens in the smart zone. If you get it to sort of try to do its reviewing, it's going to be doing the reviewing in the dumb zone. And so the reviewer will be dumber than the thing that actually implemented it. If we imagine this is the uh let's be consistent, that's the review. That's the implementation. Whereas, if you clear the context, then you're essentially going to be able to just review in the smart zone, which is where you want to be.

Let's see how our implementation is doing. Okay, good. It's generating a migration. That looks pretty nice. We're getting some code spitting out. And while I'm sort of like, aha, here we go. TDD. Let's talk about TDD and then I think we'll have a little another little break.

TDD I found is absolutely essential for getting the most out of agents. Uh raise your hand if uh you know what TDD is. Cool. Okay. TDD is testdriven development. What it's essentially doing is it's doing a something called red green refactor. And if you look in the codebase, you'll be able to find a um a skill which really describes how to do red green refactor. and teaches the AI how to do it. So what it's doing is it's writing a failing test first. So it's saying, okay, I've broken down the idea of what I'm doing and I'm just going to write a single test that fails and then I need to make the implementation pass.

I have found that first of all, this adds tests to the codebase and this this tends to add good tests to the codebase. And so we've got this kind of gamification service. It looks like it's using some existing stuff to create a test database. Test fails because the module doesn't exist yet. Okay, we've confirmed red. And then it goes and hopefully runs it and it passes.

I found that uh raise your hand if you've ever had AI write bad tests. Yeah, it tends to try to cheat at the tests because it's sort of doing it in layers. it will do the entire implementation and then it will do the entire test layer just below it. Uh I'm just going to say yes, you're allowed to use npxv text. And using this technique, it generally is a lot harder to cheat because it's sort of instrumenting the code before it's then writing the code. So I find that TDD is so so good for places where you can pull it off. And in fact, it's so good that I sort of warp my whole uh technique around getting TDD to work better.

I can see some drooping eyes. It is so hot in here. You can imagine how hot it is up here. Let's take another five minute comfort break. Let's come back at quarter two. I think have a nice generous one. And we'll be back in about six, seven minutes and I'll talk about how uh I think about modules, think about constructing a codebase to make this possible.
