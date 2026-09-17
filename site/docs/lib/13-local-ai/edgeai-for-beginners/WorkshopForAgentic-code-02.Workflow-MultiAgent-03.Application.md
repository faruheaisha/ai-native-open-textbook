---
title: "Podcast Application"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/WorkshopForAgentic/code/02.Workflow-MultiAgent/03.Application/README.md"
sourceRel: "WorkshopForAgentic/code/02.Workflow-MultiAgent/03.Application/README.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/WorkshopForAgentic/code/02.Workflow-MultiAgent/03.Application/README.md"
sourceSha256: "caf3c96df23124a7400cdc8bc79b7c07df7d1497cf268a4cf9b1a408af507eeb"
pageSha256: "caf3c96df23124a7400cdc8bc79b7c07df7d1497cf268a4cf9b1a408af507eeb"
contentMode: "local-full"
zh: ""
---

# Podcast Application

A console application for generating podcast scripts using AI agents.

## Usage

```bash
python podcast_app.py
```

## Workflow

1. **Welcome** - Application greets the user
2. **Topic Input** - User provides a topic for the podcast
3. **Search Agent** - Searches for relevant information
4. **Generate Script Agent** - Creates a podcast script
5. **Review** - User reviews and approves/rejects the script
6. **Save** - Approved script is saved to `podcast.md`

## Requirements

- Python 3.12+
- agent_framework
- All dependencies from 02.WorkflowDevUI
