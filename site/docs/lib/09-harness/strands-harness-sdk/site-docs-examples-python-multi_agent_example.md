---
title: "Multi-Agent Example"
sourceId: "09-harness/strands-harness-sdk"
sourceTitle: "Strands Harness SDK"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/strands-agents/harness-sdk"
entryUrl: "https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/site/docs/examples/python/multi_agent_example/index.md"
sourceRel: "site/docs/examples/python/multi_agent_example/index.md"
rawUrl: "/raw/09-harness/strands-harness-sdk/site/docs/examples/python/multi_agent_example/index.md"
sourceSha256: "b704262fd769201d58daa731a3c494febd73f65b51161d58ecb9d8104fe8fd48"
pageSha256: "b704262fd769201d58daa731a3c494febd73f65b51161d58ecb9d8104fe8fd48"
contentMode: "local-full"
zh: ""
---

# Multi-Agent Example

This directory contains the implementation files for the Multi-Agent Example architecture, where specialized agents work together under the coordination of a central orchestrator.

## Implementation Files

- [teachers_assistant.py](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/site/docs/examples/python/multi_agent_example/teachers_assistant.py) - The main orchestrator agent that routes queries to specialized agents
- [math_assistant.py](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/site/docs/examples/python/multi_agent_example/math_assistant.py) - Specialized agent for handling mathematical queries
- [language_assistant.py](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/site/docs/examples/python/multi_agent_example/language_assistant.py) - Specialized agent for language translation tasks
- [english_assistant.py](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/site/docs/examples/python/multi_agent_example/english_assistant.py) - Specialized agent for English grammar and comprehension
- [computer_science_assistant.py](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/site/docs/examples/python/multi_agent_example/computer_science_assistant.py) - Specialized agent for computer science and programming tasks
- [no_expertise.py](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/site/docs/examples/python/multi_agent_example/no_expertise.py) - General assistant for queries outside specific domains

## Documentation

For detailed information about how this multi-agent architecture works, please see the [multi_agent_example.md](https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/site/docs/examples/python/multi_agent_example/multi_agent_example.md) documentation file.
