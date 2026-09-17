---
title: "🔥 AI Startup Insight with Firecrawl FIRE-1 Agent"
sourceId: "08-agents/awesome-llm-apps"
sourceTitle: "Awesome LLM Apps"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps"
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/advanced_ai_agents/single_agent_apps/ai_startup_insight_fire1_agent/README.md"
sourceRel: "advanced_ai_agents/single_agent_apps/ai_startup_insight_fire1_agent/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/advanced_ai_agents/single_agent_apps/ai_startup_insight_fire1_agent/README.md"
sourceSha256: "62e4028db83783deb1ae73f55a6312f1eefc9bf26b60e40903d96e3a2f30ce1f"
pageSha256: "62e4028db83783deb1ae73f55a6312f1eefc9bf26b60e40903d96e3a2f30ce1f"
contentMode: "local-full"
zh: ""
---

# 🔥 AI Startup Insight with Firecrawl FIRE-1 Agent

An advanced web extraction and analysis tool built using Firecrawl's FIRE-1 agent + extract v1 endpoint and the Agno Agent framework to get details of a new startup instantly! This application automatically extracts structured data from startup websites and provides AI-powered business analysis, making it easy to gather insights about companies without manual research.

## Features

- 🌐 **Intelligent Web Extraction**:

  - Extract structured data from any company website
  - Automatically identify company information, mission, and product features
  - Process multiple websites in sequence
- 🔍 **Advanced Web Navigation**:

  - Interact with buttons, links, and dynamic elements
  - Handle pagination and multi-step processes
  - Access information across multiple pages
- 🧠 **AI Business Analysis**:

  - Generate insightful summaries of extracted company data
  - Identify unique value propositions and market opportunities
  - Provide actionable business intelligence
- 📊 **Structured Data Output**:

  - Organize information in a consistent JSON schema
  - Extract company name, description, mission, and product features
  - Standardize output for further processing
- 🎯 **Interactive UI**:

  - User-friendly Streamlit interface
  - Process multiple URLs in parallel
  - Clear presentation of extracted data and analysis

## How to Run

1. **Setup Environment**

   ```bash
   # Clone the repository

   git clone https://github.com/Shubhamsaboo/awesome-llm-apps.git
   cd advanced_ai_agents/single_agent_apps/ai_startup_insight_fire1_agent
   ```

   # Install dependencies

   ```
   pip install -r requirements.txt

   ```
2. **Configure API Keys**

   - Get Firecrawl API key from [Firecrawl](https://firecrawl.dev)
   - Get OpenAI API key from [OpenAI Platform](https://platform.openai.com)
3. **Run the Application**

   ```bash
   streamlit run ai_startup_insight_fire1_agent.py
   ```

## Usage

1. Launch the application using the command above
2. Provide your Firecrawl and OpenAI API keys in the sidebar
3. Enter one or more company website URLs in the text area (one per line)
4. Click "🚀 Start Analysis" to begin the extraction and analysis process
5. View the structured data and AI analysis for each website in the tabbed interface

## Example Websites to Try

- https://www.spurtest.com
- https://cluely.com
- https://www.harvey.ai

## Technologies Used

- **Firecrawl FIRE-1**: Advanced web extraction agent
- **Agno Agent Framework**: For AI analysis capabilities
- **OpenAI GPT Models**: For business insight generation
- **Streamlit**: For the interactive web interface

## Requirements

- Python 3.8+
- Firecrawl API key
- OpenAI API key
- Internet connection for web extraction
