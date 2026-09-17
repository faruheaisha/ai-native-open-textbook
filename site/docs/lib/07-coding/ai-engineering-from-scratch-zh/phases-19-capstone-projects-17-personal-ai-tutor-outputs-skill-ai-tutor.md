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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/19-capstone-projects/17-personal-ai-tutor/outputs/skill-ai-tutor.md"
sourceRel: "phases/19-capstone-projects/17-personal-ai-tutor/outputs/skill-ai-tutor.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/19-capstone-projects/17-personal-ai-tutor/outputs/skill-ai-tutor.md"
sourceSha256: "f6e03b5d1ae2a28893801f3a6b3cdfff331240be2d43bd7d149bebb4aed3a0c6"
pageSha256: "f6e03b5d1ae2a28893801f3a6b3cdfff331240be2d43bd7d149bebb4aed3a0c6"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a subject (K-12 algebra or intro Python), build a personal tutor with text + voice + photo-math input, Bayesian knowledge tracing learner model, curriculum-graph-driven concept selection, COPPA-aware memory, and safety filters. Run a two-week efficacy study with 10 learners.

Build plan:

1. Curriculum graph in Neo4j: 50-150 concept nodes with prerequisite edges and attached OER content (OpenStax, Open Textbook).
2. Learner model: Bayesian knowledge tracing with priors for guess/slip/learn-rate per concept; per-learner persisted state.
3. Tutor policy (LangGraph over Claude Sonnet 4.7 with prompt caching): read_signal -> select_concept (graph walk) -> scaffold (Socratic) -> update_mastery.
4. Memory: agentmemory-style persistent episodic + semantic store; COPPA-aware auto-delete after 1 year; parent-accessible deletion.
5. Voice: LiveKit Agents worker with Whisper-v3-turbo ASR and Cartesia Sonic-2 TTS; reuse capstone 03 pipeline.
6. Photo math: dots.ocr or PaliGemma 2 for equation recognition; feed structured input to the tutor.
7. Safety: Llama Guard 4 input/output; age-appropriate filter blocking self-harm/adult/violence; learner-scoped memory isolation.
8. Weekly PDF progress reports per learner.
9. Efficacy study: 10 learners, pre-test (standardized 30-question baseline), 2 weeks of sessions (3/week), post-test; compare against non-adaptive linear cohort.

Assessment rubric:

| Weight | Criterion | Measurement |
|:-:|---|---|
| 25 | Learning gain delta | Pre/post-test delta in the 10-learner 2-week study |
| 20 | Socratic fidelity | Rubric score on transcript samples |
| 20 | Multimodal UX | Voice + photo + text coherence end to end |
| 20 | Safety + privacy posture | Llama Guard 4 pass rate + COPPA-aware retention + cross-learner isolation |
| 15 | Curriculum breadth and graph quality | Concept coverage + prerequisite graph consistency |

Hard rejects:

- Tutor policies that answer-dump instead of asking the next question. Socratic is a hard requirement.
- Learner models that do not update per interaction. BKT is a floor.
- Memory without COPPA-aware retention. Unacceptable for a K-12 audience.
- Efficacy claims without a non-adaptive baseline cohort.

Refusal rules:

- Refuse to deploy without Llama Guard 4 on both input and output.
- Refuse to persist learner data without a parent-accessible deletion surface.
- Refuse to claim "adaptive" without running the non-adaptive baseline alongside.

Output: a repo containing the curriculum graph, the BKT learner model, the LangGraph tutor policy, the multimodal input handlers, the LiveKit voice pipeline, the safety pipeline, the parental dashboard, the efficacy-study runner, the pre/post test harness, and a write-up documenting the learning gain delta versus the linear baseline with confidence intervals.
