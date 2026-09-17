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
pageSha256: "068c1fda333f058b7be812969f70ee22c11b0212f1c03d640571c97a5045f718"
contentMode: "local-full"
zh: ""
---

### Exercise 2: Write a PRD

So this is um the next exercise where we're going to uh we're going to write a product requirements document. And the product requirements document or the PRD is essentially that's its function. It's the destination document. And it sort of doesn't matter what shape it is. I've got a shape that I prefer and that I quite like, but you can just choose your own shape or whatever your company uses. And all we're really doing is too worried about that. All we're really doing is summarizing the design concept that we have so far.

So I'm going to initiate this. I'm going to say zoom all the way to the bottom. All I'm going to do is just say write a PRD. And we can take a look at that skill now. Write a PRD. So this skill, it does a few things. It first asks the user for a long detailed description of the problem. You can use write a PRD without grilling first, but I just like to grill first and then write the PRD afterwards. Then you can um get it to explore the repo, which we've kind of already done. Then we get it to interview the user relentlessly. So have a kind of grilling session again. And then we start um putting together a PRD template.

So this is available in the repo if you want to check it out. And essentially this is what it looks like. We've got some problem statements, the problem the user is facing, the solution to the problem, and a set of user stories. And these user stories sort of define what this is. You know, as you you guys have probably seen things like this if you've been a developer at all. um you know there are cucumber is a language you can use to write these in or we just sort of um uh write them ourselves essentially. Then we have a list of implementation decisions that were made and a list of crucially testing decisions too.

So I'm going to run this. Okay. And so it's finished its thing. Ah Windows let me close the thing. Thank you. I don't know why I bought a Windows laptop. I think I just I like the challenge. Um so the first thing that it's going to give me are a set of proposed modules it wants to modify. Now there's a deep reason why I'm thinking about this. So this is at this stage we have an idea. We have sort of speced out the idea. We've reached a sort of understanding of what we're trying to do. And then we need to start thinking about the code because at this point we need to this is not specs to code. This is not where we're ignoring the code. We actually keep the code in mind throughout the whole process. And the way I like to do this is I like to just sort of think about a set of proposed modules to modify. We're going to return to this this idea of continually designing your system and keeping your system in mind.

So it's it's saying recommend test for the gamification service is the only deep module with meaningful logic. These modules look right. Yeah, that's good. And it's going to ping out a PRD. Now for ease of setup, I've got it so that it creates a set of issues locally. So it's just going to create essentially a PD inside this issues directory. But the way I usually do it, and you can check this out yourself, is you can go to my um essentially what I consider my work repo, which is github.com/mattpocco/course video manager up here. And in here, this is essentially a app that I create um that I use all the time to record my videos and things like this. I think I've recorded like I pulled down the sets. I think I've recorded like a thousand videos in here or something nuts. Um, and you can see here that it's got 744 closed issues. And this is essentially all of the uh PRDs and all of the implementation issues that I've put into here. So, this is how I usually like to do it.

So, that's what I'm doing with the There we go. Yeah, I'm just going to say yes and uh and get that issue out. Let's see. It is inside here. So, we got the problem statement. people sign up for courses, uh the solution, the user stories, uh 18 user stories, looks nice, some implementation decisions, level thresholds, etc. This is enough information. We've kind of clarified where we're going and what we're doing. So that's what we do. We essentially have a grilling session and we've created an asset out of it.

Now, raise your hand. Should I be reviewing this document? Raise your hand if you think I should be reviewing the document. Yeah, I don't I don't look at these. I don't look at these. The reason I don't look at these is because what am I testing at this point? What am I like when I read it? What am I testing? What am I what are the failure modes I'm trying to test for? I know that LLMs are great at summarization because they are they're really good at summarization. I have reached the same wavelength as the LLM, right? Using the grill meme skill, we have a shared design concept. So if I have a shared design concept, all I'm doing is I'm just essentially checking the LLM's ability to summarize. So I don't tend to read these.
