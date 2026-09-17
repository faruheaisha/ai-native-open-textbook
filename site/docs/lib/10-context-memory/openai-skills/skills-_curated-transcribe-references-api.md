---
title: "gpt-4o-transcribe-diarize quick reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/transcribe/references/api.md"
sourceRel: "skills/.curated/transcribe/references/api.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/transcribe/references/api.md"
sourceSha256: "a2bf7e59d69aa127b176255c5c01afbafda4e3029b12b4413e75074233ffb36d"
pageSha256: "a2bf7e59d69aa127b176255c5c01afbafda4e3029b12b4413e75074233ffb36d"
contentMode: "local-full"
zh: ""
---

# gpt-4o-transcribe-diarize quick reference

- Input formats: mp3, mp4, mpeg, mpga, m4a, wav, webm.
- Max file size: 25 MB per request.
- response_format options: text, json, diarized_json.
- For audio longer than ~30 seconds, pass chunking_strategy (use "auto" to split into chunks).
- Known speakers: up to 4 references via extra_body known_speaker_names + known_speaker_references (data URLs).
- Prompting is not supported for gpt-4o-transcribe-diarize.
