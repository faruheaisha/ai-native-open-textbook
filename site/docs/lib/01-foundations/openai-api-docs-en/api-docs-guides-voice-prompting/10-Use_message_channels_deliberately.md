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
pageSha256: "228ecc1cf5c70445a2e0f9bf255b35a7b38e846a2f6fa39b6715346bae3e6d11"
contentMode: "local-full"
zh: ""
---

## Use message channels deliberately

`gpt-realtime-2` can produce user-visible intermediate messages in the commentary channel and final user-facing responses in the final channel. Use channel-specific instructions when the behavior depends on where it appears.

| Channel      | User-visible? | Used for                   |
| ------------ | ------------- | -------------------------- |
| `commentary` | Yes           | Preambles and tool calls.  |
| `final`      | Yes           | Final user-facing message. |

For example, tool calls happen in the commentary channel. If you want the assistant to say something before, during, or after tool use, specify that behavior in relation to the commentary channel.

```text
Before calling tools in the commentary channel, briefly tell the user what you are doing.
```

`gpt-realtime-2` can emit multiple response phases in a single turn. In API output, this distinction is represented by the `response.done` event, which includes a `phase` value that indicates whether the content is commentary or the final answer.

You can use this field to handle each phase differently in your application. For example, commentary can be played or displayed as a short intermediate update, while `final_answer` can be reserved for the assistant's completed response.

```text
response.output[0].phase: "commentary"
response.output[1].phase: "final_answer"
```

### Example response phases

User prompt:

> "I'm stuck on this AP Bio question [QUESTION]."

Shortened API response:

```json
{
  "type": "response.done",
  "response": {
    "output": [
      {
        "phase": "commentary",
        "content": [
          {
            "type": "output_audio",
            "transcript": "Let's zero in on the enzyme's shape and binding, since that's the key idea here."
          }
        ]
      },
      {
        "phase": "final_answer",
        "content": [
          {
            "type": "output_audio",
            "transcript": "What changes at the active site at high temperature?"
          }
        ]
      }
    ]
  }
}
```
