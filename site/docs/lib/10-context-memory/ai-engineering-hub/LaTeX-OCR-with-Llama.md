---
title: "LaTeX-OCR"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/LaTeX-OCR-with-Llama/README.md"
sourceRel: "LaTeX-OCR-with-Llama/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/LaTeX-OCR-with-Llama/README.md"
sourceSha256: "74244fa58c53f75ff6d0eb2624a9efcf61275c0f7370f29e1bec7306e5c33eda"
pageSha256: "74244fa58c53f75ff6d0eb2624a9efcf61275c0f7370f29e1bec7306e5c33eda"
contentMode: "local-full"
zh: ""
---

# LaTeX-OCR

This project leverages Llama 3.2 vision and Streamlit to create a LaTeX OCR app that converts images of LaTeX equations to LaTeX code.

## Demo Video

Click below to watch the demo video of the AI Assistant in action:

[Watch the video](https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/LaTeX-OCR-with-Llama/LaTeX-OCR.mp4)

## Installation and setup

**Setup Ollama**:

   *On Linux*:
   ```bash 
   curl -fsSL https://ollama.com/install.sh | sh
   # pull llama 3.2 vision model
   ollama run llama3.2-vision 
   ```

   *On MacOS*:
   ```bash 
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"    # get homebrew
   xcode-select --install
   brew install ollama    # install ollama
   ollama pull llama3.2-vision    # pull llama 3.2 vision model
   ollama run llama3.2-vision 
   ```

**Install Dependencies**:
   Ensure you have Python 3.11 or later installed.
   ```bash
   pip install streamlit ollama
   ```

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
