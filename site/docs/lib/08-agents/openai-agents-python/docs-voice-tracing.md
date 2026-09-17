---
title: "Tracing"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/docs/voice/tracing.md"
sourceRel: "docs/voice/tracing.md"
rawUrl: "/raw/08-agents/openai-agents-python/docs/voice/tracing.md"
sourceSha256: "eb5bdccce28958b3f00be1d9ac5909927e581e306bc8284ffdb93f61503ba132"
pageSha256: "eb5bdccce28958b3f00be1d9ac5909927e581e306bc8284ffdb93f61503ba132"
contentMode: "local-full"
zh: ""
---

# Tracing

Just like the way [agents are traced](/lib/08-agents/openai-agents-python/docs-tracing), voice pipelines are also automatically traced.

You can read the tracing doc above for basic tracing information, but you can additionally configure tracing of a pipeline via [`VoicePipelineConfig`][agents.voice.pipeline_config.VoicePipelineConfig].

Key tracing related fields are:

-   [`tracing_disabled`][agents.voice.pipeline_config.VoicePipelineConfig.tracing_disabled]: controls whether tracing is disabled. By default, tracing is enabled.
-   [`trace_include_sensitive_data`][agents.voice.pipeline_config.VoicePipelineConfig.trace_include_sensitive_data]: controls whether voice-pipeline spans include potentially sensitive text. When this field is `False`, transcription spans omit transcripts, STT prompts, and STT keywords, and speech spans omit TTS input text and TTS instructions. The real settings are still sent to the speech models. This field does not control tracing inside your Workflow.
-   [`trace_include_sensitive_audio_data`][agents.voice.pipeline_config.VoicePipelineConfig.trace_include_sensitive_audio_data]: controls whether traces include audio data.
-   [`workflow_name`][agents.voice.pipeline_config.VoicePipelineConfig.workflow_name]: The name of the trace workflow.
-   [`group_id`][agents.voice.pipeline_config.VoicePipelineConfig.group_id]: The `group_id` of the trace, which lets you link multiple traces.
-   [`trace_metadata`][agents.voice.pipeline_config.VoicePipelineConfig.trace_metadata]: Additional metadata to include with the trace.
