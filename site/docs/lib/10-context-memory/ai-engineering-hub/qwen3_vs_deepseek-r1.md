---
title: "Alibaba's Qwen3 and DeepSeek-R1 compared using RAG"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/qwen3_vs_deepseek-r1/README.md"
sourceRel: "qwen3_vs_deepseek-r1/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/qwen3_vs_deepseek-r1/README.md"
sourceSha256: "bfd923822d0141a39f21c8ea1409f3224314d491e04730598dd83f1321b3ea4f"
pageSha256: "bfd923822d0141a39f21c8ea1409f3224314d491e04730598dd83f1321b3ea4f"
contentMode: "local-full"
zh: ""
---

# Alibaba's Qwen3 and DeepSeek-R1 compared using RAG

This tutorials build a RAG app powered by [LlamaIndex](https://www.llamaindex.ai/) to compare Qwen3 and DeepSeek-R1. We have used [Opik](https://github.com/comet-ml/opik) for evaluation and observability, which is 100% open-source and nicely integrates with alsmot all popular frameworks.

### Setup

To sync dependencies, run:

```sh
uv sync
```

Download the Qwen3 and DeepSeek-R1 models from [Ollama](https://ollama.com/library) as follows:

```sh
ollama pull qwen3
ollama pull deepseek-r1
```

### Environment Variables

You need to set up the following environment variables:

```sh
OPIK_API_KEY=...
OPIK_USERNAME=...
```

Ensure these variables are configured correctly before running the application use `.env.example` as reference and create your own `.env` file.

Run the streamlit app using `streamlit run app.py`

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
