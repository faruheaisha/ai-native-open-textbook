---
title: "LLama3.2-RAG application powered by ModernBert"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/modernbert-rag/README.md"
sourceRel: "modernbert-rag/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/modernbert-rag/README.md"
sourceSha256: "137108411e6e9d8eee5006b19bee7d07d381e32c3edd2760b375c5a4cba86475"
pageSha256: "137108411e6e9d8eee5006b19bee7d07d381e32c3edd2760b375c5a4cba86475"
contentMode: "local-full"
zh: ""
---

# LLama3.2-RAG application powered by ModernBert

This project leverages a locally Llama 3.2 to build a RAG application to **chat with your docs** powered by
- ModernBert for embeddings.
- Llama 3.2 for the LLM.
- Streamlit to build the UI.

## Demo

Watch the demo video:

![Watch the demo](/mirror/55/558c69d8df455343605792dcafad58815927f10f.mp4)

## Installation and setup

**Setup Transformers**:

As of now, ModernBERT requires transformers to be installed from the (stable) main branch of the transformers repository. After the next transformers release (4.48.x), it will be supported in the python package available everywhere.

So first, create a new virtual environment.
    
```bash
python -m venv modernbert-env
source modernbert-env/bin/activate
```

Then, install the latest transformers.

```bash
pip install git+https://github.com/huggingface/transformers
```

**Setup Ollama**:
   ```bash
   # setup ollama on linux 
   curl -fsSL https://ollama.com/install.sh | sh
   # pull llama 3.2
   ollama pull llama3.2 
   ```

**Install Dependencies (in the virtual environment)**:
   Ensure you have Python 3.11 or later installed.
   ```bash
   pip install streamlit ollama llama_index-llms-ollama llama_index-embeddings-huggingface
   ```

## Running the app

Finally, run the app.

```bash
streamlit run rag-modernbert.py
```

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
