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
pageSha256: "9e825a437a5944da2a4a444c288f528b8415b85cff627f9938566983f680fbfc"
contentMode: "local-full"
zh: ""
---

### Realtime Transcription Session Create Response

- `RealtimeTranscriptionSessionCreateResponse object \{ id, object, type, 3 more \}`

  A Realtime transcription session configuration object.

  - `id: string`

    Unique identifier for the session that looks like `sess_1234567890abcdef`.

  - `object: string`

    The object type. Always `realtime.transcription_session`.

  - `type: "transcription"`

    The type of session. Always `transcription` for transcription sessions.

    - `"transcription"`

  - `audio: optional object \{ input \}`

    Configuration for input audio for the session.

    - `input: optional object \{ format, noise_reduction, transcription, turn_detection \}`

      - `format: optional RealtimeAudioFormats`

        The PCM audio format. Only a 24kHz sample rate is supported.

        - `PCMAudio object \{ rate, type \}`

          The PCM audio format. Only a 24kHz sample rate is supported.

          - `rate: optional 24000`

            The sample rate of the audio. Always `24000`.

            - `24000`

          - `type: optional "audio/pcm"`

            The audio format. Always `audio/pcm`.

            - `"audio/pcm"`

        - `PCMUAudio object \{ type \}`

          The G.711 μ-law format.

          - `type: optional "audio/pcmu"`

            The audio format. Always `audio/pcmu`.

            - `"audio/pcmu"`

        - `PCMAAudio object \{ type \}`

          The G.711 A-law format.

          - `type: optional "audio/pcma"`

            The audio format. Always `audio/pcma`.

            - `"audio/pcma"`

      - `noise_reduction: optional object \{ type \}`

        Configuration for input audio noise reduction.

        - `type: optional NoiseReductionType`

          Type of noise reduction. `near_field` is for close-talking microphones such as headphones, `far_field` is for far-field microphones such as laptop or conference room microphones.

          - `"near_field"`

          - `"far_field"`

      - `transcription: optional object \{ language, languages, model, prompt \}`

        Configuration of the transcription model.

        - `language: optional string`

          The language of the input audio.

        - `languages: optional array of string`

          The possible input audio languages configured for transcription, in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format.

        - `model: optional string or "whisper-1" or "gpt-transcribe" or "gpt-live-transcribe" or 5 more`

          The model used for transcription. Current options are `whisper-1`, `gpt-transcribe`, `gpt-live-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `gpt-4o-transcribe`, `gpt-4o-transcribe-diarize`, and `gpt-realtime-whisper`.

          - `string`

          - `"whisper-1" or "gpt-transcribe" or "gpt-live-transcribe" or 5 more`

            The model used for transcription. Current options are `whisper-1`, `gpt-transcribe`, `gpt-live-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `gpt-4o-transcribe`, `gpt-4o-transcribe-diarize`, and `gpt-realtime-whisper`.

            - `"whisper-1"`

            - `"gpt-transcribe"`

            - `"gpt-live-transcribe"`

            - `"gpt-4o-mini-transcribe"`

            - `"gpt-4o-mini-transcribe-2025-12-15"`

            - `"gpt-4o-transcribe"`

            - `"gpt-4o-transcribe-diarize"`

            - `"gpt-realtime-whisper"`

        - `prompt: optional string`

          The prompt configured for input audio transcription, when present.

      - `turn_detection: optional RealtimeTranscriptionSessionTurnDetection or null`

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

  - `expires_at: optional number`

    Expiration timestamp for the session, in seconds since epoch.

  - `include: optional array of "item.input_audio_transcription.logprobs"`

    Additional fields to include in server outputs.

    - `item.input_audio_transcription.logprobs`: Include logprobs for input audio transcription.

    - `"item.input_audio_transcription.logprobs"`
