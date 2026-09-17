---
title: "Harness Engineering Theses"
sourceId: "09-harness/harness-engineering-anthology"
sourceTitle: "Harness Engineering 文集"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/lopopolo/harness-engineering"
entryUrl: "https://github.com/lopopolo/harness-engineering/blob/226c8d35fb6ea3ed55467753dba6dea2b5fd5778/docs/README.md"
sourceRel: "docs/README.md"
rawUrl: "/raw/09-harness/harness-engineering-anthology/docs/README.md"
sourceSha256: "49dc8b492296e2fe477f567630b1c04cfaba3c2b4e89a5284af86ccc7820ff70"
pageSha256: "49dc8b492296e2fe477f567630b1c04cfaba3c2b4e89a5284af86ccc7820ff70"
contentMode: "local-full"
zh: ""
---

# Harness Engineering Theses

These twelve theses explain how context, tools, and the surrounding environment
shape the work a fixed model and coding agent can complete. Each page develops
the argument through Ryan Lopopolo's articles, talks, interviews, public posts,
implementation evidence, and related work.

## Start here

Read [Harness Engineering] for an introduction to the practice. Once a
target-local decision is unresolved, use this index to choose the one thesis
that can change it; choose a procedure from the [playbook index] when the task
calls for an application.

[Harness Engineering]: /lib/09-harness/harness-engineering-anthology/overview
[playbook index]: /lib/09-harness/harness-engineering-anthology/playbooks

## Theses

### [Hold the worker constant]

Treat the chosen model and coding agent as a black box during one adoption
epoch. Requalify the environment, human priors, ambition, and inner-loop latency
when that worker changes; preserve useful learned semantics across host
migrations.

[Hold the worker constant]: /lib/09-harness/harness-engineering-anthology/docs-fixed-worker

### [Deploy into the private process-data iceberg]

The large applied-AI opportunity is institutional work that depends on private,
changing process data. Organizations cannot presume that this data will enter
general model weights or that agents will reliably intuit which parts matter.
Keep current records, organizational context, and repository knowledge with
authoritative owners, then compose them into retrievable context and bounded
capability. Goal-specific context repositories can project those sources for a
parent worker without replacing them. Code can remain the worker’s internal
action language for users who consume domain outcomes without reviewing the
implementation.

[Deploy into the private process-data iceberg]: /lib/09-harness/harness-engineering-anthology/docs-last-mile-deployment

### [Give one agent the whole job]

Humans provide direction, judgment, and consequential authority. Agents recover
the outcome behind a sparse prompt. One primary trajectory owns decomposition,
execution, integration, proof, and safe lifecycle closure.

[Give one agent the whole job]: /lib/09-harness/harness-engineering-anthology/docs-whole-job

### [Route context just in time]

Keep a large navigable knowledge store and a small active working set. Root
guidance routes across authoritative sources; runbooks preserve workflows;
skills teach an approach; checks surface constraints when they become relevant.
A context-curator sidecar can stage observed gaps, reconcile them with their
owners, and publish a reviewed projection at an atomic revision.

[Route context just in time]: /lib/09-harness/harness-engineering-anthology/docs-just-in-time-context

### [Make capabilities legible and operable]

Tools are the second external lever. A capability becomes usable through the
complete loop of discovery, selection, invocation, interpretation, repair, and
real-system verification.

[Make capabilities legible and operable]: /lib/09-harness/harness-engineering-anthology/docs-tool-legibility

### [Make the repository teach the agent]

Code the agent reads becomes prompt material. The repository makes local
nonfunctional requirements recoverable through canonical owners, repeated
structures, completed migrations, examples, types, and executable constraints.
The agent can infer what good looks like and transfer that context across the
repository.

[Make the repository teach the agent]: /lib/09-harness/harness-engineering-anthology/docs-domain-modeling

### [Maximize autonomy inside explicit authority]

Keep capability and authority as separate contracts. Let the worker act broadly
in reversible environments; make consequential grants scoped, revocable,
auditable, and recoverable.

[Maximize autonomy inside explicit authority]: /lib/09-harness/harness-engineering-anthology/docs-authority

### [Prove the outcome in the real environment]

Match evidence to the user or operational claim. A green check proves only its
assertion; browser journeys, corpora, traces, canaries, and deployed health
close different loops.

[Prove the outcome in the real environment]: /lib/09-harness/harness-engineering-anthology/docs-proof

### [Turn feedback into infrastructure]

Trajectory evidence, MLD, review, and incidents can expose missing harness
capabilities. Stable lessons move into their earliest durable owner.
Mechanically enforceable principles can drive cleanup across a discoverable
population, reducing stale precedent for later work.

[Turn feedback into infrastructure]: /lib/09-harness/harness-engineering-anthology/docs-feedback

### [Preserve coherence and own lifetime risk]

Abundant implementation makes future coherence and lifetime ownership scarce. A
feedback-controlled environment carries lived judgment into later work while
preserving behavioral contracts, migration integrity, dependency evidence,
release identity, and proportional controls.

[Preserve coherence and own lifetime risk]: /lib/09-harness/harness-engineering-anthology/docs-durable-systems

### [Run known work as a continuous loop]

Settled outcomes with signal, proof, and authority can enter repository-owned
loops; unresolved product invention remains foreground work. Durable state,
feedback, and retirement conditions keep each run aligned with the current
world.

[Run known work as a continuous loop]: /lib/09-harness/harness-engineering-anthology/docs-continuous-maintenance

### [Optimize for measured effectiveness][effectiveness]

Tokens, lines, agents, and checks are inputs. Optimize useful outcomes per unit
of scarce human attention, with acceptable latency, risk, and maintenance.

[effectiveness]: /lib/09-harness/harness-engineering-anthology/docs-effectiveness

## Applications

### [Improve one harnessed job]

Observe one representative trajectory, locate its earliest failed handoff, make
the smallest authorized and reversible intervention at the owning boundary, and
use a fresh rerun to decide whether to retain, revise, or remove it. Test without
the intervention when its added value remains unclear.

[Improve one harnessed job]: /lib/09-harness/harness-engineering-anthology/playbooks-improve-harness

### [Review a repository]

Follow representative jobs from request through delivery, then locate missing
context, capability, ownership, proof, authority, and feedback at their owning
boundaries.

[Review a repository]: /lib/09-harness/harness-engineering-anthology/playbooks-repository-review

### [Evaluate the harness]

Isolate one harness intervention under a fixed worker condition. Keep target
truth with its owner, use implementation-neutral contract rubrics, and measure
accepted outcomes, proof, architecture, and trajectory cost separately.

[Evaluate the harness]: /lib/09-harness/harness-engineering-anthology/evals

## Related work

### [Influences and alternate framings]

matklad’s architecture writing, Artichoke’s living architecture, “Parse, don’t
validate,” and Strangler Fig are earlier influences. Birgitta Böckeler’s Fowler-
site article appeared after Ryan’s February 11, 2026 essay and is a later
alternate framing.

[Influences and alternate framings]: /lib/09-harness/harness-engineering-anthology/docs-lineage

## Evidence

The [source library] indexes essays, interviews, talks, cases, the public-post
corpus, influences, and alternate framings.

[source library]: /lib/09-harness/harness-engineering-anthology/sources
