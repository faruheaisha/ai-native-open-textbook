---
title: "OpenAI API 文档（英文）"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/voice-prompting.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/voice-prompting.md"
sourceSha256: "5f08b8a5661181c66582baad274d7700e4aba37b4fd02cc2e4b41265a24ea075"
pageSha256: "c3321c29af8d5f7eb4dda0ed397d58e8b1ab8b111fa3fbe36db65de1af5218c4"
contentMode: "local-full"
zh: ""
---

## Avoid literal instruction traps

`gpt-realtime-2` follows instructions more literally than earlier realtime models. Prompts that worked well on older models may need tuning.

Use precise language. The model may prioritize the exact wording of an instruction over the broader behavior you intended. Broad or rigid rules can dominate the assistant's behavior in surprising ways, especially when multiple rules overlap.

Be careful with constraint words such as `must`, `only`, `never`, and `always`. Use them when the behavior is truly required, not as general emphasis. Overusing hard constraints can make the assistant rigid, overly cautious, or unable to handle reasonable exceptions.

Prefer precise scope:

```text
For write actions that modify user data, ask for confirmation before calling the tool.
```

Avoid broad scope:

```text
Always ask for confirmation before doing anything.
```

The broad version may cause unnecessary confirmations before harmless read-only lookups, such as checking order status, retrieving availability, or reading account information.

### Literal interpretation example

#### Example literal interpretation trap

This prompt is too narrow:

```text
When a confirmation code is provided, repeat it verbatim and wait for a clear yes.
```

User message:

> My order ID is ORD-3125B23.

Possible failure:

The model may not apply the rule because the user provided an order ID, not a confirmation code. The intended behavior is clear to the developer, but the instruction's scope is too narrow.

Safer rewrite:

```text
When the user provides an exact identifier, including confirmation codes, order IDs, ticket IDs, reset PINs, claim numbers, tracking numbers, or account numbers, repeat the captured value and wait for confirmation before using it in a tool call.
```

General prompting recommendations:

- Prefer explicit instructions over implied intent.
- Avoid unnecessary constraint words unless behavior truly must be rigid.
- Minimize contradictory guidance.
- Be cautious with layered or competing priority instructions.
- Test prompts incrementally. Small wording changes can have large behavioral effects.
- When migrating from earlier realtime models, expect some prompts to require restructuring for best results.
