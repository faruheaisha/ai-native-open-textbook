---
title: "Gemini Chatbot of Users (Me)"
sourceId: "08-agents/ed-donner-agents"
sourceTitle: "Ed Donner：AI Agents 实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/agents"
entryUrl: ""
zh: ""
---

# Gemini Chatbot of Users (Me)

A simple AI chatbot that represents **Rishabh Dubey** by leveraging Google Gemini API, Gradio for UI, and context from **summary.txt** and **Profile.pdf**.

## Screenshots
![image](https://github.com/user-attachments/assets/c6d417df-aa6a-482e-9289-eeb8e9e0f3d2)

## Features
- Loads background and profile data to answer questions in character.
- Uses Google Gemini for natural language responses.
- Runs in Gradio interface for easy web deployment.

## Requirements
- Python 3.10+
- API key for Google Gemini stored in `.env` file as `GOOGLE_API_KEY`.

## Installation

1. Clone this repo:

   ```bash
   https://github.com/rishabh3562/Agentic-chatbot-me.git
   ```

2. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Add your API key in a `.env` file:

   ```
