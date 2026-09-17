---
title: "Data Seoul MCP - Cookiecutter Template"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part5_AI_Agent_프로젝트_3개/Chapter3_바이브코딩으로_공공_MCP_자동_생성하고_에이전트_연결하기/template/data-seoul-mcp/README.md"
sourceRel: "Part5_AI_Agent_프로젝트_3개/Chapter3_바이브코딩으로_공공_MCP_자동_생성하고_에이전트_연결하기/template/data-seoul-mcp/README.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part5_AI_Agent_프로젝트_3개/Chapter3_바이브코딩으로_공공_MCP_자동_생성하고_에이전트_연결하기/template/data-seoul-mcp/README.md"
sourceSha256: "3b5d560c651af7a07376aafad2c6b06df23fa598354db0e60692f502e02f741d"
pageSha256: "3b5d560c651af7a07376aafad2c6b06df23fa598354db0e60692f502e02f741d"
contentMode: "local-full"
zh: ""
---

# Data Seoul MCP - Cookiecutter Template

Cookiecutter template for creating Seoul Open Data MCP servers.

## Usage

Generate a new MCP server for Seoul Open Data:

```bash
uvx cookiecutter template/data-seoul-mcp
```

You will be prompted for:
- **author_name**: Your name
- **author_email**: Your email (use GitHub noreply format)
- **api_name**: English name of the Seoul API (e.g., "Seoul Cultural Events")
- **api_name_korean**: Korean name of the API (e.g., "문화행사정보")
- **api_description**: Brief description of the API
- **project_domain**: Short domain name (e.g., "CulturalEvents")
- **description**: Full package description
- **instructions**: Instructions for LLM on how to use the server

## Example

```bash
uvx cookiecutter template/data-seoul-mcp

# Prompts:
author_name [Your Name]: Hong Gildong
author_email [githubusername@users.noreply.github.com]: gildong@users.noreply.github.com
api_name [Seoul Cultural Events]: Seoul Cultural Events
api_name_korean [문화행사정보]: 문화행사정보
api_description [Seoul city cultural events and space information]: Seoul city cultural events and space information
project_domain [CulturalEvents]: CulturalEvents
description [A Seoul Data MCP server for 문화행사정보 (Seoul Cultural Events)]:
instructions [Use this MCP server to search...]:
```

This will generate:

```
culturaleveents-mcp-server/
├── pyproject.toml
├── README.md
├── LICENSE
├── CHANGELOG.md
├── .gitignore
├── .python-version
├── data_seoul_mcp/
│   ├── __init__.py
│   └── culturaleveents_mcp_server/
│       ├── __init__.py
│       └── server.py
└── tests/
    ├── __init__.py
    ├── conftest.py
    ├── test_init.py
    ├── test_main.py
    └── test_server.py
```

## After Generation

1. Navigate to the generated directory:
   ```bash
