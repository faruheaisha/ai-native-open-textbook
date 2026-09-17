---
title: "F. What Vibe Coding Can and Cannot Do"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/en/Basic/99-appendix/f-vibe-coding-can-and-cannot.md"
sourceRel: "docs/en/Basic/99-appendix/f-vibe-coding-can-and-cannot.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/en/Basic/99-appendix/f-vibe-coding-can-and-cannot.md"
sourceSha256: "9f0721feb8b0e5b95819e808c70bbe272f09997dad524dc521d95847d8e0c465"
pageSha256: "9f0721feb8b0e5b95819e808c70bbe272f09997dad524dc521d95847d8e0c465"
contentMode: "local-full"
zh: ""
---

# F. What Vibe Coding Can and Cannot Do

The basic edition has been emphasizing one thing all along: don't idolize Vibe Coding, and don't underestimate it either. It is well suited to many scenarios, but not every project should be advanced in the same way.

## It is well suited to these kinds of work

| Scenario | Why it fits |
|------|-----------|
| Personal websites, portfolios | The feedback is intuitive, making it easy to iterate quickly |
| Prototype validation | You can turn ideas into something real very quickly and judge whether they are worth pursuing |
| Internal small tools | The scope is controllable and the goals are clear, making them suitable for rapid implementation |
| Event pages, showcase pages, simple applications | Pages and interactions can be moved forward quickly |

## It is not suitable for scenarios that are treated "casually"

| Scenario | Why greater caution is needed |
|------|----------------|
| High-concurrency core systems | They involve performance, stability, and complex architecture |
| Core transaction flows in finance | The risk is high, and the cost of errors is enormous |
| Systems with strict compliance and audit requirements | It is not enough to simply build them; processes and accountability are also involved |
| Systems with highly sensitive data | Requirements for security, permissions, and auditing are higher |

This is not to say that AI cannot participate in these systems, but rather that these scenarios cannot be advanced by relying only on "just vibe it first."

## A very useful rule of thumb

If, when a project goes wrong, the main cost is "the experience is poor and it needs more iteration," then it is usually a good fit for starting with Vibe Coding; if, once something goes wrong, the cost becomes "financial loss, privacy risks, or serious liability issues," then much greater caution is required, and even more professional engineering and review processes may be necessary.

## The real sense of boundaries the basic edition wants to help you build

You are now capable of creating real work, but that does not mean you need to pretend that every project should be done the same way. Knowing when to experiment quickly, when to slow down, and when to seek professional support is itself part of maturity.
