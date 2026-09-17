---
title: "Harness Engineering Study Guide"
sourceId: "09-harness/deusyu-harness-engineering"
sourceTitle: "Harness Engineering 学习指南"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deusyu/harness-engineering"
entryUrl: "https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/README.en.md"
sourceRel: "README.en.md"
rawUrl: "/raw/09-harness/deusyu-harness-engineering/README.en.md"
sourceSha256: "fc874bea00825ecd390e3dd0709e63740daf5d609b9c2e7884cb5f8ab5f526ca"
pageSha256: "fc874bea00825ecd390e3dd0709e63740daf5d609b9c2e7884cb5f8ab5f526ca"
contentMode: "local-full"
zh: ""
---

# Harness Engineering Study Guide

> A deep-dive learning archive on Harness Engineering — from concept to practice

[![Harness Engineering — humans steer, agents execute (intro deck cover, 2026-08 snapshot)](/mirror/f1/f1043e93ca6c50bafb7015ce711924bc13120ac9.webp)](https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/lib/09-harness/deusyu-harness-engineering/works-harness-engineering-intro-deck/README.md)

<p align="center"><sub>Cover from the repo's own <a href="/lib/09-harness/deusyu-harness-engineering/works-harness-engineering-intro-deck">intro deck + poster</a> — generated with the open-kimi-ppt skill; editable PPTD sources live in this repo</sub></p>

## Introduction

This is an evolving learning project. **Harness Engineering** is an engineering paradigm proposed by OpenAI in February 2026: engineers stop writing code and instead design environments, clarify intent, and build feedback loops so AI agents can work reliably.

> **Humans steer. Agents execute.**

This repository documents the full learning journey — from reading the original article, breaking down concepts, forming independent thoughts, hands-on experiments, to producing shareable work. We hope it helps others exploring AI-native engineering.

Source: [OpenAI — Harness Engineering: Harnessing Codex in an Agent-First World](https://openai.com/zh-Hans-CN/index/harness-engineering/)

> **Note:** The insights shared here are not universally applicable. Please adapt them to your own context.

## ⚡ In One Sentence

```
Traditional:          Humans write code → Machines run code
Harness Engineering:  Humans design constraints → Agents write code → Machines run code
```

The core shift: **an engineer's output moves from code to constraint systems** — AGENTS.md, architecture rules, custom linters, and feedback loops.

## 🧭 Six Core Concepts

<details>
<summary><b>1. Repo as System of Record</b> — If it's not in the repo, it doesn't exist for the agent</summary>

Slack threads, Google Docs, knowledge in people's heads = invisible to the agent. All decisions, specs, and plans must be committed as versioned artifacts.

→ See [concepts/01-repo-as-source-of-truth.md](/lib/09-harness/deusyu-harness-engineering/concepts-01-repo-as-source-of-truth)
</details>

<details>
<summary><b>2. Map, Not Manual</b> — AGENTS.md is a table of contents, not an encyclopedia</summary>

A ~100-line entry file pointing to deeper docs. Progressive disclosure: the agent starts from a small, stable entry point and is guided where to look next. Three ways a giant instruction file fails: crowds out context, impossible to maintain, can't be mechanically verified.

→ See [concepts/00-overview.md](/lib/09-harness/deusyu-harness-engineering/concepts-00-overview)
</details>

<details>
<summary><b>3. Mechanical Enforcement</b> — Docs rot; lint rules don't</summary>

Custom linters + structural tests = invariant guardians. Lint error messages embed fix instructions so agents can self-correct. Enforce boundaries centrally, allow autonomy locally.

→ See [concepts/02-mechanical-enforcement.md](/lib/09-harness/deusyu-harness-engineering/concepts-02-mechanical-enforcement)
</details>

<details>
<summary><b>4. Agent Readability</b> — Optimize for the agent's ability to reason</summary>

Prefer "boring" technologies (stable APIs, well-represented in training data). Sometimes re-implementing a focused subset is cheaper than wrapping opaque upstream behavior. Make the app launchable per git worktree.

→ See [concepts/04-agent-readability.md](/lib/09-harness/deusyu-harness-engineering/concepts-04-agent-readability)
</details>

<details>
<summary><b>5. Throughput Changes Merge Philosophy</b> — Correction is cheap; waiting is expensive</summary>

Short PR lifecycles. Flaky tests resolved by re-runs rather than blocking indefinitely. In a system where agent throughput far exceeds human attention, this is usually the right call.

→ See [concepts/05-throughput-changes-merge.md](/lib/09-harness/deusyu-harness-engineering/concepts-05-throughput-changes-merge)
</details>

<details>
<summary><b>6. Entropy Management = Garbage Collection</b> — Tech debt is a high-interest loan</summary>

Agents reproduce existing patterns in the repo — including bad ones. Codify "golden rules" into the repo. Run periodic background tasks to scan for drift, update quality scores, and open targeted refactoring PRs.

→ See [concepts/03-entropy-and-garbage-collection.md](/lib/09-harness/deusyu-harness-engineering/concepts-03-entropy-and-garbage-collection)
</details>

## 🔑 Key Data Points

| Metric | Data |
|--------|------|
| Team size | 3 → 7 engineers |
| Time span | 5 months |
| Codebase | ~1 million lines |
| PRs merged | ~1,500 |
| PRs per engineer per day | 3.5 (still growing after scaling) |
| Single run duration | 6+ hours (often during human sleep) |
| Efficiency estimate | ~1/10 of manual coding time |

## 📂 Repository Structure

```
harness-engineering/
├── README.md              ← Chinese (primary)
├── README.en.md           ← You are here
├── AGENTS.md              ← Repo navigation entry (for agents)
│
├── concepts/              # Phase 1: Concept notes (8 articles)
│   ├── 00-overview.md     #   Overview of all six concepts
│   ├── 01-repo-as-...     #   Repo as source of truth
│   ├── 02-mechanical-...  #   Mechanical enforcement
│   ├── 03-entropy-...     #   Entropy & garbage collection
│   ├── 04-agent-...       #   Agent readability
│   ├── 05-throughput-...  #   Throughput changes merge philosophy
│   ├── 06-harness-...     #   Harness definition (Fowler control-theory extension)
│   └── 07-spec-as-product.md #   Spec as product (Symphony extension)
│
├── thinking/              # Phase 2: Independent analysis (11 articles)
├── practice/              # Phase 3: Hands-on experiments (1 Ralph Demo)
├── feedback/              # Phase 4: Lessons learned (1 article)
├── works/                 # Phase 5: Shareable outputs (40 translations + 1 original + 2 external Chinese captures)
├── tools/                 # Tools that reduce the 6 complexity dimensions
├── prompts/               # Validated prompts collection
└── references/            # External resource index (79 articles with deep summaries)
```

Each subdirectory has its own `AGENTS.md` explaining its purpose and conventions — a direct practice of the "progressive disclosure" principle from the original article.

## 🚀 Learning Path

- [x] **Phase 1: Understand core concepts** — 8 concept notes covering OpenAI's six concepts + Fowler's control-theory extension + Symphony's spec-as-product
- [x] **Phase 2: Form your own opinions** — 11 independent analyses (ongoing)
- [x] **Phase 3: Pick a small project to practice** — Ralph Demo completed (321s, $0.31)
- [x] **Phase 4: Record feedback & iterations** — 1 article (ongoing)
- [x] **Phase 5: Produce shareable work** — 40 professional translations + 1 original synthesis + 2 external Chinese captures

## 📚 Research Library

79 articles across three knowledge tracks + 2 extended readings:

| Track | Coverage | Perspectives |
|-------|----------|-------------|
| AI-Era Harness Engineering | 75 articles | OpenAI → Fowler → Anthropic → LangChain → Stanford → Claude Code reverse engineering & source leak → Subagent runtime → Sensors/SPDD/ADLC → Out-of-scope, safety auditing & quality postmortems → Evaluation trilogy → Dynamic workflows → Origins (Ralph / Hashimoto) & discipline synthesis → Codex harness anatomy → Loop Engineering trilogy → Self-evolving harnesses & RSI → Formal verification → Multi-agent scaling (Cursor / C compiler) → Official containment & evals methodology → Behavior maps / DSLs / local models / outer-loop accountability → industrial-scale mechanical porting (Bun) & harness-model co-evolution (HarnessX) → long-running harness foundations & eval-environment confounders (Anthropic backfill) → harness operations metrics & reward hacking (Cursor backfill) → tool schemas are not neutral → the software-factory debate (Dex Horthy / Osmani) → agent-swarm cost economics → deleting 80% of the system prompt → a code-review-sensor benchmark (ReviewBench) → empirical refutation of TDD-as-process (Böckeler) → practical loop engineering (Osmani) → an org-scale adoption snapshot (Zalando) → open neutral harnesses & white-box compaction (Pi duo) → frozen-artifact cross-model transfer (StarHarness) |
| Cloud-Native Harness.io | 2 articles | CI/CD platform architecture (same name, different meaning) |
| Efficiency Paradox & Capability Evolution | 2 articles | YDD systematic teardown + METR follow-up (measurement-methodology crisis) |
| Extended Reading | 2 articles | Context Engineering, Human-Agent collaboration |

See [references/articles.md](/lib/09-harness/deusyu-harness-engineering/references-articles/index) — each article includes core thesis, key data, and cross-article connections.

## 📖 Translations

<details>
<summary><b>40 Chinese translations of key articles</b> (click to expand)</summary>

| Translation | Original Author | Source |
|-------------|----------------|--------|
| [Evaluating code review agents with ReviewBench](/lib/09-harness/deusyu-harness-engineering/works-langchain-reviewbench-translation) | Nick Hollon | LangChain |
| [TDD inside the agent loop - theater or actual value?](/lib/09-harness/deusyu-harness-engineering/works-fowler-tdd-in-agent-loop-translation) | Birgitta Böckeler | martinfowler.com |
| [Practical Loop Engineering](/lib/09-harness/deusyu-harness-engineering/works-osmani-practical-loop-engineering-translation) | Addy Osmani | AddyOsmani.com |
| [Agentic Engineering at Zalando: A Snapshot](/lib/09-harness/deusyu-harness-engineering/works-zalando-agentic-engineering-translation) | Bartosz Ocytko | Zalando Engineering |
| [What Is a Harness?](/lib/09-harness/deusyu-harness-engineering/works-pi-what-is-a-harness-translation) | Earendil / Pi team | earendil.com |
| [How Compaction Works in Pi](/lib/09-harness/deusyu-harness-engineering/works-pi-compaction-translation) | Earendil / Pi team | earendil.com |
| [StarHarness: Evolving Harnesses with Stratified Search](/lib/09-harness/deusyu-harness-engineering/works-arxiv-starharness-translation) | ServiceNow / Mila et al. | arXiv |
| [The New Rules of Context Engineering for Claude 5](/lib/09-harness/deusyu-harness-engineering/works-anthropic-context-engineering-claude5-translation) | Thariq Shihipar | Anthropic / Claude |
| [Better Models: Worse Tools](/lib/09-harness/deusyu-harness-engineering/works-ronacher-better-models-worse-tools-translation) | Armin Ronacher | Personal blog |
| [Rewriting Bun in Rust](/lib/09-harness/deusyu-harness-engineering/works-bun-in-rust-translation) | Jarred Sumner | Bun Blog |
| [Building a C Compiler with a Team of Parallel Claudes](/lib/09-harness/deusyu-harness-engineering/works-anthropic-c-compiler-translation) | Nicholas Carlini | Anthropic |
| [Scaling Long-Running Autonomous Coding](/lib/09-harness/deusyu-harness-engineering/works-cursor-scaling-agents-translation) | Wilson Lin | Cursor |
| [How We Contain Claude Across Products](/lib/09-harness/deusyu-harness-engineering/works-anthropic-how-we-contain-translation) | Max McGuinness et al. | Anthropic |
| [Harness Engineering for Self-Improvement](/lib/09-harness/deusyu-harness-engineering/works-weng-harness-self-improvement-translation) | Lilian Weng | Lil'Log |
| [Loop Engineering](/lib/09-harness/deusyu-harness-engineering/works-osmani-loop-engineering-translation) | Addy Osmani | Personal blog |
| [The Coming Loop](/lib/09-harness/deusyu-harness-engineering/works-ronacher-coming-loop-translation) | Armin Ronacher | Personal blog |
| [A Harness for Every Task: Dynamic Workflows](/lib/09-harness/deusyu-harness-engineering/works-anthropic-dynamic-workflows-translation) | Thariq Shihipar et al. | Anthropic / Claude |
| [METR: Changing Our Productivity Experiment Design](/lib/09-harness/deusyu-harness-engineering/works-metr-uplift-update-translation) | Joel Becker et al. | METR |
| [Inside the Scaffold](/lib/09-harness/deusyu-harness-engineering/works-inside-the-scaffold-paper-translation/index) | Benjamin Rombaut | Huawei / arXiv |
| [Meta-Harness](/lib/09-harness/deusyu-harness-engineering/works-meta-harness-paper-translation/index) | Yoonho Lee et al. | Stanford / arXiv |
| [Harness Engineering (full)](/lib/09-harness/deusyu-harness-engineering/works-fowler-harness-engineering-full-translation) | Birgitta Böckeler | Martin Fowler |
| [Harness Engineering (memo)](/lib/09-harness/deusyu-harness-engineering/works-fowler-harness-engineering-memo-translation) | Birgitta Böckeler | Martin Fowler |
| [Encoding Team Standards](/lib/09-harness/deusyu-harness-engineering/works-fowler-encoding-team-standards-translation) | Rahul Garg | Martin Fowler |
| [Feedback Flywheel](/lib/09-harness/deusyu-harness-engineering/works-fowler-feedback-flywheel-translation) | Rahul Garg | Martin Fowler |
| [Scaling Managed Agents](/lib/09-harness/deusyu-harness-engineering/works-anthropic-managed-agents-translation) | Lance Martin et al. | Anthropic |
| [Agent Evaluation Checklist](/lib/09-harness/deusyu-harness-engineering/works-langchain-agent-evaluation-checklist-translation) | LangChain Team | LangChain |
| [Agent-driven Development](/lib/09-harness/deusyu-harness-engineering/works-github-agent-driven-development-translation) | Tyler McGoffin | GitHub |
| [Continual Learning](/lib/09-harness/deusyu-harness-engineering/works-langchain-continual-learning-translation) | Harrison Chase | LangChain |
| [Codex Orchestration Spec: Symphony](/lib/09-harness/deusyu-harness-engineering/works-openai-codex-symphony-translation) | Kotliarskyi et al. | OpenAI |
| [Claude Code Architecture (Reverse Engineered)](/lib/09-harness/deusyu-harness-engineering/works-claude-code-architecture-reverse-translation) | Vikash Rungta | Substack |
| [Maintainability Sensors for Coding Agents](/lib/09-harness/deusyu-harness-engineering/works-fowler-sensors-translation) | Birgitta Böckeler | Martin Fowler |
| [Structured-Prompt-Driven Development (SPDD)](/lib/09-harness/deusyu-harness-engineering/works-fowler-spdd-translation) | Wei Zhang et al. | Martin Fowler |
| [The Agent Development Lifecycle (ADLC)](/lib/09-harness/deusyu-harness-engineering/works-langchain-adlc-translation) | Harrison Chase | LangChain |
| [Interpreters in Deep Agents](/lib/09-harness/deusyu-harness-engineering/works-deep-agents-interpreter-translation) | Hunter Lovell | LangChain |
| [Claude Code Quality Postmortem](/lib/09-harness/deusyu-harness-engineering/works-anthropic-postmortem-translation) | Anthropic Eng | Anthropic |
| [Agentic Harness Engineering (paper)](/lib/09-harness/deusyu-harness-engineering/works-arxiv-agentic-harness-engineering-translation) | Jiahang Lin et al. | Fudan / arXiv |
| [Overeager Coding Agents (paper)](/lib/09-harness/deusyu-harness-engineering/works-arxiv-overeager-coding-agents-translation) | Yubin Qu et al. | arXiv |
| [How I Use AI to Code](/lib/09-harness/deusyu-harness-engineering/works-chris-ai-code-translation) | Chris Parsons | Personal blog |
| [How We Built LangSmith Engine](/lib/09-harness/deusyu-harness-engineering/works-langsmith-engine-translation) | Palash Shah | LangChain |

</details>

## 🛠️ Development Notes

The repo ships with a consistency checker, `scripts/check-consistency.sh`, guarding against count and fidelity drift across fourteen layers of checks:

- **C1-C2** — `references/articles.md` article count + its 4 downstream claim sites (README × 2 badges, `prompts/deep-research-tracker.md` header, `references/AGENTS.md` overview)
- **C3** — actual `*.md` file counts in `concepts/` / `thinking/` / `feedback/` match the README "X 篇" claims
- **C4** — `works/*-translation.md` file count matches every translation-count claim (badges, table summaries, Phase 5 mentions, AGENTS snapshot, table row counts)
- **C5** — the README structure tree lists every single `concepts/*.md` file
- **C6** — the "不计入 N 篇" exclusion note at the end of `references/articles.md` matches the C1 authority count
- **C7** — per-track counts (Track 1/2/3) stay consistent across their 4 downstream claim sites (README research-library tables × 2, `references/AGENTS.md` track headings, `prompts/deep-research-tracker.md` track lines)
- **C8** — local translation-pipeline guard: once `translate/<...>/sources/<slug>/source-full.md` is captured, the matching `01-analysis.md` may no longer claim "abstract-only / fetch full text later". `translate/` is gitignored, so this auto-SKIPs on CI and clean clones
- **C9** — authored prose in `concepts/` / `thinking/` / `feedback/` must not restate library counts ("N articles / N translations") as live facts; historical mentions must carry a dated-snapshot qualifier, otherwise drop the number and link `references/articles.md`
- **C10** — figure fidelity (purely local, zero network): every translation's frontmatter must declare `sourceFigureCount`, the body must embed at least that many images, and every local embed path must exist on disk (`null` = source unavailable / unaudited → SKIP)
- **C11** — markdown table shape: in the checked files, every table row must carry the same cell count as its header
- **C12** — every numbered entry in `references/articles.md` must carry the **作者：** and **日期：** fields
- **C13** — zero-figure claims need an audit trail. C10 can only falsify OVER-claiming, so `sourceFigureCount: 0` is unfalsifiable locally — that hole shipped a false 0 on 2026-07-27 (the source had 4 body figures). Any translation claiming 0 must therefore also carry `sourceFigureAudit` containing a `YYYY-MM-DD` date, stating how the claim was verified
- **C14** — docs-site harness integrity: the VitePress sidebar and every displayed count must be derived from the filesystem at build time by `.vitepress/sidebar.mjs`; site sources (`index.md`, `.vitepress/**`) must not hardcode counts, and `node .vitepress/sidebar.mjs --verify` asserts every first-class content file appears in the generated sidebar exactly once and rejects any symlink in the repo (symlinks can leak external files into the published artifact). On the artifact side, `scripts/verify-dist.mjs` asserts published pages and their `.md` copies correspond one-to-one, that relative links and images inside the copies resolve, and that dist contains no symlinks

**Enable the pre-commit hook after first clone:**

```bash
git config core.hooksPath .githooks
```

Once enabled, every commit touching the README, `AGENTS.md`, `references/articles.md`, `references/AGENTS.md`, `index.md`, `.vitepress/`, `scripts/check-consistency.sh`, or any `*.md` (nested included) under `concepts/` / `thinking/` / `feedback/` / `works/` / `practice/` / `tools/` / `prompts/` runs the checks automatically; staging a symlink at any path is rejected outright (the repo-wide C14 ban, judged on the staged state). Unrelated commits are left alone.

**Run manually:** `bash scripts/check-consistency.sh`

**CI backstop:** even without the local hook, GitHub Actions (`.github/workflows/consistency.yml`) runs the same script on every push / PR (no path filters, so the branch-protection required check always gets reported). The local hook is fast feedback during development; CI is the actual merge gate.

See the "机械化检查" section of the root `AGENTS.md` for details.

## 🪞 The repo is its own harness (self-reference)

> This archive now curates itself.
>
> Bringing in outside research no longer runs on vibes — it follows a pipeline frozen into a skill, [`curate-research`](/lib/09-harness/deusyu-harness-engineering/_claude-skills-curate-research-SKILL): review is automated by parallel agents (the feedback loop), `scripts/check-consistency.sh` keeps counts and fidelity from drifting via C1–C14 (the mechanical rail), and whether something gets in is always a human gate (humans steer, agents execute).
>
> So the constraints themselves became the product — exactly what [concepts/07-spec-as-product.md](/lib/09-harness/deusyu-harness-engineering/concepts-07-spec-as-product) argues, except this time the subject is the repo itself.

## 🤝 Contributing

Contributions via Issues and PRs are welcome:
- Add concept notes (`concepts/` has gaps to fill)
- Share your independent thinking (`thinking/`)
- Contribute practice cases (`practice/`)
- Recommend related resources (`references/`)

## 📞 Contact

| Channel | Link |
|---------|------|
| GitHub | [@deusyu](https://github.com/deusyu) |
| X (Twitter) | [@0xdeusyu](https://x.com/0xdeusyu) |
| Telegram | [@DeusThink](https://t.me/DeusThink) |
| Telegram Group | [@talkdeusyu](https://t.me/talkdeusyu) |
| Telegram Channel | [@lovedesuyu](https://t.me/lovedesuyu) |
| Email | [rainman.deus@gmail.com](mailto:rainman.deus@gmail.com) |

## 📄 License

MIT
