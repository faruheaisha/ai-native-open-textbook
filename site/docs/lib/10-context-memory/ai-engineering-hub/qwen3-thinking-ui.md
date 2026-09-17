---
title: "Local ChatGPT with thinking UI"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/qwen3-thinking-ui/README.md"
sourceRel: "qwen3-thinking-ui/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/qwen3-thinking-ui/README.md"
sourceSha256: "026ab5b209cbb8f9675513a6cb283dad81df19d4992ff7efb3c71495fe1957bf"
pageSha256: "026ab5b209cbb8f9675513a6cb283dad81df19d4992ff7efb3c71495fe1957bf"
contentMode: "local-full"
zh: ""
---

# Local ChatGPT with thinking UI

This project leverages Qwen3:4B and Streamlit to create a 100% locally running mini-ChatGPT app.

## Installation and setup

**Setup Ollama**:
   ```bash
   # setup ollama on linux 
   curl -fsSL https://ollama.com/install.sh | sh
   # pull the Qwen3:4B model
   ollama pull qwen3:4b 
   ```

**Install Dependencies**:
   Ensure you have Python 3.11 or later installed.
   ```bash
   pip install streamlit ollama
   ```

**Run the app**:

   Run the streamlit app as follows:
   ```bash
   streamlit run app.py -w
   ```

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
