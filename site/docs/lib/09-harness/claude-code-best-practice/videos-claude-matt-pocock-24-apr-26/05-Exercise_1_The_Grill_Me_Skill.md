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
pageSha256: "10aaa4c586c353fc0350445ab79c180ce00f1ebba8da5048cea6198a93a3ede6"
contentMode: "local-full"
zh: ""
---

### Exercise 1: The Grill Me Skill

So let's take a look at the first exercise. And I'm while I'm doing this, the way I want this to work is I'm going to sort of show you how um I'm going to be sort of walking through it up here. And I want you folks to be kind of like tapping away and doing things as well. So that was just a little lecture bit. Let's now actually get and do some coding.

For anyone who arrived late or anyone in the Gilgood room, uh go to this link, this link up here to see the exercises and clone the repo. You absolutely do not have to. You can just watch me do it if you fancy it. But let's go there myself and let's see what exercises await us. So essentially, I've built a um this is from my course. This is a uh a course management platform essentially a kind of CMS for instructors for students and this is what we're going to be building a feature in. So I'm going to take you from essentially the idea for the feature all the way up to building a PRD for the feature all the way up to implementing the feature and hopefully you can take inspiration from this process and use it in your own work.

So uh let's kick off. We're going to start by using a skill which is very close to my heart. It's the grill me skill. And this grill me skill is wonderfully small, wonderfully tiny. And it helps prevent one of I think the main issues when you're working with an AI, which is misalignment.

The uh the sort of silent idea that I'm talking against here, that I'm arguing against is the specs to code movement. Has anyone heard of the specs to code movement? Raise your hand. It's not really a movement. I suppose it's just sort of people saying specs to code. Um, what it is is people say, okay, you can write a program or you want to build an app. The best way to build that app is to take some specifications. So to write some sort of like document and then turn that document into code. So just turn it into code. How do you do that? You pass it to AI. if there's something wrong with the resulting code. You don't look at the code, you look back at the specs, you change the specs and you sort of just keep going like this. This is kind of like vibe coding by another name where you're essentially ignoring the code. You don't need to worry about the code. You just sort of keep editing the specs and eventually you just keep going. And I tried this. I really tried it and it sucks. It doesn't work because you need to keep a handle on the code. You need to understand what's in it. You need to shape it because the code is your battleground.
