---
title: "Session State Chat"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/python/session_state_chat/README.md"
sourceRel: "ch05/python/session_state_chat/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch05/python/session_state_chat/README.md"
sourceSha256: "719fbebb413aa81ef843fed4c9173b42b97a89b9bb95e079c0b84b7d1f644972"
pageSha256: "719fbebb413aa81ef843fed4c9173b42b97a89b9bb95e079c0b84b7d1f644972"
contentMode: "local-full"
zh: ""
---

# Session State Chat

This example demonstrates transient session state as a structured snapshot that is updated on each turn and injected into the prompt.

It keeps track of:

- the current goal
- the current stage of the task
- lightweight constraints and open questions
- the last user and assistant messages

## Prerequisites

- Python 3.10+
- An OpenAI API key (`OPENAI_API_KEY`)

## Steps for running this example in the shell

1.  Install dependencies:
```bash
python -m venv .venv

# macOS/Linux:
source .venv/bin/activate

# Windows Command Prompt:
.venv\Scripts\activate.bat

# Windows PowerShell:
.venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

2. Run the script:
```bash
python session_state_chat.py --model gpt-5
```

Inside the chat:

- `/help` - show commands
- `/state` - print the current session state
- `/reset` - clear the session state
- `/exit` - quit

## Suggested experiment

1. Start the chat and give it a task, for example: `Help me plan a two-day visit to Lisbon. I should keep the schedule relaxed.`
2. Ask a few follow-up questions about the task.
3. Use `/state` to inspect the live snapshot the model sees.
4. Use `/reset` and confirm that the state disappears.

## Notes

- This example is session-scoped only.
- It demonstrates local state, not durable memory.
