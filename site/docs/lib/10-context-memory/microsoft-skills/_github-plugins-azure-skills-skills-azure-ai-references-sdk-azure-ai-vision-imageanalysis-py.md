---
title: "Azure AI Vision Image Analysis — Python SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-vision-imageanalysis-py.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-vision-imageanalysis-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-vision-imageanalysis-py.md"
sourceSha256: "ec5e3ecec27ef7b90e3e24acba3b4859ae735d6074c1bc19ea3c007502d81292"
pageSha256: "ec5e3ecec27ef7b90e3e24acba3b4859ae735d6074c1bc19ea3c007502d81292"
contentMode: "local-full"
zh: ""
---

# Azure AI Vision Image Analysis — Python SDK Quick Reference

> Condensed from **azure-ai-vision-imageanalysis-py**. Full patterns (dense captions, smart crops, people detection)
> in the **azure-ai-vision-imageanalysis-py** plugin skill if installed.

## Install
```bash
pip install azure-ai-vision-imageanalysis
```

## Quick Start
```python
from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures
client = ImageAnalysisClient(endpoint=endpoint, credential=credential)
```

## Non-Obvious Patterns
- `analyze_from_url(image_url=..., visual_features=[...])` for URL; `analyze(image_data=bytes)` for file
- VisualFeatures enum: `CAPTION`, `DENSE_CAPTIONS`, `TAGS`, `OBJECTS`, `READ`, `PEOPLE`, `SMART_CROPS`
- Async: `from azure.ai.vision.imageanalysis.aio import ImageAnalysisClient`

## Best Practices
1. Select only needed visual features to optimize latency and cost
2. Use async client for high-throughput scenarios
3. Handle HttpResponseError for invalid images or auth issues
4. Enable `gender_neutral_caption` for inclusive descriptions
5. Specify `language` for localized captions
6. Use `smart_crops_aspect_ratios` matching your thumbnail requirements
7. Cache results when analyzing the same image multiple times
