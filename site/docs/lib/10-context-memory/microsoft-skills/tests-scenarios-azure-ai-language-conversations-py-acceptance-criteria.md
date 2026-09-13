---
title: "Acceptance Criteria: azure-ai-language-conversations-py"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/README.md"
zh: ""
---

# Acceptance Criteria: azure-ai-language-conversations-py

## Authentication and Setup

### ✅ Correct
```python
from azure.identity import DefaultAzureCredential
from azure.ai.language.conversations import ConversationAnalysisClient

with ConversationAnalysisClient(endpoint, DefaultAzureCredential()) as client:
    ...
```

### ✅ Correct: legacy key path for existing keyed deployments
```python
from azure.core.credentials import AzureKeyCredential
from azure.ai.language.conversations import ConversationAnalysisClient

with ConversationAnalysisClient(endpoint, AzureKeyCredential(key)) as client:
    ...
```

### ❌ Incorrect
```python
client = ConversationAnalysisClient(endpoint, credential)
# Missing context manager
```

## Payload Construction

### ✅ Correct
```python
task = {
    "kind": "Conversation",
    "analysisInput": {
        "conversationItem": {
            "participantId": "1",
            "id": "1",
            "modality": "text",
            "text": query,
        }
    },
    "parameters": {
        "projectName": project_name,
        "deploymentName": deployment_name,
    },
}
```

### ❌ Incorrect
```python
task = {
    "kind": "conversations",  # Wrong kind
    "parameters": {},
}
```

## API Usage

### ✅ Correct
```python
result = client.analyze_conversation(task=task)
print(result["result"]["prediction"]["topIntent"])
```

### ❌ Incorrect
```python
result = client.analyze(task=task)  # Wrong method name
```
