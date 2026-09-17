---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/roles/learning-with-ai.md"
sourceRel: "guide/roles/learning-with-ai.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/roles/learning-with-ai.md"
sourceSha256: "f144ce919ab10175ad88e2e4af32f82ce38d56016db54ccd80218ed6a8a073df"
pageSha256: "9f67443ba5c1b6cdf97ec6bdd3819131166e0d72780cb5197ad6c98d025d8bd0"
contentMode: "local-full"
zh: ""
---

## For Tech Leads & Engineering Managers

> **Audience**: Engineering managers, tech leads, senior developers responsible for junior mentoring.
>
> **Problem**: The rest of this guide addresses individual developers. This section addresses the people responsible for creating the conditions where good habits form, or don't.

The UVAL protocol solves the individual problem. The organizational problem is different: how do you create conditions where juniors *want to* think before they prompt, where quality isn't traded for velocity, and where AI-generated debt doesn't accumulate silently at team scale?

---

### The Onboarding Imperative

AI access without structured training produces poor results. A 2025 Create Future study found junior developers with no AI training achieved only 14-42% time savings on key tasks. With brief structured training, that jumped to 35-65%. The tool doesn't teach itself.

**Structured onboarding beats "here's your license":**

| Week | Focus | Avoid |
|------|-------|-------|
| 1 | Codebase tour without AI: baseline assessment | Granting Copilot access on day one |
| 2 | First features manually, AI as reviewer only | AI as generator before fundamentals are visible |
| 3 | UVAL protocol introduction + supervised pair sessions | Solo AI usage without check-ins |
| 4+ | Full AI usage with weekly understanding check-ins | Unmonitored velocity as success metric |

Week 1 without AI isn't a punishment. It's calibration. You need to see what they actually know before AI masks the gaps. A junior who struggles week 1 needs different mentoring than one who ships confidently, and you can't distinguish them if they both use AI from day one.

---

### Measuring What Actually Matters

Velocity is a lagging indicator. It shows nothing about the skills gap forming underneath.

**Metrics that reveal real growth:**

| Metric | How to Measure | Red Flag |
|--------|---------------|----------|
| Can explain code in review | Ask "walk me through your approach" | "The AI suggested it" |
| Debugs independently | Time to resolve self-reported blockers | Always needs AI to debug |
| Predicts outcomes | Ask "what will this do?" before running | Can't answer without testing |
| Proposes alternatives | In design discussions | Always defers to AI output |
| Notices when AI is wrong | Review comment quality | Never catches AI errors |

**Weekly growth question** (5 minutes, any format):

> "What's one thing you understood deeply this week, not just shipped?"

If they struggle to answer two weeks in a row, that's your signal to slow down.

---

### Assess explanation, diagnosis and escalation

Use the [review comprehension exercise](/lib/09-harness/claude-code-ultimate-guide/examples-learning-project-review-comprehension-exercise) to observe what a learner can explain before assistance, predict after an assumption changes, diagnose in a failing example, and escalate outside their scope. Record mentor and agent interventions separately from the final answer.

In [IFTTD episode 362](https://www.ifttd.io/episodes/le-lean-a-l-ere-de-l-ia), Yacine Hmito distinguishes giving an agent a skill from teaching its operator to judge the resulting work. His example of formalizing a good unit test makes the operator's tacit criteria inspectable. The exercise operationalizes that distinction; it is not evidence that review-based training equals learning by writing code. Repeat with a new task before claiming transfer, and keep comprehension results separate from merged-PR counts.

### Scalable Mentoring Models

The 1:1 senior/junior compagnonnage model doesn't scale past teams of 5-10. These three approaches do:

**1. Pair programming rotations (2-hour slots)**

Two juniors work together with AI. The constraint: neither can accept AI code they can't explain to their partner. Disagreements on the *why* are escalated to a senior. Cost: 2h/week per junior, minimal senior time.

**2. Architecture "hot seat" (15 min/week)**

Any junior can request a 15-minute slot to explain an architectural decision they made. Senior gives one piece of feedback. No code review: just the *why* behind the choice. Scales to N juniors with O(N×15min) senior time, and forces juniors to develop architectural reasoning rather than just copy AI solutions.

**3. Collective CLAUDE.md ownership**

Juniors propose additions to the team `CLAUDE.md`. Proposals must be based on something that burned them or saved them in practice. Seniors review and accept or reject with a reason. This forces reflection, distributes knowledge horizontally, and builds shared ownership of the team's AI usage standards.

---

### Team-Level Steering Metrics

"Measuring What Actually Matters" covers individual growth signals. This section covers what you look at weekly and monthly to steer the whole team, not just assess individual developers.

Two levels, each with a distinct purpose.

**Level 1: Delivery health (DORA-derived)**

| Metric | What It Tells You |
|--------|------------------|
| Deployment Frequency | Are we shipping consistently or in bursts? |
| Cycle Time (commit to deploy) | Where is work stalling? |
| Bug Escape Rate | What fraction of bugs reach production? |

These are standard. Track them regardless of AI usage. The problem is they're not enough.

**Level 2: AI adoption quality**

| Metric | How to Measure |
|--------|---------------|
| % AI-assisted PRs reviewed with understanding | Spot-check: ask "explain this block" in 1 out of 5 junior PRs |
| PR review time on AI PRs vs manual PRs | Time from "ready for review" to merge, segmented by PR origin |
| "Can explain in review" pass rate | Track how often the answer to "walk me through this" is satisfying vs evasive |

These three tell you whether the team is using AI to move faster with understanding, or rubber-stamping output and shipping debt.

**The Velocity Trap**

Teams using AI often hit DORA "high performer" thresholds faster than expected. Deployment frequency goes up, cycle time drops. This looks like success. It isn't if Level 2 metrics are degrading simultaneously. Velocity is not a proxy for skill retention when AI writes the code. A team can ship faster every sprint while understanding their own codebase less each month. Watch both levels together, not either one in isolation.

**Weekly Monday ritual (3 numbers, 5 minutes)**

1. Deployment frequency this week vs last week
2. Open PRs older than 24 hours (count only)
3. Bugs escaped to production this week

If any of the three is trending wrong for two consecutive weeks, that's your trigger to investigate, not a reason to immediately change process. Patterns matter, not individual data points.

For the full framework with dashboards and alerting thresholds, see `ops/team-metrics.md`.

---

### Team-Level AI Policy (CLAUDE.md for Teams)

Individual `CLAUDE.md` configuration (§6) is for one developer. Team-level policy goes in the root `CLAUDE.md` of your shared repo. Keep it short enough that people actually read it:

```markdown
## Team AI Usage Policy

### Required before using AI on a feature
- Write the function signature yourself
- Write at least one test case before asking AI to implement

### Required after AI generates code
- All AI-generated code undergoes the same code review as human code
- Reviewer asks: "Can you explain this section?" for junior PRs, not optional

### Prohibited patterns
- Accepting AI changes without reading the diff
- AI-generated code in security-critical paths without explicit senior sign-off
- Using "AI wrote it" as explanation for any architectural decision in a PR
```

Start minimal. Add rules only when a pattern becomes a problem. A six-page policy nobody reads is worse than a three-rule policy that shapes behavior.

---

### Warning Signs at Team Level

| Pattern | What It Means | Response |
|---------|---------------|----------|
| PRs merged faster each week, quality dropping | Probably skipping review | Add mandatory "explain this" checklist for junior PRs |
| Juniors never ask architectural questions | Over-delegating thinking to AI | Architecture hot seat (see above) |
| Bugs consistently blamed on "AI-generated code" | No code ownership | Review acceptance policy: who's responsible for what they ship? |
| Senior devs increasingly vocal about code quality | Debt accumulating silently | Slow down, introduce "explain this" gates before merge |
| Same fundamental question asked every sprint | Not retaining, just re-prompting | Require learning log, review at 1:1s |
| Junior velocity rises but interview performance falls | The Shen & Tamkin effect at team scale | Reset with week of no-AI exercises on known fundamentals |

---

### Quick Checklist

```
Onboarding
☐ Week 1: no AI, baseline skills visible before tooling provided
☐ Structured AI training included (not just tool access)
☐ UVAL protocol introduced by week 3

Ongoing
☐ Code reviews include "explain this" for junior PRs
☐ Weekly growth question asked (not just velocity reviewed)
☐ Architecture hot seat or equivalent ritual active

Team Policy
☐ CLAUDE.md with AI usage guidelines exists in repo
☐ Prohibited patterns documented and known
☐ Someone owns updating the policy as patterns evolve

Warning Signs
☐ Velocity tracked separately from understanding signals
☐ Debt accumulation monitored (not just feature throughput)
☐ Juniors can explain code they shipped last sprint
```

---

### Regulatory Exposure (Regulated Industries)

For teams shipping AI-generated code into healthcare, finance, or government systems, comprehension debt is no longer just a quality risk: it is a compliance risk.

The **EU AI Act** classifies healthcare AI systems as high-risk, with mandatory human oversight requirements active since August 2, 2025 for general-purpose AI models and fully applicable from August 2, 2026 (medical devices: August 2027). Non-compliance carries penalties up to 6% of global annual turnover. The requirement for "meaningful human oversight" of AI outputs creates an implicit obligation to actually understand what your team is shipping: "the model wrote it" does not satisfy the standard.

The **FDA's January 2025 draft guidance** for AI-enabled device software functions mandates AI Bill of Materials (AIBOMs), data lineage documentation, and post-market monitoring plans. The June 2025 cybersecurity guidance adds third-party component transparency requirements. A team that cannot explain the behavior of AI-generated code in a medical device submission is not compliant with this guidance.

**Practical consequence for tech leads**: If your team is building in a regulated space, the "explain this" gate in code review functions as a documentation requirement, not merely a learning exercise. Reviewers who rubber-stamp AI-generated code are creating liability, not just technical risk. This is worth stating explicitly in your team AI policy.
