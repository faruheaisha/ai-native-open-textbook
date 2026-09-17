---
title: "Enterprise-grade, agentic RAG over complex real-world docs"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/agentic_rag_deepseek/README.md"
sourceRel: "agentic_rag_deepseek/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/agentic_rag_deepseek/README.md"
sourceSha256: "ffcd42d6d355ff6c5990f9fcc86d3aaf3cb2a014e9bf48e97db4d0e86a6612b5"
pageSha256: "ffcd42d6d355ff6c5990f9fcc86d3aaf3cb2a014e9bf48e97db4d0e86a6612b5"
contentMode: "local-full"
zh: ""
---

# Enterprise-grade, agentic RAG over complex real-world docs

The project uses EyelevelAI's state of the art document parsing and retrieval system GroundX. It's integrated as a custom tool with CrewAI.

Before you start, quickly test it on your own document [here](https://dashboard.eyelevel.ai/xray)

GroundX can also be deployed completely on premise as well, the code is open-source, here's their [GitHub repo](https://github.com/eyelevelai/groundx-on-prem).

Grab your API keys's here.
- [GroundX API keys](https://docs.eyelevel.ai/documentation/fundamentals/quickstart#step-1-getting-your-api-key)
- [SERPER API keys](https://serper.dev/)

### Watch this tutorial on YouTube
[![Watch this tutorial on YouTube](https://github.com/patchy631/ai-engineering-hub/blob/main/agentic_rag_deepseek/assets/thumbnail.png)](https://www.youtube.com/watch?v=79xvgj4wvHQ)

---
## Setup and installations

**Setup Environment**:
- Paste your API keys by creating a `.env`
- Refer `.env.example` file

**Install Dependencies**:
   Ensure you have Python 3.11 or later installed.
   ```bash
   pip install groundx crewai crewai-tools
   ```
**Running the app**:
```bash
streamlit run app_deep_seek.py
```

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
