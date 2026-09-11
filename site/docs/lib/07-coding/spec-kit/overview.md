---
title: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/README.md"
zh: ""
---

<h1>🌱 Spec Kit</h1>
    <h3><em>Define what to build before building it — with any AI coding agent.</em></h3>

    <strong>An open source toolkit for building high-quality software with any AI coding agent — a ready-to-use spec-driven process (or bring your own), endlessly extensible, community-driven, and built for your whole organization.</strong>

    
    
    
    

    <strong>English</strong> ·
[简体中文](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/README.zh-CN.md)

> [!NOTE]
> **One year of Spec Kit — and 1.0.0**
>
> One year after the first commit, Spec Kit has reached [1.0.0](https://github.com/github/spec-kit/releases/tag/v1.0.0) — not because the work is finished or its shape is frozen, but because the project has grown into something coherent, useful, and shaped by far more people than those who started it.
>
> The lead maintainer's personal anniversary post, [*Spec Kit Turns One — and Ships 1.0.0*](https://www.manorrock.com/blog/2026/08/21/spec_kit_turns_one.html), defines what 1.0.0 actually means for the project: **it is now just a number**. As agents make adapting to change dramatically cheaper, the value moves from stability to adaptability.
>
> To everyone who has used Spec Kit, challenged its assumptions, reported a problem, contributed code or documentation, created an extension or preset, shared an idea, or helped someone else get started: **thank you**. This milestone belongs to the community that carried the project through its first year and continues to shape where it goes next.

---

## Table of Contents

- [🤔 What is Spec-Driven Development?](#-what-is-spec-driven-development)
- [🐞 Bug Fixing with Spec Kit](#-bug-fixing-with-spec-kit)
- [💡 Assessing Ideas with Spec Kit](#-assessing-ideas-with-spec-kit)
- [⚡ Get Started](#-get-started)
- [📽️ Video Overview](#️-video-overview)
- [🌍 Community](#-community)
- [🤖 Supported AI Coding Agent Integrations](#-supported-ai-coding-agent-integrations)
- [🔧 Specify CLI Reference](#-specify-cli-reference)
- [🧩 Making Spec Kit Your Own: Extensions & Presets](#-making-spec-kit-your-own-extensions--presets)
- [📦 Bundles: Role-Based Setups](#-bundles-role-based-setups)
- [📚 Core Philosophy](#-core-philosophy)
- [🪞 Does Spec Kit Use Spec Kit?](#-does-spec-kit-use-spec-kit)
- [🌟 Development Phases](#-development-phases)
- [🎯 Experimental Goals](#-experimental-goals)
- [🔧 Prerequisites](#-prerequisites)
- [📖 Learn More](#-learn-more)
- [💬 Support](#-support)
- [🙏 Acknowledgements](#-acknowledgements)
- [📄 License](#-license)

## 🤔 What is Spec-Driven Development?

Spec-Driven Development **flips the script** on traditional software development. For decades, code has been king — specifications were just scaffolding we built and discarded once the "real work" of coding began. Spec-Driven Development changes this: **specifications become executable**, directly generating working implementations rather than just guiding them.

### SDD Quickstart

Replace `vX.Y.Z` with the [latest release tag](https://github.com/github/spec-kit/releases), keeping the leading `v`.

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@vX.Y.Z
specify init my-project --integration copilot
cd my-project
```

Launch your coding agent in the project directory, then:

0. **Establish** your project principles once (`/speckit-constitution`). This is a one-time step per project.
1. **Specify** what you want to build (`/speckit-specify`).
2. **Plan** how you will build it (`/speckit-plan`).
3. **Break down** the plan into actionable tasks (`/speckit-tasks`).
4. **Implement** the tasks (`/speckit-implement`).
5. **Converge** the implementation against the spec, plan, and tasks (`/speckit-converge`).

> [!NOTE]
> Repeat steps 4 and 5 until `/speckit-converge` reports **Converged**.

## 🐞 Bug Fixing with Spec Kit

Bug fixes are risky when an agent jumps straight from a report to a patch without validating the diagnosis or confirming that the fix resolves the original symptom. The bundled, opt-in bug extension provides a repeatable **assess → fix → test** workflow that keeps each fix scoped, evidence-based, and documented from root cause through verification.

### Bug Fix Quickstart

Replace `vX.Y.Z` with the [latest release tag](https://github.com/github/spec-kit/releases), keeping the leading `v`.

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@vX.Y.Z
specify init my-project --integration copilot
cd my-project
specify extension add bug
```

Launch your coding agent in the project directory, then:

1. **Assess** the bug (`/speckit-bug-assess "<bug report>" slug=login-crash`).
2. **Fix** the assessed cause (`/speckit-bug-fix slug=login-crash`).
3. **Test** the fix (`/speckit-bug-test slug=login-crash`).

## 💡 Assessing Ideas with Spec Kit

Good ideas deserve evidence before commitment, whether or not they become software. The bundled, opt-in assess extension turns a raw idea into a documented **go / needs-clarification / kill** decision through an independent **intake → research → define → shape → decide** workflow.

### Idea Assessment Quickstart

Replace `vX.Y.Z` with the [latest release tag](https://github.com/github/spec-kit/releases), keeping the leading `v`.

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@vX.Y.Z
specify init my-project --integration copilot
cd my-project
specify extension add assess
```

Launch your coding agent in the project directory, then:

1. **Intake** the idea (`/speckit-assess-intake "<idea>" slug=offline-mode`).
2. **Research** supporting and opposing evidence (`/speckit-assess-research slug=offline-mode`).
3. **Define** the problem, goals, and success metrics (`/speckit-assess-define slug=offline-mode`).
4. **Shape** possible solutions and their trade-offs (`/speckit-assess-shape slug=offline-mode`).
5. **Decide** whether to proceed, clarify, or stop (`/speckit-assess-decide slug=offline-mode`).

> [!NOTE]
> Idea assessment is standalone. If you choose to build an idea with a **go** decision, you can hand it off to `/speckit-specify`.

## ⚡ Get Started

### 1. Install Specify CLI

Requires **[uv](https://docs.astral.sh/uv/)** ([install uv](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/docs/install/uv.md)). Replace `vX.Y.Z` with the latest release tag from [Releases](https://github.com/github/spec-kit/releases) — keep the leading `v` (for example, `v0.12.11`, not `0.12.11`):

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@vX.Y.Z
```

Prefer installing from PyPI? The `specify-cli` package is also published there:

```bash
uv tool install specify-cli
```

See the [Installation Guide](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/docs/installation.md) for alternative methods, verification, upgrade, and troubleshooting.

### 2. Initialize a project

```bash
specify init my-project --integration copilot
cd my-project
```

For CI or AI agent harnesses (no keyboard, or a PTY that cannot send arrow keys), pass `--non-interactive` so init never hangs on a picker. Combine with `--force` when initializing into a non-empty directory:

```bash
specify init my-project --non-interactive --ignore-agent-tools
specify init --here --force --non-interactive --integration claude
```

To check for updates or upgrade the installed CLI, use the self-management commands. See the [Upgrade Guide](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/docs/upgrade.md) for detailed scenarios and customization options.

```bash
# Check whether a newer release is available (read-only — does not modify anything)
specify self check

# Preview what would run, without actually upgrading
specify self upgrade --dry-run

# Upgrade in place to the latest stable release (auto-detects uv tool vs pipx install)
specify self upgrade

# Or pin a specific release tag (replace vX.Y.Z[suffix] with your desired release tag)
specify self upgrade --tag vX.Y.Z[suffix]
```

Bare `specify self upgrade` executes immediately, matching the no-prompt behavior of commands like `pip install -U` and `npm update`. For `uv tool` installs, it runs `uv tool install specify-cli --force --from <git ref>` under the hood so pinned release tags work, including dev, alpha/beta/rc, or build metadata suffixes. `uvx` (ephemeral) runs and source checkouts are detected and produce path-specific guidance instead of running an installer. Set `SPECIFY_UPGRADE_TIMEOUT_SECS` to cap how long the installer subprocess may run (default: no timeout — interrupt with `Ctrl+C` if needed).

### 3. Establish project principles

Launch your coding agent in the project directory. Most agents expose spec-kit as `/speckit.*` slash commands; Codex CLI and Command Code in skills mode use `$speckit-*` instead; GitHub Copilot CLI uses `/agents` to select the agent or address it directly in a prompt.

Use the **`/speckit.constitution`** command to create your project's governing principles and development guidelines that will guide all subsequent development.

```bash
/speckit.constitution Create principles focused on code quality, testing standards, user experience consistency, and performance requirements
```

### 4. Create the spec

Use the **`/speckit.specify`** command to describe what you want to build. Focus on the **what** and **why**, not the tech stack.

```bash
/speckit.specify Build an application that can help me organize my photos in separate photo albums. Albums are grouped by date and can be re-organized by dragging and dropping on the main page. Albums are never in other nested albums. Within each album, photos are previewed in a tile-like interface.
```

### 5. Create a technical implementation plan

Use the **`/speckit.plan`** command to provide your tech stack and architecture choices.

```bash
/speckit.plan The application uses Vite with minimal number of libraries. Use vanilla HTML, CSS, and JavaScript as much as possible. Images are not uploaded anywhere and metadata is stored in a local SQLite database.
```

### 6. Break down into tasks

Use **`/speckit.tasks`** to create an actionable task list from your implementation plan.

```bash
/speckit.tasks
```

### 7. Execute implementation

Use **`/speckit.implement`** to execute all tasks and build your feature according to the plan.

```bash
/speckit.implement
```

For detailed step-by-step instructions, see our [comprehensive guide](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/spec-driven.md).

## 📽️ Video Overview

Want to see Spec Kit in action? Watch our [video overview](https://www.youtube.com/watch?v=a9eR1xsfvHg&pp=0gcJCckJAYcqIYzv)!

[![Spec Kit video header](https://raw.githubusercontent.com/github/spec-kit/main/media/spec-kit-video-header.jpg)](https://www.youtube.com/watch?v=a9eR1xsfvHg&pp=0gcJCckJAYcqIYzv)

## 🌍 Community

Explore community-contributed resources on the [Spec Kit docs site](https://github.github.io/spec-kit/):

- [Extensions](https://github.github.io/spec-kit/community/extensions.html) — commands, hooks, and capabilities
- [Presets](https://github.github.io/spec-kit/community/presets.html) — template and terminology overrides
- [Bundles](https://github.github.io/spec-kit/community/bundles.html) — role and team stacks composed from existing components
- [Walkthroughs](https://github.github.io/spec-kit/community/walkthroughs.html) — end-to-end SDD scenarios
- [Friends](https://github.github.io/spec-kit/community/friends.html) — projects that extend or build on Spec Kit

> [!NOTE]
> Community contributions are independently created and maintained by their respective authors. Review source code before installation and use at your own discretion.

Want to contribute? See the [Extension Publishing Guide](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/EXTENSION-PUBLISHING-GUIDE.md), the [Presets Publishing Guide](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/presets/PUBLISHING.md), or the [Community Bundles guide](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/docs/community/bundles.md).

## 🤖 Supported AI Coding Agent Integrations

Spec Kit works with 30+ AI coding agents — both CLI tools and IDE-based assistants. See the full list with notes and usage details in the [Supported AI Coding Agent Integrations](https://github.github.io/spec-kit/reference/integrations.html) guide.

Run `specify integration list` to see all available integrations in your installed version.

## Available Slash Commands

After running `specify init`, your AI coding agent will have access to these slash commands for structured development. For integrations that support skills mode, passing `--integration <agent> --integration-options="--skills"` installs agent skills instead of slash-command prompt files.

### Core Commands

Essential commands for the Spec-Driven Development workflow:

| Command                  | Agent Skill            | Description                                                                |
| ------------------------ | ---------------------- | -------------------------------------------------------------------------- |
| `/speckit.constitution`  | `speckit-constitution` | Create or update project governing principles and development guidelines   |
| `/speckit.specify`       | `speckit-specify`      | Define what you want to build (requirements and user stories)              |
| `/speckit.plan`          | `speckit-plan`         | Create technical implementation plans with your chosen tech stack          |
| `/speckit.tasks`         | `speckit-tasks`        | Generate actionable task lists for implementation                          |
| `/speckit.taskstoissues` | `speckit-taskstoissues`| Convert generated task lists into GitHub issues for tracking and execution |
| `/speckit.implement`     | `speckit-implement`    | Execute all tasks to build the feature according to the plan               |
| `/speckit.converge`      | `speckit-converge`     | Assess the codebase against spec/plan/tasks and append remaining work as new tasks |

### Optional Commands

Additional commands for enhanced quality and validation:

| Command              | Agent Skill            | Description                                                                                                                          |
| -------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `/speckit.clarify`   | `speckit-clarify`      | Clarify underspecified areas (recommended before `/speckit.plan`; formerly `/quizme`)                                                |
| `/speckit.analyze`   | `speckit-analyze`      | Cross-artifact consistency & coverage analysis (run after `/speckit.tasks`, before `/speckit.implement`)                             |
| `/speckit.checklist` | `speckit-checklist`    | Generate custom quality checklists that validate requirements completeness, clarity, and consistency (like "unit tests for English") |

## 🔧 Specify CLI Reference

For full command details, options, and examples, see the [CLI Reference](https://github.github.io/spec-kit/reference/overview.html).

## 🧩 Making Spec Kit Your Own: Extensions & Presets

Spec Kit can be tailored to your needs through two complementary systems — **extensions** and **presets** — plus project-local overrides for one-off adjustments:

| Priority | Component Type                                    | Location                         |
| -------: | ------------------------------------------------- | -------------------------------- |
|      ⬆ 1 | Project-Local Overrides                           | `.specify/templates/overrides/`  |
|        2 | Presets — Customize core & extensions             | `.specify/presets/templates/`    |
|        3 | Extensions — Add new capabilities                 | `.specify/extensions/templates/` |
|      ⬇ 4 | Spec Kit Core — Built-in SDD commands & templates | `.specify/templates/`            |

- **Templates** are resolved at **runtime** — Spec Kit walks the stack top-down and uses the first match.
- Project-local overrides (`.specify/templates/overrides/`) let you make one-off adjustments for a single project without creating a full preset.
- **Extension/preset commands** are applied at **install time** — when you run `specify extension add` or `specify preset add`, command files are written into agent directories (e.g., `.claude/commands/`).
- If multiple presets or extensions provide the same command, the highest-priority version wins. On removal, the next-highest-priority version is restored automatically.
- If no overrides or customizations exist, Spec Kit uses its core defaults.

### Extensions — Add New Capabilities

Use **extensions** when you need functionality that goes beyond Spec Kit's core. Extensions introduce new commands and templates — for example, adding domain-specific workflows that are not covered by the built-in SDD commands, integrating with external tools, or adding entirely new development phases. They expand *what Spec Kit can do*.

```bash
# Search available extensions
specify extension search

# Install an extension
