---
title: "Lab 6: Memory Persistent Agents"
sourceId: "08-agents/strands-agents-course"
sourceTitle: "Strands Agents 课程（AWS）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/aws-samples/sample-getting-started-with-strands-agents-course"
entryUrl: "https://github.com/aws-samples/sample-getting-started-with-strands-agents-course/blob/6f0b46cd565312a34cdb9a6c72cbff7f3fa80c1d/course-2/Lab6/README.md"
sourceRel: "course-2/Lab6/README.md"
rawUrl: "/raw/08-agents/strands-agents-course/course-2/Lab6/README.md"
sourceSha256: "bf63ff3a9e5f70e296ef661e829a67f8cdfff3dae20dfeba405841588e3dd7e7"
pageSha256: "bf63ff3a9e5f70e296ef661e829a67f8cdfff3dae20dfeba405841588e3dd7e7"
contentMode: "local-full"
zh: ""
---

# Lab 6: Memory Persistent Agents

**Duration:** 15:19 | **File:** `memory_example.py`

## What You'll Learn
- Build agents with long-term memory capabilities across conversations
- Integrate Mem0 for persistent memory storage and retrieval
- Combine memory with web search for enhanced knowledge
- Implement user-specific memory isolation and relevance scoring

## Quick Start
```bash
# Memory agent with web search (requires MEM0_API_KEY)
python memory_example.py
```

## Key Concepts
- **Memory Backends**: FAISS, OpenSearch, Mem0 integration
- **Memory Operations**: Store, retrieve, and list user memories
- **Relevance Scoring**: Semantic similarity for memory retrieval
- **Knowledge Augmentation**: Combine memory with external data sources

## Examples
- **Personal Assistant**: Agent that remembers user preferences
- **Web Search Integration**: Combine memory with DuckDuckGo search
- **User Isolation**: Separate memory spaces per user
- **Conversation Continuity**: Maintain context across sessions

## Requirements
- `ANTHROPIC_API_KEY` in `.env` file
- `MEM0_API_KEY` for memory persistence
- Internet connection (for web search)
