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
pageSha256: "b1aa852b1f70505a0bb9f590ba23f708c07beede9e23cffd05e82d9b63b6c563"
contentMode: "local-full"
zh: ""
---

### Exercise 4: Running the AFK Agent (Ralph Loop)

But what does that look like? Well, so I'm just going to Oh, yeah. Just allow it. It's perfect. So this looks like if we head to the next exercise which is uh in fact the last exercise here running your AFK agent. Now I've called this uh Ralph really because it is a it is essentially a Ralph loop and this prompt here I want to walk through this really closely.

The first thing it's doing here is we're essentially going to run Claude and we're going to basically try to encourage it to work um completely AFK. I'll show you what the sort of script for this looks like in a minute, but you say, okay, local issue files from issues are provided at the start of context. The way we do that is if you look inside once.sh SH here inside the repo we have uh it's essentially just a bash script where we grab all of the issues um which are inside markdown files and we cap them into a local variable. So that issues variable contains all of the issues that are in our entire backlog. Then we grab the last five commits. I'll explain why in a minute. And then we grab the prompt and we just run claude code with permission mode except edits and then just essentially just pass it all of the information. This is what the implement looks like.

So that's what a very very simple version of this sort of loop looks like. And of course this is not a loop. This is just running it once. The loop is in the AFK version up here which is uh a fair bit more complicated. And the crucial part here is we're running it in Docker sandbox as well. So I I don't want you to install Docker on your laptops because we're just going to be like you need to download a special image and we're going to tank the conference Wi-Fi if we do that. So I I am going to demo this to you, but you um won't need to run this yourself. But I'll talk through this in a minute. But essentially this once loop here, we're just essentially running one version of the thing that we're going to loop again and again and again. So this is kind of like the human in the loop version. And this is essential. Running this again and again is essential because you're going to see what the agent does and see how it ends up working. And any tuning that you need to add to the prompt, then you can do that.

Let's go to the prompt. Um, so local issue files are being passed in. You're going to work on the AFK issues only. That makes sense. If all AFK tasks are complete, output this no more tasks thing. And then the next thing, pick the next task. So what we're doing here is we're essentially running a backlog or curating a backlog that our AFK agent is going to pick up. That's the purpose of all of these um setups in the beginning in this uh all the way to this canon board here. We're just essentially creating a backlog of tasks for the night shift to pick up and the night shift this sort of Ralph prompt here. It's got its own idea about what a good task looks like. So next pick up I'm I did talk about parallelization. I will show you this later, but this is essentially a sequential loop here. we're just going to run one coding agent at a time. This is a good way to just sort of um get your feet wet essentially. So, it's prioritizing critical bug fixes, development infrastructure, then traceable bullets, then polishing quick wins and refactors. And then we just have a very simple kind of instruction on how to complete the task. So, we explore the repo, use TDD to complete the task. I'll get to that later. And we then run some feedback loops.

So let's let's just try this and let's just see what happens. So good. It's created the issue files. We should be good to go. I'm going to cancel out of this. I clear and I'm going to run uh where is it? Ralph once.sh. And you can feel free if you're following along to do the same thing. So we can see it's just running Claude inside here with the prompt and with all of the issues that have been passed in.
