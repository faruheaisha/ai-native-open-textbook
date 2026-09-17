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
pageSha256: "c459297d667e2e5e4cfd2d8957e5dbcabd8504fade69bf9ae9ab8a0aa87e3ad9"
contentMode: "local-full"
zh: ""
---

### LLMs Like the Guy from Memento

Another weird constraint of LLM is LLM are kind of like the guy from Momento, right? They just continually forget. They could just keep resetting back to the base state. Let me pull up this diagram. I sort of I I I really should use slides, but I just prefer just like randomly scrolling around a infinite uh TL draw canvas. Thank you, Steve.

Um, so let's say another concept I want you to have is that every session with an LLM kind of goes through the same stages. You have first of all the system prompt here. This gray box here is essentially the stuff that's always in your context. You want this to be as small as possible because if you have a ton of stuff in here, if you have 250k tokens, like I have seen people put in there, then that you're just going to go straight into the dumb zone without even being able to do anything. So you want this to be tiny. You then go into a kind of exploratory phase. This blue is sort of where the coding agent is going out and exploring the codebase. Then you go into implementation and then you go into testing and kind of making sure that it works, running your feedback loops and things like this. Raise your hand if that feels familiar based on what you've done. Yep. Sort of the like the the main cornerstones of any session.

And when you clear the context, you go right back to the system prompt. Bof, you go right back there. So you delete everything that's come before. And raise your hand if you've heard of compacting as well. Yeah. Okay. There are some people who've not heard of compacting. So let's just quickly show what that means. For instance, I've just been having a little chat with my LLM. Uh, I want to make sure we sort of, you know, just cover the basics so we're all sort of on the same wavelength here. I've just been having a chat with my LLM. I've been talking about a thing that I want to build. How's the font size? Should I bump it up? Folks in the back. Bump bump bump bump bump.

I'm using claw code for this session, but you don't need to use claw code. Uh, in fact, it's often nice not to use claw code. Um, so I've been having a chat with the LM just sort of planning out what I'm going to do next. It's asking me a bunch of questions and I can I highly recommend you do this. There's this tiny little status line here that tells me how many tokens I'm using. The exact number of tokens I'm using. Um I have a article on my website AI Hero if you want to copy this. This is oh wow that is that shakes doesn't it? Um, this is essential information on every coding session because you need to know exactly how many tokens you're using so that you know how close you are to the dump zone. Absolutely essential.

And so let's watch it. So I've got two options. I can either clear and go back to nothing or I can compact. And when I compact then it's going to squeeze all of that conversation which admittedly isn't very much into a much smaller space. And this in diagram terms kind of looks like this where you take all of the information from the session and you essentially create a history out of it, a written record of what happened. And devs love compacting for some reason, but I hate it. I much prefer my AI to behave like the guy from Momento because this state is always the same. Always the same. Every time you do it, you clear and you go back to the beginning. And so if you're able to do that and you're able to optimize for that, then you're in a great spot.

So that's kind of the two things I want you to think about with LLM, the two constraints that we're working with. They have a smart zone and a dumb zone. And they're like the guy from Momento.
