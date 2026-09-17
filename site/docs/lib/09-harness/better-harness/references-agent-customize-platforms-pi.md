---
title: "Pi Best Practices"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/references/agent-customize/platforms/pi.md"
sourceRel: "references/agent-customize/platforms/pi.md"
rawUrl: "/raw/09-harness/better-harness/references/agent-customize/platforms/pi.md"
sourceSha256: "89e53b6cc5db5835cb3e8229750edb565f69dc39b852e0653efb3b5d1df8c7ab"
pageSha256: "89e53b6cc5db5835cb3e8229750edb565f69dc39b852e0653efb3b5d1df8c7ab"
contentMode: "local-full"
zh: ""
---

# Pi Best Practices

Use this file for Pi-specific operating practice. Use `../routing.md` for
host-neutral owner selection and `codex.md`/`claude.md`/`qwen.md` for other
host references. Do not copy Pi-only workflow advice into shared docs unless
there is matching surface evidence.

## Operating Frame

Treat Pi as a minimal, extensible harness rather than a fixed product. Start
with the right task context, move repeated guidance into `AGENTS.md`,
configure Pi through `settings.json`, turn repeated work into Skills and
prompt templates, package shareable workflows as pi packages, and extend
behavior through TypeScript extensions only when Markdown assets are not
enough.

## Prompt Shape

A strong first prompt has four parts:

- **Goal**: the change, bug, review, artifact, or decision needed.
- **Context**: files, folders, docs, examples, logs, errors, or other material
  Pi should inspect.
- **Constraints**: architecture rules, safety limits, review standards,
  platform requirements, and do-not-touch boundaries.
- **Done when**: tests, checks, behavior, output files, or review evidence
  that prove the task is complete.

## Durable Guidance

Use `AGENTS.md` for repository guidance that should load automatically. Pi
loads the global `~/.pi/agent/AGENTS.md` first, then `AGENTS.md` (or
`CLAUDE.md`) from the workspace and its ancestor directories:

- repo layout and important directories
- build, test, lint, and local run commands
- engineering conventions and review expectations
- safety constraints and do-not rules
- what "done" means and how to verify work

Keep context files short and practical. Put large or conditional detail in
linked references. Use project-level `.pi/settings.json` for repo-specific
defaults the team should share; pi installs missing declared packages on
startup after the project is trusted.

## Configured Surfaces

- **Skills**: `~/.pi/agent/skills/`, `~/.agents/skills/`, project
  `.pi/skills/`, and `.agents/skills/` directories follow the Agent Skills
  standard (`SKILL.md` with `name` and `description` frontmatter). Skills also
  register as `/skill:<name>` commands.
- **Prompt templates**: `.md` files under `~/.pi/agent/prompts/` and
  `.pi/prompts/` register as slash commands named after the file; frontmatter
  `description` and `argument-hint` shape discovery. Pi's `substituteArgs`
  interpolates arguments through `$@` / `$ARGUMENTS` for all args, `$1`..`$N`
  for positional args, and the default-value form `${@:-default}` /
  `${ARGUMENTS:-default\}` / `${1:-default}` that expands to the fallback when
  no argument is supplied. The bundled `/better-harness` template relies on
  the `${@:-...\}` default form, verified against
  `@earendil-works/pi-coding-agent`.
- **Extensions**: TypeScript/JavaScript modules under
  `~/.pi/agent/extensions/` and `.pi/extensions/` register tools, commands,
  event handlers, and custom UI. Extension code runs with full system access;
  treat the inventory as metadata and never execute it during review.
- **Pi packages**: `settings.json` `packages` entries (npm, git, or local
  paths) bundle extensions, skills, prompts, and themes. npm installs resolve
  under `~/.pi/agent/npm/`, git clones under `~/.pi/agent/git/<host>/<path>`,
  and project-scoped installs under `.pi/npm/` and `.pi/git/`. A package
  declares resources through the `pi` key in `package.json` or conventional
  `skills/`, `prompts/`, `extensions/`, and `themes/` directories. Package
  Skills may use `SKILL.md`, a top-level `.md` file in a declared Skill
  directory, or a directly declared Markdown file. Settings-level `autoload`
  and resource filters determine which package Skills and prompts are effective;
  a project `autoload: false` entry can act as a delta over the matching user
  package.

## Session Evidence

Pi sessions are JSONL trees under
