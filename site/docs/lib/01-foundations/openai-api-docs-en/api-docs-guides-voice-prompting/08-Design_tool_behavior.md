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
pageSha256: "04b829dfe9c111e7c8b57b06074639e62960539b505a8f5a483bd9e39daaa2de"
contentMode: "local-full"
zh: ""
---

## Design tool behavior

`gpt-realtime-2` is stronger at tool calling, but tool behavior still depends on prompt and tool-spec design. If the prompt does not define when to act, ask, confirm, or recover, the assistant may call tools too early, ask unnecessary questions, or repeat failed calls.

### Set tool-call eagerness

High eagerness works well for read-only, low-risk actions. Low eagerness is better when tools modify data, trigger external effects, or depend on exact identifiers.

| Tool type                           | Default behavior                                          |
| ----------------------------------- | --------------------------------------------------------- |
| Read-only, low-risk lookup          | Call when intent and required fields are clear.           |
| Read-only with exact identifier     | Confirm the identifier before lookup.                     |
| User-visible communication          | Draft or summarize before sending.                        |
| Account changes                     | Confirm before calling.                                   |
| Purchases, cancellations, payments  | Confirm amount, target, and consequence before calling.   |
| Irreversible or high-impact actions | Confirm explicitly and offer escalation when appropriate. |

Use this balanced default when you have a mix of read and write actions. Tailor it based on your use case.

```text
## Tools

Use only the tools explicitly provided in the current tool list. Do not invent, assume, simulate, or rename tools.

For read-only tools:

- Call the tool when the user's intent is clear and all required fields are available.
- Do not ask for confirmation unless the lookup depends on a high-precision identifier or there is meaningful risk of using the wrong record.
- Ask a clarification question only if a required field is missing, ambiguous, or conflicting.

For write tools or external actions:

- Summarize the intended action before calling the tool.
- Include the key consequence, such as what will be changed, sent, canceled, ordered, or charged.
- Ask for confirmation.
- Do not call the tool until the user clearly confirms.

For exact identifiers:

- Treat order IDs, tracking numbers, account numbers, confirmation codes, phone numbers, and email addresses as high precision.
- Normalize only when the field type is clear.
- Confirm the final value before account-specific lookups, validation, or write actions.

After tool calls:

- Only say an action was completed after the tool call succeeds.
- If the tool fails, explain the failure briefly, avoid raw errors, and give the user a clear next step.
```

High-risk example:

> User: Charge my card for the remaining balance.

Bad:

> Assistant: I've charged your card.

Good:

> Assistant: To confirm, you want me to charge the card on file $248.16 for the remaining balance. Should I proceed?

### Recover from tool failures

Tool failures are part of the conversation. A good recovery should explain what happened and give the user a clear next step.

Do not treat every failure the same. Recovery behavior should depend on the tool type, failure mode, and user impact. Some failures should be handled silently with a retry. Others require asking the user to clarify, correct an identifier, confirm a new action, or choose an alternate path.

```text
## Tool Failures

If a tool call fails:

1. Briefly explain what failed in user-friendly language.
2. Do not blame the user or expose raw tool errors.
3. If the failure may be due to an exact identifier, read back the value used and ask the user to correct it.
4. If the failure may be temporary, offer to retry once.
5. If the same failure happens repeatedly, offer an alternate path or escalation.

Do not repeatedly call the same tool with the same arguments after failure.

Do not ask for a different identifier until you have first checked whether the captured value was correct.
```

Bad:

> Assistant: Something went wrong.

Good:

> Assistant: I couldn't find a match for O R D dash 3 1 2 5 B 2 3. Did I get any part of that wrong?

### Keep tool availability synchronized

Realtime models are eager to help. If the prompt mentions a tool that is not actually available, or if the tool list does not match the prompt, the model may invent a tool name or pretend it completed the action.

For example, if the prompt references `lookup_order`, but the provided tool is named `search_orders`, the model may call the wrong name or simulate the action.

```text
## Tool Availability

Use only the tools that are explicitly provided in the current tool list.

Do not invent, assume, or simulate tools. If a tool is mentioned in the instructions but is not present in the tool list, treat it as unavailable.

If the user requests an action that requires an unavailable tool:

1. Do not pretend to complete the action.
2. Briefly explain that the tool is not available.
3. Offer the closest supported next step.

Only say an action was completed after the relevant tool call succeeds.
```

Use the prompt audit meta prompt in the appendix to review production prompts
  for contradictions, missing tools, and brittle instructions.
