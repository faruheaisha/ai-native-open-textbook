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
pageSha256: "053c563457742410021bfc371b00c54d2290d985c1a3f11f71d66ae0745081f9"
contentMode: "local-full"
zh: ""
---

### Q&A: Document Persistence, Beads Framework

Let's go to slider. Let's ask a uh check a couple of questions just while this is running. So let's see.

Have you tried claude's auto mode with claude enable auto mode? Uh that way you can avoid many of the obvious permission checks. We'll talk about permission checks in a second.

Do I keep the markdown plans and issues for later reference? Okay, this is a great question. So let's say that you uh have a great idea, you turn it into a PR raise and you then implement that PRD and the PRD is essentially done. Raise your hand if you keep that information in the repo. So you turn it into a markdown file. Raise your hand if you want to keep that around. Cool. Okay. And raise your hand if you if you don't want to keep it around. If you want to get rid of it as soon as possible. Yeah. This is I think an a question that doesn't have a clear answer. What I'm really scared of with any documentation decision is that let's say that we have a PRD for this gamification system. We keep it in the repo. We go on, go on, go on. Let's say a month later, we want some edits to the gamification system. And we go in with Claude and it finds this old PR and says, "Yes, I found the original documentation for the PRD system." Well, it turns out that the actual code has changed so much from the original PRD that it's almost unrecognizable. The names of things have changed. The um file structure has changed. Even the requirements may have changed. We might have actually tested it with users. This is dock rot where the documentation for something is rotting away in your repo and influencing claude badly or claude agents badly. So I tend to not keep it around. I tend to get rid of it. And for me because my setup uses GitHub issues, I just mark it as closed. It can fetch it if it wants to, but it's got a visual indicator that it's done. So I tend to prefer ditching these.

Thoughts on the beads framework from Steve? Uh I've not tested it, but it seems like sort of um another way to manage Canvan boards and issues. Seems uh very good, but I've not tried it.

Um uh let me just quickly check the uh setup here. Let's take a couple of questions from the room. Anybody got any questions at this point about anything that we've covered so far, especially this last bit? Yes.

*(audience question about migrations)* like code. How about migrations? Like with migration files, we can also squash them off like database migrations. Yeah, I don't know. I hope that answers your question. I'm so sorry. No, no, I think database migrations are a different thing because you have a sort of running record of exactly what changed and it's more deterministic and I think yeah, it's an interesting analogy. I'm not sure. Let's talk about it afterwards. That's a good way of saying I have no idea.

Sorry guys. Um I'm just trying to listen to this guy's question. Yeah.
