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
pageSha256: "9a3ebf3239baa87562b56439582c2a104d52e1c30b77fe685d4224bc24464335"
contentMode: "local-full"
zh: ""
---

## Bundled skills

Claude Code includes a set of bundled skills, such as `/doctor`, `/code-review`, `/batch`, `/debug`, `/loop`, and `/claude-api`. Bundled skills are prompt-based: they give Claude detailed instructions and let it orchestrate the work using its tools. Most built-in commands instead execute fixed logic directly.

You invoke a bundled skill the same way as any other skill, by typing `/` followed by the skill name. Claude invokes some bundled skills automatically when relevant; others, including `/verify`, run only when you invoke them, which keeps you in control of when these longer-running checks spend time and tokens.

Most bundled skills are available in every session. A few depend on a specific feature: `/workflow-authoring`, for example, is available only when [dynamic workflows](https://code.claude.com/docs/en/workflows) are enabled.

To turn bundled skills off, use the [`disableBundledSkills`](https://code.claude.com/docs/en/settings-reference#disablebundledskills) setting.

  The [`/doctor`](https://code.claude.com/docs/en/commands#all-commands) setup checkup stays typable when `disableBundledSkills` is on, in Claude Code v2.1.205 and later. To hide it, set the `DISABLE_DOCTOR_COMMAND` environment variable or a [`skillOverrides`](#override-skill-visibility-from-settings) entry of `"doctor": "off"`. Before v2.1.205, `/doctor` was a built-in command rather than a bundled skill.

Bundled skills are listed alongside built-in commands in the [commands reference](https://code.claude.com/docs/en/commands), marked **Skill** in the Purpose column.

### Run and verify your app

Three bundled skills work together to launch your app and confirm changes against the running app instead of just tests:

| Skill                  | Purpose                                                                                                           |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `/run`                 | Launch and drive your app to see a change working                                                                 |
| `/verify`              | Build and run your app to confirm a code change does what it should, without falling back to tests or type checks |
| `/run-skill-generator` | Teach `/run` and `/verify` how to build and launch your project                                                   |

`/run` and `/verify` work without setup. They infer the launch from your project type (CLI, server, TUI, browser-driven) and from what's in your README, `package.json`, or `Makefile`. That inference gets unreliable for projects that need anything beyond a standard launch: a database, an env file, a graphical session, a multi-step build.

`/run-skill-generator` records the recipe instead. It gets your app running from a clean environment, captures what worked (the install commands, the env vars, the launch script), and commits it as a per-project skill at `.claude/skills/run-<name>/`. After that, `/run`, `/verify`, and any other agent in the repo follow the recorded recipe instead of rediscovering it. Run `/run-skill-generator` once per project, and again if the build or launch process changes.

`/verify` can also record its own recipe. When it has to build and drive your app without a recorded recipe, it writes what worked to `.claude/skills/verify/SKILL.md` at the repo root, or in the touched package directory in a monorepo, so later runs and other agents follow the same steps. At the repo root, the recorded skill replaces the bundled `/verify`. This requires Claude Code v2.1.200 or later.

Claude edits the recorded file only when it steered a run wrong, such as a command that failed or a missing step, so you can commit the file without per-session diffs. Before v2.1.205, the bundled skill told Claude to fold in anything a run learned, which caused frequent merge conflicts.
