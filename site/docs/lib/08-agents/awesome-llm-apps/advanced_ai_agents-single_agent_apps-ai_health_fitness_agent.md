---
title: "AI Health & Fitness Planner Agent 🏋️‍♂️"
sourceId: "08-agents/awesome-llm-apps"
sourceTitle: "Awesome LLM Apps"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps"
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/advanced_ai_agents/single_agent_apps/ai_health_fitness_agent/README.md"
sourceRel: "advanced_ai_agents/single_agent_apps/ai_health_fitness_agent/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/advanced_ai_agents/single_agent_apps/ai_health_fitness_agent/README.md"
sourceSha256: "28daa8c3400e0b9a2d4453b38faaaa09084536fa1792eecf531571fb1d235ec5"
pageSha256: "28daa8c3400e0b9a2d4453b38faaaa09084536fa1792eecf531571fb1d235ec5"
contentMode: "local-full"
zh: ""
---

# AI Health & Fitness Planner Agent 🏋️‍♂️

### 🎓 FREE Step-by-Step Tutorial 
**👉 [Click here to follow our complete step-by-step tutorial](https://www.theunwindai.com/p/build-a-personal-health-and-fitness-ai-agent-using-google-gemini) and learn how to build this from scratch with detailed code walkthroughs, explanations, and best practices.**

The **AI Health & Fitness Planner** is a personalized health and fitness Agent powered by Agno AI Agent framework. This app generates tailored dietary and fitness plans based on user inputs such as age, weight, height, activity level, dietary preferences, and fitness goals.

## Features

- **Health Agent and Fitness Agent**
    - The app has two phidata agents that are specialists in giving Diet advice and Fitness/workout advice respectively.

- **Personalized Dietary Plans**:
  - Generates detailed meal plans (breakfast, lunch, dinner, and snacks).
  - Includes important considerations like hydration, electrolytes, and fiber intake.
  - Supports various dietary preferences like Keto, Vegetarian, Low Carb, etc.

- **Personalized Fitness Plans**:
  - Provides customized exercise routines based on fitness goals.
  - Covers warm-ups, main workouts, and cool-downs.
  - Includes actionable fitness tips and progress tracking advice.

- **Interactive Q&A**: Allows users to ask follow-up questions about their plans.

## Requirements

The application requires the following Python libraries:

- `agno`
- `google-generativeai`
- `streamlit`

Ensure these dependencies are installed via the `requirements.txt` file according to their mentioned versions

## How to Run

Follow the steps below to set up and run the application:
Before anything else, Please get a free Gemini API Key provided by Google AI here: https://aistudio.google.com/apikey

   ```bash
   git clone https://github.com/Shubhamsaboo/awesome-llm-apps.git
   cd advanced_ai_agents/single_agent_apps/ai_health_fitness_agent
   ```

2. **Install the dependencies**
    ```bash
    pip install -r requirements.txt
    ```
3. **Run the Streamlit app**
    ```bash
    streamlit run health_agent.py
    ```
