---
title: "Spec of Specs"
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

# Spec of Specs

When a feature is too large to run through a single
`/speckit.specify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`
cycle without the model losing track mid-implementation, you can break it into a
**roadmap** of smaller, independently-specified sub-features. This is the "spec of
specs" approach: one up-front pass decomposes a massive feature into self-contained
specs, and each of those runs through its own specify/plan/tasks/implement cycle.

> **When to reach for this.** Decomposition adds the most overhead of any strategy
> in [Handling Complex Features](/lib/07-coding/spec-kit/docs-concepts-complex-features). Use it **only when the lighter
> options there are insufficient** — first try limiting how many tasks run per
> `/speckit.implement` invocation, then sub-agent delegation, then a combination.
> Reach for a spec of specs only when even a single phase is too large to handle in
> one run.

The rest of this page describes *how* to do it with the tools you already have. No
new commands or extensions are required.

## The roadmap pass

Before writing any sub-spec, do a single decomposition pass to produce a roadmap.
Treat this as a lightweight planning conversation with your agent, not a full spec:

1. **State the whole feature.** Describe the large feature (the "epic") in a
   sentence or two so the agent has the full picture up front.
2. **Identify independent slices.** Ask the agent to propose a small set of
   sub-features that each deliver a coherent piece of the epic and can be specified
   on their own. Aim for slices that are independently testable — implementing just
   one should leave you with something demonstrable.
3. **Draw the boundaries.** For each slice, write one line of intent and an explicit
   scope boundary (what is in, what is deferred to a sibling slice). Sharp
   boundaries are what keep each sub-spec small enough to fit in context.
4. **Order by dependency.** Note which slices depend on others and sequence them so
   prerequisites come first. Slices with no dependency on each other can be built in
   any order. To build independent slices in parallel, use separate worktrees so each
   run has isolated active-feature state.
5. **Record the result as a roadmap.** Capture the slices in a durable roadmap file
   (below) so every later sub-spec can point back to it.

The roadmap is deliberately shallow: it names and orders the sub-features but does
**not** design them. The design happens when each slice runs through its own
`/speckit.specify`.

## The roadmap artifact

The roadmap is an ordinary Markdown file you author and keep under version control —
there is no special tooling behind it. Put it where the sub-specs can find it:
