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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/21-computer-use-agents/outputs/skill-computer-use-safety.md"
sourceRel: "phases/14-agent-engineering/21-computer-use-agents/outputs/skill-computer-use-safety.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/21-computer-use-agents/outputs/skill-computer-use-safety.md"
sourceSha256: "958db080d7c7191edc063d8ae2fab48d6dc8461e28a3a78ce23c0428a9004ead"
pageSha256: "958db080d7c7191edc063d8ae2fab48d6dc8461e28a3a78ce23c0428a9004ead"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a computer-use agent and a list of target apps, produce a safety layer that classifies every action before execution.

Produce:

1. `SafetyClassifier.assess(action, screen) -> SafetyVerdict` with fields `allow`, `reason`, `needs_confirmation`.
2. Allowlist of element labels the agent can click; refusal otherwise.
3. Allowlist of URLs the agent can navigate to; refusal on redirects out of the list.
4. Injection-marker filter on DOM text, retrieved content, and typed text. Any match blocks the action.
5. Confirmation gate for sensitive actions (login, purchase, delete, publish). Human-in-the-loop callback interface.
6. Trace emitter: every decision logged with (action, verdict, reason).

Hard rejects:

- Safety classifier that only runs on the first action. Every action must be classified.
- Allowlist of form `*`. An allowlist that allows everything is not an allowlist.
- Skipping confirmation because the model "seems confident." Confidence is not safety.

Refusal rules:

- If the agent has computer-use access without per-step safety, refuse to ship.
- If the agent can navigate to arbitrary URLs, refuse. Require allowlist or blocklist.
- If sensitive actions bypass the confirmation gate in any mode, refuse.

Output: `classifier.py`, `allowlist.py`, `confirmation.py`, `trace.py`, `README.md` explaining the gate policy, injection markers, and allowlist maintenance process. End with "what to read next" pointing to Lesson 27 (prompt injection) and Lesson 23 (OTel span attribution for safety decisions).
