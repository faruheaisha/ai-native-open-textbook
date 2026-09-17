---
title: "Real time RAG Voice Agent, powered by Cartesia"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/rag-voice-agent/README.md"
sourceRel: "rag-voice-agent/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/rag-voice-agent/README.md"
sourceSha256: "13ac8c120ac33ef5a7011a70048f0e346c1eba2ba297f3ee40913d6dc4b43341"
pageSha256: "13ac8c120ac33ef5a7011a70048f0e346c1eba2ba297f3ee40913d6dc4b43341"
contentMode: "local-full"
zh: ""
---

# Real time RAG Voice Agent, powered by Cartesia

This project implements a VOICE RAG Agent powered by [Cartesia](https://go.cartesia.ai/akshay)

## Installation

Ensure you have Python 3.11 or later installed and run:

```bash
pip install -r requirements.txt
```

## Implementation 1: voice_agent_openai.py

This implementation uses OpenAI's services for speech-to-text and cartesia for speech synthesis, simpler setup if you already have OpenAI API keys.

### Requirements
1. [Cartesia AI key](https://go.cartesia.ai/akshay)
2. OpenAI API key
3. [LiveKit credentials](https://livekit.io/)

### Setup
1. Copy `.env.example` to `.env`
2. Configure the following environment variables:
```bash
OPENAI_API_KEY=your_openai_api_key
CARTESIA_API_KEY=your_cartesia_api_key
LIVEKIT_URL=your_livekit_url
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
```

### Running
```bash
python voice_agent_openai.py start
```

### Connecting to Agent Playground

[Livekit Agents Playground](https://agents-playground.livekit.io/)

## Implementation 2: voice_agent.py

This implementation uses AssemblyAI for speech processing and Ollama (with Gemma) for language tasks.

### Setup

1. **Install Ollama**
   ```bash
   # For macOS
   brew install ollama
   
   # For Linux
   curl -fsSL https://ollama.com/install.sh | sh
   ```

2. **Pull Gemma Model**
   ```bash
   ollama pull gemma3
   ```

3. **Configure Environment**
   Copy `.env.example` to `.env` and set:
   ```bash
   CARTESIA_API_KEY=your_cartesia_api_key
   ASSEMBLYAI_API_KEY=your_assemblyai_api_key
   LIVEKIT_URL=your_livekit_url
   LIVEKIT_API_KEY=your_livekit_api_key
   LIVEKIT_API_SECRET=your_livekit_api_secret
   ```

### Running
1. Start Ollama server:
   ```bash
   ollama serve
   ```

2. In a new terminal, run the voice agent:
   ```bash
   python voice_agent.py start
   ```

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
