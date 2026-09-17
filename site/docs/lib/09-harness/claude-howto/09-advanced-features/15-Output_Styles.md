---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "9d284cbcd4b5e3801c70ab1d57a43657096f7c13ceee6d3aa82cbe9b2263838e"
contentMode: "local-full"
zh: ""
---

## Output Styles

Output styles change **how** Claude responds, not what it knows. They modify the system prompt to set role, tone, and default response format. Reach for one when you keep re-prompting for the same voice every turn, or when you want Claude acting as something other than a software engineer.

For instructions about your project or codebase, use [CLAUDE.md](/lib/09-harness/claude-howto/02-memory) instead — that is a different mechanism with different tradeoffs.

### Built-in styles

| Style | Behavior |
|-------|----------|
| **Default** | The standard system prompt, tuned for completing software engineering tasks efficiently |
| **Proactive** | Claude executes immediately and makes reasonable assumptions instead of pausing for routine decisions. Stronger autonomous-execution guidance than auto mode, but it does **not** change your permission mode — you still see permission prompts |
| **Explanatory** | Adds educational "Insights" between steps, explaining implementation choices and codebase patterns |
| **Learning** | Collaborative learn-by-doing. Claude shares insights *and* leaves `TODO(human)` markers for you to implement small, strategic pieces yourself |
| **Concise** (v2.1.237) | Claude leads with the result and skips preamble and narration. Thoroughness is unchanged — only the framing around the answer is dropped. Select it in `/config` → Output style, or set `"outputStyle": "Concise"` |

### Selecting a style

Run `/config` and choose **Output style**. The selection is saved to `.claude/settings.local.json`. To set it without the menu, edit the setting directly:

```json
{
  "outputStyle": "Explanatory"
}
```

> **Note**: The standalone `/output-style` command was deprecated in v2.1.73 and **removed in v2.1.91**. Use `/config` or the `outputStyle` setting.

Output style is part of the system prompt, which Claude Code reads once at session start — changes take effect after `/clear` or in a new session.

### Custom output styles

A custom style is a Markdown file with frontmatter, saved at one of three levels:

- User: `~/.claude/output-styles/`
- Project: `.claude/output-styles/`
- Managed policy: `.claude/output-styles/` inside the managed settings directory

Project styles load from every `.claude/output-styles/` between the working directory and the repo root. As of v2.1.178, when nested directories define the same style name, the one closest to the working directory wins.

```markdown
---
name: Diagrams first
description: Lead every explanation with a diagram
keep-coding-instructions: true
---

When explaining code, architecture, or data flow, start with a Mermaid diagram
showing the structure, then explain in prose.
```

| Frontmatter | Purpose | Default |
|-------------|---------|---------|
| `name` | Style name, if not the file name | Inherits from file name |
| `description` | Shown in the `/config` picker | None |
| `keep-coding-instructions` | Keep Claude Code's built-in software engineering instructions | `false` |
| `force-for-plugin` | Plugin styles only: apply automatically whenever the plugin is enabled, overriding the user's `outputStyle` | `false` |

**Set `keep-coding-instructions: true`** when you are changing how Claude communicates but still want it coding the same way. Leave it out when Claude is not doing software engineering at all — a writing assistant or data analyst.

### Scope and cost

Output styles apply to the **main conversation only**. A subagent runs its own system prompt, so styles do not change how subagents respond; a fork is the exception, since it inherits the parent's full system prompt.

Adding instructions increases input tokens, though prompt caching absorbs most of that after the first request. Explanatory and Learning produce longer responses by design, which increases output tokens.

### How it compares

| Feature | How it works | Use it when |
|---------|--------------|-------------|
| Output styles | Modifies the system prompt | You want a different role, tone, or format every turn |
| [CLAUDE.md](/lib/09-harness/claude-howto/02-memory) | Adds a user message after the system prompt | Claude should always know your project conventions |
| `--append-system-prompt` | Appends to the system prompt without removing anything | A one-off addition for a single invocation |
| [Subagents](/lib/09-harness/claude-howto/04-subagents) | Runs with its own system prompt, model, and tools | You want a separately scoped helper |
| [Skills](/lib/09-harness/claude-howto/03-skills) | Loads task-specific instructions when invoked | You have a reusable workflow |
