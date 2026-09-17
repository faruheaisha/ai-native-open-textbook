---
title: "RAG over audio files using AssemblyAI"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/chat-with-audios/README.md"
sourceRel: "chat-with-audios/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/chat-with-audios/README.md"
sourceSha256: "3f8e7a81fbc931a97b4e45d16f3bc37bcf8151aa7f9a99b98f262a1acc367987"
pageSha256: "3f8e7a81fbc931a97b4e45d16f3bc37bcf8151aa7f9a99b98f262a1acc367987"
contentMode: "local-full"
zh: ""
---

# RAG over audio files using AssemblyAI

This project builds a RAG app over audio files.
We use:
- AssemblyAI to generate transcripts from audio files.
- LlamaIndex for orchestrating the RAG app.
- Qdrant VectorDB for storing the embeddings.
- Streamlit to build the UI.

A demo is shown below:

[Video demo](https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/chat-with-audios/demo.mp4)

## Installation and setup

**Setup AssemblyAI**:

Get an API key from [AssemblyAI](http://bit.ly/4bGBdux) and set it in the `.env` file as follows:

```bash
ASSEMBLYAI_API_KEY=<YOUR_API_KEY> 
```

**Setup SambaNova**:

Get an API key from [SambaNova](https://sambanova.ai/) and set it in the `.env` file as follows:

```bash
SAMBANOVA_API_KEY=<YOUR_SAMBANOVA_API_KEY> 
```

Note: Instead of SambaNova, you can also use Ollama.

**Setup Qdrant VectorDB**
   ```bash
   docker run -p 6333:6333 -p 6334:6334 \
   -v $(pwd)/qdrant_storage:/qdrant/storage:z \
   qdrant/qdrant
   ```

**Install Dependencies**:
   Ensure you have Python 3.11 or later installed.
   ```bash
   pip install streamlit assemblyai llama-index-vector-stores-qdrant llama-index-llms-sambanovasystems sseclient-py
   ```

**Run the app**:

   Run the app by running the following command:

   ```bash
   streamlit run app.py
   ```

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
