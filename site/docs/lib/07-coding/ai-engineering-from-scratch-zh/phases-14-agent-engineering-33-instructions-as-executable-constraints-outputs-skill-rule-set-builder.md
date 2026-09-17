---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/33-instructions-as-executable-constraints/outputs/skill-rule-set-builder.md"
sourceRel: "phases/14-agent-engineering/33-instructions-as-executable-constraints/outputs/skill-rule-set-builder.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/33-instructions-as-executable-constraints/outputs/skill-rule-set-builder.md"
sourceSha256: "5dfe900dda51853c7edf9b888ec17dc20e012e980eabd65a6d5f20a58e30ac43"
pageSha256: "5dfe900dda51853c7edf9b888ec17dc20e012e980eabd65a6d5f20a58e30ac43"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a repo and any existing prose instructions (`AGENTS.md`, `CONTRIBUTING.md`, onboarding docs), produce a five-category rule set the workbench can execute.

The five categories:

1. `startup` — what must be true before work begins.
2. `forbidden` — what must never happen.
3. `definition_of_done` — what proves the task is complete.
4. `uncertainty` — what the agent does when not sure.
5. `approval` — what requires human sign-off.

Produce:

1. `docs/agent-rules.md` with one `##` heading per rule. Each rule carries `category`, `check`, and a one-line description.
2. `tools/rule_checker.py` with a `RuleChecker` class exposing one method per `check`. Each method takes a `TurnTrace` dataclass and returns `bool`.
3. `tools/rule_report.py` runner that loads rules, runs the checker on a trace, emits a `rule_report.json`.
4. A migration notes file: which prose lines became which rule, which were dropped as aspirational, why.

Hard rejects:

- Rules without a `check` field. Aspirational-only rules belong in onboarding docs, not in the workbench rule set.
- A single "be careful" rule. Specify a category and a check or remove it.
- Checks that require LLM calls. Rule checks must be deterministic and cheap so they can run every turn.
- Rule files over 200 lines. Split by category into `agent-rules.\{startup,forbidden,done,uncertainty,approval\}.md` and route from a parent index.

Refusal rules:

- If the agent product cannot supply a `TurnTrace` (no instrumentation), refuse to wire the checker until at least `read_state_file`, `edited_files`, and `tests_exit_code` are recorded.
- If existing instructions are mostly aspirational (>50%), surface that finding before emitting rules. The rule set will look thin; that is correct.
- If a rule is added because of a single past incident, attach the incident id so future review can decide if it is still needed.

Output structure:

```
<repo>/
├── docs/
│   └── agent-rules.md
├── tools/
│   ├── rule_checker.py
│   └── rule_report.py
└── docs/migration-notes.md
```

End with "what to read next" pointing to:

- Lesson 36 for per-task scope contracts that extend the forbidden category.
- Lesson 38 for verification gates that consume the rule report.
- Lesson 39 for the reviewer agent that scores rule compliance.
