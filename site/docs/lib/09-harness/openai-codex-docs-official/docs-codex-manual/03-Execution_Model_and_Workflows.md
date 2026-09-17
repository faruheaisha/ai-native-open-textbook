---
title: "openai-codex-docs-official"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/codex-manual.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/codex-manual.md"
sourceSha256: "4aa7febb59952bea88e45b8d207b2796fdac17f9611159045456124f4834c300"
pageSha256: "0a4e3be698cc6bc041003068f1861dcc618a340e91baf7e8df7eb06f87141e5c"
contentMode: "local-full"
zh: ""
---

## Execution Model and Workflows

How Codex reasons through work, tasks, prompting, speed, and multi-agent coordination.

### Best practices

Source: [Best practices](https://learn.chatgpt.com/guides/best-practices.md)

If you’re new to Codex or coding agents in general, this guide will help you get better results faster. It covers the core habits that make Codex more effective across the [CLI](https://learn.chatgpt.com/docs/codex/cli), [IDE extension](https://learn.chatgpt.com/docs/codex/ide), and the [ChatGPT desktop app](https://learn.chatgpt.com/docs/app), from prompting and planning to validation, MCP, skills, and scheduled tasks.

Codex works best when you treat it less like a one-off assistant and more like a teammate you configure and improve over time.

A useful way to think about this: start with the right context for the task, use `AGENTS.md` for durable guidance, configure Codex to match your workflow, connect external systems with MCP, turn repeated work into skills, and automate stable workflows.

#### Strong first use: Context and prompts

Codex is already strong enough to be useful even when your prompt isn't perfect. You can often hand it a hard problem with minimal setup and still get a strong result. Clear [prompting](https://learn.chatgpt.com/docs/prompting) isn't required to get value, but it does make results more reliable, especially in larger codebases or higher-stakes tasks.

If you work in a large or complex repository, the biggest unlock is giving Codex the right context for the task and a clear structure for what you want done.

A good default is to include four things in your prompt:

- **Goal:** What are you trying to change or build?
- **Context:** Which files, folders, docs, examples, or errors matter for this task? You can @ mention certain files as context.
- **Constraints:** What standards, architecture, safety requirements, or conventions should Codex follow?
- **Done when:** What should be true before the task is complete, such as tests passing, behavior changing, or a bug no longer reproducing?

This helps Codex stay scoped, make fewer assumptions, and produce work that's easier to review.

Choose a reasoning level based on how hard the task is and test what works best for your workflow. Different users and tasks work best with different settings.

- Low for faster, well-scoped tasks
- Medium or High for more complex changes or debugging
- Extra High for long, agentic, reasoning-heavy tasks

To provide context faster, try using speech dictation inside the ChatGPT
desktop app to dictate what you want Codex to do rather than typing it.

#### Plan first for difficult tasks

If the task is complex, ambiguous, or hard to describe well, ask Codex to plan before it starts coding.

A few approaches work well:

**Use Plan mode:** For most users, this is the easiest and most effective option. Plan mode lets Codex gather context, ask clarifying questions, and build a stronger plan before implementation. Toggle with `/plan` or Shift+Tab.

**Ask Codex to interview you:** If you have a rough idea of what you want but aren't sure how to describe it well, ask Codex to question you first. Tell it to challenge your assumptions and turn the fuzzy idea into something concrete before writing code.

**Use a PLANS.md template:** For more advanced workflows, you can configure Codex to follow a `PLANS.md` or execution-plan template for longer-running or multi-step work. For more detail, see the [execution plans guide](https://developers.openai.com/cookbook/articles/codex_exec_plans).

#### Make guidance reusable with `AGENTS.md`

Once a prompting pattern works, the next step is to stop repeating it manually. That's where [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) comes in.

Think of `AGENTS.md` as an open-format README for agents. It loads into context automatically and is the best place to encode how you and your team want Codex to work in a repository.

A good `AGENTS.md` covers:

- repo layout and important directories
- How to run the project
- Build, test, and lint commands
- Engineering conventions and PR expectations
- Constraints and do-not rules
- What done means and how to verify work

The `/init` slash command in the CLI is the quick-start command to scaffold a starter `AGENTS.md` in the current directory. It's a great starting point, but you should edit the result to match how your team actually builds, tests, reviews, and ships code.

You can create `AGENTS.md` files at different levels: a global `AGENTS.md` for personal defaults that sits in `~/.codex`, a repo-level file for shared standards, and more specific files in subdirectories for local rules. If there’s a more specific file closer to your current directory, that guidance wins.

Keep it practical. A short, accurate `AGENTS.md` is more useful than a long file full of vague rules. Start with the basics, then add new rules only after you notice repeated mistakes.

If `AGENTS.md` starts getting too large, keep the main file concise and reference task-specific markdown files for things like planning, code review, or architecture.

When Codex makes the same mistake twice, ask it for a retrospective and update
`AGENTS.md`. Guidance stays practical and based on real friction.

#### Configure Codex for consistency

Configuration is one of the main ways to make Codex behave more consistently across sessions and surfaces. For example, you can set defaults for model choice, reasoning effort, sandbox mode, approval policy, profiles, and MCP setup.

A good starting pattern is:

- Keep personal defaults in `~/.codex/config.toml` (**Settings > Configuration > Open config.toml** in the ChatGPT desktop app)
- Keep repo-specific behavior in `.codex/config.toml`
- Use command-line overrides only for one-off situations (if you use the CLI)

[`config.toml`](https://learn.chatgpt.com/docs/config-file/config-basic) is where you define durable preferences such as MCP servers, multi-agent setup, and feature flags. Profile-specific overrides live in separate `$CODEX_HOME/profile-name.config.toml` files.

Codex ships with operating level sandboxing and has two key knobs that you can control. Approval mode determines when Codex asks for your permission to run a command and sandbox mode determines if Codex can read or write in the directory and what files the agent can access.

If you're new to coding agents, start with the default permissions. Keep approval and sandboxing tight by default, then loosen permissions only for trusted repos or specific workflows once the need is clear.

Note that the CLI, IDE extension, and ChatGPT desktop app all share the same configuration layers. Learn more on the [sample configuration](https://learn.chatgpt.com/docs/config-file/config-sample) page.

Configure Codex for your real environment early. Many quality issues are
really setup issues, like the wrong working directory, missing write access,
wrong model defaults, or missing tools and connectors.

#### Improve reliability with testing and review

Don't stop at asking Codex to make a change. Ask it to create tests when needed, run the relevant checks, confirm the result, and review the work before you accept it.

Codex can do this loop for you, but only if it knows what “good” looks like. That guidance can come from either the prompt or `AGENTS.md`.

That can include:

- Writing or updating tests for the change
- Running the right test suites
- Checking lint, formatting, or type checks
- Confirming the final behavior matches the request
- Reviewing the diff for bugs, regressions, or risky patterns

Toggle the diff panel in the ChatGPT desktop app to directly [review
changes](https://learn.chatgpt.com/docs/code-review?surface=app) locally. Click on a specific row to
provide feedback that gets fed as context to the next Codex turn.

A useful option here is the slash command `/review`, which gives you a few ways to review code:

- Review against a base branch for PR-style review
- Review uncommitted changes
- Review a commit
- Use custom review instructions

If you and your team have a `code_review.md` file and reference it from `AGENTS.md`, Codex can follow that guidance during review as well. This is a strong pattern for teams that want review behavior to stay consistent across repositories and contributors.

Codex shouldn't just generate code. With the right instructions, it can also help **test it, check it, and review it**.

If you use GitHub Cloud, you can set up Codex to run [code reviews for your PRs](https://learn.chatgpt.com/docs/third-party/github). At OpenAI, Codex reviews 100% of PRs. You can enable automatic reviews or have Codex reactively review when you @Codex.

#### Use MCPs for external context

Use MCPs when the context Codex needs lives outside the repo. It lets Codex connect to the tools and systems you already use, so you don't have to keep copying and pasting live information into prompts.

[Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp), or MCP, is an open standard for connecting Codex to external tools and systems.

Use MCP when:

- The needed context lives outside the repo
- The data changes frequently
- You want Codex to use a tool rather than rely on pasted instructions
- You need a repeatable integration across users or projects

Codex supports both STDIO and Streamable HTTP servers with OAuth.

In the ChatGPT desktop app, go to **Settings > MCP servers** to see custom and recommended servers. Often, Codex can help you install the needed servers. All you need to do is ask. You can also use the `codex mcp add` command in the CLI to add your custom servers with a name, URL, and other details.

Add tools only when they unlock a real workflow. Do not start by wiring in
every tool you use. Start with one or two tools that clearly remove a manual
loop you already do often, then expand from there.

#### Turn repeatable work into skills

Once a workflow becomes repeatable, stop relying on long prompts or repeated back-and-forth. Use a [skill](https://learn.chatgpt.com/docs/build-skills) to package the instructions in a `SKILL.md` file, context, and supporting logic Codex should apply consistently. Skills work across the CLI, IDE extension, and ChatGPT desktop app.

Keep each skill scoped to one job. Start with 2 to 3 concrete use cases, define clear inputs and outputs, and write the description so it says what the skill does and when to use it. Include the kinds of trigger phrases a user would actually say.

Don't try to cover every edge case up front. Start with one representative task, get it working well, then turn that workflow into a skill and improve from there. Include scripts or extra assets only when they improve reliability.

A good rule of thumb: if you keep reusing the same prompt or correcting the same workflow, it should probably become a skill.

Skills are especially useful for recurring jobs like:

- Log triage
- Release note drafting
- PR review against a checklist
- Migration planning
- Telemetry or incident summaries
- Standard debugging flows

The `$skill-creator` skill is the best place to start to scaffold the first version of a skill. Keep the first version local while you iterate. When it's ready to share broadly, package it as a [plugin](https://developers.openai.com/plugins/build/plugins). One of the most important parts of a skill is the description. It should say what the skill does and when to use it.

Personal skills are stored in `$HOME/.agents/skills`, and shared team skills
can be checked into `.agents/skills` inside a repository. This is especially
helpful for onboarding new teammates.

#### Use scheduled tasks for repeated work

Once a workflow is stable, you can schedule Codex to run it in the background for you. In the ChatGPT desktop app, [scheduled tasks](https://learn.chatgpt.com/docs/automations) let you choose the project, prompt, cadence, and execution environment for recurring work.

Create a scheduled task from the **Scheduled** page. Choose the project, prompt,
cadence, and whether the task runs in a dedicated Git worktree or in your local
environment. The prompt can invoke skills. Learn more about
[Git worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees).

Good candidates include:

- Summarizing recent commits
- Scanning for likely bugs
- Drafting release notes
- Checking CI failures
- Producing standup summaries
- Running repeatable analysis workflows on a schedule

A useful rule is that skills define the method and scheduled tasks define the schedule. If a workflow still needs a lot of steering, turn it into a skill first. Once it's predictable, scheduling it can save time.

Use scheduled tasks for reflection and maintenance, not just execution. Review
recent chats, summarize repeated friction, and improve prompts, instructions,
or workflow setup over time.

#### Organize long-running chats

Chats accumulate context, decisions, and actions over time, so managing them well has a big impact on quality.

The ChatGPT desktop app lets you pin chats and create worktrees. If you use the
CLI, these [slash commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) are especially useful:

- `/experimental` to toggle experimental features and add to your `config.toml`
- `/resume` to resume a saved chat
- `/fork` to create a new chat while preserving the original transcript
- `/compact` when the chat is getting long and you want a summarized version of earlier context. Codex also compacts chats automatically
- `/agent` when you are running parallel agents and want to switch between the active agent thread
- `/theme` to choose a syntax highlighting theme
- `/apps` to use ChatGPT apps directly in Codex
- `/status` to inspect the current session state

Keep one chat per coherent unit of work. If the work is still part of the same
problem, staying in the same chat is often better because it preserves the
reasoning trail. Fork only when the work truly branches.

Use Codex’s [subagent](https://learn.chatgpt.com/docs/agent-configuration/subagents) workflows to
offload bounded work from the main thread. Keep the main agent focused on the
core problem, and use subagents for tasks like exploration, tests, or triage.

#### Common mistakes

A few common mistakes to avoid when first using Codex:

- Overloading the prompt with durable rules instead of moving them into `AGENTS.md` or a skill
- Not letting the agent see its work by not giving details on how to best run build and test commands
- Skipping planning on multi-step and complex tasks
- Giving Codex full permission to your computer before you understand the workflow
- Running live tasks on the same files without using Git worktrees
- Scheduling a recurring task before it's reliable manually
- Treating Codex like something you have to watch step by step instead of using it in parallel with your own work
- Using one chat for an entire project instead of one chat per coherent outcome. This leads to bloated context and worse results over time

### Multi-agent operations

Source: [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents.md)

ChatGPT Work and Codex can run subagent workflows by spawning specialized
agents in parallel and then collecting their results in one response. This can
be particularly helpful for complex tasks that are highly parallel, such as
codebase exploration or implementing a multi-step feature plan.

In local Codex clients, you can also define custom agents with different model
configurations and instructions for different tasks.

#### Availability

ChatGPT Work exposes subagent workflows and activity to eligible accounts.

Current Codex releases enable subagent workflows by default. Subagent activity
appears in the ChatGPT desktop app, Codex CLI, and the IDE extension.

Because each subagent does its own model and tool work, subagent workflows
consume more tokens than comparable single-agent runs.

In ChatGPT Work, ask ChatGPT to delegate independent work to subagents. The
agents run in ChatGPT's hosted environment, and the chat shows their
activity and results. At most intelligence levels, ask for delegation
explicitly. With Ultra, ChatGPT can proactively delegate work when parallel
agents would materially improve speed or quality.

Ask Codex in an app chat to delegate independent parts of the work to
subagents. Current local Codex releases delegate when you ask directly or when
applicable `AGENTS.md` or skill instructions request it. The app surfaces each
subagent thread so you can inspect its work and the summary returned to the main
chat.

Ask Codex in an interactive CLI session to use subagents. Codex can also follow
applicable `AGENTS.md` or skill instructions that request delegation. Use
`/agent` to inspect and switch between agent threads while they run. The main
thread collects the subagent results into its final response.

Ask Codex in an IDE chat to delegate independent parts of the work to subagents.
Codex can also follow applicable `AGENTS.md` or skill instructions that request
delegation. When the background-agent UI is available, active subagents appear
above the composer. Expand the panel to see their status, stop all active
subagents, or open an individual subagent thread.

#### Why subagent workflows help

Even with large context windows, models have limits. If you flood the main chat (where you're defining requirements, constraints, and decisions) with noisy intermediate output such as exploration notes, test logs, stack traces, and command output, the session can become less reliable over time.

This is often described as:

- **Context pollution**: useful information gets buried under noisy intermediate output.
- **Context rot**: performance degrades as the chat fills up with less relevant details.

For background, see the Chroma writeup on [context rot](https://research.trychroma.com/context-rot).

Subagent workflows help by moving noisy work off the main thread:

- Keep the **main agent** focused on requirements, decisions, and final outputs.
- Run specialized **subagents** in parallel for exploration, tests, or log analysis.
- Return **summaries** from subagents instead of raw intermediate output.

They can also save time when the work can run independently in parallel, and
they make larger-shaped tasks more tractable by breaking them into bounded
pieces. For example, Codex can split analysis of a multi-million-token
document into smaller problems and return distilled takeaways to the main
thread.

As a starting point, use parallel agents for read-heavy tasks such as
exploration, tests, triage, and summarization. Be more careful with parallel
write-heavy workflows, because agents editing code at once can create
conflicts and increase coordination overhead.

#### Core terms

Codex uses a few related terms in subagent workflows:

- **Subagent workflow**: A workflow where Codex runs parallel agents and combines their results.
- **Subagent**: A delegated agent that Codex starts to handle a specific task.
- **Agent thread**: The thread where a subagent does its work. Supported clients let you open these threads to inspect progress or results.

#### Triggering subagent workflows

At most intelligence levels, ask for subagents or parallel agent work
directly. Ultra enables proactive delegation, so ChatGPT can delegate suitable
independent work without a separate request.

Ask for subagents or parallel agent work directly. Codex can also delegate when
applicable project or skill instructions request it.

In practice, manual triggering means using direct instructions such as
"spawn two agents," "delegate this work in parallel," or "use one agent per
point." Subagent workflows consume more tokens than comparable single-agent runs
because each subagent does its own model and tool work.

A good subagent prompt should explain how to divide the work, whether Codex
should wait for all agents before continuing, and what summary or output to
return.

```text
Review this branch with parallel subagents. Spawn one subagent for security risks, one for test gaps, and one for maintainability. Wait for all three, then summarize the findings by category with file references.
```

#### Choosing models and reasoning

Different agents need different model and reasoning settings.

In ChatGPT Work, choose a model and an intelligence level from the composer.
Available intelligence levels can include **Light**, **Medium**, **High**,
**Extra High**, and **Max**, depending on the selected model. **Ultra** is
available only to eligible accounts and supported models. It uses maximum
reasoning and lets ChatGPT proactively delegate suitable work to subagents.

At other intelligence levels, ask for subagents explicitly when you want work
delegated in parallel.

If you don't configure a subagent model or `model_reasoning_effort`, the
subagent inherits the parent agent's model and reasoning effort. If an explicit
spawn request or an `[agents]` default selects a model without an
explicit or configured reasoning effort, the subagent uses that model's default
reasoning effort. To balance intelligence, speed, and price for each task,
request a specific model or reasoning effort in your prompt,
configure `[agents]` defaults in `config.toml`, or set `model` and
`model_reasoning_effort` directly in the custom agent file.
For example, use `gpt-5.6-terra` for fast scans or a higher-effort `gpt-5.6` configuration for more demanding reasoning.

For most tasks in Codex, start with
`gpt-5.6`. Use
`gpt-5.6-terra` when you want
a faster, lower-cost option for lighter subagent work.

#### Model choice

- **`gpt-5.6`**: Start here for demanding agents. It's strongest for ambiguous, multi-step work that needs planning, tool use, validation, and follow-through across a larger context.
- **`gpt-5.6-terra`**: Use for agents that favor speed and efficiency over depth, such as exploration, read-heavy scans, large-file review, or processing supporting documents. It works well for parallel workers that return distilled results to the main agent.
- **`gpt-5.6-luna`**: Use for fast, narrowly scoped agents handling clear, repeatable, or high-volume work.

#### Reasoning effort (`model_reasoning_effort`)

- **`ultra`**: Use for the deepest reasoning when the selected model supports
  it.
- **`max`** and **`xhigh`**: Use for especially demanding reasoning when the
  selected model supports these levels.
- **`high`**: Use when an agent needs to trace complex logic, check assumptions, or work through edge cases (for example, reviewer or security-focused agents).
- **`medium`**: A balanced default for most agents.
- **`low`**: Use when the task is straightforward and speed matters most.

Higher reasoning effort increases response time and token usage, but it can improve quality for complex work. For details, see [Models](https://learn.chatgpt.com/docs/models), [Config basics](https://learn.chatgpt.com/docs/config-file/config-basic), and [Configuration Reference](https://learn.chatgpt.com/docs/config-file/config-reference).

#### Orchestration and thread controls

ChatGPT or Codex handles orchestration across agents, including spawning new
subagents, routing follow-up instructions, waiting for results, and closing
agent threads.

When many agents are running, Codex waits until all requested results are
available, then returns a consolidated response.

At most intelligence levels, ChatGPT spawns agents after a direct request. With
Ultra, ChatGPT can also delegate proactively when parallel work is useful.

Current local Codex releases spawn agents after a direct request or applicable
project or skill instruction.

To see it in action, try the following prompt on your project:

```text
I would like to review the following points on the current PR (this branch vs main). Spawn one agent per point, wait for all of them, and summarize the result for each point.
1. Security issue
2. Code quality
3. Bugs
4. Race
5. Test flakiness
6. Maintainability of the code
```

#### Managing subagents

Open **Subagents** to see read-only **Active** and **Done** lists. Select a
completed subagent to inspect its details and result. The web sidebar reports
subagent activity; it doesn't provide controls to stop or steer an individual
subagent.

- Open a subagent thread from the activity shown in the main thread to inspect
  its work.
- Ask Codex directly to steer a running subagent, stop it, or close completed
  subagent threads.

- Use `/agent` in the CLI to switch between active agent threads and inspect the ongoing thread.
- Ask Codex directly to steer a running subagent, stop it, or close completed agent threads.

- When the background-agent panel is available, expand it to inspect status,
  stop active subagents, or open a subagent thread.
- Ask Codex directly to steer a running subagent, stop it, or close completed
  subagent threads.

#### Approvals and sandbox controls

Subagents inherit your current sandbox policy.

ChatGPT Work runs subagents in its hosted environment and doesn't expose a
local Codex sandbox or approval-mode control. Subagents use the tools available
to the parent chat. Website and connector permissions remain
tool-specific.

Subagents inherit the permission mode selected beneath the composer. Choose the
permission mode for the parent turn before you ask Codex to delegate work.

In interactive CLI sessions, approval requests can surface from inactive agent
threads even while you are looking at the main thread. The approval overlay
shows the source thread label, and you can press `o` to open that thread before
you approve, reject, or answer the request.

In non-interactive flows, or whenever a run can't surface a fresh approval, an
action that needs new approval fails and Codex surfaces the error back to the
parent workflow.

Codex also reapplies the parent turn's live runtime overrides when it spawns a
child. That includes sandbox and approval choices you set interactively during
the session, such as `/permissions` changes or `--yolo`, even if the selected
custom agent file sets different defaults.

Subagents inherit the permission mode selected beneath the composer. Choose
the permission mode for the parent turn before you ask Codex to delegate work.

You can also override the sandbox configuration for individual [custom agents](#custom-agents), such as explicitly marking one to work in read-only mode.

#### Custom agents

Codex ships with built-in agents:

- `default`: general-purpose fallback agent.
- `worker`: execution-focused agent for implementation and fixes.
- `explorer`: read-heavy codebase exploration agent.

To define your own custom agents, add standalone TOML files under
`~/.codex/agents/` for personal agents or `.codex/agents/` for project-scoped
agents.

Each file defines one custom agent. Codex loads these files as configuration
layers for spawned sessions, so custom agents can override the same settings as
a normal Codex session config. That can feel heavier than a dedicated agent
manifest, and the format may evolve as authoring and sharing mature.

Every standalone custom agent file must define:

- `name`
- `description`
- `developer_instructions`

If a custom agent file sets `model` or `model_reasoning_effort`, the value in
the file takes precedence. Before applying the file, Codex resolves each setting
from an explicit spawn value, then the corresponding `[agents]` default, then
the parent's value. If an explicit spawn request or an `[agents]` default
selects a model and neither supplies a reasoning effort, Codex uses
that model's default effort. A custom agent file that sets only `model`
preserves this previously resolved effort. Set `model_reasoning_effort` in the
file too if the selected model doesn't support that effort or you want a
different one. Other session settings, such as `sandbox_mode`, `mcp_servers`,
and `skills.config`, inherit from the parent when the custom agent file omits
them.

#### Global settings

Global subagent settings still live under `[agents]` in your [configuration](https://learn.chatgpt.com/docs/config-file/config-basic#configuration-precedence).

| Field                                       | Type    | Required | Purpose                                                             |
| ------------------------------------------- | ------- | :------: | ------------------------------------------------------------------- |
| `agents.enabled`                            | boolean |    No    | Enable or disable multi-agent tools.                                |
| `agents.max_concurrent_threads_per_session` | number  |    No    | Cap concurrently open spawned-agent threads, excluding the primary. |
| `agents.default_subagent_model`             | string  |    No    | Set the default model for spawned agents.                           |
| `agents.default_subagent_reasoning_effort`  | string  |    No    | Set the default reasoning effort for spawned agents.                |
| `agents.interrupt_message`                  | boolean |    No    | Record a model-visible message when an agent turn is interrupted.   |

**Notes:**

- `agents.enabled` defaults to `true`. Set it to `false` to disable multi-agent tools.
- When you leave `agents.max_concurrent_threads_per_session` unset, Codex chooses the default. Existing configurations can keep using `agents.max_threads` as a legacy alias.
- Explicit spawn values override `agents.default_subagent_model` and `agents.default_subagent_reasoning_effort`.
- `agents.interrupt_message` defaults to `true`. Set it to `false` to omit the model-visible interruption message from the agent's context.
- If a custom agent name matches a built-in agent such as `explorer`, your custom agent takes precedence.

#### Custom agent file schema

| Field                    | Type   | Required | Purpose                                                         |
| ------------------------ | ------ | :------: | --------------------------------------------------------------- |
| `name`                   | string |   Yes    | Agent name Codex uses when spawning or referring to this agent. |
| `description`            | string |   Yes    | Human-facing guidance for when Codex should use this agent.     |
| `developer_instructions` | string |   Yes    | Core instructions that define the agent's behavior.             |

You can also include other supported `config.toml` keys in a custom agent file, such as `model`, `model_reasoning_effort`, `sandbox_mode`, `mcp_servers`, and `skills.config`.

Codex identifies the custom agent by its `name` field. Matching the filename to
the agent name is the simplest convention, but the `name` field is the source
of truth.

#### Example custom agents

The best custom agents are narrow and opinionated. Give each one clear job, a
tool surface that matches that job, and instructions that keep it from
drifting into adjacent work.

#### Example 1: PR review

This pattern splits review across three focused custom agents:

- `pr_explorer` maps the codebase and gathers evidence.
- `reviewer` looks for correctness, security, and test risks.
- `docs_researcher` checks framework or API documentation through a dedicated MCP server.

Project config (`.codex/config.toml`):

```toml
[agents]
max_concurrent_threads_per_session = 8
```

`.codex/agents/pr-explorer.toml`:

```toml
name = "pr_explorer"
description = "Read-only codebase explorer for gathering evidence before changes are proposed."
model = "gpt-5.3-codex-spark"
model_reasoning_effort = "medium"
sandbox_mode = "read-only"
developer_instructions = """
Stay in exploration mode.
Trace the real execution path, cite files and symbols, and avoid proposing fixes unless the parent agent asks for them.
Prefer fast search and targeted file reads over broad scans.
"""
```

`.codex/agents/reviewer.toml`:

```toml
name = "reviewer"
description = "PR reviewer focused on correctness, security, and missing tests."
model = "gpt-5.6-terra"
model_reasoning_effort = "high"
sandbox_mode = "read-only"
developer_instructions = """
Review code like an owner.
Prioritize correctness, security, behavior regressions, and missing test coverage.
Lead with concrete findings, include reproduction steps when possible, and avoid style-only comments unless they hide a real bug.
"""
```

`.codex/agents/docs-researcher.toml`:

```toml
name = "docs_researcher"
description = "Documentation specialist that uses the docs MCP server to verify APIs and framework behavior."
model = "gpt-5.6-luna"
model_reasoning_effort = "medium"
sandbox_mode = "read-only"
developer_instructions = """
Use the docs MCP server to confirm APIs, options, and version-specific behavior.
Return concise answers with links or exact references when available.
Do not make code changes.
"""

[mcp_servers.openaiDeveloperDocs]
url = "https://developers.openai.com/mcp"
```

This setup works well for prompts like:

```text
Review this branch against main. Have pr_explorer map the affected code paths, reviewer find real risks, and docs_researcher verify the framework APIs that the patch relies on.
```

#### Example 2: Frontend integration debugging

This pattern is useful for UI regressions, flaky browser flows, or integration bugs that cross application code and the running product.

Project config (`.codex/config.toml`):

```toml
[agents]
max_concurrent_threads_per_session = 6
```

`.codex/agents/code-mapper.toml`:

```toml
name = "code_mapper"
description = "Read-only codebase explorer for locating the relevant frontend and backend code paths."
model = "gpt-5.6-luna"
model_reasoning_effort = "medium"
sandbox_mode = "read-only"
developer_instructions = """
Map the code that owns the failing UI flow.
Identify entry points, state transitions, and likely files before the worker starts editing.
"""
```

`.codex/agents/browser-debugger.toml`:

```toml
name = "browser_debugger"
description = "UI debugger that uses browser tooling to reproduce issues and capture evidence."
model = "gpt-5.6-terra"
model_reasoning_effort = "high"
sandbox_mode = "workspace-write"
developer_instructions = """
Reproduce the issue in the browser, capture exact steps, and report what the UI actually does.
Use browser tooling for screenshots, console output, and network evidence.
Do not edit application code.
"""

[mcp_servers.chrome_devtools]
url = "http://localhost:3000/mcp"
startup_timeout_sec = 20
```

`.codex/agents/ui-fixer.toml`:

```toml
name = "ui_fixer"
description = "Implementation-focused agent for small, targeted fixes after the issue is understood."
model = "gpt-5.3-codex-spark"
model_reasoning_effort = "medium"
developer_instructions = """
Own the fix once the issue is reproduced.
Make the smallest defensible change, keep unrelated files untouched, and validate only the behavior you changed.
"""

[[skills.config]]
path = "/Users/me/.agents/skills/docs-editor/SKILL.md"
enabled = false
```

This setup works well for prompts like:

```text
Investigate why the settings modal fails to save. Have browser_debugger reproduce it, code_mapper trace the responsible code path, and ui_fixer implement the smallest fix once the failure mode is clear.
```

### Projects and chats

Source: [Projects and chats](https://learn.chatgpt.com/docs/projects.md)

Use a project to organize related chats and give ChatGPT the context it needs.
The **Projects** view in the ChatGPT desktop app includes ChatGPT projects and
local projects that connect to folders on your computer.

#### Choose a project or start without one

Create a project when work will continue over time, produce more than one
output, or depend on the same files and sources. Start a chat without a project
when the work is self-contained and doesn't need shared project context.

Use a project to keep related chats, files, instructions, and sources together.
The same project can contain chats started with Chat or ChatGPT Work.

#### Choose a project or chat without one

Create a project when work will continue over time, produce more than one
output, or depend on the same files and sources. Start a chat without a project
when the work is self-contained and doesn't need shared project context.

Each project has a **Chats** section that lists project chats and a **Sources**
section for uploaded files and connected context. Project instructions apply
across its chats. A ChatGPT project doesn't provide direct access to a folder on
your computer, so upload or connect the sources you want ChatGPT to use.

With either option, start a new chat from the project to use its shared files and
instructions, then return to it under **Chats**.

Codex CLI treats the directory where you start it as the project for the chat.
Run `codex` from the directory you want Codex to work in, or pass
`--cd ` (`-C`) to set it explicitly. The CLI doesn't expose the
ChatGPT Projects view.

The IDE extension treats the folder or workspace open in your IDE as the local
project. In a multi-root workspace, select the workspace root for the chat. The
extension doesn't expose the ChatGPT Projects view from the web or desktop app.

#### Work in a project

The **Projects** view brings ChatGPT projects and local projects into one place.
ChatGPT projects carry project files and context across related chats. A local
project gives chats access to one or more folders on your computer, such as a
collection of source files or a codebase.

Start a separate chat for each distinct outcome so its messages and results stay
focused while the project keeps related work organized.

#### Work in a project

A ChatGPT project gives its chats access to the same uploaded files, project
instructions, and connected sources. Use Chat for a quick chat or
ChatGPT Work for a larger deliverable; both appear as chats in the project's
**Chats** section. Start a separate chat for each distinct outcome so its
messages and results stay focused while the project preserves shared context.

#### Work in a project directory

Start Codex from the directory that should provide the chat's file context. Use
`/new` to start a separate chat for each distinct outcome. Use `/resume` while
Codex is open, or run `codex resume`, to continue a saved chat.

The chat keeps its transcript and recorded working directory, while Codex reads
files from the current working tree. Keep durable project guidance in
`AGENTS.md` or checked-in documentation so it is available to future chats.

#### Work in a workspace

Open the folder or workspace that should provide the chat's file context. Start
a new chat for each distinct outcome, then select it from **Recent chats** to
continue it. Chats in the same project can work with the same files, while each
chat keeps its own transcript.

The current selection and open files provide context for the current turn. Keep
durable project guidance in `AGENTS.md` or checked-in documentation so it is
available to future chats.

#### Organize projects and chats

Keep active work visible and move finished work out of the way:

- **Pin a project** to keep it near the top of the sidebar. You can also pin it
  from the Projects view.
- **Pin a chat** when you return to it often, even if newer chats appear in the
  project.
- **Rename a chat** with a short title that describes its outcome, such as “Q3
  launch brief” or “Checkout accessibility review.”
- **Search projects** from the Projects view. Open **Search chats** from the
  sidebar to find a past chat when you remember a phrase or branch name but not
  the title. Search chats doesn't have a default shortcut, but you can assign
  one under **Settings > Keyboard Shortcuts**.
- **Archive a chat** when you finish the work. From a project's menu, select
  **Archive chats** to archive its chats together.

Pinning doesn't add context or change what ChatGPT can access. It only changes
where the project or chat appears in the sidebar.

Restore archived chats from **Settings > Archived chats**.

#### Organize projects and chats

Keep active work visible and move finished work out of the way:

- **Pin a project** to keep it near the top of the sidebar. You can also pin it
  from the Projects view.
- **Pin a chat** when you return to it often, even if newer chats appear in the
  project.
- **Rename a chat** with a short title that describes its outcome, such as “Q3
  launch brief” or “Checkout accessibility review.”
- **Search projects** from the Projects view. Search past chats with
  Cmd/Ctrl+K when you remember a phrase or
  branch name but not the title.
- **Archive a chat** when you finish the work.

Pinning doesn't add context or change what ChatGPT can access. It only changes
where the project or chat appears in the sidebar.

Restore archived chats from **Settings > Data Controls > Archived chats**.

#### Use local projects for folders and codebases

Add a local project when ChatGPT needs to read or change files on your computer.
Projects don’t need a folder, but you can attach folders as needed.

To add or change folders, open the project's menu and select **Edit project**.
Select **Add folder** to attach multiple folders. ChatGPT can read and change files
in every attached folder. To change the default working directory, point to a
folder and select **Make primary**.

New chats start in the primary folder. Codex also uses that folder as the
default for Git operations and automatic discovery of `AGENTS.md`, skills, and
`config.toml`. Secondary folders remain available for file search, reading, and
editing, but Codex doesn't automatically discover those project files from
secondary folders.

Use multiple folders when related work lives in different places, like an app and
its documentation or a website and its backend. Create separate projects for
unrelated work or when each chat should access only one part of a repository.
This keeps the working context focused. Remote projects currently support one
folder.

Use [local environments](https://learn.chatgpt.com/docs/environments/local-environment) to define setup
actions and common commands for a project. The [review
pane](https://learn.chatgpt.com/docs/code-review?surface=app) can show changes across repositories
attached to the same project. Pull request and
[worktree](https://learn.chatgpt.com/docs/environments/git-worktrees) actions target the primary
repository. When you start a chat in a worktree, the other folders remain
attached.

Projects and worktrees organize work, but the [sandbox](https://learn.chatgpt.com/docs/sandboxing)
enforces what local commands can read, change, or access over the network.

#### Start a chat without a project

Select **New chat** when the work is self-contained and doesn't need shared
project files, instructions, or folder access. Create a project first when
several chats will depend on the same context.

#### Start a chat without a project

Start a chat from ChatGPT Home when the chat doesn't need shared project
files, instructions, or sources. You can use Chat or ChatGPT Work; on the web,
both create chats.

If the work grows, move it into a project and use clear chat names for each
outcome. A project can hold parallel chats for research, drafting, review, and
follow-up without mixing every message into one context.

#### Use Quick chat for a quick question

Quick chat opens an ordinary ChatGPT chat. ChatGPT chats don't appear in the
Codex sidebar, which contains your Codex chats and projects.

Point to **New chat**, then select the **Quick chat** icon on its right. You can
also press

Cmd+Option+N on macOS or Ctrl+Alt+N on Windows and Linux.
From **New chat**, you can open an existing ChatGPT chat and add it to a Codex
chat.

#### Bring in other tools and context

- Attach files or [image inputs](https://learn.chatgpt.com/docs/image-inputs) directly to a chat
  when they apply only to that request.
- Install [plugins](https://learn.chatgpt.com/docs/plugins) to bring in context and actions from other
  services.
- Configure [MCP](https://learn.chatgpt.com/docs/extend/mcp) servers when your organization or developer setup
  exposes tools through Model Context Protocol.
- Use [memories](https://learn.chatgpt.com/docs/customization/memories), where available, to carry useful context from
  past work into future chats.

- Pass [image inputs](https://learn.chatgpt.com/docs/image-inputs) to a chat when visual context applies
  only to that request.
- Install [plugins](https://learn.chatgpt.com/docs/plugins) to bring in context and actions from other
  services.
- Configure [MCP](https://learn.chatgpt.com/docs/extend/mcp) servers when your organization or developer setup
  exposes tools through Model Context Protocol.
- Use [memories](https://learn.chatgpt.com/docs/customization/memories), where available, to carry useful context from
  past work into future chats.

- Reference open files or select code in the editor to add context for the
  current turn.
- Configure [MCP](https://learn.chatgpt.com/docs/extend/mcp) servers when your organization or developer setup
  exposes tools through Model Context Protocol.
- Use [memories](https://learn.chatgpt.com/docs/customization/memories) from the connected Codex host, where
  available, to carry useful context into future chats.

- Add files and connected sources to the project's **Sources** section when they
  should be available across its chats.
- Attach files or [image inputs](https://learn.chatgpt.com/docs/image-inputs) directly to a chat when
  they apply only to that chat.
- In ChatGPT Work, install [plugins](https://learn.chatgpt.com/docs/plugins) to bring in context and
  actions from other services.
- Use [memories](https://learn.chatgpt.com/docs/customization/memories), where available, to carry useful context from
  past work into future chats.

#### Next steps

- [Learn how to write and refine prompts](https://learn.chatgpt.com/docs/prompting)
- [Learn how to use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt)
- [Continue long-running work](https://learn.chatgpt.com/docs/long-running-work)

### Speed

Source: [Speed](https://learn.chatgpt.com/docs/agent-configuration/speed.md)

ChatGPT Work and Codex share usage. Both use the same
pricing, credits, and usage limits. See [Codex pricing](https://learn.chatgpt.com/docs/pricing) for
details.

#### Fast mode

Codex offers the ability to increase the speed of the model for increased
credit consumption.

For GPT-5.6, GPT-5.5, and GPT-5.4, Fast mode increases model speed by 1.5x.
GPT-5.6 and GPT-5.5 consume credits at 2.5x the Standard rate; GPT-5.4 consumes
credits at 2x the Standard rate.

GPT-6 Astra Fast mode consumes credits at 2.5x the Standard rate where
available. See [Models](https://learn.chatgpt.com/docs/models) for model availability and
[Pricing](https://learn.chatgpt.com/docs/pricing#token-rates) for token rates.

Use `/fast on`, `/fast off`, or `/fast status` in the CLI to change or inspect
the current setting. You can also persist the default with `service_tier =
"fast"` plus `[features].fast_mode = true` in `config.toml`. Fast mode is
available in the ChatGPT desktop app, Codex CLI, and IDE extension when you
sign in with ChatGPT. Fast mode is a ChatGPT credit feature. With an API key,
Codex uses API token pricing instead, and ChatGPT credit multipliers don't
apply. API Priority processing has its own billing rate; for GPT-5.6, it costs
2x the Standard API token rate.

#### Codex-Spark

GPT-5.3-Codex-Spark is a separate fast, less-capable Codex model optimized for
near-instant, real-time coding iteration. Unlike fast mode, which speeds up a
supported model at a higher credit rate, Codex-Spark is its own model choice
and has its own usage limits.

During research preview Codex-Spark is only available for ChatGPT Pro subscribers.

### Developers

Source: [Developers](https://learn.chatgpt.com/docs/developers.md)

Use Codex with codebases, development environments, automation, and your team's tools.

Codex supports everyday code work and deeper integrations across local and cloud environments. Its developer workflows span code review, the integrated terminal, reusable skills and plugins, automation with the SDK and App Server, team tools, and reference material for each surface.

[Explore workflows](https://learn.chatgpt.com/docs/code-review?surface=app)

#### Development workflows

Review changes and work with development tools in ChatGPT.

- [Code review](https://learn.chatgpt.com/docs/code-review): Review changes and address feedback before you ship.

- [Integrated terminal](https://learn.chatgpt.com/docs/integrated-terminal): Run commands and inspect output inside the ChatGPT desktop app.

#### Extend and automate

Package development workflows and run deterministic automation.

- [Build skills](https://learn.chatgpt.com/docs/build-skills): Package instructions and resources for repeatable tasks in ChatGPT and Codex.

- [Build plugins](https://learn.chatgpt.com/docs/build-plugins): Package skills and MCP servers for ChatGPT and Codex.

- [Site tools (WebMCP)](https://learn.chatgpt.com/docs/webmcp): Use WebMCP to give AI agents a direct way to work with your website.

- [Hooks](https://learn.chatgpt.com/docs/hooks): Run custom commands when Codex emits lifecycle events.

#### Environments

Choose where development work runs and how it is isolated.

- [Environments](https://learn.chatgpt.com/docs/environments/modes): Compare local, cloud, and other ways to run a task.

- [Local environments](https://learn.chatgpt.com/docs/environments/local-environment): Configure setup scripts and actions for projects and worktrees.

- [Cloud environment](https://learn.chatgpt.com/docs/environments/cloud-environment): Delegate work to a configured cloud environment.

- [Git worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees): Isolate parallel changes in separate working trees.

#### Build with Codex

Add Codex to products, systems, and automated workflows.

- [Codex SDK](https://learn.chatgpt.com/docs/codex-sdk): Control Codex programmatically from your application.

- [App Server](https://learn.chatgpt.com/docs/app-server): Integrate with the protocol that powers Codex clients.

- [MCP Server](https://learn.chatgpt.com/docs/mcp-server): Expose Codex capabilities through Model Context Protocol.

- [GitHub Action](https://learn.chatgpt.com/docs/github-action): Run Codex from GitHub Actions workflows.

- [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode): Run Codex from scripts and other automated systems.

#### Third-party integrations

Delegate and track work from tools your team already uses.

- [GitHub](https://learn.chatgpt.com/docs/third-party/github): Assign work, review changes, and move toward a pull request.

- [GitLab (Beta)](https://learn.chatgpt.com/docs/third-party/gitlab): Connect projects, delegate work, and review merge requests.

- [Slack](https://learn.chatgpt.com/docs/third-party/slack): Start Codex chats from external discussions and return results.

- [Linear](https://learn.chatgpt.com/docs/third-party/linear): Assign issues to Codex and follow work through delivery.

#### Reference

Find commands, settings, and plugin submission errors for developer surfaces.

- [CLI customization](https://learn.chatgpt.com/docs/cli-customization): Adjust syntax highlighting, themes, and shell behavior.

- [Developer commands](https://learn.chatgpt.com/docs/developer-commands?surface=app): Use commands and slash commands in the desktop app, Codex CLI, and IDE extension.

- [Developer settings](https://learn.chatgpt.com/docs/developer-settings?surface=app): Configure the desktop app, Codex CLI, and IDE extension for development.

### Get started with ChatGPT Work

Source: [Get started with ChatGPT Work](https://learn.chatgpt.com/docs/get-started-with-work.md)

#### Introducing ChatGPT Work

ChatGPT Work is a way to delegate real work to ChatGPT.

Use Chat when you want an answer, explanation, brainstorm, or short draft.
Use ChatGPT Work when you want ChatGPT to complete a task with a clear outcome, such as a
brief, deck, analysis, recurring update, workflow, or file you can review and
use. Learn more about [using Chat and ChatGPT Work together](https://learn.chatgpt.com/docs/use-chatgpt).

ChatGPT Work can use your files, plugins, and approved tools to retrieve information,
create finished files, run workflows, and complete work that is ready for you to
review. You can follow progress, answer questions, change direction, and
approve important actions.

On the [desktop app](https://learn.chatgpt.com/docs/app), ChatGPT Work can also use local files, apps, and the
browser when those tools are available.

If you have used Codex for non-coding work, you can stay in Codex or use
ChatGPT Work instead. ChatGPT Work gives you the same core capabilities with
an experience designed for everyday work.

#### What to try first

First, switch to **Work**. Then choose your first task.
Good tasks have a clear outcome, a few source materials, and an output you can
review.

#### Choose local or cloud work

In the desktop app, open the composer control labeled **Work locally**. If
**Cloud** appears as an option, choose it when you want ChatGPT Work to keep
running after you close the app or turn off your computer, or when you want to
continue the chat from the web or mobile app. Keep **Work locally** selected when
the task needs files or apps on your computer.

Cloud is also useful for scheduled tasks that research or check websites over
time because their runs don't depend on your computer being awake.

Here are three common use cases you can get started with:

#### Create a presentation

Use ChatGPT Work to turn notes, docs, research, or meeting materials into a structured
deck.

#### Create a comparison spreadsheet

Use ChatGPT Work to turn notes, files, or research into a spreadsheet that compares
options and helps you make a decision.

#### Set up a recurring update

Use scheduled tasks when you want ChatGPT Work to repeat, monitor, or refresh something
over time.

Learn more about [scheduled tasks](https://learn.chatgpt.com/docs/automations?surface=app).

#### Best practices for using ChatGPT Work

Use ChatGPT Work when you want ChatGPT to complete a task, create a file, or manage work
over time. It is a good fit for tasks that:

- Use multiple sources, plugins, tools, or steps.
- Would take meaningful time to complete manually.
- Produce an output you will review, edit, or reuse.
- Need to be repeated, monitored, or updated over time.

To get a better result, tell ChatGPT the outcome you need, the sources or plugins
to use, any constraints to follow, what good looks like, and when to stop for
review or approval.

**Instead of:** Make me a presentation about our customer research.

Learn more about [prompting for ChatGPT Work](https://learn.chatgpt.com/docs/prompting#prompting-for-work).

#### Add plugins for more context and better outputs

Plugins connect ChatGPT Work to tools your team uses, like Slack, Google Drive,
SharePoint, email, calendars, customer relationship management systems, and
project trackers.

- Select **Plugins** in the left sidebar to view the plugins library.
- Install the plugins most relevant to your work.
- To point ChatGPT to a specific tool, type `@` and the plugin name in your prompt.

Learn more about [plugins](https://learn.chatgpt.com/docs/plugins).

#### Use ChatGPT Work efficiently

Choose [GPT-6 Astra](https://learn.chatgpt.com/docs/models#gpt-6-astra) for demanding work that needs
careful reasoning, visual judgment, or a polished final file. For simpler tasks,
consider Sol, Terra, or Luna. Select from the models
available in your model selector and check [plan usage](https://learn.chatgpt.com/docs/pricing)
before starting a large task.

ChatGPT Work is best for substantial tasks that involve multiple steps, sources, or
tools, or require a completed deliverable. Longer or more complex tasks may use
more credits because ChatGPT is doing more on your behalf. Focus on the value of
the completed result, rather than the number of prompts.

Keep the task focused by setting useful boundaries. For example: “use only
these sources,” “compare the top five options,” or “stop before sending
anything.”

Use Chat instead for quick questions, short rewrites, and decisions where you
only need advice.

Learn more about [working efficiently](https://learn.chatgpt.com/docs/prompting#prompting-for-work).

If a task pauses for a safety review, follow the notice and review any available
findings before continuing. See [safety monitoring and paused tasks](https://learn.chatgpt.com/docs/agent-approvals-security#safety-monitoring-and-paused-tasks).

#### More use cases

Explore practical ChatGPT Work workflows for common teams and tasks.

### Long-running work

Source: [Long-running work](https://learn.chatgpt.com/docs/long-running-work.md)

For work that may take many steps, give ChatGPT a clear outcome, constraints,
and definition of done. Keep related work in the same chat so
ChatGPT can use the same context to choose the next step and decide when the
work is complete.

In the ChatGPT desktop app, enter `/goal` to start Goal mode. The progress row
lets you pause, resume, edit, or clear the goal while ChatGPT works.

For hosted long-running work in ChatGPT web, use ChatGPT Work and put the
outcome, constraints, and review criteria directly in your prompt.

Continue in the same web chat to add context, change constraints, or
ask for a status update. Use separate chats when independent tasks can run in
parallel, and avoid giving two tasks write access to the same connected source.
For related work, keep the chats and source files together in a
[project](https://learn.chatgpt.com/docs/projects).

In an interactive Codex CLI session, enter `/goal` to start Goal mode. Continue
the same session to steer the work or ask for a status update.

In the IDE extension chat, enter `/goal` to start Goal mode for the open
workspace. Continue the same chat to steer the task while it runs.

#### Start a goal

Type `/goal` in the ChatGPT desktop app, Codex CLI, or the IDE extension. The
goal text becomes both the first prompt and the completion criteria for the
task.

If the outcome is still unclear, start with `/plan`. Ask ChatGPT to interview you,
identify constraints, and turn the result into a goal with measurable success
criteria. Then start the refined goal with `/goal`.

#### Define what done means

Write a goal that lets ChatGPT verify its own progress. Include three things when
they apply:

| Goal element     | What to include                                                               |
| ---------------- | ----------------------------------------------------------------------------- |
| **Outcome**      | Describe the result you want, not only the activity ChatGPT should perform.   |
| **Constraints**  | Name required tools, boundaries, compatibility needs, or approaches to avoid. |
| **Verification** | Add tests, measurements, or review criteria that prove the work is complete.  |

For example:

```text
Migrate this codebase from JavaScript to TypeScript. Preserve existing behavior,
compile in strict mode without explicit `any` types, and make the full test suite pass.
```

#### Steer a running goal

In the ChatGPT desktop app, the goal progress row appears above the composer. Use it to
pause or resume work, edit the goal, or clear it. You can also send follow-up
messages while the goal runs to add context or adjust constraints.

Use a side chat when you want a status recap or an explanation without
interrupting the main chat. Pause the goal before you expect to lose
connectivity, then resume it when you're ready for ChatGPT to continue.

#### Steer running work

Continue in the same chat to add context, adjust constraints, or ask
for a status recap. Start a separate chat when another task can run
independently.

#### Steer a running goal

Send a follow-up message in the same interactive session to add context or
adjust constraints. Ask for a status recap when you want Codex to summarize
progress before it continues.

#### Steer a running goal

Continue in the same IDE chat to add context, adjust constraints, or ask for a
status recap. Keep the workspace available while the goal is running.

Starting a goal doesn't grant ChatGPT broader access. It keeps the same
[sandbox and approval policy](https://learn.chatgpt.com/docs/sandboxing) and pauses when it
needs a decision. With [automatic approval
reviews](https://learn.chatgpt.com/docs/sandboxing/auto-review), a separate reviewer can
evaluate eligible requests without expanding those boundaries.

#### Run goals in parallel

Each chat keeps its own context, messages, results, and goal. Run chats
concurrently, but avoid letting two chats change the same files. Use
[worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees) to give parallel coding chats separate
checkouts.

For local work, turn on **Prevent sleep while running** in settings so your Mac
stays awake. Use [Pets](https://learn.chatgpt.com/docs/pets?surface=app) or [system
notifications](https://learn.chatgpt.com/docs/notifications?surface=app) to see when a chat needs input
or is ready for review.

#### Related docs

- [Projects and chats](https://learn.chatgpt.com/docs/projects)
- [Goal mode and prompting](https://learn.chatgpt.com/docs/prompting#goal-mode)
- [Git worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees)

#### Related docs

- [Projects and chats](https://learn.chatgpt.com/docs/projects)
- [Scheduled tasks](https://learn.chatgpt.com/docs/automations)
- [Sandbox and permissions](https://learn.chatgpt.com/docs/sandboxing)

### Prompting

Source: [Prompting](https://learn.chatgpt.com/docs/prompting.md)

#### Prompting overview

Prompting is how you tell ChatGPT what you want to know, make, or change. A prompt
can be a question, an instruction, or a goal. You don't need technical syntax or
a rigid formula. Start in your own words, review the response, and use follow-up
messages to shape the result.

A short prompt is often enough. For larger or more important tasks, include the
parts that matter:

- **Goal:** What should ChatGPT do?
- **Context:** What information or sources will help?
- **Output:** What format, length, or level of detail do you need?
- **Boundaries:** What must stay unchanged? What should ChatGPT avoid or check
  with you before it acts?

Use only the parts that help. You don't need to fill in every item or follow a
required format.

#### Describe the result you need

Start with the result, not a detailed list of steps. Include the audience or
format when those details change what ChatGPT should produce.

```text
Turn these meeting notes into a short update for the project team.
Put the decisions and next steps first.
```

This prompt explains what to create and who will read it. Describe a process when
the process itself matters. Otherwise, leave ChatGPT room to search, compare
information, and adjust its approach.

#### Add useful context

Share the information that could change the result. Add only the sources that
matter, and explain what ChatGPT should take from each one.

- Attach documents, spreadsheets, presentations, or PDF files when you want
  ChatGPT to summarize, compare, transform, or [create files for review](https://learn.chatgpt.com/docs/artifacts-viewer).
- Add a screenshot, diagram, or other [image input](https://learn.chatgpt.com/docs/image-inputs) when the
  task depends on visual context. Point out the area that matters instead of
  relying on the image alone.
- Ask ChatGPT to use [web search](https://learn.chatgpt.com/docs/web-search) when the answer depends on
  current information, and ask for sources when you need to check the result.
- Use a [project](https://learn.chatgpt.com/docs/projects) when related chats should share files,
  sources, or a local folder.

#### Use connected sources

When ChatGPT has access to connected sources, name where it should look and what
it should find. You don't need to describe every search it should run.

```text
Use the latest project plan in Drive and relevant decisions and updates from
the project's Slack channel to prepare a status update.
```

Connected sources require the matching plugin, and availability can depend on
your plan and workspace settings.

#### Use plugins

Plugins give ChatGPT and Codex reusable instructions and connections to tools
such as Google Drive, Gmail, Slack, and GitHub. Both products draw public
plugins from the same universal directory. Ask for the result you need and let
the active surface choose from the tools available to it. In ChatGPT, type `@`
in the composer to choose a specific plugin.

[

    Find, install, and use plugins in ChatGPT and Codex.

](https://learn.chatgpt.com/docs/plugins)

#### Personalize ChatGPT

Put preferences that should apply across chats in **Settings > Personalization**
as custom instructions. Keep details that matter only to the current chat in the
prompt.

[

    Set a default personality, custom instructions, and other app preferences.

](https://learn.chatgpt.com/docs/reference/settings#personalization)

#### Set boundaries that prevent real problems

Boundaries are the few instructions ChatGPT needs to avoid creating extra work
or taking an action you didn't intend. Add one when changing the wrong detail
would make the result unusable, or when you want to review something before it
affects other people.

- Keep the approved dates and budget figures unchanged.
- Use only the supplied sources. Flag missing information instead of guessing.
- Keep recommendations within the stated budget.
- Prepare the message as a draft. Don't send it.

Focus on the one or two boundaries that matter most. You don't need to control
every step ChatGPT takes.

#### Make the result ready to use

Tell ChatGPT how you plan to use the result. This helps it choose the right
length, level of detail, and organization.

- Make this a one-page summary a director can scan before the meeting. Put the
  decision and next steps first.
- Turn these notes into a follow-up email with the decisions, owners, and due
  dates.
- Create a clear table of planned versus actual spending and highlight any
  difference over 10%.

For important work, ask ChatGPT for a final check, such as confirming every
action item has an owner and due date or flagging information it couldn't
verify. Then review the result yourself before you use or share it.

#### Improve the result with follow-up messages

Your first prompt doesn't need to be perfect. Review the result, then ask for
the specific change you want.

```text
Make the opening more direct, keep the evidence, and move the recommendation
above the background section.
```

You can add a missing source, correct the direction, ask for another option, or
change the level of detail without starting over.

#### Steering and queuing

When Codex is already working, you can send another message without waiting for
the current run to finish:

- **Steer** adds the message to the current run. Use it to change direction, add
  a missing detail, or share new information.
- **Queue** saves the message for the next run. Use it for a follow-up that should
  wait until the current work finishes.

In the ChatGPT desktop app, choose the default under
[**Settings > General > Follow-up behavior**](https://learn.chatgpt.com/docs/reference/settings#general).
Queued messages appear above the composer, where you can edit, reorder, send, or
delete them. The setting also shows the shortcut for using the other behavior
for one message without changing your default.

In Codex CLI, press Enter while Codex is working to steer the current
turn, or press Tab to queue the message for the next turn. See the
[interactive shortcuts](https://learn.chatgpt.com/docs/developer-commands?surface=cli#cli-interactive-shortcuts)
for details.

#### Put the pieces together

For a project update that uses connected sources, a complete prompt might look
like this:

```text
Prepare a one-page project status update for Monday's leadership meeting. Use
the latest project plan in Drive and relevant decisions and updates from the
project's Slack channel.

Lead with the decisions leadership needs to make and the next steps. Summarize
progress, risks, owners, and due dates. Keep approved dates and budget figures
unchanged. Flag any conflicting or missing information, and don't send or
publish anything.

Before you finish, check that every next step has an owner and due date.
```

This prompt covers the **Goal**, **Context**, **Output**, and **Boundaries**, then
asks for a final check without spelling out every step.

#### Use voice dictation

In the ChatGPT desktop app, press Ctrl+Shift+D while the composer is
visible, then start talking. ChatGPT transcribes your speech into the composer
so you can review and edit it before sending the prompt.

#### Prompting examples for Chat

Use Chat for questions, ideas, drafts, and everyday decisions. Start with the
outcome you want, then add detail only when it changes the answer.

#### Understand a topic

```text
Explain how compound interest works for someone who has never invested.
Use one concrete example and define any financial terms you introduce.
```

#### Draft and refine writing

```text
Draft a friendly email declining this invitation because I will be traveling.
Keep it under 120 words and leave the door open for a future event.
```

#### Compare options

```text
Compare these two phone plans for one person who travels internationally twice
a year. Show the important differences in a table, then recommend one and explain
the tradeoff.
```

#### Make a practical plan

```text
Plan five weekday dinners that take less than 30 minutes. Avoid peanuts, reuse
ingredients across meals, and finish with one consolidated shopping list.
```

#### Prompting for ChatGPT Work

Use Chat for quick questions, short rewrites, brainstorming, and lightweight
drafts. Use ChatGPT Work for tasks that draw on different sources or tools, involve a
sequence of steps, make changes, or produce a larger deliverable.

In ChatGPT Work, describe the result you need, provide the source material, name
the audience, and explain how you'll review the work. Ask ChatGPT to plan,
gather the needed information, create files, and check them before it finishes.

#### Use ChatGPT Work efficiently

ChatGPT Work is useful for time-consuming or recurring tasks, or for finished files you
can reuse. A task that uses more credits can still be worthwhile if it saves
time, improves quality, or helps you make an important decision.

Start with one result you can review:

- Include only relevant sources and limit the date range when appropriate.
- Define the audience, output format, and desired length.
- Separate required work from optional improvements or polish.
- Ask for a plan when the approach matters. Require your approval before ChatGPT
  sends, publishes, or changes information other people rely on.
- Narrow or stop the task if it starts doing work you no longer need.

Review the first result, refine the instructions, and reuse the workflow when
it works.

#### Turn source material into finished files

```text
Use the attached quarterly reports to create a leadership brief and a six-slide
presentation.

The audience is the executive team. Lead with the three decisions they need to
make, distinguish reported facts from your analysis, cite each number to its
source file, and check that the brief and slides agree before you finish.
```

#### Research a decision

```text
Research three customer-support platforms for a 50-person company. Compare
pricing, security, integrations, and migration effort using current sources.
Deliver a recommendation memo with links, assumptions, and the questions we
should answer before signing a contract.
```

#### Coordinate a launch

```text
Create a launch plan for the attached product brief. Include the timeline,
owners, dependencies, risks, announcement draft, customer FAQ, and a checklist
for launch day. Flag any missing decisions before producing the final files.
```

For recurring work, first refine the prompt in a normal chat. After the output is
reliable, [schedule a task inside that chat](https://learn.chatgpt.com/docs/automations#schedule-a-task-inside-a-chat).
Create a standalone scheduled task instead when each scheduled run should start
a new chat.

#### Prompting Codex

Use Codex when you want ChatGPT to work with code, a codebase, or developer tools.
A useful Codex prompt names the behavior you want, points to the relevant code or
reproduction steps, preserves important constraints, and says how to verify the
change.

For a multi-step task, enter `/plan` in the app composer when you want Codex to
investigate and propose an approach before editing. When [Goal mode](https://learn.chatgpt.com/docs/long-running-work)
is available, use `/goal` after the plan to set a persistent goal. See the [app slash
commands](https://learn.chatgpt.com/docs/reference/slash-commands)
for the current command list.

#### How to read these examples

Each workflow includes:

- **When to use it** and which Codex surface fits best (IDE, CLI, or cloud).
- **Steps** with example user prompts.
- **Context notes**: what Codex automatically sees vs what you should attach.
- **Verification**: how to check the output.

> **Note:** The IDE extension automatically includes your open files as context. In the CLI, mention paths explicitly, or attach files with `/mention` and `@` path autocomplete.

Codex runs local commands inside a [sandbox](https://learn.chatgpt.com/docs/sandboxing)
that limits file and network access. If a task needs to cross that boundary,
Codex follows your approval policy before continuing.

#### Explain a codebase

Use this when you are onboarding, inheriting a service, or trying to reason about a protocol, data model, or request flow.

#### Recipe: explain a codebase in IDE

1. Open the most relevant files.
2. Select the code you care about (optional but recommended).
3. Prompt Codex:

   ```text
   Explain how the request flows through the selected code.

   Include:
   - a short summary of the responsibilities of each module involved
   - what data is validated and where
   - one or two "gotchas" to watch for when changing this
   ```

Verification:

- Ask for a diagram or checklist you can verify:

```text
Summarize the request flow as a numbered list of steps. Then list the files involved.
```

#### Recipe: explain a codebase in CLI

1. Start an interactive session:

   ```bash
   codex
   ```

2. Attach the files (optional) and prompt:

   ```text
   I need to understand the protocol used by this service. Read @foo.ts @schema.ts and explain the schema and request/response flow. Focus on required vs optional fields and backward compatibility rules.
   ```

Context notes:

- You can use `@` in the composer to insert file paths from the workspace, or `/mention` to attach a specific file.

#### Fix a bug

Use this when you have a failing behavior you can reproduce locally.

#### Recipe: fix a bug in CLI

1. Start Codex at the repo root:

   ```bash
   codex
   ```

2. Give Codex a reproduction recipe, plus the file(s) you suspect:

   ```text
   Bug: Clicking "Save" on the settings screen sometimes shows "Saved" but doesn't persist the change.

   Repro:
   1) Start the app: npm run dev
   2) Go to /settings
   3) Toggle "Enable alerts"
   4) Click Save
   5) Refresh the page: the toggle resets

   Constraints:
   - Do not change the API shape.
   - Keep the fix minimal and add a regression test if feasible.

   Start by reproducing the bug locally, then propose a patch and run checks.
   ```

Context notes:

- Supplied by you: the repro steps and constraints (these matter more than a high-level description).
- Supplied by Codex: command output, discovered call sites, and any stack traces it triggers.

Verification:

- Codex should re-run the repro steps after the fix.
- If you have a standard check pipeline, ask it to run it:

```text
After the fix, run lint + the smallest relevant test suite. Report the commands and results.
```

#### Recipe: fix a bug in IDE

1. Open the file where you think the bug lives, plus its nearest caller.
2. Prompt Codex:

   ```text
   Find the bug causing "Saved" to show without persisting changes. After proposing the fix, tell me how to verify it in the UI.
   ```

#### Write a test

Use this when you want to define the exact scope to test.

#### Recipe: write a test in IDE

1. Open the file with the function.
2. Select the lines that define the function. Choose "Add to Codex Thread" from command palette to add these lines to the context.
3. Prompt Codex:

   ```text
   Write a unit test for this function. Follow conventions used in other tests.
   ```

Context notes:

- Supplied by "Add to Codex Thread" command: the selected lines (this is the "line number" scope), plus open files.

#### Recipe: write a test in CLI

1. Start Codex:

   ```bash
   codex
   ```

2. Prompt with a function name:

   ```text
   Add a test for the invert_list function in @transform.ts. Cover the happy path plus edge cases.
   ```

#### Prototype from a screenshot

Use this when you want to turn a design mock, screenshot, or UI reference into a working prototype.

#### CLI workflow (image + prompt)

1. Save your screenshot locally (for example `./specs/ui.png`).
2. Run Codex:

   ```bash
   codex
   ```

3. Drag the image file into the terminal to attach it to the prompt.

4. Follow up with constraints and structure:

   ```text
   Create a new dashboard based on this image.

   Constraints:
   - Use react, vite, and tailwind. Write the code in typescript.
   - Match spacing, typography, and layout as closely as possible.

   Outputs:
   - A new route/page that renders the UI
   - Any small components needed
   - README.md with instructions to run it locally
   ```

Context notes:

- The image provides visual requirements, but you still need to specify the implementation constraints (framework, routing, component style).
- Include behavior the image doesn't show in text, such as hover states, validation rules, or keyboard interactions.

Verification:

- Ask Codex to run the dev server (if allowed) and tell you exactly where to look:

```text
Start the dev server and tell me the local URL/route to view the prototype.
```

#### IDE extension workflow (image + existing files)

1. Attach the image in the Codex chat (drag-and-drop or paste).
2. Prompt Codex:

   ```text
   Create a new settings page. Use the attached screenshot as the target UI.
   Follow design and visual patterns from other files in this project.
   ```

#### Iterate on UI with live updates

Use this when you want a tight "design → tweak → refresh → tweak" loop while Codex edits code.

#### CLI workflow (run Vite, then iterate with small prompts)

1. Start Codex:

   ```bash
   codex
   ```

2. Start the dev server in a separate terminal window:

   ```bash
   npm run dev
   ```

3. Prompt Codex to make changes:

   ```text
   Propose 2-3 styling improvements for the landing page.
   ```

4. Pick a direction and iterate with small, specific prompts:

   ```text
   Go with option 2.

   Change only the header:
   - make the typography more editorial
   - increase whitespace
   - ensure it still looks good on mobile
   ```

5. Repeat with focused requests:

   ```text
   Next iteration: reduce visual noise.
   Keep the layout, but simplify colors and remove any redundant borders.
   ```

Verification:

- Review changes in the browser as Codex updates the code.
- Commit changes that you like and revert those that you don't.
- If you revert or change an edit, tell Codex so it doesn't overwrite your edit when it works on the next prompt.

#### Delegate refactor to the cloud

Use this when you want to design an approach with local context, then delegate the long implementation to a cloud chat that can run in parallel.

#### Local planning (IDE)

1. Make sure your current work is committed or at least stashed so you can compare changes cleanly.
2. Ask Codex to produce a refactor plan. If you have the `$plan` skill available, invoke it explicitly:

   ```text
   $plan

   We need to refactor the auth subsystem to:
   - split responsibilities (token parsing vs session loading vs permissions)
   - reduce circular imports
   - improve testability

   Constraints:
   - No user-visible behavior changes
   - Keep public APIs stable
   - Include a step-by-step migration plan
   ```

3. Review the plan and negotiate changes:

   ```text
   Revise the plan to:
   - specify exactly which files move in each milestone
   - include a rollback strategy
   ```

Context notes:

- Planning works best when Codex can scan the current code locally (entrypoints, module boundaries, dependency graph hints).

#### Cloud delegation (IDE → Cloud)

1. If you haven't already done so, set up a [Codex cloud environment](https://learn.chatgpt.com/docs/environments/cloud-environment).
2. Click on the cloud icon beneath the prompt composer and select your cloud environment.
3. When you enter the next prompt, Codex creates a new chat in the cloud that carries over the existing chat context (including the plan and any local source changes).

   ```text
   Implement Milestone 1 from the plan.
   ```

4. Review the cloud diff, iterate if needed.

5. Create a PR directly from the cloud or pull changes locally to test and finish up.

6. Iterate on additional milestones of the plan.

Tasks delegated to the cloud run in isolated environments. Internet access is
off during the agent phase unless you enable it for the environment. Learn more
about [cloud internet access](https://learn.chatgpt.com/docs/cloud/internet-access).

#### Do a local code review

Use this when you want a second set of eyes before committing or creating a PR.

#### CLI workflow (review your working tree)

1. Start Codex:

   ```bash
   codex
   ```

2. Run the review command:

   ```text
   /review
   ```

3. Optional: provide custom focus instructions:

   ```text
   /review Focus on edge cases and security issues
   ```

Verification:

- Apply fixes based on review feedback, then rerun `/review` to confirm you resolved the issues.

#### Review a GitHub pull request

Use this when you want review feedback without pulling the branch locally.

Before you can use this, enable Codex **Code review** on your repository. See [Code review](https://learn.chatgpt.com/docs/third-party/github).

#### GitHub workflow (comment-driven)

1. Open the pull request on GitHub.
2. Leave a comment that tags Codex with explicit focus areas:

   ```text
   @codex review
   ```

3. Optional: Provide more explicit instructions.

   ```text
   @codex review for security vulnerabilities and security concerns
   ```

#### Update documentation

Use this when you need an accurate, clear documentation change.

#### IDE or CLI workflow (local edits + local validation)

1. Identify the doc file(s) to change and open them (IDE) or `@` mention them (IDE or CLI).
2. Prompt Codex with scope and validation requirements:

   ```text
   Update the "advanced features" documentation to provide authentication troubleshooting guidance. Verify that all links are valid.
   ```

3. After Codex drafts the changes, review the documentation and iterate as needed.

Verification:

- Read the rendered page.
