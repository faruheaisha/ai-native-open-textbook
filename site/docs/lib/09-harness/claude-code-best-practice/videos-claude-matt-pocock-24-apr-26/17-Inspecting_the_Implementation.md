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
pageSha256: "d5faf012c48f1dafc2484e532841889947654448d884104e1e3b5adc5d897005"
contentMode: "local-full"
zh: ""
---

### Inspecting the Implementation

I've just been sort of fiddling with the AI here and we have end up with some with a commit. So we have something to test. Issue number two is complete. Here's what was done. This is kind of what it looks like when a Ralph loop completes is you end up with a little summary. Um and we have now something we can QA because we did the feedback loops or because we did the tracer bullets because we were uh said okay give us something reviewable at the end of this we can immediately go and QA it.

Now, there's nothing uh less exciting than watching someone else QA something, but hopefully we can have a little play. Let's just check that it uh works at all. In fact, before I go there, I just want to sort of work through what just happened, which is we see that it's created some stuff on the dashboard and it then ran the feedback loops. So, it then ran the tests and the types.

Now TDD is obviously really important and it's really important because these feedback loops are essential to AI essential to get AI to produce anything reasonable because without this AI is totally coding blind right you have to have to um if if your codebase doesn't have feedback loops you're never ever ever going to get decent AI decent output out of AI and often what you'll find is that the quality of your feedback back loops influences how good your AI can code. Essentially, that is the ceiling. So, if you're getting bad outputs from your AI, you often need to increase the quality of your feedback loops. We'll talk about how to do that in a minute.

Now, so it ran uh npm run test, npm ran type check. It got one type error and it needed to fix it with a nice bit of TypeScript magic. Very good. Yeah. Typo level thresholds number. Okay. You see why I stopped teaching Typescript because just AI knows everything now. Um, so and it ran the tests and it passed and it's looking good. So we now end up with 284 tests in this repo. Pretty good. I I do find uh front end really hard to test here. We're essentially just testing the service. So we've created a gamification service if we look up here and then we have a test for that service. You can see the the service and the test itself.

Now, if I was doing code review here, I would then go to re I would first go to review the tests, make sure the tests were testing reasonable things and then go and kind of review the code itself just to make sure that it's it's not doing anything too crazy, right? The essential thing is I need to actually um look at the dashboard. I'm going to log in as a student. Oh, if it'll let me. Maybe it won't let me. Come on, son. There we go. Let's log in as Emma Wilson. Head into courses. Uh, let's say I've got an introduction to TypeScript. Continue learning. Uh, yes, I completed this lesson. Something went wrong. I imagine it's because I don't have uh SQLite error. I don't have the right table. So, I need a table point events. Point events is a strange table name. I'm not sure quite what it was thinking there. Uh, let's suspend. Let's run uh npmdb migrate or push, I think. Can't remember which one it was, but you kind of get the idea, right? I I'm not going to subject you to uh watching me do QA because it's so dull.

Um but at this point, I would essentially go back in. I would um let me open the project back up. Uh, and I would this this is a crucial moment. Um, and it's so important to um QA it manually here because QA Oh dear. Oh dear. What's going wrong? There we go. QA is how I then um impose my uh opinions back onto the codebase, how I impose my taste. What you'll often find is that um there are teams out there who are trying to automate everything like every part of this process and they will tend to uh if you try to like automate the sort of creation of the idea, automate uh the QA, automate the research, automate the prototype, you end up with uh apps that I feel just lack taste and are bad. maybe they just don't work or they they don't even work as intended or there's just no AI. You need a human touch when you're building this stuff because without that you just end up with slop and we are not producing slop here. We're trying to produce high quality stuff and so that's what the QA is for.
