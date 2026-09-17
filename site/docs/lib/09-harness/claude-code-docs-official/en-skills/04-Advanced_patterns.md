---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/skills.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/skills.md"
sourceSha256: "6cb66d6c1ab6b06eda6dd6854f4133901c8daef8fc447f59fe65ac4038ec8043"
pageSha256: "f96a374ea5a015f9522fea235ecb788dcfa4d10399d6ee235b7d5907743b2f52"
contentMode: "local-full"
zh: ""
---

## Advanced patterns

### Inject dynamic context

The `` !`<command>` `` syntax runs shell commands before the skill content is sent to Claude. The command output replaces the placeholder, so Claude receives actual data, not the command itself. Claude Code doesn't run these commands on your machine when the skill is [synced from your claude.ai account](#how-claude-code-handles-the-body-of-a-synced-skill). This restriction requires Claude Code v2.1.228 or later.

This skill summarizes a pull request by fetching live PR data with the GitHub CLI. The `` !`gh pr diff` `` and other commands run first, and their output gets inserted into the prompt:

```yaml theme={null}
---
name: pr-summary
description: Summarize changes in a pull request
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

## Pull request context
- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`
- Changed files: !`gh pr diff --name-only`

## Your task
Summarize this pull request...
```

Substitution runs once over the original file. Command output is inserted as plain text and is not re-scanned for further `` !`<command>` `` placeholders, so a command cannot emit a placeholder for a later pass to expand.

The inline form is only recognized when `!` appears at the start of a line or immediately after whitespace. If `!` follows another character, as in `` KEY=!`cmd` ``, the placeholder is left as literal text and the command does not run.

For multi-line commands, use a fenced code block opened with ` ```! ` instead of the inline form:

````markdown theme={null}
## Environment
```!
node --version
git status --short
```
````

To disable this behavior for skills and custom commands from user, project, plugin, or [additional-directory](#skills-from-additional-directories) sources, set `"disableSkillShellExecution": true` in [settings](https://code.claude.com/docs/en/settings). Each command is replaced with `[shell command execution disabled by policy]` instead of being run. Bundled and managed skills are not affected. This setting is most useful in [managed settings](https://code.claude.com/docs/en/managed-settings), where users cannot override it.

Claude Code never runs these commands on your machine when they appear in skills [synced from your claude.ai account](#how-synced-skills-behave), regardless of this setting. This restriction requires Claude Code v2.1.228 or later. [How Claude Code handles the body of a synced skill](#how-claude-code-handles-the-body-of-a-synced-skill) says what Claude receives in place of the command in each kind of session.

  To request deeper reasoning when a skill runs, include `ultrathink` anywhere in the skill content. See [Use ultrathink for one-off deep reasoning](https://code.claude.com/docs/en/model-config#use-ultrathink-for-one-off-deep-reasoning).

#### How injected commands run

Claude Code picks the tool that runs a skill's injected commands from the `shell` key in the skill's frontmatter and your environment. Every combination runs the commands through the Bash tool or the PowerShell tool, except one that fails the invocation outright:

* `shell: powershell`, with the [PowerShell tool](https://code.claude.com/docs/en/tools-reference#powershell-tool) enabled: the commands run through the PowerShell tool.
* `shell: bash` when bash isn't available: the invocation fails before any command runs. This happens on Windows without Git Bash. Claude Code shows ``Skill &lt;name> requires bash (`shell: bash` in frontmatter) but Git Bash was not found``.
* Any other combination: the commands run through the Bash tool when bash is available. When it isn't, they run through the PowerShell tool.

Either tool runs the commands the same way it runs Claude's own shell commands. They share the working directory, timeout, and output handling:

* **Working directory**: Claude Code runs each command in the session shell's current working directory. That directory moves when Claude runs `cd`. Use [`${CLAUDE_SKILL_DIR}` or `${CLAUDE_PROJECT_DIR\}`](#available-string-substitutions) in paths that must resolve the same way every time.
* **stderr**: with the default `bash` shell, Claude Code merges stderr into stdout. Anything the command writes to stderr appears in the injected text.
* **Timeout**: each command runs under the Bash tool's default 2-minute [timeout](https://code.claude.com/docs/en/tools-reference#timeout-and-output-limits). When the Bash tool [moves a timed-out command to the background](https://code.claude.com/docs/en/tools-reference#background-commands), the skill still renders. The injected text reports the move and names the background task and the file collecting the command's output. When the command is one the Bash tool never auto-backgrounds, Claude Code kills it at the timeout. That failure [aborts the invocation](#when-an-injected-command-fails).
* **Output size**: output past the Bash tool's inline ceiling arrives as a file path plus a short preview, not truncated text. [Output limits](https://code.claude.com/docs/en/tools-reference#output-limits) covers the ceiling and how to adjust each boundary.

The PowerShell tool applies the same timeout, backgrounding, and output-ceiling behavior to the commands it runs. See the [PowerShell tool](https://code.claude.com/docs/en/tools-reference#powershell-tool) section for its specifics.

#### When an injected command fails

A failed command aborts the entire skill invocation, not just its own placeholder. Claude never sees the skill content for that invocation. The abort shows `Shell command failed for pattern "..."`. The error message includes the command's output under `[stderr]`.

With the default `bash` shell, any non-zero exit code counts as a failure. One carveout applies: Claude Code treats exit code 1 from [search and comparison commands](https://code.claude.com/docs/en/tools-reference#output-limits) as a normal result and injects their output. Exit codes of 2 or higher fail even for those commands.

Which commands get the carveout depends on the shell:

* Default `bash` shell: the commands listed under [Output limits](https://code.claude.com/docs/en/tools-reference#output-limits)
* `shell: powershell`, when the PowerShell tool is enabled: a [different set](https://code.claude.com/docs/en/tools-reference#shell-selection-in-settings-hooks-and-skills) that includes `grep` and `git diff` but not `find` or `diff`

With the default `bash` shell, append `|| true` to any other command you expect to exit non-zero. A check script that exits 1 when it finds problems is one example.

Injected commands never prompt for permission. When a command's permission check returns anything other than allow, Claude Code aborts the invocation. This includes a rule that would normally ask you. The abort shows `Shell command permission check failed for pattern "..."`.

To keep an unmatched command from aborting here, pre-approve it with [`allowed-tools`](#pre-approve-tools-for-a-skill). A matching ask or deny rule still aborts the invocation regardless of `allowed-tools`. See [Manage permissions](https://code.claude.com/docs/en/permissions#manage-permissions).

### Run skills in a subagent

Add `context: fork` to your frontmatter when you want a skill to run in isolation. The skill content becomes the prompt that drives the subagent. It won't have access to your conversation history.

The forked subagent runs in the [background](https://code.claude.com/docs/en/sub-agents#run-subagents-in-foreground-or-background): you keep working while it runs, and its result arrives in your conversation when it completes. Set `background: false` in the frontmatter to instead wait for the result in the turn that invoked the skill. Before v2.1.218, forked skills always blocked the turn until they finished.

Claude Code also waits for the result, even when the skill doesn't set `background: false`, in cases like these:

* In non-interactive mode, with the `-p` flag or the Agent SDK
* When you set [`CLAUDE_CODE_DISABLE_BACKGROUND_TASKS`](https://code.claude.com/docs/en/env-vars) to `1`, which also turns off all other background task features
* When you invoke a forked skill while an earlier invocation of the same skill is still running
* When a [scheduled task](https://code.claude.com/docs/en/scheduled-tasks) fires with the skill as its prompt

A backgrounded fork also runs with the [narrower tool set that applies to background subagents](https://code.claude.com/docs/en/sub-agents#run-subagents-in-foreground-or-background): the skill's subagent is a regular agent type, so the exemption for subagents that fork the conversation doesn't cover it. If your skill's steps depend on a tool outside that set, set `background: false` to keep the full tool set.

A forked skill that runs in the background applies its edits outside your session's [checkpoints](https://code.claude.com/docs/en/checkpointing), so `/rewind` doesn't undo them; use git to revert them.

  `context: fork` only makes sense for skills with explicit instructions. If your skill contains guidelines like "use these API conventions" without a task, the subagent receives the guidelines but no actionable prompt, and returns without meaningful output.

Skills and [subagents](https://code.claude.com/docs/en/sub-agents) work together in two directions:

| Approach                     | System prompt            | Task                        | Also loads                                          |
| :--------------------------- | :----------------------- | :-------------------------- | :-------------------------------------------------- |
| Skill with `context: fork`   | From agent type          | SKILL.md content            | CLAUDE.md, except when the agent is Explore or Plan |
| Subagent with `skills` field | Subagent's markdown body | Claude's delegation message | Preloaded skills + CLAUDE.md                        |

With `context: fork`, you write the task in your skill and pick an agent type to execute it. The built-in Explore and Plan agents [skip CLAUDE.md and git status](https://code.claude.com/docs/en/sub-agents#what-loads-at-startup) to keep their context small, so a forked skill using `agent: Explore` sees only the SKILL.md content and the agent's own system prompt. For the inverse, where you define a custom subagent that uses skills as reference material, see [Subagents](https://code.claude.com/docs/en/sub-agents#preload-skills-into-subagents).

#### Example: Research skill using Explore agent

This skill runs research in a forked Explore agent. The skill content becomes the task, and the agent provides read-only tools optimized for codebase exploration:

```yaml theme={null}
---
name: deep-research
description: Research a topic thoroughly
context: fork
agent: Explore
---

Research $ARGUMENTS thoroughly:

1. Find relevant files using Glob and Grep
2. Read and analyze the code
3. Summarize findings with specific file references
```

When this skill runs:

1. A new isolated context is created
2. The subagent receives the skill content as its prompt ("Research \$ARGUMENTS thoroughly...")
3. The `agent` field determines the execution environment (model, tools, and permissions)
4. The subagent summarizes its results and returns them to your main conversation when it finishes

The `agent` field specifies which subagent configuration to use. Options include built-in agents (`Explore`, `Plan`, `general-purpose`) or any custom subagent from `.claude/agents/`. If omitted, uses `general-purpose`.

### Restrict Claude's skill access

By default, Claude can invoke any skill that doesn't have `disable-model-invocation: true` set. Skills that define `allowed-tools` grant Claude access to those tools without per-use approval during the turn that invokes the skill; the grant clears when you send your next message. Your [permission settings](https://code.claude.com/docs/en/permissions) still govern baseline approval behavior for all other tools. A few built-in commands are also available through the Skill tool, including `/init` and `/security-review`. Other built-in commands such as `/compact` are not.

Three ways to control which skills Claude can invoke:

**Disable all skills** by denying the Skill tool in `/permissions`:

```text theme={null}
# Add to deny rules:
Skill
```

**Allow or deny specific skills** using [permission rules](https://code.claude.com/docs/en/permissions):

```text theme={null}
# Allow only specific skills
Skill(commit)
Skill(review-pr *)

# Deny specific skills
Skill(deploy *)
```

Permission syntax: `Skill(name)` for exact match, `Skill(name *)` for prefix match with any arguments.

If your `deny` rule names an alias or an unqualified name rather than the skill's own name, Claude Code still blocks the skill: with `Skill(review)` it blocks the bundled `/code-review` through its `/review` alias, and with `Skill(deploy)` it blocks a [nested skill](#where-skills-live) listed as `apps/web:deploy` through its unqualified name. Before v2.1.260, Claude Code didn't block a nested skill listed under its qualified name when the deny rule named only the unqualified name.

Claude Code matches an `allow` rule only against the skill's own name and the name in Claude's invocation.

**Hide individual skills** by adding `disable-model-invocation: true` to their frontmatter. This removes the skill from Claude's context entirely.

  With `user-invocable: false`, you can't invoke the skill, but Claude still can. To keep Claude from invoking it through the Skill tool, set `disable-model-invocation: true`.

### Override skill visibility from settings

The `skillOverrides` setting controls skill visibility from your [settings](https://code.claude.com/docs/en/settings) instead of the skill's own frontmatter. Use it for skills whose SKILL.md you don't want to edit, such as ones checked into a shared project repo. The `/skills` menu writes it for you: highlight a skill and press `Space` to cycle states, then `Esc` to save to `.claude/settings.local.json`.

Each key is a skill name and each value is one of four states:

| Value                   | Listed to Claude     | In `/` menu |
| :---------------------- | :------------------- | :---------- |
| `"on"`                  | Name and description | Yes         |
| `"name-only"`           | Name only            | Yes         |
| `"user-invocable-only"` | Hidden               | Yes         |
| `"off"`                 | Hidden               | Hidden      |

The `/skills` menu labels the `"user-invocable-only"` state `user-only`.

As of v2.1.199, `"off"` also hides the skill from the command lists advertised to [Remote Control](https://code.claude.com/docs/en/remote-control) clients and to [Agent SDK](https://code.claude.com/docs/en/agent-sdk/skills#discover-available-commands) callers, in addition to the terminal `/` menu. Invoking a hidden skill by its full name still returns the `skillOverrides` error instead of running it.

A skill that is absent from `skillOverrides` is treated as `"on"`. The example below collapses one skill to its name and turns another off entirely:

```json theme={null}
{
  "skillOverrides": {
    "legacy-context": "name-only",
    "deploy": "off"
  }
}
```

Some bundled skills have aliases, such as `checkup` for `/doctor`. If you set a `skillOverrides` entry under an alias in [managed settings](https://code.claude.com/docs/en/managed-settings) or in a file you pass with the `--settings` flag, Claude Code applies it to the skill behind the alias. You can only restrict a skill further through an alias, never make it more visible, and if you also set an entry under the skill's own name in managed settings, that entry takes precedence. Before v2.1.260, Claude Code didn't apply an entry under an alias to the skill in any settings source.

In user, project, and local settings, Claude Code matches entries against skill names only. If you set an entry for `review` there, it applies to a skill named `review`, not to the bundled `/code-review` through its `/review` alias.

Plugin skills are not affected by `skillOverrides`. Manage those through `/plugin` instead.

### Find unused skills

Every skill in the [skill listing](#skill-descriptions-are-cut-short) adds to your context on every turn, whether or not Claude ever uses it. Run `/skill-doctor` to see what each of your skills costs and how often it gets used, so you can decide which ones to turn off. In an interactive session, the report opens in the `/plugin` manager's **Stats** tab. In [non-interactive mode](https://code.claude.com/docs/en/headless) with `-p`, Claude Code prints it as text.

The report covers the skills in your session other than bundled skills and enterprise skills. It flags skills in the listing that have never been invoked and says where to turn them off. Of the skills it tells you where to turn off, start with the ones that have the highest context cost. The report also lists plugins you haven't used recently.

`/skill-doctor` requires Claude Code v2.1.252 or later and isn't available in sessions that skip [feature-flag fetching](https://code.claude.com/docs/en/env-vars#features-that-need-feature-flag-fetching). If you run `/skill-doctor` over [Remote Control](https://code.claude.com/docs/en/remote-control) from your phone or browser, Claude Code replies [`Skill usage reports are not available on this connection.`](https://code.claude.com/docs/en/errors#skill-usage-reports-are-not-available-on-this-connection) instead. Run `/skill-doctor` in the terminal on the machine where the session is running.
