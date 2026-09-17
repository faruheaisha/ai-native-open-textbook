---
title: "Recorded example: John / Cedar / GPT Live"
sourceId: "08-agents/openai-cookbook"
sourceTitle: "OpenAI Cookbook"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-cookbook"
entryUrl: "https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/audio/duplex_voice_agent_evaluation/recorded-example/recording-source.md"
sourceRel: "examples/audio/duplex_voice_agent_evaluation/recorded-example/recording-source.md"
rawUrl: "/raw/08-agents/openai-cookbook/examples/audio/duplex_voice_agent_evaluation/recorded-example/recording-source.md"
sourceSha256: "e876bb3b95b83e5663822c31b2b006b9d923365c96dc4fb2877af03dc8c9c741"
pageSha256: "e876bb3b95b83e5663822c31b2b006b9d923365c96dc4fb2877af03dc8c9c741"
contentMode: "local-full"
zh: ""
---

# Recorded example: John / Cedar / GPT Live

This example was recorded on September 9, 2026 at 05:58:51 UTC using client-managed delegation, the Cedar voice, and the John opening prompt. It contains 42.34 seconds of unmodified 24 kHz stereo audio: caller on the left and assistant on the right.

The recording predates the latest harness fixes. Its dialogue, transcript, timestamps, and scores have not been regenerated or rescored. Frontend model labels in the published presentation were normalized to `gpt-live-1`; that does not represent a new recording with the public model. The published report also replaces a personal dataset path with a repository-relative path.

## Inspect the example

- [Play the conversation](https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/audio/duplex_voice_agent_evaluation/recorded-example/conversation.wav).
- [Open the interactive viewer](https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/audio/duplex_voice_agent_evaluation/recorded-example/view-results.html).
- [Read the transcript and event excerpt](https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/audio/duplex_voice_agent_evaluation/recorded-example/transcript.txt).
- [Download the results table](https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/audio/duplex_voice_agent_evaluation/recorded-example/results.csv).
- [Inspect the published report excerpt](https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/audio/duplex_voice_agent_evaluation/recorded-example/results.json).

The reported semantic quality is 90%, tool accuracy is 50% (one of two expected tools), and response rate is 75% (three of four scored opportunities). The scorer counted the closing farewell as two opportunities while the assistant answered it once. Inspect the recording alongside the aggregate scores.

The report is a published excerpt, not a complete raw-run archive. Its artifact references point only to the supplied recording and transcript; raw details and event-log files are not included. Use the supplied HTML to inspect this historical example. New harness runs generate their own full result bundles and viewers.

## Run the same scenario

Install the harness dependencies and configure `OPENAI_API_KEY` as described in the [harness README](/lib/08-agents/openai-cookbook/examples-audio-duplex_voice_agent_evaluation). The following command makes live API calls. Run it from `examples/audio/duplex_voice_agent_evaluation/`:

```sh
uv run python -m run_harness.evaluate \
  --config recorded-example/inputs/config.toml \
  --data recorded-example/inputs/scenarios.json \
  --scenario restaurant_booking_complete --assistant client \
  --model gpt-live-1 --simulator-model gpt-live-1 \
  --voice cedar \
  --assistant-opening-prompt recorded-example/inputs/assistant_first.txt \
  --visualize --max-duration-seconds 60 --concurrency 1 \
  --run-name cookbook-john-cedar --results-dir runs/cookbook
```

These are the retained scenario, configuration, and opening-prompt inputs. The explicit `--data` and `--assistant client` options override the configuration defaults. New runs use the installed harness version and can produce different dialogue and scores. Inspect the `viewer.html` in each new run's output directory.
