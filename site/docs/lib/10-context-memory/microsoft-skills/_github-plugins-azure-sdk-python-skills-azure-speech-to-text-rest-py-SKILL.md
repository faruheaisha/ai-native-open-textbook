---
title: "Azure Speech to Text REST API for Short Audio"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-speech-to-text-rest-py/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-speech-to-text-rest-py/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-speech-to-text-rest-py/SKILL.md"
sourceSha256: "e19f62d6ccb67623f28c72715cab0b8ee8b378b9d2a2bcd0d848241c8b3af5df"
pageSha256: "e19f62d6ccb67623f28c72715cab0b8ee8b378b9d2a2bcd0d848241c8b3af5df"
contentMode: "local-full"
zh: ""
---

# Azure Speech to Text REST API for Short Audio

Simple REST API for speech-to-text transcription of short audio files (up to 60 seconds). No SDK required - just HTTP requests.

## Prerequisites

1. **Azure subscription** - [Create one free](https://azure.microsoft.com/free/)
2. **Speech resource** - Create in [Azure Portal](https://portal.azure.com/#create/Microsoft.CognitiveServicesSpeechServices)
3. **Get credentials** - After deployment, go to resource > Keys and Endpoint

## Environment Variables

```bash
# Required
