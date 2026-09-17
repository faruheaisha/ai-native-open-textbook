---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/plan-review-convergence.md"
sourceRel: "commands/gsd/plan-review-convergence.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/plan-review-convergence.md"
sourceSha256: "5176125d10a7cf93f894d7115fcc0a24717bdc2fd30dad8e99db9a0e61118e18"
pageSha256: "5176125d10a7cf93f894d7115fcc0a24717bdc2fd30dad8e99db9a0e61118e18"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Cross-AI plan convergence loop — an outer revision gate around gsd-review and gsd-planner.
Repeatedly: review plans with external AI CLIs → if HIGH concerns found → replan with --reviews feedback → re-review. Stops when no HIGH concerns remain or max cycles reached.

**Flow:** Agent→Skill("gsd-plan-phase") → Agent→Skill("gsd-review") → check HIGHs → Agent→Skill("gsd-plan-phase --reviews") → Agent→Skill("gsd-review") → ... → Converge or escalate

Replaces gsd-plan-phase's internal gsd-plan-checker with external AI reviewers (codex, gemini, etc.). Each step runs inside an isolated Agent that calls the corresponding existing Skill — orchestrator only does loop control.

**Orchestrator role:** Parse arguments, validate phase, spawn Agents for existing Skills, check HIGHs, stall detection, escalation gate.
&lt;/objective>

&lt;execution_context>
@$HOME/.claude/get-shit-done/workflows/plan-review-convergence.md
@$HOME/.claude/get-shit-done/references/revision-loop.md
@$HOME/.claude/get-shit-done/references/gates.md
@$HOME/.claude/get-shit-done/references/agent-contracts.md
&lt;/execution_context>

&lt;runtime_note>
**Copilot (VS Code):** Use `vscode_askquestions` wherever this workflow calls `AskUserQuestion`. They are equivalent — `vscode_askquestions` is the VS Code Copilot implementation of the same interactive question API. Do not skip questioning steps because `AskUserQuestion` appears unavailable; use `vscode_askquestions` instead.
&lt;/runtime_note>

&lt;context>
Phase number: extracted from $ARGUMENTS (required)

**Flags:**
- `--codex` — Use Codex CLI as reviewer (default if no reviewer specified)
- `--gemini` — Use Gemini CLI as reviewer
- `--claude` — Use Claude CLI as reviewer (separate session)
- `--opencode` — Use OpenCode as reviewer
- `--ollama` — Use local Ollama server as reviewer (OpenAI-compatible, default host `http://localhost:11434`; configure model via `review.models.ollama`)
- `--lm-studio` — Use local LM Studio server as reviewer (OpenAI-compatible, default host `http://localhost:1234`; configure model via `review.models.lm_studio`)
- `--llama-cpp` — Use local llama.cpp server as reviewer (OpenAI-compatible, default host `http://localhost:8080`; configure model via `review.models.llama_cpp`)
- `--all` — Use all available CLIs and running local model servers
- `--max-cycles N` — Maximum replan→review cycles (default: 3)

**Feature gate:** This command requires `workflow.plan_review_convergence=true`. Enable with:
`gsd config-set workflow.plan_review_convergence true`
&lt;/context>

&lt;process>
Execute end-to-end.
Preserve all workflow gates (pre-flight, revision loop, stall detection, escalation).
&lt;/process>
