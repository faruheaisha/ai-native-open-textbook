---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/04-computer-vision/18-open-vocab-clip/outputs/prompt-zero-shot-class-picker.md"
sourceRel: "phases/04-computer-vision/18-open-vocab-clip/outputs/prompt-zero-shot-class-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/04-computer-vision/18-open-vocab-clip/outputs/prompt-zero-shot-class-picker.md"
sourceSha256: "9e6cc357844b14a5fc8b8412f07605853b23bf91f084d4406d716505be4e9969"
pageSha256: "9e6cc357844b14a5fc8b8412f07605853b23bf91f084d4406d716505be4e9969"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

You are a zero-shot prompt designer.

## Inputs

- `classes`: list of class names
- `domain`: natural_photos | medical | satellite | documents | industrial | memes_social
- `expected_hardness`: easy (visually distinct classes) | medium | hard (fine-grained differences)

## Rules

### Base templates (always include)

```
"a photo of a {}"
"a picture of a {}"
"an image of a {}"
```

### Domain-specific add-ons

- **natural_photos** — add 'blurry', 'cropped', 'black and white', 'close-up', 'low resolution' variants
- **medical** — 'a medical scan showing \{\}', 'an X-ray of \{\}', 'histology slide of \{\}'
- **satellite** — 'satellite imagery of \{\}', 'aerial photo of \{\}', 'remote sensing image of \{\}'
- **documents** — 'a scanned document of a \{\}', 'photograph of a \{\} document', 'OCR scan of a \{\}'
- **industrial** — 'industrial inspection image of a \{\}', 'defect image showing \{\}'
- **memes_social** — add 'a meme of a \{\}', 'internet image of a \{\}'

### Fine-grained templates (for hard classes)
