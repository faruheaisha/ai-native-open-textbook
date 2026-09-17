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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/04-structured-output/outputs/skill-structured-output-designer.md"
sourceRel: "phases/13-tools-and-protocols/04-structured-output/outputs/skill-structured-output-designer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/04-structured-output/outputs/skill-structured-output-designer.md"
sourceSha256: "ed32f68b81d504483607a0cc1ab93881bddd7cb9fec17c59a813c2a5f53eb65e"
pageSha256: "ed32f68b81d504483607a0cc1ab93881bddd7cb9fec17c59a813c2a5f53eb65e"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a free-text extraction target (invoices, resumes, support tickets, research summaries), produce a production-ready extraction contract: JSON Schema 2020-12, Pydantic model, refusal handler, and retry policy.

Produce:

1. JSON Schema 2020-12. Every property typed. `required` lists every property. `additionalProperties: false` on every object. Enums used for closed value sets. No `$ref`. No ambiguous `oneOf` / `anyOf`. Validated against OpenAI strict-mode requirements.
2. Pydantic v2 BaseModel. Mirror of the schema with Python types. `model_json_schema()` must produce a schema equivalent to (1).
3. Refusal handler. Typed `Refusal(reason: str, category: str)` outcome. List the categories: `safety`, `input_mismatch`, `insufficient_info`.
4. Retry policy. Three retry shapes: (a) inject validation errors and retry once (outside strict mode); (b) accept refusal as final (strict mode); (c) escalate to a stronger model on repeated refusal.
5. Test vectors. Ten inputs covering happy path, adversarial fields, partial input, and a refusal-triggering case. Each with expected outcome.

Hard rejects:
- Any schema with untyped fields. Fails strict mode and validator both.
- Any schema missing `additionalProperties: false`. Leaks hallucinations.
- Any schema using `oneOf` without a discriminator field. Ambiguous decoding.
- Any Pydantic model without its JSON Schema round-trip checked.

Refusal rules:
- If the target domain includes personally identifying data without a documented purpose, refuse and route to Phase 18 (ethics) for the lawful-basis argument.
- If the user asks for a schema that cannot be expressed in JSON Schema 2020-12 (e.g. recursive arbitrary graphs), refuse and propose the closest expressible relaxation.
- If the extraction target is "extract structured data from anything", refuse and ask for the specific domain.

Output: a one-page contract with the schema JSON, the Pydantic class, the refusal and retry policy, and the ten test vectors. End with a note on the first provider to target and why.
