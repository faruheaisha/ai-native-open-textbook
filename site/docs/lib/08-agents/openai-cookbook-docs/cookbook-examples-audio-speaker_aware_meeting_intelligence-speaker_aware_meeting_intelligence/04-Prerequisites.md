---
title: "openai-cookbook-docs"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/audio/speaker_aware_meeting_intelligence/speaker_aware_meeting_intelligence.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/audio/speaker_aware_meeting_intelligence/speaker_aware_meeting_intelligence.md"
sourceSha256: "69a817e38abb5d8c4a2e4aa9b343ab8f4b306e5d0eb313b163f0c27b6071f535"
pageSha256: "c194a20da5583d7fae6b926fdbaec666e7473583d386aac5016d811c95db934b"
contentMode: "local-full"
zh: ""
---

## Prerequisites

- Python 3.10 or later.
- An OpenAI API key in `OPENAI_API_KEY` for real audio runs.
- A meeting recording in a supported audio format for real audio runs.
- Audio uploads must be 25 MB or smaller. Supported input formats are `mp3`, `mp4`, `mpeg`, `mpga`, `m4a`, `wav`, and `webm`.
- Optional: up to four short, single-speaker reference clips. The speech-to-text guide recommends 2-10 second references, encoded as data URLs when sent with multipart form data.

### Run the notebook locally

From a local clone of the Cookbook repository, create a virtual environment, install Jupyter and the OpenAI SDK, then launch this notebook:

```bash
git clone https://github.com/openai/openai-cookbook.git
cd openai-cookbook
python3 -m venv .venv
source .venv/bin/activate
python -m pip install jupyter "openai>=1.93.0"
export OPENAI_API_KEY="your-api-key"
jupyter notebook examples/audio/speaker_aware_meeting_intelligence/speaker_aware_meeting_intelligence.ipynb
```

The synthetic demo below uses only the Python standard library and does not call the API. For real audio, you can also install the OpenAI SDK from inside an existing notebook environment:

```python
%pip install "openai>=1.93.0"
```
