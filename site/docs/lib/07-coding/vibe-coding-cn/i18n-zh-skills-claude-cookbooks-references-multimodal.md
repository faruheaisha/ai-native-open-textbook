---
title: "Multimodal Capabilities with Claude"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-cookbooks/references/multimodal.md"
sourceRel: "i18n/zh/skills/claude-cookbooks/references/multimodal.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/claude-cookbooks/references/multimodal.md"
sourceSha256: "9c3dc67e96f052ae2d375480778b78ea36e573001e68535631ddad7b36f6c8e0"
pageSha256: "9c3dc67e96f052ae2d375480778b78ea36e573001e68535631ddad7b36f6c8e0"
contentMode: "local-full"
zh: ""
---

# Multimodal Capabilities with Claude

Source: anthropics/claude-cookbooks/multimodal

## Vision Capabilities

### Getting Started with Images
- **Location**: `multimodal/getting_started_with_vision.ipynb`
- **Topics**: Image upload, analysis, OCR, visual question answering

### Best Practices for Vision
- **Location**: `multimodal/best_practices_for_vision.ipynb`
- **Topics**: Image quality, prompt engineering for vision, error handling

### Charts and Graphs
- **Location**: `multimodal/reading_charts_graphs_powerpoints.ipynb`
- **Topics**: Data extraction from charts, graph interpretation, PowerPoint analysis

### Form Extraction
- **Location**: `multimodal/how_to_transcribe_text.ipynb`
- **Topics**: OCR, structured data extraction, form processing

## Image Generation

### Illustrated Responses
- **Location**: `misc/illustrated_responses.ipynb`
- **Topics**: Integration with Stable Diffusion, image generation prompts

## Code Examples

```python
# Vision API example
import anthropic

client = anthropic.Anthropic()

# Analyze an image
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": [
            {
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": "image/jpeg",
                    "data": image_base64
                }
            },
            {
                "type": "text",
                "text": "What's in this image?"
            }
        ]
    }]
)
```

## Tips

1. **Image Quality**: Higher resolution images provide better results
2. **Prompt Clarity**: Be specific about what you want to extract or analyze
3. **Format Support**: JPEG, PNG, GIF, WebP supported
4. **Size Limits**: Max 5MB per image
