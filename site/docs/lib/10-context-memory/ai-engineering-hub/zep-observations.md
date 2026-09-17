---
title: "Zep Observations Demo"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/zep-observations/README.md"
sourceRel: "zep-observations/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/zep-observations/README.md"
sourceSha256: "e40cae5fbec4d4b662aac6ba994f8a58708711e4d6950b9cdbd3a5b959b3ed64"
pageSha256: "e40cae5fbec4d4b662aac6ba994f8a58708711e4d6950b9cdbd3a5b959b3ed64"
contentMode: "local-full"
zh: ""
---

# Zep Observations Demo

A deep-dive into how Zep's Observations feature detects behavioral patterns from knowledge graph data.

## What this does

Seeds a Zep knowledge graph with three e-commerce support conversations for a user named Maya, then checks what Observations Zep generates from that data.

The three conversations simulate Maya purchasing ergonomic products over four weeks:

| Conversation | Product | Mentioned |
|---|---|---|
| Conv 1  | Standing desk | Back pain, home office |
| Conv 2  | Ergonomic chair | Back pain, lumbar support, commute |
| Conv 3  | Car seat cushion | Lumbar support, commute |

## Prerequisites

- Python 3.10+
- A Zep API key ([get one here](https://www.getzep.com/))
- **Flex Plus or Enterprise tier** (Observations is not available on lower tiers)

## Setup

```bash
git clone https://github.com/patchy631/ai-engineering-hub.git
cd zep-observations

pip install -r requirements.txt

export ZEP_API_KEY="your-api-key"
```

## Usage

**Step 1: Seed the graph**

```bash
python seed.py
```

This creates a user, three conversation threads, and adds messages to each.

**Step 2: Wait 20-30 minutes**

Zep's observation engine runs as a background process. It checks for new data every 10 minutes and processes graphs that have been idle for at least 30 minutes.

**Step 3: Check the results**

```bash
python check.py
```

This prints any observations, facts, and entities Zep generated from the seeded data.

## How the observation mechanism works

Zep's observation pipeline is a two-stage process:

1. **Deterministic clustering.** Every fact in the graph gets reduced to a signature (entity pair + relationship type). Episodes that share signatures get linked. The connected components of this episode graph become observation candidates. No ML model is involved in this step.

2. **Constrained LLM summarization.** A single LLM call receives the cluster's entities, episodes, and relationship types, and writes a name and summary. The LLM never decides what gets grouped — it only describes what the algorithm already found.

---

## 📬 Stay Updated with Our Newsletter!

**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)
[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
