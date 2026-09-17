---
title: "100% private Agentic RAG API"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/deploy-agentic-rag/README.md"
sourceRel: "deploy-agentic-rag/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/deploy-agentic-rag/README.md"
sourceSha256: "29ee3a91a899e490da01252d1cd1f1e2063e9cb83167acc3235d5a9ab3516daa"
pageSha256: "29ee3a91a899e490da01252d1cd1f1e2063e9cb83167acc3235d5a9ab3516daa"
contentMode: "local-full"
zh: ""
---

# 100% private Agentic RAG API

This is a simple API that uses CrewAI and LitServe to create a 100% private Agentic RAG API.

## How to use

2. Install the dependencies:

```bash
pip install crewai crewai-tools litserve
```

Download Ollama and run the following command to download the Qwen3 model:

```bash
ollama pull qwen3
```

3. Run the server:

```bash
python server.py
```

4. Run the client:

```bash
python client.py --query "What is the Qwen3?"
```

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
