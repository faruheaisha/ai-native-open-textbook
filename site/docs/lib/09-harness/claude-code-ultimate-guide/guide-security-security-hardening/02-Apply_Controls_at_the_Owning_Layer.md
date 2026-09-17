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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/security-hardening.md"
sourceRel: "guide/security/security-hardening.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/security/security-hardening.md"
sourceSha256: "9e60a03ddb48e780dee266f946d4af20567529ee0e632ce6f3ed3cc721df06e8"
pageSha256: "2174d75563635fc5ab4a4c838e1356d5baab10867c18c214e55e7af4d9abf65d"
contentMode: "local-full"
zh: ""
---

## Apply Controls at the Owning Layer

Security review starts by identifying who owns the loop and who can act on its output. A runtime harness mediates tool use, permissions, context, and sandboxing. A repository harness supplies the instructions, dependency setup, and deterministic verification gates. An orchestrator can create additional identities, workspaces, handoffs, and unattended execution, so it needs separate credentials, budgets, stop conditions, and audit trails.

The [Agent Harness Map](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agent-harness-landscape/index) distinguishes runtime harnesses from the wider directory of plugins, frameworks, observability tools, and control planes. Use [Agent Harness Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index) to understand runtime boundaries, [Agent Tools: Beyond Claude Code](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index) to assess adjacent products, and [Session Observability](/lib/09-harness/claude-code-ultimate-guide/guide-ops-observability) to retain evidence without expanding access. Definitions live in the [glossary](/lib/09-harness/claude-code-ultimate-guide/guide-core-glossary).

Benchmark security separately from task completion. [AgentDojo](https://arxiv.org/abs/2406.13352) includes 97 realistic tasks and 629 prompt-injection security test cases, which makes utility and attack resistance visible as separate outcomes. [CaMeL](https://arxiv.org/abs/2503.18813) reports 77% task completion under its capability-based control design versus 84% for the undefended reference configuration. These studies do not prove that one control fits every harness, but they show why a single success score hides the security trade-off.

Harness optimizers expand the attack surface because they can modify prompts, tool exposure, control flow, or verification policy. Freeze non-negotiable security invariants outside the optimizer's mutation space. Reject candidates that weaken permission boundaries, leak evaluation data, suppress audit events, or improve task score by skipping a required check.

Worktree isolation is not process isolation. [Liza's pinned provider catalog](https://github.com/liza-mas/liza/blob/a22c12381c5d884d2586a48aaaa517bca184f9cf/provider-catalog.yaml), for example, launches external coding-agent CLIs and includes modes such as `--approve-all`, `--dangerously-skip-permissions`, and `--permission-mode dangerous`. Its worktrees reduce edit collisions and its supervisor constrains workflow transitions, but the launched process can still inherit host files, credentials, and network access. Review the generated global configuration, constrain writable roots, inject task-scoped credentials, and put an OS or container sandbox below the orchestrator before unattended execution. See the [Liza profile](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index#48-liza) for the code and CI evidence behind this classification.

Command policy is another distinct layer. Codex's official [`execpolicy`](https://github.com/openai/codex/blob/main/codex-rs/execpolicy/README.md) matches token prefixes and returns `allow`, `prompt`, or `forbidden`, with positive and negative examples that validate rules at load time. Liza maintainer Tangi Vass's experimental [bash-policy](https://github.com/liza-mas/bash-policy) instead parses compound Bash payloads into command units before returning `allow`, `manual`, or `deny`. The latter had no tagged release at the checked 2026-08-29 snapshot, so evaluate it as source code rather than as a mature dependency. Neither mechanism is a sandbox. Policy decides whether a command shape may run; sandboxing constrains what an allowed or bypassed process can reach.
