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
pageSha256: "b029575d771387da04e0c8d74f99ad88d172c7d7b50c740e47a3ab5ceb97c509"
contentMode: "local-full"
zh: ""
---

### Q&A: Negative Decisions, Code Review Volume, Front-End Workflow

And while it's doing its thing, you probably have some questions about this setup and about the decisions that I've made to essentially delegate all of my coding to AI, right? So, let's let's do a quick Q&A while it's uh getting its feet under.

Uh, okay. I'm going to just remove those. How do you retain negative decisions? things that you decided against and ration when persisting the results from the Grommy session. A great question. That's a very simple answer which is the in the PRD uh write a PRD section there is a stuff at the bottom a section of the things that are out of scope. So the things we're not going to tackle in this PRD which is very important for giving a definition of done.

Feel free to ping on the slido if you've got any more questions. Uh what's my front end workflow? Okay, that's a great question. I'm gonna I'm gonna answer that in a minute, I think.

How to deal with agents producing more code that we can review? How to properly parallelize and use multiple agents in a separate way? Okay, that's um there's two questions there. Um raise your hand if you feel like you're doing more code review now than you used to. Yeah, definitely. Um I don't think there's a way to avoid this. If we delegate all of our coding to agents, you notice that the implementation here is really the only AFK bit. We then also need to QA the work and code review the work, right? And if we are running these loops where it's essentially going to implement four issues in one, it's hard to pair that with the dictim that you should keep pull requests small and self-contained, right? like small self-contained pull requests means you're needing to do fewer loops or shorter loops or something. Or maybe you do like a big stack of PRs, but that seems horrible as well. That's still just more separated code to review. I don't honestly know what the answer to this yet. I think we just need to be ready to be doing more code review essentially, which is not fun. That's not a fun thing to say. That's not like I don't know. I don't feel good saying that, but I do think it's probably the the way things are going. It's a great question.

Uh, can we grab a couple of questions from the room as well? Let's not we won't do the mic, but uh raise your hand if you've got a question for me immediately. Yeah.

*(audience: "So the approach looks very linear from an idea to QA. Of course, the real world is a lot more messy. So you have all these ideas that are in parallel and full picture and while you're working on something else comes in. How do you deal with the messiness? How do you feedback?")*

Great question. So the question was if this all looks great if you're a solo developer, but actually how do you implement this in a team? How do you gather team feedback on this? And my answer to that is that if you have an idea up there and essentially the sort of journey from the idea to the destination is something you need to figure out with the team, right? So all of this stuff up here, this is kind of like team stuff, you know what I mean? So if you have an idea and you do a grilling session on it and you have a question that you don't know how to answer, then you need to loop in your team as we described before. Then you might need to go, okay, we just need to build a prototype of this. We need to actually hash this out. We need something that the domain experts can fiddle with. Oh, okay. We might need to integrate a a third party library into this. We might need to do some research. We might need to actually kind of like um ping this back and forth and find a third party service that we can get the most out of. We might need to go back with the information that we gathered there to the idea phase. So all the way up to the sort of PRD and the journey, that's something you need to involve your team with. That's something where these assets are going to be shared and argued over and you're going to have requests for comment on them and that that loop is going to just keep grinding and grinding until you figure out where you're going. Once you figure out where you're going, then you can start doing the came on board the implementation. But this is essentially super arguable and the you'll be bouncing back and forth between the phases. Does that make sense?

*(audience: "Would you not need a PR for your prototype?")*

Say it again. Sorry. *(audience: "Would you not want to have a PR for your prototype?")*

The question was, do you want to go through this whole session just to sort of create a prototype? Do you not need a PRD for your prototype as well? Let's just quickly talk about prototypes for a second. Um, there was a question about how do you make this work for front end? Like how do you because front end is like really sensitive to human eyes. You need human eyes looking at the front end all the time to make sure that it looks good. AI doesn't really have any eyes. It can look at code, but it front end is multimodal. And so my experiences with trying to plug AI into um let's say agent browser or playright MCP to give it you can give it tools to allow it to look through a front end and sort of look at images but in my experience the um it's not very good at that yet and it can't create a nice front end in a mature codebase. It can sort of spit one out. But what it can do is you say okay uh I want some ideas on how uh this front end might look. give me three prototypes um that I can click between in a throwaway uh throwaway route that I can decide which one looks best and you take the asset of that prototype and you then feed it back into the grilling session or you get feedback on it blah blah blah blah blah answer your question kind of thing the prototype is just you know it's messy it's supposed to give you feedback early on in the process so that's a great way of working with front end code great way of looking at software architecture in general.

Let's go one more question. yeah

*(audience: "In your system how do you integrate respecting an architecture a design with API contracts and fitting with a larger system security constraints? All kinds of constraints like that.")*

Yeah, there's a lot in that question. The question was how do you conform with existing architecture? How do you do um how do you make it conform to the code standards like of your codebase or *(audience: "Yeah. architecture design API security rules that constraints your designs.")* Yeah. I'm going to answer that in a bit if that's okay.
