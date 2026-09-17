---
title: "Book Writer flow using DeepMind's Gemma 3, CrewAI and BrightData"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/book-writer-flow/README.md"
sourceRel: "book-writer-flow/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/book-writer-flow/README.md"
sourceSha256: "53370788284d8c4ffa642772ea7f9ff833b05bca8e6dbd8fe72d6cee05e7df8a"
pageSha256: "53370788284d8c4ffa642772ea7f9ff833b05bca8e6dbd8fe72d6cee05e7df8a"
contentMode: "local-full"
zh: ""
---

# Book Writer flow using DeepMind's Gemma 3, CrewAI and BrightData

This project implements an automated book writing system using AI agents.
- [Bright Data](https://brdta.com/dailydoseofds) is used to scrape YouTube videos.
- CrewAI to build the Agentic workflow.
- Google DeepMind's latest Gemma 3 as the LLM.

---
## Setup and installations

**Get BrightData API Key**:
- Go to [Bright Data](https://brdta.com/dailydoseofds) and sign up for an account.
- Select "Proxies & Scraping" and create a new "SERP API"
- Select "Native proxy-based access"
- You will find your username and password there.
- Store it in the .env file of the src/ folder (after renaming .env.example to .env).

```
BRIGHDATA_USERNAME="..."
BRIGHDATA_PASSWORD="..."
```

**Setup Ollama**:
   ```bash
   # setup ollama on linux 
   curl -fsSL https://ollama.com/install.sh | sh
   # pull gemma3 model
   ollama pull gemma3:4b 
   ```

**Install Dependencies**:
   Ensure you have Python 3.11 or later installed.
   ```bash
   pip install ollama crewai crewai-tools
   ```

---

## Run the project

Finally, head over to this folder:
```
cd book_flow/book_writing_flow/src
```

and run the project by running the following command:

```bash
python book_writing_flow/main.py
```

## Sample Output

The book produced by the workflow on "Astronomy in 2025" is shown here: [Sample book](https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/book-writer-flow/Final_book.pdf)

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
