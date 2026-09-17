---
title: "Deploying an ADK agent to Gemini Enterprise Agent Platform"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/gemini_agent_platform/deploy_adk_agent/README.md"
sourceRel: "ch10/gemini_agent_platform/deploy_adk_agent/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/gemini_agent_platform/deploy_adk_agent/README.md"
sourceSha256: "49eb53a737610fef08b75034f1a83a42a6d40b58f424c8cbc6da8885cd7ed2a5"
pageSha256: "49eb53a737610fef08b75034f1a83a42a6d40b58f424c8cbc6da8885cd7ed2a5"
contentMode: "local-full"
zh: ""
---

# Deploying an ADK agent to Gemini Enterprise Agent Platform

This example deploys an agent built with the [Agent Development Kit](https://google.github.io/adk-docs/) to the Agent Runtime of [Gemini Enterprise Agent Platform](https://cloud.google.com/products/gemini-enterprise-agent-platform), which hosts the agent together with managed sessions and memory. The platform was called Vertex AI until April 2026, and its Agent Runtime component was called Vertex AI Agent Engine, which is why the Python client still uses the `agent_engines` module. The agent definition stays portable, and only the deployment call is specific to the service.

## Requirements

* [Python](https://www.python.org/) 3.10+
* A Google Cloud project with the Gemini Enterprise Agent Platform API (`aiplatform.googleapis.com`) enabled
* Application Default Credentials configured (`gcloud auth application-default login`)
* A Cloud Storage bucket used for staging

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

2. Export the project settings as environment variables:
```bash
export GOOGLE_CLOUD_PROJECT="your-project-id"
export GOOGLE_CLOUD_LOCATION="us-central1"
export STAGING_BUCKET="gs://your-staging-bucket"
```

3. Run the script:
```bash
python deploy_adk_agent.py
```

## Output

The script creates a remote agent in the managed runtime and then streams the events of one query to the terminal. Deployment takes several minutes the first time, and the resulting agent remains available until it is deleted.

> Note: deploying to a managed runtime creates billable cloud resources.
