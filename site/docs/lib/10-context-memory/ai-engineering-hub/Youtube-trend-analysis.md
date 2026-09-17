---
title: "YouTube Trend Analysis with CrewAI and BrightData"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/Youtube-trend-analysis/README.md"
sourceRel: "Youtube-trend-analysis/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/Youtube-trend-analysis/README.md"
sourceSha256: "f611f5959fdd676bf8b4f168563c09b3170c0ee883e600a59fbd2684b416294e"
pageSha256: "f611f5959fdd676bf8b4f168563c09b3170c0ee883e600a59fbd2684b416294e"
contentMode: "local-full"
zh: ""
---

# YouTube Trend Analysis with CrewAI and BrightData

This project implements a YouTube Trend Analysis with CrewAI and BrightData.
- [Bright Data](https://brdta.com/dailydoseofds) is used to scrape YouTube videos.
- CrewAI is used to analyze the transcripts of the videos and generate a summary.
- Streamlit is used to create a web interface for the project.

---
## Setup and installations

**Get BrightData API Key**:
- Go to [Bright Data](https://brdta.com/dailydoseofds) and sign up for an account.
- Once you have an account, go to the API Key page and copy your API key.
- Paste your API key by creating a `.env` file as follows:

```
BRIGHT_DATA_API_KEY=your_api_key
```

**Setup Ollama**:
   ```bash
   # setup ollama on linux 
   curl -fsSL https://ollama.com/install.sh | sh
   # pull llama 3.2 model
   ollama pull llama3.2 
   ```

**Install Dependencies**:
   Ensure you have Python 3.11 or later installed.
   ```bash
   pip install streamlit ollama crewai crewai-tools
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
