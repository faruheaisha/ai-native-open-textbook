---
title: "How I Use Claude Code — 13 Tips from Boris Cherny"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-13-tips-03-jan-26.md"
sourceRel: "tips/claude-boris-13-tips-03-jan-26.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/tips/claude-boris-13-tips-03-jan-26.md"
sourceSha256: "3098348b7132204b183e1e5ee6e43b97dae227f2bf05a515d06ccd0125ab3350"
pageSha256: "3098348b7132204b183e1e5ee6e43b97dae227f2bf05a515d06ccd0125ab3350"
contentMode: "local-full"
zh: ""
---

# How I Use Claude Code — 13 Tips from Boris Cherny

A summary of setup tips shared by Boris Cherny ([@bcherny](https://x.com/bcherny)), creator of Claude Code, on January 3, 2026.

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Context

Boris shared his personal Claude Code setup, noting it's "surprisingly vanilla" — Claude Code works great out of the box, so he doesn't customize it much. There's no one correct way to use it: the team intentionally builds it so you can use, customize, and hack it however you like. Each person on the Claude Code team uses it very differently.

<a href="https://x.com/bcherny/status/2007179832300581177"><img src="/mirror/f3/f375ce6b1d54b5c223bcc462aa7e86ecdf482cc3.png" alt="Boris Cherny intro tweet" width="50%" /></a>

---

## 1/ Run 5 Claudes in Parallel

Run 5 Claudes in parallel in your terminal. Number your tabs 1–5, and use system notifications to know when a Claude needs input.

See: [Terminal Setup Docs](https://code.claude.com/docs/en/terminal)

<a href="https://x.com/bcherny/status/2007179833990885678"><img src="/mirror/1a/1acf30583f9c571a00e9353e8c004b9a715c09aa.png" alt="Run 5 Claudes in parallel" width="50%" /></a>

---

## 2/ Use claude.ai/code for Even More Parallelism

Run 5–10 Claudes on claude.ai/code in parallel with your local Claudes. Hand off local sessions to web sessions using `claude.ai/code`, manually kick off sessions in Chrome, and teleport back and forth.

<a href="https://x.com/bcherny/status/2007179836704600237"><img src="/mirror/77/7750a17e00bd8f18ce3e27a8ad7bff7b83c48183.png" alt="claude.ai/code parallelism" width="50%" /></a>

---

## 3/ Use Opus with Thinking for Everything

Use Opus 4.5 with thinking for everything. It's the best coding model Boris has ever used — even though it's bigger and slower than Sonnet, since you have to steer it less and it's better at tool use, it is almost always faster than using a smaller model in the end.

<a href="https://x.com/bcherny/status/2007179838864666847"><img src="/mirror/ca/cabb6e467714da8d39f1e9f82363bb11fd047c72.png" alt="Opus with thinking" width="50%" /></a>

---

## 4/ Share a Single CLAUDE.md with Your Team

Share a single `CLAUDE.md` for the repo. Check it into git, and have the whole team contribute multiple times a week. Anytime Claude does something incorrectly, add it to the `CLAUDE.md` so Claude knows not to do it next time.

<a href="https://x.com/bcherny/status/2007179840848597422"><img src="/mirror/f8/f8994c8a0a4645f2ef021c67d0217196ba6fbbb7.png" alt="Shared CLAUDE.md" width="50%" /></a>

---

## 5/ Tag @claude on PRs to Update CLAUDE.md

During code review, tag `@claude` on your coworkers' PRs to add something to the `CLAUDE.md` as part of the PR. Use the Claude Code GitHub action ([install-@hub-action](https://github.com/apps/claude)) for this — it's Boris's version of Compounding Engineering.

<a href="https://x.com/bcherny/status/2007179842928947333"><img src="/mirror/bc/bcdb783184abcce63730819331a34d159698af7e.png" alt="Tag @claude on PRs" width="50%" /></a>

---

## 6/ Start Most Sessions in Plan Mode

Start most sessions in Plan mode (shift+tab twice). If the goal is to write a Pull Request, use Plan mode and go back and forth with Claude until you like its plan. From there, switch into auto-accept edits mode and Claude can usually 1-shot it. A good plan is really important.

<a href="https://x.com/bcherny/status/2007179845336527000"><img src="/mirror/9d/9dfe6f913b315d27fbfbbad5dc5d36fd2caaaeb8.png" alt="Plan mode" width="50%" /></a>

---

## 7/ Use Slash Commands for Inner Loop Workflows

Use slash commands for every "inner loop" workflow that you do many times a day. This saves you from repeated prompting, and makes it so Claude can use these workflows too. Commands are checked into git and live in `.claude/commands/`.

Example: `/commit-push-pr` — Commit, push, and open a PR.

<a href="https://x.com/bcherny/status/2007179847949500714"><img src="/mirror/51/5191eb5ca00322e2e003981198e7e28a3a0139a2.png" alt="Slash commands" width="50%" /></a>

---

## 8/ Use Subagents to Automate Common Workflows

Use a few subagents regularly: `code-simplifier` simplifies the code after Claude is done working, `verify-app` has detailed instructions for testing Claude Code end to end, and so on. Think of subagents as automating the most common workflows — similar to slash commands.

Subagents live in `.claude/agents/`.

<a href="https://x.com/bcherny/status/2007179850139000872"><img src="/mirror/97/972508a6fd6df4f6c708a3f5783fad9c800d4fbb.png" alt="Subagents" width="50%" /></a>

---

## 9/ Use a PostToolUse Hook to Auto-Format Code

Use a `PostToolUse` hook to format Claude's code. Claude usually generates well-formatted code out of the box, and the hook handles the last 10% to avoid formatting errors in CI later.

```json
"PostToolUse": [
  {
    "matcher": "Write|Edit",
    "hooks": [
      {
        "type": "command",
        "command": "bun run format || true"
      }
    ]
  }
]
```

<a href="https://x.com/bcherny/status/2007179852047335529"><img src="/mirror/6c/6c42cb2e10181c0e03d1331b9c4b73084e6eac9b.png" alt="PostToolUse hook for formatting" width="50%" /></a>

---

## 10/ Pre-allow Permissions Instead of --dangerously-skip-permissions

Don't use `--dangerously-skip-permissions`. Instead, use `/permissions` to pre-allow common bash commands that you know are safe in your environment, to avoid unnecessary permission prompts. Most of these are checked into `.claude/settings.json` and shared with the team.

<a href="https://x.com/bcherny/status/2007179854077407667"><img src="/mirror/fa/fafdedab3b8fedcb28203714594225558b3ef261.png" alt="Pre-allow permissions" width="50%" /></a>

---

## 11/ Let Claude Use All Your Tools via MCP

Claude Code uses all your tools. It often searches and posts to Slack (via the MCP server), runs BigQuery queries to answer analytics questions (using `bq` CLI), grabs error logs from Sentry, etc. The Slack MCP configuration is checked into `.mcp.json` and shared with the team.

<a href="https://x.com/bcherny/status/2007179856266789204"><img src="/mirror/13/13d9ea9f23a7eb701cd969497b1fb974776e2e2b.png" alt="MCP tools" width="50%" /></a>

---

## 12/ Verify Long-Running Tasks with Background Agents

For very long-running tasks, either (a) prompt Claude to verify its work with a background agent when it's done, (b) use an agent Stop hook to do that more deterministically, or (c) use the ralph-wiggum plugin (originally dreamt up by @GeoffreyHuntley).

<a href="https://x.com/bcherny/status/2007179858435281082"><img src="/mirror/ec/ec93bdb45436fe7cd67935917c0357eac7e0fbd0.png" alt="Long-running tasks verification" width="50%" /></a>

---

## 13/ Give Claude a Way to Verify Its Work

Probably the most important thing to get great results out of Claude Code — give Claude a way to verify its work. If Claude has that feedback loop, it will 2–3x the quality of the final result.

Claude tests every single change Boris lands.

<a href="https://x.com/bcherny/status/2007179861115511237"><img src="/mirror/ff/ff4955c36302e7d0285a36d43e844ed934f219c6.png" alt="Give Claude a way to verify" width="50%" /></a>

---

## Sources

- [Boris Cherny (@bcherny) on X — January 3, 2026](https://x.com/bcherny/status/2007179832300581177)
