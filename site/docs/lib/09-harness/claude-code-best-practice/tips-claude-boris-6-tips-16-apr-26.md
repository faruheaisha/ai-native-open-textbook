---
title: "6 Tips for Getting More Out of Opus 4.7 — From Boris Cherny"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-6-tips-16-apr-26.md"
sourceRel: "tips/claude-boris-6-tips-16-apr-26.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/tips/claude-boris-6-tips-16-apr-26.md"
sourceSha256: "8f5c8d10a2547c55644cbef9885d60fa6aec760c8cd66ca6403152ac46c11f92"
pageSha256: "8f5c8d10a2547c55644cbef9885d60fa6aec760c8cd66ca6403152ac46c11f92"
contentMode: "local-full"
zh: ""
---

# 6 Tips for Getting More Out of Opus 4.7 — From Boris Cherny

A thread of tips shared by Boris Cherny ([@bcherny](https://x.com/bcherny)), creator of Claude Code, on April 16, 2026 — after dogfooding Opus 4.7 for the last few weeks.

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Context

After dogfooding Opus 4.7 for a few weeks, Boris has been feeling "incredibly productive" and shared six ways to get more out of the new model — from permission automation to effort tuning to verification patterns.

<a href="https://x.com/bcherny"><img src="/mirror/a9/a9e3664a7de226e83e4a7c9c843c3816e4e5e7b0.png" alt="Boris Cherny intro tweet — dogfooding Opus 4.7" width="50%" /></a>

---

## 1/ Auto Mode — No More Permission Prompts

Opus 4.7 loves doing complex, long-running tasks: deep research, refactoring code, building complex features, iterating until a performance benchmark is hit. In the past, you either had to babyset the model while it did these sorts of long tasks, or use `--dangerously-skip-permissions`.

Anthropic recently rolled out **auto mode** as a safer alternative. In this mode, permission prompts are routed to a model-based classifier that decides whether the command is safe to run:

- If it's safe, auto-approve
- If it's risky, pause and ask

This means no more babysitting while the model runs. More than that, it means you can run more Claudes in parallel — if safe, you can switch focus to the next Claude.

Auto mode is now available for Opus 4.7 for Max, Teams, and Enterprise users. **Shift+Tab** to cycle between `Ask permissions` → `Plan mode` → `Auto mode` in the CLI, or choose it from the dropdown in Desktop or VS Code.

<a href="https://x.com/bcherny"><img src="/mirror/c9/c9923113256b3e1df8a78ae7eb7dedaa8295c4ae.png" alt="Boris Cherny on auto mode" width="50%" /></a>

---

## 2/ The New /fewer-permission-prompts Skill

Anthropic released a new `/fewer-permission-prompts` skill. It scans through your session history to find common bash and MCP commands that are safe but repeatedly prompt for permission. It then recommends a list of commands to add to your permissions allowlist.

Use this to tune up your permissions and avoid unnecessary permission prompts, especially if you don't use auto mode.

<a href="https://x.com/bcherny"><img src="/mirror/1a/1a3961fcdae3270a599d7d525e6b32e9e98dcd33.png" alt="Boris Cherny on /fewer-permission-prompts skill" width="50%" /></a>

---

## 3/ Recaps

Anthropic shipped **recaps** earlier this week, to prep for Opus 4.7. Recaps are short summaries of what an agent did and what's next.

Very useful when returning to a long-running session after a few minutes or a few hours:

```
* Cogitated for 6m 27s

* recap: Fixing the post-submit transcript shift bug. The styling-flash
  part is shipped as PR #29869 (auto-merge on, posted to stamps). Next:
  I need a screen recording of the remaining horizontal rewrap on `cc -c`
  to target that separate cause. (disable recaps in /config)
```

Disable recaps in `/config` if you don't want them.

<a href="https://x.com/bcherny"><img src="/mirror/2b/2bf95d23fc1b04f3588267430d9af8af0de120aa.png" alt="Boris Cherny on recaps" width="50%" /></a>

---

## 4/ Focus Mode

Boris has been loving the new **focus mode** in the CLI, which hides all the intermediate work to just focus on the final result. The model has reached a point where he generally trusts it to run the right commands and make the right edits. He just looks at the final result.

Use `/focus` to toggle on/off.

<a href="https://x.com/bcherny"><img src="/mirror/29/2980c199d6cdb05ba716afdf691a833199013929.png" alt="Boris Cherny on focus mode" width="50%" /></a>

---

## 5/ Configure Your Effort Level

Opus 4.7 uses **adaptive thinking** instead of thinking budgets. To tune the model to think more or less, tune effort.

- **Lower effort** — faster responses and lower token usage
- **Higher effort** — the most intelligence and capability

The slider presents five levels: `low` · `medium` · `high` · `xhigh` · `max` — Speed on the left, Intelligence on the right.

<a href="https://x.com/bcherny"><img src="/mirror/ba/ba539ff7130d82f585e8c4b488aa618d193435f1.png" alt="Boris Cherny on effort levels" width="50%" /></a>

---

## 6/ Give Claude a Way to Verify Its Work

Finally, make sure Claude has a way to verify its work. This has always been important — now 4.7 is 2-3x what you get out of Claude, so it's more important than ever.

Verification looks different depending on the task:

- **Backend work** — have Claude run your server/service to test end-to-end
- **Frontend work** — use the [Claude Chromium extension](https://code.claude.com/docs/en/chrome) to give Claude a way to control your browser
- **Desktop apps** — use Computer Use

Boris's prompts these days look like `Claude do blah blah /go`, where `/go` is a skill that:

1. Tests itself end-to-end using bash, browser, or computer use
2. Runs `/simplify`
3. Puts up a PR

For long-running work, verification matters even more — when you come back to a task, you know the code works.

<a href="https://x.com/bcherny"><img src="/mirror/da/da2aba9c2a853291206f0fd0e2b679ae557c0d9f.png" alt="Boris Cherny on verification" width="50%" /></a>

---

## Sources

- [Boris Cherny (@bcherny) on X — April 16, 2026](https://x.com/bcherny)
