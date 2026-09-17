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
pageSha256: "12b6459022855ee78dda137e5a084407989ff1a08176b3a3e25eb06b80e34a41"
contentMode: "local-full"
zh: ""
---

## Evaluation guidance for production

The deterministic eval above is intentionally small: it proves that the scoring pattern works on a labeled fixture. Production teams should expand it into a representative eval set before writing outputs to downstream systems. Start with a small, consented set of recordings or transcript fixtures, create human-reviewed labels, and keep a holdout set for regression testing when prompts, schemas, or models change.

| Area | Example metrics |
| --- | --- |
| Speaker attribution | Speaker-label accuracy, diarization error rate, speaker-turn boundary accuracy, known-speaker match rate. |
| Transcript grounding | Quote exactness, timestamp correctness, evidence-reference validity, unsupported-claim rate. |
| Structured extraction | Precision and recall for action items, decisions, risks, explicit questions, suggested follow-ups, and customer requirements. |
| Safety and privacy | PII redaction recall, moderation flag recall, false-positive review rate, raw-audio retention compliance. |
| Workflow impact | Time-to-CRM-update, reviewer override rate, follow-up completion rate, renewal or escalation risk detection latency. |

A useful first eval is simple: ask reviewers to mark each extracted action item as correct, partially correct, unsupported, or missing from the output. Track precision for generated items and recall against the human-labeled gold set. For quotes and evidence, prefer exact-match or near-exact-match checks against the transcript segment text so that helpful-sounding but unsupported summaries do not pass unnoticed. LLM-as-judge can help grade usefulness and completeness, but keep deterministic grounding checks in the loop because they are easier to reproduce.
