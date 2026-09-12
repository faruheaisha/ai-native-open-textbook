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
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/README.md"
zh: "on"
---

# Claude Code Best Practice

Create an agent team to build a time orchestration workflow that displays
the current Dubai time as a visual SVG card. The workflow follows the
Command → Agent → Skill architecture pattern:

<div class="tb-zh"><p>组建一个 agent 团队，构建一条时间编排工作流：把当前的迪拜时间渲染成一张可视化 SVG 卡片。这条工作流遵循 Command → Agent → Skill 的架构模式：</p></div>

- A command orchestrates the flow and handles user interaction
- An agent fetches the live current time for Dubai using a preloaded skill
- A skill creates a visual SVG time card from the fetched data

<div class="tb-zh"><p>由一条命令编排整个流程并处理用户交互；由一个 agent 借助预加载的 skill 获取迪拜的实时时间；再由一个 skill 把取到的时间数据做成可视化 SVG 时间卡。</p></div>

**Important**: All files must be created inside `agent-teams/.claude/` —
NOT in the repo root's `.claude/` directory. This keeps the agent team's
output self-contained and runnable via `cd agent-teams && claude`.
Do NOT reference or copy the existing weather workflow — build everything from scratch.

<div class="tb-zh"><p>重要：所有文件都必须建在 agent-teams/.claude/ 里面，不要放进仓库根目录的 .claude/。这样 agent 团队的产出自成一体，cd agent-teams &amp;&amp; claude 就能直接运行。不要引用或照抄已有的 weather 工作流——一切从零开始搭。</p></div>

Assign these teammates:

<div class="tb-zh"><p>请指派以下队友：</p></div>

1. **Command Architect** — Design and implement the `/time-orchestrator`
   command in `agent-teams/.claude/commands/time-orchestrator.md`. The command should:
   - Invoke the time-agent via the Agent tool (NOT bash) to fetch the
     current time for Dubai, UAE (Asia/Dubai timezone, UTC+4)
   - Invoke the time-svg-creator skill via the Skill tool to render the
     SVG card from the fetched time data
   - Use model: haiku in the frontmatter
   - Include critical requirements: sequential flow, correct tool usage
     (Agent tool for agents, Skill tool for skills), and an output summary
   Coordinate with the other teammates via the shared task list to agree
   on the data contract ({time, timezone, formatted}) passed between components.

<div class="tb-zh"><p>1. Command Architect：在 agent-teams/.claude/commands/time-orchestrator.md 中设计并实现 /time-orchestrator 命令。该命令应当：通过 Agent 工具（而不是 bash）调用 time-agent，取回阿联酋迪拜（Asia/Dubai 时区，UTC+4）的当前时间；通过 Skill 工具调用 time-svg-creator skill，用取到的时间数据渲染 SVG 卡片；在 frontmatter 里使用 model: haiku；写明关键要求——流程串行、工具用法正确（agent 用 Agent 工具、skill 用 Skill 工具），并输出一段小结。还要通过共享任务清单与其他队友商定组件之间传递的数据契约（{time, timezone, formatted}）。</p></div>

2. **Agent Engineer** — Design and implement the `time-agent` in
   `agent-teams/.claude/agents/time-agent.md` and its preloaded `time-fetcher`
   skill in `agent-teams/.claude/skills/time-fetcher/SKILL.md`. The agent should:
   - Fetch the current time for Dubai (Asia/Dubai, UTC+4) using Bash
     with `TZ='Asia/Dubai' date '+%Y-%m-%d %H:%M:%S %Z'`
   - Return the time value, timezone name, and formatted string to the command
   - Use frontmatter: tools (Bash), model: haiku, color: blue, maxTurns: 3
   - Preload the time-fetcher skill via the `skills:` field
   The time-fetcher skill (`agent-teams/.claude/skills/time-fetcher/SKILL.md`)
   should contain the bash command for Dubai time, the expected output format,
   and set user-invocable: false since it is agent-only domain knowledge.
   Post the agreed data contract to the shared task list so the Command
   Architect and Skill Designer can align on the interface.

<div class="tb-zh"><p>2. Agent Engineer：在 agent-teams/.claude/agents/time-agent.md 中设计并实现 time-agent，并在 agent-teams/.claude/skills/time-fetcher/SKILL.md 中实现它预加载的 time-fetcher skill。该 agent 应当：用 Bash 执行 TZ='Asia/Dubai' date '+%Y-%m-%d %H:%M:%S %Z' 取回迪拜（Asia/Dubai，UTC+4）的当前时间；把时间值、时区名和格式化字符串返回给命令；frontmatter 使用 tools（Bash）、model: haiku、color: blue、maxTurns: 3；并通过 skills: 字段预加载 time-fetcher skill。time-fetcher skill（agent-teams/.claude/skills/time-fetcher/SKILL.md）里要写明获取迪拜时间的 bash 命令、期望的输出格式，并设置 user-invocable: false，因为它只是供 agent 使用的领域知识。请把商定好的数据契约发到共享任务清单上，好让 Command Architect 与 Skill Designer 对齐接口。</p></div>

3. **Skill Designer** — Design and implement the `time-svg-creator`
   skill in `agent-teams/.claude/skills/time-svg-creator/SKILL.md` with supporting
   files `reference.md` (SVG template + output template) and `examples.md`
   (example input/output pairs). The skill should:
   - Receive a time value, timezone, and formatted string from the calling context
   - Create a self-contained SVG time card for Dubai showing the current time
   - Write the SVG to `agent-teams/output/dubai-time.svg`
   - Write a markdown summary to `agent-teams/output/output.md`
   - Use the exact time provided — never re-fetch
   - Keep templates in reference.md (SVG markup with placeholders, markdown
     output template) and example pairs in examples.md
   Also create the `agent-teams/output/` directory for the output files.

<div class="tb-zh"><p>3. Skill Designer：在 agent-teams/.claude/skills/time-svg-creator/SKILL.md 中设计并实现 time-svg-creator skill，并配两个支撑文件：reference.md（SVG 模板与输出模板）和 examples.md（成对的输入/输出示例）。该 skill 应当：从调用上下文接收时间值、时区和格式化字符串；生成一张自包含的迪拜 SVG 时间卡，展示当前时间；把 SVG 写入 agent-teams/output/dubai-time.svg；把 markdown 小结写入 agent-teams/output/output.md；必须使用传入的精确时间，绝不重新取数；模板（带占位符的 SVG 标记与 markdown 输出模板）放在 reference.md 里，示例对放在 examples.md 里。同时创建 agent-teams/output/ 目录用于存放输出文件。</p></div>

All three teammates should create tasks in the shared task list to
coordinate the data contract: the agent returns {time, timezone, formatted},
the command passes it through context, and the skill consumes it.
Start all three in parallel since the components are independent —
they only need to agree on the data interface, not wait on each other's
implementation.

<div class="tb-zh"><p>三位队友都要在共享任务清单里建任务，围绕数据契约做协同：agent 返回 {time, timezone, formatted}，命令把它透传给下游，skill 负责消费。三个组件彼此独立，可以同时开工——它们只需在数据接口上达成一致，不必等对方实现完。</p></div>
