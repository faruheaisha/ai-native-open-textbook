---
title: "Local ChatGPT"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/local-chatgpt/README.md"
sourceRel: "local-chatgpt/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/local-chatgpt/README.md"
sourceSha256: "8196686075af00484b8d0745f9818a8349cad3bebaa1d9bdde0cba32cb53ec04"
pageSha256: "8196686075af00484b8d0745f9818a8349cad3bebaa1d9bdde0cba32cb53ec04"
contentMode: "local-full"
zh: ""
---

# Local ChatGPT

This project leverages Llama 3.2 vision and Chainlit to create a 100% locally running ChatGPT app.

## Installation and setup

**Setup Ollama**:
   ```bash
   # setup ollama on linux 
   curl -fsSL https://ollama.com/install.sh | sh
   # pull llama 3.2 vision model
   ollama pull llama3.2-vision 
   ```

**Install Dependencies**:
   Ensure you have Python 3.11 or later installed.
   ```bash
   pip install pydantic==2.10.1 chainlit ollama
   ```

**Run the app**:

   Run the chainlit app as follows:
   ```bash
   chainlit run app.py -w
   ```

## Demo Video

Click below to watch the demo video of the AI Assistant in action:

[Watch the video](https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/local-chatgpt/video-demo.mp4)

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
