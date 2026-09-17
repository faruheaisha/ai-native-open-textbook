---
title: "Advanced Patterns Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/agent-framework-azure-ai-py/references/advanced.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/agent-framework-azure-ai-py/references/advanced.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/agent-framework-azure-ai-py/references/advanced.md"
sourceSha256: "668490db8d62ffcd5a75ab657a96d1b2986d1811626c1975a3b8217e428a1282"
pageSha256: "668490db8d62ffcd5a75ab657a96d1b2986d1811626c1975a3b8217e428a1282"
contentMode: "local-full"
zh: ""
---

# Advanced Patterns Reference

Advanced patterns including structured outputs, OpenAPI tools, file handling, and more.

## Structured Outputs with Pydantic

### Basic Response Format

```python
from pydantic import BaseModel, ConfigDict
from agent_framework.azure import AzureAIAgentsProvider
from azure.identity.aio import AzureCliCredential

class MovieRecommendation(BaseModel):
    model_config = ConfigDict(extra="forbid")  # Strict validation
    
    title: str
    year: int
    genre: str
    rating: float
    summary: str

async with (
    AzureCliCredential() as credential,
    AzureAIAgentsProvider(credential=credential) as provider,
):
    agent = await provider.create_agent(
        name="MovieAgent",
        instructions="Recommend movies based on user preferences.",
        response_format=MovieRecommendation,  # Set at creation
    )
    
    result = await agent.run("Recommend a sci-fi movie")
    movie = MovieRecommendation.model_validate_json(result.text)
    print(f"{movie.title} ({movie.year}) - {movie.rating}/10")
```

### Complex Nested Structures

```python
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional

class Address(BaseModel):
    model_config = ConfigDict(extra="forbid")
    street: str
    city: str
    country: str
    postal_code: Optional[str] = None

class Person(BaseModel):
    model_config = ConfigDict(extra="forbid")
    name: str
    age: int
    email: str
    address: Address
    hobbies: list[str] = Field(default_factory=list)

class TeamResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")
    team_name: str
    members: list[Person]
    total_members: int

agent = await provider.create_agent(
    name="TeamGenerator",
    instructions="Generate fictional team data.",
    response_format=TeamResponse,
)

result = await agent.run("Create a team of 3 software developers")
team = TeamResponse.model_validate_json(result.text)
for member in team.members:
    print(f"- {member.name}, {member.age}, {member.address.city}")
```

### Runtime Response Format Override

```python
class QuickAnswer(BaseModel):
    answer: str
    confidence: float

class DetailedAnalysis(BaseModel):
    summary: str
    key_points: list[str]
    recommendations: list[str]
    sources: list[str]

# Agent created without default response format
agent = await provider.create_agent(
    name="FlexibleAgent",
    instructions="Provide information in the requested format.",
)

# Quick answer format
quick_result = await agent.run(
    "What is Python?",
    response_format=QuickAnswer,
)

# Detailed analysis format (same agent)
detailed_result = await agent.run(
    "Analyze the benefits of microservices architecture",
    response_format=DetailedAnalysis,
)
```

---

## OpenAPI Tools

Integrate external APIs using OpenAPI specifications.

### Basic OpenAPI Integration

```python
from agent_framework import OpenAPITool
from agent_framework.azure import AzureAIAgentsProvider
from azure.identity.aio import AzureCliCredential

# OpenAPI spec can be URL or inline dict
openapi_spec = {
    "openapi": "3.0.0",
    "info": {"title": "Weather API", "version": "1.0.0"},
    "paths": {
        "/weather/{city}": {
            "get": {
                "operationId": "getWeather",
                "summary": "Get weather for a city",
                "parameters": [
                    {
                        "name": "city",
                        "in": "path",
                        "required": True,
                        "schema": {"type": "string"}
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Weather data",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "temperature": {"type": "number"},
                                        "conditions": {"type": "string"}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

async with (
    AzureCliCredential() as credential,
    AzureAIAgentsProvider(credential=credential) as provider,
):
    agent = await provider.create_agent(
        name="WeatherAPIAgent",
        instructions="Use the weather API to answer weather questions.",
        tools=OpenAPITool(
            name="WeatherAPI",
            spec=openapi_spec,
            base_url="https://api.weather.example.com",
        ),
    )
```

### OpenAPI with Authentication

```python
from agent_framework import OpenAPITool

openapi_tool = OpenAPITool(
    name="SecureAPI",
    spec="https://api.example.com/openapi.json",
    base_url="https://api.example.com",
    headers={
        "Authorization": "Bearer your-api-key",
        "X-API-Version": "2024-01",
    },
)
```

---

## File Generation and Handling

### Code Interpreter File Output

```python
from agent_framework import HostedCodeInterpreterTool
from agent_framework.azure import AzureAIAgentsProvider
from azure.identity.aio import AzureCliCredential

async with (
    AzureCliCredential() as credential,
    AzureAIAgentsProvider(credential=credential) as provider,
):
    agent = await provider.create_agent(
        name="DataAnalyst",
        instructions="Analyze data and create visualizations.",
        tools=HostedCodeInterpreterTool(),
    )
    
    result = await agent.run(
        "Create a bar chart of sales data: Q1=100, Q2=150, Q3=120, Q4=200. Save as PNG."
    )
    
    # Check for generated files in the response
    print(result.text)
    
    # Files generated by code interpreter are typically referenced in the response
    # and can be downloaded via the files API
```

### Working with File IDs

```python
from azure.ai.agents.aio import AgentsClient

async with (
    AzureCliCredential() as credential,
    AgentsClient(endpoint=endpoint, credential=credential) as agents_client,
    AzureAIAgentsProvider(agents_client=agents_client) as provider,
):
    # Upload a file
    from pathlib import Path
    
    file = await agents_client.files.upload(
        file_path=Path("data/sales.csv"),
        purpose="agents"
    )
    print(f"Uploaded file ID: {file.id}")
    
    # Use file with code interpreter
    from agent_framework import HostedCodeInterpreterTool, HostedFileContent
    
    agent = await provider.create_agent(
        name="CSVAnalyst",
        instructions="Analyze the provided CSV file.",
        tools=HostedCodeInterpreterTool(
            inputs=[HostedFileContent(file_id=file.id)]
        ),
    )
    
    result = await agent.run("Summarize the data in the uploaded file")
```
