---
title: "Hosted agent with Amazon Bedrock AgentCore"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/bedrock_agentcore/hosted_agent/README.md"
sourceRel: "ch10/bedrock_agentcore/hosted_agent/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/bedrock_agentcore/hosted_agent/README.md"
sourceSha256: "0a518277a03c0b9e174241110ee69aee30a693e021c6bc0ceb661cbef1764f50"
pageSha256: "0a518277a03c0b9e174241110ee69aee30a693e021c6bc0ceb661cbef1764f50"
contentMode: "local-full"
zh: ""
---

# Hosted agent with Amazon Bedrock AgentCore

This example wraps an agent in the entrypoint that [Amazon Bedrock AgentCore](https://aws.amazon.com/bedrock/agentcore/) Runtime expects. The service supplies the runtime around the agent, including session isolation, identity, and observability, so the code only declares how a request becomes a response.

## Requirements

* [Python](https://www.python.org/) 3.10+
* AWS credentials configured for a region where Amazon Bedrock is available
* Model access granted for the model identifier used in the script

## Steps for running this example in the shell

1. Install dependencies:
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

2. Run the agent locally:
```bash
python hosted_agent.py
```

3. Send a request to the local endpoint:
```bash
curl -X POST http://localhost:8080/invocations -H "Content-Type: application/json" -d "{\"prompt\": \"Explain context engineering in one sentence.\"}"
```

## Output

The local server answers on `/invocations` with the model reply wrapped in a `result` field. The same entrypoint is what AgentCore Runtime invokes once the agent is deployed, so no code changes are needed between local runs and the managed runtime.
