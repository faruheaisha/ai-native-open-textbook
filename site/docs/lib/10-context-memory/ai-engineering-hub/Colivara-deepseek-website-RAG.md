---
title: "MultiModal RAG with ColiVara and DeepSeek-Janus-Pro"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/README.md"
zh: ""
---

# MultiModal RAG with ColiVara and DeepSeek-Janus-Pro

This project implements a MultiModal RAG with DeepSeek's latest model Janus-Pro and ColiVara.

We use the following tools
- DeepSeek-Janus-Pro as the multi-modal LLM.
- [ColiVara](https://colivara.com/) for SOTA document understanding and retrieval.
- [Firecrawl](https://www.firecrawl.dev/i/api) for web scraping.
- Streamlit as the web interface.

## Demo

A demo of the project is available below:

![demo](https://raw.githubusercontent.com/patchy631/ai-engineering-hub/2c9b106168d4540b88e727e4aa316c06c856c2b7/Colivara-deepseek-website-RAG/video-demo.mp4)

---
## Setup and installations

**Setup Janus**:
```
git clone https://github.com/deepseek-ai/Janus.git
pip install -e ./Janus
```

**Get the API keys**:
- [ColiVara](https://colivara.com/) for SOTA document understanding and retrieval.
- [Firecrawl](https://www.firecrawl.dev/i/api) for web scraping.

Create a .env file and store them as follows:
```python
COLIVARA_API_KEY="<COLIVARA-API-KEY>"
FIRECRAWL_API_KEY="<FIRECRAWL-API-KEY>"
```

**Install Dependencies**:
   Ensure you have Python 3.11 or later installed.
   ```bash
   pip install streamlit-pdf-viewer colivara-py streamlit fastembed flash-attn transformers
   ```

---

## Run the project

Finally, run the project by running the following command:

```bash
streamlit run app.py
```

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
