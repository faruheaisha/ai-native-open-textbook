---
title: "10 Tips for Using Claude Code — From the Claude Code Team"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-10-tips-01-feb-26.md"
sourceRel: "tips/claude-boris-10-tips-01-feb-26.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/tips/claude-boris-10-tips-01-feb-26.md"
sourceSha256: "1f3a35cc279216b68e75c4dc51885d1ff81392065fadc7d7622a2b2e00ae5b69"
pageSha256: "1f3a35cc279216b68e75c4dc51885d1ff81392065fadc7d7622a2b2e00ae5b69"
contentMode: "local-full"
zh: "on"
---

# 10 Tips for Using Claude Code — From the Claude Code Team

A summary of team tips shared by Boris Cherny ([@bcherny](https://x.com/bcherny)), creator of Claude Code, on February 1, 2026.

<div class="tb-zh"><p>Claude Code 的作者 Boris Cherny（@bcherny）于 2026 年 2 月 1 日分享的团队技巧汇总。</p></div>

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Context

Boris shared tips for using Claude Code sourced directly from the Claude Code team. The way the team uses Claude is different than how Boris uses it personally. Remember: there is no one right way to use Claude Code — everyone's setup is different. You should experiment to see what works for you!

<div class="tb-zh"><p>Boris 分享的这些 Claude Code 使用技巧直接来自 Claude Code 团队。团队用 Claude 的方式，和 Boris 个人的用法并不一样。请记住：使用 Claude Code 没有唯一正确的方式——每个人的配置都不同，值得自己动手试验，找到适合你的那一套。</p></div>

<a href="https://x.com/bcherny/status/2017742741636321619"><img src="/mirror/dd/dd5f596201f33f2b80e251ca8e0e61c7f18bc37c.png" alt="Boris Cherny intro tweet" width="50%" /></a>

---

## 1/ Do More in Parallel

Spin up 3–5 git worktrees at once, each running its own Claude session in parallel. It's the single biggest productivity unlock, and the top tip from the team. Personally, Boris uses multiple git checkouts, but most of the Claude Code team prefers worktrees — it's the reason `@amorisscode` built native support for them into the Claude Desktop app!

<div class="tb-zh"><p>同时开 3 到 5 个 git worktree，每个里面跑一个独立的 Claude 会话并行推进。这是提效最猛的一招，也是团队的头号技巧。Boris 本人用的是多个 git checkout，但 Claude Code 团队大多数人更偏爱 worktree——正因如此，@amorisscode 才把原生支持内置进了 Claude 桌面应用。</p></div>

Some people also name their worktrees and set up shell aliases (`2a`, `2b`, `2c`) so they can hop between them in one keystroke. Others have a dedicated "analysis" worktree that's only for reading logs and running BigQuery.

<div class="tb-zh"><p>还有人会给 worktree 起名字、配好 shell 别名（2a、2b、2c），一个按键就能来回切换。也有人专门留一个「分析」用 worktree，只用来读日志、跑 BigQuery。</p></div>

See: [Worktrees Docs](https://code.claude.com/docs/en/common...)

<div class="tb-zh"><p>参见：Worktrees 文档。</p></div>

<a href="https://x.com/bcherny/status/2017742743125299476"><img src="/mirror/71/719dddd1f1f1d6841eb83ae10f8c46b48f69c8d8.png" alt="Do more in parallel" width="50%" /></a>

---

## 2/ Start Every Complex Task in Plan Mode

Pour your energy into the plan so Claude can 1-shot the implementation.

<div class="tb-zh"><p>把精力花在规划上，让 Claude 一次就把实现做完。</p></div>

One person has one Claude write the plan, then they spin up a second Claude to review it as a staff engineer.

<div class="tb-zh"><p>有位同事让一个 Claude 写方案，再开第二个 Claude，以资深工程师的视角来评审这份方案。</p></div>

Another says the moment something goes sideways, they switch back to plan mode and re-plan. Don't keep pushing. They also explicitly tell Claude to enter plan mode for verification steps, not just for the build.

<div class="tb-zh"><p>另一位同事说，一旦事情开始跑偏，他就切回 plan 模式重新规划，绝不硬推。他们还会明确要求 Claude 在验证环节（而不只是构建环节）也进入 plan 模式。</p></div>

<a href="https://x.com/bcherny/status/2017742745365057733"><img src="/mirror/3b/3bd04a397092c278c935f4cbd5a914e591bb64fa.png" alt="Start every complex task in plan mode" width="50%" /></a>

---

## 3/ Invest in Your CLAUDE.md

After every correction, end with: "Update your CLAUDE.md so you don't make that mistake again." Claude is eerily good at writing rules for itself.

<div class="tb-zh"><p>每次纠正之后，都以这句话收尾：「更新你的 CLAUDE.md，别再犯同样的错误。」Claude 给自己写规则的本事出奇地好。</p></div>

Ruthlessly edit your `CLAUDE.md` over time. Keep iterating until Claude's mistake rate measurably drops.

<div class="tb-zh"><p>持续对 CLAUDE.md 做无情精简。反复迭代，直到 Claude 的出错率出现可测量的下降。</p></div>

One engineer tells Claude to maintain a notes directory for every task/project, updated after every PR. They then point `CLAUDE.md` at it.

<div class="tb-zh"><p>有位工程师让 Claude 为每个任务或项目维护一个笔记目录，每提交一个 PR 就更新一次，再让 CLAUDE.md 指向它。</p></div>

<a href="https://x.com/bcherny/status/2017742747067945390"><img src="/mirror/81/81bf5e646dd6e96032ae623aa7f532c7d6ce3a9e.png" alt="Invest in your CLAUDE.md" width="50%" /></a>

---

## 4/ Create Your Own Skills and Commit Them to Git

Reuse across every project. Tips from the team:

<div class="tb-zh"><p>让成果在每个项目之间复用。团队的经验是：</p></div>

- If you do something more than once a day, turn it into a skill or command
- Build a `/techdebt` slash command and run it at the end of every session to find and kill duplicated code
- Set up a slash command that syncs 7 days of Slack, GDrive, Asana, and GitHub into one context dump
- Build analytics-engineer-style agents that write dbt models, review code, and test changes in dev

<div class="tb-zh"><p>一天里要做超过一次的事，就把它做成 skill 或 command；建一个 /techdebt 斜杠命令，每次会话结束时跑一遍，找出并干掉重复代码；做一个斜杠命令，把 Slack、GDrive、Asana 和 GitHub 最近 7 天的内容同步成一份上下文汇总；构建数据分析工程师风格的 agent，让它们写 dbt 模型、审代码、在 dev 环境里验证改动。</p></div>

See: [Extend Claude with Skills — Claude Code Docs](https://code.claude.com/docs/en/skills)

<div class="tb-zh"><p>参见：用 Skills 扩展 Claude——Claude Code 文档。</p></div>

<a href="https://x.com/bcherny/status/2017742748984742078"><img src="/mirror/41/41e0ec38457dd19c2e9d4e12f35b9efb94b7bcd0.png" alt="Create your own skills" width="50%" /></a>

---

## 5/ Claude Fixes Most Bugs by Itself

Here's how the team does it:

<div class="tb-zh"><p>团队是这么做的：</p></div>

Enable the Slack MCP, then paste a Slack bug thread into Claude and just say "fix." Zero context switching required.

<div class="tb-zh"><p>启用 Slack MCP，然后把一段 Slack 上的 bug 讨论粘给 Claude，只说一句「修好它」。完全不用切换窗口。</p></div>

Or, just say "Go fix the failing CI tests." Don't micromanage how.

<div class="tb-zh"><p>或者直接说「去把挂掉的 CI 测试修好」，不要事无巨细地规定它怎么做。</p></div>

Point Claude at docker logs to troubleshoot distributed systems — it's surprisingly capable at this.

<div class="tb-zh"><p>把 docker 日志指给 Claude，让它排查分布式系统问题——它在这方面的能力出人意料地强。</p></div>

<a href="https://x.com/bcherny/status/2017742750473720121"><img src="/mirror/05/0546372af60d7b60e2bf07552fb48560efde2f70.png" alt="Claude fixes most bugs by itself" width="50%" /></a>

---

## 6/ Level Up Your Prompting

a. **Challenge Claude.** Say "Grill me on these changes and don't make a PR until I pass your test." Make Claude be your reviewer. Or, say "Prove to me this works" and have Claude diff behavior between main and your feature branch.

<div class="tb-zh"><p>a. 让 Claude 挑战你。说：「就这些改动拷问我，我通不过你的测试之前不许提 PR。」让 Claude 当你的评审。或者说「向我证明这能跑」，让 Claude 对比 main 与你的功能分支的行为差异。</p></div>

b. **After a mediocre fix,** say: "Knowing everything you know now, scrap this and implement the elegant solution."

<div class="tb-zh"><p>b. 修复效果平平之后，说：「以你现在掌握的全部信息，废掉这个方案，用更优雅的做法重做。」</p></div>

c. **Write detailed specs** and reduce ambiguity before handing work off. The more specific you are, the better the output.

<div class="tb-zh"><p>c. 写详细的规格文档，交接前先把歧义消掉。你说得越具体，产出越好。</p></div>

<a href="https://x.com/bcherny/status/2017742752566632544"><img src="/mirror/fd/fda8330d986dbf798c621048d3e221cf1e521e37.png" alt="Level up your prompting" width="50%" /></a>

---

## 7/ Terminal & Environment Setup

The team loves Ghostty! Multiple people like its synchronized rendering, 24-bit color, and proper unicode support.

<div class="tb-zh"><p>团队很喜欢 Ghostty！不少人中意它的同步渲染、24 位色和完整的 unicode 支持。</p></div>

For easier Claude-juggling, use `/statusline` to customize your status bar to always show context usage and current git branch. Many also color-code and name their terminal tabs, sometimes using tmux — one tab per task/worktree.

<div class="tb-zh"><p>为了更轻松地在多个 Claude 之间周旋，可以用 /statusline 定制状态栏，让它始终显示上下文用量和当前 git 分支。很多人还会给终端标签页配色、命名，有时配合 tmux——一个标签页对应一个任务或 worktree。</p></div>

Use voice dictation. You speak 3x faster than you type, and your prompts get way more detailed as a result. (hit fn x2 on macOS)

<div class="tb-zh"><p>用语音输入。说话比打字快 3 倍，提示词也因此详细得多。（macOS 上连按两次 fn）</p></div>

See: [Terminal Setup Docs](https://code.claude.com/docs/en/termin...)

<div class="tb-zh"><p>参见：终端配置文档。</p></div>

<a href="https://x.com/bcherny/status/2017742753971769626"><img src="/mirror/d9/d9d1aafed59c1247bdb883a536955f330199437e.png" alt="Terminal and environment setup" width="50%" /></a>

---

## 8/ Use Subagents

a. Append "use subagents" to any request where you want Claude to throw more compute at the problem.

<div class="tb-zh"><p>a. 想让 Claude 在这件事上投入更多算力时，在请求后面加上「使用子代理」。</p></div>

b. Offload individual tasks to subagents to keep your main agent's context window clean and focused.

<div class="tb-zh"><p>b. 把零散任务交给子代理去做，好让主 agent 的上下文窗口保持干净、聚焦。</p></div>

c. Route permission requests to Opus 4.5 via a hook — let it scan for attacks and auto-approve the safe ones. See: [Hooks Docs](https://code.claude.com/docs/en/hooks#...)

<div class="tb-zh"><p>c. 用 hook 把权限请求转给 Opus 4.5——让它扫描攻击意图，安全的直接自动批准。参见：Hooks 文档。</p></div>

<a href="https://x.com/bcherny/status/2017742755737555434"><img src="/mirror/2a/2a45db1199b5baeea13e877adefe9f172f505848.png" alt="Use subagents" width="50%" /></a>

---

## 9/ Use Claude for Data & Analytics

Ask Claude Code to use the "bq" CLI to pull and analyze metrics on the fly. The team has a BigQuery skill checked into the codebase, and everyone uses it for analytics queries directly in Claude Code. Personally, Boris hasn't written a line of SQL in 6+ months.

<div class="tb-zh"><p>让 Claude Code 用 bq 命令行工具随时拉取和分析指标。团队把一个 BigQuery skill 提交进了代码库，所有人都直接在 Claude Code 里做分析查询。Boris 本人已经 6 个多月没写过一行 SQL。</p></div>

This works for any database that has a CLI, MCP, or API.

<div class="tb-zh"><p>任何有 CLI、MCP 或 API 的数据库都能这么用。</p></div>

<a href="https://x.com/bcherny/status/2017742757666902374"><img src="/mirror/eb/ebc45c253693dd201a3b4c8970dd9792d8973182.png" alt="Use Claude for data and analytics" width="50%" /></a>

---

## 10/ Learning with Claude

A few tips from the team to use Claude Code for learning:

<div class="tb-zh"><p>团队关于「用 Claude Code 来学习」的几条经验：</p></div>

a. Enable the "Explanatory" or "Learning" output style in `/config` to have Claude explain the "why" behind its changes.

<div class="tb-zh"><p>a. 在 /config 里启用 Explanatory 或 Learning 输出风格，让 Claude 解释改动背后的「为什么」。</p></div>

b. Have Claude generate a visual HTML presentation explaining unfamiliar code. It makes surprisingly good slides!

<div class="tb-zh"><p>b. 让 Claude 生成一份可视化 HTML 演示，讲解你看不懂的代码。它做的幻灯片出人意料地好。</p></div>

c. Ask Claude to draw ASCII diagrams of new protocols and codebases to help you understand them.

<div class="tb-zh"><p>c. 让 Claude 用 ASCII 画出新协议和代码库的结构图，帮你理解。</p></div>

d. Build a spaced-repetition learning skill: you explain your understanding, Claude asks follow-ups to fill gaps, stores the result.

<div class="tb-zh"><p>d. 建一个间隔重复的学习 skill：你讲自己的理解，Claude 追问以补齐缺口，最后把结果存下来。</p></div>

<a href="https://x.com/bcherny/status/2017742759218794768"><img src="/mirror/aa/aae60b1bb153c5d422b89f126328e1d98a7fa642.png" alt="Learning with Claude" width="50%" /></a>

---

## Sources

- [Boris Cherny (@bcherny) on X — February 1, 2026](https://x.com/bcherny/status/2017742741636321619)

<div class="tb-zh"><p>来源：Boris Cherny（@bcherny）2026 年 2 月 1 日在 X 上的分享。</p></div>
