---
title: "Azure.AI.VoiceLive (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-ai-voicelive-dotnet/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-ai-voicelive-dotnet/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-ai-voicelive-dotnet/SKILL.md"
sourceSha256: "3731d251910cb49587a0a83839e532fb1e70baa7750824d35b2a5e545c38da7a"
pageSha256: "3731d251910cb49587a0a83839e532fb1e70baa7750824d35b2a5e545c38da7a"
contentMode: "local-full"
zh: ""
---

# Azure.AI.VoiceLive (.NET)

Real-time voice AI SDK for building bidirectional voice assistants with Azure AI.

## Installation

```bash
dotnet add package Azure.AI.VoiceLive
dotnet add package Azure.Identity
dotnet add package NAudio                    # For audio capture/playback
```

**Current Versions**: Stable v1.0.0, Preview v1.1.0-beta.1

## Environment Variables

```bash
AZURE_VOICELIVE_ENDPOINT=https://<resource>.services.ai.azure.com/  # Required: Voice Live endpoint
AZURE_VOICELIVE_MODEL=gpt-4o-realtime-preview  # Required: model deployment name
AZURE_VOICELIVE_VOICE=en-US-AvaNeural  # Optional: Voice Live voice name
