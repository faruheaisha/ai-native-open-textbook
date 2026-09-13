---
title: "音频生成调用指南"
sourceId: "07-coding/ai-api-integration"
sourceTitle: "AI API 接入实战（OpenAI 兼容协议）"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/CCCpan/ai-api-integration"
entryUrl: "https://github.com/CCCpan/ai-api-integration/blob/95cd8c6f48e58dfe96703a37b6c8fccb583bea74/README.md"
zh: ""
---

# 音频生成调用指南

> 通过统一网关调用 Suno（音乐生成）、豆包 TTS（语音合成）。

## 模型清单

| 模型 ID | 类型 | 特点 |
|---------|------|------|
| `suno_music` | 音乐生成 | 一句话生成完整带歌词的歌 |
| `doubao-tts` | TTS | 字节 TTS，中英多语种 |

## Suno 音乐生成（异步任务）

```python
import requests, time

API_KEY = "sk-xxx"
BASE = "http://xdhdancer.top"

resp = requests.post(
    f"{BASE}/v1/audio/generations",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={
        "model": "suno_music",
        "prompt": "a melancholic indie folk song about coffee and rain",
        "duration": 60,
    },
)
task_id = resp.json()["task_id"]

# 轮询
while True:
    status = requests.get(
        f"{BASE}/v1/audio/{task_id}",
        headers={"Authorization": f"Bearer {API_KEY}"},
    ).json()
    if status["status"] == "succeeded":
        print("Audio URL:", status["audio_url"])
        break
    time.sleep(10)
```

## TTS 文本转语音

```python
from openai import OpenAI

client = OpenAI(api_key="sk-xxx", base_url="http://xdhdancer.top/v1")

resp = client.audio.speech.create(
    model="doubao-tts",
    voice="alloy",
    input="你好，欢迎使用大模型 API 接入实战指南。",
)

with open("output.mp3", "wb") as f:
    f.write(resp.content)
```

## Suno Prompt 技巧

- **风格**：`indie rock`、`lo-fi hip hop`、`acoustic ballad`
- **情绪**：`melancholic`、`upbeat`、`dreamy`
- **元素**：`with female vocals`、`piano-driven`、`with strings`
- **可指定歌词**：`lyrics: ...`
