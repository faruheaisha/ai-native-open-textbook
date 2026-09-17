---
title: "Build a multi-agent hotel booking crew using DeepSeek-R1"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hotel-booking-crew/README.md"
sourceRel: "hotel-booking-crew/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/hotel-booking-crew/README.md"
sourceSha256: "c6f8cb91ee21a0b21f5bc51abc78b67356b5d33b4416927398bb66132663cb8f"
pageSha256: "c6f8cb91ee21a0b21f5bc51abc78b67356b5d33b4416927398bb66132663cb8f"
contentMode: "local-full"
zh: ""
---

# Build a multi-agent hotel booking crew using DeepSeek-R1

In this tutorial we are building a 100% local multi-agent hotel booking crew. It find the cheapest and best hotels for you and uses DeepSeek-R1 running locally.

It features [Browserbase](https://dub.sh/bb1) to create a headless browser tool for the agents and CrewAI for multi-agent orchestration.

### Setup

To sync dependencies, run:

```sh
uv sync
```

### Environment Variables

You need to set up the following environment variables:

```sh
BROWSERBASE_API_KEY=...
OPENAI_API_KEY=... (not required for locally running)
```
[Get your browser base API key here](https://dub.sh/bb1)

OpenAI API key needed only when you are running app_openai.py. app.py uses a locally running DeepSeek with Ollama. ([how to setup local llm](https://ollama.com/library/deepseek-r1))

Ensure these variables are configured correctly before running the application use `.env.example` as reference and create your own `.env` file.

Run the streamlit app using `streamlit run app.py`

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
