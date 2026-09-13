---
title: "Rule Playground"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/README.md"
zh: ""
---

# Rule Playground

The Rule Playground is an interactive read-eval-print loop for the rule DSL. Use it to prototype expressions, inspect the field schema, and try out built-in metric primitives before promoting your logic into a full rule.

## Sections

| Section | Purpose |
|---|---|
| **Expression editor** | Write a DSL expression and choose a scope (`requests` or `sessions`). Results stream back against the current date and workspace filters |
| **Field browser** | Every field available on `SessionRequest` and `Session`, with types and short descriptions |
| **Function catalog** | All DSL helpers (`countWhere`, `flatCount`, `someWhere`, `ratio`, `truncate`, and others) |
| **Metric list** | Named metric primitives you can reference from any rule |

## Workflow

1. Pick a scope and type an expression.
2. Hit **Evaluate** to see the result, along with a count of matched rows.
3. Iterate against your real sessions until the expression captures the behaviour you want.
4. Copy the final expression into a rule in the [Rule Editor](https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/improve/rule-editor/README.md).

The playground shares its DSL runtime with the rule engine, so any expression that works here will behave identically when wired into a full rule.
