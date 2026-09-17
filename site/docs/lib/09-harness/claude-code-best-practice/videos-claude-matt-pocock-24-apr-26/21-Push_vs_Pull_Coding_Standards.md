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
pageSha256: "eaeca9351fbc73ea1387e97d8092729e7999f53b0549acc58360e8793d753214"
contentMode: "local-full"
zh: ""
---

### Push vs Pull: Coding Standards

The question the question here is um should I um in the sort of early planning stage be trying to optimize the plan? This is something I actually see a lot of people doing and it's a really good um idea. So when you let's go back to the phases. So let's say that you have all of these phases here and you uh you get to the point where you've sort of figured out everything with the LLM. you understand where you're going. You've created this sort of journey destination document here. How do you then uh like should you then try to optimize and optimize and optimize that PRD until it's the perfect PR you can possibly imagine? I don't think there's a lot of value in that because I think the journey is really just sort of a hint of where you want to go and the place that you need to be putting the work is in QA and you can sort of do that AFK I suppose but in my experience you're not going to get a lot of juice out of it like it's the the thing that really matters is getting alignment with the AI which is you do in the grilling session initially.

Let's have one more question. You got any more? Yeah.

*(audience: "How do you get in your workflow to get it to code the way you want it to code? So by the time you get to code review, it's at least familiar, use the libraries you wanted to use.")*

Yeah. Um, we had this question before actually, which was like uh how do you uh enforce your coding standards on the agent? Essentially, how do you get it to code how you want it to code? Now, there's essentially two different ways of doing it. Um, you've got Come on. **Push** and you've got **pull**. What do I mean by push and pull? Um, push is where you push instructions to the LLM. So you say, okay, if you put something in claw.md, uh, talk like a pirate, that instruction is always going to be sent to the agent, right? So that is a push action. You're pushing tokens to it. Pull is where you give the agent an opportunity to pull more information. And that's for instance like skills. So a skill is something that can sit in the repo and it has a little description header that says okay agent you may pull this when you want to.

My thinking my current thinking about code review and about coding standards looks like this. when you have an implement. What's going on? There we go. Implementer. I'm going to make this less red in a second. Um, then you want the coding standards to be available via pull. If it has a question, you want it to be able to sort of answer it. But if you then have an automated reviewer afterwards, then you want it to push. You want to push that information to the reviewer. You want to say, "These are our coding standards." um make sure that this code um follows them. So if you have skills for instance, then you want to push that stuff to the reviewer so the reviewer has both the code that's written and the coding standards to compare to. Hopefully that answers your question. I can show you an automated version of this as well.
