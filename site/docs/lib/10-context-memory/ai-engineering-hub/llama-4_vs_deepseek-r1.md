---
title: "MetaAI's Llama 4 and DeeSeek-R1 compared using RAG"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/llama-4_vs_deepseek-r1/README.md"
sourceRel: "llama-4_vs_deepseek-r1/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/llama-4_vs_deepseek-r1/README.md"
sourceSha256: "eb4c3ddaf07e12ffd3e13669efdd5403a845b1eb03cd9dd1fadb8713774f1610"
pageSha256: "eb4c3ddaf07e12ffd3e13669efdd5403a845b1eb03cd9dd1fadb8713774f1610"
contentMode: "local-full"
zh: ""
---

# MetaAI's Llama 4 and DeeSeek-R1 compared using RAG

This tutorials build a RAG app powered by [LlamaIndex](https://www.llamaindex.ai/) to compare Llama 4 and DeeSeek-R1. We have used [Opik](https://github.com/comet-ml/opik) for evaluation and observability, which is 100% open-source and nicely integrates with alsmot all popular frameworks.

You can quickly test it on your own complex docs [here](https://eyelevel.ai/).

### Setup

To sync dependencies, run:

```sh
uv sync
```

### Environment Variables

You need to set up the following environment variables:

```sh
GROQ_API_KEY=...
OPENAI_API_KEY=...
```
OpenAI API key needed for using o1 and a judge during evaluation

Ensure these variables are configured correctly before running the application use `.env.example` as reference and create your own `.env` file.

Run the streamlit app using `streamlit run app.py`

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
