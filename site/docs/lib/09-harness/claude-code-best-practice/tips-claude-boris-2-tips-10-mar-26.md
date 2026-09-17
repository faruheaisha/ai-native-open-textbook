---
title: "Code Review & Test Time Compute — Tips from Boris Cherny"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-2-tips-10-mar-26.md"
sourceRel: "tips/claude-boris-2-tips-10-mar-26.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/tips/claude-boris-2-tips-10-mar-26.md"
sourceSha256: "2eb438e427a20447e47086710be01f47d7c2a840a55e6f6051e4dd6c80a8a479"
pageSha256: "2eb438e427a20447e47086710be01f47d7c2a840a55e6f6051e4dd6c80a8a479"
contentMode: "local-full"
zh: ""
---

# Code Review & Test Time Compute — Tips from Boris Cherny

A summary of insights shared by Boris Cherny ([@bcherny](https://x.com/bcherny)), creator of Claude Code, on March 10, 2026.

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## 1/ Introducing Code Review

New in Claude Code: **Code Review**. A team of agents runs a deep review on every PR.

- Built for Anthropic's own team first — code output per engineer is up **200% this year**, and reviews were the bottleneck
- Boris has been using it for a few weeks and found it catches many real bugs he would not have noticed otherwise
- When a PR opens, Claude dispatches a team of agents to hunt for bugs

<a href="https://x.com/bcherny/status/2031089411820228645"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/assets/boris-26-3-10/0.png" alt="Boris Cherny announcing Code Review" width="50%" /></a>

---

## 2/ Test Time Compute & Multiple Context Windows

Roughly, the more tokens you throw at a coding problem, the better the result. Boris calls this **test time compute**.

- Using **separate context windows** makes the result even better — this is what makes subagents work, and why one agent can cause bugs and another (using the same exact model) can find them
- Similar to engineering teams: if Boris causes a bug, his coworker reviewing the code might find it more reliably than he can
- In the limit, agents will probably write perfect bug-free code — until then, **multiple uncorrelated context windows** tends to be a good approach

<a href="https://x.com/bcherny/status/2031151689219321886"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/assets/boris-26-3-10/1.png" alt="Boris Cherny on test time compute" width="50%" /></a>

---

## Sources

- [Boris Cherny (@bcherny) on X — March 10, 2026](https://x.com/bcherny)
