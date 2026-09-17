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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "f15f8b44fad978686eb2a4ba5c93dc6b7cdcc4532604ce196617dce16488c69b"
contentMode: "local-full"
zh: ""
---

#### The Compound Engineering philosophy (Every.to)

The full Compound Engineering approach formalizes this intuition into a four-step loop and a broader philosophy for AI-native teams.

**The main loop: Plan → Work → Review → Compound**

Most teams skip the fourth step, which is where the real gains accumulate.

| Step | What happens | Time allocation |
|------|-------------|----------------|
| **Plan** | Understand the requirement, research the codebase and docs, design the solution | ~40% |
| **Work** | Agent implements in an isolated branch/worktree, validations run automatically | ~10% |
| **Review** | Multiple specialized agents review in parallel (security, performance, architecture, etc.), findings are prioritized P1/P2/P3 | ~40% |
| **Compound** | Document what worked, update CLAUDE.md with new patterns, create agents for recurring review tasks | ~10% |

The critical insight: 80% of engineer time should be planning and reviewing, 20% implementing and compounding. The job is shipping value, not writing code.

**The 50/50 rule**

Allocate 50% of engineering time to building features, 50% to improving the system (review agents, documented patterns, test generators). In traditional engineering, teams put 90/10 on features and end up with a codebase that gets harder to work with each year. The 50/50 split makes each iteration faster than the last.

**The adoption ladder**

Where you are determines what you should focus on next, not what someone else is doing at stage five.

| Stage | Description | Key unlock |
|-------|-------------|-----------|
| 0 | Manual development | — |
| 1 | Chat-based assistance (ChatGPT, copy-paste) | Good prompts, reuse them |
| 2 | Agentic tools with line-by-line review | CLAUDE.md, learn what to trust |
| 3 | Plan-first, PR-only review | Step away during implementation, review the diff |
| 4 | Idea to PR (single machine) | Full delegation, minimal touch points |
| 5 | Parallel cloud execution | Fleet of agents, you review PRs as they arrive |

Most developers plateau at stage 2 (approving every action) because they don't trust the output. Better safety nets fix this, not more review: tests, automated review agents, git worktrees for isolation.

**Key beliefs to adopt**

- Every unit of work should make subsequent work easier, not harder
- Taste belongs in systems (CLAUDE.md, agents, skills), not in manual review
- Build safety nets, not review processes: trust comes from verification infrastructure, not gatekeeping
- Plans are the new code: a well-written plan is the most valuable artifact you produce
- Parallelization is the new bottleneck: compute, not attention, is the constraint now

**The plugin (optional)**

Every shipped a Claude Code plugin that bundles this entire system: 26 specialized review agents, 23 workflow commands, and 13 domain skills.

```bash
claude /plugin marketplace add https://github.com/EveryInc/every-marketplace
claude /plugin install compound-engineering
```

This drops the full `docs/brainstorms/`, `docs/solutions/`, `docs/plans/`, and `todos/` structure into your project, along with commands like `/workflows:plan`, `/workflows:work`, `/workflows:review`, and `/workflows:compound`.

Installing the plugin is not required to apply the philosophy. The `docs/solutions/` pattern and the loop work with your existing Claude Code setup.
