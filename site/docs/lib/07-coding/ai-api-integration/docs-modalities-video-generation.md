---
title: "视频生成调用指南"
sourceId: "07-coding/ai-api-integration"
sourceTitle: "AI API 接入实战（OpenAI 兼容协议）"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/CCCpan/ai-api-integration"
entryUrl: "https://github.com/CCCpan/ai-api-integration/blob/95cd8c6f48e58dfe96703a37b6c8fccb583bea74/docs/modalities/video-generation.md"
sourceRel: "docs/modalities/video-generation.md"
rawUrl: "/raw/07-coding/ai-api-integration/docs/modalities/video-generation.md"
sourceSha256: "ee5a3e30465e7deb21e15adc2c72829747da3795dbdd789669f329d66be49868"
pageSha256: "ee5a3e30465e7deb21e15adc2c72829747da3795dbdd789669f329d66be49868"
contentMode: "local-full"
zh: ""
---

# 视频生成调用指南

> 通过统一网关调用 Sora 2、可灵 1.6、海螺 2.3、字节 Seedance 等视频生成模型。

## 模型清单

| 模型 ID | 厂商 | 时长 | 分辨率 |
|---------|------|------|--------|
| `sora-2` | OpenAI | 5-60s | 720p / 1080p |
| `kling-v1.6` | 快手可灵 | 5-10s | 720p |
| `MiniMax-Hailuo-2.3` | MiniMax | 6s | 720p |
| `doubao-seedance-1-0-pro` | 字节 | 5s | 720p |

## 视频生成是异步任务

视频生成耗时 1-5 分钟，调用是**异步**模式：

1. 提交任务 → 拿 `task_id`
2. 轮询任务状态
3. 完成后拿到视频 URL

### Python 调用

```python
import time, requests

API_KEY = "sk-xxx"
BASE = "http://xdhdancer.top"

# 1. 提交任务
resp = requests.post(
    f"{BASE}/v1/videos/generations",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={
        "model": "sora-2",
        "prompt": "a panda eating bamboo in slow motion, cinematic",
        "duration": 6,
        "size": "1280x720",
    },
)
task_id = resp.json()["task_id"]

# 2. 轮询
while True:
    status = requests.get(
        f"{BASE}/v1/videos/{task_id}",
        headers={"Authorization": f"Bearer {API_KEY}"},
    ).json()
    
    if status["status"] == "succeeded":
        print("Video URL:", status["video_url"])
        break
    elif status["status"] == "failed":
        print("Failed:", status["error"])
        break
    
    time.sleep(10)
    print("...waiting")
```

## Prompt 技巧

视频 prompt 需要描述**动态**：

```
a fox running through autumn forest, leaves falling, 
camera follows from behind, golden hour lighting
```

避免静态描述（如 `a fox standing`），模型可能生成几乎不动的画面。
