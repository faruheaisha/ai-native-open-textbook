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
pageSha256: "68fca617fbf208b196259255692d21c3b82fdd86e455c448900d5cc9c027ad6d"
contentMode: "local-full"
zh: ""
---

## Capture exact entities

Many realtime workflows depend on exact values: order IDs, tracking numbers, email addresses, confirmation codes, account numbers, claim numbers, ticket IDs, support references, and phone numbers.

Voice makes this hard. Users speak quickly, group numbers in different ways, spell partial values, use filler, correct themselves mid-turn, or pronounce characters that sound alike. One wrong digit can fail a lookup or retrieve the wrong account.

Capture entities conservatively. Collect one value at a time, normalize only what is clear, confirm high-precision values before tool calls, and make every correction recoverable.

### Collect one entity at a time

When a workflow needs multiple values, collect them one at a time. This prevents fields from blending together, especially in voice conversations.

```text
## Entity Collection Order

Collect required values one at a time.

- Ask for only the next missing value.
- Do not ask for multiple values in the same turn.
- Before asking, check whether the value was already provided earlier in the conversation or the session.
- If a possible value already exists, confirm it with the user before using it.

Example:

"I see tracking number ABC-54321 from earlier. Should I use that one, or do you have a different tracking number?"

Do not call tools until the current value has been collected, validated, and confirmed.
```

### Handle spelled-out characters

Use this when users spell IDs, codes, names, or email addresses one character at a time. The spoken form is input, not the final value.

```text
## Spelled-Out Characters

When a user dictates an ID, code, or email character by character, treat the spoken sequence as one compact value. Preserve explicitly spoken separators like dash, dot, underscore, slash, or plus; otherwise do not add spaces or separators.

Examples:

- "A B C one two three" -> "ABC123"
- "B C dash nine eight seven" -> "BC-987"
- "J O H N at example dot com" -> "john@example.com"

Do not insert spaces between spelled-out characters unless the user explicitly says the value contains spaces.
```

### Normalize spoken numbers carefully

For numeric identifiers, users may say digits individually, group them, or use natural number phrases. If the field expects one continuous numeric value, convert clear numeric speech into digits.

```text
## Spoken Number Handling

Convert spoken numbers into digits when collecting numeric identifiers.

Examples:

- "one two three four" -> "1234"
- "one twenty three" -> "123"
- "one nineteen" -> "119"
- "ninety nine eleven" -> "9911"
- "nine thousand nine hundred eleven" -> "9911"

If multiple interpretations are plausible, ask the user to clarify before using the value.

Example:

"I heard either 119 or 1-19. Could you repeat the number digit by digit?"
```

### Confirm exact identifiers before tool calls

Order IDs, tracking numbers, account numbers, claim numbers, confirmation codes, and similar identifiers are high-precision fields. Confirm them before using them in a tool call.

For numeric identifiers, read the value back digit by digit. Reading the value as a full number can hide errors.

Example:

> Assistant: Just to confirm, I heard 8... 3... 5... 2... 1. Is that right?

If the user corrects one character or digit, repeat the full corrected value before calling the tool.

Example:

> Assistant: Got it. I have 8... 3... 5... 7... 1. Is that correct?

```text
## Exact Identifier Confirmation

Before calling tools with high-precision identifiers:

- Confirm the final normalized value with the user.
- Read numeric identifiers back digit by digit.
- Do not use guessed, partial, or ambiguous values.
- If the user corrects the value, repeat the full corrected value before calling the tool.
```

### Confirm emails character by character

Email addresses are important values. Dots, dashes, underscores, repeated letters, and similar-sounding names can cause account lookup failures or send messages to the wrong address.

Ask the user to spell the email address:

> Assistant: Could you spell the email address character by character so I can make sure I have it exactly right?

When reading it back, confirm the exact final address:

> Assistant: Just to confirm, that is c-h-e-n at example dot com, right?

```text
## Email Confirmation

Email addresses must be captured exactly.

If the user says the email naturally without spelling it out, ask them to repeat it character by character.

Example:

"Could you spell the email address character by character so I can make sure I have it exactly right?"

When reading an email back, confirm the exact final email address.

Example:

"Just to confirm, that is c-h-e-n at example dot com, right?"
```

### Entity collection workflow

#### Example Entity collection workflow

Use this full workflow when a task requires exact values before any tool call.

```text
## Entity Collection Workflow

When a workflow requires an exact value, collect and confirm it before using it in any tool call.

Exact values include order IDs, tracking numbers, confirmation codes, account numbers, claim numbers, ticket IDs, support references, email addresses, phone numbers, and similar identifiers.

Follow this workflow:

1. Collect the next required value.

- Ask for only one missing value at a time.
- Do not ask for multiple exact values in the same turn.
- Before asking, check whether the value was already provided earlier in the conversation or session.

2. Normalize only what is clear.

- Convert clearly spoken digits or spelled-out characters into the expected format.
- Preserve explicit separators such as dashes, dots, underscores, slashes, and plus signs.
- Do not guess, infer, repair, or fill in unclear characters.
- If the value could be interpreted in more than one way, ask the user to repeat or clarify it.

3. Confirm the final value.

- Read back the normalized value before using it.
- For numeric identifiers, confirm digit by digit.
- For email addresses, confirm character by character when precision matters.
- Wait for a clear confirmation from the user.

4. Call the tool only after confirmation.

- Do not call lookup, account, messaging, payment, booking, or update tools with guessed, partial, ambiguous, or unconfirmed values.

5. Recover safely from corrections.

- If the user corrects any part of the value, update the value, repeat the full corrected value, and ask for confirmation again.
- Do not use the corrected value in a tool call until the user confirms the full final value.

Examples:

User: My order ID is ORD-3125B23.

Assistant: Just to confirm, I heard O-R-D dash 3-1-2-5-B-2-3. Is that right?

User: It is 83521 - actually, the fourth digit is 7.

Assistant: Got it. I have 8... 3... 5... 7... 1. Is that correct?

User: My email is chen@example.com.

Assistant: Could you spell that email address character by character so I can make sure I have it exactly right?

Never call tools with guessed, partial, ambiguous, or unconfirmed exact values.
```
