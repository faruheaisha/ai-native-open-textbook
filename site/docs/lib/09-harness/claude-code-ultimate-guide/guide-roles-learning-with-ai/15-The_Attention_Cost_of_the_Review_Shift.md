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
pageSha256: "a7b8122b215ec12e18529a152afd3fc203ec8564d37d571dbb3bf05a530c0b35"
contentMode: "local-full"
zh: ""
---

## The Attention Cost of the Review Shift

> **Audience**: Developers at any experience level, plus tech leads doing capacity planning.
>
> **Problem**: [§3 The Reality of AI Productivity](#the-reality-of-ai-productivity) establishes that the review bottleneck has inverted. This section covers what that inversion costs the person doing the reviewing, and why that cost almost never appears in an adoption plan.

The standard adoption story treats review as the cheap half of the job. Code gets generated, a human glances at it, the team ships. That framing survives only until someone measures how review actually behaves under load, and the measurements have existed since 2006.

### What Moved

Two independent 2026 surveys put numbers on the same shift.

| Measure | Finding | Source |
|---------|---------|--------|
| Weekly hours reviewing AI-generated code | 11.4h median, versus 9.8h writing new code (+31% YoY) | Digital Applied Q1 2026, n=2,847 developers |
| Heavy agentic-tool users | 14-16h/week reviewing, writing hours flat or down | Same survey |
| Share of the work week spent checking, fixing, validating AI output | 24% | Sonar 2026 State of Code |
| Developers who do not fully trust AI output | 96%, of whom only 48% always verify before committing | Sonar 2026 State of Code |

Both are vendor surveys built on self-reported hours, so treat the direction as reliable and the magnitude as indicative. The gap between "I do not trust this" and "I verified it anyway" is where the load actually lands.

### Review Has a Measured Ceiling

The reference dataset is still the Cisco case study run by Jason Cohen at SmartBear over ten months, published as *Best Kept Secrets of Peer Code Review* (2006). About 50 developers on the Cisco MeetingPlace product, roughly 2,500 reviews covering 3.2 million lines of C/C++, instrumented automatically through the Code Collaborator tool.

| Finding | Threshold |
|---------|-----------|
| Defect density falls sharply past a certain review size | Under 200 LOC ideal, 400 LOC is the ceiling. No review larger than 250 lines produced more than 37 defects per kLOC |
| Inspection pace governs detection | Best results under 300 LOC/hour, meaningful drop past 500 LOC/hour |
| Sustained review decays | Detection falls off after ~60 minutes, collapses past 90 |
| Expected yield inside the band | 70-90% of existing defects on a 200-400 LOC review spread over 60-90 minutes |

Caveats worth stating: this is observational rather than randomized, one company, one language family, and it predates AI entirely. Its value is that the limits it found are cognitive rather than procedural, which is why they did not move when the tooling did.

Neuroimaging work supports that reading. Siegmund et al. ([ICSE 2014](https://www.cs.cmu.edu/~ckaestne/pdf/icse14_fmri.pdf)) showed that comprehending even short snippets recruits working memory, attention, and language regions. Floyd et al. ([ICSE 2017](https://doi.org/10.1109/ICSE.2017.24)) found that reviewing code has a neural signature distinct from reviewing prose, and that the signature shifts with expertise. Peitek et al. ([2021](https://doi.org/10.1109/ICSE43902.2021.00056)) found that plain structural properties, textual size and vocabulary size above all, predict measured cognitive load during comprehension.

**Operational consequence**: an agent will happily produce a 900-line diff. That single artifact sits four times past the size where human defect detection is known to degrade. Constrain the agent's output size rather than asking reviewers to absorb it.

### Reviewing Machine Output Is a Third Mode

Reviewing agent output is neither writing nor reviewing a colleague. It carries a failure mode the human factors literature named decades ago.

- **Parasuraman & Riley** ([Human Factors, 1997](https://journals.sagepub.com/doi/10.1518/001872097778543886)) mapped use, misuse, disuse and abuse of automation, and described complacency: reliable automation lowers the vigilance applied to it.
- **Goddard et al.** ([2011 systematic review](https://pmc.ncbi.nlm.nih.gov/articles/PMC3240751/), clinical decision support) quantified it. Following erroneous automated advice raised the risk of an incorrect decision by roughly 26% compared with unaided decision making.
- **Lee, Sarkar et al.** ([CHI 2025](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/), Microsoft Research and Carnegie Mellon, 319 knowledge workers, 936 first-hand task examples) found that higher confidence in GenAI predicts *less* critical thinking, while higher confidence in one's own ability predicts *more*. They also found the work of critical thinking migrating into three activities: verifying information, integrating responses, and stewarding the task.
- **DORA** ([trust in AI](https://dora.dev/insights/trust-in-ai/)) reports roughly 39% of developers outside Google trust generative AI output "a little" or "not at all".

A tool that is usually right is harder to review well than one that is usually wrong. Obvious garbage triggers scrutiny. Plausible output does not.

### The Day Lost Its Low-Load Stretches

Writing routine code was cognitively cheap, and it ended. Both properties mattered, and both are gone from a review-dominated day. This is the part of the picture with the strongest practitioner signal and the weakest measurement, so the evidence is presented with its limits attached.

| Finding | Detail | Confidence |
|---------|--------|-----------|
| "AI brain fry" | BCG and UC Riverside, n=1,488 US employees: 14% report mental fatigue from AI oversight beyond cognitive capacity, 18% among developers. Managing 3+ agents: +14% mental effort, +12% fatigue | Survey, named institutions, self-report |
| Routine offload helps | Same study: using AI for genuinely repetitive tasks correlated with ~15% *lower* burnout | Correlational |
| Adoption raises job demands | [arXiv 2510.07435](https://arxiv.org/html/2510.07435v2), "Modeling Developer Burnout with GenAI Adoption": adoption heightens burnout by raising job demands, mitigated by job resources and positive perception of the tool (JD-R model) | Survey-based SEM, preprint |
| The field admits the gap | [arXiv 2605.22349](https://arxiv.org/pdf/2605.22349.pdf), "At What Cost?": only a small number of studies explicitly theorize or measure burnout, stress or work-life balance in AI-assisted development | Literature review |

The recovery literature is older and firmer. Wendsche & Lohmann-Haislah's meta-analysis ([Frontiers in Psychology, 2017](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2016.02072/full), 86 publications, k=91 samples, N=38,124) found psychological detachment from work associated with lower exhaustion, better sleep and higher life satisfaction, with correlations in the 0.30 to 0.36 range. It also found heavy work investment negatively related to detachment, at a medium effect size.

One finding cuts against the simple reading, and it matters for anyone who recognises themselves in "I cannot put it down and I have never enjoyed it more". A study of Norwegian knowledge workers ([Frontiers in Psychology, 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7205444/)) identified a high-involvement profile combining low detachment with high autonomous motivation. That profile scored *lower* on emotional exhaustion than the higher-detachment group. Low detachment is not by itself a burnout trajectory. It becomes one when the involvement is driven by demand rather than by autonomous motivation, which is the distinction to check before diagnosing anyone, including yourself.

### The Apprenticeship Ladder Ran Through the Writing Phase

The labour market data is unusually good for a question this recent.

| Study | Method | Finding |
|-------|--------|---------|
| Brynjolfsson, Chandar & Chen, ["Canaries in the Coal Mine"](https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/) (Stanford Digital Economy Lab, Nov 2025) | ADP payroll records, ~1 in 6 US workers, 285,000 firms | ~16% relative employment decline for ages 22-25 in the most AI-exposed occupations. Adjustment runs through reduced hiring rather than termination, and through headcount rather than wages. With firm-time fixed effects the signal starts in 2024 |
| Westby, Sasser Modestino et al. ([June 2025](https://aliciasassermodestino.com/wp-content/uploads/2025/06/Impact_of_GenAI_on_SWEs_061625.pdf)) | 1.5M+ software developer vacancies, 2021-2023, difference-in-differences with month and location fixed effects | 16.3% drop in the junior share of software developer postings after the November 2022 ChatGPT release, larger than for other computer and mathematical occupations |
| Lichtinger & Hosseini Massoum (Harvard) | LinkedIn and Revelio Labs, ~62M workers, 285,000 firms, 2015-2025 | Junior hiring falls in AI-adopting firms from Q1 2023 while senior headcount rises |

Those three describe the market. The training mechanism is the part nobody has measured. The ladder ran write, get reviewed, absorb the reviewer's reasoning, eventually review others. Cutting the first rung does not automatically produce the third one, and the assumption that it does is currently an assumption.

**No study has yet tracked whether a developer trained primarily on review reaches senior-level judgment at the same rate as one trained on writing.** Anyone claiming otherwise in either direction is extrapolating. The practices in [§13 For Tech Leads & Engineering Managers](#for-tech-leads--engineering-managers) are built to hedge against the pessimistic case at low cost.

### Practices That Address This

| Practice | Who | Why |
|----------|-----|-----|
| Cap agent diff size at 200-400 lines per reviewable unit | Individual, enforced in team policy | Keeps review inside the band where detection holds |
| Time-box review at 60 minutes, hard stop at 90 | Individual | Past that, added time yields close to nothing |
| Split "explore with the agent" from "review for merge" into separate sessions | Individual | Verification and generation are different modes, and interleaving them costs the vigilance |
| Track review hours as work, not as overhead | Tech lead | A 14h/week review load is most of a role, and capacity plans that ignore it are wrong by design |
| Keep one weekly block of manual writing | Individual | Preserves the cheap-cognition stretch and keeps the skill calibrated. Deleuze recommends alternating sessions deliberately (see [adoption-approaches.md](/lib/09-harness/claude-code-ultimate-guide/guide-roles-adoption-approaches#what-we-do-know-empirical-data)) |
| Cap daily AI development cycles even when tooling allows more | Individual, tech lead | Reported fatigue within weeks when practitioners ignored the cap (Lepine, IFTTD ep 351) |
| Distinguish demand-driven from motivation-driven overwork before intervening | Tech lead | The Norwegian profile data shows the two look identical from outside and need opposite responses |

### Observe attention alongside throughput

[Clare Liguori's AWS account at 15:48](https://www.youtube.com/watch?v=pqlWNihgdjI&t=948s) describes the pressure of continuous agent work and multiple terminals. [Nicole Forsgren at 7:24](https://www.youtube.com/watch?v=DfrAaDgFgjc&t=444s) discusses flow, feedback and cognitive load as dimensions of developer experience. These interviews complement IFTTD's practitioner accounts; they do not establish a clinical burnout rate or a causal effect of agent concurrency.

Record concurrent tasks, interruptions, context resumptions, review effort and self-reported difficulty stopping. Agree a concurrency limit to evaluate locally and compare equivalent work before and after the change. Do not convert a line-count heuristic or an individual report into a universal cognitive threshold.

### What Is Not Established

Stated plainly so nobody over-reads this section:

- Whether review-heavy work causes burnout at a higher rate than write-heavy work. Nobody has run that comparison.
- Whether reduced friction in an intrinsically motivating activity drives overwork. It is a plausible mechanism, consistent with the detachment findings on heavy work investment, and it has not been tested on developers.
- Whether the Cisco thresholds transfer to reviewing machine-generated diffs. The automation bias literature suggests the effective ceiling is *lower*, never higher, but that has not been measured directly.
- Whether the junior hiring decline reflects AI capability or ordinary post-2022 cost discipline. The Stanford design controls for firm shocks and finds AI exposure predictive, which is strong evidence, not proof.
