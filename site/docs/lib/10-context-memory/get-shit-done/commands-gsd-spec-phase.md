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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/spec-phase.md"
sourceRel: "commands/gsd/spec-phase.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/spec-phase.md"
sourceSha256: "c62637c4a39ff180c6a270dfaf4562236d89efb0c6b3ea6d80f2eb075639a9b3"
pageSha256: "c62637c4a39ff180c6a270dfaf4562236d89efb0c6b3ea6d80f2eb075639a9b3"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Clarify phase requirements through structured Socratic questioning with quantitative ambiguity scoring.

**Position in workflow:** `spec-phase → discuss-phase → plan-phase → execute-phase → verify`

**How it works:**
1. Load phase context (PROJECT.md, REQUIREMENTS.md, ROADMAP.md, STATE.md)
2. Scout the codebase — understand current state before asking questions
3. Run Socratic interview loop (up to 6 rounds, rotating perspectives)
4. Score ambiguity across 4 weighted dimensions after each round
5. Gate: ambiguity ≤ 0.20 AND all dimensions meet minimums → write SPEC.md
6. Commit SPEC.md — discuss-phase picks it up automatically on next run

**Output:** `\{phase_dir\}/\{padded_phase\}-SPEC.md` — falsifiable requirements that lock "what/why" before discuss-phase handles "how"
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/spec-phase.md
@~/.claude/get-shit-done/templates/spec.md
&lt;/execution_context>

&lt;runtime_note>
**Copilot (VS Code):** Use `vscode_askquestions` wherever this workflow calls `AskUserQuestion`. They are equivalent.
&lt;/runtime_note>

&lt;context>
Phase number: $ARGUMENTS (required)

**Flags:**
- `--auto` — Skip interactive questions; Claude selects recommended defaults and writes SPEC.md
- `--text` — Use plain-text numbered lists instead of TUI menus (required for `/rc` remote sessions)

Context files are resolved in-workflow using `init phase-op`.
&lt;/context>

&lt;process>
Execute end-to-end.

**MANDATORY:** Read the workflow file BEFORE taking any action. The workflow contains the complete step-by-step process including the Socratic interview loop, ambiguity scoring gate, and SPEC.md generation. Do not improvise from the objective summary above.
&lt;/process>

&lt;success_criteria>
- Codebase scouted for current state before questioning begins
- All 4 ambiguity dimensions scored after each interview round
- Gate passed: ambiguity ≤ 0.20 AND all dimension minimums met
- SPEC.md written with falsifiable requirements, explicit boundaries, and acceptance criteria
- SPEC.md committed atomically
- User knows they can now run /gsd:discuss-phase which will load SPEC.md automatically
&lt;/success_criteria>
