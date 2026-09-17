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
pageSha256: "bc1598aa960ad461064aea954035dd3c5270cddb795b8e2a5aa8428386b4be27"
contentMode: "local-full"
zh: ""
---

## What changed in Realtime 2

Prompt Realtime 2 as a reasoning voice agent, not as a basic voice bot.

| Change                                | What it means for prompts                                                                                                                                         |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reasoning                             | Allow the model to reason internally for complex tasks before speaking or calling tools. Use preambles to avoid awkward silence or unnecessary filler.            |
| Prompt precision matters more         | Replace broad guidance like "be helpful" with clear trigger, action, and exception rules: when to act, what to do, and when not to do it.                         |
| Instruction conflicts are more costly | Remove overlapping `always`, `never`, `only`, and `must` rules unless they are truly required. Define priority when rules compete.                                |
| Tool behavior is more steerable       | Specify when the assistant should act immediately, ask for missing information, confirm high-precision details, retry after failure, or escalate.                 |
| Preambles are first-class behavior    | The model may speak brief updates before longer reasoning or tool-use flows. Steer when preambles should appear, how short they should be, and when to skip them. |
| Expanded context window               | `gpt-realtime-2` expands the realtime context window from 32k to 128k tokens, making it better suited for long sessions and larger system prompts.                |

Preambles aren't hidden chain-of-thought. They're short spoken updates such as
  "I'll check that order now." Don't ask the model to reveal private reasoning.
