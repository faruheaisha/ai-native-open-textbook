---
title: "OpenAI API 参考（字段级）"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "api/reference/resources/realtime/subresources/client_secrets.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/realtime/subresources/client_secrets.md"
sourceSha256: "9df478c449e730bbde708293eec6a2952575e43bc8442ca0fea25b9a1e7a7967"
pageSha256: "1180e6acd018d53b671e2706ac89a61536e6cbc1f0a284aefc0575d2f23dea1d"
contentMode: "local-full"
zh: ""
---

### Realtime Transcription Session Turn Detection

- `RealtimeTranscriptionSessionTurnDetection object \{ prefix_padding_ms, silence_duration_ms, threshold, type \}`

  Configuration for turn detection. Can be set to `null` to turn off. Server
  VAD means that the model will detect the start and end of speech based on
  audio volume and respond at the end of user speech. For `gpt-realtime-whisper`, this must be `null`; VAD is not supported.

  - `prefix_padding_ms: optional number`

    Amount of audio to include before the VAD detected speech (in
    milliseconds). Defaults to 300ms.

  - `silence_duration_ms: optional number`

    Duration of silence to detect speech stop (in milliseconds). Defaults
    to 500ms. With shorter values the model will respond more quickly,
    but may jump in on short pauses from the user.

  - `threshold: optional number`

    Activation threshold for VAD (0.0 to 1.0), this defaults to 0.5. A
    higher threshold will require louder audio to activate the model, and
    thus might perform better in noisy environments.

  - `type: optional string`

    Type of turn detection, only `server_vad` is currently supported.
