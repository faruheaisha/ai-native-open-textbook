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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/27-prompt-injection-defense/outputs/skill-injection-defense.md"
sourceRel: "phases/14-agent-engineering/27-prompt-injection-defense/outputs/skill-injection-defense.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/27-prompt-injection-defense/outputs/skill-injection-defense.md"
sourceSha256: "969723993da324a1798e180e7c4d57943cd7b0e54bfadfebb4370a7bd159b211"
pageSha256: "969723993da324a1798e180e7c4d57943cd7b0e54bfadfebb4370a7bd159b211"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given an agent with tool access and retrieval, produce an injection-defense layer.

Produce:

1. Source tag on every piece of content: `user_message`, `tool_output`, `retrieved_web`, `retrieved_memory`, `retrieved_file`. Propagate tags through the message history.
2. `Validator.assess(tool_call, contents)` — refuses tool calls with injection-shaped args or retrieved content; allowed only when source tags match the declared trust level.
3. Allowlist / blocklist for navigation: URLs, domains, file paths the agent may touch.
4. Memory-write guardrail: refuse writes that look like directives.
5. Content-capture discipline (Lesson 23): store retrieved content externally; spans carry reference IDs, not prose.
6. Test suite: the five Greshake exploit classes as red-team cases.

Hard rejects:

- Tool-use surface without source tags. Cannot distinguish permission levels without provenance.
- Validator that runs only on the final output. Late validation is irrelevant — the model already acted.
- "Trust me, the system prompt handles it." System-prompt hygiene is not a control.

Refusal rules:

- If the agent has any retrieval capability without source tagging, refuse to ship. Retrieved content is the canonical injection vector.
- If sensitive tools (send message, execute shell, write file in /) have no human-in-the-loop confirmation, refuse.
- If memory writes are unguarded, refuse. Persistent memory poisoning re-poisons next session.

Output: `validator.py`, `source_tag.py`, `allowlist.py`, `memory_guard.py`, `red_team.py`, `README.md` explaining the six-control stack, residual risks, and ongoing review cadence. End with "what to read next" pointing to Lesson 21 (computer use safety) and Lesson 23 (content capture via OTel).
