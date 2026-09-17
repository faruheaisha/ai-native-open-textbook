---
title: "Engineering"
sourceId: "10-context-memory/mattpocock-skills"
sourceTitle: "Matt Pocock Skills（工程技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/mattpocock/skills"
entryUrl: "https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/README.md"
sourceRel: "skills/engineering/README.md"
rawUrl: "/raw/10-context-memory/mattpocock-skills/skills/engineering/README.md"
sourceSha256: "713826c94f7858c28067238ce6c7021783e4da0dc0beef58a2af72cf75268fda"
pageSha256: "713826c94f7858c28067238ce6c7021783e4da0dc0beef58a2af72cf75268fda"
contentMode: "local-full"
zh: ""
---

# Engineering

Skills I use daily for code work.

## User-invoked

Reachable only when you type them (Claude Code: `disable-model-invocation: true`; Codex: `policy.allow_implicit_invocation: false` in `agents/openai.yaml`).

- **[ask-matt](/lib/10-context-memory/mattpocock-skills/skills-engineering-ask-matt-SKILL)**: Ask which skill or flow fits your situation. A router over the user-invoked skills in this repo.
- **[grill-with-docs](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/grill-with-docs/SKILL.md)**: Grilling session that also builds your project's domain model, sharpening terminology and updating `CONTEXT.md` and ADRs inline.
- **[triage](/lib/10-context-memory/mattpocock-skills/skills-engineering-triage-SKILL)**: Move issues through a state machine of triage roles.
- **[improve-codebase-architecture](/lib/10-context-memory/mattpocock-skills/skills-engineering-improve-codebase-architecture-SKILL)**: Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick.
- **[setup-matt-pocock-skills](/lib/10-context-memory/mattpocock-skills/skills-engineering-setup-matt-pocock-skills-SKILL)**: Configure this repo for the engineering skills (issue tracker, triage labels, domain doc layout). Run once per repo.
- **[to-spec](/lib/10-context-memory/mattpocock-skills/skills-engineering-to-spec-SKILL)**: Turn the current conversation into a spec and publish it to the issue tracker.
- **[to-tickets](/lib/10-context-memory/mattpocock-skills/skills-engineering-to-tickets-SKILL)**: Break any plan, spec, or conversation into a set of tracer-bullet tickets, each declaring its blocking edges, whether as text in a local file or as native blocking links on a real tracker.
- **[implement](/lib/10-context-memory/mattpocock-skills/skills-engineering-implement-SKILL)**: Build the work described by a spec or set of tickets, driving `/tdd` at pre-agreed seams and closing out with `/code-review` before committing.
- **[wayfinder](/lib/10-context-memory/mattpocock-skills/skills-engineering-wayfinder-SKILL)**: Plan a huge chunk of work (more than one agent session can hold) as a shared map of decision tickets on the issue tracker, resolved one at a time until the way to the destination is clear.

## Model-invoked

Model- or user-reachable (rich trigger phrasing so the model can reach for them).

- **[prototype](/lib/10-context-memory/mattpocock-skills/skills-engineering-prototype-SKILL)**: Build a throwaway prototype to answer a design question: a single shareable HTML file for state/logic, or several toggleable UI variations.

- **[diagnosing-bugs](/lib/10-context-memory/mattpocock-skills/skills-engineering-diagnosing-bugs-SKILL)**: Disciplined diagnosis loop for hard bugs and performance regressions: build a feedback loop that goes red on this bug → minimise → hypothesise → instrument → fix → regression-test.
- **[research](/lib/10-context-memory/mattpocock-skills/skills-engineering-research-SKILL)**: Investigate a question against high-trust primary sources and capture the findings as a cited Markdown file in the repo, run as a background agent.
- **[tdd](/lib/10-context-memory/mattpocock-skills/skills-engineering-tdd-SKILL)**: Test-driven development with a red-green-refactor loop. Builds features or fixes bugs one vertical slice at a time.
- **[domain-modeling](/lib/10-context-memory/mattpocock-skills/skills-engineering-domain-modeling-SKILL)**: Actively build and sharpen a project's domain model by challenging terms, stress-testing with scenarios, and updating `CONTEXT.md` and ADRs inline.
- **[codebase-design](/lib/10-context-memory/mattpocock-skills/skills-engineering-codebase-design-SKILL)**: Shared discipline and vocabulary for designing deep modules: small interfaces, clean seams, testable through the interface.
- **[code-review](/lib/10-context-memory/mattpocock-skills/skills-engineering-code-review-SKILL)**: Two-axis review of the diff since a fixed point: **Standards** (does it follow the repo's coding standards, plus a Fowler smell baseline?) and **Spec** (does it faithfully implement the originating issue/spec?), run as parallel sub-agents.
- **[resolving-merge-conflicts](/lib/10-context-memory/mattpocock-skills/skills-engineering-resolving-merge-conflicts-SKILL)**: Work through an in-progress git merge or rebase conflict hunk by hunk, resolving by intent traced to each side's primary source, then finish the operation, never `--abort`.
- **[wizard](/lib/10-context-memory/mattpocock-skills/skills-engineering-wizard-SKILL)**: Generate an interactive bash wizard that walks a human through steps only they can perform: provisioning infrastructure, setting up credentials or CI secrets, walking an unfamiliar third-party dashboard, or running a one-off migration or cutover.
