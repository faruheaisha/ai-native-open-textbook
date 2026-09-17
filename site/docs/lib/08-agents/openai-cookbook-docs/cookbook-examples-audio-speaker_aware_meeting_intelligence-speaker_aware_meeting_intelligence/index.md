---
title: "Build a Speaker-Aware Meeting Intelligence Pipeline with Audio Diarization"
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
pageSha256: "9b758000d8147d04a502fd95532cc3412dcb72df8e8b6df5f4a620580b9509ae"
contentMode: "local-full"
zh: ""
---

# Build a Speaker-Aware Meeting Intelligence Pipeline with Audio Diarization

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Many organizations already record important conversations, but a plain transcript often is not enough for reliable follow-up. The missing layer is speaker attribution: knowing who raised a concern, who made a commitment, and where the evidence appears in the recording. A speaker-aware transcript lets you separate customer needs from seller follow-up, keep structured evidence references next to action items, and route sensitive commitments into a review workflow before they land in a CRM, ticketing system, or knowledge base.

This pattern is useful whenever the downstream workflow depends on who said what:

- Sales discovery and solution consulting: capture customer requirements, seller commitments, decision criteria, blockers, and next steps with evidence.
- Customer success and account management: turn QBRs, renewal calls, and onboarding sessions into sourced risks, product asks, and follow-up plans.
- Support escalations and incident reviews: preserve the timeline, reported symptoms, owner commitments, and unresolved questions before creating tickets or postmortems.
- Recruiting and interview loops: summarize candidate or interviewer feedback while keeping quotes tied to the right speaker.
- Regulated or high-stakes reviews: add redaction, evidence checks, and human review before storing notes from healthcare, financial services, legal, or compliance-heavy conversations.

For revenue teams, the impact is usually less about generating another summary and more about reducing leakage between the conversation and the system of record. A pipeline like this can help teams capture CRM-ready next steps faster, identify renewal or expansion risks earlier, preserve evidence behind forecast updates, and coach reps or support teams from sourced examples instead of anecdotal notes. The goal is not to automate judgment away; it is to make handoffs, reviews, and follow-up actions more complete and auditable.

This notebook shows how to build a production-style, post-call meeting intelligence pipeline with OpenAI audio diarization. You will:

1. Accept a recorded meeting audio file.
2. Optionally map known speakers using short reference clips.
3. Call `gpt-4o-transcribe-diarize` with `response_format="diarized_json"`.
4. Normalize the speaker-labeled segments into JSON and Markdown with stable segment IDs.
5. Use structured outputs to extract a meeting brief, decisions, risks, explicit questions, suggested follow-ups, action items, evidence references, and a follow-up email draft.
6. Write reviewable artifacts and a local guardrail report.

The default cells run without an API key using a synthetic diarized transcript. Real audio calls are opt-in so the notebook is safe to review top-to-bottom.

## 本篇目录

- [Architecture](https://developers.openai.com/cookbook)
- [Why speaker-aware transcripts matter](https://developers.openai.com/cookbook)
- [Security and guardrails](https://developers.openai.com/cookbook)
- [Prerequisites](https://developers.openai.com/cookbook)
- [Core diarization request](https://developers.openai.com/cookbook)
- [Diarization vs speaker identification](https://developers.openai.com/cookbook)
- [Step 1: Define the structured output schema](https://developers.openai.com/cookbook)
- [Step 2: Build audio and transcript helpers](https://developers.openai.com/cookbook)
- [Step 3: Normalize the transcript](https://developers.openai.com/cookbook)
- [Step 4: Extract structured meeting intelligence](https://developers.openai.com/cookbook)
- [Step 5: Render a reviewable meeting brief](https://developers.openai.com/cookbook)
- [Step 6: Add guardrails and write artifacts](https://developers.openai.com/cookbook)
- [Step 7: Run the deterministic demo fixture](https://developers.openai.com/cookbook)
- [Step 8: Run with real audio](https://developers.openai.com/cookbook)
- [Step 9: Run deterministic smoke and regression checks](https://developers.openai.com/cookbook)
- [Step 10: Run deterministic evals](https://developers.openai.com/cookbook)
- [Step 11: Add optional LLM-as-judge evals](https://developers.openai.com/cookbook)
- [Production hardening checklist](https://developers.openai.com/cookbook)
- [Evaluation guidance for production](https://developers.openai.com/cookbook)
- [Next steps](https://developers.openai.com/cookbook)
