---
title: "Chapter 16: User Feedback and Product Iteration"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/en/Advanced/16-user-feedback-iteration/index.md"
sourceRel: "docs/en/Advanced/16-user-feedback-iteration/index.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/en/Advanced/16-user-feedback-iteration/index.md"
sourceSha256: "99093cc121c7f0ea46702e13b4a6c22bbd7ceda61ec6a248b99d5f07d8f3878d"
pageSha256: "99093cc121c7f0ea46702e13b4a6c22bbd7ceda61ec6a248b99d5f07d8f3878d"
contentMode: "local-full"
zh: ""
---

# Chapter 16: User Feedback and Product Iteration

![img](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/vibe-vibe/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/public/images/Advanced/mll09knu-500214b5388c0f63.jpg)

## Introduction

Your product is live. Looking at the analytics dashboard, you know people are visiting every day. But one question keeps bothering you: **you don’t know why they came, and you definitely don’t know why they left**.

The old hand said, "Data tells you what happened, but user feedback tells you why it happened."

### Why Feedback Matters

You might think you understand your users well, because you’re one of them. But that’s a dangerous assumption. You’re just one user among many, and your habits, needs, and pain points may be completely different from everyone else’s.

The old hand told you a story: a team built a note-taking app and spent a lot of time developing an "automatic cloud sync" feature because they thought it was the most important thing. But after launch, they discovered that what users wanted most was actually "being able to view notes offline." It turned out that most users were using the app on subways and airplanes, where there was no internet access at all.

If that team had gathered user feedback earlier, they wouldn’t have wasted months building a feature that wasn’t actually the highest priority.

### Channels for Collecting Feedback

You start thinking about how to collect feedback. The simplest way is to put a "Feedback" button on the page.

But having a button alone isn’t enough. Users often don’t know what to say. You need to guide them: What problem did they run into? What feature do they want? What suggestions do they have?

Besides an on-page button, you can also provide an email address or create a group on social media. Different channels tend to collect different types of feedback. A page button is better for specific bug reports, while email or group chats are better for in-depth suggestions and ideas.

### Feedback Categories and Priorities

After collecting a pile of feedback, you realize it’s hard to process. Some people say the colors don’t look good, some say login fails, and some want a particular feature. Which should you tackle first?

The old hand taught you to evaluate things using **two dimensions**:

The first is **scope of impact**: how many people does this issue affect? If only one person runs into it, it may be an isolated case; if half your users are seeing it, it becomes a high-priority issue.

The second is **severity**: how serious is the problem? If it’s just "the colors don’t look good," users can still keep using the product; if it’s "login fails," they can’t use it at all, which makes it much more serious.

By combining these two dimensions, you can rank priorities: issues that are both high-impact and severe should be addressed first; issues with limited impact and low severity can wait.

### User Interviews

You notice that some feedback is vague. For example, someone might just say the product is hard to use. That gives you very little to work with.

The old hand tells you that this is when you need to conduct **user interviews**. Find a few real users and set up some time to chat with them online.

The key is to have them show you what they do, not just answer your questions. For example, don’t ask "Do you like our product?" because most people will just say it’s okay. Ask "What difficulties did you run into the last time you used it?" and let them talk while using the product. You’ll notice all kinds of issues you would never have thought of on your own.

You don’t need a lot of interviews. Five to ten is enough, because you’ll start hearing the same problems over and over. That’s when you know where the real issues are.

### Data-Driven Decisions

When you combine the analytics you learned about in the previous chapter with user feedback, you can make much better decisions.

For example, the data might show that the registration page has a high drop-off rate, with lots of people landing on it but not finishing sign-up. At the same time, user feedback says "the registration form is too long." When you compare the two, it becomes obvious what to do: simplify the registration flow and remove unnecessary fields.

That’s **data-driven** thinking. You’re not making decisions based on gut feeling—you’re using data and real user feedback to validate your assumptions.

### Continuous Iteration

The old hand ended by saying, "The day your product launches isn’t the end—it’s the real beginning."

Only on the first day after launch can you truly start validating whether your ideas are right and whether users actually need your product. Based on the feedback and data you collect, you keep adjusting direction, improving features, dropping the things nobody uses, and strengthening the parts users genuinely love.

That’s **continuous iteration**. No product is perfect on the first try—great products are built through step-by-step iteration.

---

### Chapter Summary

- 16.1 [Facing Real Users](/lib/07-coding/vibe-vibe/docs-en-Advanced-16-user-feedback-iteration-01-facing-real-users) — Mental adjustment after launch and building feedback channels
- 16.2 [Feedback Categories and Priorities](/lib/07-coding/vibe-vibe/docs-en-Advanced-16-user-feedback-iteration-02-feedback-prioritization) — Using the RICE framework to prioritize feedback
- 16.3 [Understanding Users](/lib/07-coding/vibe-vibe/docs-en-Advanced-16-user-feedback-iteration-03-understanding-users) — Combining user interviews with data-driven thinking
- 16.4 [Iteration and Growth](/lib/07-coding/vibe-vibe/docs-en-Advanced-16-user-feedback-iteration-04-iteration-and-growth) — Building a sustainable iteration rhythm and product mindset

---

**Previous Chapter**: [Chapter 15: SEO, Sharing, and Analytics](/lib/07-coding/vibe-vibe/docs-en-Advanced-15-seo-analytics)
