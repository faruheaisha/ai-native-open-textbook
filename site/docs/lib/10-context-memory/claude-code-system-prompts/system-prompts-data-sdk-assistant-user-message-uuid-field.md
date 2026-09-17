---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-assistant-user-message-uuid-field.md"
sourceRel: "system-prompts/data-sdk-assistant-user-message-uuid-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-assistant-user-message-uuid-field.md"
sourceSha256: "24bc61ad88822520ef169622d014e1565e40d8b8c29927c7f7d75ef39eae90d8"
pageSha256: "24bc61ad88822520ef169622d014e1565e40d8b8c29927c7f7d75ef39eae90d8"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Client uuid of the user message this turn is answering (submitMessage options.uuid), stamped on a reply frame each time that send changes — the turn's FIRST reply frame, and then, for a turn started by a synthetic (meta) prompt, the first reply frame after each queued user message folded in mid-turn takes the echo over. In complete-message mode the frame is the first assistant message; with --include-partial-messages the stamp normally rides the first non-ping stream event instead (see SDKPartialAssistantMessage), and a turn that produces no stream events still stamps its first assistant message — so a consumer can bind the reply to the send it answers without waiting for the result; the server keeps the first stamp it sees per uuid. A turn started by a typed prompt keeps that uuid for its whole turn, so it stamps its first reply frame only. A meta turn's own uuid is stamped only when the host vouches it is the client event's own (on a hosted session, the uuid the session server persisted: delivered content such as a Slack owner ping, a Slack-bot observation or a client-injected synthetic turn), never for a prompt the CLI minted itself such as the boot-time rescue turn; either way a user message folded into a meta turn takes the echo over from it (the rescue turn absorbing messages sent while the session was down; a bot-observation turn absorbing a human's post), and the first reply frame after that fold carries the folded message's uuid — the first reply that message got. Wrapper-level sibling — never inside `message.content` — so it is not replayed to the model. Absent on every other frame of the turn, on subagent frames (parent_tool_use_id set), on turns that neither had a client uuid nor folded a user message in, and from older producers.
