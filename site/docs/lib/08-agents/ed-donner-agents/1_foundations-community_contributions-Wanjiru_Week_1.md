---
title: "Career Chatbot 🤖"
sourceId: "08-agents/ed-donner-agents"
sourceTitle: "Ed Donner：AI Agents 实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/agents"
entryUrl: "https://github.com/ed-donner/agents/blob/8ceaf66c24643627c1e4806851736bdd444bdd4b/1_foundations/community_contributions/Wanjiru_Week_1/README.md"
sourceRel: "1_foundations/community_contributions/Wanjiru_Week_1/README.md"
rawUrl: "/raw/08-agents/ed-donner-agents/1_foundations/community_contributions/Wanjiru_Week_1/README.md"
sourceSha256: "c259efa029eb7830fa34947f84f00e0da9d918679796e5cc4f8f6bbcf942c720"
pageSha256: "c259efa029eb7830fa34947f84f00e0da9d918679796e5cc4f8f6bbcf942c720"
contentMode: "local-full"
zh: ""
---

# Career Chatbot 🤖

An AI-powered career assistant that represents me and answers questions about my experience, skills, and background. Built using Gradio and deployed on Hugging Face Spaces.

---

## 🚀 Features

- Answers questions about my career, skills, and projects  
- Uses real data from my summary and LinkedIn profile  
- Allows users to share their email to get in touch  
- Sends push notifications when a user shares contact details  
- Deployed as a live web app  

---

## 🧠 How it works

- Uses an LLM (OpenAI) to generate responses  
- Injects personal context (summary + LinkedIn data) into prompts  
- Uses tool-calling to detect when a user provides an email  
- Sends notifications via Pushover  

---

## 🛠️ Tech Stack

- Python  
- Gradio  
- OpenAI API  
- Pushover (for notifications)  
- Hugging Face Spaces (deployment)  

---

## 📁 Project Structure
├── app.py
├── linkedin.pdf
└── README.md

## ⚙️ Setup (Local)

1. Create virtual environment
2. Install dependencies
3. Create `.env` file
4. Run: python app.py

## 🌍 Deployment

Deployed using: gradio deploy
