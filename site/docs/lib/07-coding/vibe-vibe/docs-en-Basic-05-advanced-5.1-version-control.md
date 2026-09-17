---
title: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/en/Basic/05-advanced/5.1-version-control.md"
sourceRel: "docs/en/Basic/05-advanced/5.1-version-control.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/en/Basic/05-advanced/5.1-version-control.md"
sourceSha256: "48c440c0a8cbea397c37742c25ce3d03b43f03e741e2f8507ec7b42ba2ca6c19"
pageSha256: "48c440c0a8cbea397c37742c25ce3d03b43f03e741e2f8507ec7b42ba2ca6c19"
contentMode: "local-full"
zh: ""
---

# 5.1 Why “Like You” Matters More Than “Smarter,” and First Understand What’s Happening Behind the Scenes in Plain Language

When many people hear AI, their first instinct is to ask: is it smart enough, is the model strong enough, can it answer more complex questions? But for a digital twin on a personal homepage, the truly important question is not “how powerful is it,” but “is it representing you.” If an answer looks polished and complete but sounds nothing like the way you express yourself and does not respect your boundaries, then no matter how fluent it is, it is hard to call it a good digital twin.

So at the start of this chapter, we need to bring the evaluation criteria back into focus. Your digital twin is not a general encyclopedia, nor is it an all-knowing customer service bot. Its most important job is to introduce you, answer questions related to you, and honestly stop when it does not know. Once this standard is clear, many of the adjustments you make later will become much simpler: you are not pursuing “more universal capability,” but “more like you, more stable, and more trustworthy.”

## Why “Like You” Matters More

Imagine two kinds of answers.

The first is standard and complete, but sounds like something any default chatbot on any website would say. The second may be less flashy, but it introduces you in a way that is closer to how you would speak, knows what it can say and what it should not say casually, and honestly stops when it does not know. For a personal homepage, the latter is more valuable.

Because people come here not to test the model’s intelligence, but to get to know you.

## First Understand What’s Happening Behind the Scenes in Plain Language

This is also a good place to first understand, in plain language, what is actually happening behind the scenes. The simplest description is: a visitor enters a question on the page, your project sends that question to the model API, the model generates an answer, and then the answer is returned to the page for display. Right now, you do not need to fully understand the entire backend architecture, nor do you need to master all the details of HTTP, routing, and requests. You only need to build an intuitive understanding that is good enough for now: the chat process on the page is not magic, but a chain you can gradually learn to control.

You can think of it like this for now:

```text
Visitor asks a question
-> The project sends the question out
-> The model generates an answer based on the instructions
-> The answer returns to the page and is displayed
```

Much of what Chapter 5 really adjusts happens in the middle of this chain: what information you provide, what boundaries you set, and how you require it to speak.

## What Is the “Digital Twin Instruction Manual”

In this chain, the most critical element is what we will later write as the “digital twin instruction manual.” You can think of it first as a system prompt, or more conversationally: a set of instructions that tells it “who you are, how you should speak, what you know, and what to do when you do not know.”

With this understanding, everything you do later in Chapter 5 will feel more grounded. You will no longer see it as a mysterious black box, but instead understand: I am continuously revising this instruction manual, adding to it, and calibrating it.

::: details Want to go a bit deeper?
If you want a systematic understanding of APIs, backend interfaces, and the request chain, you can jump to the advanced version and continue reading:
- [Chapter 7: Connecting the Frontend and Backend](https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/Advanced/07-backend-api/README.md)
:::

---

[Next section: Write the first version of the “digital twin instruction manual” and calibrate it with 1–3 sets of real materials →](/lib/07-coding/vibe-vibe/docs-en-Basic-05-advanced-5.2-deployment)
