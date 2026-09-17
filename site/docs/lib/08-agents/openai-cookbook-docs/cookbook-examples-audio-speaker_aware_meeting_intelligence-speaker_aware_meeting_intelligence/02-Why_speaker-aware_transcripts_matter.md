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
pageSha256: "5519735c0790355bacbcb3e47ec2a267a169a6e251b000b8cfa7cf70779fd11b"
contentMode: "local-full"
zh: ""
---

## Why speaker-aware transcripts matter

The first version of meeting intelligence is often "send a transcript to a model and summarize it." That works for demos, but it breaks down in customer workflows because it loses who said what. A customer may state a requirement, a seller may make a commitment, and a manager may need the difference to be explicit.

Speaker-aware diarization gives the rest of the application better structure:

- Action items can include the speaker who committed to them.
- Risks can quote the exact customer concern.
- Follow-up email drafts can avoid attributing seller commitments to the customer.
- QA reviewers can spot-check speaker attribution by segment ID and timestamp.
- CRM sync jobs can store mechanically verifiable evidence rather than opaque summaries.
