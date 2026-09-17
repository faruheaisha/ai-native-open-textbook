---
title: "Lab 5: Conversation and Session Management"
sourceId: "08-agents/strands-agents-course"
sourceTitle: "Strands Agents 课程（AWS）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/aws-samples/sample-getting-started-with-strands-agents-course"
entryUrl: "https://github.com/aws-samples/sample-getting-started-with-strands-agents-course/blob/6f0b46cd565312a34cdb9a6c72cbff7f3fa80c1d/course-2/Lab5/README.md"
sourceRel: "course-2/Lab5/README.md"
rawUrl: "/raw/08-agents/strands-agents-course/course-2/Lab5/README.md"
sourceSha256: "9519b23ce79d041fe6f67ee051a1d7d5fd717a6ea2c3eac8f64de367dfce1ec8"
pageSha256: "9519b23ce79d041fe6f67ee051a1d7d5fd717a6ea2c3eac8f64de367dfce1ec8"
contentMode: "local-full"
zh: ""
---

# Lab 5: Conversation and Session Management

**Duration:** 11:26 | **Files:** `session_example.py`, `verify_session.py`

## What You'll Learn
- Manage conversation state and context across interactions
- Configure conversation management strategies (Null, SlidingWindow, Summarizing)
- Implement persistent session storage
- Handle context window limitations and user isolation

## Quick Start
```bash
# Session management example
python session_example.py

# Verify session persistence
python verify_session.py
```

## Key Concepts
- **Conversation Managers**: Three approaches for handling context
  - **NullManager**: No conversation history
  - **SlidingWindow**: Keep recent messages within limit
  - **Summarizing**: Compress old messages into summaries
- **Session Storage**: File-based and S3 session persistence
- **User Isolation**: Separate conversations per user/session

## Examples
- **Session Persistence**: Maintain state across agent restarts
- **Context Management**: Handle long conversations efficiently
- **Multi-User Support**: Isolate conversations by user ID

## Requirements
- `ANTHROPIC_API_KEY` in `.env` file
- File system permissions (for session storage)
