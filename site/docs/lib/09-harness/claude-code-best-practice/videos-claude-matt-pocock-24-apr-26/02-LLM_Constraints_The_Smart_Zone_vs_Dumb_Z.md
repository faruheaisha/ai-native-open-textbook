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
pageSha256: "eb8100f55129e817094f43878388e141b2397d4962b7ea170ecf2c91b9e302ed"
contentMode: "local-full"
zh: ""
---

### LLM Constraints: The Smart Zone vs Dumb Zone

So I want to talk about first the kind of weird constraints that LLMs have and those weird constraints are sort of what we have to base a lot of our work around. Now, there's a guy called Dex Hy who runs a company called Human Layer, and he came up with this idea, which is that when you're working with LLMs, they have a smart zone and a dumb zone. When you're first kind of like working with an LM and it's like you just started a new conversation, you start from nothing. That's when the LLM is going to do its best work because in that situation, the attention relationships are the least strained.

Every time you add a token to an LLM, it's kind of like you're adding a team to a football league. You think of the number of matches that get added every time you add a team to a football league. It just go scales quadratically. And that's because you have attention relationships going from essentially each token to the other that are positional and the sort of meaning of the individual token. And so this means that by around sort of 40% or around I would say around 100k is kind of my new marker for this because it doesn't matter whether you're using 1 million uh context window or 200k. It's always going to be about this. It starts to just get dumber. So as you continually keep adding stuff to the same context window, it just gets dumber and dumber until it's making kind of stupid decisions. Raise your hand if that feels familiar to you. Yeah. Cool.

So this means that we kind of want to size our tasks in a way that sticks within the smart zone, right? We don't want the AI to bite off more than it can chew. And this goes back to old advice like Martin Fowler in refactoring uh like uh the pragmatic programmer talks about this. Don't bite off more than you can chew. Keep your tasks small so that you as a developer, a human developer don't freak out and don't start acting and going into the dumb zone.
