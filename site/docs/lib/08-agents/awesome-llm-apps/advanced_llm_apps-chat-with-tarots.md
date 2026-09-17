---
title: "✨ The Magician IA Reader: AI-Powered NLP & Tarot Insights ✨"
sourceId: "08-agents/awesome-llm-apps"
sourceTitle: "Awesome LLM Apps"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps"
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/advanced_llm_apps/chat-with-tarots/README.md"
sourceRel: "advanced_llm_apps/chat-with-tarots/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/advanced_llm_apps/chat-with-tarots/README.md"
sourceSha256: "a39aeb9b0ae3617d2ed1319e942ebd13ab64c7d48085010ef71ff793ba3970be"
pageSha256: "a39aeb9b0ae3617d2ed1319e942ebd13ab64c7d48085010ef71ff793ba3970be"
contentMode: "local-full"
zh: ""
---

# ✨ The Magician IA Reader: AI-Powered NLP & Tarot Insights ✨

Welcome to **The Magician IA Reader**! This project presents a unique application combining the power of Artificial Intelligence with the mystique of tarot reading.

![TheMagicianDemo](https://github.com/maurizioorani/TheMagician-IA-Reader/blob/main/data/readme/TheMagicianAI.gif)

**What it Does:**

This application functions as an AI-driven tarot reader. It takes natural language input and, using an AI model guided by traditional tarot card meanings, provides interpretative insights.

**Key Features:**

* **Natural Language Support:** Understands and interacts in natural language (currently configured for English).
* **Local AI Model ('phi4'):** Runs on the efficient 'phi4' model, ideal for local processing and privacy.
* **CSV-driven Knowledge Base:** Utilizes structured CSV files to store and reference detailed tarot card meanings and symbolism (currently using `data/tarots.csv` with English content).
* **Deep Insights:** Transforms raw text queries into meaningful, context-aware interpretations based on tarot symbolism.

**How it Works:**

The core of The Magician IA Reader lies in its use of the 'phi4' local AI model. This model is fine-tuned or prompted using comprehensive data from CSV files, which contain the interpretations for each tarot card. When a user provides text input, the application processes it through the AI, which then generates a response informed by the tarot meanings.

**Why Use It?**

* **Researchers & Developers:** Explore the capabilities of local AI models for natural language understanding and generation.
* **AI Enthusiasts:** Experiment with a practical application of AI in a unique domain.
* **Curious Minds:** Experience an innovative way to interact with AI for personal insights.

Step into the world where AI meets intuition with The Magician IA Reader!

---

## ⚙️ Installation

### Prerequisites

- **Python 3.8 or higher**
- **pip** – Python package installer
- **Ollama** – running locally:
  Install from: https://ollama.com/
  ```bash
  ollama pull phi4
  ollama serve
  ```
  
### Steps

   ```bash
   git clone https://github.com/maurizioorani/TheMagician-IA-Reader.git
   cd TheMagician-IA-Reader
   ```

2. **Set Up a Virtual Environment (Recommended)**

```bash
# On Unix/macOS:
python -m venv venv
source venv/bin/activate

# On Windows:
python -m venv venv
venv\Scripts\activate
```

# Frontend (Streamlit):
First, install all the dependencies
```bash
pip install -r requirements.txt
```

Run the Application

```bash
streamlit run app.py
```
The Streamlit interface will typically be available at http://localhost:8501.

## 📖 How to Use
Access the App: Open your browser and navigate to the URL provided by Streamlit (commonly http://localhost:8501).

Input Your Text Data: Use the intuitive interface to paste, type, or upload the questions you need to be answered.

Choose if you need 3, 5 or 7 cards for the reading.

Read the Insights: View detailed analytics and visualizations that reveal the meaning of the extracted cards.

## 🤝 Contributing

Fork the repository.

Create a new branch for your changes.

For major changes, please discuss them via an issue before implementation.
