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
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/local-chatgpt%20with%20DeepSeek/README.md"
sourceRel: "local-chatgpt with DeepSeek/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/local-chatgpt with DeepSeek/README.md"
sourceSha256: "2728762d24a276bdeee568f513558ebccfcb9436089bfa8ad33b997fcd0299ed"
pageSha256: "2728762d24a276bdeee568f513558ebccfcb9436089bfa8ad33b997fcd0299ed"
contentMode: "local-full"
zh: ""
---

# Local ChatGPT

This project leverages DeepSeek-R1 and Chainlit to create a 100% locally running mini-ChatGPT app.

## Installation and setup

**Setup Ollama**:
   ```bash
   # setup ollama on linux 
   curl -fsSL https://ollama.com/install.sh | sh
   # pull the DeepSeek-R1 model
   ollama pull deepseek-r1 
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

[Watch the video](https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/local-chatgpt%20with%20DeepSeek/deepseek-chatgpt.mp4)

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
