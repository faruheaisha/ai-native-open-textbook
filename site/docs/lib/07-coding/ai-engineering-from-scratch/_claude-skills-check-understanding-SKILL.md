---
title: "Check Understanding"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/.claude/skills/check-understanding/SKILL.md"
sourceRel: ".claude/skills/check-understanding/SKILL.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/.claude/skills/check-understanding/SKILL.md"
sourceSha256: "c6e2e985794e281922872af186dd0aba1920faca1950ecf85e9596b53ced56d9"
pageSha256: "c6e2e985794e281922872af186dd0aba1920faca1950ecf85e9596b53ced56d9"
contentMode: "local-full"
zh: ""
---

# Check Understanding

Test your knowledge of a completed phase from the AI Engineering from Scratch course.

## Activation

This skill activates when the user says things like:
- `/check-understanding 3` or `/check-understanding deep-learning`
- "quiz me on phase 2"
- "test phase 1"
- "check my understanding of transformers"
- "do I know phase 3"
- "am I ready for the next phase"

## Input

Accepts a phase number (0-19) or a phase name as argument. If no argument is provided, ask the user which phase they want to be tested on by listing all 20 phases.

## Phase Map

Map the argument to the correct phase directory under `phases/`:

| Input | Directory | Phase Name |
|-------|-----------|------------|
| 0, setup, tooling | `00-setup-and-tooling` | Setup & Tooling |
| 1, math, math-foundations | `01-math-foundations` | Math Foundations |
| 2, ml, ml-fundamentals | `02-ml-fundamentals` | ML Fundamentals |
| 3, deep-learning, dl | `03-deep-learning-core` | Deep Learning Core |
| 4, cv, computer-vision, vision | `04-computer-vision` | Computer Vision |
| 5, nlp | `05-nlp-foundations-to-advanced` | NLP -- Foundations to Advanced |
| 6, speech, audio | `06-speech-and-audio` | Speech & Audio |
| 7, transformers | `07-transformers-deep-dive` | Transformers Deep Dive |
| 8, generative, gen-ai, genai | `08-generative-ai` | Generative AI |
| 9, rl, reinforcement-learning | `09-reinforcement-learning` | Reinforcement Learning |
| 10, llms, llm, llms-from-scratch | `10-llms-from-scratch` | LLMs from Scratch |
| 11, llm-engineering, llm-eng | `11-llm-engineering` | LLM Engineering |
| 12, multimodal | `12-multimodal-ai` | Multimodal AI |
| 13, tools, protocols, mcp | `13-tools-and-protocols` | Tools & Protocols |
| 14, agents, agent-engineering | `14-agent-engineering` | Agent Engineering |
| 15, autonomous | `15-autonomous-systems` | Autonomous Systems |
| 16, multi-agent, swarms | `16-multi-agent-and-swarms` | Multi-Agent & Swarms |
| 17, infrastructure, production, infra | `17-infrastructure-and-production` | Infrastructure & Production |
| 18, ethics, safety, alignment | `18-ethics-safety-alignment` | Ethics, Safety & Alignment |
| 19, capstone, projects | `19-capstone-projects` | Capstone Projects |

## Procedure

### Step 1: Resolve the Phase

Parse the argument. If it is a number, validate it is between 0 and 19 inclusive. If the number is out of range, tell the user: "Phase [N] does not exist. Valid phases are 0-19." and show the full list for them to pick from. If it is a name or keyword, look it up in the Phase Map above. If the keyword does not match any entry in the map, tell the user: "Unknown phase '[keyword]'. Pick from the list below:" and present all 20 phases. If no argument is provided, ask the user to pick from the full list.

### Step 2: Read the Phase Content
