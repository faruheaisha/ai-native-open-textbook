---
title: "Azure AI Fine-Tuning Skill Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/finetuning/acceptance-criteria.md"
sourceRel: "tests/scenarios/finetuning/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/finetuning/acceptance-criteria.md"
sourceSha256: "921263dd41919c341f678a7c7e764e05b751380caf2ac87e0b9e19633e2880ff"
pageSha256: "921263dd41919c341f678a7c7e764e05b751380caf2ac87e0b9e19633e2880ff"
contentMode: "local-full"
zh: ""
---

# Azure AI Fine-Tuning Skill Acceptance Criteria

**Skill**: `finetuning` (sub-skill of `microsoft-foundry`)
**SDK**: `openai` (Azure OpenAI fine-tuning API)
**Purpose**: Validate that agent-generated fine-tuning code follows correct patterns

---

## 1. Authentication Patterns

### 1.1 ✅ CORRECT: Project /v1/ Endpoint (Preferred)

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://<resource>.services.ai.azure.com/api/projects/<project>/openai/v1/",
    api_key=os.environ["AZURE_OPENAI_API_KEY"],
)
```

### 1.2 ✅ CORRECT: DefaultAzureCredential Fallback

```python
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

credential = DefaultAzureCredential()
project_client = AIProjectClient(endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"], credential=credential)
openai_client = project_client.get_openai_client()
```

### 1.3 ❌ INCORRECT: AzureOpenAI with Project Endpoint

```python
# WRONG — AzureOpenAI appends ?api-version= which breaks /v1/ paths
from openai import AzureOpenAI
client = AzureOpenAI(azure_endpoint="https://...services.ai.azure.com/api/projects/.../openai/v1/")
```

### 1.4 ❌ INCORRECT: Hardcoded Credentials

```python
# WRONG — security risk
client = OpenAI(base_url="...", api_key="EeFM5aU2...")
```

---

## 2. File Upload Patterns

### 2.1 ✅ CORRECT: Upload and Wait for Processing

```python
with open("train.jsonl", "rb") as f:
    train_file = client.files.create(file=f, purpose="fine-tune")

# Must wait for processing before submitting job
client.files.wait_for_processing(train_file.id)
```

### 2.2 ❌ INCORRECT: Submit Job Immediately After Upload

```python
# WRONG — file may not be processed yet, causes "file import not completed" error
train_file = client.files.create(file=open("train.jsonl", "rb"), purpose="fine-tune")
job = client.fine_tuning.jobs.create(training_file=train_file.id, ...)
```

---

## 3. SFT Job Submission

### 3.1 ✅ CORRECT: SFT with Hyperparameters in Method Config

```python
job = client.fine_tuning.jobs.create(
    model="gpt-4.1-mini",
    training_file=train_file.id,
    validation_file=val_file.id,
    suffix="my-model",
    method={"type": "supervised", "supervised": {
        "hyperparameters": {"n_epochs": 2, "learning_rate_multiplier": 1.0}
    }},
)
```

### 3.2 ❌ INCORRECT: Hyperparameters at Top Level

```python
# WRONG — hyperparameters must be inside method.supervised.hyperparameters
job = client.fine_tuning.jobs.create(
    model="gpt-4.1-mini",
    training_file=train_file.id,
    hyperparameters={"n_epochs": 2},  # Wrong location
)
```

---

## 4. RFT Job Submission

### 4.1 ✅ CORRECT: RFT with Python Grader

```python
job = client.fine_tuning.jobs.create(
    model="o4-mini",
    training_file=train_file.id,
    validation_file=val_file.id,
    method={"type": "reinforcement", "reinforcement": {
        "grader": {
            "type": "python",
            "name": "my_grader",
            "source": "def grade(sample, item): ...",
            "pass_threshold": 0.80,
        },
        "hyperparameters": {
            "n_epochs": 2,
            "learning_rate_multiplier": 1.0,
            "compute_multiplier": 1.5,
            "reasoning_effort": "medium",
        },
    }},
)
```

### 4.2 ✅ CORRECT: RFT with Tools (Agentic)

```python
job = client.fine_tuning.jobs.create(
    model="o4-mini",
    training_file=train_file.id,
    method={"type": "reinforcement", "reinforcement": {
        "grader": grader_config,
        "tools": [
            {"name": "get_order", "server_url": "https://my-tools.azurewebsites.net/tool/get_order", "headers": {}}
        ],
        "max_episode_steps": 5,
    }},
)
```

### 4.3 ❌ INCORRECT: pass_threshold in Hyperparameters

```python
# WRONG — pass_threshold goes inside the grader config, not hyperparameters
method={"type": "reinforcement", "reinforcement": {
    "grader": {"type": "python", "source": "..."},
    "hyperparameters": {"pass_threshold": 0.8},  # Wrong location
}}
```

### 4.4 ❌ INCORRECT: System Role in RFT Data

```python
# WRONG — RFT does not support "system" role, use "developer" instead
{"messages": [
    {"role": "system", "content": "You are a helpful assistant."},  # Will be rejected
    {"role": "user", "content": "..."}
]}
```

### 4.5 ✅ CORRECT: Developer Role in RFT Data

```python
{"messages": [
    {"role": "developer", "content": "You are a helpful assistant."},
    {"role": "user", "content": "..."}
],
"expected_answer": "the correct answer for the grader"}
```

---

## 5. DPO Job Submission

### 5.1 ✅ CORRECT: DPO with Hyperparameters in Method Config

```python
job = client.fine_tuning.jobs.create(
    model="gpt-4.1-mini",
    training_file=train_file.id,
    method={"type": "dpo", "dpo": {
        "hyperparameters": {"n_epochs": 2, "beta": 0.1, "learning_rate_multiplier": 1.0}
    }},
)
```

### 5.2 ❌ INCORRECT: DPO Hyperparameters at Top Level

```python
# WRONG — causes invalidPayload error
job = client.fine_tuning.jobs.create(
    model="gpt-4.1-mini",
    training_file=train_file.id,
    method={"type": "dpo"},
    hyperparameters={"n_epochs": 2, "beta": 0.1},  # Wrong location
)
```

---

## 6. Model Deployment

### 6.1 ✅ CORRECT: Deploy via Azure CLI

```bash
az cognitiveservices account deployment create \
  --name <resource> --resource-group <rg> \
  --deployment-name my-ft-model \
