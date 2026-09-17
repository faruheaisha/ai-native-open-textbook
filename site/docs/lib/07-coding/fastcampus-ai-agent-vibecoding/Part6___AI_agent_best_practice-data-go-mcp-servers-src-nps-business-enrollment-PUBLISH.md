---
title: "Publishing to PyPI"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part6_바이브코딩과_AI_agent_best_practice/data-go-mcp-servers/src/nps-business-enrollment/PUBLISH.md"
sourceRel: "Part6_바이브코딩과_AI_agent_best_practice/data-go-mcp-servers/src/nps-business-enrollment/PUBLISH.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part6_바이브코딩과_AI_agent_best_practice/data-go-mcp-servers/src/nps-business-enrollment/PUBLISH.md"
sourceSha256: "dd65e61086f603ee0c69df9f476fe2832ce6a08322af8149ae72ca77c5c10cf1"
pageSha256: "dd65e61086f603ee0c69df9f476fe2832ce6a08322af8149ae72ca77c5c10cf1"
contentMode: "local-full"
zh: ""
---

# Publishing to PyPI

## Prerequisites

1. Create an account on [PyPI](https://pypi.org/)
2. Generate an API token at https://pypi.org/manage/account/token/
3. Install twine: `pip install twine`

## Build and Upload

```bash
# Clean previous builds
rm -rf dist/ build/ *.egg-info

# Build the package
uv build

# Upload to Test PyPI first (optional)
twine upload --repository-url https://test.pypi.org/legacy/ dist/*

# Upload to PyPI
twine upload dist/*
```

## Using API Token

When prompted for credentials:
- Username: `__token__`
- Password: Your PyPI API token (starts with `pypi-`)

## Alternative: Using UV to publish

```bash
# Using UV (if you have PyPI credentials configured)
uv publish
```

## After Publishing

Test the installation:
```bash
pip install data-go-mcp-nps-business-enrollment
```
