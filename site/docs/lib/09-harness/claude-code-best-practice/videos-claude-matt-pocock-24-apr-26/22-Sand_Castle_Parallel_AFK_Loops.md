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
pageSha256: "eeb9d99668fd6bd8d1f47211747f4fa4864aba6bbedee190a7530adc8aff57e9"
contentMode: "local-full"
zh: ""
---

### Sand Castle: Parallel AFK Loops

Actually, um yeah, let's do that now just while it's fresh in my mind. I recently um spent uh maybe a week or so uh building this thing called **Sand Castle**. And Sand Castle is a I was sort of unhappy with the options out there for um running agents AFK. And what this does is it's essentially a TypeScript library for running these loops. So you have uh a run function that creates a work tree um sandboxes it in a docker container and then allows you to run a prompt inside there. And in that work tree then it's just a git branch and you have that code and you can then merge it later.

If I open up um there are some really really nice ways of viewing this and it essentially allows you to run these kind of automated loops and allows you to parallelize across multiple different agents really simply. So I'll go into my sand castle file go into main.ts here and let's just walk through this. So this is kind of like I showed you um a sort of version of the Ralph loop earlier. This is where we take it from sequential into parallel.

We have here first of all a planner that takes in it's has a plan prompt here that looks at the backlog and chooses a certain number of issues to work on in parallel. Remember I showed you that canon board where it had all the blocking relationships. It works out all of the phases. So this one will say okay uh let's say we have uh you can ignore all this glue code here. This is essentially just a set of issues, GitHub issues with a title and with a a branch for you to work on. And then for each issue, we create a sandbox and then we run an implement in that sandbox passing in the issue number, issue title and the branch. This is like the loop that we ran just before.

Then if it created some commits, we then review those commits. This is essentially the loop. What do we do with those commits? We pass those into a merger agent which takes in a merge prompt, takes in the branches that were created, takes in the issues, and it just merges them in. If there are any issues with the merge, you know, with the types and tests and that kind of thing, it solves them.

And this has been my uh flow for quite a while now for working on most projects. It works super super well. And uh yeah, I recommend you check out sand castle if you want to sort of learn more. And to answer your question properly is that in the reviewer uh I would push the coding standards in the implement I would allow it to pull. And I'm actually using uh sonet for implementation and opus for um reviewing because I consider reviewing sort of I need I need the smarts.
