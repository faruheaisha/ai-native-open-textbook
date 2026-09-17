---
title: "MultiModal RAG with DeepSeek-Janus-Pro"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/deepseek-multimodal-RAG/README.md"
sourceRel: "deepseek-multimodal-RAG/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/deepseek-multimodal-RAG/README.md"
sourceSha256: "9752ebd8322c154e23545d17cd32912468a70dbfe477b70cb95bf74b05df2de2"
pageSha256: "9752ebd8322c154e23545d17cd32912468a70dbfe477b70cb95bf74b05df2de2"
contentMode: "local-full"
zh: ""
---

# MultiModal RAG with DeepSeek-Janus-Pro

This project implements a MultiModal RAG with DeepSeek's latest model Janus-Pro.

We use the following tools
- DeepSeek-Janus-Pro as the multi-modal LLM
- ColPali as the vision encoder
- Qdrant as the vector database
- Streamlit as the web interface

## Demo

A demo of the project is available below:

![demo](/mirror/0e/0e4467a3bf7e54c778cddc5d602cae2e200ccbb4.mp4)

---
## Setup and installations

**Setup Janus**:
```
git clone https://github.com/deepseek-ai/Janus.git
pip install -e ./Janus
```

**Install Dependencies**:
   Ensure you have Python 3.11 or later installed.
   ```bash
   pip install streamlit fastembed flash-attn transformers
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
