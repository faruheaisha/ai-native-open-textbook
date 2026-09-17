---
title: "Goal Implementation"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/implementation/claude-goal-implementation.md"
sourceRel: "implementation/claude-goal-implementation.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/implementation/claude-goal-implementation.md"
sourceSha256: "4b071e60aadeaf200f51ac379408fcf2a1f53cee86329457d74daed77fe23b6f"
pageSha256: "4b071e60aadeaf200f51ac379408fcf2a1f53cee86329457d74daed77fe23b6f"
contentMode: "local-full"
zh: ""
---

# Goal Implementation

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

<a href="#goal-tips-from-the-community"><img src="/mirror/40/40ff976a740fb4fcf55255dbc78bf034992e082b.svg" alt="Implemented"></a>

`/goal` keeps your agent working across turns until a condition is satisfied — Claude Code, Codex, and Hermes Agent all support it. The community is converging on a few high-leverage prompting tricks that pair well with it.

---

## Goal Tips from the Community

### 1. Ask the agent to propose its own goals

  <img src="/mirror/71/7138426e9e3ee56bc933c2eeafdfa42494ab6aa4.webp" alt="Alex Finn tweet — /goal is the most underrated AI feature of 2026" width="50%">

> It's official. Claude Code just released /goal
>
> The single most underrated AI feature of 2026
>
> Now Claude Code, Codex, and Hermes agent have it
>
> It allows your agent to complete long running tasks, sometimes for days
>
> EVERYONE should be immediately running this prompt:
>
> 'Based on what you know about me, my goals, ambitions, and what we've built together already, what are the 3 /goals we can run right now that would run for long time periods and produce the best results?'
>
> Choose one, then ask for it to build you a prompt
>
> You should get a few options for super powerful goal prompts that will have your agent of choice complete long running tasks that will deliver your mind blowing results.
>
> Carve out 15 minutes tonight to do this. Thank me later.

**Source:** [Alex Finn (@AlexFinn) on X](https://x.com/AlexFinn/status/2053976411296452887)

---

### 2. Let the agent draft the /goal prompt for you

  <img src="/mirror/bf/bf3061d8b80e7fb79e10a7d6b0dd1f21d6b4cc6c.webp" alt="Meta Alchemist tweet — /goal trick for Codex" width="50%">

> wanna know the best /goal trick for Codex?
>
> just tell your Codex:
>
> "read this session and repo, analyze deeply the exact intent and goals we are looking to achieve here then write me the /goal prompt for this.
>
> make sure to dig into history & docs we have to be 100% clear"
>
> also you can add:
>
> "if you are not sure about certain parts or wanna ask me a few questions to clarify certain goals further don't hesitate"
>
> then just copy paste what Codex gives you change the initial part to /goal
>
> and it will do exactly what you wanted to do in that session / repo, nonstop until it gets to completion.

**Source:** [Meta Alchemist (@meta_alchemist) on X](https://x.com/meta_alchemist/status/2054214497443995694)

---

## ![How to Use](/mirror/43/43b393ff0af70918e029290bee538f937f2e8abb.svg)

```bash
$ claude
> /goal <condition>
> /goal clear
```

`/goal <condition>` keeps Claude working across turns until a Haiku-evaluated condition holds. It is complementary to `/loop` (time-driven) and auto mode (per-tool). Requires Claude Code v2.1.139+.

See the [official docs](https://code.claude.com/docs/en/goal) for full behavior.
