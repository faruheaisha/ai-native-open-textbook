---
title: "azure-ai-ml-py non-hero scenarios"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-ml-py/references/non-hero-scenarios.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-ml-py/references/non-hero-scenarios.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-ml-py/references/non-hero-scenarios.md"
sourceSha256: "a97c6fcccedcab8850567696deed7f86bdb5f82d876092733a31372a7ccc0144"
pageSha256: "a97c6fcccedcab8850567696deed7f86bdb5f82d876092733a31372a7ccc0144"
contentMode: "local-full"
zh: ""
---

# azure-ai-ml-py non-hero scenarios

These scenarios are intentionally separate from hero flows in `SKILL.md`.
They cover secondary/advanced patterns typically used after the primary end-to-end path is working.

## Jobs

### Command Job

```python
from azure.ai.ml import command, Input

job = command(
    code="./src",
    command="python train.py --data ${{inputs.data}} --lr ${{inputs.learning_rate}}",
    inputs={
        "data": Input(type="uri_folder", path="azureml:my-dataset:1"),
        "learning_rate": 0.01
    },
    environment="AzureML-sklearn-1.0-ubuntu20.04-py38-cpu@latest",
    compute="cpu-cluster",
    display_name="training-job"
)

returned_job = ml_client.jobs.create_or_update(job)
print(f"Job URL: {returned_job.studio_url}")
```

### Monitor Job

```python
ml_client.jobs.stream(returned_job.name)
```

## Pipelines

```python
from azure.ai.ml import dsl, Input, Output

@dsl.pipeline(
    compute="cpu-cluster",
    description="Training pipeline"
)
def training_pipeline(data_input):
    prep_step = prep_component(data=data_input)
    train_step = train_component(
        data=prep_step.outputs.output_data,
        learning_rate=0.01
    )
    return {"model": train_step.outputs.model}

pipeline = training_pipeline(
    data_input=Input(type="uri_folder", path="azureml:my-dataset:1")
)

pipeline_job = ml_client.jobs.create_or_update(pipeline)
```

## Environments

### Create Custom Environment

```python
from azure.ai.ml.entities import Environment

env = Environment(
    name="my-env",
    version="1",
    image="mcr.microsoft.com/azureml/openmpi4.1.0-ubuntu20.04",
    conda_file="./environment.yml"
)

ml_client.environments.create_or_update(env)
```

## Datastores

### List Datastores

```python
for ds in ml_client.datastores.list():
    print(f"{ds.name}: {ds.type}")
```

### Get Default Datastore

```python
default_ds = ml_client.datastores.get_default()
print(f"Default: {default_ds.name}")
```

## MLClient Operations

| Property | Operations |
|----------|------------|
| `workspaces` | create, get, list, delete |
| `jobs` | create_or_update, get, list, stream, cancel |
| `models` | create_or_update, get, list, archive |
| `data` | create_or_update, get, list |
| `compute` | begin_create_or_update, get, list, delete |
| `environments` | create_or_update, get, list |
| `datastores` | create_or_update, get, list, get_default |
| `components` | create_or_update, get, list |
