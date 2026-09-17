---
title: "Large File Uploads"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/finetuning/references/large-file-uploads.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/finetuning/references/large-file-uploads.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/finetuning/references/large-file-uploads.md"
sourceSha256: "88384d73903fca7e2e7400edd8fbac41c35352d7e06150183e87c9fcee122c8c"
pageSha256: "88384d73903fca7e2e7400edd8fbac41c35352d7e06150183e87c9fcee122c8c"
contentMode: "local-full"
zh: ""
---

# Large File Uploads

The standard `client.files.create()` silently fails on JSONL files >~150MB (Azure returns 500 during job execution). Use the chunked Uploads API:

```python
upload = client.uploads.create(filename="data.jsonl", purpose="fine-tune", bytes=file_size, mime_type="application/jsonl")
part_ids = []
with open(filepath, "rb") as f:
    while chunk := f.read(64 * 1024 * 1024):  # 64MB chunks
        part = client.uploads.parts.create(upload_id=upload.id, data=chunk)
        part_ids.append(part.id)
completed = client.uploads.complete(upload_id=upload.id, part_ids=part_ids)
file_id = completed.file.id
```

**Important:** Requires `openai.AzureOpenAI()` client, NOT `openai.OpenAI()` with `/v1/` URL. The project endpoint returns 404 for upload operations.

| File Size | Method |
|-----------|--------|
| < 100MB | Standard `files.create()` |
| 100MB–5GB | Chunked Uploads API |
| > 5GB | Split dataset |
