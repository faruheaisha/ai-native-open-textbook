---
title: "Iterating development workflows with Codex"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/codex/iterating-development-workflows-with-codex.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/codex/iterating-development-workflows-with-codex.md"
sourceSha256: "ac2e49b839cbd65fc8f812f4a8a604e675eec686af7377b2965fa3e57a1b47b1"
pageSha256: "ac2e49b839cbd65fc8f812f4a8a604e675eec686af7377b2965fa3e57a1b47b1"
contentMode: "local-full"
zh: ""
---

# Iterating development workflows with Codex

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Introduction

While the vast capabilities Codex offers can be empowering, it can be difficult to know where to start integrating it into your workflows. This recipe shows a practical approach to incorporating Codex while making iterative improvements to continuously leverage its abilities more effectively.

The `AGENTS.md` file is optional but recognized by Codex. The other files in this recipe are recommended workflow conventions, not files Codex requires. Adapt the structure to fit your project.

Below is the completed structure based on the design of a simple to-do list application. Files in the `context/` directory are generated during each phase of development and contain phase-specific context records.


<summary><strong>Example Directory Structure</strong></summary>

``` text
.
├── .gitignore
├── AGENTS.md
├── GOALS.md
├── PLANS.md
├── PROMPTS.md
├── README.md
└── harness
    ├── build
    │   ├── phase-00-repository-foundation.md
    │   ├── phase-01-create-list.md
    │   ├── phase-02-update-complete-delete.md
    │   └── phase-03-demo-verification.md
    ├── build-log.md
    ├── code_review
    │   └── .gitkeep
    └── context
        └── README.md

4 directories, 13 files
```


## Create harness and build phase files

### Agents and plans

For new projects, the best place to start is by populating the [`AGENTS.md`](https://learn.chatgpt.com/docs/agent-configuration/agents-md) file. When present, Codex reads this file as persistent repository guidance before performing work. It is an optional convention for work that benefits from durable execution. In general, agents files should contain items like:

- The goal of the repository and a high-level summary
- Coding conventions
- Testing standards
- Relevant context files
- Project-specific behaviors
- Scopes and boundaries

The `/init` command in Codex can generate the file and will attempt to populate it based on the context it gathers from the directory contents.

> **💡 Tip: Tracking Institutional Knowledge**
>
> The agents file is a great place to store institutional knowledge from your team.

For plan execution, creating a [`PLANS.md`](https://developers.openai.com/cookbook/articles/codex_exec_plans#plansmd) file as a source of truth is considered a useful, optional convention. In addition to the purpose of the plan, this file should also contain a project roadmap. While these are not properties required by Codex, they can then be used to generate files for each individual build phase.

> **💡 Tip: Build File Sizes**
>
> For teams that prefer longer running tasks, the `PLANS.md` file can be larger
> and contain extensive details on material decisions and acceptance criteria.
>
> Creating smaller build files not only improves readability but supports
> human gating to manually review code quality and other outputs.

### Harness files

In addition to the agents and plans files, it is also possible to create individual files to specify the desired outcomes, success conditions and boundaries (`GOALS.md`) and for the instructions to initiate planned work (`PROMPTS.md`). These can be either manually written or derived from the agents and plans file using a prompt like the one below:


<summary><strong>Generate <code>GOALS.md</code> and <code>PROMPTS.md</code></strong></summary>

```text
Read the applicable `AGENTS.md` files for this repository, starting at the
repository root and including any instructions that apply to the current
directory. If `PLANS.md` exists, read it as well.

Using those sources, create or conservatively update only these files:

- `GOALS.md`
- `PROMPTS.md`

Before writing, briefly summarize:

1. The source files you found
2. The project outcomes and constraints you inferred
3. Any assumptions caused by missing or ambiguous information

Use the following ownership boundaries:

## `GOALS.md`

Document what the project is trying to achieve. Include:

- Project purpose
- Desired outcomes
- Success conditions
- Scope
- Non-goals
- Technical and operational constraints
- Security, reliability, and recovery expectations when supported by the sources
- Known unknowns or decisions that still require human input

Keep goals outcome-oriented. Do not copy implementation procedures, reusable
prompts, or progress updates into this file. Do not claim capabilities,
deadlines, guarantees, or requirements that are not supported by the source
material.

## `PROMPTS.md`

Provide reusable prompts for initiating and advancing the planned work. Include:

- A repository-orientation prompt
- A planning or phase-preparation prompt
- A prompt for executing one approved phase
- A verification and evidence-gathering prompt
- A review or remediation prompt
- A phase-completion and handoff prompt

Each prompt should:

- Tell Codex which repository files to read
- Reference the relevant goal or plan instead of duplicating it
- Define the immediate scope and explicit non-goals
- Require a read-only preflight before implementation
- Require an approval summary before repository writes
- Use red, green, refactor, and verification where appropriate
- Require observed test and validation evidence
- Keep commits, pushes, deployments, credentials, and external writes behind
  separate explicit approval
- Stop after the selected phase rather than beginning the next one automatically

If `PLANS.md` does not exist:

- Derive only high-level goals supported by `AGENTS.md`
- Do not invent a roadmap, phases, architecture, or product requirements
- Use clearly marked placeholders where planning input is required
- Make the prompts request an explicit plan or phase before implementation

Preserve existing repository terminology and filename capitalization. Keep both
documents concise and avoid repeating information already owned by
`AGENTS.md` or `PLANS.md`.

Do not modify application code, tests, dependencies, configuration, existing
planning files, or any other files.

After writing:

1. Review both files for contradictions and duplicated ownership
2. Confirm that every substantive claim is grounded in `AGENTS.md` or
   `PLANS.md`, or is clearly labeled as an assumption
3. Run `git diff --check`
4. Report the files changed, assumptions made, and any unresolved questions
```


### Build phase files

Once the files the harness will use for context have been generated, the next step is to break down the stages of each build into individual files to identify:

- The purpose of each step
- Any files needed for additional context
- Acceptance criteria
- Boundaries
