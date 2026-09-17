---
title: "📄 Resume & Job Matcher"
sourceId: "08-agents/awesome-llm-apps"
sourceTitle: "Awesome LLM Apps"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps"
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/advanced_llm_apps/resume_job_matcher/README.md"
sourceRel: "advanced_llm_apps/resume_job_matcher/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/advanced_llm_apps/resume_job_matcher/README.md"
sourceSha256: "4ec1239dce6577ec7b512281f459ae8306ccf0f198b1e020f7fecd66d8c8e2e2"
pageSha256: "4ec1239dce6577ec7b512281f459ae8306ccf0f198b1e020f7fecd66d8c8e2e2"
contentMode: "local-full"
zh: ""
---

# 📄 Resume & Job Matcher

## 🚀 Overview
This app allows you to upload a **Resume** and a **Job Description**, then uses an LLM to:
- ✅ Provide a **Fit Score** (0–100%)
- 💪 Highlight strengths in the resume
- 📝 Suggest improvements tailored to the job

A great tool for job seekers to optimize resumes for each application.

---

## 🛠️ Tech Stack
- **Python**
- **Streamlit** – for UI
- **Ollama + LLM** (e.g., `llama3`) – for analysis
- **PyMuPDF** – for PDF parsing

---

## ⚡ Setup Instructions 
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
2. Install Ollama and run a model (e.g. llama3): `ollama run llama3`
3. Start the app: `streamlit run app.py`
