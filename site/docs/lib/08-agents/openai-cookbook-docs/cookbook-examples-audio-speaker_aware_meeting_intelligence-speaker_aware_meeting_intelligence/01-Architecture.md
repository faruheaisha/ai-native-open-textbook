---
title: "openai-cookbook-docs"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/audio/speaker_aware_meeting_intelligence/speaker_aware_meeting_intelligence.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/audio/speaker_aware_meeting_intelligence/speaker_aware_meeting_intelligence.md"
sourceSha256: "69a817e38abb5d8c4a2e4aa9b343ab8f4b306e5d0eb313b163f0c27b6071f535"
pageSha256: "d59ac1602f15204f0e3f6668025ee47c82945f5080c94f4449af7ed156cac23f"
contentMode: "local-full"
zh: ""
---

## Architecture

![Architecture diagram](https://developers.openai.com/cookbook/assets/examples/audio/speaker_aware_meeting_intelligence/images/architecture.svg)

| Layer | Responsibility | Output |
| --- | --- | --- |
| Audio intake | Accept a call recording and optional known-speaker clips. | `meeting.wav`, `Agent=agent.wav` |
| Pipeline runner | Validate inputs, encode references as data URLs, call OpenAI, and write artifacts. | Run metadata and output directory |
| Diarization | Call `gpt-4o-transcribe-diarize` with `response_format="diarized_json"` and `chunking_strategy="auto"`. | Speaker-labeled segments |
| Transcript normalization | Convert API output into consistent JSON and Markdown with stable segment IDs. | `transcript_segments.json`, `speaker_labeled_transcript.md` |
| Meeting intelligence | Extract summary, decisions, actions, risks, explicit questions, suggested follow-ups, quotes, and follow-up email with structured evidence references. | `meeting_intelligence.json`, `meeting_brief.md` |
| Guardrails and review gate | Redact sensitive fields, verify evidence references, optionally moderate content, and route risky outputs for review. | `guardrail_report.json` |

This is intentionally request-based. The Realtime API is a better fit for live voice UX, browser capture, or telephony streaming. For durable post-call diarization, this pattern uses the Transcriptions API and then runs structured extraction over the speaker-labeled transcript.
