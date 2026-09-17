---
title: "Lab 3: Advanced Response Processing with Hooks"
sourceId: "08-agents/strands-agents-course"
sourceTitle: "Strands Agents 课程（AWS）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/aws-samples/sample-getting-started-with-strands-agents-course"
entryUrl: "https://github.com/aws-samples/sample-getting-started-with-strands-agents-course/blob/6f0b46cd565312a34cdb9a6c72cbff7f3fa80c1d/course-2/Lab3/README.md"
sourceRel: "course-2/Lab3/README.md"
rawUrl: "/raw/08-agents/strands-agents-course/course-2/Lab3/README.md"
sourceSha256: "d3384c7eeddeea88f0474959f2f4c00c507863bb5f6f7a9bce066d5cfae35330"
pageSha256: "d3384c7eeddeea88f0474959f2f4c00c507863bb5f6f7a9bce066d5cfae35330"
contentMode: "local-full"
zh: ""
---

# Lab 3: Advanced Response Processing with Hooks

**Duration:** 13:30 | **Files:** `async_example.py`, `hook_example_1.py`, `hook_example_2.py`

## What You'll Learn
- Implement custom logic at specific agent lifecycle points
- Create event-driven hooks for logging and monitoring
- Process responses with async iterators and callbacks
- Build retry logic and precision parameter modifications

## Quick Start
```bash
# Basic logging hooks
python hook_example_1.py

# Advanced hook modifications
python hook_example_2.py

# Async processing example
python async_example.py
```

## Key Concepts
- **Hook Lifecycle**: BeforeInvocationEvent, AfterInvocationEvent
- **Event Interception**: Modify agent behavior in real-time
- **Async Processing**: Stream responses and handle callbacks
- **Hook Composition**: Combine multiple hooks for complex workflows

## Examples
- **Logging Hook**: Track request start/end times
- **Parameter Hook**: Modify model parameters dynamically
- **Streaming Hook**: Process responses as they arrive

## Requirements
- `ANTHROPIC_API_KEY` in `.env` file
