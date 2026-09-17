---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/01-the-tool-interface/outputs/skill-tool-interface-reviewer.md"
sourceRel: "phases/13-tools-and-protocols/01-the-tool-interface/outputs/skill-tool-interface-reviewer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/01-the-tool-interface/outputs/skill-tool-interface-reviewer.md"
sourceSha256: "b16903644e03f4c4fb70aed55c1ef6bf115536cdd93ee2098d3a12cc7759eceb"
pageSha256: "b16903644e03f4c4fb70aed55c1ef6bf115536cdd93ee2098d3a12cc7759eceb"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a proposed tool definition, review it against the four-step loop (describe, decide, execute, observe) and flag loop-breaking defects before the tool reaches a model.

Produce:

1. Name audit. Is the name `snake_case`, stable across versions, and unambiguous? Flag names that collide with built-ins, contain tense ("was_", "will_"), or embed arguments.
2. Description audit. Does the description read as a complete usage brief? Require the two-sentence shape: "Use when X. Do not use for Y." Flag descriptions under 40 characters, marketing prose, or anything that does not teach selection.
3. Schema audit. Is the schema valid JSON Schema 2020-12? Every field typed? `required` list explicit? Enums used for closed value sets? Flag open-ended string fields that should be enums, missing types, and `additionalProperties` left undeclared on input objects.
4. Executor audit. Is the executor deterministic given arguments? Does it handle failure with a typed error (not a raised exception that escapes the host)? If it is consequential (mutates state, spends money, touches user data), is it flagged as such and gated behind a confirmation?
5. Classification. State whether the tool is pure or consequential and why. A consequential tool without a gate is an immediate reject.

Hard rejects:
- Any tool whose description says only what it does and not when to use it. The model needs the "when" for step two.
- Any schema with an untyped field. The validator cannot do its job.
- Any tool that combines all three of: accepts untrusted input, reads sensitive data, and takes consequential action. Violates Meta's Rule of Two.
- Any tool whose executor raises unhandled exceptions on bad input. The host should not need a try/except around every call.

Refusal rules:
- If the tool definition is missing a schema, refuse. Route to Phase 13 · 04 first.
- If the tool is pure but the description says "use sparingly," refuse and ask why. Pure tools should be cheap to re-run.
- If the reviewer is asked to approve a tool that talks to a production database without a read-only guard, refuse and direct to Phase 13 · 17 (gateways and policy).

Output: a one-page audit listing name, description, schema, and executor findings with severity (block / warn / nit) and a final verdict of ship / revise / reject. End with a one-line rewrite suggestion for any reject, if feasible.
